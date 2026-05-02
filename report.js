window.PanelData = window.PanelData || {};

window.PanelData.report = `
    <div class="panel-section">
        <h3 style="display: flex; align-items: center; gap: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Report an Issue
        </h3>
        <p style="margin-bottom: 20px; font-size: 0.9rem; opacity: 0.8;">
            Encountered a problem? Help us improve your experience by providing some details.
        </p>
        
        <div class="report-options" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            <label class="report-option" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--hover-bg); border-radius: 8px; cursor: pointer; transition: transform 0.2s;">
                <span>Video won't play / buffering</span>
                <input type="radio" name="report-reason" value="Playback Issue" checked>
            </label>
            <label class="report-option" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--hover-bg); border-radius: 8px; cursor: pointer;">
                <span>Audio out of sync / missing</span>
                <input type="radio" name="report-reason" value="Audio Issue">
            </label>
            <label class="report-option" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--hover-bg); border-radius: 8px; cursor: pointer;">
                <span>Incorrect content / link</span>
                <input type="radio" name="report-reason" value="Content Issue">
            </label>
            <label class="report-option" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--hover-bg); border-radius: 8px; cursor: pointer;">
                <span>Other / Feedback</span>
                <input type="radio" name="report-reason" value="Other">
            </label>
        </div>

        <textarea id="report-message" placeholder="Optional: Please describe what happened..." rows="4" style="width: 100%; background: var(--bg-main); color: var(--text-main); border: 1px solid var(--controls-border); border-radius: 8px; padding: 12px; font-family: inherit; outline: none; margin-bottom: 20px; resize: none; font-size: 0.95rem;"></textarea>

        <div id="diagnostic-notice" style="background: rgba(47, 129, 247, 0.1); border: 1px solid var(--primary-blue); border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 0.75rem; line-height: 1.4;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 5px; font-weight: 600; color: var(--primary-blue);">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> Diagnostic Information
            </div>
            We attach your browser, screen resolution, and current video timestamp to help our engineers fix the bug faster.
        </div>

        <button id="submit-report-form" class="primary-btn" style="width: 100%; padding: 12px; font-weight: 600; font-size: 1rem; cursor: pointer;">
            Submit Report
        </button>
        
        <div id="submission-status" style="display: none; margin-top: 15px; text-align: center; font-size: 0.85rem; padding: 10px; border-radius: 6px;"></div>
    </div>
`;

// Logic for report submission
(function() {
    // -------------------------------------------------------------------------
    // SETTINGS: Update these placeholders with your actual Google Form info
    // -------------------------------------------------------------------------
    const G_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSet-4pFsyTyKDJ8ribITqSt0cXLTTx4ZNCOZM9zUmk4RxkfiA/formResponse";
    const ENTRY_ID_CATEGORY = "entry.1291458243"; // Replace with actual entry ID
    const ENTRY_ID_MESSAGE = "entry.1911762156";  // Replace with actual entry ID
    const ENTRY_ID_METADATA = "entry.1865061907"; // Replace with actual entry ID

    function getDiagnosticInfo() {
        const info = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screen: `${window.screen.width}x${window.screen.height}`,
            playerType: window.activePlayerType || 'unknown',
            videoId: window.activeVideoId || 'none',
            currentTime: window.getCurrentTime ? window.getCurrentTime().toFixed(2) + "s" : "N/A",
            speed: window.getPlaybackSpeed ? window.getPlaybackSpeed() + "x" : "1x",
            url: window.location.href
        };
        return JSON.stringify(info, null, 2);
    }

    // Use event delegation so the logic survives panel re-injection
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'submit-report-form') {
            handleSubmission(e.target);
        }
    });

    async function handleSubmission(btn) {
        const category = document.querySelector('input[name="report-reason"]:checked')?.value || "Other";
        const message = document.getElementById('report-message')?.value || "";
        const metadata = getDiagnosticInfo();
        const statusEl = document.getElementById('submission-status');

        btn.disabled = true;
        btn.innerText = "Sending...";
        
        const formData = new FormData();
        formData.append(ENTRY_ID_CATEGORY, category);
        formData.append(ENTRY_ID_MESSAGE, message);
        formData.append(ENTRY_ID_METADATA, metadata);

        try {
            // Note: Google Forms formResponse uses no-cors to prevent actual JSON access, 
            // but we can still send the data successfully.
            await fetch(G_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });

            // Since we use no-cors, we won't get a proper JSON response, 
            // so we assume success if no error is thrown by fetch.
            btn.style.display = 'none';
            statusEl.innerText = "Report submitted successfully! Thank you.";
            statusEl.style.display = 'block';
            statusEl.style.backgroundColor = 'rgba(46, 160, 67, 0.2)';
            statusEl.style.color = '#2ea043';
            
            setTimeout(() => {
                if (window.closePanel) window.closePanel();
            }, 2500);

        } catch (err) {
            console.error("Report submission failed:", err);
            btn.disabled = false;
            btn.innerText = "Error - Try Again";
            statusEl.innerText = "Failed to send report. Please try again.";
            statusEl.style.display = 'block';
            statusEl.style.backgroundColor = 'rgba(215, 58, 73, 0.2)';
            statusEl.style.color = '#d73a49';
        }
    }
})();
