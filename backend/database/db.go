package database

import (
	"fmt"
	"log"
	"os"

	"jabarjer-backend/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	// Dapatkan konfigurasi database dari environment variables
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")

	// Jika environment variables tidak di-set, gunakan nilai default (untuk development)
	if host == "" {
		host = "localhost"
	}
	if user == "" {
		user = "root"
	}
	if password == "" {
		password = ""
	}
	if dbname == "" {
		dbname = "jabarjer_studio"
	}
	if port == "" {
		port = "3306"
	}

	// Buat string koneksi (DSN) untuk MySQL
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)

	// Buka koneksi ke database
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	log.Println("Database connected successfully")

	// Auto Migrate all models
	err = DB.AutoMigrate(
		// Existing models
		&models.User{},
		&models.Service{},
		&models.Package{},
		&models.Addon{},
		&models.Order{},
		&models.OrderAddon{},
		// New content models
		&models.AboutContent{},
		&models.HeroContent{},
		&models.PortfolioItem{},
		&models.ContactInfo{},
		&models.SiteSettings{},
	)
	if err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Println("Database migration completed successfully")

	return nil
}
