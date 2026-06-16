const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const techStack = document.getElementById("tech-stack");
const techMarquee = techStack.parentElement;
const originalSet = techStack.innerHTML;
const targetWidth = techMarquee.clientWidth * 2;

while (techStack.scrollWidth < targetWidth) {
  techStack.insertAdjacentHTML("beforeend", originalSet);
}

techStack.insertAdjacentHTML("beforeend", techStack.innerHTML);

const navLinkEls = document.querySelectorAll("[data-nav-link]");
const sections = [...navLinkEls]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = (id) => {
  navLinkEls.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
      setActiveLink(visible.target.id);
    }
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const serviceCards = document.querySelectorAll(".service-card");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

serviceCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 120}ms`;
  revealObserver.observe(card);
});

document.querySelectorAll("[data-service-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const card = toggle.closest(".service-card");
    const isOpen = card.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});
