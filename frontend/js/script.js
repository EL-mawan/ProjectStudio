// Data Layanan dan Paket
const servicesData = {
    'foto-studio': {
        name: 'Foto Studio',
        packages: [
            {
                id: 1,
                name: 'Paket Basic',
                description: 'Sesi foto 2 jam, 10 foto edited, cetak 5x7 (5 lembar)',
                price: 500000,
                features: ['2 jam sesi foto', '10 foto edited', '5 cetak foto 5x7', '1 konsep pemotretan']
            },
            {
                id: 2,
                name: 'Paket Standard',
                description: 'Sesi foto 3 jam, 20 foto edited, cetak 5x7 (10 lembar), album kecil',
                price: 850000,
                features: ['3 jam sesi foto', '20 foto edited', '10 cetak foto 5x7', 'Album kecil', '2 konsep pemotretan']
            },
            {
                id: 3,
                name: 'Paket Premium',
                description: 'Sesi foto 4 jam, 30 foto edited, cetak berbagai ukuran, album premium',
                price: 1200000,
                features: ['4 jam sesi foto', '30 foto edited', 'Cetak berbagai ukuran', 'Album premium', '3 konsep pemotretan', 'Makeup artist']
            }
        ],
        addons: [
            { id: 1, name: 'Tambah 1 Jam', price: 150000 },
            { id: 2, name: 'Tambah 5 Foto Edited', price: 75000 },
            { id: 3, name: 'Album Premium', price: 200000 },
            { id: 4, name: 'Cetak Canvas', price: 250000 }
        ]
    },
    'tenda-pernikahan': {
        name: 'Tenda Pernikahan',
        packages: [
            {
                id: 1,
                name: 'Paket Small',
                description: 'Tenda 4x6m, kursi 50 orang, meja 5 buah, dekorasi sederhana',
                price: 2500000,
                features: ['Tenda 4x6m', 'Kursi 50 orang', 'Meja 5 buah', 'Dekorasi sederhana', 'Penerangan dasar']
            },
            {
                id: 2,
                name: 'Paket Medium',
                description: 'Tenda 6x8m, kursi 100 orang, meja 10 buah, dekorasi menengah',
                price: 4000000,
                features: ['Tenda 6x8m', 'Kursi 100 orang', 'Meja 10 buah', 'Dekorasi menengah', 'Penerangan lengkap', 'Karpet']
            },
            {
                id: 3,
                name: 'Paket Large',
                description: 'Tenda 8x12m, kursi 200 orang, meja 20 buah, dekorasi premium',
                price: 6500000,
                features: ['Tenda 8x12m', 'Kursi 200 orang', 'Meja 20 buah', 'Dekorasi premium', 'Penerangan profesional', 'Karpet premium', 'Panggung kecil']
            }
        ],
        addons: [
            { id: 1, name: 'Sound System', price: 500000 },
            { id: 2, name: 'AC Portable', price: 300000 },
            { id: 3, name: 'Dekorasi Premium', price: 1000000 },
            { id: 4, name: 'Kursi Premium', price: 500000 }
        ]
    },
    'undangan-online': {
        name: 'Undangan Online',
        packages: [
            {
                id: 1,
                name: 'Paket Basic',
                description: 'Template standar, RSVP, maps location, countdown timer',
                price: 300000,
                features: ['Template standar', 'Fitur RSVP', 'Maps location', 'Countdown timer', 'Galeri foto (5 foto)']
            },
            {
                id: 2,
                name: 'Paket Standard',
                description: 'Template pilihan, RSVP, maps, countdown, galeri foto, musik',
                price: 500000,
                features: ['Template pilihan', 'Fitur RSVP', 'Maps location', 'Countdown timer', 'Galeri foto (10 foto)', 'Musik latar', 'Amplop digital']
            },
            {
                id: 3,
                name: 'Paket Premium',
                description: 'Template custom, semua fitur, domain khusus, QR code',
                price: 800000,
                features: ['Template custom', 'Semua fitur premium', 'Domain khusus (.com)', 'QR code', 'Galeri foto unlimited', 'Musik pilihan', 'Amplop digital premium']
            }
        ],
        addons: [
            { id: 1, name: 'Domain .com (1 tahun)', price: 150000 },
            { id: 2, name: 'Foto Profesional', price: 300000 },
            { id: 3, name: 'Video Pendek', price: 500000 },
            { id: 4, name: 'Custom Animation', price: 400000 }
        ]
    },
    'makeup': {
        name: 'Jasa Makeup',
        packages: [
            {
                id: 1,
                name: 'Paket Basic',
                description: 'Makeup natural, tahan 6 jam, trial 1x, untuk 1 orang',
                price: 400000,
                features: ['Makeup natural', 'Tahan 6 jam', 'Trial 1x', 'Untuk 1 orang', 'Produk standar']
            },
            {
                id: 2,
                name: 'Paket Standard',
                description: 'Makeup glamour, tahan 8 jam, trial 2x, untuk 1 orang + touch up',
                price: 650000,
                features: ['Makeup glamour', 'Tahan 8 jam', 'Trial 2x', 'Untuk 1 orang', 'Touch up', 'Produk premium']
            },
            {
                id: 3,
                name: 'Paket Premium',
                description: 'Makeup artistic, tahan 12 jam, trial 3x, untuk 2 orang + full service',
                price: 1200000,
                features: ['Makeup artistic', 'Tahan 12 jam', 'Trial 3x', 'Untuk 2 orang', 'Full service', 'Produk luxury', 'Hairdo styling']
            }
        ],
        addons: [
            { id: 1, name: 'Tambahan Orang', price: 200000 },
            { id: 2, name: 'Hairdo Styling', price: 250000 },
            { id: 3, name: 'Touch Up Extra', price: 100000 },
            { id: 4, name: 'Produk Luxury', price: 300000 }
        ]
    }
};

// State aplikasi
let currentState = {
    currentService: null,
    selectedPackage: null,
    selectedDate: null,
    location: '',
    selectedAddons: [],
    cart: [],
    customerInfo: {}
};

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setMinDate();
    
    // Check if we need to restore cart after login
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('restoreCart') === 'true') {
        restorePendingCart();
        // Remove the query parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

function initializeApp() {
    // Set tanggal minimum untuk pemesanan (hari ini + 1)
    const dateInput = document.getElementById('booking-date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInput = document.getElementById('booking-date');
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

function setupEventListeners() {
    // Service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            selectService(serviceType);
        });
    });
    
    // Back buttons
    document.getElementById('btn-back-to-services').addEventListener('click', backToServices);
    document.getElementById('btn-back-to-config').addEventListener('click', backToConfig);
    document.getElementById('btn-back-to-cart').addEventListener('click', backToCart);
    
    // Add to cart
    document.getElementById('btn-add-to-cart').addEventListener('click', addToCart);
    
    // Checkout
    document.getElementById('btn-proceed-checkout').addEventListener('click', proceedToCheckout);
    document.getElementById('checkout-form').addEventListener('submit', processCheckout);
    
    // Payment method change
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', updatePaymentSummary);
    });
    
    // Date change
    document.getElementById('booking-date').addEventListener('change', function() {
        currentState.selectedDate = this.value;
    });
    
    // Location change
    document.getElementById('booking-location').addEventListener('input', function() {
        currentState.location = this.value;
    });
}

function selectService(serviceType) {
    currentState.currentService = serviceType;
    
    // Update UI untuk menunjukkan service yang dipilih
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-service="${serviceType}"]`).classList.add('selected');
    
    // Tampilkan konfigurasi service
    showServiceConfig();
}

function showServiceConfig() {
    // Sembunyikan sections lainnya
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'service-config') {
            section.classList.add('d-none');
        }
    });
    
    // Tampilkan config section
    document.getElementById('service-config').classList.remove('d-none');
    
    // Update judul
    document.getElementById('config-service-name').textContent = `Konfigurasi ${servicesData[currentState.currentService].name}`;
    
    // Load packages
    loadPackages();
    
    // Load addons
    loadAddons();
    
    // Reset selected items
    currentState.selectedPackage = null;
    currentState.selectedAddons = [];
    
    // Update summary
    updateConfigSummary();
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

function loadPackages() {
    const packagesContainer = document.getElementById('package-options');
    packagesContainer.innerHTML = '';
    
    const packages = servicesData[currentState.currentService].packages;
    
    packages.forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.className = 'col-md-4';
        packageElement.innerHTML = `
            <div class="package-option" data-package-id="${pkg.id}">
                <h6>${pkg.name}</h6>
                <p class="small">${pkg.description}</p>
                <div class="package-price">Rp ${formatCurrency(pkg.price)}</div>
                <ul class="small mt-2">
                    ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
        
        packageElement.querySelector('.package-option').addEventListener('click', function() {
            selectPackage(pkg.id);
        });
        
        packagesContainer.appendChild(packageElement);
    });
}

function loadAddons() {
    const addonsContainer = document.getElementById('addon-options');
    addonsContainer.innerHTML = '';
    
    const addons = servicesData[currentState.currentService].addons;
    
    addons.forEach(addon => {
        const addonElement = document.createElement('div');
        addonElement.className = 'addon-option mb-2';
        addonElement.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="addon-${addon.id}" value="${addon.id}">
                <label class="form-check-label w-100" for="addon-${addon.id}">
                    <div class="d-flex justify-content-between">
                        <span>${addon.name}</span>
                        <span class="addon-price">+ Rp ${formatCurrency(addon.price)}</span>
                    </div>
                </label>
            </div>
        `;
        
        addonElement.querySelector('input').addEventListener('change', function() {
            toggleAddon(addon.id, this.checked);
        });
        
        addonsContainer.appendChild(addonElement);
    });
}

function selectPackage(packageId) {
    // Hapus seleksi sebelumnya
    document.querySelectorAll('.package-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Tandai yang dipilih
    document.querySelector(`[data-package-id="${packageId}"]`).classList.add('selected');
    
    // Simpan di state
    currentState.selectedPackage = servicesData[currentState.currentService].packages.find(p => p.id === packageId);
    
    // Update summary
    updateConfigSummary();
}

function toggleAddon(addonId, isSelected) {
    const addon = servicesData[currentState.currentService].addons.find(a => a.id === addonId);
    
    if (isSelected) {
        currentState.selectedAddons.push(addon);
    } else {
        currentState.selectedAddons = currentState.selectedAddons.filter(a => a.id !== addonId);
    }
    
    updateConfigSummary();
}

function updateConfigSummary() {
    const packagePrice = currentState.selectedPackage ? currentState.selectedPackage.price : 0;
    const addonsPrice = currentState.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = packagePrice + addonsPrice;
    
    document.getElementById('config-subtotal').textContent = `Rp ${formatCurrency(packagePrice)}`;
    document.getElementById('config-addons').textContent = `Rp ${formatCurrency(addonsPrice)}`;
    document.getElementById('config-total').textContent = `Rp ${formatCurrency(totalPrice)}`;
}

function addToCart() {
    if (!currentState.selectedPackage) {
        alert('Silakan pilih paket terlebih dahulu');
        return;
    }
    
    if (!currentState.selectedDate) {
        alert('Silakan pilih tanggal pemesanan');
        return;
    }
    
    if (!currentState.location.trim()) {
        alert('Silakan masukkan lokasi acara');
        return;
    }
    
    // Buat item cart
    const cartItem = {
        service: currentState.currentService,
        serviceName: servicesData[currentState.currentService].name,
        package: currentState.selectedPackage,
        date: currentState.selectedDate,
        location: currentState.location,
        addons: [...currentState.selectedAddons],
        totalPrice: calculateTotalPrice()
    };
    
    // Tambahkan ke cart
    currentState.cart.push(cartItem);
    
    // Tampilkan cart
    showCart();
}

function calculateTotalPrice() {
    const packagePrice = currentState.selectedPackage ? currentState.selectedPackage.price : 0;
    const addonsPrice = currentState.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return packagePrice + addonsPrice;
}

function showCart() {
    // Sembunyikan sections lainnya
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'cart-section') {
            section.classList.add('d-none');
        }
    });
    
    // Tampilkan cart section
    document.getElementById('cart-section').classList.remove('d-none');
    
    // Load cart items
    loadCartItems();
    
    // Update cart summary
    updateCartSummary();
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (currentState.cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Keranjang kosong</p>';
        return;
    }
    
    currentState.cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <h6>${item.serviceName} - ${item.package.name}</h6>
                <p>Tanggal: ${formatDate(item.date)}</p>
                <p>Lokasi: ${item.location}</p>
                ${item.addons.length > 0 ? `<p>Tambahan: ${item.addons.map(a => a.name).join(', ')}</p>` : ''}
            </div>
            <div class="cart-item-price">
                Rp ${formatCurrency(item.totalPrice)}
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
}

function updateCartSummary() {
    const subtotal = currentState.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const dpAmount = subtotal * 0.3; // 30% DP
    
    document.getElementById('cart-subtotal').textContent = `Rp ${formatCurrency(subtotal)}`;
    document.getElementById('cart-dp').textContent = `Rp ${formatCurrency(dpAmount)}`;
    document.getElementById('cart-total').textContent = `Rp ${formatCurrency(subtotal)}`;
}

function proceedToCheckout() {
    // Cek apakah user sudah login
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Harap Login',
            text: 'Anda harus login terlebih dahulu untuk melanjutkan pembayaran.',
            showCancelButton: true,
            confirmButtonText: 'Login Sekarang',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simpan state cart ke localStorage agar bisa direstore setelah login (opsional)
                localStorage.setItem('pendingCart', JSON.stringify(currentState.cart));
                window.location.href = 'login.html';
            }
        });
        return;
    }

    if (currentState.cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Keranjang Kosong',
            text: 'Silakan tambahkan layanan terlebih dahulu.'
        });
        return;
    }
    
    // Sembunyikan sections lainnya
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'checkout-section') {
            section.classList.add('d-none');
        }
    });
    
    // Tampilkan checkout section
    document.getElementById('checkout-section').classList.remove('d-none');
    
    // Update checkout summary
    updateCheckoutSummary();
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

function updateCheckoutSummary() {
    const subtotal = currentState.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const amountToPay = paymentMethod === 'dp' ? subtotal * 0.3 : subtotal;
    
    document.getElementById('checkout-subtotal').textContent = `Rp ${formatCurrency(subtotal)}`;
    document.getElementById('checkout-amount').textContent = `Rp ${formatCurrency(amountToPay)}`;
}

function updatePaymentSummary() {
    updateCheckoutSummary();
}

function processCheckout(event) {
    event.preventDefault();
    
    // Ambil data customer
    const customerInfo = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value
    };
    
    currentState.customerInfo = customerInfo;
    
    // Simulasi proses pembayaran
    simulatePayment();
}

function simulatePayment() {
    const subtotal = currentState.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const amountToPay = paymentMethod === 'dp' ? subtotal * 0.3 : subtotal;
    
    // Tampilkan konfirmasi
    alert(`Pembayaran sebesar Rp ${formatCurrency(amountToPay)} berhasil!\n\nPesanan Anda sedang diproses. Anda akan menerima email konfirmasi dalam waktu 1x24 jam.`);
    
    // Reset state (dalam aplikasi nyata, data akan dikirim ke backend)
    resetAppState();
    
    // Kembali ke beranda
    backToHome();
}

function resetAppState() {
    currentState = {
        currentService: null,
        selectedPackage: null,
        selectedDate: null,
        location: '',
        selectedAddons: [],
        cart: [],
        customerInfo: {}
    };
    
    // Reset form
    document.getElementById('checkout-form').reset();
    document.getElementById('booking-date').value = '';
    document.getElementById('booking-location').value = '';
    
    // Reset pilihan paket dan addons
    document.querySelectorAll('.package-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelectorAll('.addon-option input').forEach(input => {
        input.checked = false;
    });
}

function backToServices() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('d-none');
    });
    
    document.getElementById('service-config').classList.add('d-none');
    window.scrollTo(0, 0);
}

function backToConfig() {
    showServiceConfig();
}

function backToCart() {
    showCart();
}

function backToHome() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('d-none');
    });
    
    document.getElementById('service-config').classList.add('d-none');
    document.getElementById('cart-section').classList.add('d-none');
    document.getElementById('checkout-section').classList.add('d-none');
    
    window.scrollTo(0, 0);
}

// Helper functions
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Restore pending cart after login
function restorePendingCart() {
    const pendingCart = localStorage.getItem('pendingCart');
    if (pendingCart) {
        try {
            const cartData = JSON.parse(pendingCart);
            currentState.cart = cartData;
            
            // Remove pending cart from localStorage
            localStorage.removeItem('pendingCart');
            
            // Show cart and display success message
            showCart();
            
            Swal.fire({
                icon: 'success',
                title: 'Cart Restored!',
                text: 'Your cart has been restored. You can now proceed to checkout.',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error restoring cart:', error);
            localStorage.removeItem('pendingCart');
        }
    }
}

// Smooth scrolling untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});