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

<div class="not-prose w-full max-w-4xl mx-auto my-12 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-[#09090b]">
  <canvas id="px-gol" class="absolute inset-0 w-full h-full cursor-crosshair touch-none" style="image-rendering: pixelated;"></canvas>
</div>
<script is:inline>
  function initGOLBanner() {
    const canvases = document.querySelectorAll('#px-gol');
    canvases.forEach(canvas => {
      if (!canvas || canvas.dataset.initialized) return;
      canvas.dataset.initialized = 'true';
      const ctx = canvas.getContext('2d');
      const RES = 12;
    let cols, rows;
    let grid = [];
    let nextGrid = [];
    let targetMask = [];
    let isGravitating = false;
    let lastActivityTime = Date.now();

    function generateMask() {
      try {
        const offscreen = document.createElement('canvas');
        offscreen.width = cols * RES;
        offscreen.height = rows * RES;
        const octx = offscreen.getContext('2d');
        
        octx.fillStyle = 'black';
        octx.fillRect(0, 0, offscreen.width, offscreen.height);
        
        octx.fillStyle = 'white';
        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        
        let fontSize = Math.floor((cols * RES) / 5);
        if (fontSize > (rows * RES) / 2.5) fontSize = Math.floor((rows * RES) / 2.5);
        if (fontSize < 10) fontSize = 10;
        
        octx.font = `bold ${fontSize}px sans-serif`;
        octx.fillText('PixelSync', offscreen.width / 2, offscreen.height / 2);
        
        const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height).data;
        targetMask = new Array(cols * rows).fill(0);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = c * RES + Math.floor(RES / 2);
            const py = r * RES + Math.floor(RES / 2);
            const idx = (py * offscreen.width + px) * 4;
            if (idx >= 0 && idx < imgData.length && imgData[idx] > 127) { 
              targetMask[r * cols + c] = 1;
            }
          }
        }
      } catch (e) {
        console.error('Mask generation error:', e);
        targetMask = new Array(cols * rows).fill(0);
      }
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        requestAnimationFrame(resize);
        return;
      }
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.ceil(canvas.width / RES);
      rows = Math.ceil(canvas.height / RES);
      grid = new Array(cols * rows).fill(0);
      nextGrid = new Array(cols * rows).fill(0);
      for(let i=0; i<grid.length; i++) {
        if(Math.random() > 0.85) grid[i] = 1;
      }
      generateMask();
    }
    window.addEventListener('resize', resize);
    resize();
    function getColor(age) {
      if(age === 0) return null;
      if(age === 1) return '#ffffff';
      if(age < 4) return '#93c5fd';
      if(age < 8) return '#3b82f6';
      if(age < 15) return '#8b5cf6';
      if(age < 25) return '#6d28d9';
      return '#4c1d95';
    }
    function update() {
      for(let i=0; i<grid.length; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        let neighbors = 0;
        for(let j=-1; j<=1; j++) {
          for(let k=-1; k<=1; k++) {
            if(j === 0 && k === 0) continue;
            const nc = c + k;
            const nr = r + j;
            if(nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
              if(grid[nr * cols + nc] > 0) neighbors++;
            }
          }
        }
        
        let nextState = grid[i];
        if(grid[i] > 0) {
          if(neighbors < 2 || neighbors > 3) {
            nextState = 0;
          } else {
            nextState = grid[i] + 1;
          }
        } else {
          if(neighbors === 3) {
            nextState = 1;
          } else {
            nextState = 0;
          }
        }

        if (isGravitating) {
          if (targetMask[i] === 1) {
            // Slower, more organic spawning inside the mask
            if (grid[i] === 0 && Math.random() < 0.04) {
              nextState = 1;
            } else if (grid[i] > 0 && nextState === 0 && Math.random() < 0.85) {
              // High but not perfect survival chance looks more organic
              nextState = grid[i] + 1;
            }
          } else {
            // Slower dying outside the mask
            if (grid[i] > 0 && Math.random() < 0.08) {
              nextState = 0;
            }
            // Add a tiny bit of noise
            if (grid[i] === 0 && Math.random() < 0.002) {
              nextState = 1;
            }
          }
        }
        
        nextGrid[i] = nextState;
      }
      for(let i=0; i<grid.length; i++) {
        grid[i] = nextGrid[i];
      }
    }
    function render() {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let r=0; r<=rows; r++) {
        ctx.moveTo(0, r * RES);
        ctx.lineTo(canvas.width, r * RES);
      }
      for(let c=0; c<=cols; c++) {
        ctx.moveTo(c * RES, 0);
        ctx.lineTo(c * RES, canvas.height);
      }
      ctx.stroke();
      for(let i=0; i<grid.length; i++) {
        if(grid[i] > 0) {
          const c = i % cols;
          const r = Math.floor(i / cols);
          ctx.fillStyle = getColor(grid[i]);
          ctx.fillRect(c * RES + 1, r * RES + 1, RES - 2, RES - 2);
        }
      }
    }
    let lastTime = 0;
    function loop(time) {
      requestAnimationFrame(loop);
      if (!cols || !rows) return;
      if(time - lastTime < 100) return;
      lastTime = time;
      
      isGravitating = (Date.now() - lastActivityTime > 4000);
      
      update();
      render();
    }
    requestAnimationFrame(loop);
    let isDrawing = false;
    function spawn(e) {
      if(!isDrawing) return;
      lastActivityTime = Date.now();
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const c = Math.floor((cx - rect.left) / RES);
      const r = Math.floor((cy - rect.top) / RES);
      for(let i=-2; i<=2; i++) {
        for(let j=-2; j<=2; j++) {
          if(Math.random() > 0.3) {
            const nc = c + i, nr = r + j;
            if(nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
              grid[nr * cols + nc] = 1;
            }
          }
        }
      }
      render();
    }
    canvas.addEventListener('mousedown', e => { isDrawing = true; lastActivityTime = Date.now(); spawn(e); });
    canvas.addEventListener('mousemove', spawn);
    window.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); isDrawing = true; lastActivityTime = Date.now(); spawn(e); }, {passive: false});
      canvas.addEventListener('touchmove', e => { e.preventDefault(); spawn(e); }, {passive: false});
      window.addEventListener('touchend', () => isDrawing = false);
    });
  }
  document.addEventListener('astro:page-load', initGOLBanner);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initGOLBanner();
  } else {
    document.addEventListener('DOMContentLoaded', initGOLBanner);
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
