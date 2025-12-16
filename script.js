// MediaVault Pro - Main JavaScript

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const formatButtons = document.querySelectorAll('.format-btn');
const faqItems = document.querySelectorAll('.faq-item');
const progressModal = document.getElementById('progressModal');

// Mobile Navigation
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Tab Navigation
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Remove active classes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active classes
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Format Selection
formatButtons.forEach(button => {
    button.addEventListener('click', () => {
        formatButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Video Analyzer
function analyzeVideo() {
    const url = document.getElementById('singleUrl').value;
    
    if (!url) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }
    
    // Simulate video analysis
    showProgress('Analyzing video...');
    
    setTimeout(() => {
        hideProgress();
        document.getElementById('videoInfo').style.display = 'block';
        
        // Simulate video data
        document.getElementById('videoThumbnail').src = 'https://via.placeholder.com/320x180';
        document.getElementById('videoTitle').textContent = 'Sample Video Title';
        document.getElementById('videoDuration').textContent = 'Duration: 10:30';
        
        showNotification('Video analyzed successfully!', 'success');
    }, 2000);
}

// Download Video
function downloadVideo() {
    const quality = document.querySelector('input[name="quality"]:checked')?.value;
    const format = document.querySelector('.format-btn.active')?.dataset.format;
    
    if (!quality || !format) {
        showNotification('Please select quality and format', 'error');
        return;
    }
    
    showProgress('Preparing download...');
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        updateProgress(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            hideProgress();
            showNotification('Download completed!', 'success');
        }
    }, 500);
}

// Batch Analyzer
function analyzeBatch() {
    const urls = document.getElementById('batchUrls').value.trim();
    
    if (!urls) {
        showNotification('Please enter at least one URL', 'error');
        return;
    }
    
    const urlList = urls.split('\n').filter(url => url.trim());
    
    if (urlList.length > 10) {
        showNotification('Maximum 10 URLs allowed', 'error');
        return;
    }
    
    showProgress('Analyzing batch...');
    
    setTimeout(() => {
        hideProgress();
        displayBatchList(urlList);
        document.getElementById('batchSettings').style.display = 'block';
        showNotification(`${urlList.length} videos ready for download`, 'success');
    }, 2000);
}

// Display Batch List
function displayBatchList(urls) {
    const batchList = document.getElementById('batchList');
    batchList.innerHTML = '';
    batchList.style.display = 'block';
    
    urls.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'batch-item';
        item.innerHTML = `
            <div class="batch-item-info">
                <i class="fas fa-video"></i>
                <span>Video ${index + 1}: ${url.substring(0, 50)}...</span>
            </div>
            <span class="batch-item-status status-ready">Ready</span>
        `;
        batchList.appendChild(item);
    });
}

// Clear Batch
function clearBatch() {
    document.getElementById('batchUrls').value = '';
    document.getElementById('batchList').style.display = 'none';
    document.getElementById('batchSettings').style.display = 'none';
}

// Download Batch
function downloadBatch() {
    showProgress('Downloading batch...');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        updateProgress(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            hideProgress();
            showNotification('Batch download completed!', 'success');
        }
    }, 500);
}

// Audio Options
function selectAudioOption(option) {
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (option === 'url') {
        document.getElementById('audioUrl').style.display = 'block';
        document.getElementById('audioUpload').style.display = 'none';
    } else {
        document.getElementById('audioUrl').style.display = 'none';
        document.getElementById('audioUpload').style.display = 'block';
        initializeUpload();
    }
}

// Analyze Audio
function analyzeAudio() {
    const url = document.getElementById('audioUrlInput').value;
    
    if (!url) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }
    
    showProgress('Extracting audio information...');
    
    setTimeout(() => {
        hideProgress();
        document.getElementById('audioSettings').style.display = 'block';
        showNotification('Audio ready for extraction', 'success');
    }, 1500);
}

// Extract Audio
function extractAudio() {
    const format = document.getElementById('audioFormat').value;
    const bitrate = document.getElementById('audioBitrate').value;
    
    showProgress('Extracting audio...');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        updateProgress(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            hideProgress();
            showNotification(`Audio extracted as ${format.toUpperCase()} (${bitrate}kbps)`, 'success');
        }
    }, 400);
}

// File Upload Handler
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        });
    });
    
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
}

function handleDrop(e) {
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        
        if (file.size > 500 * 1024 * 1024) {
            showNotification('File size must be less than 500MB', 'error');
            return;
        }
        
        showNotification(`File "${file.name}" uploaded successfully`, 'success');
        document.getElementById('audioSettings').style.display = 'block';
    }
}

// Progress Functions
function showProgress(message) {
    const modal = document.getElementById('progressModal');
    const status = modal.querySelector('.progress-status');
    status.textContent = message;
    modal.classList.add('show');
}

function updateProgress(percent) {
    const modal = document.getElementById('progressModal');
    const text = modal.querySelector('.progress-text');
    const circle = modal.querySelector('.progress-ring-circle');
    
    text.textContent = `${percent}%`;
    const offset = 314 - (314 * percent) / 100;
    circle.style.strokeDashoffset = offset;
}

function hideProgress() {
    const modal = document.getElementById('progressModal');
    modal.classList.remove('show');
    updateProgress(0);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Initialize tooltips
    initTooltips();
    
    // Check device type
    checkDevice();
});

// Tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const text = e.target.dataset.tooltip;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = `${rect.top - 40}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Device Detection
function checkDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/tv|smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv/i.test(userAgent)) {
        document.body.classList.add('tv-mode');
        optimizeForTV();
    } else if (/mobile|android|iphone|ipad|tablet/i.test(userAgent)) {
        document.body.classList.add('mobile-mode');
    } else {
        document.body.classList.add('desktop-mode');
    }
}

// TV Optimization
function optimizeForTV() {
    // Increase font sizes for TV
    document.documentElement.style.fontSize = '20px';
    
    // Add keyboard navigation
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    let currentIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[currentIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[currentIndex].focus();
        }
    });
}

// Add Notification Styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: var(--card-bg);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(400px);
    transition: transform 0.3s;
    z-index: 3000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid var(--success);
}

.notification-error {
    border-left: 4px solid var(--error);
}

.notification-warning {
    border-left: 4px solid var(--warning);
}

.notification i {
    font-size: 1.2rem;
}

.notification-success i {
    color: var(--success);
}

.notification-error i {
    color: var(--error);
}

.notification-warning i {
    color: var(--warning);
}

.tooltip {
    position: absolute;
    background: var(--card-bg);
    color: var(--text-primary);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.875rem;
    z-index: 2500;
    pointer-events: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
`;
document.head.appendChild(notificationStyles);

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    });
}

// Performance Optimization
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Analytics (Example - Replace with your analytics code)
function trackEvent(category, action, label) {
    // Google Analytics or other tracking
    console.log('Track Event:', { category, action, label });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeVideo,
        downloadVideo,
        analyzeBatch,
        downloadBatch,
        analyzeAudio,
        extractAudio
    };
}
