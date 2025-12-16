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
    else setActive(links[0]);
  }

  // click handlers
  links.forEach((l) => {
    l.addEventListener("click", (e) => {
      // update active immediately on click to give instant feedback
      setActive(l);
      // let the browser handle navigation (anchor/hash changes)
    });
  });

  // update active on hashchange (e.g., back/forward navigation)
  window.addEventListener("hashchange", setActiveByLocation);

  // initialize on load
  setActiveByLocation();
});
