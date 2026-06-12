function initTypedEffect() {
  console.log("Initializing Typed.js...");
  console.log("Typed object:", typeof Typed);

  if (typeof Typed === "undefined") {
    console.error("Typed.js is not loaded!");
    return;
  }

  // Try multiple approaches to find the element
  const findElement = () => {
    // Try different selectors
    let textElement = document.getElementById("text-text");
    if (!textElement) {
      textElement = document.querySelector("#text-text");
    }
    if (!textElement) {
      textElement = document.querySelector('span[id="text-text"]');
    }
    if (!textElement) {
      textElement = document.querySelector("h3 span");
    }

    console.log("Found element:", textElement);
    console.log(
      "Element innerHTML:",
      textElement ? textElement.innerHTML : "N/A"
    );
    console.log(
      "Element parent:",
      textElement ? textElement.parentElement : "N/A"
    );

    return textElement;
  };

  // Wait a bit more for DOM to be fully ready
  setTimeout(() => {
    let textElement = findElement();
    if (!textElement) {
      console.error("Element #text-text not found! Trying fallback...");

      // Try to find the h3 element and create the span if needed
      const h3Element = document.querySelector('h3[data-translate="hero.and"]');
      if (h3Element) {
        console.log("Found h3 element, creating span...");
        const newSpan = document.createElement("span");
        newSpan.id = "text-text";
        h3Element.appendChild(newSpan);
        textElement = newSpan;
        console.log("Created new span element:", textElement);
        startTypedEffect(textElement);
        return;
      }

      // Try one more time after a longer delay
      setTimeout(() => {
        textElement = findElement();
        if (!textElement) {
          console.error("Element #text-text still not found after retry!");
          console.log("All spans on page:", document.querySelectorAll("span"));

          // Try to find the h3 element and create the span if needed
          const h3Element = document.querySelector(
            'h3[data-translate="hero.and"]'
          );
          if (h3Element) {
            console.log("Found h3 element, creating span...");
            const newSpan = document.createElement("span");
            newSpan.id = "text-text";
            h3Element.appendChild(newSpan);
            textElement = newSpan;
            console.log("Created new span element:", textElement);
          } else {
            console.error("Could not find h3 element either!");
            return;
          }
        }
        startTypedEffect(textElement);
      }, 500);
      return;
    }

    startTypedEffect(textElement);
  }, 100);
}

function startTypedEffect(element) {
  const currentLang = localStorage.getItem("language") || "fr";
  console.log("Current language:", currentLang);

  const strings =
    currentLang === "en"
      ? [
          "Front-end developer",
          "Bachelor's graduate in English",
          "Forest and Water Agent",
        ]
      : [
          "developpeur Front-end",
          "diplomé d'une Licence en Anglais",
          "agent d'appuie Eaux-et-Fôrets",
        ];

  console.log("Typed.js strings:", strings);

  var typed = new Typed("#text-text", {
    strings: strings,
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    startDelay: 200,
    smartBackspace: true,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });

  console.log("Typed.js instance created:", typed);

  // Store reference for language switching
  element._typed = typed;
}

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
  // Prevent body scroll when sidebar is open
  document.body.style.overflow = "hidden";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
  // Restore body scroll when sidebar is closed
  document.body.style.overflow = "auto";
}

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Supprimer la classe active de tous les liens
    navLinks.forEach((nav) => nav.classList.remove("active"));
    // Ajouter la classe active au lien cliqué
    link.classList.add("active");
  });
});
function fillBar(skillElement, targetPercent) {
  const bar = skillElement.querySelector(".progress-bar");
  const text = skillElement.querySelector(".progress-text");
  let percent = 0;
  clearInterval(skillElement._interval);
  bar.style.width = "0%";
  text.textContent = "0%";

  skillElement._interval = setInterval(() => {
    if (percent >= targetPercent) {
      clearInterval(skillElement._interval);
    } else {
      percent++;
      bar.style.width = percent + "%";
      text.textContent = percent + "%";
    }
  }, 15);
}

// === JS ===
const buttons = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");
const droppers = document.querySelectorAll(".drop-box .droper");

buttons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    // 1️⃣ Reset de tous les états
    buttons.forEach((b) => b.classList.remove("active"));
    contents.forEach((c) => {
      c.classList.add("hidden");
      c.style.borderColor = "transparent";
    });
    droppers.forEach((d) => d.classList.remove("active"));

    // 2️⃣ Activation du bouton
    btn.classList.add("active");

    // 3️⃣ Affichage du contenu correspondant
    const targetId = btn.getAttribute("data-tab");
    const content = document.getElementById(targetId);
    content.classList.remove("hidden");

    // 4️⃣ Synchronisation de la couleur
    const color = btn.dataset.color;
    content.style.borderColor = color;

    // 5️⃣ Affichage du triangle dessous
    droppers[idx].classList.add("active");
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const defaultButton = document.querySelector(".tab-button.active");
  if (defaultButton) defaultButton.click();
});

// Projects Carousel Functionality
class ProjectCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".project-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.showSlide(0);
    this.startAutoPlay();
    this.bindEvents();
  }

  bindEvents() {
    // Previous button
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.stopAutoPlay();
        this.prevSlide();
        this.startAutoPlay();
      });
    }

    // Next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      });
    }

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.stopAutoPlay();
        this.goToSlide(index);
        this.startAutoPlay();
      });
    });

    // Pause auto-play on hover
    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", () =>
        this.stopAutoPlay()
      );
      carouselContainer.addEventListener("mouseleave", () =>
        this.startAutoPlay()
      );
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.stopAutoPlay();
        this.prevSlide();
        this.startAutoPlay();
      } else if (e.key === "ArrowRight") {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      }
    });
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });

    // Show current slide
    if (this.slides[index]) {
      this.slides[index].classList.add("active");
    }

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Update slide counter
    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
      carouselContainer.setAttribute(
        "data-slide-counter",
        `${index + 1}/${this.slides.length}`
      );
    }

    // Update current slide
    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.showSlide(index);
    }
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// EmailJS Configuration
(function () {
  emailjs.init("WbTfxuoAvFmycxx8K"); // You'll replace this with your actual public key
})();

// Contact Form and Popup Functions
function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";
  // Prevent body scroll when popup is open
  document.body.style.overflow = "hidden";
}

function closePopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "none";
  // Restore body scroll when popup is closed
  document.body.style.overflow = "auto";
}

// Error Popup (re-uses the success popup overlay/content with an error variant)
function showErrorPopup(titleText, messageText) {
  let popup = document.getElementById("successPopup");
  if (!popup) return alert(messageText);

  const content = popup.querySelector(".popup-content");
  const icon = popup.querySelector(".popup-icon i");
  const title = popup.querySelector("h3");
  const paragraph = popup.querySelector("p");

  // Apply error styles
  content.classList.add("error");
  popup.classList.add("error");
  if (icon) icon.className = "bx bx-x-circle";
  if (title) title.textContent = titleText || "Erreur";
  if (paragraph)
    paragraph.textContent = messageText || "Une erreur s'est produite.";

  popup.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Auto-reset styles when closing
  const resetStyles = () => {
    content.classList.remove("error");
    popup.classList.remove("error");
    // Restore success content
    if (icon) icon.className = "bx bx-check-circle";
  };

  // Hook into closePopup to reset styles
  const originalClose = closePopup;
  window.closePopup = function () {
    resetStyles();
    originalClose();
    window.closePopup = originalClose;
  };
}

// Contact Form Handler
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const firstName = form.querySelector('input[type="text"]').value;
  const lastName = form.querySelectorAll('input[type="text"]')[1].value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector("textarea").value;

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Veuillez entrer une adresse email valide.");
    return;
  }

  // Show loading state (optional)
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  // EmailJS parameters
  const templateParams = {
    from_name: `${firstName} ${lastName}`,
    from_email: email,
    message: message,
    to_email: "sowhamedou10@gmail.com",
    reply_to: email,
  };

  // Send email using EmailJS
  emailjs
    .send("service_8c0ibg8", "template_ojsctdn", templateParams)
    .then(
      function (response) {
        console.log("Email sent successfully!", response.status, response.text);

        // Show success popup
        showSuccessPopup();

        // Clear form
        form.reset();
      },
      function (error) {
        console.error("Failed to send email:", error);
        showErrorPopup(
          "Echec de l'envoi",
          "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
        );
      }
    )
    .finally(function () {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Close popup when clicking outside
document.addEventListener("click", (event) => {
  const popup = document.getElementById("successPopup");
  if (event.target === popup) {
    closePopup();
  }
});

// Close popup with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup();
  }
});

// Initialize carousel when DOM is loaded
// Translation data
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      competences: "Competences",
      projects: "Projets",
      parcours: "Parcours",
      contact: "Contact",
      theme: "Mode",
      language: "Langue",
    },
    hero: {
      greeting: "Bonjour, je suis",
      and: "Et je suis ",
      intro:
        "Étudiant en Master et diplômé d'une Licence en Anglais, je suis certifié développeur Front-end. Ma passion pour les langues et la tech me permet de combiner ces deux univers pour créer et innover.",
      learnMore: "En savoir plus",
    },
    about: {
      title: "À PROPOS",
      languages: "Langues",
      english: "Anglais",
      englishDesc: "Courant, communication efficace en contexte international.",
      french: "Français",
      frenchDesc: "Langue native d'usage quotidien, maîtrise écrite et orale.",
      softSkills: "Soft skills",
      skill1: "Engagement et sens des responsabilités",
      skill2: "Esprit d'équipe et collaboration",
      skill3: "Communication claire et synthèse",
      skill4: "Gestion du stress et patience",
      skill5: "Curiosité et apprentissage continu",
      passions: "Passions",
      passion1: "Jeux vidéo (God of War, Uncharted...)",
      passion2: "Animes (Naruto, Solo Leveling, MHA...)",
      passion3: "Science & espace",
      passion4: "Découverte culinaire",
      passion5: "Voyage & cultures",
      passion6: "Gadgets & innovations",
    },
  },
  en: {
    nav: {
      home: "Home",
      competences: "Skills",
      projects: "Projects",
      parcours: "Journey",
      contact: "Contact",
      theme: "Theme",
      language: "Language",
    },
    hero: {
      greeting: "Hello, I am",
      and: "And I am ",
      intro:
        "Master's student and Bachelor's graduate in English, I am a certified Front-end developer. My passion for languages and tech allows me to combine these two worlds to create and innovate.",
      learnMore: "Learn more",
    },
    about: {
      title: "ABOUT",
      languages: "Languages",
      english: "English",
      englishDesc: "Fluent, effective communication in international context.",
      french: "French",
      frenchDesc: "Native language for daily use, written and spoken mastery.",
      softSkills: "Soft skills",
      skill1: "Commitment and sense of responsibility",
      skill2: "Team spirit and collaboration",
      skill3: "Clear communication and synthesis",
      skill4: "Stress management and patience",
      skill5: "Curiosity and continuous learning",
      passions: "Passions",
      passion1: "Video games (God of War, Uncharted...)",
      passion2: "Anime (Naruto, Solo Leveling, MHA...)",
      passion3: "Science & space",
      passion4: "Culinary discovery",
      passion5: "Travel & cultures",
      passion6: "Gadgets & innovations",
    },
  },
};

// Theme toggle function
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const themeIconMobile = document.getElementById("theme-icon-mobile");

  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "bx bx-moon";
    if (themeIconMobile) themeIconMobile.className = "bx bx-moon";
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    themeIcon.className = "bx bx-sun";
    if (themeIconMobile) themeIconMobile.className = "bx bx-sun";
    localStorage.setItem("theme", "light");
  }
}

// Language toggle function
function toggleLanguage(forceReload = false) {
  const langText = document.getElementById("lang-text");
  const langTextMobile = document.getElementById("lang-text-mobile");
  const currentLang = localStorage.getItem("language") || "fr";

  const newLang = currentLang === "fr" ? "en" : "fr";

  // Update button text
  langText.textContent = newLang.toUpperCase();
  if (langTextMobile) langTextMobile.textContent = newLang.toUpperCase();

  // Save preference
  localStorage.setItem("language", newLang);

  // Translate content
  translatePage(newLang);

  // On mobile we can force a quick reload to ensure 3rd-party widgets/typed reset cleanly
  if (forceReload) {
    setTimeout(() => {
      location.reload();
    }, 150);
  }
}

// Translation function
function translatePage(language) {
  const elements = document.querySelectorAll("[data-translate]");
  const langData = translations[language];

  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    const keys = key.split(".");
    let translation = langData;

    for (const k of keys) {
      translation = translation[k];
    }

    if (translation) {
      element.textContent = translation;
    }
  });

  // Update Typed.js strings based on language
  const typedElement = document.getElementById("text-text");
  if (typedElement && typedElement._typed) {
    const newStrings =
      language === "en"
        ? [
            "Front-end developer",
            "Bachelor's graduate in English",
            "Forest and Water Agent",
          ]
        : [
            "developpeur Front-end",
            "diplomé d'une Licence en Anglais",
            "agent d'appuie Eaux-et-Fôrets",
          ];

    console.log("Updating Typed.js strings for language:", language);
    console.log("New strings:", newStrings);

    // Destroy existing instance
    if (typedElement._typed.destroy) {
      typedElement._typed.destroy();
    }

    // Clear the element content
    typedElement.innerHTML = "";

    // Create new instance with new strings
    setTimeout(() => {
      typedElement._typed = new Typed("#text-text", {
        strings: newStrings,
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 200,
        smartBackspace: true,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
      console.log("New Typed.js instance created:", typedElement._typed);
    }, 100);
  } else {
    console.log("Typed element or instance not found for language switch");
  }
}

// Initialize theme and language on page load
function initializeSettings() {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);

  const themeIcon = document.getElementById("theme-icon");
  const themeIconMobile = document.getElementById("theme-icon-mobile");
  if (savedTheme === "light") {
    themeIcon.className = "bx bx-sun";
    if (themeIconMobile) themeIconMobile.className = "bx bx-sun";
  }

  // Load saved language
  const savedLang = localStorage.getItem("language") || "fr";
  const langText = document.getElementById("lang-text");
  const langTextMobile = document.getElementById("lang-text-mobile");
  langText.textContent = savedLang.toUpperCase();
  if (langTextMobile) langTextMobile.textContent = savedLang.toUpperCase();

  // Apply translations
  translatePage(savedLang);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSettings();

  // Add a small delay to ensure all elements are loaded
  setTimeout(() => {
    new ProjectCarousel();
    console.log(
      "Project Carousel initialized with",
      document.querySelectorAll(".project-slide").length,
      "slides"
    );
    // Initialize Typed.js after other async scripts load
    initTypedEffect();
  }, 300);

  // Add form event listener
  const contactForm = document.querySelector(".form-c");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
});
