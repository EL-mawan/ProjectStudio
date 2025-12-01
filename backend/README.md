# Jabarjer Studio Backend

Backend API untuk aplikasi Jabarjer Studio - platform booking untuk layanan fotografi dan videografi.

## Teknologi

- **Go** 1.24+
- **Gin** - Web Framework
- **GORM** - ORM untuk database
- **MySQL** - Database
- **JWT** - Authentication

## Setup

### 1. Install Dependencies

```bash
go mod download
```

### 2. Setup Database

Pastikan MySQL sudah terinstall dan berjalan. Kemudian buat database:

```bash
# Jika menggunakan MySQL dengan password
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS jabarjer_studio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Atau gunakan script yang sudah disediakan
./setup_db.sh
```

### 3. Konfigurasi Environment

Copy file `.env.example` menjadi `.env` dan sesuaikan konfigurasi:

```bash
cp .env.example .env
```

Edit file `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=jabarjer_studio

JWT_SECRET=your-secret-key-here

PORT=8080
```

### 4. Jalankan Aplikasi

```bash
go run main.go
```

Server akan berjalan di `http://localhost:8080`

## API Endpoints

### Public Endpoints

- `GET /api/services` - Mendapatkan semua layanan
- `GET /api/services/:id/packages` - Mendapatkan paket untuk layanan tertentu
- `POST /api/orders/check-availability` - Cek ketersediaan tanggal
- `POST /api/orders` - Membuat order baru
- `GET /api/orders/:id` - Mendapatkan detail order

### Auth Endpoints

- `POST /api/login` - Login admin

### Admin Endpoints (Requires Authentication)

- `GET /api/admin/orders` - Mendapatkan semua order
- `GET /api/admin/orders/:id` - Mendapatkan detail order
- `PUT /api/admin/orders/:id/status` - Update status order

## Database Models

### User

- Username, Password, Name, Role

### Service

- Name, Description, ImageURL, Active

### Package

- ServiceID, Name, Description, Price, Duration, Features, Active

### Addon

- ServiceID, Name, Description, Price, Active

### Order

- Customer Info (Name, Email, Phone, Address)
- Service Info (ServiceType, PackageID, PackageName, PackagePrice)
- Event Info (EventDate, EventLocation)
- Payment Info (Subtotal, PaymentMethod, DownPayment, AmountPaid, RemainingAmount)
- Status, Notes

### OrderAddon

- OrderID, AddonID, AddonName, AddonPrice, Quantity

## Development

### Auto Migration

Database migration akan berjalan otomatis saat aplikasi dijalankan. Semua tabel akan dibuat secara otomatis berdasarkan model yang ada.

### Default Admin User

Untuk membuat user admin pertama, jalankan query berikut di MySQL:

```sql
-- Password: admin123 (sudah di-hash)
INSERT INTO users (username, password, name, role, created_at, updated_at)
VALUES ('admin', '$2a$14$...hash...', 'Administrator', 'admin', NOW(), NOW());
```

Atau gunakan endpoint register jika sudah dibuat.

## Production

Untuk production:

1. Ubah `JWT_SECRET` dengan nilai yang aman
2. Gunakan password database yang kuat
3. Set `GIN_MODE=release`
4. Gunakan reverse proxy (nginx/apache)
5. Enable HTTPS
6. Setup backup database regular

## License

Private - Jabarjer Studio
