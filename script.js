document.addEventListener("DOMContentLoaded", () => {
  console.log("NoteDesk site loaded.");

  // Function for scroll-triggered animations (for .js-scroll elements)
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
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        // Optional: Uncomment to make elements animate out when scrolled past
        // hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Initial check on load
  handleScrollAnimation();

  // --- New JavaScript for About Page Hero Shrink ---
  const aboutHero = document.querySelector(".hero.about-hero");
  const aboutPageContainer = document.querySelector(".about-page-container");

  if (aboutHero && aboutPageContainer) {
    const observerOptions = {
      root: null, // relative to the viewport
      rootMargin: "0px",
      threshold: 0.1 // Trigger when 10% of the target is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If about content is intersecting, add class to body
          document.body.classList.add("scrolled-about");
        } else {
          // If about content is no longer intersecting, remove class
          // This means when you scroll back up and the container is out of view
          document.body.classList.remove("scrolled-about");
        }
      });
    }, observerOptions);

    observer.observe(aboutPageContainer);
  }
});
