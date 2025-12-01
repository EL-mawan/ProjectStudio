package utils

import (
	"fmt"
	"time"

	"jabarjer-backend/models"
)

// InitiatePayment simulates payment initiation with a payment gateway
// In a real implementation, this would integrate with Midtrans, Xendit, etc.
func InitiatePayment(order models.Order, paymentMethod models.PaymentMethod) (string, time.Time, error) {
	// For demo purposes, we'll generate a mock payment URL
	// In production, this would call the actual payment gateway API

	paymentURL := fmt.Sprintf("https://payment.jabarjer-studio.com/pay/%d", order.ID)
	expiry := time.Now().Add(24 * time.Hour) // Payment expires in 24 hours

	return paymentURL, expiry, nil
}

// ConfirmPayment simulates payment confirmation
// In a real implementation, this would verify with the payment gateway
func ConfirmPayment(paymentID string) (bool, error) {
	// For demo purposes, we'll assume payment is always successful
	// In production, this would verify with the payment gateway

	return true, nil
}

// CalculatePaymentAmount calculates the amount to be paid based on payment method
func CalculatePaymentAmount(subtotal int64, paymentMethod models.PaymentMethod) int64 {
	if paymentMethod == models.PaymentDP {
		return subtotal * 30 / 100 // 30% down payment
	}
	return subtotal // Full payment
}
