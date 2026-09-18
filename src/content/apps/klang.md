---
title: "Klang - Visual Sampler"
description: "Capture the world and build your ultimate sound collection. A highly visual sampler and sequencer."
coverImage: "../../assets/projects/klang/logo_klang.001.png"
span: 2
featured: true
category: "Apps"
appStoreLink: "#"
playStoreLink: "#"
---

# KLANG: The Audiovisual Pocket Studio

**Why just make a beat when you can make a music video?** 

Klang is a revolutionary sound collector and beat maker for the modern creator. Inspired by classic pocket operators and hardware samplers, Klang blends a sleek, retro LCD aesthetic with powerful modern video exporting. 

Whether you are a lo-fi producer, a beatmaker, or a content creator looking to score your next reel, Klang turns your phone into an instantly playable, highly visual musical instrument.

<div class="not-prose relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto my-20 [perspective:1000px]">
  <div id="klang-wheel" class="w-full h-full relative will-change-transform">
    <!-- Center aesthetic glow -->
    <div class="absolute inset-0 m-auto w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
    
    <!-- Image 1: Top Left -->
    <div class="klang-child absolute top-0 left-0 w-36 h-36 md:w-52 md:h-52 flex items-center justify-center pointer-events-none">
      <img src="/projects/klang/IMG_2995.PNG" class="w-full h-full object-cover rounded-full shadow-2xl border-4 border-zinc-900/80 pointer-events-auto hover:scale-110 transition-transform duration-300" />
    </div>
    
    <!-- Image 2: Top Right -->
    <div class="klang-child absolute top-0 right-0 w-36 h-36 md:w-52 md:h-52 flex items-center justify-center pointer-events-none">
      <img src="/projects/klang/IMG_2997.PNG" class="w-full h-full object-cover rounded-full shadow-2xl border-4 border-zinc-900/80 pointer-events-auto hover:scale-110 transition-transform duration-300" />
    </div>
    
    <!-- Image 3: Bottom Left -->
    <div class="klang-child absolute bottom-0 left-0 w-36 h-36 md:w-52 md:h-52 flex items-center justify-center pointer-events-none">
      <img src="/projects/klang/IMG_2998.PNG" class="w-full h-full object-cover rounded-full shadow-2xl border-4 border-zinc-900/80 pointer-events-auto hover:scale-110 transition-transform duration-300" />
    </div>
    
    <!-- Image 4: Bottom Right -->
    <div class="klang-child absolute bottom-0 right-0 w-36 h-36 md:w-52 md:h-52 flex items-center justify-center pointer-events-none">
      <img src="/projects/klang/IMG_3002.PNG" class="w-full h-full object-cover rounded-full shadow-2xl border-4 border-zinc-900/80 pointer-events-auto hover:scale-110 transition-transform duration-300" />
    </div>
  </div>
</div>

<script>
  function initKlangWheel() {
    const wheel = document.getElementById('klang-wheel');
    if (!wheel) return;
    
    const children = wheel.querySelectorAll('.klang-child');
    
    let currentRotation = 0;
    let targetRotation = 0;
    let ticking = false;

    function update() {
      currentRotation += (targetRotation - currentRotation) * 0.08;
      wheel.style.transform = `rotate(${currentRotation}deg)`;
      
      children.forEach(child => {
        child.style.transform = `rotate(${-currentRotation}deg)`;
      });
      
      if (Math.abs(targetRotation - currentRotation) > 0.01) {
        requestAnimationFrame(update);
      } else {
        ticking = false;
      }
    }

    window.addEventListener('scroll', () => {
      targetRotation = window.scrollY * 0.25;
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // Hook into Astro's lifecycle
  document.addEventListener('astro:page-load', initKlangWheel);
  
  // Fallback for direct loads
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initKlangWheel();
  } else {
    document.addEventListener('DOMContentLoaded', initKlangWheel);
  }
</script>

## Record Your World (The Viewfinder)
Don't just use stock sounds—sample your life. Open the camera viewfinder to record the world around you. Klang instantly trims and maps your recorded audio (and video!) directly to a sequencer pad. A slamming door becomes your kick drum; a passing car becomes your synth riser.

## 16-Step Sequencer & Grid Mosaic
Drop your sounds into the intuitive 16-step sequencer. As your beat plays, Klang generates a stunning, dynamic "Grid Mosaic." Your recorded video samples play in sync with the beat, while built-in synth sounds generate vibrant, audio-reactive procedural animations. 

## Built-In Synth Studio
Need more than just samples? Dive into the Synth Studio. Tweak the subtractive synthesizer and state-variable filters (SVF) to craft deep basslines, punchy leads, and atmospheric pads. Every knob twist is visualized in real-time.

## Live Vocal FX Engine
Plug in your headphones and access the live microphone tracker. Apply professional, low-latency vocal effects in real-time, including Formant Pitch Shifting, Auto-Tune, Telephone EQ, and Techno Delay. Perfect for adding live commentary or vocal chops to your jam.

## Instant Video Export
No more video editing software required. Hit record on the master screen, perform your beat live using the punch-in effects, and Klang will export a beautifully formatted, shareable music video. Your beats are ready for TikTok, Instagram Reels, and YouTube Shorts instantly.

## Key Features
- **Live camera sampling** & audio trimming
- **16-step sequencer** with auto-beat generation
- **Dynamic audiovisual grid mosaic** that reacts to your music
- **Subtractive synth engine** with ADSR envelopes and LFOs
- **Real-time live microphone monitoring** and vocal FX (Pitch shift, Auto-tune)
- **Master punch-in effects** (Filters, Delays, Glitches)
- **Instant screen recording** and social sharing
- **Beautiful, battery-friendly** retro LCD interface

*Stop staring at boring audio timelines. Start collecting sounds and creating audiovisual art with Klang today!*
