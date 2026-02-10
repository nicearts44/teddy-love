// ===== CONFIGURATION =====
const CONFIG = {
    totalStock: 200,
    initialStock: 147,
    animationDuration: 1000,
    images: {
        texture: 'assets/images/peluche-fourrure.jpeg',
        broderie: 'assets/images/peluche-finition.jpeg',
        visage: 'assets/images/peluche-visage.jpeg',
        message: 'assets/images/peluche-message.jpeg',
        parfum: 'assets/images/peluche-parfum.jpeg',
        taille: 'assets/images/peluche-principal.jpeg'
    },
    reviews: [
        {
            name: "Michelle & Eric",
            avatar: "M",
            relationship: "Ensemble depuis 2 ans",
            rating: 5,
            text: "Eric m'a offert la peluche pour notre premier anniversaire. Je l'embrasse chaque soir, c'est devenu un rituel. La fourrure est incroyablement douce.",
            date: "Il y a 2 semaines"
        },
        {
            name: "Solange & Serge",
            avatar: "S",
            relationship: "Mariés depuis 6 mois",
            rating: 5,
            text: "Serge est souvent en déplacement. La peluche avec son parfum spécial m'aide à m'endormir. C'est le cadeau le plus attentionné qu'il m'ait fait.",
            date: "Il y a 3 semaines"
        },
        {
            name: "Colombe & Antoine",
            avatar: "C",
            relationship: "Fiancés",
            rating: 4,
            text: "Antoine m'a surprise avec Teddy pour la Saint-Valentin. Tellement Teddy sent bon et est parfait pour les câlins. La finesse de la couture de Teddy est juste impressionnant.",
            date: "Il y a 1 mois"
        },
        {
            name: "Julie & Maxime",
            avatar: "J",
            relationship: "Ensemble depuis 5 ans",
            rating: 5,
            text: "Après 5 ans, on pense connaître tous les cadeaux possibles. Teddy lui nous a vraiment touchés. Simple mais profondément émouvant.",
            date: "Il y a 2 mois"
        }
    ]
};

// ===== ÉTAT GLOBAL =====
let currentStock = CONFIG.initialStock;
let currentReviewIndex = 0;
let isConfettiActive = false;
let isMobile = window.innerWidth < 768;
let scrollLock = false;

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Détecter la taille de l'écran
    isMobile = window.innerWidth < 768;
    
    // Initialiser les composants
    initializeLoader();
    initializeNavigation();
    initializeParticles();
    initializeStatsCounters();
    initializeProductGallery();
    initializeReviews();
    initializeStockCounter();
    initializeCTAButtons();
    initializeStickyCTA();
    initializeScrollAnimations();
    initializeModal(); // Changé de initializeModal() à initModal()
    initializePerformance();
    
    // Simuler une commande toutes les 30 secondes
    setInterval(simulatePurchase, 30000);
    
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', handleResize);
});

// ===== PERFORMANCE =====
function initializePerformance() {
    // Précharger les images importantes
    const images = Object.values(CONFIG.images);
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Optimiser les animations pour les appareils mobiles
    if (isMobile) {
        document.documentElement.style.setProperty('--transition-normal', '0.3s cubic-bezier(0.4, 0, 0.2, 1)');
        document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
    }
}

// ===== LOADER =====
function initializeLoader() {
    const loader = document.getElementById('loader');
    const progressFill = document.querySelector('.progress-fill');
    
    // Simuler le chargement
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Déclencher l'animation des particules
        createParticles();
    }, 1500);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        const isActive = this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        this.setAttribute('aria-expanded', isActive);
    });
    
    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Changer le style de la navbar au scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            // Cacher la navbar en scrollant vers le bas sur mobile
            if (isMobile && currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 20, 147, 0.1)';
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== PARTICULES =====
function initializeParticles() {
    // Créer le conteneur de particules
    const particlesContainer = document.getElementById('particles');
    
    // Pré-créer des cœurs SVG
    const heartSVG = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    
    window.heartSVG = heartSVG;
}

function createParticles() {
    
    const particlesContainer = document.getElementById('particles');
    const particleCount = isMobile ? 8 : 15; // Réduit sur mobile pour performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = window.heartSVG;
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Taille plus petite sur mobile
        const size = isMobile ? (8 + Math.random() * 10) : (10 + Math.random() * 15);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Couleur aléatoire dans la palette
        const colors = ['#FF1493', '#FF69B4', '#DC143C', '#FF0000'];
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Animation plus lente sur mobile
        const delay = Math.random() * (isMobile ? 5 : 10);
        const duration = isMobile ? (8 + Math.random() * 10) : (10 + Math.random() * 15);
        
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }

}

// ===== COMPTEURS STATISTIQUES =====
function initializeStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const targetNumber = parseInt(numberElement.getAttribute('data-count'));
                
                animateCounter(numberElement, 0, targetNumber, 2000);
                
                observer.unobserve(numberElement);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    statNumbers.forEach(number => observer.observe(number));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function pour un effet plus naturel
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(start + (end - start) * easeProgress);
        element.textContent = isPercentage ? `${currentValue}%` : currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = isPercentage ? `${end}%` : end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== GALERIE PRODUIT - CORRIGÉ =====
function initializeProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const featureItems = document.querySelectorAll('.feature-item');
    const mainImage = document.getElementById('productMainImage');
    const mainImageContainer = document.querySelector('.main-image');
    
    if (!mainImage || !mainImageContainer) return;
    
    // Fonction pour changer l'image
    const changeImage = (imageType, thumbnail) => {
        // Mettre à jour les thumbnails actifs
        thumbnails.forEach(t => t.classList.remove('active'));
        if (thumbnail) {
            thumbnail.classList.add('active');
        }
        
        // Mettre à jour les caractéristiques actives
        featureItems.forEach(item => item.classList.remove('active'));
        const activeFeature = document.querySelector(`.feature-item[data-target="${imageType}"]`);
        if (activeFeature) {
            activeFeature.classList.add('active');
        }
        
        // Mettre à jour l'attribut data-image sur le conteneur pour le flou d'arrière-plan
        mainImageContainer.setAttribute('data-image', imageType);
        
        // Trouver l'image correspondante
        const imageSrc = CONFIG.images[imageType] || CONFIG.images.texture;
        
        // Animation de transition
        mainImage.style.opacity = '0.5';
        mainImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainImage.alt = `Teddy Love - ${getImageAlt(imageType)}`;
            
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'scale(1)';
        }, 300);
    };
    
    // Navigation par thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageType = this.getAttribute('data-image');
            changeImage(imageType, this);
        });
        
        // Support clavier
        thumbnail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const imageType = thumbnail.getAttribute('data-image');
                changeImage(imageType, thumbnail);
            }
        });
    });
    
    // Navigation par caractéristiques
    featureItems.forEach(item => {
        // Pour desktop (mouseenter)
        item.addEventListener('mouseenter', function() {
            if (isMobile) return;
            
            const target = this.getAttribute('data-target');
            const targetThumbnail = document.querySelector(`.thumbnail[data-image="${target}"]`);
            
            if (targetThumbnail) {
                changeImage(target, targetThumbnail);
            }
        });
        
        // Pour mobile et desktop (click)
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const targetThumbnail = document.querySelector(`.thumbnail[data-image="${target}"]`);
            
            if (targetThumbnail) {
                changeImage(target, targetThumbnail);
                
                // Scroll vers l'image sur mobile
                if (isMobile) {
                    document.querySelector('.product-gallery').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    // Position sticky sur desktop
    if (!isMobile) {
        const productGallery = document.querySelector('.product-gallery');
        const productDetails = document.querySelector('.product-details');
        
        if (productGallery && productDetails) {
            const galleryHeight = productGallery.offsetHeight;
            const detailsHeight = productDetails.offsetHeight;
            
            if (detailsHeight > galleryHeight) {
                // Observer le scroll dans la section produit
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        scrollLock = entry.isIntersecting;
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '-100px 0px -100px 0px'
                });
                
                observer.observe(document.getElementById('presentation'));
            }
        }
    }
}

function getImageAlt(imageType) {
    const alts = {
        texture: 'Détail de la fourrure premium ultra-douce',
        broderie: 'Détail de la broderie artisanale de qualité',
        visage: 'Visage sympathique et accueillant de Teddy Love',
        message: 'Exemple de message personnalisable',
        parfum: 'Teddy Love avec option parfum personnalisable',
        taille: 'Teddy Love - Dimensions parfaites pour les câlins'
    };
    return alts[imageType] || 'Teddy Love - Peluche d\'amour Saint-Valentin';
}

// ===== AVIS =====
function initializeReviews() {
    const carouselContainer = document.getElementById('reviewsCarousel');
    const reviews = CONFIG.reviews;
    
    if (!carouselContainer) return;
    
    // Créer les cartes d'avis
    reviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = `review-card ${index === 0 ? 'active' : ''}`;
        reviewCard.setAttribute('role', 'tabpanel');
        reviewCard.setAttribute('aria-hidden', index !== 0);
        reviewCard.setAttribute('tabindex', '0');
        
        // Créer les étoiles
        const stars = '★'.repeat(review.rating);
        const emptyStars = review.rating < 5 ? '☆'.repeat(5 - review.rating) : '';
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="review-avatar" aria-hidden="true">${review.avatar}</div>
                <div class="review-info">
                    <h4>${review.name}</h4>
                    <p>${review.relationship}</p>
                </div>
            </div>
            <div class="review-rating" aria-label="${review.rating} étoiles sur 5">
                ${stars}${emptyStars}
            </div>
            <p class="review-text">${review.text}</p>
            <div class="review-date">${review.date}</div>
        `;
        
        carouselContainer.appendChild(reviewCard);
    });
    
    // Navigation des avis
    const prevReviewBtn = document.getElementById('prevReview');
    const nextReviewBtn = document.getElementById('nextReview');
    
    if (prevReviewBtn && nextReviewBtn) {
        prevReviewBtn.addEventListener('click', () => navigateReviews(-1));
        nextReviewBtn.addEventListener('click', () => navigateReviews(1));
        
        // Support clavier
        prevReviewBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateReviews(-1);
            }
        });
        
        nextReviewBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateReviews(1);
            }
        });
    }
    
    // Défilement automatique (seulement sur desktop)
    if (!isMobile) {
        setInterval(() => {
            if (!isElementInViewport(document.getElementById('avis'))) return;
            navigateReviews(1);
        }, 5000);
    }
}

function navigateReviews(direction) {
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length === 0) return;
    
    // Retirer la classe active de la carte actuelle
    reviewCards.forEach(card => {
        card.classList.remove('active');
        card.setAttribute('aria-hidden', 'true');
    });
    
    // Calculer le nouvel index
    currentReviewIndex += direction;
    
    // Gérer le bouclage
    if (currentReviewIndex < 0) currentReviewIndex = reviewCards.length - 1;
    if (currentReviewIndex >= reviewCards.length) currentReviewIndex = 0;
    
    // Ajouter la classe active à la nouvelle carte
    reviewCards[currentReviewIndex].classList.add('active');
    reviewCards[currentReviewIndex].setAttribute('aria-hidden', 'false');
    
    // Focus pour l'accessibilité
    reviewCards[currentReviewIndex].focus();
}

// ===== COMPTEUR DE STOCK =====
function initializeStockCounter() {
    updateStockDisplay();
}

function updateStockDisplay() {
    const dynamicCounter = document.getElementById('dynamicCounter');
    const stickyCounter = document.getElementById('stickyCounter');
    const counterFill = document.getElementById('counterFill');
    
    if (dynamicCounter) {
        dynamicCounter.textContent = `${currentStock}/${CONFIG.totalStock} disponibles`;
        dynamicCounter.setAttribute('aria-label', `${currentStock} peluches disponibles sur ${CONFIG.totalStock}`);
    }
    
    if (stickyCounter) {
        stickyCounter.textContent = currentStock;
    }
    
    // Calculer le pourcentage
    const percentage = (currentStock / CONFIG.totalStock) * 100;
    if (counterFill) {
        counterFill.style.width = `${percentage}%`;
    }
}

function simulatePurchase() {
    if (currentStock <= 0) return;
    
    // Réduire le stock de 1
    currentStock--;
    
    // Mettre à jour l'affichage
    updateStockDisplay();
    
    // Afficher une notification visuelle (seulement si la page est visible)
    if (document.visibilityState === 'visible') {
        showStockNotification();
    }
}

function showStockNotification() {
    
    const notification = document.createElement('div');
    notification.className = 'stock-notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
        <span>Quelqu'un vient de commander ! Plus que ${currentStock} disponibles.</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--rouge-passion), var(--red-vif));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(220, 20, 60, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s forwards;
        max-width: 300px;
    `;
    
    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Supprimer après l'animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
        if (style.parentNode) {
            document.head.removeChild(style);
        }
    }, 3000);
}

// ===== BOUTONS CTA - CORRIGÉ =====
function initializeCTAButtons() {
    const offerBtn = document.getElementById('offerBtn');
    const finalCta = document.getElementById('finalCta');
    const stickyBtn = document.getElementById('stickyBtn');
    const heroBtn = document.querySelector('.btn-hero');
    
    const handlePurchase = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentStock <= 0) {
            alert('Désolé, toutes les peluches ont été vendues ! Revenez l\'année prochaine.');
            return;
        }
        
        // Réduire le stock
        currentStock--;
        updateStockDisplay();
        
        // Afficher le modal de personnalisation
        showCustomizationModal();
        
        // Lancer les confettis
        createConfetti();
        
        // Son de succès
        playSuccessSound();
    };
    
    if (offerBtn) offerBtn.addEventListener('click', handlePurchase);
    if (finalCta) finalCta.addEventListener('click', handlePurchase);
    if (stickyBtn) stickyBtn.addEventListener('click', handlePurchase);
    
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('offre').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ===== MODAL DE PERSONNALISATION - CORRIGÉ =====
function initializeModal() {
    const modal = document.getElementById('customModal');
    const modalClose = document.getElementById('modalClose');
    const completeOrderBtn = document.getElementById('completeOrder');
    
    // Boutons pour contrôler la quantité
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyValue = document.getElementById('qtyValue');
    
    // Éléments de prix
    const step1Price = document.getElementById('step1Price');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryQty = document.getElementById('summaryQty');
    const summaryTotal = document.getElementById('summaryTotal');
    
    // Message personnalisé
    const loveMessage = document.getElementById('loveMessage');
    const previewText = document.getElementById('previewText');
    const charCount = document.getElementById('charCount');
    
    // Options de parfum
    const scentOptions = document.querySelectorAll('.scent-option');
    const selectedScent = document.getElementById('selectedScent');
    
    // Variables d'état
    let quantity = 1;
    const unitPrice = 25000; // Prix en FCFA
    let selectedScentType = 'rose';
    
    // ===== FONCTIONS DU MODAL =====
    
    function showCustomizationModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    function updatePrices() {
        const total = quantity * unitPrice;
        const formattedPrice = formatPrice(total);
        
        if (step1Price) step1Price.textContent = formattedPrice;
        if (summaryPrice) summaryPrice.textContent = formattedPrice;
        if (summaryTotal) summaryTotal.textContent = formattedPrice;
        if (summaryQty) summaryQty.textContent = quantity;
    }
    
    function formatPrice(price) {
        return new Intl.NumberFormat('fr-FR').format(price) + 'F';
    }
    
    function updateCharacterCount() {
        if (loveMessage && charCount) {
            const count = loveMessage.value.length;
            charCount.textContent = count;
            
            if (count > 90) {
                charCount.style.color = 'var(--rouge-passion)';
            } else if (count > 70) {
                charCount.style.color = 'var(--rose-saint-valentin)';
            } else {
                charCount.style.color = 'var(--text-light)';
            }
        }
    }
    
    // ===== ÉVÉNEMENTS DU MODAL =====
    
    // Ouvrir le modal (géré par initializeCTAButtons)
    
    // Fermer le modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Fermer en cliquant sur l'overlay
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });
    }
    
    // Gestion de la quantité
    if (qtyMinus && qtyPlus && qtyValue) {
        qtyMinus.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qtyValue.textContent = quantity;
                updatePrices();
            }
        });
        
        qtyPlus.addEventListener('click', () => {
            if (quantity < 5) {
                quantity++;
                qtyValue.textContent = quantity;
                updatePrices();
            } else {
                alert('Maximum 5 peluches par commande');
            }
        });
    }
    
    // Message personnalisé
    if (loveMessage && previewText) {
        loveMessage.addEventListener('input', () => {
            previewText.textContent = loveMessage.value;
            updateCharacterCount();
        });
        
        // Initialiser le compteur
        updateCharacterCount();
    }
    
    // Options de parfum
    if (scentOptions.length > 0 && selectedScent) {
        scentOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Retirer la classe active de toutes les options
                scentOptions.forEach(opt => opt.classList.remove('active'));
                
                // Ajouter la classe active à l'option cliquée
                option.classList.add('active');
                
                // Mettre à jour le parfum sélectionné
                selectedScentType = option.getAttribute('data-scent');
                const scentName = option.querySelector('h4').textContent;
                selectedScent.textContent = scentName;
            });
        });
    }
    
    // Navigation entre les étapes
    const steps = document.querySelectorAll('.step');
    if (steps.length > 0) {
        steps.forEach(step => {
            step.addEventListener('click', () => {
                const stepNumber = step.getAttribute('data-step');
                
                // Retirer la classe active de toutes les étapes
                steps.forEach(s => s.classList.remove('active'));
                
                // Ajouter la classe active à l'étape cliquée
                step.classList.add('active');
            });
        });
    }
    
    // Finaliser la commande
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener('click', () => {
            if (currentStock <= 0) {
                alert('Désolé, toutes les peluches ont été vendues !');
                closeModal();
                return;
            }
            
            // Message de confirmation
            const message = loveMessage ? loveMessage.value : 'Aucun message personnalisé';
            const total = quantity * unitPrice;
            const formattedTotal = formatPrice(total);
            
            alert(`🎉 COMMANDE CONFIRMÉE !

Votre commande de ${quantity} Teddy Love a été enregistrée.
Total : ${formattedTotal}

Votre message : "${message}"
Parfum sélectionné : ${selectedScent.textContent}

Vous recevrez un email de confirmation dans quelques minutes.

Merci d'avoir choisi Teddy Love ! ❤️`);
            
            // Lancer les confettis
            createConfetti();
            
            // Fermer le modal
            closeModal();
            
            // Réinitialiser la quantité
            quantity = 1;
            if (qtyValue) qtyValue.textContent = quantity;
            updatePrices();
        });
    }
    
    // ===== INITIALISATION =====
    updatePrices();
}

// ===== CTA STICKY =====
function initializeStickyCTA() {
    const stickyCTA = document.getElementById('stickyCta');
    if (!stickyCTA) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const heroHeight = document.getElementById('hero').offsetHeight;
        const currentScroll = window.scrollY;
        
        // Afficher après le hero section
        if (currentScroll > heroHeight * 0.7) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
        
        // Cacher en scrollant vers le bas
        if (isMobile && currentScroll > lastScroll && currentScroll > 100) {
            stickyCTA.style.transform = 'translateY(100%)';
        } else {
            stickyCTA.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .testimonial-card, .reassurance-card, .feature-item, .transition-phrase');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// ===== CONFETTIS =====
function createConfetti() {
    const colors = ['#FF1493', '#FF69B4', '#DC143C', '#FF0000', '#FFFFFF'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        
        // Position aléatoire
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        // Style
        confetti.style.position = 'fixed';
        confetti.style.left = `${left}%`;
        confetti.style.top = '-20px';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = size < 8 ? '50%' : '2px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { 
                transform: `translateY(0) rotate(0deg)`,
                opacity: 1 
            },
            { 
                transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Supprimer après animation
        animation.onfinish = () => confetti.remove();
    }
}

// ===== SON DE SUCCÈS =====
function playSuccessSound() {
    if (isMobile) return; // Pas de son sur mobile
    
    try {
        // Créer un contexte audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Créer un oscillateur pour le son
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Configuration du son
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
        oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
        
        // Configuration du volume
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        // Connexions
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Jouer le son
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio context non supporté');
    }
}

// ===== GESTION DU REDIMENSIONNEMENT =====
function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;
    
    // Recalculer les animations si le mode change
    if (wasMobile !== isMobile) {
        initializePerformance();
    }
}

// ===== UTILITAIRES =====
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ===== GESTION DES IMAGES LAZY LOADING =====
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialiser le lazy loading après le chargement
setTimeout(initializeLazyLoading, 1000);

// ===== ACCESSIBILITÉ =====
document.addEventListener('keydown', function(e) {
    // Navigation par tabulation dans les modals
    if (e.key === 'Tab' && document.querySelector('.modal.active')) {
        const focusableElements = document.querySelector('.modal.active').querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});