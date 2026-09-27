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
const params = new URLSearchParams(window.location.search);
const surahNumber = Number(params.get("surah")) || 1;

const surahName = document.getElementById("surahName");
const surahNumberEl = document.getElementById("surahNumber");
const surahInfo = document.getElementById("surahInfo");
const ayahList = document.getElementById("ayahList");
const langBtn = document.getElementById("langBtn");

const uiText = {
  en: {
    toggleTheme: "Toggle theme",
    toggleLanguage: "Switch language",
    surah: "SURAH",
    previous: "← Previous",
    next: "Next →",
    loading: "Loading Qur'an...",
    loadError: "Could not load this surah. Check your internet connection and try again.",
    bookmark: "Bookmark ayah",
    footer: "Qur'an reader",
    ayahsLabel: "ayahs",
    revelation: "revelation"
  },
  es: {
    toggleTheme: "Cambiar tema",
    toggleLanguage: "Cambiar idioma",
    surah: "SURA",
    previous: "← Anterior",
    next: "Siguiente →",
    loading: "Cargando el Corán...",
    loadError: "No se pudo cargar esta sura. Revisa tu conexión a internet e inténtalo de nuevo.",
    bookmark: "Marcar versículo",
    footer: "Lector del Corán",
    ayahsLabel: "versículos",
    revelation: "revelación"
  }
};

let fontSize = Number(localStorage.getItem("quran-font-size")) || 38;

function getCurrentLanguage() {
  return localStorage.getItem(LANG_KEY) === "es" ? "es" : "en";
}

function applyLanguage() {
  const lang = getCurrentLanguage();
  const text = uiText[lang];
  document.documentElement.lang = lang;

  if (langBtn) {
    langBtn.textContent = lang === "es" ? "ES" : "EN";
    langBtn.setAttribute("aria-label", text.toggleLanguage);
  }

  const prevBtn = document.getElementById("prevBtn");
  if (prevBtn) prevBtn.textContent = text.previous;

  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) nextBtn.textContent = text.next;

  const footer = document.querySelector("footer");
  if (footer) footer.textContent = text.footer;

  const loading = document.querySelector(".loading");
  if (loading && loading.textContent === "Loading Qur'an...") loading.textContent = text.loading;
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

function setFontSize(size) {
  fontSize = Math.min(58, Math.max(26, size));
  localStorage.setItem("quran-font-size", fontSize);
  document.querySelectorAll(".arabic").forEach(el => {
    el.style.fontSize = `${fontSize}px`;
  });
}

document.getElementById("fontUp").addEventListener("click", () => setFontSize(fontSize + 2));
document.getElementById("fontDown").addEventListener("click", () => setFontSize(fontSize - 2));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

async function loadSurah() {
  try {
    const lang = getCurrentLanguage();
    const edition = lang === "es" ? "es.cortes" : "en.sahih";
    const response = await fetch(`${API}/surah/${surahNumber}/editions/quran-uthmani,${edition}`);
    if (!response.ok) throw new Error("Failed to load surah.");

    const json = await response.json();
    const arabic = json.data[0];
    const translation = json.data[1];

    const displayName = lang === "es" ? SPANISH_SURAH_NAMES[surahNumber] || arabic.englishName : arabic.englishName;
    surahName.textContent = displayName;
    surahNumberEl.textContent = lang === "es" ? `SURA ${arabic.number}` : `SURAH ${arabic.number}`;
    surahInfo.textContent =
      `${arabic.englishNameTranslation} · ${arabic.revelationType} · ${arabic.numberOfAyahs} ${uiText[lang].ayahsLabel}`;

    ayahList.innerHTML = arabic.ayahs.map((ayah, index) => {
      const translated = translation.ayahs[index];
      const saved = localStorage.getItem(`bookmark-${surahNumber}-${ayah.numberInSurah}`) === "true";

      return `
        <article class="ayah" id="ayah-${ayah.numberInSurah}">
          <div class="ayah-meta">
            <span class="ayah-number">${ayah.numberInSurah}</span>
            <button
              class="bookmark"
              title="${uiText[lang].bookmark}"
              onclick="toggleBookmark(${ayah.numberInSurah}, this)"
            >${saved ? "★" : "☆"}</button>
          </div>
          <p class="arabic">${escapeHtml(ayah.text)}</p>
          <p class="translation">${escapeHtml(translated.text)}</p>
        </article>
      `;
    }).join("");

    setFontSize(fontSize);
    localStorage.setItem("lastSurah", surahNumber);

    document.title = `${arabic.englishName} — ${lang === "es" ? "Corán" : "Qur'an"}`;
  } catch (error) {
    ayahList.innerHTML = `
      <div class="loading">
        ${uiText[getCurrentLanguage()].loadError}
      </div>`;
  }
}

function toggleBookmark(ayahNumber, button) {
  const key = `bookmark-${surahNumber}-${ayahNumber}`;
  const next = localStorage.getItem(key) !== "true";
  localStorage.setItem(key, String(next));
  button.textContent = next ? "★" : "☆";
}

document.getElementById("prevBtn").onclick = () => {
  if (surahNumber > 1) window.location.href = `surah.html?surah=${surahNumber - 1}`;
};

document.getElementById("nextBtn").onclick = () => {
  if (surahNumber < 114) window.location.href = `surah.html?surah=${surahNumber + 1}`;
};

applyLanguage();
applyTheme();
loadSurah();
