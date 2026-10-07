// --- 1. EFEK JEJAK KURSOR NEON (PARTICLE TRAIL) ---
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    const colors = ['#00d2ff', '#9d50bb', '#ff007f', '#fdcb6e', '#10b981'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 2. INTERAKSI BINTANG & PER (LOMPAT TINGGI/JAUH) ---
const starCharacter = document.getElementById('starCharacter');
starCharacter.addEventListener('click', () => {
  if (!starCharacter.classList.contains('jumping')) {
    starCharacter.classList.add('jumping');
    setTimeout(() => {
      starCharacter.classList.remove('jumping');
    }, 1200);
  }
});

// --- 3. INTERAKSI ROBOT (MUTAR-MUTAR SAAT DIKLIK) ---
const robotCharacter = document.getElementById('robotCharacter');
robotCharacter.addEventListener('click', () => {
  if (!robotCharacter.classList.contains('spinning')) {
    robotCharacter.classList.add('spinning');
    setTimeout(() => {
      robotCharacter.classList.remove('spinning');
    }, 1200);
  }
});

// --- 4. VALIDASI FORM & NOTIFIKASI SUKSES HIJAU ---
const regForm = document.getElementById('regForm');
const notifOverlay = document.getElementById('notifOverlay');
const closeNotif = document.getElementById('closeNotif');
const notifMessage = document.getElementById('notifMessage');

regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const ekstra = document.getElementById('ekstra').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  if (!fullname || !email || !password || !confirmPassword || !ekstra) {
    alert('Harap isi semua kolom formulir!');
    return;
  }

  if (password.length < 8) {
    alert('Password minimal harus 8 karakter!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Konfirmasi password tidak cocok!');
    return;
  }

  if (!agreeTerms) {
    alert('Anda harus menyetujui syarat & ketentuan pendaftaran!');
    return;
  }

  notifMessage.innerHTML = `Selamat <strong>${fullname}</strong>!<br>Pendaftaran Anda untuk ekstrakurikuler <strong>${ekstra}</strong> telah berhasil.`;
  notifOverlay.classList.add('active');

  regForm.reset();
});

closeNotif.addEventListener('click', () => {
  notifOverlay.classList.remove('active');
});

notifOverlay.addEventListener('click', (e) => {
  if (e.target === notifOverlay) {
    notifOverlay.classList.remove('active');
  }
});