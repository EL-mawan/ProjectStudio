package controllers

import (
	"net/http"

	"jabarjer-backend/database"
	"jabarjer-backend/models"

	"github.com/gin-gonic/gin"
)

// GetPackages - Get all packages (public)
func GetPackages(c *gin.Context) {
	var packages []models.Package

	if err := database.DB.Find(&packages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch packages",
		})
		return
	}

	c.JSON(http.StatusOK, packages)
}

// GetPackageByID - Get package by ID (public)
func GetPackageByID(c *gin.Context) {
	id := c.Param("id")
	var pkg models.Package

	if err := database.DB.First(&pkg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Package not found",
		})
		return
	}

	c.JSON(http.StatusOK, pkg)
}

// CreatePackage - Create new package (admin only)
func CreatePackage(c *gin.Context) {
	var pkg models.Package

	if err := c.ShouldBindJSON(&pkg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Validate service exists
	var service models.Service
	if err := database.DB.First(&service, pkg.ServiceID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Service not found",
		})
		return
	}

	// Set default active to true if not specified
	if !pkg.Active {
		pkg.Active = true
	}

	if err := database.DB.Create(&pkg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create package",
		})
		return
	}

	c.JSON(http.StatusCreated, pkg)
}

// UpdatePackage - Update package (admin only)
func UpdatePackage(c *gin.Context) {
	id := c.Param("id")
	var pkg models.Package

	// Check if package exists
	if err := database.DB.First(&pkg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Package not found",
		})
		return
	}

	// Bind update data
	if err := c.ShouldBindJSON(&pkg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Update
	if err := database.DB.Save(&pkg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update package",
		})
		return
	}

	c.JSON(http.StatusOK, pkg)
}

// DeletePackage - Soft delete package (admin only)
func DeletePackage(c *gin.Context) {
	id := c.Param("id")
	var pkg models.Package

	if err := database.DB.First(&pkg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Package not found",
		})
		return
	}

	// Soft delete
	if err := database.DB.Delete(&pkg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete package",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Package deleted successfully",
	})
}

// TogglePackageActive - Toggle package active status (admin only)
func TogglePackageActive(c *gin.Context) {
	id := c.Param("id")
	var pkg models.Package

	if err := database.DB.First(&pkg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Package not found",
		})
		return
	}

	// Toggle active status
	pkg.Active = !pkg.Active

	if err := database.DB.Save(&pkg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update package status",
		})
		return
	}

	c.JSON(http.StatusOK, pkg)
}

// GetAllPackages - Alias for GetPackages for API consistency
func GetAllPackages(c *gin.Context) {
	GetPackages(c)
}
