document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("signatureLoader");
  if (!loader) return;

  const revealSite = () => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";
    document.body.style.overflow = "auto";

    setTimeout(() => {
      loader.remove();
    }, 800);
  };

  document.body.style.overflow = "hidden";

  const brand = document.querySelector(".loader-brand");
  const signWrap = document.querySelector(".real-signature-wrap");
  const subtitle = document.querySelector(".loader-subtitle");

  if (brand) {
    brand.style.opacity = "1";
    brand.style.transform = "translateY(0)";
  }

  if (signWrap) {
    signWrap.style.clipPath = "inset(0 100% 0 0)";
    signWrap.style.transition = "clip-path 2.5s ease";
    setTimeout(() => {
      signWrap.style.clipPath = "inset(0 0% 0 0)";
    }, 500);
  }

  if (subtitle) {
    setTimeout(() => {
      subtitle.style.opacity = "1";
    }, 2200);
  }

  setTimeout(revealSite, 4200);
});
