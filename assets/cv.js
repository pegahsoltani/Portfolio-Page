import { achievements, experience, skills } from "./cv-data.js";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// Reusable disclosure: every role keeps its factual summary visible while details toggle.
export function renderExperienceEntry(role) {
  const item = element("li", "cv-timeline-item");
  const article = element("article", "cv-role");
  const heading = element("div", "cv-role-heading");
  const title = element("h3", "", role.title);
  title.id = `cv-role-${role.id}`;
  const employer = element("p", "cv-employer", role.employer);
  employer.id = `cv-employer-${role.id}`;
  article.setAttribute("aria-labelledby", `${title.id} ${employer.id}`);
  heading.append(title, element("p", "cv-dates", role.dates));
  const details = element("div", "cv-role-details");
  details.id = `cv-details-${role.id}`;
  const bullets = element("ul", "cv-role-bullets");
  bullets.append(...role.details.map(text => element("li", "", text)));
  details.append(bullets);
  if (role.relatedProjects?.length) {
    const links = element("div", "cv-related-links");
    links.setAttribute("aria-label", `Related work at ${role.employer}`);
    for (const project of role.relatedProjects) {
      const link = element("a", "", project.label);
      link.href = project.href;
      links.append(link);
    }
    details.append(links);
  }
  const toggle = element("button", "cv-details-toggle");
  toggle.type = "button";
  toggle.setAttribute("aria-controls", details.id);
  const setExpanded = expanded => {
    details.hidden = !expanded;
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.textContent = expanded ? "Hide details" : "View details";
    toggle.setAttribute("aria-label", `${toggle.textContent} for ${role.employer}`);
  };
  setExpanded(role.expanded);
  toggle.addEventListener("click", () => setExpanded(toggle.getAttribute("aria-expanded") !== "true"));
  article.append(heading, employer, element("p", "cv-company-description", role.description),
    element("p", "cv-role-highlight", role.highlight), toggle, details);
  item.append(article);
  return item;
}

const page = document.querySelector(".cv-page");
if (page) {
  page.querySelector("#cv-achievement-cards").replaceChildren(...achievements.map(achievement => {
    const card = element("article", "cv-achievement");
    card.append(element("h3", "", achievement.title), element("p", "", achievement.description));
    return card;
  }));
  page.querySelector("#cv-role-list").replaceChildren(...experience.map(renderExperienceEntry));
  page.querySelector("#cv-skill-groups").replaceChildren(...skills.map(skill => {
    const group = element("div", "cv-skill-group");
    group.append(element("h3", "", skill.title), element("p", "", skill.description));
    return group;
  }));
}
