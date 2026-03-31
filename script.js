const WHATSAPP_NUMBER = "5493813842752";

const whatsappLinks = document.querySelectorAll(".js-whatsapp-link");
const faqItems = document.querySelectorAll(".faq-item");
const revealCards = document.querySelectorAll(".reveal-card");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav a");
const topbarWhatsapp = document.querySelector(".topbar-whatsapp");

function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function closeMobileMenu() {
  if (!topbar || !menuToggle) {
    return;
  }

  topbar.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openMobileMenu() {
  if (!topbar || !menuToggle) {
    return;
  }

  topbar.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

whatsappLinks.forEach((link) => {
  const message = link.dataset.message || "Hola, quiero informacion sobre una pagina web.";
  link.href = buildWhatsAppUrl(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
      faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if (menuToggle && topbar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.contains("menu-open");

    if (isOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  if (topbarWhatsapp) {
    topbarWhatsapp.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  document.addEventListener("click", (event) => {
    if (!topbar.classList.contains("menu-open")) {
      return;
    }

    if (topbar.contains(event.target)) {
      return;
    }

    closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      closeMobileMenu();
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealCards.forEach((card) => revealObserver.observe(card));
} else {
  revealCards.forEach((card) => card.classList.add("is-visible"));
}
