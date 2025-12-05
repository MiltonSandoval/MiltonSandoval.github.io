/* ===============================================
   NAVBAR STICKY - JAVASCRIPT (COHERENTE CON INDEX)
   =============================================== */

// Elementos del DOM
const navbar = document.getElementById('navbar');
const btnTop = document.getElementById('btnTop');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Variables de control
let lastScroll = 0;
let isScrolling = false;

/**
 * Función para manejar el scroll y actualizar el navbar
 */
function handleScroll() {
    if (isScrolling) return;
    
    isScrolling = true;
    const currentScroll = window.pageYOffset;
    
    // Añadir clase .scrolled cuando scrolleamos hacia abajo
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Mostrar botón "Volver arriba" después de 300px
    if (currentScroll > 300) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
    
    // Actualizar enlace activo
    updateActiveLink(currentScroll);
    
    lastScroll = currentScroll;
    
    // Permitir el siguiente scroll después de un breve delay
    setTimeout(() => {
        isScrolling = false;
    }, 100);
}

/**
 * Volver al inicio de la página con animación suave
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Actualizar enlace activo según la sección visible
 */
function updateActiveLink(currentScroll) {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Toggle del menú hamburguesa
 */
function toggleMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Añadir/remover atributo aria-expanded
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
}

/**
 * Cerrar menú hamburguesa
 */
function closeMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
}

/**
 * Scroll suave a secciones
 */
function scrollToSection(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (!targetId.startsWith('#')) return;
    
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    
    // Calcular posición considerando la altura del navbar
    const navHeight = navbar.offsetHeight;
    const targetPosition = targetSection.offsetTop - navHeight;
    
    // Cerrar menú si está abierto (en móviles)
    if (navMenu.classList.contains('active')) {
        closeMenu();
    }
    
    // Scroll suave
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Cerrar menú al hacer clic fuera
 */
function handleOutsideClick(e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
    }
}

/**
 * Manejar tecla Escape para cerrar menú
 */
function handleKeydown(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
}

/**
 * Inicializar todos los event listeners
 */
function initEventListeners() {
    // Scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Botón volver arriba
    btnTop.addEventListener('click', scrollToTop);
    
    // Menú hamburguesa
    navToggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', handleOutsideClick);
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', handleKeydown);
    
    // Prevenir scroll del body cuando el menú está abierto (móviles)
    navMenu.addEventListener('touchmove', (e) => {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

/**
 * Verificar que todos los elementos existan
 */
function checkElements() {
    const elements = [navbar, btnTop, navToggle, navMenu];
    const missing = elements.filter(el => !el);
    
    if (missing.length > 0) {
        console.warn('⚠️ Elementos faltantes:', missing);
        return false;
    }
    
    return true;
}

/**
 * Inicializar la aplicación
 */
function init() {
    console.log('🚀 Iniciando Navbar Sticky Demo...');
    
    if (!checkElements()) {
        console.error('❌ No se pudieron encontrar todos los elementos necesarios');
        return;
    }
    
    // Inicializar event listeners
    initEventListeners();
    
    // Actualizar estado inicial
    handleScroll();
    
    // Añadir atributos ARIA para accesibilidad
    navToggle.setAttribute('aria-label', 'Menú de navegación');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-label', 'Navegación principal');
    
    console.log('✅ Navbar Sticky inicializado correctamente');
    console.log('🎯 Características:');
    console.log('  - Navbar con position: sticky');
    console.log('  - Clase .scrolled dinámica');
    console.log('  - Botón "Volver arriba" con position: fixed');
    console.log('  - Scroll suave entre secciones');
    console.log('  - Menú hamburguesa responsive');
    console.log('  - Enlaces activos según scroll');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Exportar funciones para uso externo (si es necesario)
window.StickyNav = {
    scrollToTop,
    updateActiveLink: () => updateActiveLink(window.pageYOffset),
    closeMenu
};

console.log('📋 StickyNav disponible como: window.StickyNav');