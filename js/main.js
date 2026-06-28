// Main JS

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  // Sticky header fallback
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Mobile menu
  menuToggle?.addEventListener("click", () => {
    navbar?.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu after link click
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar?.classList.remove("active");
      menuToggle?.classList.remove("active");
    });
  });

  // Active nav by current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Smooth anchor scroll fallback
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loaded class
  document.body.classList.add("page-loaded");
});
