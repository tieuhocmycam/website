/* ══════════════════════════════════════════════════
   TH MỸ CẨM – Main JavaScript
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────────
     1. STICKY HEADER SHADOW
  ──────────────────────────────────────────────── */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ────────────────────────────────────────────────
     2. HAMBURGER MENU (Mobile)
  ──────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navList   = document.getElementById('navList');

  hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
    const open = navList.classList.contains('open');
    hamburger.setAttribute('aria-expanded', open);
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.querySelector('a').addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  /* ────────────────────────────────────────────────
     3. HERO SLIDER
  ──────────────────────────────────────────────── */
  const slides  = document.querySelectorAll('.hero__slide');
  const dots    = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let   current = 0;
  let   autoSlide;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoSlide = setInterval(() => goToSlide(current + 1), 5000);
  }
  function stopAuto() { clearInterval(autoSlide); }

  prevBtn.addEventListener('click', () => { stopAuto(); goToSlide(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { stopAuto(); goToSlide(current + 1); startAuto(); });
  dots.forEach(d => d.addEventListener('click', () => {
    stopAuto(); goToSlide(+d.dataset.index); startAuto();
  }));

  // Touch swipe support
  let touchStartX = 0;
  const heroEl = document.getElementById('hero');
  heroEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  heroEl.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) { stopAuto(); goToSlide(diff > 0 ? current + 1 : current - 1); startAuto(); }
  });

  startAuto();

  /* ────────────────────────────────────────────────
     4. STATS COUNTER (Intersection Observer)
  ──────────────────────────────────────────────── */
  const statItems = document.querySelectorAll('.stat-item');
  let   counted   = false;

  function animateCount(el, target) {
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      statItems.forEach((item, i) => {
        const target = +item.dataset.target;
        animateCount(document.getElementById(`stat-${i}`), target);
      });
    }
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ────────────────────────────────────────────────
     5. TICKER – Duplicate content for seamless loop
  ──────────────────────────────────────────────── */
  const track = document.getElementById('tickerTrack');
  if (track) {
    const clone = track.innerHTML;
    track.innerHTML += clone; // duplicate for infinite scroll
  }

  /* ────────────────────────────────────────────────
     6. TIMELINE HORIZONTAL SCROLL
  ──────────────────────────────────────────────── */
  const tlWrapper = document.querySelector('.timeline-scroll-wrapper');
  const tlPrev    = document.getElementById('tlPrev');
  const tlNext    = document.getElementById('tlNext');
  const SCROLL_STEP = 300;

  if (tlPrev && tlNext && tlWrapper) {
    tlPrev.addEventListener('click', () => {
      tlWrapper.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
    });
    tlNext.addEventListener('click', () => {
      tlWrapper.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
    });

    // Drag to scroll
    let isDragging = false, startX, scrollLeft;
    tlWrapper.addEventListener('mousedown', e => {
      isDragging = true;
      startX     = e.pageX - tlWrapper.offsetLeft;
      scrollLeft = tlWrapper.scrollLeft;
      tlWrapper.style.userSelect = 'none';
    });
    tlWrapper.addEventListener('mouseleave', () => isDragging = false);
    tlWrapper.addEventListener('mouseup',    () => { isDragging = false; tlWrapper.style.userSelect = ''; });
    tlWrapper.addEventListener('mousemove',  e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - tlWrapper.offsetLeft;
      tlWrapper.scrollLeft = scrollLeft - (x - startX);
    });
  }

  /* ────────────────────────────────────────────────
     7. NEWS TABS FILTER
  ──────────────────────────────────────────────── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const newsCards = document.querySelectorAll('.news-card[data-cat]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.tab;
      newsCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => { card.style.transition = 'opacity .3s'; card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ────────────────────────────────────────────────
     8. SCROLL FADE-UP ANIMATIONS
  ──────────────────────────────────────────────── */
  const fadeEls = [
    '.stat-item', '.news-card', '.hub-card',
    '.tl-item', '.gallery-item', '.sidebar-card',
    '.about-content', '.about-image', '.value-item'
  ];

  fadeEls.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-up');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  /* ────────────────────────────────────────────────
     9. DOCUMENT FILTER BUTTON
  ──────────────────────────────────────────────── */
  const filterBtn = document.getElementById('filterBtn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const khoi = document.getElementById('filterKhoi').value;
      const mon  = document.getElementById('filterMon').value;
      const loai = document.getElementById('filterLoai').value;
      if (!khoi && !mon && !loai) {
        alert('Vui lòng chọn ít nhất một tiêu chí để tìm tài liệu.');
        return;
      }
      // In production: navigate to search results page with query params
      const params = new URLSearchParams();
      if (khoi) params.set('khoi', khoi);
      if (mon)  params.set('mon',  mon);
      if (loai) params.set('loai', loai);
      window.location.href = `pages/kho-tai-lieu.html?${params.toString()}`;
    });
  }

  /* ────────────────────────────────────────────────
    10. GALLERY LIGHTBOX (Simple)
  ──────────────────────────────────────────────── */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.querySelector('.gallery-overlay span')?.textContent || '';
      // Simple lightbox overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;
        display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;
        cursor:pointer;animation:fadeIn .3s ease;
      `;
      overlay.innerHTML = `
        <div style="color:#fff;font-family:Nunito;font-size:1.2rem;font-weight:700;opacity:.8">${caption}</div>
        <div style="width:80vw;max-width:700px;height:420px;background:linear-gradient(135deg,#e8f2fb,#d0e8f9);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#1A6FB5;font-size:4rem;opacity:.4"><i class="fas fa-image"></i></div>
        <div style="color:rgba(255,255,255,.5);font-size:.85rem">Click bất kỳ để đóng</div>
      `;
      const style = document.createElement('style');
      style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
      document.head.appendChild(style);
      overlay.addEventListener('click', () => { overlay.remove(); style.remove(); });
      document.body.appendChild(overlay);
    });
  });

  /* ────────────────────────────────────────────────
    11. SEARCH INPUT – Enter key
  ──────────────────────────────────────────────── */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) window.location.href = `pages/tim-kiem.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  /* ────────────────────────────────────────────────
    12. AUTO-CHECK ADMIN LOGIN ON MAIN HEADER
  ──────────────────────────────────────────────── */
  const loginBtn = document.getElementById('loginBtn') || document.querySelector('.btn-login');
  if (loginBtn) {
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
      // Xác định chính xác đang ở thư mục /pages/ hay root
      const isSubpage = window.location.pathname.indexOf('/pages/') !== -1;
      const adminPath = isSubpage ? 'admin.html' : 'pages/admin.html';
      
      loginBtn.innerHTML = '<i class="fas fa-user-cog"></i> Admin Panel';
      loginBtn.setAttribute('href', adminPath);
      
      // Thêm nút Đăng xuất nhỏ bên cạnh
      const actions = loginBtn.parentElement;
      if (actions && !document.getElementById('adminLogoutBtn')) {
        const logoutBtn = document.createElement('a');
        logoutBtn.id = 'adminLogoutBtn';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        logoutBtn.className = 'btn-login';
        logoutBtn.style.background = '#e53935';
        logoutBtn.style.padding = '9px 12px';
        logoutBtn.style.marginLeft = '8px';
        logoutBtn.setAttribute('href', 'javascript:void(0)');
        logoutBtn.setAttribute('title', 'Đăng xuất Admin');
        logoutBtn.addEventListener('click', () => {
          if (confirm('Bạn có muốn đăng xuất tài khoản Admin không?')) {
            localStorage.removeItem('isAdminLoggedIn');
            window.location.reload();
          }
        });
        actions.appendChild(logoutBtn);
      }
    }
  }

});
