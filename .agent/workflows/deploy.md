---
description: Deploy aplikasi ke Railway (Backend) dan Vercel (Frontend)
---

# 🚀 Deployment Workflow - Jabarjer Studio

## Status Deployment Saat Ini

✅ **Frontend**: Sudah deploy di Vercel
- URL: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app
- Status: LIVE

⏳ **Backend**: Perlu deploy ke Railway
- Repository: https://github.com/EL-mawan/ProjectStudio
- Status: PENDING

---

## STEP 1: Deploy Backend ke Railway (5-10 Menit)

### 1.1 Buka Railway Dashboard
```
URL: https://railway.app
Login dengan: GitHub (akun EL-mawan)
```

### 1.2 Create New Project
1. Klik tombol **"New Project"** (pojok kanan atas)
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository: **EL-mawan/ProjectStudio**
4. **PENTING**: Klik **"Configure"** atau **"Settings"**
5. Set **Root Directory** = `backend` (WAJIB!)
6. Klik **"Deploy"**

### 1.3 Add MySQL Database
1. Di dashboard project Railway, klik **"+ New"**
2. Pilih **"Database"**
3. Pilih **"Add MySQL"**
4. Tunggu hingga MySQL service running (indikator hijau)

### 1.4 Set Environment Variables
1. Klik service **backend** (bukan MySQL)
2. Klik tab **"Variables"**
3. Klik **"Raw Editor"** (pojok kanan atas)
4. **COPY-PASTE** konfigurasi berikut:

```env
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_USER=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_NAME=${{MySQL.MYSQL_DATABASE}}
JWT_SECRET=jabarjer-super-secret-jwt-key-2024-production-change-this
PORT=8080
MIDTRANS_SERVER_KEY=your-midtrans-server-key-here
MIDTRANS_CLIENT_KEY=your-midtrans-client-key-here
MIDTRANS_ENVIRONMENT=sandbox
```

5. Klik **"Add"** atau **"Save"**
6. Railway akan **auto-redeploy** backend

### 1.5 Get Backend URL
1. Tunggu deployment selesai (2-5 menit)
2. Klik service **backend**
3. Klik tab **"Settings"**
4. Scroll ke **"Networking"** atau **"Domains"**
5. Klik **"Generate Domain"** jika belum ada
6. **COPY URL** yang muncul (contoh: `https://projectstudio-production.up.railway.app`)

---

## STEP 2: Update Frontend Config

Setelah mendapat URL backend dari Railway, jalankan command berikut:

// turbo
```bash
# Update config.js dengan URL backend
echo "Paste URL backend Railway di sini, lalu AI akan update config.js"
```

---

## STEP 3: Setup Midtrans Webhook (Opsional)

1. Login ke Midtrans Dashboard: https://dashboard.sandbox.midtrans.com
2. Menu **Settings** → **Configuration**
3. Set **Payment Notification URL**:
   ```
   https://YOUR-BACKEND-URL.railway.app/api/payment/notification
   ```
4. Klik **Save**

---

## STEP 4: Seed Admin User (Via Railway Console)

1. Di Railway dashboard, klik service **backend**
2. Klik tab **"Deployments"**
3. Klik deployment yang aktif (paling atas)
4. Klik **"View Logs"**
5. Cek apakah ada error

**Untuk seed admin user**, bisa via:
- Railway CLI: `railway run go run cmd/seed/main.go`
- Atau manual via MySQL console di Railway

---

## ✅ Verification Checklist

- [ ] Backend deploy sukses di Railway
- [ ] MySQL database running
- [ ] Environment variables sudah diset
- [ ] Backend URL sudah di-copy
- [ ] Frontend config.js sudah diupdate dengan backend URL
- [ ] Frontend redeploy sukses
- [ ] Test akses frontend URL
- [ ] Test login admin (username: admin, password: admin123)
- [ ] Midtrans webhook sudah diset (opsional)

---

## 🆘 Troubleshooting

### Backend deployment gagal
- Cek **Root Directory** sudah diset ke `backend`
- Cek **Logs** di Railway untuk error message
- Pastikan Dockerfile ada di folder backend

### Database connection error
- Pastikan MySQL service sudah running (hijau)
- Cek environment variables sudah benar
- Pastikan format `${{MySQL.MYSQL_HOST}}` tidak diubah

### Frontend tidak bisa connect ke backend
- Pastikan backend URL di config.js sudah benar
- Cek CORS settings di backend
- Test backend URL langsung di browser: `https://your-backend.railway.app/api/health`

---

## 📝 URLs Penting

- **GitHub Repo**: https://github.com/EL-mawan/ProjectStudio
- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Frontend URL**: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app
- **Backend URL**: (akan didapat setelah deploy ke Railway)
- **Midtrans Sandbox**: https://dashboard.sandbox.midtrans.com

---

**Setelah mendapat Backend URL dari Railway, berikan ke AI untuk update frontend config!**
