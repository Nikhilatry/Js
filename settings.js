window.PanelData = window.PanelData || {};

window.PanelData.settings = `
    <div class="panel-section">
        <h3>Appearance</h3>
        <div class="setting-row">
            <span>Theme Mode</span>
            <button id="inner-theme-toggle" class="secondary-btn">Toggle Theme</button>
        </div>
        <div class="setting-row">
            <span>Ambient Mode</span>
            <label class="toggle-switch">
                <input id="ambient-mode-toggle" type="checkbox">
                <span class="toggle-slider"></span>
            </label>
        </div>
        <div class="setting-row">
            <span>UI Feedback</span>
            <label class="toggle-switch">
                <input id="ui-feedback-toggle" type="checkbox" checked>
                <span class="toggle-slider"></span>
            </label>
        </div>
    </div>

    <div class="panel-section">
        <h3>Playback</h3>
        <div class="setting-row">
            <span>Video Quality</span>
            <select id="quality-select" class="secondary-btn" style="border: none; outline: none; cursor: pointer; padding: 5px 10px; font-family: inherit;">
                <option value="2160">2160p (4K)</option>
                <option value="1440">1440p (2K)</option>
                <option value="1080">1080p HD</option>
                <option value="720">720p</option>
                <option value="480">480p</option>
                <option value="360">360p</option>
                <option value="240">240p</option>
                <option value="144">144p</option>
                <option value="auto" selected>Auto</option>
            </select>
        </div>
        <div class="setting-row">
            <span>Playback Speed</span>
            <select id="speed-select" class="secondary-btn" style="border: none; outline: none; cursor: pointer; padding: 5px 10px; font-family: inherit;">
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1" selected>Normal</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="1.75">1.75x</option>
                <option value="2">2x</option>
            </select>
        </div>
        <div class="setting-row">
            <span>Skip Interval</span>
            <select id="skip-interval-select" class="secondary-btn" style="border: none; outline: none; cursor: pointer; padding: 5px 10px; font-family: inherit;">
                <option value="5">5 seconds</option>
                <option value="10" selected>10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
            </select>
        </div>
        <div id="yt-cc-row" class="setting-row" style="display: none;">
            <span>YouTube Captions</span>
            <label class="toggle-switch">
                <input id="yt-cc-toggle" type="checkbox">
                <span class="toggle-slider"></span>
            </label>
        </div>
    </div>

    <div class="panel-section">
        <h3 style="color: #d73a49;">Danger Zone</h3>
        <div class="setting-row" style="border-bottom: none;">
            <span>Reset All Data</span>
            <button id="reset-player-btn" class="secondary-btn" style="color: #d73a49; border: 1px solid rgba(215, 58, 73, 0.2);">Reset</button>
        </div>
        <p style="font-size: 0.75rem; opacity: 0.5; margin-top: -5px;">Clears progress, volume, and quality. Theme is preserved.</p>
    </div>
`;
