import { profile } from "./content.js";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function contactLink(className, label, href) {
  const link = element("a", className);
  link.href = href;
  link.setAttribute("aria-label", label);
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 16 16");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  icon.classList.add("footer-arrow-icon");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M4 12 12 4M4 4h8v8");
  icon.append(path);
  link.append(element("span", "", label.replace(" ↗", "")), icon);
  return link;
}

// Shared by every route; navigation follows the existing header, including unavailable routes.
export function createSiteFooter(header = document.querySelector(".site-header")) {
  const footer = element("footer", "site-footer");
  footer.setAttribute("aria-labelledby", "footer-contact-heading");
  const inner = element("div", "footer-inner");
  const contact = element("div", "footer-contact");
  const copy = element("div", "footer-contact-copy");
  const headline = element("h2", "footer-headline", "Have something interesting in mind? Let's talk.");
  headline.id = "footer-contact-heading";
  copy.append(element("p", "footer-eyebrow", "LET'S CONNECT"), headline,
    element("p", "footer-description", "Whether it's a product opportunity, a collaboration, or just a conversation about building useful things, I'd love to hear from you."));
  const actions = element("div", "footer-actions");
  const email = contactLink("footer-cta footer-cta-primary", "Get in touch ↗", `mailto:${profile.links.email}`);
  const linkedin = contactLink("footer-cta footer-cta-secondary", "LinkedIn ↗", profile.links.linkedin);
  linkedin.target = "_blank";
  linkedin.rel = "noopener noreferrer";
  actions.append(email, linkedin);
  contact.append(copy, actions);
  const bottom = element("div", "footer-bottom");
  const brand = element("div", "footer-brand");
  const wordmark = element("a", "footer-wordmark", "PS.");
  wordmark.href = new URL("../", import.meta.url).href;
  wordmark.setAttribute("aria-label", "Pegah Soltani, Home");
  brand.append(wordmark, element("p", "footer-tagline", profile.headline));
  const navigation = element("nav", "footer-navigation");
  navigation.setAttribute("aria-label", "Footer navigation");
  for (const original of header?.querySelectorAll("nav > *") || []) {
    const item = original.cloneNode(true);
    if (item.tagName === "A") item.href = original.href;
    navigation.append(item);
  }
  const github = element("a", "", "GitHub");
  github.href = profile.links.github;
  github.target = "_blank";
  github.rel = "noopener noreferrer";
  navigation.append(github);
  bottom.append(brand, navigation);
  const copyright = element("p", "footer-copyright", `© ${new Date().getFullYear()} ${profile.name} · Built with curiosity.`);
  inner.append(contact, bottom, copyright);
  footer.append(inner);
  return footer;
}

const mount = document.querySelector("[data-site-footer]");
if (mount && !document.querySelector(".site-footer")) mount.replaceChildren(createSiteFooter());
