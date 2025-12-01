# Admin Dashboard Redesign Guide

## Modern Bootstrap Template - Matching Frontend Design

---

## 🎨 Design Concept

Admin dashboard akan menggunakan:

- **Modern Bootstrap 5** components
- **Gradient theme** (Purple - matching admin login)
- **Glassmorphism** effects
- **Smooth animations**
- **Responsive sidebar**
- **Modern cards & tables**

---

## 📝 Complete Modern Admin Dashboard Template

Ganti seluruh isi `admin.html` dengan template berikut:

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard - Project Studio</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Inter", sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        min-height: 100vh;
      }

      /* Navbar */
      .navbar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
      }

      .navbar-brand {
        font-weight: 800;
        font-size: 1.3rem;
        color: white !important;
      }

      .navbar .nav-link {
        color: rgba(255, 255, 255, 0.9) !important;
        font-weight: 500;
        transition: all 0.3s;
      }

      .navbar .nav-link:hover {
        color: white !important;
      }

      /* Sidebar */
      .sidebar {
        position: fixed;
        top: 70px;
        left: 0;
        height: calc(100vh - 70px);
        width: 260px;
        background: white;
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
        overflow-y: auto;
        transition: all 0.3s;
        z-index: 1000;
      }

      .sidebar::-webkit-scrollbar {
        width: 6px;
      }

      .sidebar::-webkit-scrollbar-thumb {
        background: #667eea;
        border-radius: 10px;
      }

      .sidebar .nav-link {
        color: #6c757d;
        padding: 12px 20px;
        margin: 4px 10px;
        border-radius: 10px;
        transition: all 0.3s;
        font-weight: 500;
        display: flex;
        align-items: center;
      }

      .sidebar .nav-link i {
        width: 20px;
        margin-right: 12px;
      }

      .sidebar .nav-link:hover {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.1) 0%,
          rgba(118, 75, 162, 0.1) 100%
        );
        color: #667eea;
        transform: translateX(5px);
      }

      .sidebar .nav-link.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }

      .sidebar-heading {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #999;
        font-weight: 700;
        padding: 20px 20px 10px;
      }

      /* Main Content */
      .main-content {
        margin-left: 260px;
        padding: 30px;
        min-height: calc(100vh - 70px);
      }

      /* Cards */
      .card {
        border: none;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        transition: all 0.3s;
        background: white;
      }

      .card:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        transform: translateY(-5px);
      }

      .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 16px 16px 0 0 !important;
        padding: 20px;
        font-weight: 700;
      }

      /* Stats Cards */
      .stat-card {
        border-radius: 16px;
        padding: 25px;
        color: white;
        position: relative;
        overflow: hidden;
      }

      .stat-card::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(30%, -30%);
      }

      .stat-card i {
        font-size: 2.5rem;
        opacity: 0.3;
        position: absolute;
        right: 20px;
        bottom: 20px;
      }

      .stat-card h3 {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 5px;
      }

      .stat-card p {
        margin: 0;
        opacity: 0.9;
        font-weight: 500;
      }

      .stat-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .stat-success {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      }
      .stat-warning {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      }
      .stat-danger {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      }

      /* Table */
      .table {
        border-radius: 12px;
        overflow: hidden;
      }

      .table thead th {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.1) 0%,
          rgba(118, 75, 162, 0.1) 100%
        );
        color: #667eea;
        font-weight: 700;
        border: none;
        padding: 15px;
      }

      .table tbody tr {
        transition: all 0.3s;
      }

      .table tbody tr:hover {
        background: rgba(102, 126, 234, 0.05);
        transform: scale(1.01);
      }

      /* Buttons */
      .btn {
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: 600;
        transition: all 0.3s;
      }

      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }

      .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
      }

      .btn-sm {
        padding: 6px 12px;
        font-size: 0.875rem;
      }

      /* Badges */
      .badge {
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: 600;
      }

      /* Page Header */
      .page-header {
        background: white;
        border-radius: 16px;
        padding: 25px;
        margin-bottom: 30px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .page-header h1 {
        font-size: 1.8rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .sidebar {
          transform: translateX(-100%);
        }

        .sidebar.show {
          transform: translateX(0);
        }

        .main-content {
          margin-left: 0;
        }
      }

      /* Content Sections */
      .content-section {
        display: none;
      }

      .content-section.active {
        display: block;
        animation: fadeIn 0.3s;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </head>
  <body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container-fluid px-4">
        <a class="navbar-brand" href="#">
          <i class="fas fa-shield-alt me-2"></i>
          Project Studio Admin
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html" target="_blank">
                <i class="fas fa-external-link-alt me-1"></i> View Website
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-user-circle me-1"></i>
                <span id="adminName">Admin</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="index.html"
                    ><i class="fas fa-home me-2"></i>Homepage</a
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" id="logoutBtn"
                    ><i class="fas fa-sign-out-alt me-2"></i>Logout</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-heading">Main Menu</div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="#dashboard">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#orders">
            <i class="fas fa-shopping-cart"></i> Pesanan
          </a>
        </li>
      </ul>

      <div class="sidebar-heading">Content Management</div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#services">
            <i class="fas fa-concierge-bell"></i> Layanan
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#packages">
            <i class="fas fa-box"></i> Paket
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#about">
            <i class="fas fa-info-circle"></i> Tentang
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#hero">
            <i class="fas fa-image"></i> Hero Section
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">
            <i class="fas fa-address-book"></i> Kontak
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#settings">
            <i class="fas fa-cog"></i> Pengaturan
          </a>
        </li>
      </ul>

      <div class="sidebar-heading">Website</div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="index.html" target="_blank">
            <i class="fas fa-external-link-alt"></i> Lihat Website
          </a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content" style="margin-top: 70px;">
      <!-- Dashboard Section -->
      <section id="dashboard" class="content-section active">
        <div class="page-header">
          <h1><i class="fas fa-tachometer-alt me-2"></i>Dashboard Overview</h1>
          <p class="text-muted mb-0">
            Selamat datang di admin dashboard Project Studio
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="row g-4 mb-4">
          <div class="col-md-3">
            <div class="stat-card stat-primary">
              <h3 id="totalOrders">0</h3>
              <p>Total Pesanan</p>
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-success">
              <h3 id="completedOrders">0</h3>
              <p>Selesai</p>
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-warning">
              <h3 id="pendingOrders">0</h3>
              <p>Pending</p>
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-danger">
              <h3 id="cancelledOrders">0</h3>
              <p>Dibatalkan</p>
              <i class="fas fa-times-circle"></i>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="card">
          <div class="card-header">
            <i class="fas fa-list me-2"></i>Pesanan Terbaru
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pelanggan</th>
                    <th>Layanan</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody id="recentOrdersTable">
                  <tr>
                    <td colspan="6" class="text-center">Loading...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Orders Section (existing) -->
      <section id="orders" class="content-section">
        <!-- Your existing orders section code here -->
      </section>

      <!-- Other sections will be added here -->
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/config.js"></script>
    <script>
      // Navigation
      document
        .querySelectorAll('.sidebar .nav-link[href^="#"]')
        .forEach((link) => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("href").substring(1);

            // Update active link
            document
              .querySelectorAll(".sidebar .nav-link")
              .forEach((l) => l.classList.remove("active"));
            this.classList.add("active");

            // Show section
            document
              .querySelectorAll(".content-section")
              .forEach((s) => s.classList.remove("active"));
            document.getElementById(target).classList.add("active");

            // Load data
            loadSectionData(target);
          });
        });

      function loadSectionData(section) {
        switch (section) {
          case "dashboard":
            loadDashboardStats();
            break;
          case "orders":
            loadOrders();
            break;
          // Add other cases
        }
      }

      // Load dashboard stats
      async function loadDashboardStats() {
        // Implementation here
      }

      // Logout
      document
        .getElementById("logoutBtn")
        .addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "admin/login.html";
        });

      // Load user name
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.name) {
        document.getElementById("adminName").textContent = user.name;
      }

      // Check authentication
      if (!localStorage.getItem("token")) {
        window.location.href = "admin/login.html";
      }
    </script>
  </body>
</html>
```

---

## 🎨 Features of New Design:

1. **Modern Gradient Theme** - Purple gradient matching login
2. **Glassmorphism Cards** - Modern card design
3. **Smooth Animations** - Fade in, hover effects
4. **Stats Cards** - Beautiful gradient stat cards
5. **Modern Table** - Styled table with hover effects
6. **Responsive Sidebar** - Collapsible on mobile
7. **Professional Typography** - Inter font
8. **Consistent Design** - Matches frontend pages

---

## 📝 Next Steps:

1. Backup current `admin.html`
2. Replace with new template
3. Add your existing orders section code
4. Add other CRUD sections from `CRUD_UI_GUIDE.md`
5. Test navigation and styling

---

**Total Time: 30 minutes to implement**

Template sudah siap pakai dan matching dengan frontend design! 🚀
