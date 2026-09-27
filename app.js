const API = "https://api.alquran.cloud/v1";
const LANG_KEY = "quran-language";
const SPANISH_SURAH_NAMES = {
  1: "La Apertura",
  2: "La Vaca",
  3: "La Familia de Imrán",
  4: "Las Mujeres",
  5: "La Mesa Servida",
  6: "Las Bestias",
  7: "Los Lugares Elevados",
  8: "Los Botines",
  9: "El Arrepentimiento",
  10: "Jonás",
  11: "Hud",
  12: "José",
  13: "El Trueno",
  14: "Abraham",
  15: "Al-Hijr",
  16: "La Abeja",
  17: "El Viaje Nocturno",
  18: "La Cueva",
  19: "María",
  20: "Ta-Ha",
  21: "Los Profetas",
  22: "La Peregrinación",
  23: "Los Creyentes",
  24: "La Luz",
  25: "El Criterio",
  26: "Los Poetas",
  27: "Los Hormigas",
  28: "Los Relatos",
  29: "La Araña",
  30: "Los Romanos",
  31: "Luqmán",
  32: "La Prostración",
  33: "Los Grupos",
  34: "Saba",
  35: "El Originador",
  36: "Ya-Sin",
  37: "Los Que Se Colocan en Filas",
  38: "Sad",
  39: "Los Grupos",
  40: "El Perdonador",
  41: "Explicado en detalle",
  42: "La Consulta",
  43: "Los Ornamentos de Oro",
  44: "El Humo",
  45: "La Arrodillada",
  46: "Las Dunas",
  47: "Muhammad",
  48: "La Victoria",
  49: "Las Habitaciones",
  50: "Qaf",
  51: "Los Que Dispersan",
  52: "El Monte",
  53: "La Constelación",
  54: "La Luna",
  55: "El Compasivo",
  56: "El Gran Suceso",
  57: "El Hierro",
  58: "La Mujer Que Disputa",
  59: "La Reunión",
  60: "La Mujer Examina",
  61: "Las Filas",
  62: "El Viernes",
  63: "Los Hipócritas",
  64: "La Eliminación",
  65: "El Divorcio",
  66: "La Prohibición",
  67: "La Soberanía",
  68: "La Pluma",
  69: "La Verdad",
  70: "Los Lugares de Ascenso",
  71: "Noé",
  72: "Los Genios",
  73: "El Arropado",
  74: "El Envuelto",
  75: "La Resurrección",
  76: "El Ser Humano",
  77: "Los Enviados",
  78: "La Noticia",
  79: "Los Que Arrancan",
  80: "Se Encogió",
  81: "La Ocurtamiento",
  82: "La Ruptura",
  83: "Los Defraudadores",
  84: "La Desgarradura",
  85: "Las Constelaciones",
  86: "El Que Viene de Noche",
  87: "Lo Más Alto",
  88: "El Evento Cubriente",
  89: "El Amanecer",
  90: "La Ciudad",
  91: "El Sol",
  92: "La Noche",
  93: "La Claridad",
  94: "La Apertura",
  95: "El Higo",
  96: "El Embrión",
  97: "La Predestinación",
  98: "La Prueba",
  99: "El Terremoto",
  100: "Los Corceles",
  101: "El Estruendo",
  102: "La Rivalidad",
  103: "La Hora",
  104: "El Murmurador",
  105: "La Abundancia",
  106: "Los Infieles",
  107: "La Ayuda",
  108: "Las Fibras de Palma",
  109: "La Sinceridad",
  110: "El Amanecer",
  111: "Los Descreídos",
  112: "El Sol",
  113: "La Noche",
  114: "Los Seres Humanos"
};
const uiText = {
  en: {
    toggleTheme: "Toggle theme",
    toggleLanguage: "Switch language",
    search: "Search surahs...",
    continueReading: "CONTINUE READING",
    continue: "Continue",
    quran: "THE QUR'AN",
    surahs: "Surahs",
    loading: "Loading surahs...",
    noSurahs: "No surahs found.",
    loadError: "Could not load the Qur'an right now. Check your internet connection and try again.",
    ayahs: "ayahs",
    surah: "Surah",
    heroTitle: "Read the Qur'an.",
    subtitle: "A simple, distraction-free Qur'an reader.",
    footer: "Built with HTML, CSS & JavaScript."
  },
  es: {
    toggleTheme: "Cambiar tema",
    toggleLanguage: "Cambiar idioma",
    search: "Buscar suras...",
    continueReading: "SEGUIR LEYENDO",
    continue: "Continuar",
    quran: "EL CORÁN",
    surahs: "Suras",
    loading: "Cargando suras...",
    noSurahs: "No se encontraron suras.",
    loadError: "No se pudo cargar el Corán en este momento. Revisa tu conexión a internet e inténtalo de nuevo.",
    ayahs: "versículos",
    surah: "Sura",
    heroTitle: "Lee el Corán.",
    subtitle: "Un lector del Corán sencillo y sin distracciones.",
    footer: "Hecho con HTML, CSS y JavaScript."
  }
};

const surahList = document.getElementById("surahList");
const searchInput = document.getElementById("searchInput");
const surahCount = document.getElementById("surahCount");
const continueCard = document.getElementById("continueCard");
const continueTitle = document.getElementById("continueTitle");
const continueMeta = document.getElementById("continueMeta");
const continueBtn = document.getElementById("continueBtn");
const langBtn = document.getElementById("langBtn");

let surahs = [];

function getCurrentLanguage() {
  return localStorage.getItem(LANG_KEY) === "es" ? "es" : "en";
}

function getSurahDisplayName(surah) {
  const lang = getCurrentLanguage();
  if (lang === "es") {
    return SPANISH_SURAH_NAMES[surah.number] || surah.englishName;
  }
  return surah.englishName;
}

function getSurahDisplayMeta(surah) {
  const lang = getCurrentLanguage();
  const label = lang === "es" ? "Sura" : "Surah";
  return `${label} ${surah.number} · ${surah.numberOfAyahs} ${uiText[lang].ayahs}`;
}

function applyLanguage() {
  const lang = getCurrentLanguage();
  const text = uiText[lang];
  document.documentElement.lang = lang;

  if (searchInput) searchInput.placeholder = text.search;
  if (langBtn) {
    langBtn.textContent = lang === "es" ? "ES" : "EN";
    langBtn.setAttribute("aria-label", text.toggleLanguage);
  }

  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) heroTitle.textContent = text.heroTitle;

  const subtitle = document.querySelector(".subtitle");
  if (subtitle) subtitle.textContent = text.subtitle;

  const continueLabel = document.querySelector(".continue-card .eyebrow");
  if (continueLabel) continueLabel.textContent = text.continueReading;

  const sectionLabel = document.querySelector(".section-heading .eyebrow");
  if (sectionLabel) sectionLabel.textContent = text.quran;

  const sectionTitle = document.querySelector(".section-heading h2");
  if (sectionTitle) sectionTitle.textContent = text.surahs;

  const footer = document.querySelector("footer");
  if (footer) footer.textContent = text.footer;

  if (continueBtn) continueBtn.textContent = text.continue;
}

function applyTheme() {
  const saved = localStorage.getItem("quran-theme");
  const isDark = saved === "dark";

  if (isDark) {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
    document.documentElement.style.backgroundColor = "#101211";
    document.body.style.backgroundColor = "#101211";
  } else {
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = "light";
    document.documentElement.style.backgroundColor = "#f7f7f4";
    document.body.style.backgroundColor = "#f7f7f4";
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", isDark ? "#101211" : "#f7f7f4");

  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) themeBtn.textContent = isDark ? "☀" : "☾";
}

document.getElementById("themeBtn").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark";
  if (dark) {
    delete document.documentElement.dataset.theme;
    localStorage.setItem("quran-theme", "light");
  } else {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("quran-theme", "dark");
  }
  applyTheme();
});

if (langBtn) {
  langBtn.addEventListener("click", () => {
    const nextLang = getCurrentLanguage() === "es" ? "en" : "es";
    localStorage.setItem(LANG_KEY, nextLang);
    window.location.reload();
  });
}

function renderSurahs(items) {
  const lang = getCurrentLanguage();
  const text = uiText[lang];

  if (!items.length) {
    surahList.innerHTML = `<div class="loading">${text.noSurahs}</div>`;
    return;
  }

  surahList.innerHTML = items.map(surah => {
    const displayName = escapeHtml(getSurahDisplayName(surah));
    const meta = getSurahDisplayMeta(surah);

    return `
      <button class="surah-card" onclick="openSurah(${surah.number})">
        <span class="surah-number">${surah.number}</span>
        <span class="surah-name">
          <strong>${displayName}</strong>
          <span>${meta}</span>
        </span>
        <span class="arabic-name">${escapeHtml(surah.name)}</span>
      </button>
    `;
  }).join("");
}

function openSurah(number) {
  localStorage.setItem("lastSurah", number);
  window.location.href = `surah.html?surah=${number}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

async function loadSurahs() {
  try {
    const response = await fetch(`${API}/surah`);
    if (!response.ok) throw new Error("Could not load surahs.");
    const json = await response.json();
    surahs = json.data;
    const lang = getCurrentLanguage();
    surahCount.textContent = `${surahs.length} ${lang === "es" ? "suras" : "surahs"}`;
    renderSurahs(surahs);
    setupContinue();
  } catch (error) {
    surahList.innerHTML = `
      <div class="loading">
        ${uiText[getCurrentLanguage()].loadError}
      </div>`;
  }
}

function setupContinue() {
  const last = Number(localStorage.getItem("lastSurah"));
  const found = surahs.find(s => s.number === last);

  if (!found) return;

  const lang = getCurrentLanguage();
  continueCard.hidden = false;
  continueTitle.textContent = getSurahDisplayName(found);
  continueMeta.textContent = getSurahDisplayMeta(found);
  continueBtn.onclick = () => openSurah(found.number);
}

searchInput.addEventListener("input", event => {
  const query = event.target.value.toLowerCase().trim();

  renderSurahs(surahs.filter(s =>
    s.englishName.toLowerCase().includes(query) ||
    s.englishNameTranslation.toLowerCase().includes(query) ||
    s.name.includes(query) ||
    String(s.number) === query
  ));
});

applyLanguage();
applyTheme();
loadSurahs();
