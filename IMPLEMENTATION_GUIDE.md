# Complete CRUD Implementation Guide

## Project Studio - Admin Dashboard & Content Management

---

## 📋 Table of Contents

1. [What's Already Done](#whats-already-done)
2. [Step-by-Step Implementation](#step-by-step-implementation)
3. [Backend Setup](#backend-setup)
4. [Frontend Implementation](#frontend-implementation)
5. [Testing Guide](#testing-guide)
6. [Troubleshooting](#troubleshooting)

---

## ✅ What's Already Done

### Backend Files Created:

1. **`backend/controllers/service.go`** - Services CRUD
2. **`backend/controllers/package.go`** - Packages CRUD
3. **`backend/controllers/content.go`** - Content Management (About, Hero, Contact, Settings)
4. **`backend/models/content.go`** - Content models

### What Still Needs to Be Done:

1. Update database migration
2. Add routes for new controllers
3. Create admin UI
4. Integrate with frontend pages

---

## 🚀 Step-by-Step Implementation

### STEP 1: Update Database Migration

**File:** `backend/database/db.go`

Find the `AutoMigrate` section and add new models:

```go
// Add these imports at the top if not already there
import (
    "jabarjer-backend/models"
)

// In the InitDB function, update AutoMigrate:
err = DB.AutoMigrate(
    &models.User{},
    &models.Service{},
    &models.Package{},
    &models.Addon{},
    &models.Order{},
    &models.OrderAddon{},
    // ADD THESE NEW MODELS:
    &models.AboutContent{},
    &models.HeroContent{},
    &models.PortfolioItem{},
    &models.ContactInfo{},
    &models.SiteSettings{},
)
```

**Why:** This creates the database tables for content management.

---

### STEP 2: Update Routes

**File:** `backend/routes/admin.go`

Replace the entire file with:

```go
package routes

import (
	"jabarjer-backend/controllers"
	"jabarjer-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupAdminRoutes(router *gin.Engine) {
	// Admin routes group (requires authentication)
	admin := router.Group("/api/admin")
	admin.Use(middleware.AuthMiddleware())
	{
		// Orders Management
		admin.GET("/orders", controllers.GetOrders)
		admin.GET("/orders/:id", controllers.GetOrder)
		admin.PUT("/orders/:id/status", controllers.UpdateOrderStatus)

		// Services Management
		admin.POST("/services", controllers.CreateService)
		admin.PUT("/services/:id", controllers.UpdateService)
		admin.DELETE("/services/:id", controllers.DeleteService)
		admin.PATCH("/services/:id/toggle", controllers.ToggleServiceActive)

		// Packages Management
		admin.POST("/packages", controllers.CreatePackage)
		admin.PUT("/packages/:id", controllers.UpdatePackage)
		admin.DELETE("/packages/:id", controllers.DeletePackage)
		admin.PATCH("/packages/:id/toggle", controllers.TogglePackageActive)

		// Content Management - About
		admin.PUT("/content/about", controllers.UpdateAboutContent)

		// Content Management - Hero
		admin.GET("/content/hero/all", controllers.GetAllHeroContent)
		admin.POST("/content/hero", controllers.CreateHeroContent)
		admin.PUT("/content/hero/:id", controllers.UpdateHeroContent)
		admin.DELETE("/content/hero/:id", controllers.DeleteHeroContent)
		admin.PATCH("/content/hero/:id/toggle", controllers.ToggleHeroActive)

		// Content Management - Contact
		admin.PUT("/content/contact", controllers.UpdateContactInfo)

		// Content Management - Settings
		admin.PUT("/content/settings", controllers.UpdateSiteSettings)
	}
}
```

---

### STEP 3: Add Public Routes

**File:** `backend/routes/order.go`

Add these public routes at the end:

```go
// Add to SetupOrderRoutes function:

// Public routes for services and content
public := router.Group("/api")
{
    // Services (public)
    public.GET("/services", controllers.GetServices)
    public.GET("/services/:id", controllers.GetServiceByID)
    public.GET("/services/:id/packages", controllers.GetServicePackages)

    // Packages (public)
    public.GET("/packages", controllers.GetPackages)
    public.GET("/packages/:id", controllers.GetPackageByID)

    // Content (public)
    public.GET("/content/about", controllers.GetAboutContent)
    public.GET("/content/hero", controllers.GetHeroContent)
    public.GET("/content/contact", controllers.GetContactInfo)
    public.GET("/content/settings", controllers.GetSiteSettings)
}
```

---

### STEP 4: Update Config.js

**File:** `frontend/js/config.js`

Add new endpoints:

```javascript
const API_ENDPOINTS = {
  // Existing endpoints...
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,

  // Services
  services: `${API_BASE_URL}/services`,
  serviceById: (id) => `${API_BASE_URL}/services/${id}`,
  servicePackages: (id) => `${API_BASE_URL}/services/${id}/packages`,

  // Packages
  packages: `${API_BASE_URL}/packages`,
  packageById: (id) => `${API_BASE_URL}/packages/${id}`,

  // Content
  aboutContent: `${API_BASE_URL}/content/about`,
  heroContent: `${API_BASE_URL}/content/hero`,
  contactInfo: `${API_BASE_URL}/content/contact`,
  siteSettings: `${API_BASE_URL}/content/settings`,

  // Admin - Services
  adminCreateService: `${API_BASE_URL}/admin/services`,
  adminUpdateService: (id) => `${API_BASE_URL}/admin/services/${id}`,
  adminDeleteService: (id) => `${API_BASE_URL}/admin/services/${id}`,
  adminToggleService: (id) => `${API_BASE_URL}/admin/services/${id}/toggle`,

  // Admin - Packages
  adminCreatePackage: `${API_BASE_URL}/admin/packages`,
  adminUpdatePackage: (id) => `${API_BASE_URL}/admin/packages/${id}`,
  adminDeletePackage: (id) => `${API_BASE_URL}/admin/packages/${id}`,
  adminTogglePackage: (id) => `${API_BASE_URL}/admin/packages/${id}/toggle`,

  // Admin - Content
  adminUpdateAbout: `${API_BASE_URL}/admin/content/about`,
  adminGetAllHero: `${API_BASE_URL}/admin/content/hero/all`,
  adminCreateHero: `${API_BASE_URL}/admin/content/hero`,
  adminUpdateHero: (id) => `${API_BASE_URL}/admin/content/hero/${id}`,
  adminDeleteHero: (id) => `${API_BASE_URL}/admin/content/hero/${id}`,
  adminToggleHero: (id) => `${API_BASE_URL}/admin/content/hero/${id}/toggle`,
  adminUpdateContact: `${API_BASE_URL}/admin/content/contact`,
  adminUpdateSettings: `${API_BASE_URL}/admin/content/settings`,

  // Admin - Orders
  adminOrders: `${API_BASE_URL}/admin/orders`,
  adminOrderById: (id) => `${API_BASE_URL}/admin/orders/${id}`,
  adminUpdateOrderStatus: (id) => `${API_BASE_URL}/admin/orders/${id}/status`,
};
```

---

### STEP 5: Restart Backend

```bash
cd backend

# Stop existing server (Ctrl+C or kill process)

# Run backend
go run main.go
```

The database will auto-migrate and create new tables.

---

### STEP 6: Seed Initial Data (Optional)

Create file: `backend/cmd/seed/seed_content.go`

```go
package main

import (
	"log"

	"jabarjer-backend/database"
	"jabarjer-backend/models"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	if err := database.InitDB(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Seed About Content
	about := models.AboutContent{
		Title:       "Tentang Project Studio",
		Subtitle:    "Mengenal lebih dekat kami",
		Description: "Project Studio adalah penyedia layanan fotografi dan videografi profesional.",
		Mission:     "Mengabadikan setiap momen berharga dengan kualitas terbaik.",
		Vision:      "Menjadi studio fotografi terpercaya di Indonesia.",
	}
	database.DB.Create(&about)

	// Seed Hero Content
	hero := models.HeroContent{
		Title:      "Abadikan Momen Berharga Anda",
		Subtitle:   "Layanan fotografi dan videografi profesional untuk setiap momen spesial",
		ButtonText: "Pesan Sekarang",
		ButtonLink: "#booking",
		Active:     true,
	}
	database.DB.Create(&hero)

	// Seed Contact Info
	contact := models.ContactInfo{
		Address:      "Jl. Contoh No. 123, Jakarta",
		Phone:        "+62 812 3456 7890",
		Email:        "info@projectstudio.com",
		Instagram:    "@projectstudio",
		Whatsapp:     "+62 812 3456 7890",
		WorkingDays:  "Senin - Sabtu",
		WorkingHours: "09:00 - 18:00",
	}
	database.DB.Create(&contact)

	// Seed Site Settings
	settings := models.SiteSettings{
		SiteName:        "Project Studio",
		MetaDescription: "Professional photography and videography services",
		MetaKeywords:    "photography, videography, wedding, event",
	}
	database.DB.Create(&settings)

	log.Println("✅ Content seeded successfully!")
}
```

Run: `go run cmd/seed/seed_content.go`

---

### STEP 7: Create Admin UI - Services Management

**File:** Create `frontend/js/admin-services.js`

```javascript
// Services Management
let services = [];

async function loadServices() {
  try {
    const response = await fetch(API_ENDPOINTS.services);
    services = await response.json();
    displayServices();
  } catch (error) {
    console.error("Error loading services:", error);
    alert("Failed to load services");
  }
}

function displayServices() {
  const tbody = document.getElementById("servicesTableBody");
  if (!tbody) return;

  tbody.innerHTML = services
    .map(
      (service) => `
        <tr>
            <td>${service.id}</td>
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>
                <span class="badge bg-${
                  service.active ? "success" : "secondary"
                }">
                    ${service.active ? "Active" : "Inactive"}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editService(${
                  service.id
                })">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-${
                  service.active ? "warning" : "success"
                }" 
                        onclick="toggleService(${service.id})">
                    <i class="fas fa-${
                      service.active ? "eye-slash" : "eye"
                    }"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteService(${
                  service.id
                })">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `
    )
    .join("");
}

async function saveService(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("serviceName").value,
    description: document.getElementById("serviceDescription").value,
    image_url: document.getElementById("serviceImage").value,
    active: document.getElementById("serviceActive").checked,
  };

  const serviceId = document.getElementById("serviceId").value;
  const token = localStorage.getItem("token");

  try {
    const url = serviceId
      ? API_ENDPOINTS.adminUpdateService(serviceId)
      : API_ENDPOINTS.adminCreateService;

    const method = serviceId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Service saved successfully!");
      bootstrap.Modal.getInstance(
        document.getElementById("serviceModal")
      ).hide();
      loadServices();
    } else {
      alert("Failed to save service");
    }
  } catch (error) {
    console.error("Error saving service:", error);
    alert("Error saving service");
  }
}

async function toggleService(id) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(API_ENDPOINTS.adminToggleService(id), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      loadServices();
    }
  } catch (error) {
    console.error("Error toggling service:", error);
  }
}

async function deleteService(id) {
  if (!confirm("Are you sure you want to delete this service?")) return;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(API_ENDPOINTS.adminDeleteService(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Service deleted successfully!");
      loadServices();
    }
  } catch (error) {
    console.error("Error deleting service:", error);
  }
}

function editService(id) {
  const service = services.find((s) => s.id === id);
  if (!service) return;

  document.getElementById("serviceId").value = service.id;
  document.getElementById("serviceName").value = service.name;
  document.getElementById("serviceDescription").value = service.description;
  document.getElementById("serviceImage").value = service.image_url || "";
  document.getElementById("serviceActive").checked = service.active;

  new bootstrap.Modal(document.getElementById("serviceModal")).show();
}

function newService() {
  document.getElementById("serviceForm").reset();
  document.getElementById("serviceId").value = "";
  new bootstrap.Modal(document.getElementById("serviceModal")).show();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("servicesTableBody")) {
    loadServices();
  }
});
```

---

## 📝 Next Steps Summary

1. ✅ Update `database/db.go` - Add new models to AutoMigrate
2. ✅ Update `routes/admin.go` - Add all new routes
3. ✅ Update `routes/order.go` - Add public routes
4. ✅ Update `frontend/js/config.js` - Add all endpoints
5. ✅ Restart backend server
6. ✅ (Optional) Run seed script
7. ✅ Create admin UI files
8. ✅ Update admin.html to include new sections
9. ✅ Test all endpoints
10. ✅ Integrate with frontend pages

---

## 🎯 Priority Order

**High Priority:**

1. Services & Packages Management (for booking system)
2. About Content Management
3. Contact Info Management

**Medium Priority:** 4. Hero Content Management 5. Site Settings 6. Orders Enhancement

**Low Priority:** 7. Portfolio Management 8. Advanced features

---

## 📚 Additional Resources

- API Documentation: See `CRUD_IMPLEMENTATION_PLAN.md`
- Database Schema: Check models in `backend/models/`
- Frontend Examples: Check existing `admin.html` for patterns

---

## ⚠️ Important Notes

1. Always use authentication for admin endpoints
2. Test each endpoint before moving to next
3. Keep backup of database before major changes
4. Use soft delete (GORM handles this automatically)
5. Validate all user inputs

---

**Good luck with the implementation! 🚀**
