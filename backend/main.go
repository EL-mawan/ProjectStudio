package main

import (
	"log"
	"os"

	"jabarjer-backend/database"
	"jabarjer-backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Muat file .env
	if err := godotenv.Load(); err != nil {
		log.Println("Peringatan: file .env tidak ditemukan, menggunakan variabel environment")
	}

	// Inisialisasi Database
	if err := database.InitDB(); err != nil {
		log.Fatalf("Gagal menginisialisasi database: %v", err)
	}

	r := gin.Default()

	// Konfigurasi CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	// Setup Routes
	api := r.Group("/api")
	{
		routes.SetupAuthRoutes(api)
		routes.SetupOrderRoutes(api)
		routes.SetupAdminRoutes(api)
	}

	// Ambil port dari environment atau gunakan default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Jalankan Server
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Gagal menjalankan server: %v", err)
	}
}
