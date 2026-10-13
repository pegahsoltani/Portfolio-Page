// Dependency-free carousel. Any array of already-rendered project slides can be used.
export function createProjectCarousel(container, slides) {
  const root = document.createElement("div");
  root.className = "project-carousel";
  root.setAttribute("role", "region");
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("aria-label", "Featured projects");
  const viewport = document.createElement("div");
  viewport.className = "carousel-viewport";
  viewport.tabIndex = 0;
  viewport.setAttribute("aria-label", "Project slides. Use left and right arrow keys to navigate.");
  const track = document.createElement("div");
  track.className = "carousel-track";
  const navigation = document.createElement("div");
  navigation.className = "carousel-navigation";
  const button = (label, text) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "carousel-arrow";
    el.setAttribute("aria-label", label);
    el.textContent = text;
    return el;
  };
  const previous = button("Previous project", "←");
  const next = button("Next project", "→");
  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  dots.setAttribute("role", "group");
  dots.setAttribute("aria-label", "Choose a featured project");
  const status = document.createElement("p");
  status.className = "carousel-status";
  status.setAttribute("aria-live", "polite");
  status.setAttribute("aria-atomic", "true");
  let active = 0;
  const indicators = slides.map((slide, index) => {
    const title = slide.querySelector("h3")?.textContent || `Project ${index + 1}`;
    slide.classList.add("carousel-slide");
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.removeAttribute("aria-labelledby");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}: ${title}`);
    const indicator = button(`Show project ${index + 1}: ${title}`, "");
    indicator.className = "carousel-dot";
    indicator.append(document.createElement("span"));
    indicator.addEventListener("click", () => goTo(index));
    return indicator;
  });

  function goTo(index) {
    active = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(-${active * 100}%)`;
    slides.forEach((slide, i) => {
      if (i !== active && slide.contains(document.activeElement)) viewport.focus({ preventScroll: true });
      slide.inert = i !== active;
      slide.setAttribute("aria-hidden", String(i !== active));
      if (i === active) indicators[i].setAttribute("aria-current", "true");
      else indicators[i].removeAttribute("aria-current");
    });
    previous.disabled = active === 0;
    next.disabled = active === slides.length - 1;
    status.textContent = slides.length ? `Project ${active + 1} of ${slides.length}: ${slides[active].querySelector("h3")?.textContent || ""}` : "No featured projects yet.";
    if (document.activeElement === previous && previous.disabled) next.focus({ preventScroll: true });
    if (document.activeElement === next && next.disabled) previous.focus({ preventScroll: true });
  }

  previous.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  root.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest("input, textarea, select")) return;
    const destinations = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 };
    if (Object.hasOwn(destinations, event.key)) {
      event.preventDefault();
      goTo(destinations[event.key]);
    }
  });

  let start = null;
  viewport.addEventListener("touchstart", event => {
    const touch = event.touches[0];
    start = event.touches.length === 1 ? { id: touch.identifier, x: touch.clientX, y: touch.clientY } : null;
  }, { passive: true });
  viewport.addEventListener("touchcancel", () => { start = null; }, { passive: true });
  viewport.addEventListener("touchend", event => {
    const touch = [...event.changedTouches].find(item => item.identifier === start?.id);
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      // Cancel only the swipe's synthetic click; subsequent link taps work normally.
      if (event.cancelable) event.preventDefault();
      goTo(active + (dx < 0 ? 1 : -1));
    }
  }, { passive: false });

  let wheelDistance = 0;
  let lastWheel = 0;
  let lastChange = -Infinity;
  viewport.addEventListener("wheel", event => {
    const horizontal = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
    if (!horizontal || (!event.shiftKey && Math.abs(horizontal) <= Math.abs(event.deltaY))) return;
    event.preventDefault();
    const now = performance.now();
    if (now - lastWheel > 180 || Math.sign(wheelDistance) !== Math.sign(horizontal)) wheelDistance = 0;
    lastWheel = now;
    if (now - lastChange < 400) return;
    wheelDistance += horizontal * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1);
    if (Math.abs(wheelDistance) >= 40) {
      goTo(active + Math.sign(wheelDistance));
      wheelDistance = 0;
      lastChange = now;
    }
  }, { passive: false });

  track.append(...slides);
  viewport.append(track);
  dots.append(...indicators);
  navigation.append(previous, dots, next);
  navigation.hidden = slides.length < 2;
  root.append(viewport, navigation, status);
  container.replaceChildren(root);
  if (slides.length) goTo(0);
  else {
    viewport.textContent = "No featured projects yet.";
    status.textContent = "No featured projects yet.";
  }
  return { goTo, get activeIndex() { return active; } };
}
