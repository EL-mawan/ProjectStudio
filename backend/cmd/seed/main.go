package main

import (
	"fmt"
	"log"

	"jabarjer-backend/database"
	"jabarjer-backend/models"
	"jabarjer-backend/utils"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// Initialize Database
	if err := database.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Create admin user
	hashedPassword, err := utils.HashPassword("admin123")
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	admin := models.User{
		Username: "admin",
		Password: hashedPassword,
		Name:     "Administrator",
		Role:     "admin",
	}

	// Check if admin already exists
	var existingUser models.User
	result := database.DB.Where("username = ?", "admin").First(&existingUser)

	if result.Error == nil {
		fmt.Println("Admin user already exists!")
		fmt.Println("Username: admin")
		return
	}

	// Create new admin
	if err := database.DB.Create(&admin).Error; err != nil {
		log.Fatalf("Failed to create admin user: %v", err)
	}

	fmt.Println("Admin user created successfully!")
	fmt.Println("Username: admin")
	fmt.Println("Password: admin123")
	fmt.Println("\nPlease change the password after first login!")
}
