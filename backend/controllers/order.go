package controllers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"jabarjer-backend/database"
	"jabarjer-backend/models"
	"jabarjer-backend/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetServices returns all active services
func GetServices(c *gin.Context) {
	var services []models.Service

	if err := database.DB.Preload("Packages", "active = ?", true).
		Where("active = ?", true).
		Find(&services).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch services",
		})
		return
	}

	c.JSON(http.StatusOK, services)
}

// GetServicePackages returns packages for a specific service
func GetServicePackages(c *gin.Context) {
	serviceID := c.Param("id")

	var packages []models.Package
	if err := database.DB.Where("service_id = ? AND active = ?", serviceID, true).
		Find(&packages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch packages",
		})
		return
	}

	// Get addons for this service
	var addons []models.Addon
	if err := database.DB.Where("service_id = ? AND active = ?", serviceID, true).
		Find(&addons).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch addons",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"packages": packages,
		"addons":   addons,
	})
}

// CheckAvailability checks if a service is available on the requested date
func CheckAvailability(c *gin.Context) {
	var req models.CheckAvailabilityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// Parse event date
	eventDate, err := time.Parse("2006-01-02", req.EventDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid date format",
		})
		return
	}

	// Check if there are any orders for the same service on the same date
	var orderCount int64
	if err := database.DB.Model(&models.Order{}).
		Where("service_type = ? AND event_date = ? AND status IN (?, ?, ?)",
			req.ServiceType, eventDate,
			models.StatusConfirmed, models.StatusPaid, models.StatusInProgress).
		Count(&orderCount).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to check availability",
		})
		return
	}

	// For demonstration, assume we can handle 2 orders per day per service
	available := orderCount < 2
	message := "Tersedia"
	if !available {
		message = "Maaf, tanggal tersebut sudah penuh. Silakan pilih tanggal lain."
	}

	c.JSON(http.StatusOK, models.AvailabilityResponse{
		Available: available,
		Message:   message,
	})
}

// CreateOrder creates a new order
func CreateOrder(c *gin.Context) {
	var req models.CreateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Parse event date
	eventDate, err := time.Parse("2006-01-02", req.EventDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid date format",
		})
		return
	}

	// Get package details
	var packageObj models.Package
	if err := database.DB.First(&packageObj, req.PackageID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Package not found",
		})
		return
	}

	// Calculate totals
	var addonsTotal int64 = 0
	var orderAddons []models.OrderAddon

	for _, addonReq := range req.Addons {
		var addon models.Addon
		if err := database.DB.First(&addon, addonReq.AddonID).Error; err != nil {
			continue // Skip invalid addons
		}

		addonTotal := addon.Price * int64(addonReq.Quantity)
		addonsTotal += addonTotal

		orderAddons = append(orderAddons, models.OrderAddon{
			AddonID:    addon.ID,
			AddonName:  addon.Name,
			AddonPrice: addon.Price,
			Quantity:   addonReq.Quantity,
		})
	}

	subtotal := packageObj.Price + addonsTotal
	var downPayment, remainingAmount int64

	if req.PaymentMethod == models.PaymentDP {
		downPayment = subtotal * 30 / 100 // 30% DP
		remainingAmount = subtotal - downPayment
	} else {
		downPayment = subtotal
		remainingAmount = 0
	}

	// Buat order
	order := models.Order{
		CustomerName:    req.CustomerName,
		CustomerEmail:   req.CustomerEmail,
		CustomerPhone:   req.CustomerPhone,
		CustomerAddress: req.CustomerAddress,

		ServiceType:  req.ServiceType,
		PackageID:    packageObj.ID,
		PackageName:  packageObj.Name,
		PackagePrice: packageObj.Price,

		EventDate:     eventDate,
		EventLocation: req.EventLocation,

		Addons:      orderAddons,
		AddonsTotal: addonsTotal,

		Subtotal:        subtotal,
		PaymentMethod:   req.PaymentMethod,
		DownPayment:     downPayment,
		RemainingAmount: remainingAmount,

		Status: models.StatusPending,
	}

	// Simpan order ke database
	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal membuat pesanan",
		})
		return
	}

	// Integrasi Midtrans - Buat Snap Token
	midtransService := services.NewMidtransService()
	orderIDStr := fmt.Sprintf("ORDER-%d", order.ID)

	snapResp, err := midtransService.CreateTransaction(
		orderIDStr,
		downPayment,
		req.CustomerName,
		req.CustomerEmail,
		req.CustomerPhone,
	)

	if err != nil {
		// Log error tapi tetap return success karena order sudah dibuat
		log.Printf("Error creating Midtrans transaction: %v", err)
	} else {
		// Update order dengan payment URL dan expiry
		order.PaymentURL = snapResp.RedirectURL
		// Parse expiry time jika ada
		database.DB.Save(&order)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":       "Pesanan berhasil dibuat",
		"order_id":      order.ID,
		"amount_to_pay": downPayment,
		"payment_url":   order.PaymentURL,
	})
}

// GetOrder returns order details
func GetOrder(c *gin.Context) {
	orderID := c.Param("id")

	var order models.Order
	if err := database.DB.Preload("Addons").First(&order, "id = ?", orderID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Order not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch order",
		})
		return
	}

	c.JSON(http.StatusOK, order)
}

// UpdateOrderStatus updates the status of an order
func UpdateOrderStatus(c *gin.Context) {
	orderID := c.Param("id")

	var req struct {
		Status models.OrderStatus `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	if err := database.DB.Model(&models.Order{}).
		Where("id = ?", orderID).
		Update("status", req.Status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update order status",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Order status updated successfully",
	})
}

// DeleteOrder menghapus order berdasarkan ID
func DeleteOrder(c *gin.Context) {
	orderID := c.Param("id")

	// Cek apakah order ada
	var order models.Order
	if err := database.DB.First(&order, orderID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Pesanan tidak ditemukan",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil data pesanan",
		})
		return
	}

	// Hapus order
	if err := database.DB.Delete(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal menghapus pesanan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pesanan berhasil dihapus",
	})
}
