import { profile, home } from "./content.js";
import { projects } from "./projects.js";

document.title = `${profile.name} · Product Management`;
document.querySelector("h1").textContent = `Hi, I am ${profile.name}`;
document.querySelector(".hero-title").textContent = `${profile.title} | ${profile.specialties.join(" · ")}`;
document.querySelector(".hero-location").textContent = profile.location;
document.querySelector("#intro-title").textContent = profile.introduction;

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
for (const slug of home.featuredProjects) {
  const project = projects.find(item => item.slug === slug);
  const card = document.createElement("article");
  const link = document.createElement("a");
  link.className = "project-panel";
  link.href = `projects/${slug}/`;
  link.textContent = project.title;
  const description = document.createElement("p");
  description.className = "project-summary";
  description.textContent = project.summary;
  const details = document.createElement("a");
  details.href = link.href;
  details.textContent = "View project →";
  details.setAttribute("aria-label", `View ${project.title} project`);
  card.append(link, description, details);
  featured.append(card);
}
