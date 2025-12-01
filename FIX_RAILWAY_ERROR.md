# 🔧 FIX: Railway Build Error - Root Directory

## ❌ ERROR YANG TERJADI:
```
✖ Railpack could not determine how to build the app.
⚠ Script start.sh not found
```

## 🎯 PENYEBAB:
Railway mencoba build dari **root project** (/) bukan dari folder **backend**

## ✅ SOLUSI (2 MENIT):

### STEP 1: Buka Settings Service Backend
1. Di Railway dashboard, klik **service backend** Anda (yang failed)
2. Klik tab **"Settings"** (di menu atas)

### STEP 2: Set Root Directory
1. Scroll ke bagian **"Build"** atau **"Service Settings"**
2. Cari field **"Root Directory"** atau **"Source Directory"**
3. Isi dengan: `backend`
4. Klik **"Save"** atau tombol update

### STEP 3: Redeploy
1. Klik tab **"Deployments"**
2. Klik tombol **"Redeploy"** atau **"Deploy"** (pojok kanan atas)
3. Tunggu 2-5 menit

---

## 📸 SCREENSHOT PANDUAN:

```
┌─────────────────────────────────────────┐
│  Settings                               │
├─────────────────────────────────────────┤
│                                         │
│  Build Settings                         │
│  ┌─────────────────────────────────┐   │
│  │ Root Directory                  │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ backend          ← ISI INI  │ │   │
│  │ └─────────────────────────────┘ │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Save Changes]                         │
└─────────────────────────────────────────┘
```

---

## 🔍 ALTERNATIF: Jika Tidak Ada Opsi Root Directory

Jika Railway tidak menampilkan opsi "Root Directory", maka:

### Opsi A: Hapus dan Buat Ulang Service
1. Hapus service backend yang error
2. Klik **"+ New"** → **"GitHub Repo"**
3. Pilih **EL-mawan/ProjectStudio**
4. **PENTING**: Saat muncul dialog, pilih **"Configure"** atau **"Advanced"**
5. Set **Root Directory** = `backend`
6. Deploy

### Opsi B: Gunakan railway.toml
Saya akan buatkan file konfigurasi Railway yang otomatis set root directory.

---

## ⚡ QUICK FIX (Jika masih error):

Coba langkah ini:
1. Di Railway, **DELETE** service backend yang error
2. Klik **"+ New"** → **"Empty Service"**
3. Connect ke GitHub repo: **EL-mawan/ProjectStudio**
4. Set **Root Directory** = `backend`
5. Set **Builder** = `Dockerfile`

---

## 📞 JIKA MASIH ERROR:

Kirim screenshot dari:
1. Railway Settings page
2. Build logs (yang error)

Saya akan bantu troubleshooting lebih lanjut!
