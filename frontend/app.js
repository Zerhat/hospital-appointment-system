/* =========================================================
   HAS · Hospital Appointment System — Frontend
   Backend aynı sunucuda çalıştığı için istekler göreli adreslere gider.
   ========================================================= */

// =========================================================
// 1) ÇOK DİLLİ YAPI (TR / EN)
// =========================================================
const I18N = {
  tr: {
    pageTitle: "HAS · Hastane Randevu Sistemi",
    brandSub: "Hastane Randevu Sistemi",
    heroTitle: "Doğru hekime,<br>doğru zamanda ulaşın.",
    feat1: "81 il, 973 ilçe ve 1.000'den fazla hastane",
    feat2: "Çakışmasız randevu: her saat yalnızca bir hastaya",
    feat3: "Semptomlarınıza göre klinik öneren akıllı asistan",
    footNote: "CEN317 Engineering Design · Çukurova Üniversitesi",
    loginTitle: "Giriş Yap",
    loginSub: "Randevularınızı yönetmek için hesabınıza giriş yapın.",
    emailPh: "E-posta adresi",
    passwordPh: "Parola",
    showPassword: "Parolayı göster",
    loginBtn: "Giriş",
    or: "veya",
    registerLink: "Üye Ol",
    demoHint: "Deneme hesabı: <b>hasta@test.com</b> / <b>123456</b>",
    regTitle: "Üye Ol",
    regSub: "Birkaç bilgiyle hesabınızı oluşturun.",
    fullNamePh: "Ad Soyad",
    regPasswordPh: "Parola (en az 6 karakter)",
    regBtn: "Hesap Oluştur",
    haveAccount: "Zaten hesabım var, giriş yap",
    navHome: "Ana Sayfa",
    navBook: "Randevu Al",
    navMy: "Randevularım",
    logout: "Çıkış yap",
    welcome: "Hoş geldiniz",
    greeting: "Merhaba, {name}",
    whatToDo: "Ne yapmak istersiniz?",
    cardBookTitle: "Hastaneden Randevu Al",
    cardBookSub: "İl, ilçe, klinik ve hekim seçerek randevu alın",
    cardMySub: "Aktif ve geçmiş randevularınızı görüntüleyin",
    cardTriage: "Akıllı Ön Triyaj",
    soon: "Yakında",
    cardTriageSub: "Şikâyetinizi yazın, size uygun kliniği önerelim",
    upcomingTitle: "Yaklaşan Randevunuz",
    noUpcoming: "Yaklaşan randevunuz yok.",
    bookNow: "Hemen randevu alın →",
    step1: "Arama", step2: "Hekim", step3: "Gün ve Saat", step4: "Onay",
    searchTitle: "Randevu Arama",
    searchSub: "Yıldızlı alanlar zorunludur. Diğerlerinde \"Fark Etmez\" seçebilirsiniz.",
    cityLabel: "İl *", districtLabel: "İlçe", clinicLabel: "Klinik *",
    hospitalLabel: "Hastane", doctorLabel: "Hekim",
    selectCity: "İl seçiniz", any: "Fark Etmez", cityFirst: "Önce il seçiniz", selectClinic: "Klinik seçiniz",
    clear: "Temizle", search: "Randevu Ara",
    resultsTitle: "Uygun Hekimler",
    changeSearch: "← Aramayı Değiştir",
    resultInfo: "{where} · {branch} · {n} hekim (en erken randevuya göre sıralı)",
    noDoctors: "Bu kriterlere uygun hekim bulunamadı. Aramayı genişletmeyi deneyin.",
    earliest: "En yakın: {date}",
    noSlots14: "14 gün içinde boş yer yok",
    pick: "Randevu Seç",
    changeDoctor: "← Hekim Değiştir",
    pickDay: "Gün seçin",
    free: "{n} boş",
    noDays: "Bu hekimin önümüzdeki 14 gün içinde boş randevusu yok.",
    pickTime: "{date} · Saat seçin",
    morning: "Sabah", afternoon: "Öğleden Sonra",
    noSlotsDay: "Bu günde boş saat kalmadı.",
    confirmTitle: "Randevuyu onaylıyor musunuz?",
    confirmSub: "Lütfen bilgileri kontrol edin.",
    lDoctor: "Hekim", lClinic: "Klinik", lHospital: "Hastane", lLocation: "Konum", lDate: "Tarih", lTime: "Saat",
    back: "Vazgeç",
    confirmBtn: "Randevuyu Onayla",
    bookedTitle: "Randevunuz oluşturuldu",
    bookedSub: "{date}, saat <b>{time}</b><br>{doctor} · {hospital}",
    newAppt: "Yeni Randevu",
    tabActive: "Aktif", tabPast: "Geçmiş / İptal",
    statusCancelled: "İptal edildi", statusActive: "Aktif", statusPast: "Geçmiş",
    cancelBtn: "İptal Et",
    noActive: "Aktif randevunuz bulunmuyor.",
    noPast: "Geçmiş veya iptal edilmiş randevunuz yok.",
    cancelTitle: "Randevu iptal edilsin mi?",
    cancelYes: "İptal Et",
    cancelledToast: "Randevunuz iptal edildi",
    genericError: "İşlem başarısız oldu",
    navTriage: "Ön Triyaj",
    aiTag: "Yapay Zekâ",
    triageSub: "Şikâyetinizi kendi cümlelerinizle yazın; size uygun polikliniği önerelim.",
    triagePh: "Örn: 3 gündür boğazım ağrıyor, yutkunurken zorlanıyorum ve hafif ateşim var.",
    examples: ["Boğazım ağrıyor ve ateşim var", "Dizimi burktum, şişti", "Kollarımda kaşıntılı kızarıklık var"],
    disclaimer: "Bu asistan teşhis koymaz ve ilaç önermez; yalnızca hangi kliniğe başvurabileceğinizi önerir. Acil durumlarda 112'yi arayın.",
    analyze: "Klinik Öner",
    analyzing: "Analiz ediliyor…",
    resultLabel: "Önerilen klinik",
    urgency_routine: "Normal randevu yeterli",
    urgency_urgent: "1-2 gün içinde muayene önerilir",
    emergencyTitle: "Acil durum olabilir",
    lUrgency: "Aciliyet",
    call112: "112'yi Ara",
    bookThis: "Bu klinikten randevu al",
    alsoConsider: "Diğer seçenekler:",
    source_llm: "Yapay zekâ ({provider}) tarafından önerildi",
    source_rules: "Kural tabanlı yedek mod ile önerildi",
    "source_safety-rules": "Güvenlik kuralı ile tespit edildi",
    hintBranch: "Önerilen klinik: <b>{branch}</b>. İl seçtiğinizde otomatik olarak seçilecek.",
    months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
    daysShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  },
  en: {
    pageTitle: "HAS · Hospital Appointment System",
    brandSub: "Hospital Appointment System",
    heroTitle: "The right doctor,<br>at the right time.",
    feat1: "81 provinces, 973 districts and 1,000+ hospitals",
    feat2: "Conflict-free booking: one patient per time slot",
    feat3: "Smart assistant that suggests a clinic from your symptoms",
    footNote: "CEN317 Engineering Design · Çukurova University",
    loginTitle: "Sign In",
    loginSub: "Sign in to manage your appointments.",
    emailPh: "E-mail address",
    passwordPh: "Password",
    showPassword: "Show password",
    loginBtn: "Sign In",
    or: "or",
    registerLink: "Sign Up",
    demoHint: "Demo account: <b>hasta@test.com</b> / <b>123456</b>",
    regTitle: "Create Account",
    regSub: "Create your account in a few steps.",
    fullNamePh: "Full name",
    regPasswordPh: "Password (min. 6 characters)",
    regBtn: "Create Account",
    haveAccount: "I already have an account, sign in",
    navHome: "Home",
    navBook: "Book Appointment",
    navMy: "My Appointments",
    logout: "Sign out",
    welcome: "Welcome",
    greeting: "Hello, {name}",
    whatToDo: "What would you like to do?",
    cardBookTitle: "Book a Hospital Appointment",
    cardBookSub: "Choose a province, district, clinic and doctor",
    cardMySub: "View your upcoming and past appointments",
    cardTriage: "Smart Pre-Triage",
    soon: "Coming soon",
    cardTriageSub: "Describe your complaint and we will suggest a clinic",
    upcomingTitle: "Your Next Appointment",
    noUpcoming: "You have no upcoming appointments.",
    bookNow: "Book one now →",
    step1: "Search", step2: "Doctor", step3: "Date & Time", step4: "Confirm",
    searchTitle: "Find an Appointment",
    searchSub: "Fields marked * are required. You can choose \"Any\" for the others.",
    cityLabel: "Province *", districtLabel: "District", clinicLabel: "Clinic *",
    hospitalLabel: "Hospital", doctorLabel: "Doctor",
    selectCity: "Select a province", any: "Any", cityFirst: "Select a province first", selectClinic: "Select a clinic",
    clear: "Clear", search: "Search",
    resultsTitle: "Available Doctors",
    changeSearch: "← Change Search",
    resultInfo: "{where} · {branch} · {n} doctors (sorted by earliest availability)",
    noDoctors: "No doctors match these criteria. Try broadening your search.",
    earliest: "Earliest: {date}",
    noSlots14: "No availability in 14 days",
    pick: "Select",
    changeDoctor: "← Change Doctor",
    pickDay: "Select a day",
    free: "{n} free",
    noDays: "This doctor has no availability in the next 14 days.",
    pickTime: "{date} · Select a time",
    morning: "Morning", afternoon: "Afternoon",
    noSlotsDay: "No free slots left on this day.",
    confirmTitle: "Confirm your appointment?",
    confirmSub: "Please review the details.",
    lDoctor: "Doctor", lClinic: "Clinic", lHospital: "Hospital", lLocation: "Location", lDate: "Date", lTime: "Time",
    back: "Go Back",
    confirmBtn: "Confirm Appointment",
    bookedTitle: "Your appointment is booked",
    bookedSub: "{date} at <b>{time}</b><br>{doctor} · {hospital}",
    newAppt: "New Appointment",
    tabActive: "Upcoming", tabPast: "Past / Cancelled",
    statusCancelled: "Cancelled", statusActive: "Upcoming", statusPast: "Past",
    cancelBtn: "Cancel",
    noActive: "You have no upcoming appointments.",
    noPast: "You have no past or cancelled appointments.",
    cancelTitle: "Cancel this appointment?",
    cancelYes: "Cancel Appointment",
    cancelledToast: "Your appointment has been cancelled",
    genericError: "Operation failed",
    navTriage: "Pre-Triage",
    aiTag: "AI",
    triageSub: "Describe your complaint in your own words and we will suggest a suitable clinic.",
    triagePh: "e.g. My throat has been sore for 3 days, it hurts to swallow and I have a mild fever.",
    examples: ["I have a sore throat and fever", "I twisted my knee and it is swollen", "Itchy red rash on my arms"],
    disclaimer: "This assistant does not diagnose or recommend medication; it only suggests which clinic to visit. In an emergency, call 112.",
    analyze: "Suggest a Clinic",
    analyzing: "Analyzing…",
    resultLabel: "Suggested clinic",
    urgency_routine: "A regular appointment is fine",
    urgency_urgent: "See a doctor within 1-2 days",
    emergencyTitle: "This may be an emergency",
    lUrgency: "Urgency",
    call112: "Call 112",
    bookThis: "Book in this clinic",
    alsoConsider: "Also consider:",
    source_llm: "Suggested by AI ({provider})",
    source_rules: "Suggested by rule-based fallback",
    "source_safety-rules": "Detected by safety rules",
    hintBranch: "Suggested clinic: <b>{branch}</b>. It will be selected automatically when you choose a province.",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

// Veritabanındaki Türkçe veriler için İngilizce karşılıklar
const BRANCH_EN = {
  "İç Hastalıkları (Dahiliye)": "Internal Medicine",
  "Çocuk Sağlığı ve Hastalıkları": "Pediatrics",
  "Kadın Hastalıkları ve Doğum": "Obstetrics and Gynecology",
  "Genel Cerrahi": "General Surgery",
  "Ortopedi ve Travmatoloji": "Orthopedics and Traumatology",
  "Kulak Burun Boğaz Hastalıkları": "Otorhinolaryngology (ENT)",
  "Göz Hastalıkları": "Ophthalmology",
  "Kardiyoloji": "Cardiology",
  "Nöroloji": "Neurology",
  "Dermatoloji (Cildiye)": "Dermatology",
  "Üroloji": "Urology",
  "Göğüs Hastalıkları": "Pulmonology",
  "Fiziksel Tıp ve Rehabilitasyon": "Physical Medicine and Rehabilitation",
  "Ruh Sağlığı ve Hastalıkları (Psikiyatri)": "Psychiatry",
  "Endokrinoloji ve Metabolizma Hastalıkları": "Endocrinology and Metabolism",
  "Gastroenteroloji": "Gastroenterology",
  "Beyin ve Sinir Cerrahisi": "Neurosurgery",
  "Enfeksiyon Hastalıkları": "Infectious Diseases",
  "Romatoloji": "Rheumatology",
  "Nefroloji": "Nephrology",
  "Kalp ve Damar Cerrahisi": "Cardiovascular Surgery",
};
const HOSPITAL_EN = [
  [" Eğitim ve Araştırma Hastanesi", " Training and Research Hospital"],
  [" Şehir Hastanesi", " City Hospital"],
  [" Devlet Hastanesi", " State Hospital"],
];
const TITLE_EN = [["Prof. Dr.", "Prof. Dr."], ["Doç. Dr.", "Assoc. Prof. Dr."], ["Op. Dr.", "Op. Dr."], ["Uzm. Dr.", "Spec. Dr."]];
// Backend hata mesajları (Türkçe gelir) -> İngilizce
const ERROR_EN = {
  "E-posta veya şifre hatalı": "Incorrect e-mail or password",
  "Bu e-posta ile kayıtlı bir hesap zaten var": "An account with this e-mail already exists",
  "Bu saat dolu, lütfen başka bir saat seçin": "This time slot is already taken, please choose another one",
  "Bu saatte zaten başka bir randevunuz var": "You already have another appointment at this time",
  "Bu klinikte zaten aktif bir randevunuz var": "You already have an active appointment in this clinic",
  "Bu saat az önce başka bir hasta tarafından alındı": "This slot was just taken by another patient",
  "Geçmiş bir tarihe randevu alınamaz": "Appointments cannot be made for a past date",
  "Seçilen saat doktorun çalışma saatleri dışında": "The selected time is outside the doctor's working hours",
  "En fazla 14 gün sonrasına randevu alınabilir": "Appointments can be made at most 14 days in advance",
  "Lütfen şikâyetinizi biraz daha ayrıntılı yazın": "Please describe your complaint in a bit more detail",
  "Şikâyet metni en fazla 1000 karakter olabilir": "The complaint can be at most 1000 characters",
};

let lang = "en";
try { lang = localStorage.getItem("has_lang") || "en"; } catch (e) {}

function t(key, vars = {}) {
  let s = (I18N[lang] && I18N[lang][key]) ?? I18N.tr[key] ?? key;
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}
const trBranch = (name) => (lang === "en" ? BRANCH_EN[name] || name : name);
function trHospital(name) {
  if (lang !== "en") return name;
  for (const [tr, en] of HOSPITAL_EN) if (name.endsWith(tr)) return name.slice(0, -tr.length) + en;
  return name;
}
function trDoctor(name) {
  if (lang !== "en") return name;
  for (const [tr, en] of TITLE_EN) if (name.startsWith(tr)) return en + name.slice(tr.length);
  return name;
}
const trError = (msg) => (lang === "en" ? ERROR_EN[msg] || msg : msg);

function applyStaticTexts() {
  document.documentElement.lang = lang;
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
    el.setAttribute("aria-label", t(el.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
}

function setLanguage(newLang) {
  lang = newLang;
  try { localStorage.setItem("has_lang", lang); } catch (e) {}
  applyStaticTexts();
  if (patient) refreshDynamicTexts();
}
document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLanguage(b.dataset.lang)));

// =========================================================
// 2) İKONLAR (satır içi SVG)
// =========================================================
const ICONS = {
  logo: `<svg viewBox="0 0 48 48"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#12a58a"/><stop offset="1" stop-color="#1e88e5"/></linearGradient></defs>
          <rect x="2" y="6" width="40" height="38" rx="10" fill="url(#lg)"/>
          <rect x="11" y="2" width="4" height="9" rx="2" fill="#0d8a73"/><rect x="29" y="2" width="4" height="9" rx="2" fill="#166fc0"/>
          <path d="M22 17v16M14 25h16" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
          <circle cx="38" cy="38" r="9" fill="#fff"/><circle cx="38" cy="38" r="6.5" fill="none" stroke="#1e88e5" stroke-width="2"/>
          <path d="M38 34.5V38l2.5 1.5" stroke="#1e88e5" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>`,
  hospital: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"/><path d="M2 21h20M12 8v6M9 11h6M10 21v-3h4v3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>`,
  steth: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>`,
  sunset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 18a5 5 0 0 0-10 0M12 3v6M4.2 10.2l1.4 1.4M18.4 11.6l1.4-1.4M2 18h20M8 6l4-3 4 3"/></svg>`,
};

let iconUid = 0;
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    if (el.querySelector("svg")) return;
    let svg = ICONS[el.dataset.icon] || "";
    // Her logo kendi renk geçişi kimliğini kullansın (gizli logolar diğerini bozmasın)
    if (svg.includes('id="lg"')) {
      const id = "lg" + ++iconUid;
      svg = svg.replace('id="lg"', `id="${id}"`).replace("url(#lg)", `url(#${id})`);
    }
    el.insertAdjacentHTML("afterbegin", svg);
  });
}

// =========================================================
// 3) YARDIMCILAR
// =========================================================
const $ = (id) => document.getElementById(id);

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function parseDate(iso) {                 // "2026-11-16" -> yerel Date
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function longDate(iso) {                  // TR: "16 Kasım 2026 Pazartesi"  EN: "Monday, 16 November 2026"
  const d = parseDate(iso);
  const day = t("days")[d.getDay()], month = t("months")[d.getMonth()];
  return lang === "en"
    ? `${day}, ${d.getDate()} ${month} ${d.getFullYear()}`
    : `${d.getDate()} ${month} ${d.getFullYear()} ${day}`;
}
function shortDate(iso) {                 // "16 Kasım" / "16 November"
  const d = parseDate(iso);
  return `${d.getDate()} ${t("months")[d.getMonth()]}`;
}
function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toLocaleUpperCase("tr");
}

async function api(path, options = {}) {
  const res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data.detail === "string" ? trError(data.detail) : t("genericError"));
  return data;
}

let toastTimer;
function toast(text, type = "") {
  const el = $("toast");
  el.textContent = text;
  el.className = "toast " + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add("hidden"), 3500);
}

function openModal(html, actions) {
  $("modalBody").innerHTML = html;
  $("modalActions").innerHTML = "";
  actions.forEach((a) => {
    const b = document.createElement("button");
    b.className = "btn " + a.cls;
    b.textContent = a.label;
    b.addEventListener("click", a.onClick);
    $("modalActions").appendChild(b);
  });
  hydrateIcons($("modal"));
  $("modal").classList.remove("hidden");
}
function closeModal() { $("modal").classList.add("hidden"); }
$("modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

// ---------- Oturum ----------
let patient = null;
function saveSession(p) { patient = p; try { localStorage.setItem("has_patient", JSON.stringify(p)); } catch (e) {} }
function loadSession() { try { return JSON.parse(localStorage.getItem("has_patient")); } catch (e) { return null; } }
function clearSession() { patient = null; try { localStorage.removeItem("has_patient"); } catch (e) {} }

// =========================================================
// 4) GİRİŞ / KAYIT
// =========================================================
document.querySelectorAll("[data-switch]").forEach((b) => b.addEventListener("click", () => {
  const toLogin = b.dataset.switch === "login";
  $("loginForm").classList.toggle("hidden", !toLogin);
  $("registerForm").classList.toggle("hidden", toLogin);
  $("authMsg").textContent = "";
}));

document.querySelectorAll("[data-toggle]").forEach((b) => b.addEventListener("click", () => {
  const input = $(b.dataset.toggle);
  input.type = input.type === "password" ? "text" : "password";
}));

async function handleAuth(path, body) {
  try {
    const p = await api(path, { method: "POST", body: JSON.stringify(body) });
    saveSession(p);
    enterApp();
  } catch (err) {
    $("authMsg").textContent = err.message;
    $("authMsg").className = "form-msg error";
  }
}

$("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  handleAuth("/login", { email: $("loginEmail").value.trim(), password: $("loginPassword").value });
});
$("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  handleAuth("/register", {
    full_name: $("regName").value.trim(), email: $("regEmail").value.trim(), password: $("regPassword").value,
  });
});

$("logoutBtn").addEventListener("click", () => {
  clearSession();
  $("appView").classList.add("hidden");
  $("authView").classList.remove("hidden");
});

function enterApp() {
  $("authView").classList.add("hidden");
  $("appView").classList.remove("hidden");
  $("userName").textContent = patient.full_name;
  $("userAvatar").textContent = initials(patient.full_name);
  $("greeting").textContent = t("greeting", { name: patient.full_name.split(" ")[0] });
  resetSearchForm();
  loadCities();
  showPage("homePage");
}

// =========================================================
// 5) SAYFA GEÇİŞLERİ
// =========================================================
let currentPage = "homePage";
function showPage(id) {
  currentPage = id;
  ["homePage", "bookPage", "myPage", "triagePage"].forEach((p) => $(p).classList.toggle("hidden", p !== id));
  document.querySelectorAll(".nav-link").forEach((n) => n.classList.toggle("active", n.dataset.page === id));
  window.scrollTo({ top: 0 });
  if (id === "homePage") loadNextAppointment();
  if (id === "myPage") loadMyAppointments();
  if (id === "triagePage") renderExamples();
}
document.querySelectorAll("[data-page]").forEach((b) => b.addEventListener("click", () => showPage(b.dataset.page)));

// Dil değişince ekrandaki dinamik içerikleri yeniden çiz
function refreshDynamicTexts() {
  $("greeting").textContent = t("greeting", { name: patient.full_name.split(" ")[0] });
  relabelSelects();
  renderBranchHint();
  if (currentPage === "triagePage") { renderExamples(); if (lastTriage) renderTriageResult(lastTriage); }
  if (currentPage === "homePage") loadNextAppointment();
  if (currentPage === "myPage") loadMyAppointments();
  if (currentPage === "bookPage") {
    if (!$("step2").classList.contains("hidden")) renderDoctorList();
    if (!$("step3").classList.contains("hidden")) { renderSelectedDoctor(); loadDays(); }
  }
}

// =========================================================
// 6) ANA SAYFA: yaklaşan randevu
// =========================================================
function isUpcoming(a) {
  const [h, m] = a.time.split(":").map(Number);
  const d = parseDate(a.date);
  d.setHours(h, m);
  return a.status === "active" && d > new Date();
}

async function loadNextAppointment() {
  const rows = await api(`/patients/${patient.id}/appointments`);
  const upcoming = rows.filter(isUpcoming).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  $("nextAppointment").innerHTML = upcoming.length
    ? appointmentCard(upcoming[0], false)
    : `<p class="empty">${t("noUpcoming")} <button class="btn btn-link" data-page-go="bookPage">${t("bookNow")}</button></p>`;
  $("nextAppointment").querySelectorAll("[data-page-go]").forEach((b) =>
    b.addEventListener("click", () => showPage(b.dataset.pageGo)));
  hydrateIcons($("nextAppointment"));
}

// =========================================================
// 7) RANDEVU AL
// =========================================================
const state = { doctors: [], doctor: null, day: null };

function setStep(n) {
  ["step1", "step2", "step3"].forEach((s, i) => $(s).classList.toggle("hidden", i + 1 !== n));
  stepperOnly(n);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function stepperOnly(n) {
  document.querySelectorAll("#stepper li").forEach((li) => {
    const s = Number(li.dataset.step);
    li.classList.toggle("active", s === n);
    li.classList.toggle("done", s < n);
  });
}
document.querySelectorAll("[data-back]").forEach((b) => b.addEventListener("click", () => setStep(Number(b.dataset.back))));

// --- Açılır listeler ---
// Her seçeneğin orijinal (Türkçe) adı data-name'de tutulur; dil değişince etiket yeniden çevrilir
const LABELERS = {
  citySelect: (n) => n,
  districtSelect: (n) => n,
  branchSelect: trBranch,
  hospitalSelect: trHospital,
  doctorSelect: trDoctor,
};

function fillSelect(select, items, placeholderKey, nameFn = (x) => x.name, sort = false) {
  const label = LABELERS[select.id];
  let rows = items.map((x) => ({ id: x.id, name: nameFn(x) }));
  if (sort) rows.sort((a, b) => label(a.name).localeCompare(label(b.name), lang));
  select.innerHTML = `<option value="" data-ph="${placeholderKey}">${t(placeholderKey)}</option>` +
    rows.map((r) => `<option value="${r.id}" data-name="${esc(r.name)}">${esc(label(r.name))}</option>`).join("");
}
function resetSelect(select, placeholderKey, disabled = true) {
  select.innerHTML = `<option value="" data-ph="${placeholderKey}">${t(placeholderKey)}</option>`;
  select.disabled = disabled;
}
function relabelSelects() {
  Object.entries(LABELERS).forEach(([id, label]) => {
    $(id).querySelectorAll("option").forEach((o) => {
      o.textContent = o.dataset.ph ? t(o.dataset.ph) : label(o.dataset.name);
    });
  });
}
const selectedName = (select) => select.selectedOptions[0]?.dataset.name || "";

function resetSearchForm() {
  if ($("citySelect").options.length <= 1) resetSelect($("citySelect"), "selectCity", false);
  else $("citySelect").value = "";
  resetSelect($("districtSelect"), "any");
  resetSelect($("branchSelect"), "cityFirst");
  resetSelect($("hospitalSelect"), "any");
  resetSelect($("doctorSelect"), "any");
  updateSearchButton();
  setStep(1);
}

function filterParams() {
  const p = new URLSearchParams();
  if ($("citySelect").value) p.set("city_id", $("citySelect").value);
  if ($("districtSelect").value) p.set("district_id", $("districtSelect").value);
  if ($("branchSelect").value) p.set("branch_id", $("branchSelect").value);
  if ($("hospitalSelect").value) p.set("hospital_id", $("hospitalSelect").value);
  return p;
}

async function loadCities() {
  if ($("citySelect").options.length > 1) return;
  const cities = await api("/cities");
  fillSelect($("citySelect"), cities, "selectCity");
}

async function loadBranches() {
  const keep = $("branchSelect").value;
  const p = new URLSearchParams();
  p.set("city_id", $("citySelect").value);
  if ($("districtSelect").value) p.set("district_id", $("districtSelect").value);
  const branches = await api(`/branches?${p}`);
  fillSelect($("branchSelect"), branches, "selectClinic", (x) => x.name, true);
  $("branchSelect").disabled = false;
  if (branches.some((b) => String(b.id) === keep)) $("branchSelect").value = keep;
  // Ön triyajdan gelen klinik önerisi varsa otomatik seç
  if (pendingBranch && branches.some((b) => b.id === pendingBranch.id)) {
    $("branchSelect").value = String(pendingBranch.id);
    pendingBranch = null;
    renderBranchHint();
    await loadHospitals();
  }
}

async function loadHospitals() {
  resetSelect($("doctorSelect"), "any");
  if (!$("branchSelect").value) return resetSelect($("hospitalSelect"), "any");
  const p = filterParams();
  p.delete("hospital_id");
  const hospitals = await api(`/hospitals?${p}`);
  fillSelect($("hospitalSelect"), hospitals, "any");
  $("hospitalSelect").disabled = false;
}

function updateSearchButton() {
  $("searchBtn").disabled = !($("citySelect").value && $("branchSelect").value);
}

$("citySelect").addEventListener("change", async () => {
  resetSelect($("districtSelect"), "any");
  resetSelect($("branchSelect"), "cityFirst");
  resetSelect($("hospitalSelect"), "any");
  resetSelect($("doctorSelect"), "any");
  updateSearchButton();
  const cityId = $("citySelect").value;
  if (!cityId) return;
  const districts = await api(`/cities/${cityId}/districts`);
  fillSelect($("districtSelect"), districts, "any");
  $("districtSelect").disabled = false;
  await loadBranches();
  updateSearchButton();
});

$("districtSelect").addEventListener("change", async () => {
  await loadBranches();
  await loadHospitals();
  updateSearchButton();
});

$("branchSelect").addEventListener("change", async () => {
  await loadHospitals();
  updateSearchButton();
});

$("hospitalSelect").addEventListener("change", async () => {
  if (!$("hospitalSelect").value) return resetSelect($("doctorSelect"), "any");
  const doctors = await api(`/doctors?${filterParams()}`);
  fillSelect($("doctorSelect"), doctors, "any", (d) => d.display_name);
  $("doctorSelect").disabled = false;
});

$("clearBtn").addEventListener("click", () => { pendingBranch = null; renderBranchHint(); resetSearchForm(); });

$("searchBtn").addEventListener("click", async () => {
  $("searchBtn").disabled = true;
  try {
    let doctors = await api(`/doctors?${filterParams()}`);
    const chosen = $("doctorSelect").value;
    if (chosen) doctors = doctors.filter((d) => String(d.id) === chosen);
    state.doctors = doctors;
    if (chosen && doctors.length) return selectDoctor(doctors[0]);   // hekim seçildiyse direkt takvime
    renderDoctorList();
    setStep(2);
  } catch (err) {
    toast(err.message, "error");
  } finally {
    updateSearchButton();
  }
});

// --- Hekim listesi ---
function doctorInfoHtml(d) {
  return `
    <div class="doc-avatar">${esc(initials(d.full_name))}</div>
    <div>
      <div class="doc-name">${esc(trDoctor(d.display_name))}</div>
      <div class="doc-meta">
        <span data-icon="steth">${esc(trBranch(d.branch))}</span>
        <span data-icon="hospital">${esc(trHospital(d.hospital))}</span>
        <span data-icon="pin">${esc(d.district)} / ${esc(d.city)}</span>
      </div>
    </div>`;
}

function renderDoctorList() {
  const city = selectedName($("citySelect"));
  const district = selectedName($("districtSelect"));
  $("resultInfo").textContent = t("resultInfo", {
    where: district ? `${district}, ${city}` : city,
    branch: trBranch(selectedName($("branchSelect"))),
    n: state.doctors.length,
  });

  if (!state.doctors.length) {
    $("doctorList").innerHTML = `<p class="empty">${t("noDoctors")}</p>`;
    return;
  }
  $("doctorList").innerHTML = state.doctors.map((d, i) => `
    <div class="doctor-card">
      ${doctorInfoHtml(d)}
      <div class="doc-side">
        ${d.next_available
          ? `<span class="badge green" data-icon="calendar">${esc(t("earliest", { date: shortDate(d.next_available) }))}</span>`
          : `<span class="badge gray">${t("noSlots14")}</span>`}
        <button class="btn btn-green" data-pick="${i}" ${d.next_available ? "" : "disabled"}>${t("pick")}</button>
      </div>
    </div>`).join("");
  hydrateIcons($("doctorList"));
  $("doctorList").querySelectorAll("[data-pick]").forEach((b) =>
    b.addEventListener("click", () => selectDoctor(state.doctors[Number(b.dataset.pick)])));
}

// --- Gün ve saat ---
function renderSelectedDoctor() {
  $("selectedDoctorCard").innerHTML = `<div class="selected-doc">${doctorInfoHtml(state.doctor)}</div>`;
  hydrateIcons($("selectedDoctorCard"));
}

async function selectDoctor(doctor) {
  state.doctor = doctor;
  state.day = null;
  renderSelectedDoctor();
  setStep(3);
  await loadDays();
}

async function loadDays() {
  const days = await api(`/doctors/${state.doctor.id}/days`);
  $("dayStrip").innerHTML = days.map((d) => {
    const date = parseDate(d.date);
    return `
      <button class="day-card" data-day="${d.date}" ${d.free_count ? "" : "disabled"}>
        <small>${t("daysShort")[date.getDay()]}</small>
        <b>${date.getDate()}</b>
        <small>${t("months")[date.getMonth()].slice(0, 3)}</small>
        <span class="count">${d.free_count ? t("free", { n: d.free_count }) : "—"}</span>
      </button>`;
  }).join("");
  $("dayStrip").querySelectorAll(".day-card").forEach((b) => b.addEventListener("click", () => selectDay(b.dataset.day)));

  const keep = state.day && days.find((d) => d.date === state.day && d.free_count);
  const first = keep || days.find((d) => d.free_count);
  if (first) selectDay(first.date);
  else $("slotArea").innerHTML = `<p class="empty">${t("noDays")}</p>`;
}

async function selectDay(day) {
  state.day = day;
  $("dayStrip").querySelectorAll(".day-card").forEach((b) => b.classList.toggle("selected", b.dataset.day === day));
  const data = await api(`/doctors/${state.doctor.id}/slots?day=${day}`);
  const morning = data.free_slots.filter((x) => x < "12:00");
  const afternoon = data.free_slots.filter((x) => x >= "12:00");
  const group = (title, icon, slots) => slots.length ? `
    <div class="slot-group">
      <h4><span data-icon="${icon}"></span>${title}</h4>
      <div class="slots">${slots.map((x) => `<button class="slot" data-time="${x}">${x}</button>`).join("")}</div>
    </div>` : "";
  $("slotArea").innerHTML = `<h3 class="section-title">${esc(t("pickTime", { date: longDate(day) }))}</h3>` +
    (data.free_slots.length
      ? group(t("morning"), "sun", morning) + group(t("afternoon"), "sunset", afternoon)
      : `<p class="empty">${t("noSlotsDay")}</p>`);
  hydrateIcons($("slotArea"));
  $("slotArea").querySelectorAll(".slot").forEach((b) => b.addEventListener("click", () => confirmBooking(b.dataset.time)));
}

// --- Onay ---
function confirmBooking(time) {
  const d = state.doctor;
  stepperOnly(4);
  openModal(`
    <div class="modal-icon green" data-icon="calendar"></div>
    <h3>${t("confirmTitle")}</h3>
    <p class="muted">${t("confirmSub")}</p>
    <ul class="summary">
      <li><span>${t("lDoctor")}</span><b>${esc(trDoctor(d.display_name))}</b></li>
      <li><span>${t("lClinic")}</span><b>${esc(trBranch(d.branch))}</b></li>
      <li><span>${t("lHospital")}</span><b>${esc(trHospital(d.hospital))}</b></li>
      <li><span>${t("lLocation")}</span><b>${esc(d.district)} / ${esc(d.city)}</b></li>
      <li><span>${t("lDate")}</span><b>${esc(longDate(state.day))}</b></li>
      <li><span>${t("lTime")}</span><b>${esc(time)}</b></li>
    </ul>`,
  [
    { label: t("back"), cls: "btn-ghost", onClick: () => { closeModal(); stepperOnly(3); } },
    { label: t("confirmBtn"), cls: "btn-green", onClick: () => book(time) },
  ]);
}

async function book(time) {
  try {
    const a = await api("/appointments", {
      method: "POST",
      body: JSON.stringify({ patient_id: patient.id, doctor_id: state.doctor.id, date: state.day, time }),
    });
    openModal(`
      <div class="modal-icon green" data-icon="check"></div>
      <h3>${t("bookedTitle")}</h3>
      <p class="muted">${t("bookedSub", {
        date: esc(longDate(a.date)), time: esc(a.time),
        doctor: esc(trDoctor(a.doctor)), hospital: esc(trHospital(a.hospital)),
      })}</p>`,
    [
      { label: t("newAppt"), cls: "btn-ghost", onClick: () => { closeModal(); setStep(1); } },
      { label: t("navMy"), cls: "btn-green", onClick: () => { closeModal(); setStep(1); showPage("myPage"); } },
    ]);
  } catch (err) {
    // Çakışma (409) vb. hatalar kullanıcıya gösterilir, takvim yenilenir
    closeModal();
    stepperOnly(3);
    toast(err.message, "error");
    loadDays();
  }
}

// =========================================================
// 7b) ÖN TRİYAJ (LLM)
// =========================================================
let pendingBranch = null;   // {id, name}: triyajdan randevu sayfasına taşınan klinik
let lastTriage = null;

function renderBranchHint() {
  const el = $("branchHint");
  if (!pendingBranch) return el.classList.add("hidden");
  el.innerHTML = `<span data-icon="spark"></span><span>${t("hintBranch", { branch: esc(trBranch(pendingBranch.name)) })}</span>
                  <button type="button" aria-label="close">×</button>`;
  el.classList.remove("hidden");
  hydrateIcons(el);
  el.querySelector("button").addEventListener("click", () => { pendingBranch = null; renderBranchHint(); });
}

function renderExamples() {
  $("triageExamples").innerHTML = t("examples")
    .map((x) => `<button type="button" class="chip">${esc(x)}</button>`).join("");
  $("triageExamples").querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => {
    $("triageText").value = c.textContent;
    $("charCount").textContent = `${c.textContent.length} / 1000`;
  }));
}

$("triageText").addEventListener("input", () => {
  $("charCount").textContent = `${$("triageText").value.length} / 1000`;
});

$("triageBtn").addEventListener("click", async () => {
  const text = $("triageText").value.trim();
  const btn = $("triageBtn");
  btn.disabled = true;
  btn.querySelector("svg").outerHTML = `<span class="spinner"></span>`;
  $("triageBtnText").textContent = t("analyzing");
  try {
    lastTriage = await api("/triage", { method: "POST", body: JSON.stringify({ text, lang }) });
    renderTriageResult(lastTriage);
  } catch (err) {
    toast(err.message, "error");
  } finally {
    btn.disabled = false;
    const sp = btn.querySelector(".spinner");
    if (sp) sp.outerHTML = ICONS.spark;
    $("triageBtnText").textContent = t("analyze");
  }
});

function goBookWithBranch(id, name) {
  pendingBranch = { id, name };
  renderBranchHint();
  setStep(1);
  showPage("bookPage");
  if ($("citySelect").value) loadBranches().then(updateSearchButton);
}

function renderTriageResult(r) {
  const box = $("triageResult");
  const source = `<span class="source-tag">${t("source_" + r.source, { provider: r.provider || "LLM" })}</span>`;
  if (r.urgency === "emergency") {
    box.innerHTML = `
      <div class="result-card emergency">
        <div class="result-top">
          <div class="result-icon red" data-icon="alert"></div>
          <div><div class="result-label">${t("lUrgency")}</div><div class="result-branch">${t("emergencyTitle")}</div></div>
        </div>
        <p class="result-reason">${esc(r.reason)}</p>
        <div class="result-actions">
          <a class="call-112" href="tel:112">📞 ${t("call112")}</a>
          ${source}
        </div>
      </div>`;
  } else {
    const urgencyBadge = r.urgency === "urgent"
      ? `<span class="badge amber">${t("urgency_urgent")}</span>`
      : `<span class="badge green">${t("urgency_routine")}</span>`;
    const alts = r.alternatives.length ? `
      <div class="alt-row"><span class="muted">${t("alsoConsider")}</span>
        ${r.alternatives.map((a) => `<button class="chip" data-alt="${a.id}" data-name="${esc(a.name)}">${esc(trBranch(a.name))}</button>`).join("")}
      </div>` : "";
    box.innerHTML = `
      <div class="result-card">
        <div class="result-top">
          <div class="result-icon purple" data-icon="steth"></div>
          <div><div class="result-label">${t("resultLabel")}</div><div class="result-branch">${esc(trBranch(r.branch))}</div></div>
        </div>
        <p class="result-reason">${esc(r.reason)}</p>
        <div class="result-meta">${urgencyBadge}</div>
        ${alts}
        <div class="result-actions">
          <button class="btn btn-green" id="bookSuggested"><span data-icon="calendar"></span>${t("bookThis")}</button>
          ${source}
        </div>
      </div>`;
    box.querySelector("#bookSuggested").addEventListener("click", () => goBookWithBranch(r.branch_id, r.branch));
    box.querySelectorAll("[data-alt]").forEach((c) =>
      c.addEventListener("click", () => goBookWithBranch(Number(c.dataset.alt), c.dataset.name)));
  }
  box.classList.remove("hidden");
  hydrateIcons(box);
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// =========================================================
// 8) RANDEVULARIM
// =========================================================
let myFilter = "active";
document.querySelectorAll("#mySeg .seg-btn").forEach((b) => b.addEventListener("click", () => {
  myFilter = b.dataset.filter;
  document.querySelectorAll("#mySeg .seg-btn").forEach((x) => x.classList.toggle("active", x === b));
  loadMyAppointments();
}));

function appointmentCard(a, withCancel = true) {
  const d = parseDate(a.date);
  const upcoming = isUpcoming(a);
  const cls = a.status === "cancelled" ? "cancelled" : upcoming ? "" : "past";
  const badge = a.status === "cancelled" ? `<span class="badge red">${t("statusCancelled")}</span>`
    : upcoming ? `<span class="badge green">${t("statusActive")}</span>` : `<span class="badge gray">${t("statusPast")}</span>`;
  return `
    <div class="appt-card ${cls}">
      <div class="date-block">
        <div class="m">${t("months")[d.getMonth()].slice(0, 3)}</div>
        <div class="d">${d.getDate()}</div>
        <div class="w">${t("daysShort")[d.getDay()]} · ${esc(a.time)}</div>
      </div>
      <div>
        <div class="appt-title">${esc(trBranch(a.branch))}</div>
        <div class="appt-sub">
          <span data-icon="user">${esc(trDoctor(a.doctor))}</span>
          <span data-icon="hospital">${esc(trHospital(a.hospital))}</span>
          <span data-icon="pin">${esc(a.district)} / ${esc(a.city)}</span>
        </div>
      </div>
      <div class="appt-side">
        ${badge}
        ${withCancel && upcoming ? `<button class="btn btn-outline-red" data-cancel="${a.id}">${t("cancelBtn")}</button>` : ""}
      </div>
    </div>`;
}

async function loadMyAppointments() {
  const rows = await api(`/patients/${patient.id}/appointments`);
  const list = myFilter === "active"
    ? rows.filter(isUpcoming).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    : rows.filter((a) => !isUpcoming(a));
  $("myList").innerHTML = list.length ? list.map((a) => appointmentCard(a)).join("")
    : `<p class="empty">${myFilter === "active" ? t("noActive") : t("noPast")}</p>`;
  hydrateIcons($("myList"));
  $("myList").querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => {
    const a = rows.find((x) => String(x.id) === b.dataset.cancel);
    openModal(`
      <div class="modal-icon red" data-icon="alert"></div>
      <h3>${t("cancelTitle")}</h3>
      <p class="muted">${esc(longDate(a.date))} · ${esc(a.time)}<br>${esc(trDoctor(a.doctor))} · ${esc(trBranch(a.branch))}</p>`,
    [
      { label: t("back"), cls: "btn-ghost", onClick: closeModal },
      { label: t("cancelYes"), cls: "btn-red", onClick: async () => {
          await api(`/appointments/${a.id}/cancel`, { method: "PATCH" });
          closeModal();
          toast(t("cancelledToast"), "success");
          loadMyAppointments();
        } },
    ]);
  }));
}

// =========================================================
// 9) BAŞLANGIÇ
// =========================================================
hydrateIcons();
applyStaticTexts();
const saved = loadSession();
if (saved) { patient = saved; enterApp(); }