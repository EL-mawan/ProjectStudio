package controllers

import (
	"net/http"

	"jabarjer-backend/database"
	"jabarjer-backend/models"

	"github.com/gin-gonic/gin"
)

// GetOrders mengembalikan semua pesanan untuk admin
func GetOrders(c *gin.Context) {
	var orders []models.Order

	if err := database.DB.Preload("Addons").Preload("Package").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil pesanan",
		})
		return
	}

	c.JSON(http.StatusOK, orders)
}

// GetUsers mengembalikan semua pengguna terdaftar
func GetUsers(c *gin.Context) {
	var users []models.User

	if err := database.DB.Order("created_at DESC").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil pengguna",
		})
		return
	}

	c.JSON(http.StatusOK, users)
}

// GetOrder dan UpdateOrderStatus digunakan kembali dari order.go
