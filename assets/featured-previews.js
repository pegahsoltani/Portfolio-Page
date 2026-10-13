import { createProjectCarousel } from "./project-carousel.js";

// Home-only publication copy. Routes and project titles remain shared.
const previews = {
  "cpp-ab-testing": {
    category: "MobileAction · AdTech · Experimentation",
    headline: "Helping advertisers make evidence-based creative decisions.",
    problem: "Advertisers had multiple Custom Product Pages to choose from, but intuition and manual comparisons did not provide a reliably isolated testing environment.",
    contribution: "I led the product journey from customer discovery through beta and public release, collaborating with Data Science and Engineering to make experiments statistically sound and practical to use.",
    outcome: "Two enterprise customers completed experiments, applied the results to their creative decisions, and subsequently observed 15–20% higher tap-through rates compared with previous seasonal periods.",
    qualification: "This is an observational comparison, not a controlled estimate of the feature's causal impact.",
    tags: ["Product Discovery", "Experimentation", "Beta to Public Release"],
    image: { src: "assets/cpp-ab-testing/testing-dashboard.jpg", alt: "Released CPP A/B Testing dashboard from MobileAction’s public Help Center", width: 1340, height: 717 },
  },
  "pacing-monitor": {
    category: "MobileAction · Enterprise SaaS · Campaign Monitoring",
    headline: "Turning an enterprise requirement into a reusable monitoring feature.",
    problem: "An enterprise advertiser moving to our platform needed a reliable way to see whether campaigns were on track against their targets.",
    contribution: "I shaped the product requirements, created initial wireframes, worked through complex KPI and pacing logic with Engineering, and helped deliver a configurable monitoring experience.",
    outcome: "Pacing Monitor was released to all eligible customers, and the original enterprise customer adopted and used it.",
    tags: ["Enterprise Discovery", "Product Design", "Technical Delivery"],
    // The same conceptual stages used on the Pacing detail page; no app UI is depicted.
    workflow: ["Monitoring period", "Campaign selection", "KPI targets", "Risk boundaries"],
  },
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function unavailableImage() {
  return element("p", "featured-media-fallback", "The released-product screenshot is currently unavailable.");
}

function renderVisual(preview) {
  const visual = element("figure", "featured-visual");
  if (preview.image) {
    const link = element("a", "featured-image-link");
    link.href = preview.image.src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Open the released CPP A/B Testing screenshot at full size");
    const image = element("img", "featured-screenshot");
    Object.assign(image, preview.image, { loading: "lazy", decoding: "async" });
    image.addEventListener("error", () => link.replaceWith(unavailableImage()));
    link.append(image);
    visual.append(link, element("figcaption", "", "Released product · MobileAction public Help Center"));
  } else if (preview.workflow) {
    visual.classList.add("featured-visual-conceptual");
    const steps = element("ol", "featured-workflow");
    steps.setAttribute("aria-label", "Conceptual Pacing Monitor configuration workflow");
    preview.workflow.forEach((step, index) => {
      const item = element("li", "featured-workflow-step");
      const number = element("span", "featured-workflow-number", String(index + 1).padStart(2, "0"));
      number.setAttribute("aria-hidden", "true");
      item.append(number, element("span", "", step));
      steps.append(item);
    });
    visual.append(steps, element("figcaption", "", "Conceptual workflow — not a screenshot of the released product"));
  } else visual.append(unavailableImage());
  return visual;
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
    const narrative = element("dl", "featured-narrative");
    for (const [key, label] of [["problem", "Problem"], ["contribution", "My contribution"], ["outcome", "Outcome"]]) {
      const group = element("div", `featured-${key}`);
      const description = element("dd", "", preview[key]);
      group.append(element("dt", "", label), description);
      if (key === "outcome" && preview.qualification) description.append(element("p", "featured-qualification", preview.qualification));
      narrative.append(group);
    }
    const tags = element("ul", "featured-tags");
    tags.setAttribute("aria-label", "Project focus");
    tags.append(...preview.tags.map(tag => element("li", "", tag)));
    const link = element("a", "featured-link", "View project →");
    link.href = `projects/${project.slug}/`;
    link.setAttribute("aria-label", `View ${project.title} project`);
    copy.append(element("p", "featured-category", preview.category), title,
      element("p", "featured-headline", preview.headline), narrative, tags, link);
    story.append(renderVisual(preview), copy);
    return story;
  });
  createProjectCarousel(container, stories);
}
