// Authentication functions

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

// Check if user is admin
function isAdmin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin' || user.role === 'super_admin';
}

// Get authentication headers for API requests
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Make authenticated API request
function authFetch(url, options = {}) {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return Promise.reject('Not authenticated');
    }

    const headers = getAuthHeaders();
    
    return fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    }).then(response => {
        if (response.status === 401) {
            // Token expired or invalid
            logout();
            throw new Error('Authentication failed');
        }
        return response;
    });
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingAlert = document.querySelector('.alert-notification');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-notification`;
    alert.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 1050; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Format date
function formatDate(dateString) {
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}