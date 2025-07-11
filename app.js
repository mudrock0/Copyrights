document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const videoUrlInput = document.getElementById('videoUrl');
    const checkButton = document.getElementById('checkButton');
    const resultBox = document.getElementById('resultBox');

    // Add an event listener to the check button
    checkButton.addEventListener('click', async () => {
        const videoUrl = videoUrlInput.value.trim();

        // Basic validation for the URL
        if (!videoUrl) {
            resultBox.innerHTML = '<p class="text-red-600">Please enter a YouTube video URL.</p>';
            return;
        }

        // Simple regex to check if it looks like a YouTube URL
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!youtubeRegex.test(videoUrl)) {
            resultBox.innerHTML = '<p class="text-red-600">Please enter a valid YouTube video URL.</p>';
            return;
        }

        // Display a loading indicator
        resultBox.innerHTML = `
            <div class="loading-spinner"></div>
            <p class="text-gray-500 mt-2">Checking copyright status (simulated)...</p>
        `;
        checkButton.disabled = true; // Disable button during check

        // Simulate an asynchronous API call
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2-second delay

        // --- Simulated Copyright Check Logic ---
        // In a real application, you would make an API call to YouTube's Data API
        // to get video details (if you have the necessary permissions and API key)
        // and then apply your own logic to determine potential copyright issues.
        // This example uses a very simple, client-side simulation.

        let copyrightStatus = '';
        let statusColor = '';

        // Extract video ID (a very basic attempt, might not cover all URL formats)
        const videoIdMatch = videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (videoId) {
            // Simulate different outcomes based on the video ID or a random chance
            if (videoId.startsWith('dQw4w9WgXcQ')) { // Example: Rick Astley's "Never Gonna Give You Up"
                copyrightStatus = 'Likely copyrighted content detected (Music).';
                statusColor = 'text-red-600';
            } else if (videoId.startsWith('randomVideoId123')) { // Another example
                copyrightStatus = 'Potential copyright claim (Content ID match).';
                statusColor = 'text-orange-600';
            } else if (Math.random() < 0.3) { // 30% chance of "potential issue"
                copyrightStatus = 'Potential copyright issue detected. Review required.';
                statusColor = 'text-orange-600';
            } else {
                copyrightStatus = 'No obvious copyright issues detected by this simulated check.';
                statusColor = 'text-green-600';
            }
        } else {
            copyrightStatus = 'Could not extract video ID. Please ensure URL is correct.';
            statusColor = 'text-red-600';
        }

        // Display the simulated result
        resultBox.innerHTML = `<p class="${statusColor} font-semibold">${copyrightStatus}</p>`;
        checkButton.disabled = false; // Re-enable button
    });
});
