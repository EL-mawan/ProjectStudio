package models

import "gorm.io/gorm"

type Service struct {
	gorm.Model
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"not null" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	ImageURL    string    `json:"image_url"`
	Active      bool      `gorm:"not null;default:true" json:"active"`
	Packages    []Package `gorm:"foreignKey:ServiceID" json:"packages"`
}

type Package struct {
	gorm.Model
	ID          uint     `gorm:"primaryKey" json:"id"`
	ServiceID   uint     `gorm:"not null" json:"service_id"`
	Name        string   `gorm:"not null" json:"name"`
	Description string   `gorm:"type:text" json:"description"`
	Price       int64    `gorm:"not null" json:"price"`
	Duration    int      `gorm:"not null" json:"duration"` // in hours
	Features    []string `gorm:"type:json;serializer:json" json:"features"`
	Active      bool     `gorm:"not null;default:true" json:"active"`
}

type Addon struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey" json:"id"`
	ServiceID   uint   `gorm:"not null" json:"service_id"`
	Name        string `gorm:"not null" json:"name"`
	Description string `gorm:"type:text" json:"description"`
	Price       int64  `gorm:"not null" json:"price"`
	Active      bool   `gorm:"not null;default:true" json:"active"`
}
