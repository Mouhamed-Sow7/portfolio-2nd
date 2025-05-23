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
