function initGOLBanner() {
  const canvas = document.getElementById('px-gol');
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';
  const ctx = canvas.getContext('2d');
  const RES = 10; // Smaller cells = higher resolution for the text mask
  let cols, rows;
  let grid = [];
  let nextGrid = [];
  
  let targetMask = [];
  let isGravitating = false;
  let lastActivityTime = Date.now();
  
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width || 800;
    canvas.height = rect.height || 400;
    cols = Math.ceil(canvas.width / RES);
    rows = Math.ceil(canvas.height / RES);
    grid = new Array(cols * rows).fill(0);
    nextGrid = new Array(cols * rows).fill(0);
    for(let i=0; i<grid.length; i++) {
      if(Math.random() > 0.85) grid[i] = 1;
    }
    
    try {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Dynamically calculate font size to perfectly fit the width (with padding)
      let fontSize = 200;
      ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`; // Heaviest possible font
      let textWidth = ctx.measureText('PixelSync').width;
      
      while (textWidth > canvas.width * 0.9 && fontSize > 10) {
        fontSize -= 5;
        ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
        textWidth = ctx.measureText('PixelSync').width;
      }
      
      if (fontSize > (rows * RES) / 2) {
        fontSize = Math.floor((rows * RES) / 2);
        ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
      }
      
      ctx.fillText('PixelSync', canvas.width / 2, canvas.height / 2);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      targetMask = new Array(cols * rows).fill(0);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * RES + Math.floor(RES / 2);
          const py = r * RES + Math.floor(RES / 2);
          const idx = (py * canvas.width + px) * 4;
          if (idx >= 0 && idx < imgData.length && imgData[idx] > 127) { 
            targetMask[r * cols + c] = 1;
          }
        }
      }
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } catch (e) {
      targetMask = new Array(cols * rows).fill(0);
    }
  }
  window.addEventListener('resize', resize);
  resize();
  
  function getColor(age) {
    if(age === 0) return null;
    if(age === 1) return '#ffffff';
    if(age < 4) return '#60a5fa'; // vibrant blue
    if(age < 10) return '#8b5cf6'; // vibrant purple
    if(age < 20) return '#d946ef'; // vibrant fuchsia
    return '#ec4899'; // vibrant pink - never fades to black
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
          if (grid[i] === 0 && Math.random() < 0.08) { // Spawn faster
            nextState = 1;
          } else if (grid[i] > 0 && nextState === 0 && Math.random() < 0.98) { // Almost never die inside mask
            nextState = grid[i] + 1;
          }
        } else {
          if (grid[i] > 0 && Math.random() < 0.12) { // Die faster outside
            nextState = 0;
          }
          if (grid[i] === 0 && Math.random() < 0.001) { // Very little noise outside
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
}

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

document.addEventListener('astro:page-load', () => {
  initGOLBanner();
  initPixelSyncSlider();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initGOLBanner();
  initPixelSyncSlider();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    initGOLBanner();
    initPixelSyncSlider();
  });
}
