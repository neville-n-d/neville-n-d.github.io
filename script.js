// --- 3D HERO SECTION (Three.js) ---
const threeHero = document.getElementById('three-hero');
if (threeHero) {
  // Setup Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, threeHero.clientWidth / threeHero.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: threeHero, alpha: true, antialias: true });
  function resizeThreeHero() {
    const w = threeHero.parentElement.offsetWidth;
    const h = threeHero.parentElement.offsetHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resizeThreeHero();
  window.addEventListener('resize', resizeThreeHero);

  // Add a spinning cube and floating orbs
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0xffb347, metalness: 0.5, roughness: 0.3 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add floating orbs
  const orbs = [];
  for (let i = 0; i < 8; i++) {
    const orbGeo = new THREE.SphereGeometry(0.4 + Math.random() * 0.3, 32, 32);
    const orbMat = new THREE.MeshStandardMaterial({ color: 0xffcc80, emissive: 0xffb347, emissiveIntensity: 0.2 });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(Math.sin(i) * 4, Math.cos(i) * 2, Math.cos(i) * 4);
    scene.add(orb);
    orbs.push({ mesh: orb, angle: Math.random() * Math.PI * 2, speed: 0.003 + Math.random() * 0.003 });
  }

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffb347, 0.7);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  camera.position.z = 7;

  function animateHero() {
    cube.rotation.x += 0.008;
    cube.rotation.y += 0.012;
    orbs.forEach((o, i) => {
      o.angle += o.speed;
      o.mesh.position.x = Math.sin(o.angle + i) * 4;
      o.mesh.position.y = Math.cos(o.angle + i * 0.7) * 2;
      o.mesh.position.z = Math.cos(o.angle + i) * 4;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animateHero);
  }
  animateHero();
}

// --- DYNAMIC GITHUB REPOS (Responsive Grid) ---
async function loadRepos3D() {
  const container = document.getElementById('repos-3d');
  if (!container) return;
  container.innerHTML = '<p>Loading repositories...</p>';
  try {
    const res = await fetch('https://api.github.com/users/neville-n-d/repos?sort=updated');
    const repos = await res.json();
    container.innerHTML = '';
    if (!repos.length) {
      container.innerHTML = '<p>No repositories found.</p>';
      return;
    }
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card-3d';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : 'No description.'}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = '<p>Could not load repositories.</p>';
  }
}
loadRepos3D();

// --- FOOTER YEAR ---
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// --- SMOOTH SCROLL ---
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- SECTION ENTRANCE ANIMATION ---
function animateSectionsOnScroll() {
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-slide-up, .stagger').forEach(el => {
    observer.observe(el);
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateSectionsOnScroll);
} else {
  animateSectionsOnScroll();
} 