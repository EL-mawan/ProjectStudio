package controllers

import (
	"net/http"

	"jabarjer-backend/database"
	"jabarjer-backend/models"

	"github.com/gin-gonic/gin"
)

// ============================================
// ABOUT CONTENT
// ============================================

// GetAboutContent - Get about page content (public)
func GetAboutContent(c *gin.Context) {
	var about models.AboutContent

	// Get the first (and should be only) about content
	if err := database.DB.First(&about).Error; err != nil {
		// If not found, return default empty content
		c.JSON(http.StatusOK, models.AboutContent{
			Title:       "About Us",
			Subtitle:    "Learn more about our story",
			Description: "",
		})
		return
	}

	c.JSON(http.StatusOK, about)
}

// UpdateAboutContent - Update about page content (admin only)
func UpdateAboutContent(c *gin.Context) {
	var about models.AboutContent
	var input models.AboutContent

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Try to find existing about content
	result := database.DB.First(&about)

	if result.Error != nil {
		// Create new if doesn't exist
		about = input
		if err := database.DB.Create(&about).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create about content",
			})
			return
		}
	} else {
		// Update existing
		about.Title = input.Title
		about.Subtitle = input.Subtitle
		about.Description = input.Description
		about.Mission = input.Mission
		about.Vision = input.Vision
		about.TeamMembers = input.TeamMembers

		if err := database.DB.Save(&about).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update about content",
			})
			return
		}
	}

	c.JSON(http.StatusOK, about)
}

// ============================================
// HERO CONTENT
// ============================================

// GetHeroContent - Get active hero content (public)
func GetHeroContent(c *gin.Context) {
	var hero models.HeroContent

	// Get active hero content
	if err := database.DB.Where("active = ?", true).First(&hero).Error; err != nil {
		// Return default if not found
		c.JSON(http.StatusOK, models.HeroContent{
			Title:      "Welcome to Project Studio",
			Subtitle:   "Your moments, beautifully captured",
			ButtonText: "Get Started",
			ButtonLink: "#booking",
		})
		return
	}

	c.JSON(http.StatusOK, hero)
}

// GetAllHeroContent - Get all hero content (admin only)
func GetAllHeroContent(c *gin.Context) {
	var heroes []models.HeroContent

	if err := database.DB.Find(&heroes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch hero content",
		})
		return
	}

	c.JSON(http.StatusOK, heroes)
}

// CreateHeroContent - Create new hero content (admin only)
func CreateHeroContent(c *gin.Context) {
	var hero models.HeroContent

	if err := c.ShouldBindJSON(&hero); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	if err := database.DB.Create(&hero).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create hero content",
		})
		return
	}

	c.JSON(http.StatusCreated, hero)
}

// UpdateHeroContent - Update hero content (admin only)
func UpdateHeroContent(c *gin.Context) {
	id := c.Param("id")
	var hero models.HeroContent

	if err := database.DB.First(&hero, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Hero content not found",
		})
		return
	}

	if err := c.ShouldBindJSON(&hero); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	if err := database.DB.Save(&hero).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update hero content",
		})
		return
	}

	c.JSON(http.StatusOK, hero)
}

// DeleteHeroContent - Delete hero content (admin only)
func DeleteHeroContent(c *gin.Context) {
	id := c.Param("id")
	var hero models.HeroContent

	if err := database.DB.First(&hero, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Hero content not found",
		})
		return
	}

	if err := database.DB.Delete(&hero).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete hero content",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Hero content deleted successfully",
	})
}

// ToggleHeroActive - Toggle hero active status (admin only)
func ToggleHeroActive(c *gin.Context) {
	id := c.Param("id")
	var hero models.HeroContent

	if err := database.DB.First(&hero, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Hero content not found",
		})
		return
	}

	// If activating this hero, deactivate all others
	if !hero.Active {
		database.DB.Model(&models.HeroContent{}).Where("id != ?", id).Update("active", false)
	}

	hero.Active = !hero.Active

	if err := database.DB.Save(&hero).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update hero status",
		})
		return
	}

	c.JSON(http.StatusOK, hero)
}

// ============================================
// CONTACT INFO
// ============================================

// GetContactInfo - Get contact information (public)
func GetContactInfo(c *gin.Context) {
	var contact models.ContactInfo

	if err := database.DB.First(&contact).Error; err != nil {
		// Return default if not found
		c.JSON(http.StatusOK, models.ContactInfo{
			Address: "Your Address Here",
			Phone:   "+62 xxx xxxx xxxx",
			Email:   "info@projectstudio.com",
		})
		return
	}

	c.JSON(http.StatusOK, contact)
}

// UpdateContactInfo - Update contact information (admin only)
func UpdateContactInfo(c *gin.Context) {
	var contact models.ContactInfo
	var input models.ContactInfo

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Try to find existing contact info
	result := database.DB.First(&contact)

	if result.Error != nil {
		// Create new if doesn't exist
		contact = input
		if err := database.DB.Create(&contact).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create contact info",
			})
			return
		}
	} else {
		// Update existing
		contact.Address = input.Address
		contact.Phone = input.Phone
		contact.Email = input.Email
		contact.Instagram = input.Instagram
		contact.Facebook = input.Facebook
		contact.Whatsapp = input.Whatsapp
		contact.MapEmbed = input.MapEmbed
		contact.WorkingDays = input.WorkingDays
		contact.WorkingHours = input.WorkingHours

		if err := database.DB.Save(&contact).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update contact info",
			})
			return
		}
	}

	c.JSON(http.StatusOK, contact)
}

// ============================================
// SITE SETTINGS
// ============================================

// GetSiteSettings - Get site settings (public)
func GetSiteSettings(c *gin.Context) {
	var settings models.SiteSettings

	if err := database.DB.First(&settings).Error; err != nil {
		// Return default if not found
		c.JSON(http.StatusOK, models.SiteSettings{
			SiteName:        "Project Studio",
			MetaDescription: "Professional photography and videography services",
		})
		return
	}

	c.JSON(http.StatusOK, settings)
}

// UpdateSiteSettings - Update site settings (admin only)
func UpdateSiteSettings(c *gin.Context) {
	var settings models.SiteSettings
	var input models.SiteSettings

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Try to find existing settings
	result := database.DB.First(&settings)

	if result.Error != nil {
		// Create new if doesn't exist
		settings = input
		if err := database.DB.Create(&settings).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create site settings",
			})
			return
		}
	} else {
		// Update existing
		settings.SiteName = input.SiteName
		settings.LogoURL = input.LogoURL
		settings.FaviconURL = input.FaviconURL
		settings.MetaDescription = input.MetaDescription
		settings.MetaKeywords = input.MetaKeywords

		if err := database.DB.Save(&settings).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update site settings",
			})
			return
		}
	}

	c.JSON(http.StatusOK, settings)
}

// GetActiveHeroContent - Alias for GetHeroContent for API consistency
func GetActiveHeroContent(c *gin.Context) {
	GetHeroContent(c)
}
