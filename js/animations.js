// Premium Animations JS

gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  gsap.to(".loader-text", {
    y: -40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  setTimeout(() => {
    loader?.classList.add("hide");
  }, 900);
});

// Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.25,
  smoothWheel: true,
  wheelMultiplier: 0.9,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Header Scroll
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
});

// Custom Cursor
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
  });

  gsap.to(follower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.35,
  });
});

document.querySelectorAll("a, button, .magnetic").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(follower, {
      scale: 1.8,
      duration: 0.3,
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(follower, {
      scale: 1,
      duration: 0.3,
    });
  });
});

// Split Title Animation
const splitTitle = document.querySelector(".split-title");

if (splitTitle) {
  const words = splitTitle.textContent.trim().split(" ");
  splitTitle.innerHTML = words
    .map((word) => `<span>${word}&nbsp;</span>`)
    .join("");

  gsap.to(".split-title span", {
    y: 0,
    opacity: 1,
    duration: 1.1,
    stagger: 0.08,
    ease: "power4.out",
    delay: 1,
  });
}

// Fade Up Hero
gsap.utils.toArray(".fade-up").forEach((el, index) => {
  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 1.2 + index * 0.15,
    ease: "power3.out",
  });
});

// Reveal Elements
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
  });
});

// Image Reveal
gsap.utils.toArray(".image-reveal").forEach((el) => {
  el.classList.remove("active");

  ScrollTrigger.create({
    trigger: el,
    start: "top 82%",
    onEnter: () => el.classList.add("active"),
  });
});

// Floating Badges
gsap.to(".badge-one", {
  y: -20,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

gsap.to(".badge-two", {
  y: 20,
  duration: 3.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// Magnetic Button Effect
document.querySelectorAll(".magnetic").forEach((magnet) => {
  magnet.addEventListener("mousemove", function (e) {
    const rect = magnet.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(magnet, {
      x: x * 0.22,
      y: y * 0.22,
      duration: 0.35,
      ease: "power3.out",
    });
  });

  magnet.addEventListener("mouseleave", function () {
    gsap.to(magnet, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.35)",
    });
  });
});

// Horizontal Scroll Journey Section
const journeyTrack = document.querySelector(".journey-track");

if (journeyTrack) {
  let scrollWidth = journeyTrack.scrollWidth - window.innerWidth;

  gsap.to(journeyTrack, {
    x: -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: ".journey-section",
      start: "top top",
      end: () => `+=${journeyTrack.scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
}

// Counter Animation
const counters = document.querySelectorAll("[data-count]");

counters.forEach((counter) => {
  const target = Number(counter.getAttribute("data-count"));

  ScrollTrigger.create({
    trigger: counter,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2.2,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            counter.innerText = Math.floor(counter.innerText);

            if (target >= 1000) {
              counter.innerText = Math.floor(counter.innerText) + "+";
            }
          },
          onComplete: function () {
            counter.innerText = target + "+";
          },
        }
      );
    },
  });
});

// Parallax Background Text
gsap.to(".hero-bg-text", {
  yPercent: 18,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-premium-hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle?.addEventListener("click", () => {
  navbar?.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Refresh ScrollTrigger after images load
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
