document.addEventListener("DOMContentLoaded", async () => {
  if (typeof cms === "undefined") return;

  const { data, error } = await cms
    .from("homepage")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    console.warn("Homepage data not loaded", error);
    return;
  }

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  const setImage = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.src = value;
  };

  setText("homeHeroTitle", data.hero_title);
  setText("homeHeroSubtitle", data.hero_subtitle);
  setImage("homeHeroImage", data.hero_image);

  setImage("founderImage", data.founder_image);
  setText("founderName", data.founder_name);
  setText("founderDescription", data.founder_description);

  setText("footerCompany", data.footer_company);
  setText("siteEmail", data.contact_email);
});
