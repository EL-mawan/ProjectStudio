# Content Management CRUD - Implementation Guide

## 📋 Overview

Panduan lengkap untuk membuat CRUD UI di Admin Dashboard untuk Content Management.

---

## 🎯 Sections yang Akan Dibuat

1. **Services Management** - Kelola layanan
2. **Packages Management** - Kelola paket
3. **About Content** - Edit konten halaman About
4. **Hero Section** - Kelola hero banner
5. **Contact Info** - Edit informasi kontak
6. **Site Settings** - Pengaturan website

---

## 📝 Step 1: Tambahkan Sections di admin.html

Tambahkan setelah section Orders (sebelum closing `</main>`):

```html
<!-- Services Management Section -->
<section id="services" class="content-section" style="display:none;">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Kelola Layanan</h2>
    <button class="btn btn-primary" onclick="newService()">
      <i class="fas fa-plus me-2"></i>Tambah Layanan
    </button>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="servicesTableBody">
            <tr>
              <td colspan="5" class="text-center">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- Packages Management Section -->
<section id="packages" class="content-section" style="display:none;">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Kelola Paket</h2>
    <button class="btn btn-primary" onclick="newPackage()">
      <i class="fas fa-plus me-2"></i>Tambah Paket
    </button>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Layanan</th>
              <th>Nama Paket</th>
              <th>Harga</th>
              <th>Durasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="packagesTableBody">
            <tr>
              <td colspan="7" class="text-center">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- About Content Section -->
<section id="about" class="content-section" style="display:none;">
  <h2 class="mb-4">Edit Konten Tentang</h2>

  <div class="card">
    <div class="card-body">
      <form id="aboutForm">
        <div class="mb-3">
          <label class="form-label">Judul</label>
          <input type="text" class="form-control" id="aboutTitle" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Subjudul</label>
          <input type="text" class="form-control" id="aboutSubtitle" />
        </div>
        <div class="mb-3">
          <label class="form-label">Deskripsi</label>
          <textarea
            class="form-control"
            id="aboutDescription"
            rows="5"
          ></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Misi</label>
          <textarea class="form-control" id="aboutMission" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Visi</label>
          <textarea class="form-control" id="aboutVision" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-2"></i>Simpan Perubahan
        </button>
      </form>
    </div>
  </div>
</section>

<!-- Hero Section -->
<section id="hero" class="content-section" style="display:none;">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Kelola Hero Section</h2>
    <button class="btn btn-primary" onclick="newHero()">
      <i class="fas fa-plus me-2"></i>Tambah Hero
    </button>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Subjudul</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="heroTableBody">
            <tr>
              <td colspan="5" class="text-center">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- Contact Info Section -->
<section id="contact" class="content-section" style="display:none;">
  <h2 class="mb-4">Edit Informasi Kontak</h2>

  <div class="card">
    <div class="card-body">
      <form id="contactForm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Alamat</label>
            <textarea
              class="form-control"
              id="contactAddress"
              rows="3"
            ></textarea>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Telepon</label>
            <input type="text" class="form-control" id="contactPhone" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" id="contactEmail" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">WhatsApp</label>
            <input type="text" class="form-control" id="contactWhatsapp" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Instagram</label>
            <input type="text" class="form-control" id="contactInstagram" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Facebook</label>
            <input type="text" class="form-control" id="contactFacebook" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Hari Kerja</label>
            <input
              type="text"
              class="form-control"
              id="contactWorkingDays"
              placeholder="Senin - Sabtu"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Jam Kerja</label>
            <input
              type="text"
              class="form-control"
              id="contactWorkingHours"
              placeholder="09:00 - 18:00"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Google Maps Embed Code</label>
          <textarea
            class="form-control"
            id="contactMapEmbed"
            rows="3"
            placeholder="<iframe src=..."
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-2"></i>Simpan Perubahan
        </button>
      </form>
    </div>
  </div>
</section>

<!-- Site Settings Section -->
<section id="settings" class="content-section" style="display:none;">
  <h2 class="mb-4">Pengaturan Website</h2>

  <div class="card">
    <div class="card-body">
      <form id="settingsForm">
        <div class="mb-3">
          <label class="form-label">Nama Website</label>
          <input type="text" class="form-control" id="settingsSiteName" />
        </div>
        <div class="mb-3">
          <label class="form-label">Logo URL</label>
          <input type="text" class="form-control" id="settingsLogoURL" />
        </div>
        <div class="mb-3">
          <label class="form-label">Favicon URL</label>
          <input type="text" class="form-control" id="settingsFaviconURL" />
        </div>
        <div class="mb-3">
          <label class="form-label">Meta Description</label>
          <textarea
            class="form-control"
            id="settingsMetaDescription"
            rows="3"
          ></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Meta Keywords</label>
          <input
            type="text"
            class="form-control"
            id="settingsMetaKeywords"
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-2"></i>Simpan Perubahan
        </button>
      </form>
    </div>
  </div>
</section>
```

---

## 📝 Step 2: Tambahkan Modals

Tambahkan sebelum closing `</body>`:

```html
<!-- Service Modal -->
<div class="modal fade" id="serviceModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Layanan</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div class="modal-body">
        <form id="serviceForm">
          <input type="hidden" id="serviceId" />
          <div class="mb-3">
            <label class="form-label">Nama Layanan</label>
            <input type="text" class="form-control" id="serviceName" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea
              class="form-control"
              id="serviceDescription"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">URL Gambar</label>
            <input type="text" class="form-control" id="serviceImage" />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="serviceActive"
              checked
            />
            <label class="form-check-label">Aktif</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Batal
        </button>
        <button type="button" class="btn btn-primary" onclick="saveService()">
          Simpan
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Package Modal -->
<div class="modal fade" id="packageModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Paket</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div class="modal-body">
        <form id="packageForm">
          <input type="hidden" id="packageId" />
          <div class="mb-3">
            <label class="form-label">Layanan</label>
            <select class="form-select" id="packageServiceId" required>
              <option value="">Pilih Layanan</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Nama Paket</label>
            <input type="text" class="form-control" id="packageName" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea
              class="form-control"
              id="packageDescription"
              rows="3"
            ></textarea>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Harga (Rp)</label>
              <input
                type="number"
                class="form-control"
                id="packagePrice"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Durasi (jam)</label>
              <input
                type="number"
                class="form-control"
                id="packageDuration"
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Fitur (satu per baris)</label>
            <textarea
              class="form-control"
              id="packageFeatures"
              rows="5"
              placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
            ></textarea>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="packageActive"
              checked
            />
            <label class="form-check-label">Aktif</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Batal
        </button>
        <button type="button" class="btn btn-primary" onclick="savePackage()">
          Simpan
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Hero Modal -->
<div class="modal fade" id="heroModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Hero Section</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div class="modal-body">
        <form id="heroForm">
          <input type="hidden" id="heroId" />
          <div class="mb-3">
            <label class="form-label">Judul</label>
            <input type="text" class="form-control" id="heroTitle" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Subjudul</label>
            <textarea
              class="form-control"
              id="heroSubtitle"
              rows="2"
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Teks Tombol</label>
            <input type="text" class="form-control" id="heroButtonText" />
          </div>
          <div class="mb-3">
            <label class="form-label">Link Tombol</label>
            <input type="text" class="form-control" id="heroButtonLink" />
          </div>
          <div class="mb-3">
            <label class="form-label">URL Gambar</label>
            <input type="text" class="form-control" id="heroImageURL" />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="heroActive"
              checked
            />
            <label class="form-check-label">Aktif</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Batal
        </button>
        <button type="button" class="btn btn-primary" onclick="saveHero()">
          Simpan
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 📝 Step 3: Tambahkan CSS

Tambahkan di `<style>` section:

```css
.content-section {
  margin-bottom: 30px;
}

.content-section.active {
  display: block !important;
}

.table-responsive {
  margin-top: 20px;
}

.badge {
  padding: 5px 10px;
  font-size: 0.85rem;
}
```

---

## 📝 Step 4: Tambahkan JavaScript untuk Navigation

Tambahkan sebelum closing `</script>`:

```javascript
// Section Navigation
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.style.display = "none";
  });

  // Show selected section
  const section = document.getElementById(sectionId.replace("#", ""));
  if (section) {
    section.style.display = "block";

    // Load data for section
    loadSectionData(sectionId.replace("#", ""));
  }

  // Update active nav link
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  const activeLink = document.querySelector(`.sidebar a[href="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

function loadSectionData(section) {
  switch (section) {
    case "services":
      loadServices();
      break;
    case "packages":
      loadPackages();
      break;
    case "about":
      loadAboutContent();
      break;
    case "hero":
      loadHeroContent();
      break;
    case "contact":
      loadContactInfo();
      break;
    case "settings":
      loadSiteSettings();
      break;
  }
}

// Handle sidebar clicks
document.querySelectorAll('.sidebar a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute("href");
    showSection(sectionId);
  });
});

// Show dashboard by default
document.addEventListener("DOMContentLoaded", function () {
  // Show orders section by default (or dashboard if you create it)
  showSection("#orders");
});
```

---

## 🎯 File Lengkap Sudah Dibuat!

Dokumentasi ini memberikan struktur lengkap untuk CRUD UI. Untuk implementasi JavaScript functions (loadServices, saveService, dll), lihat `IMPLEMENTATION_GUIDE.md` Step 7.

**Total estimasi waktu implementasi: 2-3 jam**

Semua kode sudah siap, tinggal copy-paste dan sesuaikan!
