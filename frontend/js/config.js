// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// API Endpoints
const API_ENDPOINTS = {
    // Auth
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    
    // Services (Public)
    services: `${API_BASE_URL}/services`,
    serviceDetail: (id) => `${API_BASE_URL}/services/${id}`,
    servicePackages: (id) => `${API_BASE_URL}/services/${id}/packages`,
    
    // Packages (Public)
    packages: `${API_BASE_URL}/packages`,
    packageDetail: (id) => `${API_BASE_URL}/packages/${id}`,
    
    // Content (Public)
    aboutContent: `${API_BASE_URL}/content/about`,
    heroContent: `${API_BASE_URL}/content/hero`,
    contactInfo: `${API_BASE_URL}/content/contact`,
    siteSettings: `${API_BASE_URL}/content/settings`,
    
    // Orders
    orders: `${API_BASE_URL}/orders`,
    orderDetail: (id) => `${API_BASE_URL}/orders/${id}`,
    checkAvailability: `${API_BASE_URL}/orders/check-availability`,
    updateOrderStatus: (id) => `${API_BASE_URL}/orders/${id}/status`,
    
    // Payment
    paymentStatus: (id) => `${API_BASE_URL}/payment/status/${id}`,
    paymentNotification: `${API_BASE_URL}/payment/notification`,
    
    // Admin - Orders
    adminOrders: `${API_BASE_URL}/admin/orders`,
    adminOrderDetail: (id) => `${API_BASE_URL}/admin/orders/${id}`,
    adminUpdateOrderStatus: (id) => `${API_BASE_URL}/admin/orders/${id}/status`,
    
    // Admin - Users
    adminUsers: `${API_BASE_URL}/admin/users`,
    
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
    
    // Admin - About Content
    adminUpdateAbout: `${API_BASE_URL}/admin/content/about`,
    
    // Admin - Hero Content
    adminGetAllHero: `${API_BASE_URL}/admin/content/hero`,
    adminCreateHero: `${API_BASE_URL}/admin/content/hero`,
    adminUpdateHero: (id) => `${API_BASE_URL}/admin/content/hero/${id}`,
    adminDeleteHero: (id) => `${API_BASE_URL}/admin/content/hero/${id}`,
    adminToggleHero: (id) => `${API_BASE_URL}/admin/content/hero/${id}/toggle`,
    
    // Admin - Contact Info
    adminUpdateContact: `${API_BASE_URL}/admin/content/contact`,
    
    // Admin - Site Settings
    adminUpdateSettings: `${API_BASE_URL}/admin/content/settings`,
};

// Helper function to make API calls
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API call failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Helper function for authenticated API calls
async function authenticatedApiCall(url, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
        throw new Error('Not authenticated');
    }

    return apiCall(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });
}
