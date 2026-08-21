(function () {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const waToggle = document.getElementById("waToggle");
  const waMenu = document.getElementById("waMenu");
  const toTop = document.getElementById("toTop");
  const loadingScreen = document.getElementById("loading-screen");
  const contactForm = document.getElementById("contactForm");

  const setHeaderState = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("is-scrolled", scrolled);
    toTop?.classList.toggle("is-visible", window.scrollY > 600);
  };

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      loadingScreen?.classList.add("is-hidden");
    }, 360);
  });

  navToggle?.addEventListener("click", () => {
    navToggle.classList.toggle("is-active");
    mobileNav?.classList.toggle("is-open");
    document.body.classList.toggle("nav-open");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.classList.remove("is-active");
      mobileNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });

  waToggle?.addEventListener("click", () => {
    waMenu?.classList.toggle("is-open");
  });

  document.addEventListener("click", (event) => {
    if (!waMenu || !waToggle) return;
    const target = event.target;
    if (target instanceof Node && !waMenu.contains(target) && !waToggle.contains(target)) {
      waMenu.classList.remove("is-open");
    }
  });

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.getAttribute("data-reveal-delay") || 0) * 90;
        window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-count") || 0);
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const nombre = String(formData.get("nombre") || "").trim();
    const telefono = String(formData.get("telefono") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const mensaje = String(formData.get("mensaje") || "").trim();

    const text = [
      "Hola, quiero recibir información con Consultores JP.",
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Tipo de asesoría: ${area}`,
      mensaje ? `Mensaje: ${mensaje}` : ""
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/524497420000?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();
