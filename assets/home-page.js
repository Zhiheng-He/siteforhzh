(() => {
  const data = window.HOME_DATA;
  document.querySelectorAll('[data-home="name"]').forEach(element => element.textContent = data.name);
  ['headlineFirst','headlineEmphasis','intro'].forEach(key => document.querySelectorAll(`[data-home="${key}"]`).forEach(element => element.textContent = data[key] || ''));
  const headline = document.querySelector('.home-intro h1');
  const intro = document.querySelector('[data-home="intro"]');
  if (headline && intro) { const nameplate = document.createElement('p'); nameplate.className = 'home-nameplate'; nameplate.innerHTML = `<span>${data.name}</span><i aria-hidden="true">.</i>`; headline.replaceWith(nameplate); }
  const portraitLabel = document.querySelector('[data-home="portraitLabel"]'); portraitLabel.innerHTML = (data.portraitLabel || 'YOUR\nPORTRAIT').replace(/\n/g, '<br />');
  const portrait = document.querySelector('[data-portrait]'); if (data.portrait) { portrait.style.backgroundImage = `url('${data.portrait}')`; portrait.style.backgroundSize = 'cover'; portrait.style.backgroundPosition = 'center'; portraitLabel.hidden = true; }
  const email = document.querySelector('[data-home-email]'); email.href = `mailto:${data.email}`;
  const cv = document.querySelector('[data-home-cv]'); cv.href = data.cvUrl || '#';
  document.querySelector('[data-home-news]').innerHTML = data.news.map(item => `<li><p>${item.text}</p></li>`).join('');
  document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
})();
