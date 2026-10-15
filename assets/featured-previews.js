import { projectCardData, createSkillTags } from "./project-card.js";
import { createProjectCarousel } from "./project-carousel.js";
import { galleryProjects } from "./projects-gallery.js";

// Approved V1 copy for Home previews; project routes and titles stay shared.
const previews = {
  "cpp-ab-testing": {
    title: "A/B Testing for Apple Ads Creative Pages\n(CPP A/B Testing)",
    category: "B2B SaaS · AdTech · Experimentation",
    headline: "Helping advertisers choose winning creative variants with real data.",
    description: "Advertisers needed a reliable way to compare different App Store creative pages before using them in campaigns. I led the product from customer discovery through beta and public release, working with Data Science and Engineering to turn a manual, unreliable process into a structured A/B testing experience.",
    outcome: "Two enterprise customers applied the winning test results and later saw 15–20% higher ad engagement.",
    context: "Results were based on before/after customer performance, not a controlled causal study.",
    ...projectCardData["cpp-ab-testing"],
    tags: ["#ProductDiscovery", "#Experimentation", "#ProductRequirements", "#BetaToLaunch", "#DataScienceCollaboration"],
    caption: "CPP A/B Testing — product visual",
  },
  "pacing-monitor": {
    category: "MobileAction · Enterprise SaaS · Campaign Monitoring",
    headline: "Turning an enterprise requirement into a reusable monitoring feature.",
    description: "MobileAction's largest enterprise customer moving to our platform needed a reliable way to see whether campaigns were on track against their targets. I helped turn that specific need into a configurable product capability, from customer discovery and initial wireframes to requirements, technical trade-offs, and delivery with Engineering and QA.",
    outcome: "Delivered for the largest enterprise customer",
    context: "Pacing Monitor was delivered, enabled, and used by MobileAction's largest enterprise customer. Access was limited to this customer.",
    ...projectCardData["pacing-monitor"],
  },
  "kiddiedesk": {
    ...galleryProjects.find(project => project.slug === "kiddiedesk"),
    category: "Education Technology · Preschool SaaS · Product Development",
    description: "I led the product from discovery to release, working directly with teachers, administrators, and parents to understand their daily workflows and validate the problems worth solving. I translated those insights into product and technical specifications, created an interactive prototype to validate flows and UX, divided the work into phased deliverables, and led the product through design, development, validation, and release.",
    tags: ["#ProductDiscovery", "#UserResearch", "#MVPDefinition", "#CrossFunctionalDelivery", "#ReleaseManagement"],
    outcome: "MVP released and actively used by a school",
    context: "The first version is now in real-world use, with expansion to additional schools planned.",
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
    const title = element("h3", "featured-title", preview.title || project.title);
    title.id = `featured-${slug}`;
    story.setAttribute("aria-labelledby", title.id);
    const outcome = element("div", "featured-outcome");
    outcome.append(element("strong", "featured-highlight", preview.outcome), element("p", "featured-context", preview.context));
    const tags = createSkillTags(preview.tags);
    const link = element("a", "featured-link", "View project →");
    link.href = `projects/${project.slug}/`;
    link.setAttribute("aria-label", `View ${project.title} project`);
    copy.append(element("p", "featured-category", preview.category), title,
      element("p", "featured-headline", preview.headline), element("p", "featured-description", preview.description), tags, outcome, link);
    const visual = element("figure", "featured-visual");
    if (preview.image) {
      const media = element("div", "project-card-media");
      const image = element("img", "featured-screenshot project-card-image");
      Object.assign(image, preview.image, { loading: "lazy", decoding: "async" });
      image.addEventListener("error", () => visual.replaceChildren(placeholder()));
      media.append(image);
      visual.append(media);
      if (preview.caption) visual.append(element("figcaption", "", preview.caption));
    } else {
      visual.classList.add("featured-visual-missing");
      visual.append(placeholder());
    }
    story.append(copy, visual);
    return story;
  });
  createProjectCarousel(container, stories, slugs.map(slug => projects.find(project => project.slug === slug).title));
}
