document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("signatureLoader");

  if (!loader) return;

  document.body.classList.add("loader-active");

  const showWebsite = () => {
    loader.classList.add("hide-loader");
    document.body.classList.remove("loader-active");
    document.body.classList.add("loader-done");

    setTimeout(() => {
      loader.remove();
    }, 1100);
  };

  const runFallback = () => {
    const paths = document.querySelectorAll(".sig-path, .sig-underline");

    paths.forEach((path, index) => {
      path.style.transition = `stroke-dashoffset ${index === 0 ? 2.6 : 1.1}s ease`;
      setTimeout(() => {
        path.style.strokeDashoffset = "0";
      }, index === 0 ? 500 : 2600);
    });

    document.querySelector(".loader-brand").style.cssText =
      "opacity:1;transform:translateY(0);transition:all .8s ease";

    setTimeout(() => {
      document.querySelector(".signature-name").style.cssText =
        "opacity:1;transform:translateY(0);transition:all .9s ease";
      document.querySelector(".loader-subtitle").style.cssText =
        "opacity:1;transition:all .9s ease";
    }, 2800);

    setTimeout(showWebsite, 4400);
  };

  if (typeof gsap === "undefined") {
    runFallback();
    return;
  }

  const tl = gsap.timeline();

  tl.to(".loader-brand", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  })
    .to(".sig-path", {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut"
    }, "-=0.2")
    .to(".sig-underline", {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: "power2.out"
    }, "-=0.3")
    .to(".signature-name", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2")
    .to(".loader-subtitle", {
      opacity: 1,
      duration: 0.6
    }, "-=0.4")
    .to(".signature-content", {
      scale: 1.04,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(".signature-content", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: showWebsite
    });
});
