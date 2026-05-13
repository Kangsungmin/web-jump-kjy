// 브라우저 스크롤 복원 비활성화 → 항상 최상단에서 시작
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ── Header scroll effect ──────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile hamburger ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ── Carousel ──────────────────────────────────────────
const track     = document.getElementById('carouselTrack');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const dotsWrap  = document.getElementById('carouselDots');
const currentEl = document.getElementById('currentSlide');
const totalEl   = document.getElementById('totalSlide');

const slides = track ? track.querySelectorAll('.carousel__slide') : [];
const total  = slides.length;
let current  = 0;
let autoTimer = null;

if (total > 0) {
  totalEl.textContent = total;

  // 점 생성
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `슬라이드 ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    currentEl.textContent = current + 1;

    dotsWrap.querySelectorAll('.carousel__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // 터치 스와이프
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  });

  // 탭 비활성 시 멈춤
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAuto() : startAuto();
  });

  startAuto();
}

// ── Award popup ───────────────────────────────────────
(function () {
  const popup    = document.getElementById('awardPopup');
  const backdrop = document.getElementById('awardBackdrop');
  const closeBtn = document.getElementById('awardCloseBtn');
  const skipBtn  = document.getElementById('awardSkipBtn');
  const KEY      = 'award_popup_hidden';
  const today    = new Date().toISOString().slice(0, 10);

  if (localStorage.getItem(KEY) !== today) {
    popup.classList.add('active');
  }

  function close() { popup.classList.remove('active'); }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  skipBtn.addEventListener('click', () => {
    localStorage.setItem(KEY, today);
    close();
  });
})();

// ── Scroll fade-in ────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-card, .program-card, .coach__careers li, .stat').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade-in.visible { opacity: 1; transform: none; }
  .feature-card:nth-child(2).fade-in { transition-delay: 0.08s; }
  .feature-card:nth-child(3).fade-in { transition-delay: 0.16s; }
  .feature-card:nth-child(4).fade-in { transition-delay: 0.24s; }
  .program-card:nth-child(2).fade-in { transition-delay: 0.08s; }
  .program-card:nth-child(3).fade-in { transition-delay: 0.16s; }
  .program-card:nth-child(4).fade-in { transition-delay: 0.24s; }
`;
document.head.appendChild(style);
