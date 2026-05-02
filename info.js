window.PanelData = window.PanelData || {};

window.PanelData.info = `
    <div class="side-panel-info-container" style="display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden;">
        
        <!-- Scrollable content area -->
        <div class="info-scrollable-content" style="flex: 1; overflow-y: auto; padding-right: 8px; margin-bottom: 10px;">
            <!-- Middle Section: Technical Stats (Live) -->
            <div class="panel-section">
                <h3 style="display: flex; align-items: center; gap: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-green);"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Live Technical Stats
                </h3>
                <div id="live-stats-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="background: var(--hover-bg); padding: 12px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; margin-bottom: 4px;">Resolution</div>
                        <div id="stat-resolution" style="font-weight: 600; font-size: 0.95rem;">--</div>
                    </div>
                    <div style="background: var(--hover-bg); padding: 12px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; margin-bottom: 4px;">Buffer Health</div>
                        <div id="stat-buffer" style="font-weight: 600; font-size: 0.95rem; color: var(--accent-green);">--</div>
                    </div>
                    <div style="background: var(--hover-bg); padding: 12px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; margin-bottom: 4px;">Player Type</div>
                        <div id="stat-player" style="font-weight: 600; font-size: 0.95rem; text-transform: capitalize;">--</div>
                    </div>
                    <div style="background: var(--hover-bg); padding: 12px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.7rem; text-transform: uppercase; opacity: 0.6; margin-bottom: 4px;">Host Source</div>
                        <div id="stat-host" style="font-weight: 600; font-size: 0.85rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">--</div>
                    </div>
                </div>
            </div>

            <!-- Keyboard Shortcuts -->
            <div class="panel-section">
                <h3 style="display: flex; align-items: center; gap: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-blue);"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" y1="8" x2="6" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="14" y1="8" x2="14" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="14" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg> Keyboard Shortcuts
                </h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Play / Pause</span> <kbd>Space</kbd> or <kbd>K</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Seek Forward 10s</span> <kbd>L</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Seek Backward 10s</span> <kbd>J</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Jump to %</span> <kbd>0-9</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Theater Mode</span> <kbd>T</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Info Panel</span> <kbd>I</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Report Panel</span> <kbd>R</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Playlist</span> <kbd>P</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Comments</span> <kbd>C</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Settings</span> <kbd>S</kbd>
                    </div>
                    <div class="shortcut-row" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--controls-border);">
                        <span>Chapters Panel</span> <kbd>H</kbd>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fixed Bottom Section: Developer Info & Legal -->
        <div class="info-fixed-footer" style="padding-top: 15px; border-top: 1px solid var(--controls-border); background: var(--panel-bg);">
            <div class="developer-footer" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="position: relative;">
                    <img src="/logo.png" alt="Developer Logo" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--primary-blue); padding: 2px; background: rgba(0, 112, 243, 0.1);">
                    <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #22c55e; border: 2px solid var(--panel-bg); border-radius: 50%;"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-main); letter-spacing: -0.5px;">Qick-Tools</div>
                    <div style="font-size: 0.8rem; opacity: 0.5; margin-bottom: 6px; font-family: monospace;">Engine v1.0.1 [Nikhil Raj]</div>
                    <div style="display: flex; gap: 12px;">
                        <a href="https://qick-tools.web.app" target="_blank" style="font-size: 0.75rem; color: var(--primary-blue); font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Website
                        </a>
                        <a href="mailto:atry.developer@gmail.com" style="font-size: 0.75rem; color: var(--primary-blue); font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg> Support
                        </a>
                    </div>
                </div>
            </div>

            <div class="legal-links" style="display: flex; gap: 10px; padding-bottom: 5px;">
                <details style="cursor: pointer; flex: 1; position: relative;">
                    <summary style="font-size: 0.75rem; font-weight: 600; list-style: none; color: var(--text-main); opacity: 0.6; display: flex; align-items: center; gap: 4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Privacy
                    </summary>
                    <div style="font-size: 0.7rem; color: var(--text-main); opacity: 0.5; padding: 8px; background: var(--hover-bg); border-radius: 6px; margin-top: 4px; border: 1px solid var(--controls-border);">
                        No personal data is collected beyond diagnostic player stats. Local storage is used for preferences.
                    </div>
                </details>
                <details style="cursor: pointer; flex: 1; position: relative;">
                    <summary style="font-size: 0.75rem; font-weight: 600; list-style: none; color: var(--text-main); opacity: 0.6; display: flex; align-items: center; gap: 4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> License
                    </summary>
                    <div style="font-size: 0.7rem; color: var(--text-main); opacity: 0.5; padding: 8px; background: var(--hover-bg); border-radius: 6px; margin-top: 4px; border: 1px solid var(--controls-border);">
                        Internal usage license only. Unauthorized reproduction or distribution is strictly prohibited.
                    </div>
                </details>
            </div>
        </div>
    </div>
    
    <style>
        .info-scrollable-content::-webkit-scrollbar {
            width: 5px;
        }
        .info-scrollable-content::-webkit-scrollbar-thumb {
            background: var(--controls-border);
            border-radius: 10px;
        }
        kbd {
            background-color: var(--hover-bg);
            border: 1px solid var(--controls-border);
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 0.85rem;
            font-family: 'Inter', monospace;
            box-shadow: 0 1px 0 rgba(0,0,0,0.2);
        }
    </style>
`;

// Logic for live technical stats polling
(function () {
    let pollingInterval = null;

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function updateLiveStats() {
        const resEl = document.getElementById('stat-resolution');
        const bufferEl = document.getElementById('stat-buffer');
        const playerEl = document.getElementById('stat-player');
        const hostEl = document.getElementById('stat-host');

        if (!resEl) return; // Panel not in view

        // 1. Get Player Type
        const pType = window.activePlayerType || 'none';
        playerEl.innerText = pType === 'v' ? 'HTML5 Video' : pType === 'yt' ? 'YouTube' : '--';

        // 2. Get Video Host
        try {
            const url = new URL(window.activeVideoId);
            hostEl.innerText = url.hostname;
        } catch (e) {
            hostEl.innerText = pType === 'yt' ? 'youtube.com' : 'local/blob';
        }

        // 3. Get Resolution & Buffer
        if (pType === 'v' && window.video) {
            const v = window.video;
            resEl.innerText = v.videoWidth ? `${v.videoWidth}x${v.videoHeight}` : 'Loading...';

            // Buffer Health
            if (v.buffered && v.buffered.length > 0) {
                const current = v.currentTime;
                let bufferedEnd = 0;
                for (let i = 0; i < v.buffered.length; i++) {
                    if (v.buffered.start(i) <= current && v.buffered.end(i) >= current) {
                        bufferedEnd = v.buffered.end(i);
                        break;
                    }
                }
                const lookahead = Math.max(0, bufferedEnd - current);
                bufferEl.innerText = `+${lookahead.toFixed(1)}s`;
                bufferEl.style.color = lookahead > 10 ? 'var(--accent-green)' : '#ffaa00';
            }
        } else if (pType === 'yt' && window.ytPlayer && window.ytPlayer.getPlaybackQuality) {
            const yt = window.ytPlayer;
            resEl.innerText = yt.getPlaybackQuality().toUpperCase();

            const loaded = yt.getVideoLoadedFraction() || 0;
            const duration = yt.getDuration() || 0;
            const current = yt.getCurrentTime() || 0;
            const bufferedTime = loaded * duration;
            const lookahead = Math.max(0, bufferedTime - current);

            bufferEl.innerText = `+${lookahead.toFixed(1)}s`;
            bufferEl.style.color = lookahead > 10 ? 'var(--accent-green)' : '#ffaa00';
        }
    }

    // Start polling automatically (more aggressive than click)
    function startPolling() {
        if (document.getElementById('live-stats-grid') && !pollingInterval) {
            updateLiveStats(); // Immediate update
            pollingInterval = setInterval(updateLiveStats, 1000);
        }
    }

    // Attempt start on any interaction
    document.addEventListener('click', () => setTimeout(startPolling, 100));
    document.addEventListener('mouseover', startPolling, { once: true }); // Catch early

    // Also try starting immediately
    setTimeout(startPolling, 500);

    // Cleanup interval if panel is closed
    setInterval(() => {
        if (!document.getElementById('live-stats-grid') && pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    }, 2000);
})();
