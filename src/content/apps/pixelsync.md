---
title: "PixelSync"
description: "Pro pixel art creation & animation. Sync directly to Unity & Godot via Wi-Fi."
coverImage: "../../assets/projects/pixelsync_app_icon_transparent.png"
span: 1
featured: true
category: "Apps"
appStoreLink: "#"
playStoreLink: "#"
---

# PixelSync

**A professional-grade pixel art and animation suite in your pocket. Zero ads. Zero costs. No accounts required.**

<div class="w-full max-w-3xl mx-auto my-8 relative rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10" style="height: 300px;">
  <canvas id="interactive-banner" class="absolute inset-0 w-full h-full cursor-crosshair touch-none"></canvas>
  <div id="banner-ui" class="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
    <div class="text-white/70 font-mono text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Draw a bridge to save him!</div>
    <button id="banner-reset" class="pointer-events-auto text-white/70 hover:text-white bg-black/50 hover:bg-black/80 px-3 py-1 rounded-full backdrop-blur-md transition-all font-mono text-sm border border-white/10">Reset</button>
  </div>
</div>

<script is:inline>
  function initInteractiveBanner() {
    const canvas = document.getElementById('interactive-banner');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';
    
    const ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    const state = {
      player: { x: -50, y: 150, width: 20, height: 20, velocityY: 0, velocityX: 2.5, isJumping: false },
      gravity: 0.5,
      groundY: 200,
      gap: { x: canvas.width / 2 - 60, width: 120 },
      drawnPixels: [],
      isDrawing: false,
      lastDrawPos: null,
      gameOver: false,
      success: false
    };

    function updateGap() {
        state.gap.x = canvas.width / 2 - 60;
    }
    window.addEventListener('resize', updateGap);
    updateGap();
    
    function getMousePos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }
    
    function startDrawing(e) {
      e.preventDefault();
      state.isDrawing = true;
      state.lastDrawPos = getMousePos(e);
      addPixel(state.lastDrawPos);
    }
    
    function draw(e) {
      if (!state.isDrawing) return;
      e.preventDefault();
      const pos = getMousePos(e);
      
      if (state.lastDrawPos) {
        const dx = pos.x - state.lastDrawPos.x;
        const dy = pos.y - state.lastDrawPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(Math.floor(distance / 5), 1);
        
        for (let i = 0; i <= steps; i++) {
          const x = state.lastDrawPos.x + (dx * i) / steps;
          const y = state.lastDrawPos.y + (dy * i) / steps;
          addPixel({x, y});
        }
      }
      
      state.lastDrawPos = pos;
    }
    
    function stopDrawing() {
      state.isDrawing = false;
      state.lastDrawPos = null;
    }
    
    function addPixel(pos) {
      const gridSize = 10;
      const gridX = Math.floor(pos.x / gridSize) * gridSize;
      const gridY = Math.floor(pos.y / gridSize) * gridSize;
      
      const exists = state.drawnPixels.some(p => p.x === gridX && p.y === gridY);
      if (!exists) {
        state.drawnPixels.push({x: gridX, y: gridY, size: gridSize});
      }
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, {passive: false});
    canvas.addEventListener('touchmove', draw, {passive: false});
    window.addEventListener('touchend', stopDrawing);
    
    document.getElementById('banner-reset').addEventListener('click', () => {
      state.player = { x: -50, y: 150, width: 20, height: 20, velocityY: 0, velocityX: 2.5, isJumping: false };
      state.drawnPixels = [];
      state.gameOver = false;
      state.success = false;
    });
    
    function update() {
      if (state.gameOver || state.success) {
        if (state.player.y > canvas.height + 50) {
            if (!state.resetTimer) {
                state.resetTimer = setTimeout(() => {
                    document.getElementById('banner-reset').click();
                    state.resetTimer = null;
                }, 1000);
            }
        }
      } else {
        state.player.velocityY += state.gravity;
        state.player.y += state.player.velocityY;
        state.player.x += state.player.velocityX;
        
        const onGround = state.player.y + state.player.height >= state.groundY;
        const inGap = state.player.x + state.player.width > state.gap.x && state.player.x < state.gap.x + state.gap.width;
        
        if (onGround && !inGap) {
          state.player.y = state.groundY - state.player.height;
          state.player.velocityY = 0;
        }
        
        for (const pixel of state.drawnPixels) {
          if (
            state.player.x < pixel.x + pixel.size &&
            state.player.x + state.player.width > pixel.x &&
            state.player.y + state.player.height >= pixel.y &&
            state.player.y < pixel.y + pixel.size &&
            state.player.velocityY >= 0
          ) {
            state.player.y = pixel.y - state.player.height;
            state.player.velocityY = 0;
            break;
          }
        }
        
        if (state.player.y > canvas.height) {
          state.gameOver = true;
        }
        
        if (state.player.x > canvas.width) {
          state.success = true;
          if (!state.resetTimer) {
              state.resetTimer = setTimeout(() => {
                  document.getElementById('banner-reset').click();
                  state.resetTimer = null;
              }, 2000);
          }
        }
      }
    }
    
    function render() {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(0, state.groundY, state.gap.x, canvas.height - state.groundY);
      ctx.fillRect(state.gap.x + state.gap.width, state.groundY, canvas.width - (state.gap.x + state.gap.width), canvas.height - state.groundY);
      
      ctx.fillStyle = '#10b981';
      for (const pixel of state.drawnPixels) {
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        ctx.fillStyle = '#047857';
        ctx.fillRect(pixel.x, pixel.y + pixel.size - 2, pixel.size, 2);
        ctx.fillStyle = '#10b981';
      }
      
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
      
      ctx.fillStyle = 'white';
      ctx.fillRect(state.player.x + 12, state.player.y + 4, 4, 4);
      ctx.fillStyle = 'black';
      ctx.fillRect(state.player.x + 14, state.player.y + 4, 2, 2);
      
      if (state.gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Oops! Try again.', canvas.width/2, canvas.height/2 - 20);
      } else if (state.success) {
        ctx.fillStyle = 'white';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Great job!', canvas.width/2, canvas.height/2 - 20);
      }
    }
    
    function loop() {
      update();
      render();
      requestAnimationFrame(loop);
    }
    
    loop();
  }
  
  document.addEventListener('astro:page-load', initInteractiveBanner);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initInteractiveBanner();
  } else {
    document.addEventListener('DOMContentLoaded', initInteractiveBanner);
  }
</script>

PixelSync is a powerhouse pixel art editor purpose-built for indie game developers, digital artists, and retro enthusiasts. Whether you are drafting static character sprites, crafting complex frame-by-frame animations, or teaming up with a friend to draw in real-time, PixelSync delivers desktop-class workflow tools optimized for mobile.

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

<script is:inline>
  function initPixelSyncSlider() {
    const images = [
      'Bild1.png', 'Bild2.png', 'Bild3.png', 'Bild5.png', 
      'Bild6.png', 'Bild7.png', 'Bild8.png', 'Bild20_engine.PNG', 'Bild21_widget.PNG'
    ];
    
    const container = document.getElementById('pxs-slides');
    const indicatorsContainer = document.getElementById('pxs-indicators');
    if (!container || container.dataset.initialized) return;
    container.dataset.initialized = 'true';

    let currentIndex = 0;
    
    images.forEach((img, index) => {
      const el = document.createElement('img');
      el.src = `/projects/pixelsync/slide_images/${img}`;
      el.className = 'absolute w-[200px] h-[350px] md:w-[260px] md:h-[450px] object-contain rounded-2xl shadow-2xl cursor-pointer';
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
    
    window.addEventListener('resize', updateSlider);
  }
  
  document.addEventListener('astro:page-load', initPixelSyncSlider);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPixelSyncSlider();
  } else {
    document.addEventListener('DOMContentLoaded', initPixelSyncSlider);
  }
</script>

## LIVE ENGINE INTEGRATION (UNITY & GODOT)
Stop emailing yourself files and breaking your workflow. Connect PixelSync directly to your Unity or Godot project over your local Wi-Fi network. Every pixel you draw and frame you animate updates instantly inside your game engine. No cables, no manual exporting, no hassle—just pure, uninterrupted iteration.

## PRIVATE REAL-TIME COLLABORATION
Host a secure, cloud-synced session via a private 6-digit room code to design with teammates, or launch a local network session to collaborate instantly on the same Wi-Fi. Whether you are across the globe or across the couch, watch the canvas update in real-time with live presence badges. All collaboration is strictly private, functioning solely as a local utility tool without public feeds or broadcasting.

## PIXEL MAIL (HOME SCREEN WIDGET)
Surprise your friends and teammates with art! Connect with other artists and secretly "drop" custom pixel creations straight to their iOS or Android home screen widget. It's a fun, seamless way to share inspiration and keep your team motivated without anyone ever needing to open the app.

## VIDEO REFERENCE IMPORT
Import your reference video from your camera roll and apply standard pixelation filters for rotoscoping and animation study. Create frame-by-frame pixel art animations manually using your imported references to experiment with complex motion and visual styles.

## DESKTOP-CLASS WORKFLOW & TOOLS
• **Customizable Workspace:** Fully reorder your toolbar globally to fit your personal workflow, and save per-project grid settings and frame rates.
• **Advanced Layering:** Isolate line art and shading with infinite layers, adjustable opacity, and true Source-Over alpha blending for perfect transparency.
• **Precision Toolset:** Pixel-perfect pencils, magic wand selection, shape tools, dithering brushes, and global color replacement.
• **Real-World Palettes:** Stuck finding the perfect colors? Open your device's camera inside the app and extract custom pixel art palettes directly from your surroundings.

## FULL ANIMATION SUITE
Bring your sprites to life with an intuitive timeline. Manage frames, adjust project-specific FPS, and utilize onion-skinning to craft fluid, professional animations on the go.

## ENGINE-READY EXPORTS
Export your art exactly how you need it. Generate crisp, nearest-neighbor upscaled PNGs and GIFs for social media, or export mathematically perfect Spritesheets and Game Atlases (ZIP) natively formatted for engines like Unity and Godot. You can even export natively to .ase / .aseprite formats to seamlessly continue your work in Aseprite.

## COMMUNITY-POWERED & PRIVACY FIRST
Creative tools shouldn't be hidden behind paywalls, intrusive tracking, or pop-up ads. PixelSync is entirely free to use and respects your privacy. We rely entirely on optional "Tip Jar" support from artists who love the app. As a special thank-you, dropping a tip in the jar unlocks an exclusive, animated Pixel Pet companion that lives right on your home screen! Every tip goes directly to funding new features, server costs for multiplayer, and keeping the app ad-free forever.

Download PixelSync today and start building your next pixel masterpiece.

---
[Privacy Policy](/legal/pixelsync-privacy) • [Terms of Service](/legal/pixelsync-tos)
