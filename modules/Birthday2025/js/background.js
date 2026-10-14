/**
 * Floating Hearts & Bokeh Ambient Canvas Engine
 */

function initFloatingHearts(canvasId = 'hearts-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animId;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);

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

    if (is3d && size > 16) {
      context.beginPath();
      context.ellipse(-size * 0.22, 0, size * 0.12, size * 0.22, -0.4, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 0.45)';
      context.fill();
    }

    context.restore();
  }

  let tick = 0;
  function animate() {
    tick++;
    ctx.clearRect(0, 0, width, height);

    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, Math.max(width, height) * 0.7);
    bgGrad.addColorStop(0, '#230616');
    bgGrad.addColorStop(0.5, '#12020a');
    bgGrad.addColorStop(1, '#080105');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const spotGrad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 10, width * 0.2, height * 0.3, 300);
    spotGrad1.addColorStop(0, 'rgba(236, 72, 153, 0.08)');
    spotGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spotGrad1;
    ctx.fillRect(0, 0, width, height);

    const spotGrad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 10, width * 0.8, height * 0.7, 350);
    spotGrad2.addColorStop(0, 'rgba(244, 63, 94, 0.08)');
    spotGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spotGrad2;
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
      const currentSway = Math.sin(tick * h.swayFrequency + h.swayOffset) * h.swayAmplitude * 0.02;
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

  animId = requestAnimationFrame(animate);

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

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', handleResize);
  };
}

if (typeof window !== 'undefined') {
  window.initFloatingHearts = initFloatingHearts;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initFloatingHearts };
}
