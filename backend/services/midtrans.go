package services

import (
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"os"
	"time"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
)

type MidtransService struct {
	Client snap.Client
}

// NewMidtransService membuat instance baru dari Midtrans service
func NewMidtransService() *MidtransService {
	var client snap.Client

	// Ambil konfigurasi dari environment
	serverKey := os.Getenv("MIDTRANS_SERVER_KEY")
	// clientKey := os.Getenv("MIDTRANS_CLIENT_KEY") // Unused for backend
	environment := os.Getenv("MIDTRANS_ENVIRONMENT") // "sandbox" atau "production"

	// Set default jika tidak ada
	if serverKey == "" {
		serverKey = "YOUR_SERVER_KEY" // Akan diganti nanti
	}
	if environment == "" {
		environment = "sandbox" // Default ke sandbox untuk testing
	}

	// Inisialisasi Midtrans client
	client.New(serverKey, midtrans.Sandbox)
	if environment == "production" {
		client.New(serverKey, midtrans.Production)
	}

	return &MidtransService{
		Client: client,
	}
}

// CreateTransaction membuat transaksi Snap Midtrans
func (s *MidtransService) CreateTransaction(orderID string, grossAmount int64, customerName, customerEmail, customerPhone string) (*snap.Response, error) {
	// Buat request Snap
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  orderID,
			GrossAmt: grossAmount,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: customerName,
			Email: customerEmail,
			Phone: customerPhone,
		},
		EnabledPayments: snap.AllSnapPaymentType, // Aktifkan semua metode pembayaran
		Expiry: &snap.ExpiryDetails{
			StartTime: time.Now().Format("2006-01-02 15:04:05 -0700"),
			Unit:      "hour",
			Duration:  24, // Expired dalam 24 jam
		},
	}

	// Buat transaksi Snap
	snapResp, err := s.Client.CreateTransaction(req)
	if err != nil {
		return nil, fmt.Errorf("gagal membuat transaksi Midtrans: %v", err)
	}

	return snapResp, nil
}

// GetTransactionStatus mendapatkan status transaksi dari Midtrans
func (s *MidtransService) GetTransactionStatus(orderID string) (*coreapi.TransactionStatusResponse, error) {
	// Gunakan Core API untuk cek status
	serverKey := os.Getenv("MIDTRANS_SERVER_KEY")
	if serverKey == "" {
		serverKey = "YOUR_SERVER_KEY"
	}

	var coreClient coreapi.Client
	env := midtrans.Sandbox
	if os.Getenv("MIDTRANS_ENVIRONMENT") == "production" {
		env = midtrans.Production
	}

	coreClient.New(serverKey, env)

	// Get transaction status
	transactionStatusResp, err := coreClient.CheckTransaction(orderID)
	if err != nil {
		return nil, fmt.Errorf("gagal mendapatkan status transaksi: %v", err)
	}

	return transactionStatusResp, nil
}

// VerifySignature memverifikasi signature dari notification Midtrans
func (s *MidtransService) VerifySignature(orderID, statusCode, grossAmount, serverKey, signatureKey string) bool {
	// Buat hash dari order_id + status_code + gross_amount + server_key
	payload := orderID + statusCode + grossAmount + serverKey
	hasher := sha512.New()
	hasher.Write([]byte(payload))
	expectedSignature := hex.EncodeToString(hasher.Sum(nil))

	return expectedSignature == signatureKey
}
