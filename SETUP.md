# Panduan Setup dan Menjalankan Jabarjer Studio

## Langkah-langkah Setup

### 1. Start MySQL Server

```bash
sudo systemctl start mysql
```

Atau jika menggunakan service lain:

```bash
sudo service mysql start
```

### 2. Buat Database

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS jabarjer_studio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Atau gunakan script:

```bash
./setup_db.sh
```

### 3. Konfigurasi Environment

File `.env` sudah dibuat dengan konfigurasi default. Jika MySQL Anda menggunakan password, edit file `.env`:

```bash
nano .env
```

Ubah baris `DB_PASSWORD=` menjadi:

```
DB_PASSWORD=password_mysql_anda
```

### 4. Jalankan Aplikasi

```bash
go run main.go
```

Aplikasi akan:

- Membaca konfigurasi dari file `.env`
- Koneksi ke database MySQL
- Membuat tabel-tabel yang diperlukan (auto migration)
- Menjalankan server di port 8080

### 5. Buat User Admin (Opsional)

Jika ingin membuat user admin default:

```bash
go run seed_admin.go
```

Credentials:

- Username: `admin`
- Password: `admin123`

## Troubleshooting

### MySQL Connection Refused

Jika mendapat error "connection refused":

1. Pastikan MySQL sudah berjalan: `sudo systemctl status mysql`
2. Start MySQL jika belum: `sudo systemctl start mysql`

### Access Denied for User

Jika mendapat error "access denied":

1. Periksa username dan password di file `.env`
2. Pastikan user MySQL memiliki akses ke database

### Port Already in Use

Jika port 8080 sudah digunakan:

1. Edit file `.env`
2. Ubah `PORT=8080` ke port lain, misalnya `PORT=8081`

## Testing API

### Test dengan curl

```bash
# Get services
curl http://localhost:8080/api/services

# Login
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test dengan Browser

Buka browser dan akses:

- Frontend: `file:///path/to/frontend/index.html`
- API: `http://localhost:8080/api/services`

## Frontend

Frontend terletak di folder `../frontend/`. Untuk menjalankan:

1. Buka file `index.html` di browser
2. Atau gunakan live server:
   ```bash
   cd ../frontend
   python3 -m http.server 3000
   ```
   Kemudian akses `http://localhost:3000`

## Status Aplikasi

Jika semua berjalan dengan baik, Anda akan melihat output seperti ini:

```
2025/11/30 16:55:00 Database connected successfully
2025/11/30 16:55:00 Database migration completed successfully
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] POST   /api/login                --> jabarjer-backend/controllers.Login (4 handlers)
[GIN-debug] GET    /api/services             --> jabarjer-backend/controllers.GetServices (4 handlers)
[GIN-debug] GET    /api/services/:id/packages --> jabarjer-backend/controllers.GetServicePackages (4 handlers)
[GIN-debug] POST   /api/orders/check-availability --> jabarjer-backend/controllers.CheckAvailability (4 handlers)
[GIN-debug] POST   /api/orders               --> jabarjer-backend/controllers.CreateOrder (4 handlers)
[GIN-debug] GET    /api/orders/:id           --> jabarjer-backend/controllers.GetOrder (4 handlers)
[GIN-debug] PUT    /api/orders/:id/status    --> jabarjer-backend/controllers.UpdateOrderStatus (4 handlers)
[GIN-debug] GET    /api/admin/orders         --> jabarjer-backend/controllers.GetOrders (4 handlers)
[GIN-debug] GET    /api/admin/orders/:id     --> jabarjer-backend/controllers.GetOrder (4 handlers)
[GIN-debug] PUT    /api/admin/orders/:id/status --> jabarjer-backend/controllers.UpdateOrderStatus (4 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :8080
```
