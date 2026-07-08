const translations = {
  fr: {
    skip: "Aller au contenu principal",
    menuLabel: "Ouvrir le menu",
    navMission: "Mission",
    navProducts: "Produits",
    navAbout: "À propos",
    navLegal: "Légal",
    navContact: "Contact",
    eyebrow: "Québec, Canada",
    heroTitle: "RxScan Technologies",
    heroSubtitle: "La médication, simplifiée pour tous.",
    heroText: "Nous développons des outils numériques conçus pour rendre l'information médicamenteuse plus claire, plus accessible et plus utile.",
    heroProducts: "Découvrir nos produits",
    heroContact: "Nous contacter",
    missionLabel: "Mission",
    missionTitle: "Développer des solutions claires, utiles et responsables.",
    missionText: "Notre mission est de développer des solutions numériques qui soutiennent une meilleure compréhension de la médication, autant pour les professionnels de la santé que pour les patients et leurs proches.",
    productsLabel: "Produits",
    productsTitle: "Un écosystème centré sur la médication.",
    prehosStatus: "Bêta privée",
    prehosText: "Application mobile en bêta privée destinée aux professionnels préhospitaliers. Elle aide à numériser les listes de médicaments, reconnaître les médicaments, générer un résumé clinique et produire un rapport PDF.",
    guideStatus: "En développement",
    guideText: "Application compagnon en développement destinée aux patients, proches aidants et professionnels. Elle vise à rendre l'information médicamenteuse plus simple à comprendre.",
    aboutLabel: "À propos",
    aboutTitle: "Une entreprise québécoise en santé numérique.",
    aboutText: "RxScan Technologies Inc. est une entreprise québécoise qui développe des outils numériques dans le domaine de la santé, avec un accent sur la médication, la clarté de l'information et la sécurité.",
    legalLabel: "Documents légaux",
    legalTitle: "Documents faciles à consulter.",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    clinical: "Avertissement clinique",
    contactLabel: "Contact",
    contactTitle: "Parlons de RxScan Technologies.",
    contactText: "Pour toute question concernant RxScan Technologies ou ses applications :",
    location: "Québec, Canada",
    copyright: "© 2026 RxScan Technologies Inc. Tous droits réservés."
  },
  en: {
    skip: "Skip to main content",
    menuLabel: "Open menu",
    navMission: "Mission",
    navProducts: "Products",
    navAbout: "About",
    navLegal: "Legal",
    navContact: "Contact",
    eyebrow: "Quebec, Canada",
    heroTitle: "RxScan Technologies",
    heroSubtitle: "Medication, simplified for everyone.",
    heroText: "We develop digital tools designed to make medication information clearer, more accessible and more useful.",
    heroProducts: "Explore our products",
    heroContact: "Contact us",
    missionLabel: "Mission",
    missionTitle: "Developing clear, useful and responsible solutions.",
    missionText: "Our mission is to develop digital solutions that support a better understanding of medication for healthcare professionals, patients and caregivers.",
    productsLabel: "Products",
    productsTitle: "An ecosystem focused on medication.",
    prehosStatus: "Private beta",
    prehosText: "Private beta mobile application for prehospital professionals. It helps capture medication lists, recognize medications, generate a clinical summary and produce a PDF report.",
    guideStatus: "In development",
    guideText: "Companion application in development for patients, caregivers and professionals. It aims to make medication information easier to understand.",
    aboutLabel: "About",
    aboutTitle: "A Quebec-based digital health company.",
    aboutText: "RxScan Technologies Inc. is a Quebec-based company developing digital healthcare tools focused on medication, information clarity and safety.",
    legalLabel: "Legal documents",
    legalTitle: "Documents that are easy to consult.",
    privacy: "Privacy policy",
    terms: "Terms of use",
    clinical: "Clinical disclaimer",
    contactLabel: "Contact",
    contactTitle: "Let's talk about RxScan Technologies.",
    contactText: "For questions about RxScan Technologies or its applications:",
    location: "Quebec, Canada",
    copyright: "© 2026 RxScan Technologies Inc. All rights reserved."
  }
};

const legalLinks = {
  fr: {
    privacy: "https://prehosscanrx.github.io/prehos-rxscan-legal/privacy-fr.html",
    terms: "https://prehosscanrx.github.io/prehos-rxscan-legal/conditions-fr.html",
    clinical: "https://prehosscanrx.github.io/prehos-rxscan-legal/clinical-fr.html"
  },
  en: {
    privacy: "https://prehosscanrx.github.io/prehos-rxscan-legal/privacy-en.html",
    terms: "https://prehosscanrx.github.io/prehos-rxscan-legal/conditions-en.html",
    clinical: "https://prehosscanrx.github.io/prehos-rxscan-legal/clinical-en.html"
  }
};

const languageButton = document.querySelector(".language-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

function setLanguage(language) {
  const dictionary = translations[language];

  document.documentElement.lang = language;
  document.title = language === "fr"
    ? "RxScan Technologies Inc. | La médication, simplifiée pour tous"
    : "RxScan Technologies Inc. | Medication, simplified for everyone";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });

  document.querySelectorAll("[data-legal]").forEach((link) => {
    link.href = legalLinks[language][link.dataset.legal];
  });

  languageButton.textContent = language === "fr" ? "EN" : "FR";
  localStorage.setItem("rxscan-language", language);
}

languageButton.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "fr" ? "en" : "fr";
  setLanguage(nextLanguage);
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

setLanguage(localStorage.getItem("rxscan-language") || "fr");
