/**
 * QR Code Generator - Enhanced Frontend JavaScript
 * Created by: Akshar Miyani
 * Email: miyaniakshar1234@gmail.com
 * Mobile: +919737160031
 * GitHub: https://github.com/miyaniakshar1234
 */

let currentQRCode = null;
let qrCount = 0;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupTemplates();
    updateCharCounter();
    loadQRCount();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize tooltips and animations
    animateOnScroll();
}

function setupEventListeners() {
    const textInput = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-btn');
    
    // Character counter
    textInput.addEventListener('input', updateCharCounter);
    
    // Enter key to generate (Ctrl+Enter for new line)
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            generateQR();
        }
    });
    
    // Auto-resize textarea
    textInput.addEventListener('input', autoResizeTextarea);
    
    // Clear QR when input changes
    textInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            resetQRDisplay();
        }
    });
    
    // Button hover effects
    generateBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    generateBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

function setupTemplates() {
    const templateButtons = document.querySelectorAll('.template-btn');
    const textInput = document.getElementById('qr-text');
    
    const templates = {
        url: 'https://example.com',
        email: 'mailto:your-email@example.com',
        phone: 'tel:+1234567890',
        wifi: 'WIFI:T:WPA;S:NetworkName;P:Password;H:false;;'
    };
    
    templateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const template = this.dataset.template;
            textInput.value = templates[template];
            textInput.focus();
            updateCharCounter();
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function updateCharCounter() {
    const textInput = document.getElementById('qr-text');
    const charCount = document.getElementById('char-count');
    const currentLength = textInput.value.length;
    
    charCount.textContent = currentLength;
    
    // Color coding for character count
    if (currentLength > 1800) {
        charCount.style.color = '#f56565';
    } else if (currentLength > 1500) {
        charCount.style.color = '#ed8936';
    } else {
        charCount.style.color = '#a0aec0';
    }
}

function autoResizeTextarea() {
    const textarea = document.getElementById('qr-text');
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

async function generateQR() {
    const textInput = document.getElementById('qr-text');
    const text = textInput.value.trim();
    
    if (!text) {
        showError('Please enter some text or URL to generate QR code', 'Empty Input');
        textInput.focus();
        return;
    }
    
    if (text.length > 2000) {
        showError('Text is too long. Please keep it under 2000 characters.', 'Text Too Long');
        return;
    }
    
    showLoading(true);
    hideError();
    
    // Add button loading state
    const generateBtn = document.getElementById('generate-btn');
    const originalContent = generateBtn.innerHTML;
    generateBtn.innerHTML = `
        <span class="btn-content">
            <i class="fas fa-spinner fa-spin"></i>
            <span class="btn-text">Generating...</span>
        </span>
    `;
    generateBtn.disabled = true;
    
    try {
        const response = await fetch('/generate_qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayQRCode(data.qr_code, text);
            currentQRCode = data.qr_code;
            incrementQRCount();
            showSuccess('QR Code generated successfully!');
            
            // Analytics tracking (if needed)
            trackQRGeneration(text.length);
        } else {
            showError(data.error || 'Failed to generate QR code', 'Generation Error');
        }
    } catch (error) {
        console.error('QR Generation Error:', error);
        showError('Network error. Please check your connection and try again.', 'Network Error');
    } finally {
        showLoading(false);
        
        // Restore button
        generateBtn.innerHTML = originalContent;
        generateBtn.disabled = false;
    }
}

function displayQRCode(qrCodeData, originalText) {
    const qrResult = document.getElementById('qr-result');
    const qrActions = document.getElementById('qr-actions');
    const qrInfo = document.getElementById('qr-info');
    const qrSize = document.getElementById('qr-size');
    const qrTime = document.getElementById('qr-time');
    
    // Create image element with loading animation
    const img = new Image();
    img.onload = function() {
        qrResult.innerHTML = '';
        qrResult.appendChild(img);
        
        // Add entrance animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 100);
    };
    
    img.src = qrCodeData;
    img.alt = 'Generated QR Code';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    // Show actions and info
    qrActions.style.display = 'flex';
    qrInfo.style.display = 'grid';
    
    // Update info
    qrSize.textContent = '300x300px';
    qrTime.textContent = new Date().toLocaleTimeString();
    
    // Scroll to QR code on mobile
    if (window.innerWidth <= 768) {
        qrResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function downloadQR() {
    if (!currentQRCode) {
        showError('No QR code to download', 'Download Error');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.href = currentQRCode;
        link.download = `qr-code-${Date.now()}.png`;
        
        // Add to DOM temporarily
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showSuccess('QR Code downloaded successfully!');
        
        // Add download animation
        const downloadBtn = event.target.closest('.action-btn');
        downloadBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            downloadBtn.style.transform = 'scale(1)';
        }, 150);
        
    } catch (error) {
        console.error('Download Error:', error);
        showError('Failed to download QR code', 'Download Error');
    }
}

function shareQR() {
    if (!currentQRCode) {
        showError('No QR code to share', 'Share Error');
        return;
    }
    
    if (navigator.share) {
        // Use native sharing if available
        fetch(currentQRCode)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'qr-code.png', { type: 'image/png' });
                navigator.share({
                    title: 'QR Code',
                    text: 'Check out this QR code I generated!',
                    files: [file]
                });
            })
            .catch(err => {
                console.error('Share Error:', err);
                copyQRLink();
            });
    } else {
        // Fallback to copying link
        copyQRLink();
    }
}

function copyQRLink() {
    if (!currentQRCode) {
        showError('No QR code to copy', 'Copy Error');
        return;
    }
    
    // Create a temporary canvas to convert to blob URL
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => {
                    showSuccess('QR Code link copied to clipboard!');
                }).catch(() => {
                    fallbackCopyText(url);
                });
            } else {
                fallbackCopyText(url);
            }
        });
    };
    
    img.src = currentQRCode;
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showSuccess('Link copied to clipboard!');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showError('Unable to copy to clipboard', 'Copy Error');
    }
    
    document.body.removeChild(textArea);
}

function resetQRDisplay() {
    const qrResult = document.getElementById('qr-result');
    const qrActions = document.getElementById('qr-actions');
    const qrInfo = document.getElementById('qr-info');
    
    qrResult.innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">
                <i class="fas fa-qrcode"></i>
            </div>
            <h4>Ready to Generate</h4>
            <p>Your QR code will appear here</p>
        </div>
    `;
    
    qrActions.style.display = 'none';
    qrInfo.style.display = 'none';
    currentQRCode = null;
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    
    if (show) {
        loading.style.display = 'flex';
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.opacity = '1';
        }, 10);
        
        // Disable interactions
        document.body.style.overflow = 'hidden';
    } else {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function showError(message, title = 'Error') {
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    errorDiv.querySelector('h4').textContent = title;
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
    
    // Add shake animation
    errorDiv.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        errorDiv.style.animation = '';
    }, 500);
}

function hideError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.opacity = '0';
    setTimeout(() => {
        errorDiv.style.display = 'none';
        errorDiv.style.opacity = '1';
    }, 300);
}

function showSuccess(message) {
    const toast = document.getElementById('success-toast');
    toast.querySelector('span').textContent = message;
    toast.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.style.display = 'none';
            toast.style.opacity = '1';
        }, 300);
    }, 3000);
}

function incrementQRCount() {
    qrCount++;
    document.getElementById('qr-count').textContent = qrCount;
    localStorage.setItem('qrCount', qrCount);
    
    // Add count animation
    const countElement = document.getElementById('qr-count');
    countElement.style.transform = 'scale(1.2)';
    countElement.style.color = '#48bb78';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
        countElement.style.color = 'white';
    }, 300);
}

function loadQRCount() {
    const savedCount = localStorage.getItem('qrCount');
    if (savedCount) {
        qrCount = parseInt(savedCount);
        document.getElementById('qr-count').textContent = qrCount;
    }
}

function trackQRGeneration(textLength) {
    // Analytics tracking (can be extended)
    const data = {
        timestamp: new Date().toISOString(),
        textLength: textLength,
        userAgent: navigator.userAgent
    };
    
    // Store in localStorage for basic analytics
    const analytics = JSON.parse(localStorage.getItem('qrAnalytics') || '[]');
    analytics.push(data);
    
    // Keep only last 100 entries
    if (analytics.length > 100) {
        analytics.splice(0, analytics.length - 100);
    }
    
    localStorage.setItem('qrAnalytics', JSON.stringify(analytics));
}

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for scroll animations
    document.querySelectorAll('.main-card, .modern-footer').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to generate QR
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateQR();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        hideError();
        showLoading(false);
    }
});

// Add shake animation for errors
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;

// Inject shake animation
const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle responsive adjustments
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }, 250);
});

// Initialize mobile class
if (window.innerWidth <= 768) {
    document.body.classList.add('mobile');
}

// Add smooth transitions for theme changes (future enhancement)
document.documentElement.style.setProperty('--transition-duration', '0.3s');

// Preload critical images for better performance
function preloadImages() {
    const images = [
        // Add any critical images here
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();