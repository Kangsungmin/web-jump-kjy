import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey:            "AIzaSyCxYWR7eMoMSD5oWgMjvFWcPLmnxVHMuPw",
  authDomain:        "web-jump-kjy.firebaseapp.com",
  projectId:         "web-jump-kjy",
  storageBucket:     "web-jump-kjy.firebasestorage.app",
  messagingSenderId: "950785095325",
  appId:             "1:950785095325:web:6dc3e6aad57d6e934c8674",
  measurementId:     "G-6PTFKMEV3M",
};

const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function track(eventName, params = {}) {
  logEvent(analytics, eventName, params);
}

// ── 1. 전화 상담 클릭 (위치별 구분) ──────────────────
document.querySelectorAll('a[href="tel:031-949-8253"]').forEach(el => {
  // 프로그램 카드 상담 클릭은 아래 섹션(2번)에서 별도 처리
  if (el.classList.contains('program-card__cta')) return;

  el.addEventListener('click', () => {
    let location = 'unknown';
    if (el.classList.contains('btn--header'))    location = 'header';
    else if (el.closest('#hero'))                location = 'hero';
    else if (el.closest('.cta-banner'))          location = 'cta_banner';
    else if (el.closest('#contact'))             location = 'contact';
    track('phone_call_click', { location });
  });
});

// ── 2. 프로그램별 상담 클릭 ──────────────────────────
document.querySelectorAll('.program-card__cta').forEach(el => {
  el.addEventListener('click', () => {
    const card    = el.closest('.program-card');
    const step    = card?.querySelector('.program-card__step')?.textContent.trim() ?? 'unknown';
    const nameNode = card?.querySelector('h3')?.childNodes[0];
    const name    = nameNode?.textContent?.trim() ?? 'unknown';
    track('program_inquiry_click', { program: name, step });
  });
});

// ── 3. 네이버 지도 클릭 ──────────────────────────────
document.querySelectorAll('a[href*="map.naver.com"]').forEach(el => {
  el.addEventListener('click', () => {
    const location = el.closest('.map__overlay') ? 'contact_map' : 'reviews_cta';
    track('naver_map_click', { location });
  });
});

// ── 4. 네이버 리뷰 더보기 클릭 ───────────────────────
document.querySelector('.reviews__cta a')?.addEventListener('click', () => {
  track('naver_review_more_click');
});

// ── 5. 유튜브 채널 클릭 ──────────────────────────────
document.querySelectorAll('a[href*="youtube.com/channel"]').forEach(el => {
  el.addEventListener('click', () => {
    const location = el.closest('.yt-section') ? 'youtube_section'
                   : el.closest('.footer')     ? 'footer'
                   : el.closest('#contact')    ? 'contact'
                   : 'unknown';
    track('youtube_channel_click', { location });
  });
});

// ── 6. 캐러셀 화살표 클릭 ────────────────────────────
document.getElementById('prevBtn')?.addEventListener('click', () => {
  track('carousel_navigation', { direction: 'prev' });
});
document.getElementById('nextBtn')?.addEventListener('click', () => {
  track('carousel_navigation', { direction: 'next' });
});

// ── 7. 스크롤 깊이 (25 / 50 / 75 / 100%) ────────────
const scrollReached = new Set();
window.addEventListener('scroll', () => {
  const pct = Math.round(
    (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
  );
  [25, 50, 75, 100].forEach(milestone => {
    if (pct >= milestone && !scrollReached.has(milestone)) {
      scrollReached.add(milestone);
      track('scroll_depth', { percent: milestone });
    }
  });
}, { passive: true });

// ── 8. 수상 팝업 인터랙션 ────────────────────────────
document.getElementById('awardCloseBtn')?.addEventListener('click', () => {
  track('award_popup_close');
});
document.getElementById('awardSkipBtn')?.addEventListener('click', () => {
  track('award_popup_skip_today');
});
