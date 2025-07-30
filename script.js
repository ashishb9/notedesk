// You can add JS for animation, interactivity, or dynamic content here
document.addEventListener("DOMContentLoaded", () => {
  console.log("NoteDesk site loaded.");

  // --- Scroll Animation Logic ---
  const scrollElements = document.querySelectorAll(".js-scroll");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) { // Adjust dividend for earlier/later trigger
        displayScrollElement(el);
      } else {
        // Optional: remove scrolled class if you want elements to animate every time they scroll into view
        // hideScrollElement(el);
      }
    });
  };

  // Initial check on load
  handleScrollAnimation();

  // Listen for scroll events
  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });
});