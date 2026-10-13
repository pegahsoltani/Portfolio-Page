import { createProjectCarousel } from "./project-carousel.js";

// Approved V1 copy for Home previews; project routes and titles stay shared.
const previews = {
  "cpp-ab-testing": {
    category: "MobileAction · AdTech · Experimentation",
    headline: "Helping advertisers make evidence-based creative decisions.",
    description: "Advertisers had multiple Custom Product Pages to choose from, but intuition and manual comparisons did not provide a reliably isolated testing environment. I led the product journey from customer discovery through beta and public release, collaborating with Data Science and Engineering to make experiments statistically sound and practical to use.",
    outcome: "15–20% higher observed tap-through rates (TTR)",
    context: "Two enterprise customers completed experiments, applied the results to their creative decisions, and subsequently observed higher TTR compared with previous seasonal periods. This is an observational comparison, not a controlled estimate of the feature's causal impact.",
    tags: ["Product Discovery", "Experimentation", "Beta to Public Release"],
    image: { src: "assets/cpp-ab-testing/testing-dashboard.jpg", alt: "Released CPP A/B Testing dashboard from MobileAction’s public Help Center", width: 1340, height: 717 },
  },
  "pacing-monitor": {
    category: "MobileAction · Enterprise SaaS · Campaign Monitoring",
    headline: "Turning an enterprise requirement into a reusable monitoring feature.",
    description: "An enterprise advertiser moving to our platform needed a reliable way to see whether campaigns were on track against their targets. I helped turn that specific need into a configurable product capability, from customer discovery and initial wireframes to requirements, technical trade-offs, and delivery with Engineering and QA.",
    outcome: "From one customer's need to a wider product capability",
    context: "Pacing Monitor was released to all eligible customers, and the original enterprise customer adopted and used it.",
    tags: ["Enterprise Discovery", "Product Design", "Technical Delivery"],
    image: null,
  },
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function placeholder() {
  const box = element("div", "featured-placeholder");
  box.append(
    element("strong", "", "Product screenshot coming soon"),
    element("p", "", "An approved, publicly shareable screenshot is not yet available."),
  );
  return box;
}

export function renderFeaturedProjects(container, slugs, projects) {
  const stories = slugs.map(slug => {
    const project = projects.find(item => item.slug === slug);
    const preview = previews[slug];
    const story = element("article", "featured-story");
    story.dataset.project = slug;
    const copy = element("div", "featured-copy");
    const title = element("h3", "featured-title", project.title);
    title.id = `featured-${slug}`;
    story.setAttribute("aria-labelledby", title.id);
    const outcome = element("div", "featured-outcome");
    outcome.append(element("strong", "featured-highlight", preview.outcome), element("p", "featured-context", preview.context));
    const tags = element("ul", "featured-tags");
    tags.setAttribute("aria-label", "Project focus");
    tags.append(...preview.tags.map(tag => element("li", "", tag)));
    const link = element("a", "featured-link", "View project →");
    link.href = `projects/${project.slug}/`;
    link.setAttribute("aria-label", `View ${project.title} project`);
    copy.append(element("p", "featured-category", preview.category), title,
      element("p", "featured-headline", preview.headline), element("p", "featured-description", preview.description), outcome, tags, link);
    const visual = element("figure", "featured-visual");
    if (preview.image) {
      const image = element("img", "featured-screenshot");
      Object.assign(image, preview.image, { loading: "lazy", decoding: "async" });
      image.addEventListener("error", () => visual.replaceChildren(placeholder()));
      visual.append(image, element("figcaption", "", "Released product · MobileAction public Help Center"));
    } else {
      visual.classList.add("featured-visual-missing");
      visual.append(placeholder());
    }
    story.append(copy, visual);
    return story;
  });
  createProjectCarousel(container, stories);
}
