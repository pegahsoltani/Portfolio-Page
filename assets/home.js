import { profile } from "./content.js";

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
if (Object.values(profile.links).every(Boolean)) document.querySelector(".contact-placeholder").hidden = true;
