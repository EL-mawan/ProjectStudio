package models

import "gorm.io/gorm"

// AboutContent - Content for About page
type AboutContent struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Subtitle    string `json:"subtitle"`
	Description string `gorm:"type:text" json:"description"`
	Mission     string `gorm:"type:text" json:"mission"`
	Vision      string `gorm:"type:text" json:"vision"`
	TeamMembers string `gorm:"type:json;serializer:json" json:"team_members"` // JSON array of team members
}

// TeamMember - Structure for team member
type TeamMember struct {
	Name     string `json:"name"`
	Position string `json:"position"`
	ImageURL string `json:"image_url"`
	Bio      string `json:"bio"`
}

// HeroContent - Hero section content for homepage
type HeroContent struct {
	gorm.Model
	Title      string `gorm:"not null" json:"title"`
	Subtitle   string `gorm:"type:text" json:"subtitle"`
	ButtonText string `json:"button_text"`
	ButtonLink string `json:"button_link"`
	ImageURL   string `json:"image_url"`
	Active     bool   `gorm:"not null;default:true" json:"active"`
}

// PortfolioItem - Portfolio gallery items
type PortfolioItem struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"type:text" json:"description"`
	Category    string `json:"category"` // wedding, prewedding, event
	ImageURL    string `json:"image_url"`
	Location    string `json:"location"`
	Date        string `json:"date"`
	Active      bool   `gorm:"not null;default:true" json:"active"`
}

// ContactInfo - Contact information
type ContactInfo struct {
	gorm.Model
	Address      string `json:"address"`
	Phone        string `json:"phone"`
	Email        string `json:"email"`
	Instagram    string `json:"instagram"`
	Facebook     string `json:"facebook"`
	Whatsapp     string `json:"whatsapp"`
	MapEmbed     string `gorm:"type:text" json:"map_embed"`
	WorkingDays  string `json:"working_days"`
	WorkingHours string `json:"working_hours"`
}

// SiteSettings - General site settings
type SiteSettings struct {
	gorm.Model
	SiteName        string `json:"site_name"`
	LogoURL         string `json:"logo_url"`
	FaviconURL      string `json:"favicon_url"`
	MetaDescription string `gorm:"type:text" json:"meta_description"`
	MetaKeywords    string `json:"meta_keywords"`
}
