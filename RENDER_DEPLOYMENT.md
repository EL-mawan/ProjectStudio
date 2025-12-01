# 🚀 DEPLOYMENT GUIDE - RENDER.COM (100% GRATIS)

## ✅ Keuntungan Render.com
- ✅ **PostgreSQL Database GRATIS** (1GB storage)
- ✅ **Web Service GRATIS** (750 jam/bulan)
- ✅ **Auto-deploy dari GitHub**
- ✅ **SSL/HTTPS otomatis**
- ✅ **Tidak perlu kartu kredit**

---

## 📋 LANGKAH DEPLOYMENT (5-10 MENIT)

### STEP 1: Buat Akun Render

1. Buka **https://render.com**
2. Klik **"Get Started for Free"**
3. Login dengan **GitHub** (akun: EL-mawan)
4. Authorize Render untuk akses repository

---

### STEP 2: Deploy dari GitHub (Otomatis!)

Karena saya sudah membuat file `render.yaml`, deployment akan **OTOMATIS**!

1. Di Dashboard Render, klik **"New +"** → **"Blueprint"**
2. Connect repository: **EL-mawan/ProjectStudio**
3. Render akan mendeteksi file `render.yaml`
4. Klik **"Apply"**

**Render akan otomatis:**
- ✅ Membuat PostgreSQL Database
- ✅ Deploy Backend Go
- ✅ Menghubungkan keduanya
- ✅ Set semua environment variables

---

### STEP 3: Set Midtrans Keys (Manual)

Setelah deployment selesai:

1. Buka service **jabarjer-backend**
2. Klik **"Environment"** (tab kiri)
3. Tambahkan 2 variables ini:

```
MIDTRANS_SERVER_KEY = your-midtrans-server-key-here
MIDTRANS_CLIENT_KEY = your-midtrans-client-key-here
```

4. Klik **"Save Changes"**
5. Render akan auto-redeploy

---

### STEP 4: Get Backend URL

1. Buka service **jabarjer-backend**
2. Copy URL di bagian atas (contoh: `https://jabarjer-backend.onrender.com`)
3. **BERIKAN URL INI KEPADA SAYA** agar saya bisa update frontend!

---

## 🎯 Setelah Deployment Sukses

### Test Backend
Buka di browser:
```
https://YOUR-BACKEND-URL.onrender.com/api/health
```

Jika berhasil, akan muncul response JSON.

### Update Frontend
Setelah Anda berikan URL backend, saya akan:
1. Update `frontend/js/config.js`
2. Push ke GitHub
3. Vercel auto-redeploy
4. **Website siap digunakan!**

---

## 💡 TIPS PENTING

### Free Tier Limitations
- Service akan **sleep** setelah 15 menit tidak ada traffic
- **Cold start** pertama kali bisa 30-60 detik
- Database: 1GB storage (cukup untuk ribuan orders)

### Cara Mengatasi Sleep
- Gunakan **UptimeRobot** (gratis) untuk ping setiap 5 menit
- Atau upgrade ke Paid plan ($7/bulan) untuk always-on

---

## 🔧 TROUBLESHOOTING

### Build Failed
- Cek **Logs** di Render dashboard
- Pastikan Go version di `go.mod` sesuai (1.24)

### Database Connection Error
- Pastikan environment variables sudah ter-set otomatis
- Cek di tab **Environment** → pastikan ada `DB_HOST`, `DB_USER`, dll

### Midtrans Not Working
- Pastikan `MIDTRANS_SERVER_KEY` dan `MIDTRANS_CLIENT_KEY` sudah di-set
- Cek di Midtrans Dashboard: Settings → Configuration → Notification URL:
  ```
  https://YOUR-BACKEND-URL.onrender.com/api/payment/notification
  ```

---

## 📊 DEPLOYMENT STATUS

| Item | Status | Platform |
|------|--------|----------|
| **Frontend** | ✅ LIVE | Vercel |
| **Backend** | ⏳ DEPLOY NOW | Render.com |
| **Database** | ⏳ AUTO-CREATE | Render PostgreSQL |
| **Total Cost** | 💰 **Rp 0** | FREE! |

---

## 🔗 LINKS PENTING

- **Render Dashboard**: https://dashboard.render.com
- **GitHub Repo**: https://github.com/EL-mawan/ProjectStudio
- **Frontend (Vercel)**: https://jabarjer-studio-g85q6hp2t-el-mawans-projects.vercel.app
- **Render Docs**: https://render.com/docs

---

## 🎉 NEXT STEPS

1. **Deploy sekarang** di Render (ikuti STEP 1-4 di atas)
2. **Berikan Backend URL** kepada saya
3. Saya akan **update frontend config**
4. **Website LIVE!** 🚀

---

**MULAI DEPLOYMENT SEKARANG!**
**Buka: https://render.com**
