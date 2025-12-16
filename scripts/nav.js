document.addEventListener("DOMContentLoaded", function () {
  const links = Array.from(document.querySelectorAll(".headerNavLink"));
  if (!links.length) return;

  // Set a given link as active and clear others
  function setActive(link) {
    links.forEach((l) => {
      const isActive = l === link;
      l.classList.toggle("active", isActive);
      if (isActive) {
        l.setAttribute("aria-current", "page");
      } else {
        l.removeAttribute("aria-current");
      }
    });
  }

  // Choose active link based on current hash or pathname
  function setActiveByLocation() {
    const hash = window.location.hash;
    let match = links.find((l) => l.getAttribute("href") === hash);
    if (match) setActive(match);
  }

  // click handlers
  links.forEach((l) => {
    l.addEventListener("click", (e) => {
      setActive(l);
    });
  });

  // Update active on hashchange
  window.addEventListener("hashchange", setActiveByLocation);

  // Initialize on load
  setActiveByLocation();
});
