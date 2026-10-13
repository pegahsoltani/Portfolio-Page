// Add only publication-approved screenshots. Leave empty while none are available.
// Each entry: { section: "workflow" | "mvp" | "technical-decisions" | "delivery" |
// "outcomes" | other narrative section ID, src, alt, caption, attribution, width?, height? }.
// Use the real approved asset path and factual captions; these images supplement diagrams.
export const verifiedProductImages = [];

export function renderVerifiedProductImages(root, images = verifiedProductImages) {
  for (const image of images) {
    const container = root.querySelector(`#pacing-images-${CSS.escape(image.section)}`);
    if (!container || !image.src || !image.alt || !image.caption || !image.attribution) continue;
    const figure = document.createElement("figure");
    figure.className = "pacing-product-image";
    const link = document.createElement("a");
    link.href = image.src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open full-size image: ${image.alt}`);
    const img = document.createElement("img");
    img.alt = image.alt;
    img.loading = "lazy";
    img.decoding = "async";
    if (image.width) img.width = image.width;
    if (image.height) img.height = image.height;
    img.src = image.src;
    img.addEventListener("error", () => {
      const message = document.createElement("p");
      message.textContent = "The approved product image is unavailable.";
      link.replaceWith(message);
    });
    const caption = document.createElement("figcaption");
    caption.textContent = `${image.caption} · ${image.attribution}`;
    link.append(img);
    figure.append(link, caption);
    container.append(figure);
    container.hidden = false;
  }
}

const story = document.querySelector(".pacing-story");
if (story) renderVerifiedProductImages(story);
