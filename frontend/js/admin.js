// Admin Panel JavaScript

// Global variables
let currentPage = 1;
const ordersPerPage = 10;
let totalOrders = 0;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    if (!isAuthenticated() || !isAdmin()) {
        window.location.href = 'login.html';
        return;
    }

    initializeAdmin();
    setupEventListeners();
    loadDashboardStats();
    loadRecentOrders();
});

function initializeAdmin() {
    // Display user info
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
    }
}

function setupEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Top navigation
    document.getElementById('ordersNav').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('orders');
    });

    document.getElementById('usersNav').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('users');
    });

    // Buttons
    document.getElementById('refreshStats').addEventListener('click', loadDashboardStats);
    document.getElementById('refreshOrders').addEventListener('click', loadOrders);
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('saveStatusBtn').addEventListener('click', saveOrderStatus);
    document.getElementById('saveUserBtn').addEventListener('click', saveNewUser);
    document.getElementById('savePasswordBtn').addEventListener('click', changePassword);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });

    // Change password
    document.getElementById('changePasswordBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('changePasswordModal'));
        modal.show();
    });

    // Profile
    document.getElementById('profileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Fitur profil akan segera tersedia', 'info');
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('d-none');
    });

    // Show selected section
    document.getElementById(sectionName + '-section').classList.remove('d-none');

    // Update active sidebar link
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Load section data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardStats();
            loadRecentOrders();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'users':
            loadUsers();
            break;
    }
}

// Dashboard functions
function loadDashboardStats() {
    authFetch('/api/admin/dashboard/stats')
        .then(response => response.json())
        .then(stats => {
            document.getElementById('totalOrders').textContent = stats.total_orders;
            document.getElementById('completedOrders').textContent = stats.completed_orders;
            document.getElementById('monthlyRevenue').textContent = formatCurrency(stats.monthly_revenue);
            document.getElementById('servicesCount').textContent = stats.services_count;
        })
        .catch(error => {
            console.error('Error loading dashboard stats:', error);
            showNotification('Gagal memuat statistik dashboard', 'danger');
        });
}

function loadRecentOrders() {
    authFetch('/api/admin/orders?limit=5')
        .then(response => response.json())
        .then(data => {
            displayRecentOrders(data.orders);
        })
        .catch(error => {
            console.error('Error loading recent orders:', error);
        });
}

function displayRecentOrders(orders) {
    const tbody = document.getElementById('recentOrdersTable');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada pesanan</td></tr>';
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id.substring(0, 8)}...</td>
            <td>${order.customer_name}</td>
            <td>${order.service_type}</td>
            <td>${formatDate(order.event_date)}</td>
            <td>${formatCurrency(order.subtotal)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary view-order" data-id="${order.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary edit-status" data-id="${order.id}" data-status="${order.status}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners
    document.querySelectorAll('.view-order').forEach(button => {
        button.addEventListener('click', function() {
            viewOrderDetails(this.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.edit-status').forEach(button => {
        button.addEventListener('click', function() {
            openEditStatusModal(this.getAttribute('data-id'), this.getAttribute('data-status'));
        });
    });
}

// Orders management functions
function loadOrders(page = 1) {
    const statusFilter = document.getElementById('statusFilter').value;
    const serviceFilter = document.getElementById('serviceFilter').value;
    
    let url = `/api/admin/orders?page=${page}&limit=${ordersPerPage}`;
    if (statusFilter) url += `&status=${statusFilter}`;
    if (serviceFilter) url += `&service_type=${serviceFilter}`;

    authFetch(url)
        .then(response => response.json())
        .then(data => {
            displayOrders(data.orders);
            totalOrders = data.total;
            setupPagination(page, Math.ceil(totalOrders / ordersPerPage));
        })
        .catch(error => {
            console.error('Error loading orders:', error);
            showNotification('Gagal memuat daftar pesanan', 'danger');
        });
}

function displayOrders(orders) {
    const tbody = document.getElementById('ordersTable');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center">Tidak ada pesanan</td></tr>';
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id.substring(0, 8)}...</td>
            <td>
                <strong>${order.customer_name}</strong><br>
                <small class="text-muted">${order.customer_phone}</small><br>
                <small class="text-muted">${order.customer_email}</small>
            </td>
            <td>${order.service_type}</td>
            <td>${order.package_name}</td>
            <td>${formatDate(order.event_date)}</td>
            <td>${order.event_location}</td>
            <td>${formatCurrency(order.subtotal)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>${formatDate(order.created_at)}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary view-order" data-id="${order.id}" title="Lihat Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-secondary edit-status" data-id="${order.id}" data-status="${order.status}" title="Edit Status">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners
    document.querySelectorAll('.view-order').forEach(button => {
        button.addEventListener('click', function() {
            viewOrderDetails(this.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.edit-status').forEach(button => {
        button.addEventListener('click', function() {
            openEditStatusModal(this.getAttribute('data-id'), this.getAttribute('data-status'));
        });
    });
}

function setupPagination(currentPage, totalPages) {
    const pagination = document.getElementById('ordersPagination');
    pagination.innerHTML = '';

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>`;
    pagination.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        pagination.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>`;
    pagination.appendChild(nextLi);

    // Add event listeners
    pagination.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            if (page >= 1 && page <= totalPages) {
                loadOrders(page);
            }
        });
    });
}

function applyFilters() {
    currentPage = 1;
    loadOrders(currentPage);
}

function viewOrderDetails(orderId) {
    authFetch(`/api/orders/${orderId}`)
        .then(response => response.json())
        .then(order => {
            displayOrderDetails(order);
        })
        .catch(error => {
            console.error('Error loading order details:', error);
            showNotification('Gagal memuat detail pesanan', 'danger');
        });
}

function displayOrderDetails(order) {
    const content = document.getElementById('orderDetailContent');
    
    let addonsHtml = '';
    if (order.addons && order.addons.length > 0) {
        addonsHtml = `
            <h6>Tambahan Layanan:</h6>
            <ul>
                ${order.addons.map(addon => `
                    <li>${addon.addon_name} - ${formatCurrency(addon.addon_price)} x ${addon.quantity}</li>
                `).join('')}
            </ul>
        `;
    }

    content.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Informasi Customer</h6>
                <p><strong>Nama:</strong> ${order.customer_name}</p>
                <p><strong>Email:</strong> ${order.customer_email}</p>
                <p><strong>Telepon:</strong> ${order.customer_phone}</p>
                <p><strong>Alamat:</strong> ${order.customer_address}</p>
            </div>
            <div class="col-md-6">
                <h6>Detail Pesanan</h6>
                <p><strong>Layanan:</strong> ${order.service_type}</p>
                <p><strong>Paket:</strong> ${order.package_name}</p>
                <p><strong>Tanggal Acara:</strong> ${formatDate(order.event_date)}</p>
                <p><strong>Lokasi:</strong> ${order.event_location}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status}</span></p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <h6>Rincian Pembayaran</h6>
                <table class="table table-sm">
                    <tr>
                        <td>Harga Paket:</td>
                        <td class="text-end">${formatCurrency(order.package_price)}</td>
                    </tr>
                    <tr>
                        <td>Tambahan Layanan:</td>
                        <td class="text-end">${formatCurrency(order.addons_total)}</td>
                    </tr>
                    <tr>
                        <td><strong>Subtotal:</strong></td>
                        <td class="text-end"><strong>${formatCurrency(order.subtotal)}</strong></td>
                    </tr>
                    <tr>
                        <td>Metode Pembayaran:</td>
                        <td class="text-end">${order.payment_method === 'dp' ? 'Down Payment (30%)' : 'Pembayaran Penuh'}</td>
                    </tr>
                    ${order.payment_method === 'dp' ? `
                        <tr>
                            <td>Down Payment:</td>
                            <td class="text-end">${formatCurrency(order.down_payment)}</td>
                        </tr>
                        <tr>
                            <td>Sisa Pembayaran:</td>
                            <td class="text-end">${formatCurrency(order.remaining_amount)}</td>
                        </tr>
                    ` : ''}
                </table>
            </div>
        </div>
        ${addonsHtml}
        ${order.notes ? `<div class="mt-3"><strong>Catatan:</strong> ${order.notes}</div>` : ''}
    `;

    const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
    modal.show();
}

function openEditStatusModal(orderId, currentStatus) {
    document.getElementById('editOrderId').value = orderId;
    document.getElementById('statusSelect').value = currentStatus;
    document.getElementById('statusNotes').value = '';

    const modal = new bootstrap.Modal(document.getElementById('editStatusModal'));
    modal.show();
}

function saveOrderStatus() {
    const orderId = document.getElementById('editOrderId').value;
    const newStatus = document.getElementById('statusSelect').value;
    const notes = document.getElementById('statusNotes').value;

    authFetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({
            status: newStatus,
            notes: notes
        })
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Status pesanan berhasil diperbarui', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editStatusModal'));
        modal.hide();
        
        // Refresh orders list
        if (document.getElementById('orders-section').classList.contains('d-none')) {
            loadRecentOrders();
        } else {
            loadOrders(currentPage);
        }
    })
    .catch(error => {
        console.error('Error updating order status:', error);
        showNotification('Gagal memperbarui status pesanan', 'danger');
    });
}

// Users management functions
function loadUsers() {
    authFetch('/api/admin/users')
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        })
        .catch(error => {
            console.error('Error loading users:', error);
            showNotification('Gagal memuat daftar pengguna', 'danger');
        });
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada pengguna</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge bg-${user.role === 'super_admin' ? 'danger' : 'primary'}">${user.role}</span></td>
            <td>${user.last_login ? formatDate(user.last_login) : 'Belum pernah'}</td>
            <td><span class="badge bg-${user.active ? 'success' : 'secondary'}">${user.active ? 'Aktif' : 'Nonaktif'}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-secondary edit-user" data-id="${user.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-user" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function saveNewUser() {
    const form = document.getElementById('addUserForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const userData = {
        username: document.getElementById('newUsername').value,
        password: document.getElementById('newPassword').value,
        name: document.getElementById('newName').value,
        email: document.getElementById('newEmail').value,
        role: document.getElementById('newRole').value
    };

    authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(user => {
        showNotification('Pengguna berhasil ditambahkan', 'success');
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        form.reset();
        
        // Refresh users list
        loadUsers();
    })
    .catch(error => {
        console.error('Error creating user:', error);
        showNotification('Gagal menambahkan pengguna', 'danger');
    });
}

function changePassword() {
    const form = document.getElementById('changePasswordForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        showNotification('Password baru dan konfirmasi password tidak cocok', 'danger');
        return;
    }

    authFetch('/api/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Password berhasil diubah', 'success');
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
        modal.hide();
        form.reset();
    })
    .catch(error => {
        console.error('Error changing password:', error);
        showNotification('Gagal mengubah password', 'danger');
    });
}