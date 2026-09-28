// Update these details before publishing your portfolio.
const PORTFOLIO = {
  email: "rajpanthi456@gmail.com",
  github: "https://github.com/rajpanthi456-netizen",
  linkedin: "https://www.linkedin.com/in/raj-panthi-3b0457332/"
};

const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");
const introScreen = document.querySelector("#introScreen");
const skipIntro = document.querySelector("#skipIntro");
let introTimer;

function finishIntro() {
  window.clearTimeout(introTimer);
  introScreen.classList.add("intro-finished");
  document.body.classList.remove("intro-running");
  window.setTimeout(() => introScreen.remove(), 750);
}

const particles = document.querySelector("#introParticles");
for (let index = 0; index < 28; index += 1) {
  const particle = document.createElement("i");
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.setProperty("--duration", `${3.5 + Math.random() * 4.5}s`);
  particle.style.setProperty("--delay", `${Math.random() * 3}s`);
  particle.style.setProperty("--drift", `${Math.round(Math.random() * 90 - 45)}px`);
  particles.append(particle);
}

function useFirstAvailableImage(fileNames, onLoad) {
  const tryNext = (index) => {
    if (index >= fileNames.length) return;
    const probe = new Image();
    probe.onload = () => onLoad(fileNames[index]);
    probe.onerror = () => tryNext(index + 1);
    probe.src = `./${fileNames[index]}`;
  };
  tryNext(0);
}

useFirstAvailableImage(["anime-hero.jpg", "anime-hero.jpeg", "anime-hero.png", "anime-hero.webp"], (fileName) => {
  document.querySelector(".hero-backdrop").style.backgroundImage = `url("./${fileName}")`;
  document.querySelector(".intro-backdrop").style.backgroundImage = `linear-gradient(90deg, rgba(3, 5, 14, .7), rgba(4, 5, 16, .2) 55%, rgba(3, 5, 14, .6)), url("./${fileName}")`;
});

document.querySelectorAll("[data-certificate]").forEach((card) => {
  const baseName = `certificate${card.dataset.certificate === "1" ? "" : card.dataset.certificate}`;
  useFirstAvailableImage(["jpg", "jpeg", "png", "webp"].map((extension) => `${baseName}.${extension}`), (fileName) => {
    card.querySelector(".credential-preview").src = `./${fileName}`;
    card.classList.add("has-certificate");
  });
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finishIntro();
else introTimer = window.setTimeout(finishIntro, 3000);
skipIntro.addEventListener("click", finishIntro);

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const siteHeader = document.querySelector(".site-header");
const updateHeader = () => siteHeader.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Use the browser print dialog to save this page as a PDF CV.
// For a proper one-page CV, replace the portfolio details and use print preview.
document.querySelectorAll("#resumeButton, #resumeSectionButton").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const hero = document.querySelector(".hero");
  const heroBackdrop = document.querySelector(".hero-backdrop");
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    heroBackdrop.style.setProperty("--parallax-x", `${(event.clientX - bounds.left - bounds.width / 2) * -0.008}px`);
    heroBackdrop.style.setProperty("--parallax-y", `${(event.clientY - bounds.top - bounds.height / 2) * -0.008}px`);
  });
  hero.addEventListener("pointerleave", () => {
    heroBackdrop.style.setProperty("--parallax-x", "0px");
    heroBackdrop.style.setProperty("--parallax-y", "0px");
  });
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      button.style.setProperty("--mag-x", `${(event.clientX - bounds.left - bounds.width / 2) * .055}px`);
      button.style.setProperty("--mag-y", `${(event.clientY - bounds.top - bounds.height / 2) * .08}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--mag-x", "0px");
      button.style.setProperty("--mag-y", "0px");
    });
  });
}

// Reveal animations; content remains visible if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Contact links
document.querySelector("#emailLink").href = `mailto:${PORTFOLIO.email}`;
document.querySelector("#githubLink").href = PORTFOLIO.github;
document.querySelector("#linkedinLink").href = PORTFOLIO.linkedin;
document.querySelector("#phoneLink").href = "tel:+918819005207";
document.querySelector("#year").textContent = new Date().getFullYear();
