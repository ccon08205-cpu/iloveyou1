// ╔══════════════════════════════════════════════════════════════════╗
// ║  🎵 PHÁT NHẠC KHI MỞ THƯ                                        ║
// ║  → Bỏ comment (xóa dấu //) ở dòng audio.play() để bật          ║
// ╚══════════════════════════════════════════════════════════════════╝
function playSound() {
  const audio = document.getElementById('sound');
  if (audio) audio.play();
  // Muốn tắt nhạc khi đóng thư → vào hàm closeEnvelope() bên dưới
}

// ── Tim bay nền (tự động, không cần chỉnh) ────────────────────────
const bgContainer = document.getElementById('bgHearts');
const HEART_COUNT = 18; // ← Số lượng tim bay trên nền (tăng/giảm tùy thích)

for (let i = 0; i < HEART_COUNT; i++) {
  const h = document.createElement('span');
  h.classList.add('bg-heart');
  h.textContent = '♥';
  const size = (Math.random() * 18 + 10) + 'px';
  const x    = (Math.random() * 100) + '%';
  const dur  = (Math.random() * 8 + 7) + 's';
  const del  = (Math.random() * 10) + 's';
  h.style.cssText = `--size:${size}; --x:${x}; --dur:${dur}; --delay:-${del};`;
  bgContainer.appendChild(h);
}

// ── Mở phong bì ───────────────────────────────────────────────────
function openEnvelope() {
  const envelope   = document.getElementById('envelope');
  const letter     = document.getElementById('letter');
  const openBtn    = document.getElementById('openBtn');
  const closeBtn   = document.getElementById('closeBtn');
  const letterPrev = document.getElementById('letterPreview');
  const overlay    = document.getElementById('letterOverlay');

  // Phát nhạc (nếu đã thêm thẻ <audio> trong HTML)
  playSound();

  // Mở nắp phong bì
  envelope.classList.add('open');
  letterPrev.style.opacity = '0';

  // Thư bay ra sau 0.5s (chờ nắp mở xong)
  setTimeout(() => {
    letter.classList.add('visible');
    overlay.classList.add('visible');
  }, 500);

  // Ẩn nút "Mở thư", hiện nút "Đóng lại"
  openBtn.classList.add('hidden');
  setTimeout(() => closeBtn.classList.add('visible'), 900);

  // Hiệu ứng tim bùng nổ
  burstHearts();
}

// ── Đóng phong bì ─────────────────────────────────────────────────
function closeEnvelope() {
  const envelope   = document.getElementById('envelope');
  const letter     = document.getElementById('letter');
  const openBtn    = document.getElementById('openBtn');
  const closeBtn   = document.getElementById('closeBtn');
  const letterPrev = document.getElementById('letterPreview');
  const overlay    = document.getElementById('letterOverlay');

  // ↓ Bỏ comment để tắt nhạc khi đóng thư
  // const audio = document.getElementById('sound');
  // if (audio) { audio.pause(); audio.currentTime = 0; }

  // Thư trượt vào, lớp mờ biến mất
  letter.classList.remove('visible');
  overlay.classList.remove('visible');

  // Đóng nắp phong bì sau 0.6s
  setTimeout(() => {
    envelope.classList.remove('open');
    letterPrev.style.opacity = '1';
  }, 600);

  // Ẩn nút "Đóng lại", hiện lại nút "Mở thư"
  closeBtn.classList.remove('visible');
  setTimeout(() => openBtn.classList.remove('hidden'), 700);
}

// ── Tim bùng nổ khi mở (tự động, không cần chỉnh) ─────────────────
function burstHearts() {
  const cx    = window.innerWidth / 2;
  const cy    = window.innerHeight / 2 - 60;
  const count = 12; // ← Số tim bùng ra khi mở (tăng/giảm tùy thích)

  for (let i = 0; i < count; i++) {
    const el    = document.createElement('span');
    el.classList.add('burst-heart');
    el.textContent = '♥';

    const angle = (360 / count) * i;
    const dist  = 80 + Math.random() * 80;
    const rad   = (angle * Math.PI) / 180;
    const tx    = Math.cos(rad) * dist + 'px';
    const ty    = Math.sin(rad) * dist + 'px';

    el.style.cssText = `left:${cx}px; top:${cy}px; --tx:${tx}; --ty:${ty};
      font-size:${14 + Math.random() * 14}px;
      color: hsl(${330 + Math.random() * 30}, 80%, ${55 + Math.random() * 20}%);`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}
