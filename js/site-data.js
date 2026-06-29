/* OppARC Website Dynamic Data */

async function getSiteSetting(key) {
  const { data, error } = await supabaseClient
    .from("site_settings")
    .select("setting_value")
    .eq("setting_key", key)
    .single();

  if (error) {
    console.warn(key, error.message);
    return "";
  }

  return data?.setting_value || "";
}

async function loadHomepageData() {
  const heroTitle = await getSiteSetting("hero_title");
  const heroSubtitle = await getSiteSetting("hero_subtitle");

  const heroTitleEl = document.querySelector(".hero-content h1");
  const heroSubtitleEl = document.querySelector(".hero-text");

  if (heroTitle && heroTitleEl) heroTitleEl.textContent = heroTitle;
  if (heroSubtitle && heroSubtitleEl) heroSubtitleEl.textContent = heroSubtitle;
}

async function loadContactData() {
  const email = await getSiteSetting("contact_email");
  const phone = await getSiteSetting("contact_phone");

  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.textContent = email;
  });

  document.querySelectorAll("[data-contact-phone]").forEach((el) => {
    el.textContent = phone;
  });
}

async function loadSuccessStories() {
  const container = document.querySelector("[data-success-stories]");
  if (!container) return;

  const { data, error } = await supabaseClient
    .from("success_stories")
    .select("*")
    .order("id", { ascending: false });

  if (error) return console.warn(error.message);

  container.innerHTML = data
    .map(
      (story) => `
      <div class="story-card reveal">
        ${story.image_url ? `<img src="${story.image_url}" alt="${story.title}">` : ""}
        <span>Before</span>
        <h3>${story.title}</h3>
        <p>${story.before_text || story.description || ""}</p>
        <strong>${story.after_text || ""}</strong>
      </div>
    `
    )
    .join("");
}

async function loadResources() {
  const container = document.querySelector("[data-resources]");
  if (!container) return;

  const { data, error } = await supabaseClient
    .from("resources")
    .select("*")
    .order("id", { ascending: false });

  if (error) return console.warn(error.message);

  container.innerHTML = data
    .map(
      (item, index) => `
      <div class="mission-card reveal">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        ${item.link_url ? `<a href="${item.link_url}" class="small-link" target="_blank">Open Resource →</a>` : ""}
      </div>
    `
    )
    .join("");
}

async function loadMediaItems() {
  const container = document.querySelector("[data-media]");
  if (!container) return;

  const { data, error } = await supabaseClient
    .from("media_items")
    .select("*")
    .order("id", { ascending: false });

  if (error) return console.warn(error.message);

  container.innerHTML = data
    .map(
      (item, index) => `
      <div class="mission-card reveal">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${item.title}</h3>
        <p>${item.description || item.media_type || ""}</p>
        ${item.link_url ? `<a href="${item.link_url}" class="small-link" target="_blank">View Media →</a>` : ""}
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  if (typeof supabaseClient === "undefined") {
    console.warn("Supabase not loaded");
    return;
  }

  await loadHomepageData();
  await loadContactData();
  await loadSuccessStories();
  await loadResources();
  await loadMediaItems();
});
