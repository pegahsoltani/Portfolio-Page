import { profile, home } from "./content.js";
import { projects } from "./projects.js";
import { renderFeaturedProjects } from "./featured-previews.js";

document.title = `${profile.name} · Product Management`;
const hero = document.querySelector("#home-hero");
hero.querySelector(".hero-greeting").textContent = profile.greeting;
hero.querySelector("h1").textContent = profile.headline;
hero.querySelector(".hero-title").textContent = profile.title;
hero.querySelector(".hero-location").textContent = profile.location;
hero.querySelector(".hero-introduction").replaceChildren(...profile.introduction.map(text => {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}));
const primaryCta = hero.querySelector(".hero-cta-primary");
primaryCta.textContent = profile.primaryCta.label;
primaryCta.href = profile.primaryCta.href;
const secondaryCta = hero.querySelector(".hero-cta-secondary");
secondaryCta.textContent = profile.secondaryCta.label;
secondaryCta.href = `mailto:${profile.links.email}`;

for (const [slot, config] of Object.entries(profile.photos)) {
  if (!config.src) continue;
  const image = document.querySelector(`.${slot}-photo`);
  image.addEventListener("load", () => {
    image.hidden = false;
    document.querySelector(`.${slot}-placeholder`).hidden = true;
  });
  if (slot === "city") image.style.setProperty("--city-position", config.position);
  if (config.alt) image.alt = config.alt;
  image.src = config.src;
}

const contactItems = document.querySelectorAll(".contact-links li");
for (const [index, key] of ["linkedin", "email", "github"].entries()) {
  const value = profile.links[key];
  if (!value) continue;
  const link = document.createElement("a");
  link.textContent = contactItems[index].textContent;
  link.href = key === "email" ? `mailto:${value}` : value;
  if (key !== "email") { link.target = "_blank"; link.rel = "noopener noreferrer"; }
  contactItems[index].replaceChildren(link);
}
const missingContacts = Object.entries(profile.links).filter(([, value]) => !value).map(([key]) => key === "email" ? "Email" : "GitHub");
document.querySelector(".contact-placeholder").textContent = `${missingContacts.join(" and ")} details coming soon`;
if (!missingContacts.length) document.querySelector(".contact-placeholder").hidden = true;

for (const element of document.querySelectorAll("[data-copy]")) {
  const copy = home[element.dataset.copy];
  if (Array.isArray(copy)) {
    element.replaceChildren(...copy.map(text => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    }));
  } else element.textContent = copy;
}

for (const image of document.querySelectorAll("[data-photo]")) {
  const photo = home.photos[image.dataset.photo];
  image.alt = photo.alt;
  image.width = photo.width;
  image.height = photo.height;
  image.addEventListener("error", () => {
    const fallback = document.createElement("p");
    fallback.className = "media-fallback";
    fallback.textContent = `${photo.alt} — image unavailable`;
    image.replaceWith(fallback);
  });
  image.src = photo.src;
}

const featured = document.querySelector("#featured-projects");
renderFeaturedProjects(featured, home.featuredProjects, projects);
