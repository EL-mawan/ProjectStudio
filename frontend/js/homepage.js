// Dynamic Content Loader for Homepage
// This file loads content from API and updates the homepage dynamically

// Load Services
async function loadServices() {
    try {
        const response = await fetch(API_ENDPOINTS.services);
        const services = await response.json();
        
        const servicesContainer = document.getElementById('servicesContainer');
        if (!servicesContainer) return;

        if (services.length === 0) {
            servicesContainer.innerHTML = '<p class="text-center">Tidak ada layanan tersedia</p>';
            return;
        }

        servicesContainer.innerHTML = services.map((service, index) => `
            <div data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100 h-full flex flex-col">
                    <div class="relative overflow-hidden h-64">
                        ${service.image_url 
                            ? `<img src="${service.image_url}" alt="${service.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">` 
                            : `<div class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><i class="fas fa-image text-4xl"></i></div>`
                        }
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span class="text-white font-bold tracking-wider text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">PROJECT STUDIO</span>
                        </div>
                    </div>
                    
                    <div class="p-8 flex flex-col flex-grow">
                        <h3 class="font-heading font-bold text-2xl mb-3 text-slate-900 group-hover:text-primary transition-colors">${service.name}</h3>
                        <p class="text-slate-600 mb-6 leading-relaxed line-clamp-3 flex-grow">${service.description || 'Layanan profesional terbaik untuk kebutuhan dokumentasi Anda.'}</p>
                        
                        <a href="#booking" onclick="selectService(${service.id}, '${service.name}')" 
                           class="w-full py-4 rounded-xl bg-slate-50 text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg hover:shadow-primary/30">
                            Pilih Layanan <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Load Hero Content
async function loadHeroContent() {
    try {
        const response = await fetch(API_ENDPOINTS.heroContent);
        const hero = await response.json();
        
        // Update hero title
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle && hero.title) {
            heroTitle.textContent = hero.title;
        }

        // Update hero subtitle
        const heroSubtitle = document.getElementById('heroSubtitle');
        if (heroSubtitle && hero.subtitle) {
            heroSubtitle.textContent = hero.subtitle;
        }

        // Update hero button
        const heroButton = document.getElementById('heroButton');
        if (heroButton && hero.button_text) {
            heroButton.textContent = hero.button_text;
            if (hero.button_link) {
                heroButton.href = hero.button_link;
            }
        }

        // Update hero background image
        const heroSection = document.getElementById('hero');
        if (heroSection && hero.image_url) {
            heroSection.style.backgroundImage = `url('${hero.image_url}')`;
        }
    } catch (error) {
        console.error('Error loading hero content:', error);
    }
}

// Load About Content
async function loadAboutContent() {
    try {
        const response = await fetch(API_ENDPOINTS.aboutContent);
        const about = await response.json();
        
        // Update about title
        const aboutTitle = document.getElementById('aboutTitle');
        if (aboutTitle && about.title) {
            aboutTitle.textContent = about.title;
        }

        // Update about subtitle
        const aboutSubtitle = document.getElementById('aboutSubtitle');
        if (aboutSubtitle && about.subtitle) {
            aboutSubtitle.textContent = about.subtitle;
        }

        // Update about description
        const aboutDescription = document.getElementById('aboutDescription');
        if (aboutDescription && about.description) {
            aboutDescription.textContent = about.description;
        }

        // Update mission
        const aboutMission = document.getElementById('aboutMission');
        if (aboutMission && about.mission) {
            aboutMission.textContent = about.mission;
        }

        // Update vision
        const aboutVision = document.getElementById('aboutVision');
        if (aboutVision && about.vision) {
            aboutVision.textContent = about.vision;
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Load Contact Info
async function loadContactInfo() {
    try {
        const response = await fetch(API_ENDPOINTS.contactInfo);
        const contact = await response.json();
        
        // Update contact address
        const contactAddress = document.getElementById('contactAddress');
        if (contactAddress && contact.address) {
            contactAddress.textContent = contact.address;
        }

        // Update contact phone
        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone && contact.phone) {
            contactPhone.textContent = contact.phone;
            contactPhone.href = `tel:${contact.phone}`;
        }

        // Update contact email
        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail && contact.email) {
            contactEmail.textContent = contact.email;
            contactEmail.href = `mailto:${contact.email}`;
        }

        // Update WhatsApp
        const contactWhatsapp = document.getElementById('contactWhatsapp');
        if (contactWhatsapp && contact.whatsapp) {
            contactWhatsapp.href = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`;
        }

        // Update Instagram
        const contactInstagram = document.getElementById('contactInstagram');
        if (contactInstagram && contact.instagram) {
            contactInstagram.href = contact.instagram;
        }

        // Update Facebook
        const contactFacebook = document.getElementById('contactFacebook');
        if (contactFacebook && contact.facebook) {
            contactFacebook.href = contact.facebook;
        }

        // Update working hours
        const workingDays = document.getElementById('workingDays');
        if (workingDays && contact.working_days) {
            workingDays.textContent = contact.working_days;
        }

        const workingHours = document.getElementById('workingHours');
        if (workingHours && contact.working_hours) {
            workingHours.textContent = contact.working_hours;
        }

        // Update map embed
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer && contact.map_embed) {
            mapContainer.innerHTML = contact.map_embed;
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

// Load Site Settings
async function loadSiteSettings() {
    try {
        const response = await fetch(API_ENDPOINTS.siteSettings);
        const settings = await response.json();
        
        // Update site title
        if (settings.site_name) {
            document.title = settings.site_name;
            
            const brandName = document.getElementById('brandName');
            if (brandName) {
                brandName.textContent = settings.site_name;
            }
        }

        // Update logo
        if (settings.logo_url) {
            const logo = document.getElementById('siteLogo');
            if (logo) {
                logo.src = settings.logo_url;
            }
        }

        // Update favicon
        if (settings.favicon_url) {
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            favicon.href = settings.favicon_url;
        }

        // Update meta description
        if (settings.meta_description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = settings.meta_description;
        }

        // Update meta keywords
        if (settings.meta_keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = settings.meta_keywords;
        }
    } catch (error) {
        console.error('Error loading site settings:', error);
    }
}

// Load Packages for Booking Form
    async function loadPackagesForBooking(serviceId) {
    try {
        const response = await fetch(API_ENDPOINTS.servicePackages(serviceId));
        const data = await response.json();
        let packages = [];
        if (Array.isArray(data)) {
            packages = data;
        } else if (data && Array.isArray(data.packages)) {
            packages = data.packages;
        }
        
        const packageSelect = document.getElementById('packageSelect');
        if (!packageSelect) return;

        if (packages.length === 0) {
             packageSelect.innerHTML = '<option value="">Tidak ada paket tersedia</option>';
             return;
        }

        packageSelect.innerHTML = '<option value="">Pilih Paket</option>' +
            packages.map(pkg => `
                <option value="${pkg.id}" data-price="${pkg.price}" data-duration="${pkg.duration}">
                    ${pkg.name} - Rp ${pkg.price.toLocaleString('id-ID')} (${pkg.duration} jam)
                </option>
            `).join('');

        // Show package details when selected
        packageSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.dataset.price;
            const duration = selectedOption.dataset.duration;
            
            const priceDisplay = document.getElementById('priceDisplay');
            if (priceDisplay && price) {
                priceDisplay.textContent = `Rp ${parseInt(price).toLocaleString('id-ID')}`;
            }

            const durationDisplay = document.getElementById('durationDisplay');
            if (durationDisplay && duration) {
                durationDisplay.textContent = `${duration} jam`;
            }
        });
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

// Helper function to select service from homepage
function selectService(serviceId, serviceName) {
    // Store selected service
    sessionStorage.setItem('selectedServiceId', serviceId);
    sessionStorage.setItem('selectedServiceName', serviceName);
    
    // Load packages for this service
    loadPackagesForBooking(serviceId);
    
    // Update service name in booking form
    const serviceNameDisplay = document.getElementById('serviceNameDisplay');
    if (serviceNameDisplay) {
        serviceNameDisplay.textContent = serviceName;
    }
}

// Initialize all dynamic content on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load all dynamic content
    loadSiteSettings();
    loadHeroContent();
    loadServices();
    loadAboutContent();
    loadContactInfo();
    
    // Check if there's a selected selectedServiceId from session
    const selectedServiceId = sessionStorage.getItem('selectedServiceId');
    if (selectedServiceId) {
        loadPackagesForBooking(selectedServiceId);
    }

    // Handle Booking Form Submit
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const packageSelect = document.getElementById('packageSelect');
            const selectedOption = packageSelect.options[packageSelect.selectedIndex];
            
            if (!packageSelect.value) {
                Swal.fire('Error', 'Silakan pilih paket terlebih dahulu', 'error');
                return;
            }

            const orderData = {
                serviceId: sessionStorage.getItem('selectedServiceId'),
                serviceName: sessionStorage.getItem('selectedServiceName'),
                packageId: packageSelect.value,
                packageName: selectedOption.text.split(' - ')[0].trim(),
                packagePrice: selectedOption.dataset.price,
                packageDuration: selectedOption.dataset.duration,
                eventDate: document.getElementById('eventDate').value,
                notes: document.getElementById('notes').value
            };

            sessionStorage.setItem('orderData', JSON.stringify(orderData));
            window.location.href = 'checkout.html';
        });
    }
});

// Export functions for use in other scripts
window.loadServices = loadServices;
window.loadPackagesForBooking = loadPackagesForBooking;
window.selectService = selectService;
