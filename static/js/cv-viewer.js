// CV Viewer Enhancement Script
// Handles PDF loading and fallback for unsupported browsers

document.addEventListener('DOMContentLoaded', function() {
    const pdfViewer = document.querySelector('.cv-pdf-viewer');
    const viewerWrapper = document.querySelector('.cv-viewer-wrapper');
    
    if (!pdfViewer || !viewerWrapper) {
        return;
    }

    // Check if PDF is supported
    function checkPDFSupport() {
        // Modern browsers support PDF embedding
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        
        // Some mobile browsers may have issues with PDF embedding
        if (isMobile && (userAgent.includes('safari') || userAgent.includes('chrome'))) {
            // Mobile Safari and Chrome usually support PDFs
            return true;
        }
        
        return true; // Default to supported
    }

    // Handle PDF load events
    pdfViewer.addEventListener('load', function() {
        viewerWrapper.classList.remove('loading');
    });

    pdfViewer.addEventListener('error', function() {
        viewerWrapper.classList.remove('loading');
        
        // Show fallback message if PDF fails to load
        const fallback = document.querySelector('.cv-fallback');
        if (fallback) {
            fallback.style.display = 'flex';
        }
    });

    // Show loading state initially
    viewerWrapper.classList.add('loading');

    // For mobile devices, ensure download button is prominent
    if (window.innerWidth <= 768) {
        const downloadButton = document.querySelector('.cv-download-button');
        if (downloadButton) {
            downloadButton.style.display = 'inline-flex';
        }
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Adjust viewer height on resize for better mobile experience
            if (window.innerWidth <= 768) {
                const container = document.querySelector('.cv-viewer-wrapper');
                if (container) {
                    container.style.height = '60vh';
                }
            }
        }, 250);
    });
});


