/**
 * ============================================================
 * ROMANTIC CELEBRATION - MASTER STANDALONE JAVASCRIPT ENGINE
 * 100% Pure Vanilla JavaScript - Zero Bundler / Zero React / No CORS Issues
 * Runs seamlessly on local file://, GitHub Pages, or any web server.
 * ============================================================
 */

// 1. Story Data & Configuration
const storyData = {
  recipientName: 'Debannita',
  senderName: 'Ayushman',
  birthdayDate: '22 August',
  passcode: '3101',
  validUserId: 'they_boooo',
  heroQuote: 'Today is all about you and all the happiness you bring into my life every single day.',
  memories: [
    {
      id: 'mem-1',
      title: 'Our Smile',
      subtitle: 'Pure Happiness',
      imageSrc: './assets/polaroid-1.svg',
      fallbackSvg: './assets/polaroid-1.svg',
      date: 'First Date',
      story: 'The day we laughed until our stomachs hurt. I knew right then and there that your smile would forever be my favorite sight.',
      rotation: -3,
    },
    {
      id: 'mem-2',
      title: 'Our Favorite Moment',
      subtitle: 'Golden Hour Glow',
      imageSrc: './assets/polaroid-2.svg',
      fallbackSvg: './assets/polaroid-2.svg',
      date: 'Sunset Beach Walk',
      story: 'Watching the sky turn into shades of gold and pink while listening to the waves. The world disappeared, and it was just us.',
      rotation: 2,
    },
    {
      id: 'mem-3',
      title: 'Together Forever',
      subtitle: 'Mountain Adventure',
      imageSrc: './assets/polaroid-3.svg',
      fallbackSvg: './assets/polaroid-3.svg',
      date: 'Scenic Getaway',
      story: 'Standing at the peak overlooking the misty valleys, holding your hand. Every journey with you feels like an adventure.',
      rotation: -2,
    },
    {
      id: 'mem-4',
      title: 'My Happy Place',
      subtitle: 'Cozy Moments',
      imageSrc: './assets/polaroid-4.svg',
      fallbackSvg: './assets/polaroid-4.svg',
      date: 'Quiet Evening Coffee',
      story: 'No matter where we are or what we do, anywhere with you is where I feel most at home and completely at peace.',
      rotation: 3,
    },
  ],
  videoTitle: 'Our Special Video',
  videoSrc: './assets/special-video.mp4',
  videoPoster: './assets/video-cover.svg',
  videoDuration: '02:45',
  letterTitle: 'A Letter From Ayushman',
  letterSubtitle: 'Written with all my heart',
  letterSalutation: 'To the most amazing person in my life, Debannita,',
  letterBody: [
    'You make every day brighter just by being you.',
    'Thank you for your love, your kindness and for being my constant happiness.',
    'I am so lucky to have you in my life.',
    'I hope this birthday brings you as much joy as you bring into mine.',
  ],
  letterClosing: 'Forever yours, Ayushman',
  cakeMessage: 'Thank you for being my happiness, my love and my everything. Forever yours, Ayushman 💖',
  milestones: [
    {
      id: 'our-story',
      title: 'Our Story',
      content: 'From the very first day we crossed paths, my life took on vibrant new colors. Every moment spent with you is a cherished chapter.',
    },
    {
      id: 'our-love',
      title: 'Our Love',
      content: 'Gentle, fierce, steadfast, and deeply patient. A love that feels like warm sunlight on the coldest days.',
    },
    {
      id: 'forever-us',
      title: 'Forever Us',
      content: 'Through every twist, turn, milestone, and quiet morning, we face the future together as one unbreakable team.',
    },
    {
      id: 'always',
      title: 'Always',
      content: 'Today, tomorrow, and forever—I will choose you, celebrate you, and love you endlessly.',
    },
  ],
};

// 2. Authentication Validator
function validateLogin(username, password) {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();
  const isValidUser = cleanUser === 'they_boooo' || cleanUser === '@they_boooo';
  const isValidPass = cleanPass === '3101';
  return isValidUser && isValidPass;
}

// 3. Web Audio Romantic Synthesizer
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMusicPlaying = false;
    this.musicInterval = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, startTime, duration, gainValue = 0.12) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  playChordProgression() {
    if (!this.ctx || !this.isMusicPlaying) return;

    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0], // Am7
      [174.61, 261.63, 329.63, 349.23], // Fmaj7
      [196.0, 293.66, 392.0, 440.0], // Gsus
    ];

    const now = this.ctx.currentTime;
    chords.forEach((chord, chordIdx) => {
      const chordStart = now + chordIdx * 3.5;
      chord.forEach((note, noteIdx) => {
        this.playNote(note, chordStart + noteIdx * 0.45, 3.2, 0.08);
      });
      const highNote = chord[chord.length - 1] * 1.5;
      this.playNote(highNote, chordStart + 1.8, 2.5, 0.04);
    });
  }

  toggleMusic() {
    this.initContext();
    this.isMusicPlaying = !this.isMusicPlaying;

    if (this.isMusicPlaying) {
      this.playChordProgression();
      if (this.musicInterval) clearInterval(this.musicInterval);
      this.musicInterval = setInterval(() => {
        if (this.isMusicPlaying) {
          this.playChordProgression();
        }
      }, 14000);
    } else {
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    }
    return this.isMusicPlaying;
  }

  playChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      this.playNote(freq, now + i * 0.08, 1.8, 0.1);
    });
  }

  playBlowSound() {
    this.initContext();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.09, 2.2, 0.12);
    });
  }

  playHeartClick() {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
}

const romanticAudio = new RomanticAudioEngine();

// 4. Floating Hearts & Bokeh Particle Canvas
function initFloatingHearts(canvasId = 'hearts-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animId;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ['#ff2a7a', '#ff4b8b', '#ff7eb3', '#f43f5e', '#ec4899', '#db2777', '#fbcfe8'];
  const hearts = [];
  const sparkles = [];
  const heartCount = Math.min(32, Math.floor(width / 45));

  for (let i = 0; i < heartCount; i++) {
    hearts.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 26,
      speedY: 0.35 + Math.random() * 0.75,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: 0.25 + Math.random() * 0.55,
      rotation: (Math.random() - 0.5) * 0.8,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      swayAmplitude: 15 + Math.random() * 25,
      swayFrequency: 0.008 + Math.random() * 0.015,
      swayOffset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      is3d: Math.random() > 0.4,
    });
  }

  for (let i = 0; i < 40; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 3,
      opacity: Math.random(),
      fadeSpeed: 0.005 + Math.random() * 0.015,
      color: Math.random() > 0.3 ? '#ffb3d9' : '#fef08a',
    });
  }

  function drawHeart(context, x, y, size, rotation, color, opacity, is3d) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.globalAlpha = opacity;
    context.shadowColor = color;
    context.shadowBlur = is3d ? 22 : 12;

    context.beginPath();
    const topCurveHeight = size * 0.3;
    context.moveTo(0, topCurveHeight);
    context.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight / 3, 0, size);
    context.bezierCurveTo(size, topCurveHeight / 3, size / 2, -size / 2, 0, topCurveHeight);
    context.closePath();

    if (is3d) {
      const grad = context.createLinearGradient(-size / 2, -size / 2, size / 2, size);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, color);
      grad.addColorStop(0.8, '#880e4f');
      grad.addColorStop(1, '#31031c');
      context.fillStyle = grad;
    } else {
      context.fillStyle = color;
    }

    context.fill();
    context.restore();
  }

  let tick = 0;
  function animate() {
    tick++;
    ctx.clearRect(0, 0, width, height);

    const bgGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      80,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.7
    );
    bgGrad.addColorStop(0, '#230616');
    bgGrad.addColorStop(0.5, '#12020a');
    bgGrad.addColorStop(1, '#080105');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    sparkles.forEach((s) => {
      s.opacity += s.fadeSpeed;
      if (s.opacity > 0.85 || s.opacity < 0.15) {
        s.fadeSpeed = -s.fadeSpeed;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0.05, Math.min(1, s.opacity));
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    hearts.forEach((h) => {
      h.y -= h.speedY;
      const currentSway =
        Math.sin(tick * h.swayFrequency + h.swayOffset) * h.swayAmplitude * 0.02;
      h.x += currentSway + h.speedX;
      h.rotation += h.rotationSpeed;

      if (h.y < -50) {
        h.y = height + 40;
        h.x = Math.random() * width;
      }
      if (h.x < -40) h.x = width + 30;
      if (h.x > width + 40) h.x = -30;

      drawHeart(ctx, h.x, h.y, h.size, h.rotation, h.color, h.opacity, h.is3d);
    });

    animId = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      hearts.push({
        x: e.clientX + (Math.random() - 0.5) * 30,
        y: e.clientY + (Math.random() - 0.5) * 30,
        size: 12 + Math.random() * 16,
        speedY: 1.2 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 1.5,
        opacity: 0.85,
        rotation: (Math.random() - 0.5) * 0.6,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swayAmplitude: 20,
        swayFrequency: 0.02,
        swayOffset: Math.random() * Math.PI,
        color: colors[Math.floor(Math.random() * colors.length)],
        is3d: true,
      });
    }
    if (hearts.length > 55) {
      hearts.splice(0, 5);
    }
  });
}

// 5. Fireworks & Confetti Celebration Engine (Smooth, Gentle Float)
function triggerFireworks() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.className = 'fixed inset-0 pointer-events-none z-50';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = [
    '#ff4b8b', '#ff7eb3', '#f43f5e', '#ffd166', '#ffffff',
    '#ff2a6d', '#fecdd3', '#fda4af', '#fef08a'
  ];

  const centerX = window.innerWidth * 0.5;
  const centerY = window.innerHeight * 0.52;

  // Center celebration bloom - smooth floaty burst
  for (let i = 0; i < 170; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.4 + Math.random() * 5.8;
    particles.push({
      x: centerX + (Math.random() - 0.5) * 60,
      y: centerY + (Math.random() - 0.5) * 40,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.5,
      friction: 0.982,
      gravity: 0.055,
      size: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      // Extended duration (~1.5s longer, lasting ~3.0s total)
      decay: 0.0035 + Math.random() * 0.003,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.04 + Math.random() * 0.05,
      isHeart: Math.random() > 0.72,
    });
  }

  // Dual side celebration cannons
  for (let i = 0; i < 48; i++) {
    // Left cannon
    particles.push({
      x: window.innerWidth * 0.08,
      y: window.innerHeight * 0.82,
      vx: 3 + Math.random() * 4.8,
      vy: -(5.5 + Math.random() * 5.8),
      friction: 0.984,
      gravity: 0.058,
      size: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.0036 + Math.random() * 0.0028,
      rotation: Math.random() * Math.PI,
      vRot: 0.07 + Math.random() * 0.04,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.045,
      isHeart: Math.random() > 0.7,
    });
    // Right cannon
    particles.push({
      x: window.innerWidth * 0.92,
      y: window.innerHeight * 0.82,
      vx: -(3 + Math.random() * 4.8),
      vy: -(5.5 + Math.random() * 5.8),
      friction: 0.984,
      gravity: 0.058,
      size: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.0036 + Math.random() * 0.0028,
      rotation: Math.random() * Math.PI,
      vRot: -(0.07 + Math.random() * 0.04),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.045,
      isHeart: Math.random() > 0.7,
    });
  }

  let animId;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach((p) => {
      if (p.alpha > 0) {
        activeCount++;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;

        p.wobble += p.wobbleSpeed;
        const flutterX = Math.sin(p.wobble) * 1.1;

        p.x += p.vx + flutterX;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.isHeart) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size * 0.9;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
          ctx.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, s * 0.3);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          const scaleW = Math.cos(p.wobble);
          ctx.fillRect((-p.size * scaleW) / 2, -p.size / 2, p.size * scaleW, p.size * 1.4);
        }
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      animId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animId);
      canvas.remove();
    }
  }

  render();
}

// 6. Application State & Interactive Stage Controller
let currentStage = 1;
const unlockedStages = new Set([1]);
let isCandleBlown = false;

function initApp() {
  initFloatingHearts('hearts-canvas');

  const screens = {
    1: document.getElementById('screen-1'),
    2: document.getElementById('screen-2'),
    3: document.getElementById('screen-3'),
    4: document.getElementById('screen-4'),
    5: document.getElementById('screen-5'),
    6: document.getElementById('screen-6'),
    error: document.getElementById('screen-error'),
  };

  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioTooltip = document.getElementById('audio-tooltip');
  const stepperDots = document.querySelectorAll('.stepper-dot');
  const prevStepBtn = document.getElementById('prev-step-btn');
  const nextStepBtn = document.getElementById('next-step-btn');

  function showScreen(stageNum) {
    if (stageNum === 'error') {
      Object.values(screens).forEach((s) => s?.classList.remove('active'));
      screens.error?.classList.add('active');
      return;
    }

    if (stageNum < 1 || stageNum > 6) return;
    currentStage = stageNum;
    unlockedStages.add(stageNum);

    Object.values(screens).forEach((s) => s?.classList.remove('active'));
    screens[stageNum]?.classList.add('active');

    stepperDots.forEach((dot) => {
      const num = parseInt(dot.getAttribute('data-step'), 10);
      if (num === currentStage) {
        dot.className =
          'stepper-dot relative w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all duration-300 cursor-pointer bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-[0_0_12px_rgba(255,75,139,0.8)] scale-110 border border-pink-300/60';
      } else if (unlockedStages.has(num)) {
        dot.className =
          'stepper-dot relative w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] font-medium flex items-center justify-center transition-all duration-300 cursor-pointer bg-pink-950/50 text-pink-300/80 hover:bg-pink-900/60 hover:text-pink-100 border border-pink-500/20';
      } else {
        dot.className =
          'stepper-dot relative w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] font-medium flex items-center justify-center transition-all duration-300 bg-zinc-900/40 text-zinc-600 border border-zinc-800/40 cursor-not-allowed opacity-40';
      }
    });

    if (prevStepBtn) prevStepBtn.style.display = currentStage > 1 ? 'block' : 'none';
    if (nextStepBtn)
      nextStepBtn.style.display =
        currentStage < 6 && unlockedStages.has(currentStage + 1) ? 'block' : 'none';
  }

  // Audio Toggle
  audioToggleBtn?.addEventListener('click', () => {
    const isPlaying = romanticAudio.toggleMusic();
    audioToggleBtn.className = isPlaying
      ? 'relative p-2.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer border bg-pink-600/30 border-pink-400 text-pink-200 shadow-[0_0_20px_rgba(255,75,139,0.5)] scale-105'
      : 'relative p-2.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer border bg-black/40 border-pink-500/30 text-pink-300/70 hover:text-pink-200 hover:border-pink-400/60';

    const visualizer = document.getElementById('audio-bars');
    const speakerIcon = document.getElementById('audio-icon-speaker');
    const musicIcon = document.getElementById('audio-icon-music');

    if (visualizer) visualizer.style.display = isPlaying ? 'flex' : 'none';
    if (speakerIcon) speakerIcon.style.display = isPlaying ? 'none' : 'block';
    if (musicIcon) musicIcon.style.display = isPlaying ? 'block' : 'none';

    if (audioTooltip) {
      audioTooltip.textContent = isPlaying ? 'Romantic Melody Playing' : 'Click to Play Music';
    }
  });

  // Password visibility
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const passInput = document.getElementById('vault-password');
  togglePassBtn?.addEventListener('click', () => {
    if (!passInput) return;
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  });

  // Vault Login Submit
  const vaultForm = document.getElementById('vault-form');
  vaultForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('vault-username')?.value;
    const passInputVal = document.getElementById('vault-password')?.value;

    if (validateLogin(userInput, passInputVal)) {
      romanticAudio.playChime();
      showScreen(2);
    } else {
      showScreen('error');
    }
  });

  // Return to Gate
  document.getElementById('return-to-gate-btn')?.addEventListener('click', () => {
    romanticAudio.playHeartClick();
    const pInput = document.getElementById('vault-password');
    if (pInput) pInput.value = '';
    showScreen(1);
  });

  // Screen 2 -> 3
  document.getElementById('unfold-love-btn')?.addEventListener('click', () => {
    romanticAudio.playChime();
    showScreen(3);
  });

  // Polaroid Lightbox
  const modal = document.getElementById('memory-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalStory = document.getElementById('modal-story');

  document.querySelectorAll('.polaroid-card').forEach((card) => {
    card.addEventListener('click', () => {
      romanticAudio.playHeartClick();
      const id = card.getAttribute('data-id');
      const mem = storyData.memories.find((m) => m.id === id);
      if (mem && modal && modalImg && modalTitle && modalDate && modalStory) {
        modalImg.src = mem.imageSrc;
        modalTitle.textContent = mem.title;
        modalDate.textContent = mem.date;
        modalStory.textContent = `"${mem.story}"`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  const closeMemoryModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  document.getElementById('close-memory-btn')?.addEventListener('click', closeMemoryModal);
  document.getElementById('close-memory-btn-2')?.addEventListener('click', closeMemoryModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeMemoryModal();
  });

  // Screen 3 -> 4
  document.getElementById('play-movie-btn')?.addEventListener('click', () => {
    romanticAudio.playChime();
    showScreen(4);
  });

  // Video Controls
  const video = document.getElementById('special-video');
  const playBtn = document.getElementById('video-play-btn');
  const centerPlayBtn = document.getElementById('center-play-btn');
  const scrubBar = document.getElementById('video-scrub');
  const timeDisplay = document.getElementById('video-time');
  const muteBtn = document.getElementById('video-mute-btn');
  const fsBtn = document.getElementById('video-fs-btn');
  const videoWrapper = document.getElementById('video-wrapper');

  let isVideoPlaying = false;
  let videoCurrent = 0;
  let videoDuration = 165;
  let simulatedTimer = null;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  function toggleVideo() {
    romanticAudio.playHeartClick();
    isVideoPlaying = !isVideoPlaying;

    if (centerPlayBtn) {
      centerPlayBtn.style.display = isVideoPlaying ? 'none' : 'flex';
    }

    if (video && video.duration) {
      if (isVideoPlaying) video.play();
      else video.pause();
    } else {
      if (isVideoPlaying) {
        simulatedTimer = setInterval(() => {
          videoCurrent = (videoCurrent + 1) % videoDuration;
          if (scrubBar) scrubBar.value = videoCurrent;
          if (timeDisplay)
            timeDisplay.textContent = `${formatTime(videoCurrent)} / ${formatTime(videoDuration)}`;
        }, 1000);
      } else {
        if (simulatedTimer) clearInterval(simulatedTimer);
      }
    }
  }

  playBtn?.addEventListener('click', toggleVideo);
  centerPlayBtn?.addEventListener('click', toggleVideo);
  muteBtn?.addEventListener('click', () => {
    if (video) video.muted = !video.muted;
  });
  fsBtn?.addEventListener('click', () => {
    if (videoWrapper) {
      if (!document.fullscreenElement) videoWrapper.requestFullscreen().catch(() => {});
      else document.exitFullscreen().catch(() => {});
    }
  });

  // Screen 4 -> 5
  document.getElementById('final-surprise-btn')?.addEventListener('click', () => {
    romanticAudio.playChime();
    showScreen(5);
  });

  // Screen 5: Interactive Wax Seal Envelope Opener
  const waxSeal = document.getElementById('wax-seal');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelopeClosedPocket = document.getElementById('envelope-closed-pocket');
  let isEnvelopeOpened = false;

  function openEnvelope() {
    if (isEnvelopeOpened || !envelopeWrapper) return;
    isEnvelopeOpened = true;

    // Play tactile love click and celebration chime
    romanticAudio.playHeartClick();
    setTimeout(() => {
      romanticAudio.playChime();
    }, 200);

    // Add CSS transition state to envelope
    envelopeWrapper.classList.add('open');

    if (envelopeClosedPocket) {
      envelopeClosedPocket.style.opacity = '0';
      setTimeout(() => {
        envelopeClosedPocket.style.display = 'none';
      }, 500);
    }
  }

  waxSeal?.addEventListener('click', openEnvelope);
  waxSeal?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  // Screen 5 -> 6
  document.getElementById('make-wish-btn')?.addEventListener('click', () => {
    romanticAudio.playChime();
    showScreen(6);
  });

  // Screen 6: Cake & Candle
  const candleFlame = document.getElementById('candle-flame');
  const candleSmoke = document.getElementById('candle-smoke');
  const blowCandleBtn = document.getElementById('blow-candle-btn');
  const wishGrantedBadge = document.getElementById('wish-granted-badge');
  const relightBtn = document.getElementById('relight-btn');
  let smokeTimer = null;

  function blowCandle() {
    if (isCandleBlown) return;
    romanticAudio.playBlowSound();

    // Smooth flickering wind and scale-down extinguish transition
    if (candleFlame) {
      candleFlame.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
      candleFlame.style.opacity = '0';
      candleFlame.style.transform = 'scale(0.3) translateY(-10px)';
    }

    setTimeout(() => {
      isCandleBlown = true;
      if (candleFlame) candleFlame.style.display = 'none';
      if (candleSmoke) {
        candleSmoke.style.display = 'block';
        if (smokeTimer) clearTimeout(smokeTimer);
        smokeTimer = setTimeout(() => {
          candleSmoke.style.display = 'none';
        }, 2800);
      }
      if (blowCandleBtn) {
        blowCandleBtn.style.opacity = '0';
        setTimeout(() => { blowCandleBtn.style.display = 'none'; }, 300);
      }
      if (wishGrantedBadge) {
        wishGrantedBadge.style.display = 'flex';
        wishGrantedBadge.style.opacity = '0';
        wishGrantedBadge.style.transform = 'translateY(8px)';
        wishGrantedBadge.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        requestAnimationFrame(() => {
          wishGrantedBadge.style.opacity = '1';
          wishGrantedBadge.style.transform = 'translateY(0)';
        });
      }

      romanticAudio.playCelebrationChime();
      triggerFireworks();
    }, 550);
  }

  candleFlame?.addEventListener('click', blowCandle);
  blowCandleBtn?.addEventListener('click', blowCandle);

  relightBtn?.addEventListener('click', () => {
    isCandleBlown = false;
    if (smokeTimer) clearTimeout(smokeTimer);
    if (candleFlame) {
      candleFlame.style.display = 'block';
      candleFlame.style.opacity = '1';
      candleFlame.style.transform = 'none';
    }
    if (candleSmoke) candleSmoke.style.display = 'none';
    if (blowCandleBtn) {
      blowCandleBtn.style.display = 'inline-flex';
      blowCandleBtn.style.opacity = '1';
    }
    if (wishGrantedBadge) wishGrantedBadge.style.display = 'none';
    romanticAudio.playHeartClick();
  });

  // Milestone Modals
  const milestoneModal = document.getElementById('milestone-modal');
  const milestoneTitle = document.getElementById('milestone-title');
  const milestoneContent = document.getElementById('milestone-content');

  document.querySelectorAll('.milestone-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      romanticAudio.playHeartClick();
      const id = btn.getAttribute('data-id');
      const item = storyData.milestones.find((m) => m.id === id);
      if (item && milestoneModal && milestoneTitle && milestoneContent) {
        milestoneTitle.textContent = item.title;
        milestoneContent.textContent = `"${item.content}"`;
        milestoneModal.classList.remove('hidden');
        milestoneModal.classList.add('flex');
      }
    });
  });

  const closeMilestone = () => {
    if (milestoneModal) {
      milestoneModal.classList.add('hidden');
      milestoneModal.classList.remove('flex');
    }
  };

  document.getElementById('close-milestone-btn')?.addEventListener('click', closeMilestone);
  document.getElementById('close-milestone-btn-2')?.addEventListener('click', closeMilestone);
  milestoneModal?.addEventListener('click', (e) => {
    if (e.target === milestoneModal) closeMilestone();
  });

  document.getElementById('replay-btn')?.addEventListener('click', () => {
    romanticAudio.playHeartClick();
    showScreen(1);
  });

  stepperDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.getAttribute('data-step'), 10);
      if (unlockedStages.has(step)) {
        romanticAudio.playHeartClick();
        showScreen(step);
      }
    });
  });

  prevStepBtn?.addEventListener('click', () => {
    if (currentStage > 1) {
      romanticAudio.playHeartClick();
      showScreen(currentStage - 1);
    }
  });

  nextStepBtn?.addEventListener('click', () => {
    if (currentStage < 6 && unlockedStages.has(currentStage + 1)) {
      romanticAudio.playHeartClick();
      showScreen(currentStage + 1);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentStage < 6 && unlockedStages.has(currentStage + 1)) {
      showScreen(currentStage + 1);
    } else if (e.key === 'ArrowLeft' && currentStage > 1) {
      showScreen(currentStage - 1);
    }
  });

  showScreen(1);
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Expose on window for standalone subpages
window.RomanticCelebration = {
  storyData,
  validateLogin,
  romanticAudio,
  initFloatingHearts,
  triggerFireworks,
};
