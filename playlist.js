(function() {
    window.PanelData = window.PanelData || {};
    
    // Initial loading state
    window.PanelData.playlist = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:300px; opacity:0.6;">
            <div class="dot-loader" style="position:static; transform:none;">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <p style="margin-top:15px; font-size:0.9rem;">Loading Chapters...</p>
        </div>
    `;

    const errorHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:350px; text-align:center; padding:20px;">
            <svg width="64" height="64" viewBox="0 0 256 256" style="margin-bottom:20px; opacity:0.5;">
                <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16" />
                <line x1="60.1" y1="195.9" x2="195.9" y2="60.1" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" />
            </svg>
            <h3 style="font-size:1.1rem; margin-bottom:10px;">Playlist Not Available</h3>
            <p style="font-size:0.85rem; opacity:0.7;">No playlist or sheet ID was found for this video. Please check your URL parameters.</p>
        </div>
    `;

    const AUTO_PLAY_NEXT_KEY = 'player-auto-play-next';

    // Always read URL params fresh (loadVideo uses pushState).
    const getParam = (key) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(key) || params.get(key.toLowerCase()) || params.get(key.toUpperCase());
    };
    const sheetId = getParam('p-id');

    if (!sheetId) {
        window.PanelData.playlist = errorHTML;
        return;
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    // Central playlist controller used by both playlist panel UI and player "ended" handlers.
    window.playlistController = window.playlistController || {
        items: [],
        indexById: new Map(),
        activeId: null,
        isAutoPlayNextEnabled() {
            return localStorage.getItem(AUTO_PLAY_NEXT_KEY) === '1';
        },
        setAutoPlayNextEnabled(enabled) {
            localStorage.setItem(AUTO_PLAY_NEXT_KEY, enabled ? '1' : '0');
        },
        setActiveVideoId(id) {
            this.activeId = id != null ? String(id) : null;
        },
        getCurrentVideoId() {
            return this.activeId || getParam('Id') || getParam('id') || null;
        },
        getCurrentIndex() {
            const currentId = this.getCurrentVideoId();
            if (!currentId) return -1;
            return this.indexById.has(String(currentId)) ? this.indexById.get(String(currentId)) : -1;
        },
        getNextItem() {
            if (!this.items || this.items.length === 0) return null;
            const idx = this.getCurrentIndex();
            if (idx < 0) return null;
            return this.items[idx + 1] || null;
        },
        tryAutoPlayNext() {
            if (!this.isAutoPlayNextEnabled()) return false;
            const next = this.getNextItem();
            if (!next) return false;

            this.setActiveVideoId(next.id);
            if (typeof window.syncPlaylistActiveUI === 'function') window.syncPlaylistActiveUI();
            if (typeof window.loadVideo === 'function') window.loadVideo(next.vt, next.id, true);
            return true;
        }
    };

    async function loadPlaylist() {
        try {
            const response = await fetch(csvUrl);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.text();
            
            const rows = parseCSV(data);
            if (rows.length <= 1) throw new Error("Sheet is empty or invalid");

            // Skip header row
            const items = rows.slice(1).map(row => {
                return {
                    s_no: row[0],
                    name: row[1],
                    vt: row[2],
                    id: row[3],
                    teacher: row[4]
                };
            }).filter(item => item.id && item.name); // basic validation

            // Persist playlist structure for autoplay logic.
            window.playlistController.items = items;
            window.playlistController.indexById = new Map(items.map((item, idx) => [String(item.id), idx]));

            const currentId = getParam('Id') || getParam('id');
            window.playlistController.setActiveVideoId(currentId);

            const autoPlayChecked = window.playlistController.isAutoPlayNextEnabled();

            let html = `
                <div class="playlist-container">
                    <div class="playlist-header-card">
                        <div class="header-info">
                            <span class="header-label">Chapters</span>
                            <span class="chapter-count">${items.length} videos</span>
                        </div>
                        <div class="autoplay-control">
                            <span class="autoplay-label">Autoplay</span>
                            <label class="toggle-switch small">
                                <input id="auto-play-next-toggle" type="checkbox" ${autoPlayChecked ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="playlist-items-list">`;

            items.forEach(item => {
                const isActive = item.id === currentId;
                html += `
                    <div class="playlist-item-card ${isActive ? 'active' : ''}" data-video-id="${item.id}" data-vt="${item.vt}" data-sno="${item.s_no}"
                         onclick="window.loadVideo('${item.vt}', '${item.id}'); updatePlaylistUI(this);">
                        <div class="card-indicator-area" data-sno="${item.s_no}">
                            ${isActive ? '<div class="playing-bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>' : `<span class="index-num">${item.s_no}</span>`}
                        </div>
                        <div class="card-content">
                            <span class="card-title">${item.name}</span>
                            <span class="card-teacher">${item.teacher}</span>
                        </div>
                        <div class="card-action-indicator">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                    </div>
                `;
            });

            html += `</div></div>`;
            window.PanelData.playlist = html;

            // Trigger Top Bar Metadata Update for current video
            if (currentId && window.playlistController.indexById.has(String(currentId))) {
                const activeItem = items[window.playlistController.indexById.get(String(currentId))];
                if (typeof window.updateTopBarMetadata === 'function') {
                    window.updateTopBarMetadata(activeItem.name, activeItem.teacher);
                }
            }

            // Update panel content directly if it is currently open
            const panelContent = document.getElementById('panel-content');
            const panelTitle = document.getElementById('panel-title');
            if (panelContent && panelTitle && panelTitle.innerText.toLowerCase() === 'playlist') {
                panelContent.innerHTML = html;
                if (typeof window.syncPlaylistActiveUI === 'function') window.syncPlaylistActiveUI();
            }

        } catch (err) {
            console.error("Playlist Loading Error:", err);
            window.PanelData.playlist = errorHTML;
        }
    }

    // Basic CSV parser that handles quotes
    function parseCSV(str) {
        const arr = [];
        let quote = false;
        let col = 0;
        let row = 0;

        for (let c = 0; c < str.length; c++) {
            let char = str[c], nextChar = str[c + 1];
            arr[row] = arr[row] || [];
            arr[row][col] = arr[row][col] || '';

            if (char === '"' && quote && nextChar === '"') {
                arr[row][col] += char; c++; continue;
            }
            if (char === '"') {
                quote = !quote; continue;
            }
            if (char === ',' && !quote) {
                col++; continue;
            }
            if (char === '\n' && !quote) {
                row++; col = 0; continue;
            }
            if (char === '\r' && !quote) {
                continue;
            }
            arr[row][col] += char;
        }
        return arr;
    }

    window.syncPlaylistActiveUI = function() {
        const pc = window.playlistController;
        const activeId = pc ? pc.getCurrentVideoId() : null;
        if (!activeId) return;

        document.querySelectorAll('.playlist-item-card').forEach(item => {
            const isActive = String(item.getAttribute('data-video-id')) === String(activeId);
            item.classList.toggle('active', isActive);

            const indicator = item.querySelector('.card-indicator-area');
            if (indicator) {
                const sno = item.getAttribute('data-sno') || '';
                indicator.innerHTML = isActive
                    ? '<div class="playing-bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>'
                    : `<span class="index-num">${sno}</span>`;
            }
        });
    };

    window.scrollToActiveChapter = function() {
        setTimeout(() => {
            const activeItem = document.querySelector('.playlist-item-card.active');
            if (activeItem) {
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    window.updatePlaylistUI = function(clickedEl) {
        if (!clickedEl) return;
        const activeId = clickedEl.getAttribute('data-video-id');
        if (window.playlistController) window.playlistController.setActiveVideoId(activeId);
        window.syncPlaylistActiveUI();
        window.scrollToActiveChapter();
    };

    // Keep toggle state updated even when the panel content is re-rendered.
    document.addEventListener('change', (e) => {
        const target = e.target;
        if (!target || target.id !== 'auto-play-next-toggle') return;
        if (!window.playlistController) return;
        window.playlistController.setAutoPlayNextEnabled(!!target.checked);
    });

    loadPlaylist();

})();
