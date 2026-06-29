/* ===========================================================
   OppARC Admin Panel
   Part 1
   Login + Session + Navigation
=========================================================== */

const loginScreen = document.getElementById("loginScreen");
const adminApp = document.getElementById("adminApp");

const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".admin-section");

const toast = document.getElementById("toast");

/* --------------------------
   TOAST
--------------------------- */

function showToast(message) {

    if (!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* --------------------------
   LOGIN
--------------------------- */

loginForm?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const { error } =
        await supabaseClient.auth.signInWithPassword({

            email,
            password

        });

    if (error) {

        alert(error.message);

        return;

    }

    showToast("Login Successful");

    openDashboard();

});

/* --------------------------
   OPEN DASHBOARD
--------------------------- */

function openDashboard() {

    loginScreen.classList.add("hidden");

    adminApp.classList.remove("hidden");

}

/* --------------------------
   LOGOUT
--------------------------- */

logoutBtn?.addEventListener("click", async () => {

    await supabaseClient.auth.signOut();

    location.reload();

});

/* --------------------------
   SESSION CHECK
--------------------------- */

async function checkSession() {

    const {

        data: {

            session

        }

    } = await supabaseClient.auth.getSession();

    if (session) {

        openDashboard();

    }

}

checkSession();

/* --------------------------
   SIDEBAR NAVIGATION
--------------------------- */

navItems.forEach((button) => {

    button.addEventListener("click", () => {

        navItems.forEach((btn) =>

            btn.classList.remove("active")

        );

        button.classList.add("active");

        sections.forEach((section) =>

            section.classList.remove("active-section")

        );

        document
            .getElementById(button.dataset.section)
            .classList.add("active-section");

    });

});

/* ===========================================================
   NEXT PART
   Hero CRUD
   Contact CRUD
=========================================================== */
/* ===========================================================
   OppARC Admin Panel
   Part 2
   Hero + Contact Settings
=========================================================== */

const heroTitleInput = document.getElementById("heroTitle");
const heroSubtitleInput = document.getElementById("heroSubtitle");
const saveHeroBtn = document.getElementById("saveHeroBtn");

const contactEmailInput = document.getElementById("contactEmail");
const contactPhoneInput = document.getElementById("contactPhone");
const saveContactBtn = document.getElementById("saveContactBtn");

/* --------------------------
   GET SETTING
--------------------------- */

async function getSetting(key) {
  const { data, error } = await supabaseClient
    .from("site_settings")
    .select("setting_value")
    .eq("setting_key", key)
    .single();

  if (error) {
    console.error(error.message);
    return "";
  }

  return data?.setting_value || "";
}

/* --------------------------
   SAVE SETTING
--------------------------- */

async function saveSetting(key, value) {
  const { error } = await supabaseClient
    .from("site_settings")
    .upsert(
      {
        setting_key: key,
        setting_value: value,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: "setting_key"
      }
    );

  if (error) {
    console.error(error.message);
    showToast("Error: " + error.message);
    return false;
  }

  return true;
}

/* --------------------------
   LOAD HERO
--------------------------- */

async function loadHeroSettings() {
  if (!heroTitleInput || !heroSubtitleInput) return;

  heroTitleInput.value = await getSetting("hero_title");
  heroSubtitleInput.value = await getSetting("hero_subtitle");
}

/* --------------------------
   SAVE HERO
--------------------------- */

saveHeroBtn?.addEventListener("click", async () => {
  const title = heroTitleInput.value.trim();
  const subtitle = heroSubtitleInput.value.trim();

  if (!title || !subtitle) {
    showToast("Hero title and subtitle required");
    return;
  }

  saveHeroBtn.innerText = "Saving...";

  const titleSaved = await saveSetting("hero_title", title);
  const subtitleSaved = await saveSetting("hero_subtitle", subtitle);

  saveHeroBtn.innerText = "Save Hero Section";

  if (titleSaved && subtitleSaved) {
    showToast("Hero section saved");
  }
});

/* --------------------------
   LOAD CONTACT
--------------------------- */

async function loadContactSettings() {
  if (!contactEmailInput || !contactPhoneInput) return;

  contactEmailInput.value = await getSetting("contact_email");
  contactPhoneInput.value = await getSetting("contact_phone");
}

/* --------------------------
   SAVE CONTACT
--------------------------- */

saveContactBtn?.addEventListener("click", async () => {
  const email = contactEmailInput.value.trim();
  const phone = contactPhoneInput.value.trim();

  if (!email || !phone) {
    showToast("Email and phone required");
    return;
  }

  saveContactBtn.innerText = "Saving...";

  const emailSaved = await saveSetting("contact_email", email);
  const phoneSaved = await saveSetting("contact_phone", phone);

  saveContactBtn.innerText = "Save Contact Details";

  if (emailSaved && phoneSaved) {
    showToast("Contact details saved");
  }
});

/* --------------------------
   INITIAL LOAD
--------------------------- */

async function loadAdminSettings() {
  await loadHeroSettings();
  await loadContactSettings();
}

loadAdminSettings();

/* ===========================================================
   NEXT PART
   Stories + Resources + Media CRUD
=========================================================== */
/* ===========================================================
   OppARC Admin Panel
   Part 3
   Stories + Resources + Media CRUD
=========================================================== */

/* ===========================================================
   SUCCESS STORIES
=========================================================== */

const storyTitle = document.getElementById("storyTitle");
const storyBefore = document.getElementById("storyBefore");
const storyAfter = document.getElementById("storyAfter");
const storyDescription = document.getElementById("storyDescription");
const storyImage = document.getElementById("storyImage");
const addStoryBtn = document.getElementById("addStoryBtn");
const storiesList = document.getElementById("storiesList");

addStoryBtn?.addEventListener("click", async () => {

    const { error } = await supabaseClient
        .from("success_stories")
        .insert([{
            title: storyTitle.value,
            before_text: storyBefore.value,
            after_text: storyAfter.value,
            description: storyDescription.value,
            image_url: storyImage.value
        }]);

    if(error){
        showToast(error.message);
        return;
    }

    showToast("Story Added");

    storyTitle.value="";
    storyBefore.value="";
    storyAfter.value="";
    storyDescription.value="";
    storyImage.value="";

    loadStories();

});

async function loadStories(){

    if(!storiesList) return;

    const {data}=await supabaseClient
    .from("success_stories")
    .select("*")
    .order("id",{ascending:false});

    storiesList.innerHTML="";

    data?.forEach(item=>{

        storiesList.innerHTML+=`

        <div class="list-card">

            <div>

                <h4>${item.title}</h4>

                <p>${item.description ?? ""}</p>

            </div>

            <div class="list-actions">

                <button
                class="delete-btn"
                onclick="deleteStory(${item.id})">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

async function deleteStory(id){

    await supabaseClient
    .from("success_stories")
    .delete()
    .eq("id",id);

    showToast("Story Deleted");

    loadStories();

}

/* ===========================================================
   RESOURCES
=========================================================== */

const resourceTitle=document.getElementById("resourceTitle");
const resourceCategory=document.getElementById("resourceCategory");
const resourceDescription=document.getElementById("resourceDescription");
const resourceLink=document.getElementById("resourceLink");
const addResourceBtn=document.getElementById("addResourceBtn");
const resourcesList=document.getElementById("resourcesList");

addResourceBtn?.addEventListener("click",async()=>{

await supabaseClient

.from("resources")

.insert([{

title:resourceTitle.value,

category:resourceCategory.value,

description:resourceDescription.value,

link_url:resourceLink.value

}]);

showToast("Resource Added");

loadResources();

});

async function loadResources(){

const {data}=await supabaseClient

.from("resources")

.select("*")

.order("id",{ascending:false});

resourcesList.innerHTML="";

data?.forEach(item=>{

resourcesList.innerHTML+=`

<div class="list-card">

<div>

<h4>${item.title}</h4>

<p>${item.category ?? ""}</p>

</div>

<div class="list-actions">

<button
class="delete-btn"
onclick="deleteResource(${item.id})">

Delete

</button>

</div>

</div>

`;

});

}

async function deleteResource(id){

await supabaseClient

.from("resources")

.delete()

.eq("id",id);

showToast("Deleted");

loadResources();

}

/* ===========================================================
   MEDIA
=========================================================== */

const mediaTitle=document.getElementById("mediaTitle");
const mediaType=document.getElementById("mediaType");
const mediaDescription=document.getElementById("mediaDescription");
const mediaLink=document.getElementById("mediaLink");
const addMediaBtn=document.getElementById("addMediaBtn");
const mediaList=document.getElementById("mediaList");

addMediaBtn?.addEventListener("click",async()=>{

await supabaseClient

.from("media_items")

.insert([{

title:mediaTitle.value,

media_type:mediaType.value,

description:mediaDescription.value,

link_url:mediaLink.value

}]);

showToast("Media Added");

loadMedia();

});

async function loadMedia(){

const {data}=await supabaseClient

.from("media_items")

.select("*")

.order("id",{ascending:false});

mediaList.innerHTML="";

data?.forEach(item=>{

mediaList.innerHTML+=`

<div class="list-card">

<div>

<h4>${item.title}</h4>

<p>${item.media_type ?? ""}</p>

</div>

<div class="list-actions">

<button
class="delete-btn"
onclick="deleteMedia(${item.id})">

Delete

</button>

</div>

</div>

`;

});

}

async function deleteMedia(id){

await supabaseClient

.from("media_items")

.delete()

.eq("id",id);

showToast("Deleted");

loadMedia();

}

/* ===========================================================
   INITIAL LOAD
=========================================================== */

loadStories();

loadResources();

loadMedia();

console.log("OppARC Admin Ready");
const adminMenuBtn = document.getElementById("adminMenuBtn");
const adminSidebar = document.querySelector(".admin-sidebar");

adminMenuBtn?.addEventListener("click", () => {
  adminSidebar?.classList.toggle("active");
});

document.querySelectorAll(".admin-nav .nav-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 1100) {
      adminSidebar?.classList.remove("active");
    }
  });
});
const hpHeroTitle = document.getElementById("hpHeroTitle");
const hpHeroSubtitle = document.getElementById("hpHeroSubtitle");
const hpHeroImage = document.getElementById("hpHeroImage");
const hpFounderName = document.getElementById("hpFounderName");
const hpFounderDescription = document.getElementById("hpFounderDescription");
const hpFounderImage = document.getElementById("hpFounderImage");
const hpFooterCompany = document.getElementById("hpFooterCompany");
const hpEmail = document.getElementById("hpEmail");
const hpPhone = document.getElementById("hpPhone");
const saveHomepageBtn = document.getElementById("saveHomepageBtn");

async function loadHomepageEditor() {
  const { data, error } = await supabaseClient
    .from("homepage")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) return;

  hpHeroTitle.value = data.hero_title || "";
  hpHeroSubtitle.value = data.hero_subtitle || "";
  hpHeroImage.value = data.hero_image || "";
  hpFounderName.value = data.founder_name || "";
  hpFounderDescription.value = data.founder_description || "";
  hpFounderImage.value = data.founder_image || "";
  hpFooterCompany.value = data.footer_company || "";
  hpEmail.value = data.contact_email || "";
  hpPhone.value = data.contact_phone || "";
}

saveHomepageBtn?.addEventListener("click", async () => {
  const { error } = await supabaseClient
    .from("homepage")
    .update({
      hero_title: hpHeroTitle.value,
      hero_subtitle: hpHeroSubtitle.value,
      hero_image: hpHeroImage.value,
      founder_name: hpFounderName.value,
      founder_description: hpFounderDescription.value,
      founder_image: hpFounderImage.value,
      footer_company: hpFooterCompany.value,
      contact_email: hpEmail.value,
      contact_phone: hpPhone.value,
      updated_at: new Date().toISOString()
    })
    .eq("id", 1);

  if (error) {
    showToast(error.message);
    return;
  }

  showToast("Homepage Updated");
});

loadHomepageEditor();
