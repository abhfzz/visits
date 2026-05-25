const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

function closeMobileMenu() {
  body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

function openMobileMenu() {
  body.classList.add("nav-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Cerrar menú");
}

menuToggle.addEventListener("click", () => {
  const isOpen = body.classList.contains("nav-open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

document.addEventListener("click", (event) => {
  const clickInsideMenu = mainNav.contains(event.target);
  const clickOnToggle = menuToggle.contains(event.target);

  if (!clickInsideMenu && !clickOnToggle && body.classList.contains("nav-open")) {
    closeMobileMenu();
  }
});

const sections = document.querySelectorAll("section[id]");
const observerOptions = {
  root: null,
  rootMargin: "-35% 0px -55% 0px",
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const activeId = entry.target.getAttribute("id");

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", linkHref === activeId);
    });
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 20) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }

  lastScrollY = currentScrollY;
});
