import { projectCardData, createSkillTags } from "./project-card.js";

// Listing-only approved copy; Home previews and detail-page narratives are separate.
export const galleryProjects = [
  {
    slug: "cpp-ab-testing",
    title: "A/B Testing for Apple Ads Creative Pages",
    officialName: "(CPP A/B Testing)",
    linkLabel: "CPP A/B Testing",
    category: "B2B SaaS · AdTech · Experimentation",
    headline: "Helping advertisers choose winning creative variants with real data.",
    description: "Advertisers needed a reliable way to compare different App Store creative pages before using them in campaigns. I led the product from customer discovery through beta and public release, working with Data Science and Engineering to turn a manual, unreliable process into a structured A/B testing experience.",
    outcome: "Two enterprise customers applied the winning test results and later saw 15–20% higher ad engagement.",
    ...projectCardData["cpp-ab-testing"],
    tags: ["#ProductDiscovery", "#Experimentation", "#ProductRequirements", "#BetaToLaunch", "#DataScienceCollaboration"],
  },
  {
    slug: "pacing-monitor",
    title: "Pacing Monitor",
    category: "Enterprise SaaS · AdTech · Campaign Monitoring",
    headline: "Turning a critical enterprise migration requirement into a delivered product capability.",
    description: "A large enterprise customer migrating to MobileAction needed a familiar way to monitor campaign health and budget pacing. I worked directly with the customer and Customer Success, translated the requirement into detailed product specifications, and owned delivery from discovery and planning through sprint execution, validation, and release.",
    outcome: "Delivered for a key enterprise migration",
    outcomeContext: "Released and adopted by the migrating enterprise customer as an important capability for their move to the platform.",
    ...projectCardData["pacing-monitor"],
    tags: ["#EnterpriseProduct", "#CustomerDiscovery", "#ProductRequirements", "#TechnicalTradeoffs", "#ReleaseManagement"],
  },
  {
    slug: "kiddiedesk",
    title: "KiddieDesk",
    category: "Education Technology · Preschool SaaS · Product Development",
    headline: "Bringing preschool operations and parent communication together.",
    description: "I led the product from discovery to release, working directly with teachers, administrators, and parents to understand workflows and validate problems. I translated those insights into product and technical specifications, created an interactive prototype to validate flows and UX, and led phased delivery through design, development, validation, and release.",
    outcome: "MVP released and actively used by a school",
    outcomeContext: "The first version is now in real-world use, with expansion to additional schools planned.",
    ...projectCardData["kiddiedesk"],
    tags: ["#ProductDiscovery", "#UserResearch", "#MVPDefinition", "#CrossFunctionalDelivery", "#ReleaseManagement"],
    image: { src: new URL("./kiddiedesk/school-panel-overview.png", import.meta.url).href, alt: "Illustrative KiddieDesk interface concept — school overview with representative demo data", width: 1536, height: 1024 },
  },
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function placeholder(project) {
  const box = element("div", "gallery-placeholder");
  box.append(element("strong", "", project.title), element("span", "", "Approved product screenshot coming soon"));
  return box;
}

export function createGalleryCard(project) {
  const card = element("article", "gallery-card");
  card.dataset.project = project.slug;
  const href = `${project.slug}/`;
  const linkLabel = project.linkLabel || project.title;
  const media = element("a", "gallery-media project-card-media");
  media.href = href;
  media.setAttribute("aria-label", `View ${linkLabel} project image and details`);
  if (project.image) {
    const image = element("img", "gallery-screenshot project-card-image");
    Object.assign(image, { loading: "lazy", decoding: "async" }, project.image);
    image.addEventListener("error", () => media.replaceChildren(placeholder(project)));
    media.append(image);
  } else media.append(placeholder(project));
  const copy = element("div", "gallery-copy");
  const titleGroup = element("div", "gallery-title-group");
  const title = element("h2", "gallery-title");
  title.id = `gallery-${project.slug}`;
  const titleLink = element("a", "", project.title);
  titleLink.href = href;
  title.append(titleLink);
  titleGroup.append(title);
  if (project.officialName) titleGroup.append(element("p", "gallery-official-name", project.officialName));
  card.setAttribute("aria-labelledby", title.id);
  const outcome = element("div", "gallery-evidence");
  outcome.append(element("p", "gallery-outcome", project.outcome));
  if (project.outcomeContext) outcome.append(element("p", "gallery-qualification", project.outcomeContext));
  const cta = element("a", "gallery-cta", "View project →");
  cta.href = href;
  cta.setAttribute("aria-label", `View ${linkLabel} project`);
  copy.append(element("p", "gallery-category", project.category), titleGroup,
    element("p", "gallery-headline", project.headline), element("p", "gallery-description", project.description), createSkillTags(project.tags), outcome, cta);
  card.append(media, copy);
  return card;
}

const gallery = document.querySelector("#projects-gallery");
if (gallery) gallery.replaceChildren(...galleryProjects.map(createGalleryCard));
