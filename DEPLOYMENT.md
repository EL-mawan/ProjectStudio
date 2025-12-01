# 🚀 Deployment Guide - Project Jabarjer Studio

## Deployment ke Railway.app (GRATIS)

### Prerequisites
1. Akun GitHub (gratis)
2. Akun Railway.app (gratis - 500 jam/bulan)

---

## 📝 LANGKAH-LANGKAH DEPLOYMENT

### **STEP 1: Push ke GitHub**

```bash
# Di root project
cd /home/arwan/Dokumen/Go-Lang/Project-go-awal/projectJabarjergo

# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create repo di GitHub, lalu:
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

### **STEP 2: Deploy Backend ke Railway**

1. **Buka Railway.app**
   - Kunjungi: https://railway.app
   - Login dengan GitHub

2. **Create New Project**
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository Anda
   - Pilih folder `backend`

3. **Add MySQL Database**
   - Di project Railway, klik "New"
   - Pilih "Database" → "Add MySQL"
   - Railway akan auto-create database

4. **Set Environment Variables**
   - Klik service backend Anda
   - Tab "Variables"
   - Add variables berikut:

   ```
   DB_HOST=${{MySQL.MYSQL_HOST}}
   DB_PORT=${{MySQL.MYSQL_PORT}}
   DB_USER=${{MySQL.MYSQL_USER}}
   DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   DB_NAME=${{MySQL.MYSQL_DATABASE}}
   JWT_SECRET=your-super-secret-jwt-key-change-this
   PORT=8080
   MIDTRANS_SERVER_KEY=your-midtrans-server-key
   MIDTRANS_CLIENT_KEY=your-midtrans-client-key
   MIDTRANS_ENVIRONMENT=sandbox
   ```

5. **Deploy**
   - Railway akan auto-deploy
   - Tunggu hingga selesai (2-5 menit)
   - Copy URL backend Anda (contoh: `https://your-app.railway.app`)

---

### **STEP 3: Deploy Frontend ke Vercel**

1. **Buka Vercel.com**
   - Kunjungi: https://vercel.com
   - Login dengan GitHub

2. **Import Project**
   - Klik "Add New" → "Project"
   - Import repository yang sama
   - Root Directory: pilih `frontend`

3. **Configure**
   - Framework Preset: Other
   - Build Command: (kosongkan)
   - Output Directory: `.`
   - Install Command: (kosongkan)

4. **Update API URL**
   - Setelah deploy, edit file `frontend/js/config.js`
   - Ganti `API_BASE_URL`:
   
   ```javascript
   const API_BASE_URL = 'https://your-backend.railway.app/api';
   ```

5. **Redeploy**
   - Push perubahan ke GitHub
   - Vercel akan auto-redeploy

---

### **STEP 4: Setup Midtrans Webhook**

1. Login ke Midtrans Dashboard
2. Settings → Configuration
3. Payment Notification URL:
   ```
   https://your-backend.railway.app/api/payment/notification
   ```
4. Save

---

### **STEP 5: Seed Admin User**

```bash
# SSH ke Railway (via Railway CLI)
railway run go run cmd/seed/main.go
```

Atau manual via Railway dashboard:
- Buka MySQL database
- Run SQL:
```sql
INSERT INTO users (username, name, email, password, role, created_at, updated_at)
VALUES ('admin', 'Administrator', 'admin@jabarjer.com', 
        '$2a$10$...', 'admin', NOW(), NOW());
```

---

## 🎉 DEPLOYMENT SELESAI!

**Frontend URL:** `https://your-app.vercel.app`
**Backend URL:** `https://your-backend.railway.app`

### Default Admin Login:
- Username: `admin`
- Password: `admin123` (ganti setelah login pertama!)

---

## 💰 BIAYA

- **Railway:** GRATIS (500 jam/bulan)
- **Vercel:** GRATIS (unlimited untuk hobby)
- **Total:** Rp 0 / bulan! 🎉

---

## 🔧 TROUBLESHOOTING

### Backend tidak bisa connect ke database
- Cek environment variables di Railway
- Pastikan MySQL service sudah running

### Frontend tidak bisa hit backend
- Cek CORS settings di backend
- Pastikan API_BASE_URL sudah benar

### Midtrans webhook tidak jalan
- Pastikan URL notification sudah diset di Midtrans
- Cek logs di Railway untuk error

---

## 📚 ALTERNATIF DEPLOYMENT

### Render.com (Backend + Database)
- Free tier: 750 jam/bulan
- PostgreSQL gratis
- Auto-sleep setelah 15 menit idle

### Netlify (Frontend)
- Sama seperti Vercel
- Free tier unlimited

### Fly.io (Backend)
- Free tier: 3 VMs kecil
- Support MySQL via PlanetScale (gratis)

---

## 🔐 PRODUCTION CHECKLIST

- [ ] Ganti JWT_SECRET dengan random string
- [ ] Ganti password admin default
- [ ] Setup HTTPS (auto di Railway & Vercel)
- [ ] Setup custom domain (opsional)
- [ ] Enable Midtrans production mode
- [ ] Setup monitoring & logging
- [ ] Backup database regular
- [ ] Test semua fitur di production

---

**Good luck! 🚀**
