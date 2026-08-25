document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-button");
const mainMenu = document.querySelector(".main-nav");
if (menuButton && mainMenu) {
  const label = menuButton.querySelector(".sr-only");
  const setState = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    mainMenu.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
  };
  menuButton.addEventListener("click", () => {
    setState(menuButton.getAttribute("aria-expanded") !== "true");
  });
  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setState(false));
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) setState(false);
  });
}

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
}
