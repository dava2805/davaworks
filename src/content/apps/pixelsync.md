---
title: "PixelSync"
description: "Pro pixel art creation & animation. Sync directly to Unity via Wi-Fi."
coverImage: "../../assets/projects/pixelsync_app_icon_transparent.png"
span: 1
featured: true
category: "Apps"
appStoreLink: "#"
playStoreLink: "#"
---

# PixelSync

**Pro pixel art creation & animation.**

![PixelSync Banner](../../assets/projects/pixelsync/banner.png)

Sync directly to Unity via Wi-Fi, extract real-world palettes, or draw with friends! 100% free, zero ads.

A pro-level pixel art suite in your pocket. PixelSync is a powerful, completely free editor built for indie game developers, digital artists, and retro enthusiasts. Whether you are creating static character sprites, crafting complex animations, or teaming up with a friend to draw in real-time, you get desktop-class workflow tools on the go.

<div class="not-prose my-16 relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" id="pxs-slider-container">
  
  <div class="absolute inset-0 flex items-center justify-center" id="pxs-slides">
    <!-- Slides will be injected here via JS -->
  </div>

  <!-- Navigation Arrows -->
  <button id="pxs-prev" class="absolute left-2 md:left-8 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 hover:scale-110 transition-all">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  
  <button id="pxs-next" class="absolute right-2 md:right-8 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/70 hover:scale-110 transition-all">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
  </button>
  
  <!-- Indicators -->
  <div class="absolute bottom-4 z-30 flex gap-2" id="pxs-indicators"></div>
</div>

<script>
  function initPixelSyncSlider() {
    const images = [
      'Bild1.png', 'Bild2.png', 'Bild3.png', 'Bild4.png', 'Bild5.png', 
      'Bild6.png', 'Bild7.png', 'Bild8.png', 'Bild20_engine.PNG', 'Bild21_widget.PNG'
    ];
    
    const container = document.getElementById('pxs-slides');
    const indicatorsContainer = document.getElementById('pxs-indicators');
    if (!container || container.dataset.initialized) return;
    container.dataset.initialized = 'true';

    let currentIndex = 0;
    
    // Create elements
    images.forEach((img, index) => {
      const el = document.createElement('img');
      el.src = `/projects/pixelsync/slide_images/${img}`;
      el.className = 'absolute w-[200px] h-[350px] md:w-[260px] md:h-[450px] object-contain rounded-2xl border-2 border-zinc-800 shadow-2xl cursor-pointer';
      el.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s';
      el.dataset.index = index;
      el.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetInterval();
      });
      container.appendChild(el);
      
      const dot = document.createElement('button');
      dot.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-zinc-600';
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetInterval();
      });
      indicatorsContainer.appendChild(dot);
    });

    const slides = Array.from(container.children);
    const dots = Array.from(indicatorsContainer.children);

    function updateSlider() {
      slides.forEach((slide, index) => {
        let offset = index - currentIndex;
        if (offset > images.length / 2) offset -= images.length;
        if (offset < -images.length / 2) offset += images.length;
        
        let zIndex = 20 - Math.abs(offset);
        let opacity = Math.abs(offset) > 2 ? 0 : 1;
        
        let translateX = offset * (window.innerWidth < 768 ? 70 : 130);
        let scale = 1 - Math.abs(offset) * 0.15;
        let rotateY = offset * -20;
        
        slide.style.transform = `translateX(${translateX}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`;
        slide.style.zIndex = zIndex;
        slide.style.opacity = opacity;
        
        if (offset === 0) {
          slide.classList.add('brightness-100');
          slide.classList.remove('brightness-50');
        } else {
          slide.classList.remove('brightness-100');
          slide.classList.add('brightness-50');
        }
      });
      
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.remove('bg-zinc-600', 'w-2');
          dot.classList.add('bg-white', 'w-8');
        } else {
          dot.classList.add('bg-zinc-600', 'w-2');
          dot.classList.remove('bg-white', 'w-8');
        }
      });
    }

    document.getElementById('pxs-prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
      resetInterval();
    });
    
    document.getElementById('pxs-next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
      resetInterval();
    });

    let interval;
    function startInterval() {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
      }, 2500);
    }
    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }
    
    updateSlider();
    startInterval();
    
    // Handle resize to fix spacing
    window.addEventListener('resize', updateSlider);
  }
  
  document.addEventListener('astro:page-load', initPixelSyncSlider);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPixelSyncSlider();
  } else {
    document.addEventListener('DOMContentLoaded', initPixelSyncSlider);
  }
</script>

## Developer-Focused Features
- **Live Unity Sync:** Stop emailing yourself files. Connect over local Wi-Fi and watch every pixel and frame update instantly inside your Unity project.
- **Real-Time Collaboration:** Use a 6-digit room code to host a session and draw with friends live, complete with online presence badges. Also available over local network.
- **Pixel Mail (Home Screen Widget):** Surprise your friends with art! Connect with other artists and "drop" custom pixel creations straight to their device's home screen widget. It's a fun, seamless way to share inspiration without them ever needing to open the app.
- **Real-World Color Picker:** Open your device's camera inside the app and instantly extract custom pixel art palettes from your physical surroundings.
- **Desktop-Class Tools:** Isolate your art with infinite layers, frame-by-frame animation, pixel-perfect pencils, dithering brushes, and color replacement.
- **Game-Ready Exports:** Instantly export as PNGs, smart-scaled GIFs, sequential Spritesheets, or fully packaged Game Atlases (ZIP) ready for Unity and Godot.

## 100% Free & Community Powered
We believe creative tools shouldn't be hidden behind paywalls or annoying pop-up ads. PixelSync has zero subscriptions and zero ads. We rely entirely on optional, one-time "Tip Jar" donations to fund new features, keep the app ad-free, and pay for our multiplayer servers.

---
[Privacy Policy](/legal/pixelsync-privacy) • [Terms of Service](/legal/pixelsync-tos)
