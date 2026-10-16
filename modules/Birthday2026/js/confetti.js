/**
 * Fireworks and Confetti Celebration Engine
 */

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

  animId = requestAnimationFrame(render);
}

if (typeof window !== 'undefined') {
  window.triggerFireworks = triggerFireworks;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { triggerFireworks };
}
