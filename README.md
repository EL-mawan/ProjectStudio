# 📸 Jabarjer Studio - Photography & Videography Booking System

Sistem booking online untuk jasa fotografi dan videografi dengan integrasi pembayaran Midtrans.

## ✨ Features

### 🎯 **Customer Features**
- ✅ Browse layanan (Wedding, Birthday, Corporate, dll)
- ✅ Pilih paket dan add-ons
- ✅ Booking dengan kalender
- ✅ Pembayaran online via Midtrans (Sandbox)
- ✅ Multiple payment methods (DP 30% atau Full Payment)
- ✅ User authentication & profile

### 👨‍💼 **Admin Features**
- ✅ Dashboard dengan statistik
- ✅ Kelola pesanan (CRUD)
- ✅ Cek status pembayaran real-time dari Midtrans
- ✅ Kelola layanan & paket
- ✅ Kelola konten website
- ✅ User management

### 💳 **Payment Integration**
- ✅ Midtrans Snap Payment Gateway
- ✅ Auto-redirect ke payment page
- ✅ Webhook notification handler
- ✅ Real-time payment status check
- ✅ Support semua metode pembayaran Midtrans

## 🛠️ Tech Stack

### Backend
- **Go** (Golang) 1.21+
- **Gin** Web Framework
- **GORM** ORM
- **MySQL** Database
- **JWT** Authentication
- **Midtrans Go SDK**

### Frontend
- **HTML5, CSS3, JavaScript**
- **Tailwind CSS** & **Bootstrap 5**
- **SweetAlert2** untuk notifications
- **Font Awesome** icons

## 📋 Prerequisites

- Go 1.21 atau lebih baru
- MySQL 8.0+
- Node.js & npm (untuk development)
- Akun Midtrans Sandbox (gratis)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/projectJabarjergo.git
cd projectJabarjergo
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
go mod download

# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan kredensial Anda
nano .env
```

**Konfigurasi `.env`:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jabarjer_studio

JWT_SECRET=your-super-secret-key

PORT=8080

MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_ENVIRONMENT=sandbox
```

### 3. Setup Database

```bash
# Create database
mysql -u root -p
CREATE DATABASE jabarjer_studio;
exit;

# Run migrations (auto via GORM)
go run main.go

# Seed admin user
go run cmd/seed/main.go
```

### 4. Run Backend

```bash
go run main.go
# Server running on http://localhost:8080
```

### 5. Run Frontend

```bash
cd ../frontend
python3 -m http.server 3000
# Frontend running on http://localhost:3000
```

## 🔑 Default Admin Login

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **PENTING:** Ganti password setelah login pertama!

## 📁 Project Structure

```
projectJabarjergo/
├── backend/
│   ├── cmd/
│   │   └── seed/          # Database seeder
│   ├── controllers/       # Request handlers
│   ├── database/          # Database connection
│   ├── middleware/        # Auth & CORS middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── services/          # Business logic (Midtrans)
│   ├── main.go           # Entry point
│   ├── Dockerfile        # Docker configuration
│   └── .env              # Environment variables
│
├── frontend/
│   ├── js/
│   │   ├── config.js     # API configuration
│   │   └── homepage.js   # Homepage logic
│   ├── images/           # Assets
│   ├── index.html        # Homepage
│   ├── admin.html        # Admin dashboard
│   ├── checkout.html     # Checkout page
│   └── login.html        # Login page
│
├── DEPLOYMENT.md         # Deployment guide
└── README.md            # This file
```

## 🌐 API Endpoints

### Public Endpoints
```
GET    /api/services              # List all services
GET    /api/services/:id          # Get service detail
POST   /api/orders                # Create order
GET    /api/payment/status/:id    # Check payment status
POST   /api/payment/notification  # Midtrans webhook
```

### Admin Endpoints (Requires Auth)
```
GET    /api/admin/orders          # List all orders
PUT    /api/admin/orders/:id/status  # Update order status
DELETE /api/admin/orders/:id      # Delete order
GET    /api/admin/users           # List users
```

## 💳 Midtrans Test Cards

**Sandbox Mode:**
- **Card Number:** 4811 1111 1111 1114
- **CVV:** 123
- **Exp Date:** 01/25
- **OTP:** 112233

## 🚀 Deployment

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap deployment gratis ke:
- **Railway.app** (Backend + Database)
- **Vercel** (Frontend)

**Total Biaya:** Rp 0 / bulan! 🎉

## 📝 Development

### Run with Auto-reload (Backend)

```bash
# Install air
go install github.com/cosmtrek/air@latest

# Run
air
```

### Build for Production

```bash
# Backend
cd backend
go build -o main .

# Frontend (sudah static, tidak perlu build)
```

## 🔒 Security

- ✅ JWT Authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ SQL injection prevention (GORM)
- ✅ Midtrans signature verification

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Cek MySQL service
sudo systemctl status mysql

# Start MySQL
sudo systemctl start mysql
```

### Midtrans Payment Not Working
- Pastikan `MIDTRANS_SERVER_KEY` dan `MIDTRANS_CLIENT_KEY` sudah benar
- Cek environment: `sandbox` atau `production`
- Verifikasi webhook URL di Midtrans Dashboard

### CORS Error
- Pastikan backend CORS sudah allow frontend URL
- Check `main.go` CORS configuration

## 📄 License

MIT License - Feel free to use for your projects!

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Gin Web Framework](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
- [Midtrans](https://midtrans.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

---

**Made with ❤️ for photographers and videographers**
