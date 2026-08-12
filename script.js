document.addEventListener('DOMContentLoaded', () => {

  /* ===== Year in footer ===== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ===== Nav scroll state + mobile toggle ===== */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinksWrap = document.getElementById('nav-links');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    toTopBtn.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  navLinksWrap.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== Menu tabs ===== */
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelector(`.menu-panel[data-panel="${target}"]`).classList.add('active');
    });
  });

  /* ===== Scroll reveal ===== */
  const revealTargets = document.querySelectorAll(
    '.about-visual, .about-copy, .fact, .menu-tabs, .menu-panel.active, .visit-copy, .visit-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => io.observe(el));

  /* ===== Back to top ===== */
  const toTopBtn = document.getElementById('toTop');
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Contact form (front-end only demo) ===== */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    note.textContent = `Thanks${name ? ', ' + name : ''} — we'll get back to you soon.`;
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 5000);
  });

});
