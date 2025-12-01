# Implementation Plan - Full CRUD Admin Dashboard

## Overview

Implementasi sistem CRUD lengkap untuk admin dashboard yang terintegrasi dengan halaman depan website.

## Features to Implement

### 1. Services Management

**Backend:**

- ✅ Model sudah ada (`models/package.go`)
- [ ] CRUD Controllers (`controllers/service.go`)
  - Create Service
  - Read Services (List & Detail)
  - Update Service
  - Delete Service
  - Toggle Active Status
- [ ] Admin Routes (`routes/admin.go`)

**Frontend:**

- [ ] Admin UI (`admin.html` - Services section)
  - List services dengan table
  - Add/Edit modal
  - Delete confirmation
  - Toggle active/inactive
- [ ] Homepage integration (`index.html`)
  - Load services dari API
  - Display active services only

### 2. Packages Management

**Backend:**

- ✅ Model sudah ada (`models/package.go`)
- [ ] CRUD Controllers (`controllers/package.go`)
  - Create Package
  - Read Packages (by Service)
  - Update Package
  - Delete Package
  - Toggle Active Status
- [ ] Admin Routes

**Frontend:**

- [ ] Admin UI (Packages section)
  - List packages per service
  - Add/Edit modal
  - Manage features (JSON array)
  - Delete confirmation
- [ ] Homepage integration
  - Load packages when service selected
  - Display in booking flow

### 3. Orders Management Enhancement

**Backend:**

- ✅ Basic CRUD sudah ada
- [ ] Enhancements:
  - Filter by status
  - Filter by date range
  - Search by customer name
  - Export to CSV/Excel
  - Order statistics

**Frontend:**

- [ ] Enhanced Admin UI
  - Advanced filters
  - Search functionality
  - Pagination
  - Status badges
  - Quick actions
- [ ] Customer order tracking
  - Order history page
  - Status tracking

### 4. Content Management

**Backend:**

- [ ] New Models (`models/content.go`)
  - About content
  - Portfolio items
  - Contact info
  - Site settings
- [ ] Controllers (`controllers/content.go`)
  - CRUD for each content type
- [ ] Routes

**Frontend:**

- [ ] Admin UI (Content section)
  - About page editor
  - Portfolio gallery manager
  - Contact info editor
  - Site settings
- [ ] Frontend integration
  - Dynamic about page
  - Dynamic portfolio
  - Dynamic contact info

## Implementation Order

### Phase 1: Services & Packages CRUD (Priority: HIGH)

1. Backend Services CRUD
2. Backend Packages CRUD
3. Admin UI for Services
4. Admin UI for Packages
5. Homepage integration

### Phase 2: Orders Enhancement (Priority: MEDIUM)

1. Backend enhancements
2. Admin UI improvements
3. Customer order tracking

### Phase 3: Content Management (Priority: MEDIUM)

1. Models & migrations
2. Backend CRUD
3. Admin UI
4. Frontend integration

## Database Schema

### Services Table (Existing)

```sql
- id (uint)
- name (string)
- description (text)
- image_url (string)
- active (boolean)
- created_at, updated_at, deleted_at
```

### Packages Table (Existing)

```sql
- id (uint)
- service_id (uint)
- name (string)
- description (text)
- price (int64)
- duration (int)
- features (json)
- active (boolean)
- created_at, updated_at, deleted_at
```

### Content Tables (New)

```sql
-- About Content
- id (uint)
- title (string)
- content (text)
- team_members (json)
- updated_at

-- Portfolio Items
- id (uint)
- title (string)
- description (text)
- category (string)
- image_url (string)
- date (date)
- active (boolean)

-- Contact Info
- id (uint)
- address (string)
- phone (string)
- email (string)
- instagram (string)
- facebook (string)
- whatsapp (string)
- map_embed (text)

-- Site Settings
- id (uint)
- site_name (string)
- logo_url (string)
- favicon_url (string)
- meta_description (text)
```

## API Endpoints

### Services

```
GET    /api/services              - List all services
GET    /api/services/:id          - Get service detail
POST   /api/admin/services        - Create service
PUT    /api/admin/services/:id    - Update service
DELETE /api/admin/services/:id    - Delete service
PATCH  /api/admin/services/:id/toggle - Toggle active
```

### Packages

```
GET    /api/services/:id/packages     - List packages by service
GET    /api/packages/:id              - Get package detail
POST   /api/admin/packages            - Create package
PUT    /api/admin/packages/:id        - Update package
DELETE /api/admin/packages/:id        - Delete package
PATCH  /api/admin/packages/:id/toggle - Toggle active
```

### Content

```
GET    /api/content/about         - Get about content
PUT    /api/admin/content/about   - Update about
GET    /api/content/portfolio     - List portfolio items
POST   /api/admin/content/portfolio - Create portfolio item
GET    /api/content/contact       - Get contact info
PUT    /api/admin/content/contact - Update contact
GET    /api/content/settings      - Get site settings
PUT    /api/admin/content/settings - Update settings
```

## File Structure

```
backend/
├── controllers/
│   ├── service.go (NEW)
│   ├── package.go (NEW)
│   ├── content.go (NEW)
│   ├── order.go (ENHANCE)
│   └── admin.go (UPDATE)
├── models/
│   ├── package.go (EXISTING)
│   ├── content.go (NEW)
│   └── order.go (EXISTING)
└── routes/
    └── admin.go (UPDATE)

frontend/
├── admin.html (MAJOR UPDATE)
├── index.html (UPDATE - dynamic data)
├── about.html (UPDATE - dynamic data)
├── portfolio.html (UPDATE - dynamic data)
├── contact.html (UPDATE - dynamic data)
└── js/
    ├── admin-services.js (NEW)
    ├── admin-packages.js (NEW)
    ├── admin-content.js (NEW)
    └── admin-orders.js (NEW)
```

## Next Steps

1. Confirm this plan
2. Start with Phase 1 (Services & Packages)
3. Implement backend first
4. Then frontend
5. Test integration
6. Move to next phase

## Estimated Time

- Phase 1: 2-3 hours
- Phase 2: 1-2 hours
- Phase 3: 2-3 hours
- Total: 5-8 hours of development

## Notes

- All admin endpoints require authentication
- Soft delete for all resources
- Image upload will use base64 or external URL for now
- Can add file upload later if needed
