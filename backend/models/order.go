package models

import (
	"time"

	"gorm.io/gorm"
)

type OrderStatus string

const (
	StatusPending    OrderStatus = "pending"
	StatusConfirmed  OrderStatus = "confirmed"
	StatusPaid       OrderStatus = "paid"
	StatusInProgress OrderStatus = "in_progress"
	StatusCompleted  OrderStatus = "completed"
	StatusCancelled  OrderStatus = "cancelled"
)

type PaymentMethod string

const (
	PaymentDP   PaymentMethod = "dp"
	PaymentFull PaymentMethod = "full"
)

type Order struct {
	gorm.Model
	ID              uint   `gorm:"primaryKey" json:"id"`
	CustomerName    string `gorm:"not null" json:"customer_name"`
	CustomerEmail   string `gorm:"not null" json:"customer_email"`
	CustomerPhone   string `gorm:"not null" json:"customer_phone"`
	CustomerAddress string `gorm:"type:text" json:"customer_address"`

	ServiceType  string  `gorm:"not null" json:"service_type"`
	PackageID    uint    `gorm:"not null" json:"package_id"`
	Package      Package `gorm:"foreignKey:PackageID" json:"package"`
	PackageName  string  `gorm:"not null" json:"package_name"`
	PackagePrice int64   `gorm:"not null" json:"package_price"`

	EventDate     time.Time `gorm:"not null" json:"event_date"`
	EventLocation string    `gorm:"type:text;not null" json:"event_location"`

	Addons      []OrderAddon `gorm:"foreignKey:OrderID" json:"addons"`
	AddonsTotal int64        `gorm:"not null;default:0" json:"addons_total"`

	Subtotal        int64         `gorm:"not null" json:"subtotal"`
	PaymentMethod   PaymentMethod `gorm:"not null" json:"payment_method"`
	DownPayment     int64         `gorm:"not null" json:"down_payment"`
	AmountPaid      int64         `gorm:"not null;default:0" json:"amount_paid"`
	RemainingAmount int64         `gorm:"not null" json:"remaining_amount"`

	Status OrderStatus `gorm:"not null;default:'pending'" json:"status"`
	Notes  string      `gorm:"type:text" json:"notes"`

	PaymentURL    string    `gorm:"type:text" json:"payment_url"`
	PaymentExpiry time.Time `json:"payment_expiry"`
}

type OrderAddon struct {
	gorm.Model
	ID         uint   `gorm:"primaryKey" json:"id"`
	OrderID    uint   `gorm:"not null" json:"order_id"`
	AddonID    uint   `gorm:"not null" json:"addon_id"`
	AddonName  string `gorm:"not null" json:"addon_name"`
	AddonPrice int64  `gorm:"not null" json:"addon_price"`
	Quantity   int    `gorm:"not null;default:1" json:"quantity"`
}

type CreateOrderRequest struct {
	CustomerName    string `json:"customer_name" binding:"required"`
	CustomerEmail   string `json:"customer_email" binding:"required,email"`
	CustomerPhone   string `json:"customer_phone" binding:"required"`
	CustomerAddress string `json:"customer_address" binding:"required"`

	ServiceType   string `json:"service_type" binding:"required"`
	PackageID     uint   `json:"package_id" binding:"required"`
	EventDate     string `json:"event_date" binding:"required"`
	EventLocation string `json:"event_location" binding:"required"`

	Addons        []AddonRequest `json:"addons"`
	PaymentMethod PaymentMethod  `json:"payment_method" binding:"required"`
}

type AddonRequest struct {
	AddonID  uint `json:"addon_id" binding:"required"`
	Quantity int  `json:"quantity" binding:"min=1"`
}

type CheckAvailabilityRequest struct {
	ServiceType string `json:"service_type" binding:"required"`
	EventDate   string `json:"event_date" binding:"required"`
}

type AvailabilityResponse struct {
	Available bool   `json:"available"`
	Message   string `json:"message"`
}
