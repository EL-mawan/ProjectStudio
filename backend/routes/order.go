package routes

import (
	"jabarjer-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupOrderRoutes(router *gin.RouterGroup) {
	// Services (Public)
	router.GET("/services", controllers.GetServices)
	router.GET("/services/:id", controllers.GetServiceByID)
	router.GET("/services/:id/packages", controllers.GetServicePackages)

	// Packages (Public)
	router.GET("/packages", controllers.GetAllPackages)
	router.GET("/packages/:id", controllers.GetPackageByID)

	// Content (Public)
	router.GET("/content/about", controllers.GetAboutContent)
	router.GET("/content/hero", controllers.GetActiveHeroContent)
	router.GET("/content/contact", controllers.GetContactInfo)
	router.GET("/content/settings", controllers.GetSiteSettings)

	// Orders
	router.POST("/orders/check-availability", controllers.CheckAvailability)
	router.POST("/orders", controllers.CreateOrder)
	router.GET("/orders/:id", controllers.GetOrder)
	router.PUT("/orders/:id/status", controllers.UpdateOrderStatus)
	router.DELETE("/orders/:id", controllers.DeleteOrder)

	// Payment (Midtrans)
	router.POST("/payment/notification", controllers.MidtransNotification)
	router.GET("/payment/status/:id", controllers.GetPaymentStatus)
}

// Individual route functions for main.go
func GetServices(c *gin.Context) {
	controllers.GetServices(c)
}

func GetServicePackages(c *gin.Context) {
	controllers.GetServicePackages(c)
}

func CheckAvailability(c *gin.Context) {
	controllers.CheckAvailability(c)
}

func CreateOrder(c *gin.Context) {
	controllers.CreateOrder(c)
}

func GetOrder(c *gin.Context) {
	controllers.GetOrder(c)
}

func UpdateOrderStatus(c *gin.Context) {
	controllers.UpdateOrderStatus(c)
}
