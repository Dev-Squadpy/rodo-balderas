const grid = document.querySelector(".character-grid");
const slices = document.querySelectorAll(".character-slice");

if (grid && slices.length) {
  const activateSlice = (slice) => {
    grid.classList.add("is-hovering");
    slices.forEach((item) => item.classList.toggle("is-active", item === slice));
  };

  const deactivateSlices = () => {
    grid.classList.remove("is-hovering");
    slices.forEach((item) => item.classList.remove("is-active"));
  };

  slices.forEach((slice) => {
    slice.addEventListener("pointerenter", () => activateSlice(slice));
    slice.addEventListener("focus", () => activateSlice(slice));
    slice.addEventListener("pointerleave", deactivateSlices);
    slice.addEventListener("blur", deactivateSlices);
  });
}

const roleMap = document.querySelector(".character-map");
const roleCards = document.querySelectorAll(".role-card");

if (roleMap && roleCards.length) {
  const dragBreakpoint = window.matchMedia("(min-width: 761px)");
  const storageKey = "rodoRoleCardPositions";
  const canSaveRolePositions = (() => {
    try {
      return Boolean(window.localStorage);
    } catch {
      return false;
    }
  })();
  let activeRoleCard = null;
  let pointerOffset = { x: 0, y: 0 };
  let savedRolePositions = {};

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  if (canSaveRolePositions) {
    try {
      savedRolePositions = JSON.parse(window.localStorage.getItem(storageKey)) || {};
    } catch {
      savedRolePositions = {};
    }
  }

  roleCards.forEach((card, index) => {
    const cardKey = `role-${index}`;
    const savedPosition = savedRolePositions[cardKey];

    card.dataset.roleKey = cardKey;

    if (savedPosition?.x && savedPosition?.y) {
      card.style.setProperty("--x", savedPosition.x);
      card.style.setProperty("--y", savedPosition.y);
    }
  });

  const saveRolePosition = (card) => {
    const cardKey = card.dataset.roleKey;

    if (!cardKey) {
      return;
    }

    savedRolePositions[cardKey] = {
      x: card.style.getPropertyValue("--x"),
      y: card.style.getPropertyValue("--y"),
    };

    if (canSaveRolePositions) {
      window.localStorage.setItem(storageKey, JSON.stringify(savedRolePositions));
    }
  };

  const moveRoleCard = (event) => {
    if (!activeRoleCard) {
      return;
    }

    const mapRect = roleMap.getBoundingClientRect();
    const cardRect = activeRoleCard.getBoundingClientRect();
    const halfWidth = (cardRect.width / mapRect.width) * 50;
    const halfHeight = (cardRect.height / mapRect.height) * 50;
    const x = ((event.clientX - mapRect.left - pointerOffset.x) / mapRect.width) * 100;
    const y = ((event.clientY - mapRect.top - pointerOffset.y) / mapRect.height) * 100;

    activeRoleCard.style.setProperty("--x", `${clamp(x, halfWidth, 100 - halfWidth).toFixed(2)}%`);
    activeRoleCard.style.setProperty("--y", `${clamp(y, halfHeight, 100 - halfHeight).toFixed(2)}%`);
  };

  const stopRoleDrag = () => {
    if (!activeRoleCard) {
      return;
    }

    saveRolePosition(activeRoleCard);
    activeRoleCard.classList.remove("is-dragging");
    activeRoleCard = null;
    document.body.style.cursor = "";
    window.removeEventListener("pointermove", moveRoleCard);
    window.removeEventListener("pointerup", stopRoleDrag);
    window.removeEventListener("pointercancel", stopRoleDrag);
  };

  roleCards.forEach((card) => {
    card.addEventListener("pointerdown", (event) => {
      if (!dragBreakpoint.matches || event.button !== 0) {
        return;
      }

      const cardRect = card.getBoundingClientRect();

      activeRoleCard = card;
      pointerOffset = {
        x: event.clientX - cardRect.left - cardRect.width / 2,
        y: event.clientY - cardRect.top - cardRect.height / 2,
      };

      event.preventDefault();
      card.classList.add("is-dragging");
      document.body.style.cursor = "grabbing";
      moveRoleCard(event);
      window.addEventListener("pointermove", moveRoleCard);
      window.addEventListener("pointerup", stopRoleDrag);
      window.addEventListener("pointercancel", stopRoleDrag);
    });
  });
}

const aboutSection = document.querySelector(".about-section");
const aboutCopy = document.querySelector(".about-copy");
const aboutPhoto = document.querySelector(".about-photo");
const aboutSideTitle = document.querySelector(".about-side-title");

if (aboutSection) {
  let revealTimer;

  const showAboutSection = () => {
    aboutSection.classList.add("is-visible");
    aboutCopy?.classList.add("is-visible");
    aboutPhoto?.classList.add("is-visible");
    aboutSideTitle?.classList.add("is-visible");

    if (aboutCopy) {
      aboutCopy.style.opacity = "1";
      aboutCopy.style.transform = "translateY(0)";
    }

    if (aboutPhoto) {
      aboutPhoto.style.opacity = "1";
      aboutPhoto.style.clipPath = "inset(0 0 0 0 round 8px)";
      aboutPhoto.style.transform = "translateX(0) scale(1)";
    }

    if (aboutSideTitle) {
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      aboutSideTitle.style.opacity = "1";
      aboutSideTitle.style.transform = isMobile ? "translateY(0)" : "translateX(0)";
    }
  };

  const revealAboutSection = () => {
    const rect = aboutSection.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.82;

    if (rect.top < triggerPoint || location.hash === "#sobre-mi") {
      showAboutSection();
      window.clearInterval(revealTimer);
      window.removeEventListener("scroll", revealAboutSection);
      window.removeEventListener("resize", revealAboutSection);
      return true;
    }

    return false;
  };

  if ("IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showAboutSection();
            window.removeEventListener("scroll", revealAboutSection);
            window.removeEventListener("resize", revealAboutSection);
            aboutObserver.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.12 }
    );

    aboutObserver.observe(aboutSection);
  }

  if (!revealAboutSection()) {
    window.addEventListener("scroll", revealAboutSection, { passive: true });
    window.addEventListener("resize", revealAboutSection);
    revealTimer = window.setInterval(revealAboutSection, 180);
  } else if (!("IntersectionObserver" in window)) {
    showAboutSection();
  }
}

const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {
  const showRevealItem = (item) => item.classList.add("is-visible");
  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) {
        return;
      }

      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.88) {
        showRevealItem(item);
      }
    });

    if (document.querySelectorAll("[data-reveal]:not(.is-visible)").length === 0) {
      window.clearInterval(revealFallbackTimer);
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("resize", revealOnScroll);
    }
  };
  let revealFallbackTimer;

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showRevealItem(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach(showRevealItem);
  }

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("resize", revealOnScroll);
  revealFallbackTimer = window.setInterval(revealOnScroll, 220);
}

const contactForm = document.querySelector(".contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = contactForm.querySelector(".contact-form__status");

  if (status) {
    status.textContent = "Mensaje preparado. Conectemos pronto.";
  }

  contactForm.reset();
});

const navLinks = document.querySelectorAll(".top-nav__link");
const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = () => {
  let activeId = "inicio";

  navSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight * 0.38) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
};

setActiveNav();
window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("resize", setActiveNav);

const contactFloats = Array.from(document.querySelectorAll(".contact-float"));
const contactFloatImages = [
  "assets/extra1.jpg",
  "assets/extra2.jpg",
  "assets/extra3.jpg",
  "assets/extra5.jpg",
  "assets/extra6.jpg",
  "assets/extra7.jpg",
  "assets/extra8.jpg",
];
const contactFloatLayouts = [
  [
    ["8%", "10%", "-12deg"],
    ["78%", "13%", "10deg"],
    ["14%", "68%", "7deg"],
    ["72%", "70%", "-8deg"],
  ],
  [
    ["14%", "18%", "8deg"],
    ["74%", "10%", "-9deg"],
    ["9%", "74%", "-6deg"],
    ["80%", "62%", "11deg"],
  ],
  [
    ["6%", "55%", "-7deg"],
    ["80%", "22%", "12deg"],
    ["18%", "12%", "5deg"],
    ["70%", "72%", "-12deg"],
  ],
];

let contactFloatStep = 0;

const updateContactFloats = () => {
  if (!contactFloats.length) {
    return;
  }

  const layout = contactFloatLayouts[contactFloatStep % contactFloatLayouts.length];

  contactFloats.forEach((float, index) => {
    const imageIndex = (contactFloatStep + index * 2) % contactFloatImages.length;
    const [x, y, rotation] = layout[index % layout.length];

    float.classList.add("is-swapping");

    window.setTimeout(() => {
      float.src = contactFloatImages[imageIndex];
      float.style.setProperty("--float-x", x);
      float.style.setProperty("--float-y", y);
      float.style.setProperty("--float-rot", rotation);
      float.classList.remove("is-swapping");
    }, 220);
  });

  contactFloatStep += 1;
};

updateContactFloats();
window.setInterval(updateContactFloats, 3600);
