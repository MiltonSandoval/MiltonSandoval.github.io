/* ===============================================
   MODAL INTERACTIVO - COHERENTE CON INDEX RAIZ
   =============================================== */

// Seleccionar elementos del DOM
const btnOpen = document.querySelector('.btn-open');
const btnClose = document.querySelector('.btn-close');
const modalOverlay = document.getElementById('modalOverlay');
const btnModalAction = document.querySelector('.btn-modal-action');
const modal = document.querySelector('.modal');

/**
 * Función para abrir el modal con animación
 */
function openModal() {
    // Añadir clase activa para mostrar el modal
    modalOverlay.classList.add('active');
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    
    // Añadir clase al body para estilos específicos
    document.body.classList.add('modal-open');
    
    // Log para debugging
    console.log('🔓 Modal abierto');
}

/**
 * Función para cerrar el modal con animación
 */
function closeModal() {
    // Remover clase activa para ocultar el modal
    modalOverlay.classList.remove('active');
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
    
    // Remover clase del body
    document.body.classList.remove('modal-open');
    
    // Log para debugging
    console.log('🔒 Modal cerrado');
}

/**
 * Función para manejar clics fuera del modal
 */
function handleOutsideClick(e) {
    // Verificar que el clic fue en el overlay y no en el modal
    if (e.target === modalOverlay) {
        closeModal();
    }
}

/**
 * Función para manejar teclas del teclado
 */
function handleKeydown(e) {
    // Cerrar modal con tecla Escape
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
}

/**
 * Prevenir propagación de clics dentro del modal
 */
function stopModalPropagation(e) {
    e.stopPropagation();
}

/**
 * Inicializar eventos del modal
 */
function initModal() {
    console.log('🎮 Inicializando modal interactivo...');
    
    // Event listener para abrir el modal
    btnOpen.addEventListener('click', openModal);
    
    // Event listener para cerrar el modal con el botón X
    btnClose.addEventListener('click', closeModal);
    
    // Event listener para cerrar el modal con el botón de acción
    btnModalAction.addEventListener('click', closeModal);
    
    // Event listener para cerrar el modal al hacer clic fuera
    modalOverlay.addEventListener('click', handleOutsideClick);
    
    // Event listener para cerrar el modal con tecla Escape
    document.addEventListener('keydown', handleKeydown);
    
    // Prevenir que los clics dentro del modal lo cierren
    modal.addEventListener('click', stopModalPropagation);
    
    // Añadir accesibilidad mejorada
    enhanceAccessibility();
    
    console.log('✅ Modal inicializado correctamente');
}

/**
 * Mejorar accesibilidad del modal
 */
function enhanceAccessibility() {
    // Añadir atributos ARIA para accesibilidad
    btnOpen.setAttribute('aria-haspopup', 'dialog');
    btnOpen.setAttribute('aria-expanded', 'false');
    
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modalTitle');
    
    // Actualizar aria-expanded cuando se abre/cierra
    modalOverlay.addEventListener('transitionend', () => {
        const isActive = modalOverlay.classList.contains('active');
        btnOpen.setAttribute('aria-expanded', isActive.toString());
        
        // Enfocar dentro del modal cuando se abre
        if (isActive) {
            btnClose.focus();
        } else {
            // Devolver foco al botón que abrió el modal
            btnOpen.focus();
        }
    });
}

/**
 * Función para reinicializar el modal después de cambios dinámicos
 */
function reinitializeModal() {
    console.log('🔄 Reinicializando modal...');
    
    // Remover todos los event listeners
    btnOpen.removeEventListener('click', openModal);
    btnClose.removeEventListener('click', closeModal);
    btnModalAction.removeEventListener('click', closeModal);
    modalOverlay.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleKeydown);
    modal.removeEventListener('click', stopModalPropagation);
    
    // Volver a inicializar
    initModal();
}

/**
 * Función para abrir modal programáticamente
 * Útil para usar desde otros archivos JavaScript
 */
function showModal() {
    openModal();
}

/**
 * Función para cerrar modal programáticamente
 */
function hideModal() {
    closeModal();
}

/**
 * Verificar que todos los elementos existen antes de inicializar
 */
function checkElements() {
    const requiredElements = [btnOpen, btnClose, modalOverlay, btnModalAction, modal];
    const missingElements = requiredElements.filter(el => !el);
    
    if (missingElements.length > 0) {
        console.warn('⚠️ Elementos del modal no encontrados:', missingElements);
        return false;
    }
    
    return true;
}

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    if (checkElements()) {
        initModal();
    } else {
        console.error('❌ No se pudo inicializar el modal - elementos faltantes');
    }
});

// Exportar funciones para uso externo (si se usa como módulo)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showModal,
        hideModal,
        reinitializeModal
    };
}

// También hacerlas disponibles globalmente si no es un módulo
window.modalController = {
    open: openModal,
    close: closeModal,
    reinit: reinitializeModal,
    show: showModal,
    hide: hideModal
};

// Log de información útil
console.log('📋 Modal Controller disponible como:');
console.log('  - modalController.open()');
console.log('  - modalController.close()');
console.log('  - modalController.show()');
console.log('  - modalController.hide()');
console.log('  - modalController.reinit()');

// Información del modal para debugging
console.log('📊 Información del Modal:');
console.log('  - Botón abrir:', btnOpen ? '✅ Encontrado' : '❌ No encontrado');
console.log('  - Botón cerrar:', btnClose ? '✅ Encontrado' : '❌ No encontrado');
console.log('  - Overlay:', modalOverlay ? '✅ Encontrado' : '❌ No encontrado');
console.log('  - Botón acción:', btnModalAction ? '✅ Encontrado' : '❌ No encontrado');
console.log('  - Modal:', modal ? '✅ Encontrado' : '❌ No encontrado');