package controllers

import (
	"net/http"

	"jabarjer-backend/database"
	"jabarjer-backend/models"

	"github.com/gin-gonic/gin"
)

// GetServiceByID - Get service by ID (public)
func GetServiceByID(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	if err := database.DB.Preload("Packages").First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Service not found",
		})
		return
	}

	c.JSON(http.StatusOK, service)
}

// CreateService - Create new service (admin only)
func CreateService(c *gin.Context) {
	var service models.Service

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Set default active to true if not specified
	if !service.Active {
		service.Active = true
	}

	if err := database.DB.Create(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create service",
		})
		return
	}

	c.JSON(http.StatusCreated, service)
}

// UpdateService - Update service (admin only)
func UpdateService(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	// Check if service exists
	if err := database.DB.First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Service not found",
		})
		return
	}

	// Bind update data
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Update
	if err := database.DB.Save(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update service",
		})
		return
	}

	c.JSON(http.StatusOK, service)
}

// DeleteService - Soft delete service (admin only)
func DeleteService(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	if err := database.DB.First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Service not found",
		})
		return
	}

	// Soft delete
	if err := database.DB.Delete(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete service",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Service deleted successfully",
	})
}

// ToggleServiceActive - Toggle service active status (admin only)
func ToggleServiceActive(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	if err := database.DB.First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Service not found",
		})
		return
	}

	// Toggle active status
	service.Active = !service.Active

	if err := database.DB.Save(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update service status",
		})
		return
	}

	c.JSON(http.StatusOK, service)
}
