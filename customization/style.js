var typed = new Typed("#text-text", {
  strings: [
    "developpeur Front-end",
    "diplomé d'une Licence en Anglais",
    "agent d'appuie Eaux-et-Fôrets",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 100,
  loop: true,
});

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
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
