// Shared card presentation data; approved Home and gallery narratives stay separate.
export const projectCardData = {
  "cpp-ab-testing": {
    image: { src: new URL("./a-b-testing-tools.jpg", import.meta.url).href, alt: "CPP A/B Testing project visual", width: 1280, height: 720 },
    tags: ["#ProductDiscovery", "#Experimentation", "#PRD", "#ReleaseManagement", "#CrossFunctionalLeadership"],
  },
  "pacing-monitor": {
    image: { src: new URL("./Pastel Pacing Monitor Dashboard.png", import.meta.url).href, alt: "Pacing Monitor dashboard visual", width: 1448, height: 1086 },
    tags: ["#EnterpriseSaaS", "#PRD", "#ProductDesign", "#StakeholderManagement", "#FeatureDelivery"],
  },
  "kiddiedesk": {
    image: { src: new URL("./KiddieDesk Pastel Preschool Dashboard.png", import.meta.url).href, alt: "KiddieDesk preschool dashboard visual", width: 1448, height: 1086 },
    tags: ["#ProductManagement", "#ProjectManagement", "#Prototyping", "#StakeholderManagement", "#MVPScoping"],
  },
};

export function createSkillTags(tags) {
  const list = document.createElement("ul");
  list.className = "project-card-tags";
  list.setAttribute("aria-label", "Product management skills");
  for (const tag of tags) {
    const item = document.createElement("li");
    item.textContent = tag;
    list.append(item);
  }
  return list;
}
