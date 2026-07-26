// =================================================
// Taishi Katsura official site - script.js
// =================================================

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     1. スクロールで要素がふわっと浮かび上がる演出
  ------------------------------------------------- */
  const fadeTargets = document.querySelectorAll(
    '.profile-block, .history-block, .timeline-item, ' +
    '.favorite-card-link, .instagram-card'
  );

  fadeTargets.forEach(el => el.classList.add('js-fade-in'));

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('js-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  fadeTargets.forEach(el => fadeObserver.observe(el));


  /* -------------------------------------------------
     2. タイムライン項目を時間差で表示
  ------------------------------------------------- */
  document.querySelectorAll('.timeline').forEach(timeline => {
    const items = timeline.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.12}s`;
    });
  });


  /* -------------------------------------------------
     3. ヘッダー：スクロールで縮めて影をつける
  ------------------------------------------------- */
  const header = document.querySelector('header, .site-header');

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('js-scrolled');
      } else {
        header.classList.remove('js-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* -------------------------------------------------
     4. トップページのファーストビューを順番に表示
  ------------------------------------------------- */
  const firstViewText = document.querySelector('.first-view-text');
  if (firstViewText) {
    const children = firstViewText.querySelectorAll('h1, p, a.btn');
    children.forEach((el, index) => {
      el.classList.add('js-hero-item');
      setTimeout(() => {
        el.classList.add('js-visible');
      }, 200 + index * 250);
    });
  }


  /* -------------------------------------------------
     5. 現在のページのナビリンクをハイライト
  ------------------------------------------------- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a, .header-site-menu a, .footer-site-menu a')
    .forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('js-current');
      }
    });


  /* -------------------------------------------------
     6. ページ上部に戻るボタン
  ------------------------------------------------- */
  const toTopBtn = document.createElement('button');
  toTopBtn.textContent = '↑';
  toTopBtn.className = 'js-to-top';
  toTopBtn.setAttribute('aria-label', 'ページ上部へ戻る');
  document.body.appendChild(toTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTopBtn.classList.add('js-visible');
    } else {
      toTopBtn.classList.remove('js-visible');
    }
  }, { passive: true });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});