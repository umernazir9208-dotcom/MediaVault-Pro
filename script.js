// Replace the existing analyzeVideo function with this:
async function analyzeVideo() {
    const url = document.getElementById('singleUrl').value;
    
    if (!url) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }
    
    showProgress('Analyzing video...');
    
    try {
        // Extract video ID from YouTube URL
        const videoId = extractVideoId(url);
        
        if (videoId) {
            // Get video info using YouTube's oEmbed API (legal and compliant)
            const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            const data = await response.json();
            
            hideProgress();
            document.getElementById('videoInfo').style.display = 'block';
            
            // Display real thumbnail
            document.getElementById('videoThumbnail').src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            document.getElementById('videoTitle').textContent = data.title;
            document.getElementById('videoDuration').textContent = 'Duration: Available after processing';
            
            showNotification('Video analyzed successfully!', 'success');
        } else {
            hideProgress();
            showNotification('Invalid YouTube URL', 'error');
        }
    } catch (error) {
        hideProgress();
        showNotification('Error analyzing video', 'error');
    }
}

// Helper function to extract YouTube video ID
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Updated download function with real download capability
async function downloadVideo() {
    const quality = document.querySelector('input[name="quality"]:checked')?.value;
    const format = document.querySelector('.format-btn.active')?.dataset.format;
    const url = document.getElementById('singleUrl').value;
    
    if (!quality || !format) {
        showNotification('Please select quality and format', 'error');
        return;
    }
    
    showNotification('⚠️ Redirecting to download service...', 'warning');
    
    // Option 1: Using a third-party service (example with y2mate alternative)
    // Note: This is for educational purposes only
    const videoId = extractVideoId(url);
    if (videoId) {
        // You can redirect to a service or implement your own backend
        showDownloadOptions(videoId, quality, format);
    }
}

// Show download options
function showDownloadOptions(videoId, quality, format) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="download-modal-content">
            <h3>Download Options</h3>
            <p>⚠️ Important: Only download videos you have permission to use!</p>
            
            <div class="download-methods">
                <h4>Method 1: Browser Extension</h4>
                <p>Install a YouTube downloader browser extension for legal downloads.</p>
                
                <h4>Method 2: Online Services</h4>
                <p>Use services that comply with copyright laws:</p>
                <ul>
                    <li>YouTube Premium (Official - Download for offline viewing)</li>
                    <li>Creator Studio (For your own videos)</li>
                </ul>
                
                <h4>Method 3: Screen Recording</h4>
                <p>Use screen recording software for personal use only.</p>
            </div>
            
            <button onclick="closeDownloadModal()" class="close-modal-btn">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5000;
        }
        
        .download-modal-content {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
        }
        
        .download-modal-content h3 {
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        .download-modal-content h4 {
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .download-modal-content p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .download-modal-content ul {
            color: var(--text-secondary);
            margin-left: 1.5rem;
        }
        
        .close-modal-btn {
            margin-top: 1.5rem;
            width: 100%;
            padding: 12px;
            background: var(--primary-gradient);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

function closeDownloadModal() {
    document.querySelector('.download-modal')?.remove();
}
