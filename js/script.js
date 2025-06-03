function loadLanguage(lang) {
  fetch('lang/' + lang + '.json')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          if (el.tagName.toLowerCase() === 'input') {
            el.placeholder = data[key];
          } else {
            el.textContent = data[key];
          }
        }
      });
      document.documentElement.lang = lang;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadLanguage('en');
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => loadLanguage(btn.dataset.lang));
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => observer.observe(section));
});
