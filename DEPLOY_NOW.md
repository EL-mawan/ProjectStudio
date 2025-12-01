# 🚀 QUICK DEPLOYMENT GUIDE

## ✅ Status Deployment

### Frontend (Vercel) - SUDAH DEPLOY ✅
- **URL**: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app
- **Status**: LIVE
- **Platform**: Vercel

### Backend (Railway) - PERLU DEPLOY ⏳
- **Repository**: https://github.com/EL-mawan/ProjectStudio
- **Platform**: Railway.app
- **Status**: PENDING - Ikuti langkah di bawah

---

## 📋 LANGKAH DEPLOY BACKEND (5 MENIT)

### 1️⃣ Buka Railway
```
🌐 URL: https://railway.app
🔐 Login dengan: GitHub (akun EL-mawan)
```

### 2️⃣ Create Project
1. Klik **"New Project"** (pojok kanan atas)
2. Pilih **"Deploy from GitHub repo"**
3. Pilih: **EL-mawan/ProjectStudio**
4. ⚠️ **PENTING**: Set **Root Directory** = `backend`

### 3️⃣ Add Database
1. Klik **"+ New"** → **"Database"** → **"Add MySQL"**
2. Tunggu MySQL running (indikator hijau)

### 4️⃣ Set Environment Variables
1. Klik service **backend** (bukan MySQL)
2. Tab **"Variables"** → **"Raw Editor"**
3. **COPY-PASTE** ini:

```env
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_USER=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_NAME=${{MySQL.MYSQL_DATABASE}}
JWT_SECRET=jabarjer-super-secret-jwt-key-2024-production
PORT=8080
MIDTRANS_SERVER_KEY=your-midtrans-server-key-here
MIDTRANS_CLIENT_KEY=your-midtrans-client-key-here
MIDTRANS_ENVIRONMENT=sandbox
```

4. Klik **"Add"**

### 5️⃣ Get Backend URL
1. Tunggu deployment selesai (2-5 menit)
2. Tab **"Settings"** → **"Networking"**
3. Klik **"Generate Domain"**
4. **COPY URL** (contoh: `https://xxx.railway.app`)

---

## 🔄 SETELAH BACKEND DEPLOY

**Berikan URL backend ke AI**, maka AI akan:
1. ✅ Update `frontend/js/config.js`
2. ✅ Commit & push ke GitHub
3. ✅ Vercel auto-redeploy
4. ✅ Aplikasi siap digunakan!

---

## 🎯 Default Admin Login

Setelah deployment selesai:
- **URL**: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app/admin/login.html
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Ganti password setelah login pertama!**

---

## 📞 Butuh Bantuan?

Jika ada error saat deployment:
1. Screenshot error message
2. Cek logs di Railway dashboard
3. Berikan info ke AI untuk troubleshooting

---

## 🔗 Links Penting

- 🌐 **Railway Dashboard**: https://railway.app/dashboard
- 🌐 **Vercel Dashboard**: https://vercel.com/dashboard
- 📦 **GitHub Repo**: https://github.com/EL-mawan/ProjectStudio
- 💳 **Midtrans Sandbox**: https://dashboard.sandbox.midtrans.com

---

**Total Waktu Deploy: ~10 menit**
**Total Biaya: Rp 0 (GRATIS!) 🎉**
