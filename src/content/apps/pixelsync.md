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

<div class="not-prose w-full max-w-5xl mx-auto my-12 flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]">
  <div class="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl flex flex-col p-4 shadow-2xl relative min-h-[350px]">
    <div class="absolute top-3 left-4 flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      <span class="text-xs font-mono text-zinc-500 ml-2">PixelSync App</span>
    </div>
    <div class="flex-1 flex flex-col items-center justify-center mt-6">
      <canvas id="px-editor" width="160" height="160" class="bg-zinc-800 border border-zinc-600 cursor-crosshair touch-none shadow-inner" style="image-rendering: pixelated; width: 220px; height: 220px;"></canvas>
      <div class="flex gap-2 mt-6" id="px-palette"></div>
    </div>
  </div>
  <div class="flex-1 flex flex-col gap-4">
    <div class="flex-1 flex gap-4">
      <div class="flex-1 bg-[#1e1e1e] border border-zinc-700 rounded-xl flex flex-col overflow-hidden shadow-lg relative">
        <div class="h-6 bg-[#323233] flex items-center px-2 border-b border-[#1e1e1e]">
          <span class="text-[9px] font-mono text-zinc-400">Unity Engine</span>
          <div class="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 sync-pulse transition-all duration-150"></div>
        </div>
        <div class="flex-1 bg-[#252526] relative overflow-hidden flex items-center justify-center" style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 8px 8px;">
          <canvas id="px-unity" width="160" height="160" class="shadow-2xl" style="image-rendering: pixelated; width: 100px; height: 100px;"></canvas>
        </div>
      </div>
      <div class="flex-1 bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden shadow-lg relative">
        <div class="h-6 bg-zinc-100 flex items-center px-2 border-b border-zinc-200">
          <span class="text-[9px] font-medium text-zinc-500">Co-op User's iPad</span>
          <div class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 sync-pulse transition-all duration-150"></div>
        </div>
        <div class="flex-1 bg-zinc-50 relative flex items-center justify-center">
          <canvas id="px-collab" width="160" height="160" class="shadow-sm border border-zinc-200" style="image-rendering: pixelated; width: 100px; height: 100px;"></canvas>
          <div class="absolute animate-bounce" style="top:20px; right:20px;"><span class="text-xl">✍️</span></div>
        </div>
      </div>
    </div>
    <div class="h-[140px] bg-gradient-to-br from-blue-400 to-purple-500 border border-zinc-700 rounded-xl overflow-hidden shadow-lg p-3 relative flex items-center justify-center">
      <div class="absolute top-2 left-2 right-2 flex justify-between">
        <span class="text-[9px] text-white/80 font-medium">9:41</span>
        <span class="text-[9px] text-white/80 font-medium">🔋</span>
      </div>
      <div class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl w-[110px] h-[110px] flex flex-col items-center justify-center p-2 mt-2 shadow-xl relative">
        <div class="absolute top-1 left-2 flex items-center gap-1">
          <span class="text-[8px] font-bold text-white/90">Pixel Mail</span>
        </div>
        <canvas id="px-widget" width="160" height="160" class="mt-2 drop-shadow-md" style="image-rendering: pixelated; width: 70px; height: 70px;"></canvas>
      </div>
      <div class="ml-6 flex flex-col gap-3">
        <div class="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center"><span class="text-[10px] text-white/70">App</span></div>
        <div class="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center"><span class="text-[10px] text-white/70">App</span></div>
      </div>
    </div>
  </div>
</div>
<script is:inline>
  function initLiveSyncBanner() {
    const editorCanvas = document.getElementById('px-editor');
    if (!editorCanvas || editorCanvas.dataset.initialized) return;
    editorCanvas.dataset.initialized = 'true';
    const eCtx = editorCanvas.getContext('2d');
    const uCtx = document.getElementById('px-unity').getContext('2d');
    const cCtx = document.getElementById('px-collab').getContext('2d');
    const wCtx = document.getElementById('px-widget').getContext('2d');
    const palette = document.getElementById('px-palette');
    const indicators = document.querySelectorAll('.sync-pulse');
    const GRID = 16;
    const PIXEL_SIZE = editorCanvas.width / GRID;
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#ffffff', '#18181b', 'clear'];
    let currentColor = colors[0];
    let pixels = new Array(GRID * GRID).fill(null);
    let isDrawing = false;
    const defaultSprite = [
       {x: 7, y: 3, c: '#ffffff'}, {x: 8, y: 3, c: '#ffffff'},
       {x: 6, y: 4, c: '#ffffff'}, {x: 9, y: 4, c: '#ffffff'},
       {x: 6, y: 5, c: '#ffffff'}, {x: 7, y: 5, c: '#ef4444'}, {x: 8, y: 5, c: '#ef4444'}, {x: 9, y: 5, c: '#ffffff'},
       {x: 6, y: 6, c: '#ffffff'}, {x: 7, y: 6, c: '#ef4444'}, {x: 8, y: 6, c: '#ef4444'}, {x: 9, y: 6, c: '#ffffff'},
       {x: 6, y: 7, c: '#ffffff'}, {x: 7, y: 7, c: '#ef4444'}, {x: 8, y: 7, c: '#ef4444'}, {x: 9, y: 7, c: '#ffffff'},
       {x: 6, y: 8, c: '#ffffff'}, {x: 7, y: 8, c: '#ef4444'}, {x: 8, y: 8, c: '#ef4444'}, {x: 9, y: 8, c: '#ffffff'},
       {x: 7, y: 9, c: '#ffffff'}, {x: 8, y: 9, c: '#ffffff'},
    ];
    defaultSprite.forEach(p => pixels[p.y * GRID + p.x] = p.c);
    function renderEditor() {
      eCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
      for (let i = 0; i < pixels.length; i++) {
        const x = (i % GRID) * PIXEL_SIZE;
        const y = Math.floor(i / GRID) * PIXEL_SIZE;
        if (pixels[i]) {
          eCtx.fillStyle = pixels[i];
          eCtx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        } else {
          eCtx.strokeStyle = '#27272a';
          eCtx.lineWidth = 1;
          eCtx.strokeRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        }
      }
    }
    function renderTargets() {
      [uCtx, cCtx, wCtx].forEach(ctx => {
        ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
        for (let i = 0; i < pixels.length; i++) {
          if (pixels[i]) {
            const x = (i % GRID) * PIXEL_SIZE;
            const y = Math.floor(i / GRID) * PIXEL_SIZE;
            ctx.fillStyle = pixels[i];
            ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
          }
        }
      });
    }
    function flashIndicators() {
      indicators.forEach(indicator => {
        const originalBg = indicator.classList.contains('bg-green-500') ? 'bg-green-500' : 'bg-blue-500';
        indicator.classList.remove(originalBg);
        indicator.classList.add('bg-white', 'scale-150');
        setTimeout(() => {
          indicator.classList.remove('bg-white', 'scale-150');
          indicator.classList.add(originalBg);
        }, 150);
      });
    }
    function paint(e) {
      if (!isDrawing) return;
      const rect = editorCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = editorCanvas.width / rect.width;
      const scaleY = editorCanvas.height / rect.height;
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      const gridX = Math.floor(x / PIXEL_SIZE);
      const gridY = Math.floor(y / PIXEL_SIZE);
      if (gridX >= 0 && gridX < GRID && gridY >= 0 && gridY < GRID) {
        const index = gridY * GRID + gridX;
        const colorToSet = currentColor === 'clear' ? null : currentColor;
        if (pixels[index] !== colorToSet) {
          pixels[index] = colorToSet;
          renderEditor();
          renderTargets();
          flashIndicators();
        }
      }
    }
    colors.forEach(color => {
      const btn = document.createElement('button');
      btn.className = 'w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-md';
      if (color === 'clear') {
        btn.style.background = 'repeating-linear-gradient(45deg, #3f3f46, #3f3f46 4px, #27272a 4px, #27272a 8px)';
        btn.title = 'Eraser';
      } else {
        btn.style.backgroundColor = color;
      }
      btn.style.borderColor = color === currentColor ? 'white' : 'transparent';
      btn.addEventListener('click', () => {
        currentColor = color;
        Array.from(palette.children).forEach(c => c.style.borderColor = 'transparent');
        btn.style.borderColor = 'white';
      });
      palette.appendChild(btn);
    });
    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Reset';
    clearBtn.className = 'ml-2 text-xs text-zinc-400 hover:text-white font-mono bg-zinc-800 px-3 py-1 rounded border border-zinc-700 transition-colors hover:bg-zinc-700';
    clearBtn.addEventListener('click', () => {
       pixels = new Array(GRID * GRID).fill(null);
       renderEditor();
       renderTargets();
       flashIndicators();
    });
    palette.appendChild(clearBtn);
    editorCanvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      paint(e);
    });
    window.addEventListener('mouseup', () => isDrawing = false);
    editorCanvas.addEventListener('mousemove', paint);
    editorCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDrawing = true;
      paint(e);
    }, {passive: false});
    window.addEventListener('touchend', () => isDrawing = false);
    editorCanvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      paint(e);
    }, {passive: false});
    renderEditor();
    renderTargets();
  }
  document.addEventListener('astro:page-load', initLiveSyncBanner);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initLiveSyncBanner();
  } else {
    document.addEventListener('DOMContentLoaded', initLiveSyncBanner);
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
