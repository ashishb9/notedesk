// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Animate cards one by one
  const cards = document.querySelectorAll('.card, .note, .topics button');
  cards.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
  });

  // Optional: Scroll reveal effect (can be enhanced later)
  const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.card, .note, .topics button');
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
});
