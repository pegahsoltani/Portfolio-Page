// Listing-only approved copy; Home previews and detail-page narratives are separate.
export const galleryProjects = [
  {
    slug: "cpp-ab-testing",
    title: "CPP A/B Testing",
    category: "MobileAction · AdTech · Experimentation",
    headline: "Helping advertisers make evidence-based creative decisions.",
    description: "Advertisers needed a reliable way to compare Custom Product Pages without relying on intuition or manual testing under non-isolated conditions. I led the product from discovery through beta and public release, collaborating with Data Science and Engineering to make experimentation reliable and practical.",
    outcome: "Two enterprise customers applied their test findings and subsequently observed 15–20% higher tap-through rates compared with previous seasonal periods.",
    qualification: "This is an observational comparison, not a controlled estimate of the feature's causal impact.",
    image: { src: "../assets/cpp-ab-testing/duration-estimation.jpg", alt: "Released CPP A/B Testing duration estimation and switching-period settings from MobileAction’s public Help Center", width: 1092, height: 446 },
    featuredWide: false,
  },
  {
    slug: "pacing-monitor",
    title: "Pacing Monitor",
    category: "MobileAction · Enterprise SaaS · Campaign Management",
    headline: "Turning an enterprise requirement into a reusable monitoring feature.",
    description: "An enterprise customer needed to understand whether advertising campaigns were progressing toward their targets. I translated that requirement into a broader product capability, shaping the user experience, configurable KPI logic, risk thresholds, and delivery requirements.",
    outcome: "Released to all eligible customers and adopted by the original enterprise customer.",
    image: null,
    featuredWide: false,
  },
  {
    slug: "kiddiedesk",
    title: "KiddieDesk",
    category: "VenusSoft · Preschool SaaS · Product Development",
    headline: "Bringing preschool operations and parent communication together.",
    description: "KiddieDesk brings preschool administration, daily care records, and parent communication into a shared, multi-role SaaS platform. I led product discovery and MVP definition, validated an AI-assisted prototype with the customer, defined a subscription model, and coordinated design and engineering delivery.",
    outcome: "The MVP is in use at a school, with further rollout planned.",
    image: null,
    featuredWide: true,
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
  if (project.featuredWide) card.classList.add("gallery-card-wide");
  const href = `${project.slug}/`;
  const media = element("a", "gallery-media");
  media.href = href;
  media.setAttribute("aria-label", `View ${project.title} project image and details`);
  if (project.image) {
    const image = element("img", "gallery-screenshot");
    Object.assign(image, { loading: "lazy", decoding: "async" }, project.image);
    image.addEventListener("error", () => media.replaceChildren(placeholder(project)));
    media.append(image);
  } else media.append(placeholder(project));
  const copy = element("div", "gallery-copy");
  const title = element("h2", "gallery-title");
  title.id = `gallery-${project.slug}`;
  const titleLink = element("a", "", project.title);
  titleLink.href = href;
  title.append(titleLink);
  card.setAttribute("aria-labelledby", title.id);
  const outcome = element("div", "gallery-evidence");
  outcome.append(element("p", "gallery-outcome", project.outcome));
  if (project.qualification) outcome.append(element("p", "gallery-qualification", project.qualification));
  const cta = element("a", "gallery-cta", "View project →");
  cta.href = href;
  cta.setAttribute("aria-label", `View ${project.title} project`);
  copy.append(element("p", "gallery-category", project.category), title,
    element("p", "gallery-headline", project.headline), element("p", "gallery-description", project.description), outcome, cta);
  card.append(media, copy);
  return card;
}

const gallery = document.querySelector("#projects-gallery");
if (gallery) gallery.replaceChildren(...galleryProjects.map(createGalleryCard));
