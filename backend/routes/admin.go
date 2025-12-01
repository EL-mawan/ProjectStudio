package routes

import (
	"jabarjer-backend/controllers"
	"jabarjer-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupAdminRoutes(router *gin.RouterGroup) {
	admin := router.Group("/admin")
	admin.Use(middleware.AuthMiddleware()) // Tambahkan middleware auth
	{
		// Manajemen Pesanan
		admin.GET("/orders", controllers.GetOrders)
		admin.GET("/orders/:id", controllers.GetOrder)
		admin.PUT("/orders/:id/status", controllers.UpdateOrderStatus)

		// Manajemen Pengguna
		admin.GET("/users", controllers.GetUsers)

		// Manajemen Layanan
		admin.POST("/services", controllers.CreateService)
		admin.PUT("/services/:id", controllers.UpdateService)
		admin.DELETE("/services/:id", controllers.DeleteService)
		admin.PUT("/services/:id/toggle", controllers.ToggleServiceActive)

		// Manajemen Paket
		admin.POST("/packages", controllers.CreatePackage)
		admin.PUT("/packages/:id", controllers.UpdatePackage)
		admin.DELETE("/packages/:id", controllers.DeletePackage)
		admin.PUT("/packages/:id/toggle", controllers.TogglePackageActive)

		// Manajemen Konten - Tentang
		admin.PUT("/content/about", controllers.UpdateAboutContent)

		// Manajemen Konten - Hero
		admin.GET("/content/hero", controllers.GetAllHeroContent)
		admin.POST("/content/hero", controllers.CreateHeroContent)
		admin.PUT("/content/hero/:id", controllers.UpdateHeroContent)
		admin.DELETE("/content/hero/:id", controllers.DeleteHeroContent)
		admin.PUT("/content/hero/:id/toggle", controllers.ToggleHeroActive)

		// Manajemen Konten - Kontak
		admin.PUT("/content/contact", controllers.UpdateContactInfo)

		// Manajemen Konten - Pengaturan
		admin.PUT("/content/settings", controllers.UpdateSiteSettings)
	}
}
