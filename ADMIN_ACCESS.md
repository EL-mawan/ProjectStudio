# Admin Access Guide

## Admin Dashboard Access

### URL

```
http://localhost:3000/login.html
```

### Admin Credentials

#### Default Admin (Original)

- **Username:** `admin`
- **Password:** `admin123`
- **Role:** admin

#### Project Studio Admin (New)

- **Username:** `project@studio.com`
- **Password:** `admin123456`
- **Role:** admin
- **Name:** Project Studio Admin

## Login Process

1. Navigate to: `http://localhost:3000/login.html`
2. Enter username: `project@studio.com`
3. Enter password: `admin123456`
4. Click "Login"
5. You will be automatically redirected to: `http://localhost:3000/admin.html`

## Features Available in Admin Dashboard

- ✅ View all orders
- ✅ Update order status
- ✅ View order details
- ✅ Manage bookings
- ✅ Access to admin-only routes

## Security Notes

⚠️ **Important:** Please change the password after first login for security purposes.

## API Endpoints (Admin Only)

All admin endpoints require authentication token in the header:

```
Authorization: Bearer <your-jwt-token>
```

### Available Admin Endpoints:

- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get specific order
- `PUT /api/admin/orders/:id/status` - Update order status

## Troubleshooting

### Cannot Login?

1. Make sure backend server is running on port 8080
2. Make sure frontend server is running on port 3000
3. Check browser console for errors
4. Verify credentials are correct

### Backend Not Running?

```bash
cd backend
go run main.go
```

### Frontend Not Running?

```bash
cd frontend
python3 -m http.server 3000
```

## Creating Additional Admin Users

To create more admin users, run:

```bash
cd backend
go run cmd/seed/create_admin.go
```

Then modify the script with new credentials before running.
