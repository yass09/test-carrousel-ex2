document.addEventListener("DOMContentLoaded", function () {
  // Sticky header nav behavior
  const headerNav = document.querySelector(".headerNav");
  headerNav.style.top = "21rem";
  window.addEventListener("scroll", (e) => {
    e.preventDefault();

    if (window.scrollY === 0) {
      headerNav.style.top = "21rem";
    }
    if (window.scrollY < 210) {
      headerNav.style.top = 210 - window.scrollY + "px";
    }
    if (window.scrollY > 210) {
      headerNav.style.top = "0px";
    }
  });

  // Active link management
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
