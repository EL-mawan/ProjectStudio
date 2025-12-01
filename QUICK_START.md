# Quick Start Guide - CRUD Implementation

## 🚀 Fastest Way to Get Started

### 1. Update Database (2 minutes)

**File:** `backend/database/db.go`

Find line with `AutoMigrate` and add:

```go
&models.AboutContent{},
&models.HeroContent{},
&models.PortfolioItem{},
&models.ContactInfo{},
&models.SiteSettings{},
```

### 2. Update Routes (3 minutes)

Copy the routes code from `IMPLEMENTATION_GUIDE.md` Step 2 and Step 3.

### 3. Update Config (2 minutes)

Copy the API_ENDPOINTS code from `IMPLEMENTATION_GUIDE.md` Step 4.

### 4. Restart Backend (1 minute)

```bash
cd backend
# Kill existing process
go run main.go
```

### 5. Test API (2 minutes)

```bash
# Test public endpoints
curl http://localhost:8080/api/services
curl http://localhost:8080/api/content/about
curl http://localhost:8080/api/content/hero

# Should return data (empty arrays or default content)
```

## ✅ You're Done with Backend!

Now you can:

- Create admin UI
- Integrate with frontend
- Add more features

## 📋 What You Have Now

### Working Endpoints:

**Public:**

- GET `/api/services` - List services
- GET `/api/services/:id` - Service detail
- GET `/api/content/about` - About content
- GET `/api/content/hero` - Hero content
- GET `/api/content/contact` - Contact info

**Admin (need token):**

- POST `/api/admin/services` - Create service
- PUT `/api/admin/services/:id` - Update service
- DELETE `/api/admin/services/:id` - Delete service
- PUT `/api/admin/content/about` - Update about
- And many more...

## 🎯 Next: Build Admin UI

See `IMPLEMENTATION_GUIDE.md` Step 7 for admin UI code.

---

**Total Time: ~10 minutes to get backend running!** 🚀
