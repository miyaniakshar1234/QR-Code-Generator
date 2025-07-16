/**
 * QR Code Generator - Frontend JavaScript
 * Created by: Akshar Miyani
 * Email: miyaniakshar1234@gmail.com
 * Mobile: +919737160031
 * GitHub: https://github.com/miyaniakshar1234
 */

let currentQRCode = null;

async function generateQR() {
    const textInput = document.getElementById('qr-text');
    const text = textInput.value.trim();
    
    if (!text) {
        showError('Please enter some text or URL to generate QR code');
        return;
    }
    
    showLoading(true);
    hideError();
    
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
            displayQRCode(data.qr_code);
            currentQRCode = data.qr_code;
        } else {
            showError(data.error || 'Failed to generate QR code');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function displayQRCode(qrCodeData) {
    const qrResult = document.getElementById('qr-result');
    const downloadBtn = document.getElementById('download-btn');
    
    qrResult.innerHTML = `<img src="${qrCodeData}" alt="Generated QR Code" />`;
    downloadBtn.style.display = 'block';
}

function downloadQR() {
    if (!currentQRCode) {
        showError('No QR code to download');
        return;
    }
    
    const link = document.createElement('a');
    link.href = currentQRCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'block' : 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.display = 'none';
}

// Allow Enter key to generate QR code
document.getElementById('qr-text').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateQR();
    }
});

// Clear QR code when input changes
document.getElementById('qr-text').addEventListener('input', function() {
    const qrResult = document.getElementById('qr-result');
    const downloadBtn = document.getElementById('download-btn');
    
    if (this.value.trim() === '') {
        qrResult.innerHTML = `
            <div class="placeholder">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <rect width="200" height="200" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" stroke-dasharray="5,5"/>
                    <text x="100" y="100" text-anchor="middle" fill="#6c757d" font-size="14">QR Code will appear here</text>
                </svg>
            </div>
        `;
        downloadBtn.style.display = 'none';
        currentQRCode = null;
    }
});