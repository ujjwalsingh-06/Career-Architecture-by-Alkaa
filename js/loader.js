document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("signatureLoader");
  if (!loader) return;

  const storageKey = "opparc-home-loader-seen";
  let alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem(storageKey) === "1";
    if (!alreadySeen) sessionStorage.setItem(storageKey, "1");
  } catch (error) {
    // Continue normally if browser storage is unavailable.
  }

  const finish = () => {
    loader.classList.add("hide-loader");
    document.body.classList.remove("loader-active");
    window.setTimeout(() => loader.remove(), 850);
  };

  if (alreadySeen) {
    finish();
    return;
  }

  const progress = document.getElementById("loaderProgress");
  const counter = document.getElementById("progressCounter");
  const status = document.getElementById("loadingStep");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const duration = reduceMotion ? 240 : 2100;
  const start = performance.now();

  const animate = (now) => {
    const ratio = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    const percent = Math.floor(eased * 100);

    if (progress) progress.style.width = `${percent}%`;
    if (counter) counter.textContent = `${percent}%`;

    if (ratio < 1) {
      requestAnimationFrame(animate);
    } else {
      if (progress) progress.style.width = "100%";
      if (counter) counter.textContent = "100%";
      if (status) status.textContent = "Entering OPPARC Advisory portal...";
      window.setTimeout(finish, reduceMotion ? 100 : 360);
    }
  };

  requestAnimationFrame(animate);
});
