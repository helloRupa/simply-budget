function scrollToY(top) {
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToTop() {
  scrollToY(0);
};

export function scrollToEl(id) {
  const el = document.getElementById(id);

  scrollToY(el.offsetTop);
};
