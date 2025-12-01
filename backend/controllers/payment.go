package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"jabarjer-backend/database"
	"jabarjer-backend/models"
	"jabarjer-backend/services"

	"github.com/gin-gonic/gin"
)

// MidtransNotification handles payment notification from Midtrans
func MidtransNotification(c *gin.Context) {
	var notification map[string]interface{}

	if err := c.ShouldBindJSON(&notification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid notification data",
		})
		return
	}

	// Log notification untuk debugging
	log.Printf("Midtrans Notification: %+v", notification)

	// Extract data dari notification
	orderID, _ := notification["order_id"].(string)
	transactionStatus, _ := notification["transaction_status"].(string)
	fraudStatus, _ := notification["fraud_status"].(string)

	// Verifikasi signature (opsional tapi direkomendasikan)
	// Verifikasi signature (opsional tapi direkomendasikan)
	signatureKey, _ := notification["signature_key"].(string)
	statusCode, _ := notification["status_code"].(string)
	grossAmount, _ := notification["gross_amount"].(string)

	midtransService := services.NewMidtransService()
	serverKey := os.Getenv("MIDTRANS_SERVER_KEY")

	if !midtransService.VerifySignature(orderID, statusCode, grossAmount, serverKey, signatureKey) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid signature",
		})
		return
	}

	// Update status order berdasarkan transaction status
	var order models.Order
	if err := database.DB.Where("id = ?", orderID).First(&order).Error; err != nil {
		log.Printf("Order not found: %s", orderID)
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Order not found",
		})
		return
	}

	// Mapping status Midtrans ke status order
	var newStatus models.OrderStatus

	switch transactionStatus {
	case "capture":
		if fraudStatus == "accept" {
			newStatus = models.StatusPaid
		}
	case "settlement":
		newStatus = models.StatusPaid
	case "pending":
		newStatus = models.StatusPending
	case "deny", "cancel", "expire":
		newStatus = models.StatusCancelled
	default:
		newStatus = order.Status // Tidak berubah
	}

	// Update status order
	if newStatus != order.Status {
		order.Status = newStatus
		if err := database.DB.Save(&order).Error; err != nil {
			log.Printf("Failed to update order status: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update order",
			})
			return
		}
		log.Printf("Order %s status updated to %s", orderID, newStatus)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Notification processed",
	})
}

// GetPaymentStatus mendapatkan status pembayaran dari Midtrans
func GetPaymentStatus(c *gin.Context) {
	orderID := c.Param("id")

	midtransService := services.NewMidtransService()

	status, err := midtransService.GetTransactionStatus(fmt.Sprintf("ORDER-%s", orderID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mendapatkan status pembayaran",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"order_id":           status.OrderID,
		"transaction_status": status.TransactionStatus,
		"payment_type":       status.PaymentType,
		"transaction_time":   status.TransactionTime,
		"gross_amount":       status.GrossAmount,
	})
}
