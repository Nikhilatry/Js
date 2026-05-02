// URL Extraction & UI Initialization
const urlParams = new URLSearchParams(window.location.search);

// Case-insensitive param extraction helper
const getParam = (key) => urlParams.get(key) || urlParams.get(key.toLowerCase()) || urlParams.get(key.toUpperCase());

const vt = getParam('vt'); // 'v' or 'Yt'/'yt'
let activeVideoId = getParam('Id') || getParam('id');
const pParam = getParam('p'); // '1' = on, '0' = off
const cParam = getParam('c'); // '1' = on, '0' = off
const pId = getParam('p-id');
const cId = getParam('c-id');
const isAdmin = getParam('nikhil') === '1' || getParam('nikhil') === 'true';

// Security & Quality Features
document.addEventListener('contextmenu', (e) => {
    // If admin, allow native menu (bypass)
    if (isAdmin) return;

    // Only intercept context menu if it's over the video section or side panel
    if (e.target.closest('#video-section') || e.target.closest('#side-panel')) {
        e.preventDefault();

        // Lazy-fetch if needed
        if (!contextMenu) contextMenu = document.getElementById('custom-context-menu');

        if (typeof showContextMenu === 'function') showContextMenu(e);
    }
});

if (!isAdmin) {
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'u')
        ) {
            e.preventDefault();
        }
    });
}

// Dynamic Script Loading
const loadScript = (src) => {
    const s = document.createElement('script');
    s.src = src;
    document.body.appendChild(s);
};
// Dynamic Script Loading - Modules now loaded in index.html for better performance
// loadScript('playlist.js');
// loadScript('comments.js');


// DOM Elements
const video = document.getElementById('html5-video');
const ytContainer = document.getElementById('youtube-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = playPauseBtn.querySelector('i');
const skipBackBtn = document.getElementById('skip-back-btn');
const skipForwardBtn = document.getElementById('skip-forward-btn');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = muteBtn.querySelector('i');
const progressArea = document.querySelector('.progress-area');
const progressFilled = document.querySelector('.progress-filled');
const progressBuffered = document.querySelector('.progress-buffered');
const progressThumb = document.querySelector('.progress-thumb');
let contextMenu = document.getElementById('custom-context-menu');
let startPlayOverlay = document.getElementById('start-play-overlay');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const fullscreenIcon = fullscreenBtn.querySelector('i');
const videoSection = document.getElementById('video-section');
const videoLoader = document.getElementById('video-loader');
const errorScreen = document.getElementById('error-screen');
const errorTitle = document.getElementById('error-title');
const errorDesc = document.getElementById('error-desc');
const toastContainer = document.getElementById('toast-container');
const actionOverlay = document.getElementById('video-action-overlay');

// Top Bar Elements
const backBtn = document.getElementById('back-btn');
const infoBtn = document.getElementById('info-btn');
const reportBtn = document.getElementById('report-btn');

// Panel Elements
const sidePanel = document.getElementById('side-panel');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');
const closePanelBtn = document.getElementById('close-panel-btn');
const panelTriggers = document.querySelectorAll('.panel-trigger-btn');
const playlistBtn = document.getElementById('playlist-btn');
const commentsBtn = document.getElementById('comments-btn');

// Modal Elements
const reportModal = document.getElementById('report-modal');
const closeReportBtn = document.getElementById('close-report-btn');
const cancelReportBtn = document.getElementById('cancel-report-btn');
const submitReportBtn = document.getElementById('submit-report-btn');
const infoModal = document.getElementById('info-modal');
const closeInfoBtn = document.getElementById('close-info-btn');
const backModal = document.getElementById('back-modal');
const cancelBackBtn = document.getElementById('cancel-back-btn');
const confirmBackBtn = document.getElementById('confirm-back-btn');

// Show/Hide Panels based on 'p' and 'c' parameters
// 0 = off (hidden), 1 = on (visible defaults)
if (pParam === '0') document.querySelectorAll('.panel-trigger-btn[data-panel="playlist"]').forEach(btn => btn.style.display = 'none');
if (cParam === '0') document.querySelectorAll('.panel-trigger-btn[data-panel="comments"]').forEach(btn => btn.style.display = 'none');

// State Variables
let isPlaying = false;
let idleTimeout = null;
let currentOpenPanel = null;
window.activePlayerType = 'none'; // 'v', 'yt'
window.ytPlayer = null;
let ytTimeInterval = null;
let currentVolume = parseFloat(localStorage.getItem('player-volume')) || 1;
let currentSpeed = parseFloat(localStorage.getItem('player-speed')) || 1;
let isLooping = false;
let pendingSeekTime = parseFloat(getParam('t')) || 0;
let progressSaveInterval = null;

// Persistent Settings
let currentSkipInterval = parseInt(localStorage.getItem('player-skip-interval')) || 10;
let ambientModeEnabled = localStorage.getItem('player-ambient-mode') === '1';
let uiFeedbackEnabled = localStorage.getItem('player-ui-feedback') !== '0'; // default on
let ytCCEnabled = localStorage.getItem('player-yt-cc') === '1';

// Ambient Mode Support
let ambientCanvas = document.createElement('canvas');
let ambientCtx = ambientCanvas.getContext('2d', { willReadFrequently: true });
ambientCanvas.width = 1; ambientCanvas.height = 1;
let ambientGlowEl = document.getElementById('ambient-glow');
let ambientInterval = null;

// Now Playing Metadata
function updateTopBarMetadata(title, teacher) {
    const container = document.getElementById('top-bar-metadata');
    if (!container) return;
    
    const titleEl = container.querySelector('.video-title');
    const teacherEl = container.querySelector('.video-teacher');
    
    if (titleEl) titleEl.innerText = title || "";
    if (teacherEl) teacherEl.innerText = teacher ? `Teacher: ${teacher}` : "";
    
    // Optional: add a small fade effect
    container.style.opacity = '0';
    setTimeout(() => container.style.opacity = '1', 50);
}
window.updateTopBarMetadata = updateTopBarMetadata;

// Auto-Resume Progress Saver
function startProgressSaver() {
    if (progressSaveInterval) clearInterval(progressSaveInterval);
    progressSaveInterval = setInterval(() => {
        if (isPlaying && activeVideoId) {
            const currentTime = Math.floor(getCurrentTime());
            if (currentTime > 5) { // Only save after 5s to avoid clutter
                localStorage.setItem(`v_time_${activeVideoId}`, currentTime);
            }
        }
    }, 5000);
}
startProgressSaver();
let isInitialLoad = true;

// UI Feedback: Toast Notifications
function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    // SVG icons for toast types
    const icons = {
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
        success: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        speed: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>',
        quality: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.2 1.2L3 12l5.8 1.9a2 2 0 0 1 1.2 1.2L12 21l1.9-5.8a2 2 0 0 1 1.2-1.2L21 12l-5.8-1.9a2 2 0 0 1-1.2-1.2L12 3z"/></svg>'
    };

    const icon = icons[type] || icons.info;
    toast.innerHTML = `${icon} <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// UI Feedback: Action Overlay (Central Pulse)
function showActionOverlay(type) {
    if (!uiFeedbackEnabled) return;
    const icons = {
        play: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3l14 9-14 9V3z"/></svg>',
        pause: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
        rewind: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 19l-7-7 7-7"/><path d="M19 19l-7-7 7-7"/></svg>',
        forward: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 19l7-7-7-7"/><path d="M5 19l7-7-7-7"/></svg>'
    };

    actionOverlay.innerHTML = icons[type] || icons.play;
    actionOverlay.classList.remove('animate');
    void actionOverlay.offsetWidth; // Trigger reflow
    actionOverlay.classList.add('animate');
}

// Alias for info.js access
window.video = video;

// Validate Params
const lowerVt = vt ? vt.toLowerCase() : null;
let isInvalid = (!lowerVt) || (lowerVt !== 'v' && lowerVt !== 'yt') || !activeVideoId;

function showError(title, desc) {
    if (errorScreen) errorScreen.style.display = 'flex';
    if (errorTitle && title) errorTitle.innerText = title;
    if (errorDesc && desc) errorDesc.innerText = desc;
    if (video) video.style.display = 'none';
    if (ytContainer) ytContainer.style.display = 'none';
    if (videoLoader) videoLoader.style.display = 'none';
    activePlayerType = 'none';
}

// Application Player Controller
window.loadVideo = function (newVt, newId, forcePlay = true) {
    console.log("DEBUG: loadVideo called with:", newVt, newId, "forcePlay:", forcePlay);
    if (!newVt || !newId) return;

    // Keep YT initialization in sync with the latest selected chapter.
    activeVideoId = newId;

    // 1. Update URL parameters without reload
    const url = new URL(window.location.href);
    url.searchParams.set('vt', newVt);
    url.searchParams.set('Id', newId);
    window.history.pushState({}, '', url);

    // 2. Stop & Reset Players
    if (activePlayerType === 'v') {
        video.pause();
        video.src = "";
        video.load();
    } else if (activePlayerType === 'yt' && ytPlayer && ytPlayer.stopVideo) {
        ytPlayer.stopVideo();
        if (ytTimeInterval) clearInterval(ytTimeInterval);
    }

    if (errorScreen) errorScreen.style.display = 'none';
    window.activePlayerType = newVt.toLowerCase();

    // 4. Update Top Bar Metadata
    if (window.playlistController && window.playlistController.items && window.playlistController.indexById.has(String(newId))) {
        const item = window.playlistController.items[window.playlistController.indexById.get(String(newId))];
        updateTopBarMetadata(item.name, item.teacher);
    }

    // 3. Initialize New Player
    if (activePlayerType === 'v') {
        ytContainer.style.display = 'none';
        video.style.display = 'block';
        video.src = newId;
        video.load();

        // Check for Auto-Resume if no URL time provided
        if (pendingSeekTime === 0) {
            const savedTime = parseFloat(localStorage.getItem(`v_time_${newId}`)) || 0;
            if (savedTime > 10) { // Only resume if progress is substantial
                pendingSeekTime = savedTime;
                showToast(`Resuming from ${formatTime(savedTime)}`, 'info');
            }
        }

        if (forcePlay) video.play().catch(e => console.log("Autoplay blocked:", e));
    } else if (activePlayerType === 'yt') {
        video.style.display = 'none';
        ytContainer.style.display = 'block';

        // Check for Auto-Resume if no URL time provided
        if (pendingSeekTime === 0) {
            const savedTime = parseFloat(localStorage.getItem(`v_time_${newId}`)) || 0;
            if (savedTime > 10) {
                pendingSeekTime = savedTime;
                showToast(`Resuming from ${formatTime(savedTime)}`, 'info');
            }
        }

        if (ytPlayer && ytPlayer.loadVideoById) {
            ytPlayer.loadVideoById(newId);
            if (forcePlay) ytPlayer.playVideo();
        } else {
            // If YT API not ready yet, it will init via onYouTubeIframeAPIReady using activeVideoId
            activeVideoId = newId;
        }
    }
};

// Initial Load
if (isInvalid) {
    showError("Missing Configuration Parameters", "The requested video could not be loaded because URL parameters are missing or invalid.");
} else {
    window.loadVideo(lowerVt, activeVideoId, true);

    // Check if autoplay was blocked - ignore if YouTube as YT handles its own overlay usually
    if (activePlayerType === 'v') {
        setTimeout(() => {
            if (video.paused && isInitialLoad) {
                startPlayOverlay.style.display = 'flex';
            }
        }, 1000);
    }

    // Autoplay attempt / Seeking on interaction
    const startPlayOnInteraction = () => {
        if (isInitialLoad) {
            startPlayOverlay.style.display = 'none';
            isInitialLoad = false;
        }

        if (window.activePlayerType === 'v' && video && video.paused) {
            video.play().then(() => {
                if (pendingSeekTime > 0) {
                    video.currentTime = pendingSeekTime;
                    pendingSeekTime = 0;
                }
            }).catch(() => { });
        } else if (window.activePlayerType === 'yt' && window.ytPlayer && window.ytPlayer.getPlayerState) {
            if (window.ytPlayer.getPlayerState() !== 1) {
                window.ytPlayer.playVideo();
            }
            if (pendingSeekTime > 0) {
                window.ytPlayer.seekTo(pendingSeekTime);
                pendingSeekTime = 0;
            }
        }
        document.removeEventListener('click', startPlayOnInteraction);
    };
    document.addEventListener('click', startPlayOnInteraction);
    startPlayOverlay.addEventListener('click', startPlayOnInteraction);

    // Apply persisted settings
    setTimeout(() => {
        changeVolume(currentVolume);
        volumeSlider.value = currentVolume;
        setPlaybackSpeed(currentSpeed);
    }, 1000); // Wait for players to init
}

// ===========================
// Application Logic
// ===========================

const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return "00:00";
    const hrs = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor(time % 60);
    const paddedMin = hrs > 0 && min < 10 ? `0${min}` : min;
    const paddedSec = sec < 10 ? `0${sec}` : sec;
    
    if (hrs > 0) return `${hrs}:${paddedMin}:${paddedSec}`;
    return `${min < 10 ? '0' : ''}${min}:${paddedSec}`;
};

// Autohide Controls
const resetIdleTimer = () => {
    videoSection.classList.remove('idle');
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        if (isPlaying) {
            videoSection.classList.add('idle');
        }
    }, 3000);
};

videoSection.addEventListener('mousemove', resetIdleTimer);
videoSection.addEventListener('mouseleave', () => {
    if (isPlaying) videoSection.classList.add('idle');
});
videoSection.addEventListener('click', (e) => {
    // don't toggle play if they clicked progress bar or buttons
    if (e.target.closest('.player-controls') || e.target.closest('.player-top-controls')) return;
    resetIdleTimer();
});

// ===========================
// Application / Panel Logic
// ===========================

function updateAmbientGlow() {
    if (!ambientModeEnabled || !ambientGlowEl) {
        if (ambientGlowEl) ambientGlowEl.classList.remove('active');
        return;
    }

    if (activePlayerType === 'v' && !video.paused) {
        ambientCtx.drawImage(video, 0, 0, 1, 1);
        const [r, g, b] = ambientCtx.getImageData(0, 0, 1, 1).data;
        ambientGlowEl.style.background = `rgb(${r}, ${g}, ${b})`;
        ambientGlowEl.classList.add('active');
    } else if (activePlayerType === 'yt') {
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim();
        ambientGlowEl.style.background = primary;
        ambientGlowEl.classList.add('active');
    } else {
        ambientGlowEl.classList.remove('active');
    }
}

// Start ambient polling
setInterval(updateAmbientGlow, 500);

function resetPlayer() {
    const theme = localStorage.getItem('player-theme');
    localStorage.clear();
    if (theme) localStorage.setItem('player-theme', theme);
    showToast("Player reset successful! Reloading...", "success");
    setTimeout(() => location.reload(), 1500);
}

function openPanel(panelType) {
    if (currentOpenPanel === panelType) {
        closePanel();
        return;
    }
    panelTriggers.forEach(btn => btn.classList.remove('active'));

    const activeBtn = Array.from(panelTriggers).find(btn => btn.dataset.panel === panelType);
    if (activeBtn) activeBtn.classList.add('active');

    if (window.PanelData && window.PanelData[panelType]) {
        panelTitle.innerText = panelType.charAt(0).toUpperCase() + panelType.slice(1);
        panelContent.innerHTML = window.PanelData[panelType];

        if (panelType === 'playlist' && typeof window.syncPlaylistActiveUI === 'function') {
            window.syncPlaylistActiveUI();
            if (typeof window.scrollToActiveChapter === 'function') {
                window.scrollToActiveChapter();
            }
        }

        if (panelType === 'settings') {
            const toggle = document.getElementById('inner-theme-toggle');
            const speedSelect = document.getElementById('speed-select');
            const qualitySelect = document.getElementById('quality-select');

            if (toggle) {
                toggle.addEventListener('click', () => {
                    const root = document.documentElement;
                    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                    root.setAttribute('data-theme', newTheme);
                    localStorage.setItem('player-theme', newTheme);
                });
            }

            if (speedSelect) {
                speedSelect.value = currentSpeed.toString();
                speedSelect.addEventListener('change', (e) => {
                    const speed = parseFloat(e.target.value);
                    setPlaybackSpeed(speed);
                    localStorage.setItem('player-speed', speed);
                    showToast(`Speed: ${speed}x`, 'speed');
                });
            }

            if (qualitySelect) {
                qualitySelect.addEventListener('change', (e) => {
                    setVideoQuality(e.target.value);
                });
            }

            // New Settings
            const ambientToggle = document.getElementById('ambient-mode-toggle');
            const feedbackToggle = document.getElementById('ui-feedback-toggle');
            const skipSelect = document.getElementById('skip-interval-select');
            const ccToggle = document.getElementById('yt-cc-toggle');
            const ccRow = document.getElementById('yt-cc-row');
            const resetBtn = document.getElementById('reset-player-btn');

            if (ambientToggle) {
                ambientToggle.checked = ambientModeEnabled;
                ambientToggle.addEventListener('change', (e) => {
                    ambientModeEnabled = e.target.checked;
                    localStorage.setItem('player-ambient-mode', ambientModeEnabled ? '1' : '0');
                    updateAmbientGlow();
                });
            }

            if (feedbackToggle) {
                feedbackToggle.checked = uiFeedbackEnabled;
                feedbackToggle.addEventListener('change', (e) => {
                    uiFeedbackEnabled = e.target.checked;
                    localStorage.setItem('player-ui-feedback', uiFeedbackEnabled ? '1' : '0');
                });
            }

            if (skipSelect) {
                skipSelect.value = currentSkipInterval.toString();
                skipSelect.addEventListener('change', (e) => {
                    currentSkipInterval = parseInt(e.target.value);
                    localStorage.setItem('player-skip-interval', currentSkipInterval);
                });
            }

            if (ccRow && activePlayerType === 'yt') {
                ccRow.style.display = 'flex';
                if (ccToggle) {
                    ccToggle.checked = ytCCEnabled;
                    ccToggle.addEventListener('change', (e) => {
                        ytCCEnabled = e.target.checked;
                        localStorage.setItem('player-yt-cc', ytCCEnabled ? '1' : '0');
                        if (ytPlayer && ytPlayer.setOption) {
                            ytPlayer.setOption('captions', 'reload', ytCCEnabled);
                        }
                    });
                }
            }

            if (resetBtn) resetBtn.addEventListener('click', resetPlayer);
        }
    } else {
        panelContent.innerHTML = `<p style="padding: 20px;">Loading or could not load data for ${panelType}.</p>`;
    }

    currentOpenPanel = panelType;
    sidePanel.classList.add('open');
}

function closePanel() {
    sidePanel.classList.remove('open');
    panelTriggers.forEach(btn => btn.classList.remove('active'));
    currentOpenPanel = null;
}

panelTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
        openPanel(btn.dataset.panel);
    });
});
closePanelBtn.addEventListener('click', closePanel);

// Panel trigger buttons in top bar
if (infoBtn) infoBtn.addEventListener('click', () => openPanel('info'));
if (reportBtn) reportBtn.addEventListener('click', () => openPanel('report'));

// Header Controls Logic for Exit
const toggleBackModal = (show) => {
    if (show) {
        backModal.classList.add('active');
        if (isPlaying) uniPause();
    } else backModal.classList.remove('active');
};
backBtn.addEventListener('click', () => toggleBackModal(true));
cancelBackBtn.addEventListener('click', () => toggleBackModal(false));
confirmBackBtn.addEventListener('click', () => {
    history.back();
    toggleBackModal(false);
});

// ===========================
// Universal Player Controller Logic
// ===========================

function setPlayIcon(playing) {
    const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3l14 9-14 9V3z"/></svg>';
    const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    playPauseBtn.innerHTML = playing ? pauseIcon : playIcon;
}

function updateProgressUI(current, max) {
    if (!max || max === 0) return;
    currentTimeEl.innerText = formatTime(current);
    durationTimeEl.innerText = formatTime(max);

    const percent = (current / max) * 100;
    progressFilled.style.width = `${percent}%`;
    progressThumb.style.left = `${percent}%`;

    // Handle Buffered Bar
    if (progressBuffered) {
        let bufferedPercent = 0;
        if (window.activePlayerType === 'v' && video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            bufferedPercent = (bufferedEnd / max) * 100;
        } else if (window.activePlayerType === 'yt' && window.ytPlayer && window.ytPlayer.getVideoLoadedFraction) {
            bufferedPercent = window.ytPlayer.getVideoLoadedFraction() * 100;
        }
        progressBuffered.style.width = `${bufferedPercent}%`;
    }
}

// Media Control Abstractions
function uniPlay() {
    if (activePlayerType === 'v') video.play();
    else if (activePlayerType === 'yt' && ytPlayer) ytPlayer.playVideo();
}
function uniPause() {
    if (activePlayerType === 'v') video.pause();
    else if (activePlayerType === 'yt' && ytPlayer) ytPlayer.pauseVideo();
}
function togglePlayPause() {
    if (isPlaying) uniPause(); else uniPlay();
}

function getDuration() {
    if (activePlayerType === 'v') return video.duration;
    else if (activePlayerType === 'yt' && ytPlayer) return ytPlayer.getDuration();
    return 0;
}
function getCurrentTime() {
    if (activePlayerType === 'v') return video.currentTime;
    else if (activePlayerType === 'yt' && ytPlayer) return ytPlayer.getCurrentTime();
    return 0;
}

function skip(amount) {
    // If amount is +/- 10 (the default call), use the custom interval instead
    const actualAmount = (Math.abs(amount) === 10) ? (currentSkipInterval * (amount / 10)) : amount;
    
    let dur = getDuration();
    let current = getCurrentTime();
    let target = Math.max(0, Math.min(dur, current + actualAmount));

    if (activePlayerType === 'v') video.currentTime = target;
    else if (activePlayerType === 'yt' && ytPlayer) ytPlayer.seekTo(target, true);
}

function seekToPos(pos) {
    let dur = getDuration();
    let target = pos * dur;
    if (activePlayerType === 'v') video.currentTime = target;
    else if (activePlayerType === 'yt' && ytPlayer) ytPlayer.seekTo(target, true);
}

function changeVolume(val) {
    currentVolume = val;
    if (activePlayerType === 'v') video.volume = val;
    else if (activePlayerType === 'yt' && ytPlayer) ytPlayer.setVolume(val * 100);

    const highIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
    const muteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
    
    muteBtn.innerHTML = val == 0 ? muteIcon : highIcon;
}

function getPlaybackSpeed() {
    if (activePlayerType === 'v') return video.playbackRate;
    else if (activePlayerType === 'yt' && ytPlayer) return ytPlayer.getPlaybackRate();
    return 1;
}
function setPlaybackSpeed(rate) {
    currentSpeed = rate;
    if (activePlayerType === 'v') video.playbackRate = rate;
    else if (activePlayerType === 'yt' && ytPlayer) ytPlayer.setPlaybackRate(rate);
}

function setVideoQuality(quality) {
    const label = quality === 'auto' ? 'Auto' : `${quality}p`;
    if (activePlayerType === 'yt' && ytPlayer && ytPlayer.setPlaybackQuality) {
        ytPlayer.setPlaybackQuality(quality === 'auto' ? 'default' : quality);
        showToast(`Quality: ${label}`, 'quality');
    } else {
        // HTML5 mock or multi-source switcher could go here
        showToast(`Quality: ${label}`, 'quality');
    }
}

function toggleTheaterMode() {
    isTheaterMode = !isTheaterMode;
    const container = document.getElementById('player-container');
    if (isTheaterMode) {
        container.classList.add('theater-mode');
    } else {
        container.classList.remove('theater-mode');
    }
}

function toggleFullscreen() {
    const container = document.getElementById('player-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => console.log(err));
        fullscreenIcon.classList.replace('ph-corners-out', 'ph-corners-in');
    } else {
        document.exitFullscreen();
        fullscreenIcon.classList.replace('ph-corners-in', 'ph-corners-out');
    }
}

// Interacting with Progress Timeline
let isDraggingProgress = false;
progressArea.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    updateProgressFromEvent(e);
});
window.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) updateProgressFromEvent(e);
});
window.addEventListener('mouseup', () => {
    if (isDraggingProgress) isDraggingProgress = false;
});

function updateProgressFromEvent(e) {
    const rect = progressArea.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width;
    pos = Math.max(0, Math.min(1, pos));
    seekToPos(pos);
}

// Media Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
skipBackBtn.addEventListener('click', () => skip(-10));
skipForwardBtn.addEventListener('click', () => skip(10));
volumeSlider.addEventListener('input', (e) => changeVolume(e.target.value));
muteBtn.addEventListener('click', () => {
    const currentVol = parseFloat(volumeSlider.value);
    if (currentVol > 0) {
        volumeSlider.dataset.prev = currentVol;
        volumeSlider.value = 0; changeVolume(0);
    } else {
        const prev = volumeSlider.dataset.prev || 1;
        volumeSlider.value = prev; changeVolume(prev);
    }
});
volumeSlider.addEventListener('change', (e) => {
    localStorage.setItem('player-volume', e.target.value);
});
fullscreenBtn.addEventListener('click', toggleFullscreen);

// Progress Tooltip Logic
const progressTooltip = document.getElementById('progress-tooltip');

progressArea.addEventListener('mousemove', (e) => {
    const rect = progressArea.getBoundingClientRect();
    const width = rect.width;
    let offsetX = e.clientX - rect.left;
    const dur = getDuration();
    
    if (dur > 0) {
        let pos = offsetX / width;
        pos = Math.max(0, Math.min(1, pos));
        const hoverTime = pos * dur;
        progressTooltip.innerText = formatTime(hoverTime);
        
        // Edge cases for tooltip position
        const tooltipWidth = progressTooltip.offsetWidth;
        let leftPos = offsetX;
        
        if (leftPos < tooltipWidth / 2) leftPos = tooltipWidth / 2;
        if (leftPos > width - tooltipWidth / 2) leftPos = width - tooltipWidth / 2;
        
        progressTooltip.style.left = `${leftPos}px`;
    }
});

// Click video overlay to pause/play
const clickOverlay = document.getElementById('click-overlay');
if (clickOverlay) {
    clickOverlay.addEventListener('click', () => togglePlayPause());
} else {
    document.querySelector('.video-wrapper').addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'video' && e.target.id !== 'youtube-player') return;
        togglePlayPause();
    });
}

// Initialization / HTML5 Video Lifecycle
video.addEventListener('play', () => { isPlaying = true; setPlayIcon(true); resetIdleTimer(); });
video.addEventListener('pause', () => { isPlaying = false; setPlayIcon(false); resetIdleTimer(); });
video.addEventListener('timeupdate', () => {
    updateProgressUI(video.currentTime, video.duration);
});
video.addEventListener('loadedmetadata', () => {
    durationTimeEl.innerText = formatTime(video.duration);
    changeVolume(volumeSlider.value); // Sync volume
});
video.addEventListener('waiting', () => { videoLoader.style.display = 'flex'; });
video.addEventListener('playing', () => { videoLoader.style.display = 'none'; });
video.addEventListener('canplay', () => { videoLoader.style.display = 'none'; });
video.addEventListener('ended', () => {
    if (isLooping) {
        video.currentTime = 0;
        video.play();
    } else {
        const didAuto = window.playlistController && window.playlistController.tryAutoPlayNext && window.playlistController.tryAutoPlayNext();
        if (didAuto) return;

        isPlaying = false;
        setPlayIcon(false);
    }
});
video.addEventListener('error', () => {
    if (activePlayerType === 'v') {
        showError("Invalid Link or Video Not Found", "The HTML5 video URL provided is invalid, broken, or unsupported.");
    }
});

// ==========================================
// YOUTUBE IFRAME INTEGRATION
// ==========================================
window.onYouTubeIframeAPIReady = function () {
    if (activePlayerType === 'yt' && !isInvalid) {
        let currentOrigin = window.location.protocol === 'file:' ? '*' : window.location.origin;
        ytPlayer = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: activeVideoId,
            host: 'https://www.youtube.com',
            playerVars: {
                'autoplay': 1,
                'playsinline': 1,
                'controls': 0, // Custom controls only
                'disablekb': 1,
                'rel': 0,
                'modestbranding': 1,
                'iv_load_policy': 3,
                'origin': currentOrigin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onPlaybackQualityChange': onPlaybackQualityChange,
                'onError': onPlayerError
            }
        });
    }
};

function onPlayerReady(event) {
    changeVolume(volumeSlider.value);
    durationTimeEl.innerText = formatTime(ytPlayer.getDuration());
    videoLoader.style.display = 'none';

    // Apply caption preference
    if (ytCCEnabled && ytPlayer.loadModule) {
        ytPlayer.loadModule('captions');
        ytPlayer.setOption('captions', 'reload', true);
    }

    // Attempt autoplay
    ytPlayer.playVideo();
}

function onPlaybackQualityChange(event) {
    const qualityMap = {
        'tiny': '144p',
        'small': '240p',
        'medium': '360p',
        'large': '480p',
        'hd720': '720p',
        'hd1080': '1080p',
        'hd1440': '1440p',
        'hd2160': '4K',
        'highres': '8K'
    };
    const raw = event.data;
    const label = qualityMap[raw] || raw.toUpperCase();
    showToast(`Quality: ${label}`, 'ph-hd-circle');
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        setPlayIcon(true);
        resetIdleTimer();
        videoLoader.style.display = 'none';

        // Start time polling
        if (ytTimeInterval) clearInterval(ytTimeInterval);
        ytTimeInterval = setInterval(() => {
            if (!isDraggingProgress) updateProgressUI(ytPlayer.getCurrentTime(), ytPlayer.getDuration());
        }, 200);

    } else if (event.data == YT.PlayerState.PAUSED) {
        isPlaying = false;
        setPlayIcon(false);
        resetIdleTimer();
        if (ytTimeInterval) clearInterval(ytTimeInterval);

    } else if (event.data == YT.PlayerState.ENDED) {
        if (isLooping) {
            ytPlayer.playVideo();
        } else {
            const didAuto = window.playlistController && window.playlistController.tryAutoPlayNext && window.playlistController.tryAutoPlayNext();
            if (didAuto) {
                if (ytTimeInterval) clearInterval(ytTimeInterval);
                return;
            }

            isPlaying = false;
            setPlayIcon(false);
            resetIdleTimer();
            if (ytTimeInterval) clearInterval(ytTimeInterval);
        }
    } else if (event.data == YT.PlayerState.BUFFERING) {
        videoLoader.style.display = 'flex';
    }
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
    showError("Invalid Video ID or YouTube Error", `YouTube encountered an error loading this video ID. (Code: ${event.data})`);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.target.tagName.toLowerCase() === 'textarea' || e.target.tagName.toLowerCase() === 'input') return;
    switch (e.key.toLowerCase()) {
        case 'k':
        case ' ': // spacebar
            e.preventDefault();
            togglePlayPause();
            showActionOverlay(isPlaying ? 'pause' : 'play');
            break;
        case 'j': skip(-10); showActionOverlay('rewind'); break;
        case 'l': skip(10); showActionOverlay('forward'); break;
        case 'm':
            muteBtn.click();
            break;
        case 'f': toggleFullscreen(); break;
        case 't': toggleTheaterMode(); break;
        case 'i': openPanel('info'); break;
        case 'r': openPanel('report'); break;
        case 'p': openPanel('playlist'); break;
        case 'c': openPanel('comments'); break;
        case 's': openPanel('settings'); break;
        case 'h': openPanel('chapters'); break;
        case 'j': skip(-currentSkipInterval); showActionOverlay('rewind'); break;
        case 'l': skip(currentSkipInterval); showActionOverlay('forward'); break;
        default:
            // Check for 0-9 keys for seeking 0% to 90%
            if (e.key >= '0' && e.key <= '9') {
                const percent = parseInt(e.key) / 10;
                seekToPos(percent);
            }
            break;
    }
});

// ===========================
// Custom Context Menu Logic
// ===========================

function showContextMenu(e) {
    if (!contextMenu) contextMenu = document.getElementById('custom-context-menu');
    if (!contextMenu) return;

    const x = e.clientX;
    const y = e.clientY;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = 'block';

    // Adjust if menu goes outside window
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    if (x + menuWidth > window.innerWidth) contextMenu.style.left = `${x - menuWidth}px`;
    if (y + menuHeight > window.innerHeight) contextMenu.style.top = `${y - menuHeight}px`;
}

document.addEventListener('click', () => {
    if (contextMenu) contextMenu.style.display = 'none';
});

if (contextMenu) {
    contextMenu.addEventListener('click', (e) => {
        const item = e.target.closest('.menu-item');
        if (!item) return;

        const action = item.dataset.action;
        const currentUrl = window.location.href;

        switch (action) {
            case 'copy-url':
                copyToClipboard(currentUrl);
                break;
            case 'copy-url-time':
                const time = Math.floor(getCurrentTime());
                const urlWithTime = currentUrl.includes('?') ? `${currentUrl}&t=${time}` : `${currentUrl}?t=${time}`;
                copyToClipboard(urlWithTime);
                break;
            case 'shortcuts':
            case 'player-info':
                openPanel('info');
                break;
            case 'report-issue':
                openPanel('report');
                break;
            case 'visit-dev':
                window.open('https://qick-tools.web.app/', '_blank');
                break;
            case 'loop-toggle':
                isLooping = !isLooping;
                if (window.activePlayerType === 'v') window.video.loop = isLooping;
                const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                const repeatIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>';
                item.innerHTML = isLooping ? `${checkIcon} Loop Enabled` : `${repeatIcon} Loop Video`;
                break;
        }
        contextMenu.style.display = 'none';
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy!", err);
    });
}
