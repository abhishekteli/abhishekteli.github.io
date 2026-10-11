(() => {
  const root = document.documentElement;
  const motion = document.querySelector('#motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setPaused(paused) {
    root.classList.toggle('motion-paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
  }
  setPaused(preference.matches);
  motion.addEventListener('click', () => setPaused(!root.classList.contains('motion-paused')));
  preference.addEventListener('change', event => setPaused(event.matches));
  document.querySelector('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !preference.matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(section => {
      section.classList.add('reveal-ready');
      observer.observe(section);
    });
  }
})();
