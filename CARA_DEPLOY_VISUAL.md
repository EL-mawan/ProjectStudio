# 🎯 CARA DEPLOY BACKEND - PANDUAN VISUAL

## ✅ YANG SUDAH SELESAI
- ✅ Code sudah di GitHub: https://github.com/EL-mawan/ProjectStudio
- ✅ Frontend sudah LIVE di Vercel: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app

## ⏳ YANG PERLU ANDA LAKUKAN (10 MENIT)

---

## 🚀 STEP 1: BUKA RAILWAY

### Cara:
1. Buka browser (Chrome/Firefox)
2. Ketik URL: **https://railway.app**
3. Klik tombol **"Login"** atau **"Start a New Project"**
4. Pilih **"Login with GitHub"**
5. Login dengan akun GitHub Anda (EL-mawan)

**Screenshot yang akan Anda lihat:**
```
┌─────────────────────────────────────┐
│         RAILWAY.APP                 │
│                                     │
│   [Login with GitHub]  ← KLIK INI  │
│                                     │
└─────────────────────────────────────┘
```

---

## 🚀 STEP 2: CREATE NEW PROJECT

### Cara:
1. Setelah login, Anda akan lihat **Dashboard Railway**
2. Klik tombol **"New Project"** (pojok kanan atas, warna ungu/biru)
3. Pilih **"Deploy from GitHub repo"**
4. Cari dan pilih repository: **"EL-mawan/ProjectStudio"**

**Screenshot yang akan Anda lihat:**
```
┌─────────────────────────────────────┐
│  New Project                        │
│                                     │
│  ○ Deploy from GitHub repo ← PILIH  │
│  ○ Deploy from template             │
│  ○ Empty project                    │
│                                     │
└─────────────────────────────────────┘
```

### ⚠️ PENTING - SET ROOT DIRECTORY!

Setelah pilih repository:
1. Railway akan tanya konfigurasi
2. Cari opsi **"Root Directory"** atau **"Configure"**
3. Set **Root Directory** = `backend`
4. Klik **"Deploy"**

**Ini SANGAT PENTING!** Tanpa ini, Railway tidak tahu folder mana yang harus di-deploy.

---

## 🚀 STEP 3: ADD MYSQL DATABASE

### Cara:
1. Di dashboard project Railway (setelah backend mulai deploy)
2. Klik tombol **"+ New"** atau **"Add Service"**
3. Pilih **"Database"**
4. Pilih **"Add MySQL"**
5. Tunggu beberapa detik sampai MySQL running (indikator berubah hijau)

**Screenshot yang akan Anda lihat:**
```
┌─────────────────────────────────────┐
│  + New                              │
│                                     │
│  ○ Database        ← PILIH INI      │
│     - PostgreSQL                    │
│     - MySQL        ← LALU PILIH INI │
│     - MongoDB                       │
│     - Redis                         │
│                                     │
└─────────────────────────────────────┘
```

---

## 🚀 STEP 4: SET ENVIRONMENT VARIABLES

### Cara:
1. Klik **service backend** (kotak yang bertuliskan nama project Anda, BUKAN MySQL)
2. Klik tab **"Variables"** (di menu atas)
3. Klik **"Raw Editor"** (pojok kanan atas)
4. **COPY-PASTE** konfigurasi di bawah ini:

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

5. Klik **"Add"** atau **"Save"**
6. Railway akan **auto-redeploy** backend dengan environment variables baru

**Screenshot yang akan Anda lihat:**
```
┌─────────────────────────────────────┐
│  Variables                          │
│                                     │
│  [Raw Editor] ← KLIK INI            │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ DB_HOST=${{MySQL.MYSQL_HOST}} │ │
│  │ DB_PORT=${{MySQL.MYSQL_PORT}} │ │
│  │ ...                           │ │
│  └───────────────────────────────┘ │
│                                     │
│  [Add Variables]                    │
└─────────────────────────────────────┘
```

---

## 🚀 STEP 5: GET BACKEND URL

### Cara:
1. Tunggu deployment selesai (2-5 menit)
   - Lihat di tab **"Deployments"** - status harus **"Success"** (hijau)
2. Klik tab **"Settings"**
3. Scroll ke bagian **"Networking"** atau **"Domains"**
4. Klik **"Generate Domain"** (jika belum ada domain)
5. **COPY URL** yang muncul

**Contoh URL yang akan Anda dapat:**
```
https://projectstudio-production.up.railway.app
```

**Screenshot yang akan Anda lihat:**
```
┌─────────────────────────────────────┐
│  Settings > Networking              │
│                                     │
│  Public Networking                  │
│  ┌───────────────────────────────┐ │
│  │ https://xxx.railway.app       │ │ ← COPY INI!
│  └───────────────────────────────┘ │
│                                     │
│  [Generate Domain]                  │
└─────────────────────────────────────┘
```

---

## 🎉 SETELAH DAPAT URL BACKEND

### **BERIKAN URL BACKEND KE SAYA!**

Contoh pesan Anda:
```
Backend URL: https://projectstudio-production.up.railway.app
```

Maka saya akan:
1. ✅ Update file `frontend/js/config.js` dengan URL backend Anda
2. ✅ Commit & push ke GitHub
3. ✅ Vercel akan auto-redeploy frontend
4. ✅ **Aplikasi siap digunakan!**

---

## 🎯 TESTING SETELAH DEPLOY

### Test Backend (Langsung):
Buka di browser:
```
https://YOUR-BACKEND-URL.railway.app/api/health
```

Jika berhasil, akan muncul response JSON.

### Test Frontend (Setelah saya update config):
Buka di browser:
```
https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app
```

### Login Admin:
```
URL: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app/admin/login.html
Username: admin
Password: admin123
```

---

## 📞 JIKA ADA ERROR

### Error saat deploy di Railway:
1. Klik tab **"Deployments"**
2. Klik deployment yang failed (merah)
3. Klik **"View Logs"**
4. Screenshot error message
5. Kirim ke saya untuk troubleshooting

### Error "Root Directory not set":
- Pastikan Root Directory = `backend` (bukan kosong!)
- Redeploy project

### Error "Database connection failed":
- Pastikan MySQL service sudah running (hijau)
- Cek environment variables sudah benar
- Pastikan format `${{MySQL.MYSQL_HOST}}` tidak diubah

---

## 🔗 LINKS PENTING

| Platform | URL | Kegunaan |
|----------|-----|----------|
| **Railway** | https://railway.app/dashboard | Deploy backend |
| **Vercel** | https://vercel.com/dashboard | Monitor frontend |
| **GitHub** | https://github.com/EL-mawan/ProjectStudio | Source code |
| **Frontend LIVE** | https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app | Website Anda |

---

## ⏱️ ESTIMASI WAKTU

- Setup Railway: **3 menit**
- Deploy backend: **2-5 menit**
- Update frontend config: **1 menit** (saya yang kerjakan)
- **Total: ~10 menit**

## 💰 BIAYA

- Railway: **GRATIS** (500 jam/bulan)
- Vercel: **GRATIS** (unlimited)
- **Total: Rp 0!** 🎉

---

**MULAI SEKARANG!**
**Buka: https://railway.app**
