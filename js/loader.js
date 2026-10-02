document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("signatureLoader");
  if (!loader) return;

  const storageKey = "opparc-home-loader-seen";
  let alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem(storageKey) === "1";
    if (!alreadySeen) sessionStorage.setItem(storageKey, "1");
  } catch (error) {
    // If storage is unavailable, the loader still works for this page load.
  }

  const finish = () => {
    loader.classList.add("hide-loader");
    document.body.classList.remove("loader-active");
    window.setTimeout(() => loader.remove(), 900);
  };

  if (alreadySeen) {
    finish();
    return;
  }

  const progressBar = document.getElementById("loaderProgress");
  const counter = document.getElementById("progressCounter");
  const status = document.getElementById("loadingStep");
  const pillars = [...document.querySelectorAll(".loader-pillar")];
  const phases = [
    [0, "Initializing architectural framework..."],
    [24, "Calibrating market intelligence & signals..."],
    [48, "Aligning leadership positioning data..."],
    [72, "Activating cross-border opportunity networks..."],
    [94, "Entering OPPARC Advisory portal..."]
  ];
  const start = performance.now();
  const duration = 4200;
  let phaseIndex = -1;

  const update = (now) => {
    const ratio = Math.min((now - start) / duration, 1);
    const eased = ratio < 0.5 ? 2 * ratio * ratio : -1 + (4 - 2 * ratio) * ratio;
    const percent = Math.min(100, Math.floor(eased * 100));
    const nextPhase = phases.reduce((current, phase, index) => percent >= phase[0] ? index : current, 0);

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (counter) counter.textContent = `${percent}%`;
    if (status && nextPhase !== phaseIndex) {
      phaseIndex = nextPhase;
      status.textContent = phases[nextPhase][1];
    }

    const activePillar = Math.min(3, Math.floor(percent / 25));
    pillars.forEach((pillar, index) => {
      pillar.classList.toggle("is-active", index === activePillar);
      pillar.classList.toggle("is-complete", index < activePillar);
    });

    if (ratio < 1) {
      requestAnimationFrame(update);
    } else {
      if (progressBar) progressBar.style.width = "100%";
      if (counter) counter.textContent = "100%";
      if (status) status.textContent = phases[4][1];
      pillars.forEach((pillar) => {
        pillar.classList.remove("is-active");
        pillar.classList.add("is-complete");
      });
      window.setTimeout(finish, 420);
    }
  };

  requestAnimationFrame(update);
});
