document.addEventListener("DOMContentLoaded", async () => {
  if (typeof cms === "undefined") return;

  const { data, error } = await cms.from("site_settings").select("*");

  if (error || !data) {
    console.warn("CMS data not loaded", error);
    return;
  }

  const settings = {};
  data.forEach((item) => {
    settings[item.setting_key] = item.setting_value;
  });

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  const setImage = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.src = value;
  };

  setText("homeHeroTitle", settings.hero_title);
  setText("homeHeroSubtitle", settings.hero_subtitle);
  setImage("homeHeroImage", settings.hero_image);

  setImage("founderImage", settings.founder_image);
  setText("founderName", settings.founder_name);
  setText("founderDescription", settings.founder_description);

  setText("footerCompany", settings.footer_company);
  setText("siteEmail", settings.contact_email);
});
