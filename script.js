// Animated background: floating orbs/particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const PARTICLE_COUNT = 36;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function randomColor() {
  const colors = ['#ffb347', '#ffcc80', '#f5f6fa', '#b2becd'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 18 + Math.random() * 22,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      color: randomColor(),
      alpha: 0.12 + Math.random() * 0.18
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < -p.r) p.x = width + p.r;
    if (p.x > width + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = height + p.r;
    if (p.y > height + p.r) p.y = -p.r;
  }
}

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animate();

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 40,
        behavior: 'smooth'
      });
    }
  });
}); 