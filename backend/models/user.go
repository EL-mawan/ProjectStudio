package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex;not null" json:"username"`
	Password string `gorm:"not null" json:"-"`
	Name     string `gorm:"not null" json:"name"`
	Role     string `gorm:"not null;default:admin" json:"role"` // admin, superadmin, etc.
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}
