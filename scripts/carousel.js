document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carouselTrack");
  const prevBtn = document.querySelector(".carouselPrev");
  const nextBtn = document.querySelector(".carouselNext");
  const cards = track
    ? Array.from(track.querySelectorAll(".cardContainer"))
    : [];

  if (!track || cards.length === 0) return;

  // Read the CSS gap on the track and convert to pixels.
  function getGapPx() {
    const gap = getComputedStyle(track).gap;
    if (!gap) return 0;
    if (gap.endsWith("rem")) {
      // multiply the rem value by the root font-size to get px
      return (
        parseFloat(gap) *
        parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    }
    return parseFloat(gap);
  }

  // Amount to scroll for one card step
  function getScrollAmount() {
    const cardW = cards[0].offsetWidth;
    return Math.round(cardW + getGapPx());
  }

  // Enable/disable prev/next buttons based on current scroll position
  function updateButtons() {
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled =
      Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;
  }

  // Move by one card on click
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  // Keep buttons state in sync while user scrolls (rAF for better perf)
  track.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateButtons);
  });

  // Keyboard support when track is focused: arrow keys move one card
  track.tabIndex = 0;
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    }
  });

  // Update button enabled/disabled on resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateButtons();
    }, 150);
  });
});
