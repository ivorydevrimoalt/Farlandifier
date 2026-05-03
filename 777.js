(function() {
    // 1. Create and inject CSS to darken and desaturate the page
    // We target the html element but exclude images and videos using the :not selector
    const style = document.createElement('style');
    style.innerHTML = `
        html {
            background-color: black !important;
        }
        body {
            filter: brightness(0.4) saturate(0) !important;
            transition: filter 2s ease-in-out;
        }
        /* Exclude images and videos from the darkening/desaturation */
        img, video {
            filter: brightness(2.5) saturate(1) !important; 
        }
    `;
    document.head.appendChild(style);

    // 2. Define the replacement assets
    const replacementImage = "https://raw.githubusercontent.com/ivorydevrimoalt/Farlandifier/refs/heads/main/2026_04_29_019_Kleki%20(1).png";
    const chimeAudio = "https://github.com/ivorydevrimoalt/Farlandifier/raw/refs/heads/main/Project_05-04_Full%20HD%201080p_MEDIUM_FR30.mp3";

    // 3. Replace all existing images and videos
    document.querySelectorAll('img').forEach(img => {
        img.src = replacementImage;
        img.srcset = ""; // Clear srcset to prevent high-res overrides
    });

    document.querySelectorAll('video').forEach(vid => {
        vid.src = replacementImage; // Note: Browsers may not render PNG in <video> src
        vid.poster = replacementImage;
        vid.querySelectorAll('source').forEach(s => s.remove());
    });

    // 4. Play the chime audio
    const audio = new Audio(chimeAudio);
    audio.play().catch(e => {
        console.log("Autoplay blocked. Click the page to hear the chime.");
        // Fallback: play on first user interaction if browser blocks autoplay
        document.addEventListener('click', () => audio.play(), { once: true });
    });
})();
