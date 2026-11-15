'use strict';

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-category]')];
const filterCount = document.querySelector('[data-filter-count]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  const visibleCount = cards.filter(card => !card.hidden).length;
  if (filterCount) filterCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}${category === 'all' ? '' : ` · ${button.textContent.trim()}`}`;
}));

document.querySelectorAll('[data-video-src]').forEach(button => {
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = button.dataset.videoSrc;
    frame.title = button.dataset.videoTitle || 'Research video';
    frame.className = 'video-frame';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    button.replaceWith(frame);
    frame.focus();
  });
});

document.querySelectorAll('[data-current-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
