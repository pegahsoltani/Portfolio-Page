// Editable copy and explicit mappings to the owner's named photos.
export const profile = {
  name: "Pegah Soltani",
  title: "Product Manager · Technical Product Manager · Product Owner",
  location: "Dublin, Ireland",
  workAuthorization: "Authorized to work in Ireland — no sponsorship required",
  greeting: "Hi, I'm Pegah! 👋",
  headline: "Technical Product Manager bridging engineering, customers, and business.",
  introduction: [
    "Computer Engineering background with 5+ years of experience owning products end to end — from discovery and technical requirements to delivery, release, and validation.",
    "I’ve worked across B2B SaaS and AdTech, collaborated directly with enterprise customers including Google, and owned product delivery within an official Apple Ads partner platform.",
  ],
  primaryCta: { label: "Explore My Work", href: "projects/" },
  secondaryCta: { label: "Get in Touch" },
  specialties: ["B2B SaaS", "AI Products", "Experimentation"],
  photos: {
    city: { src: "assets/Sunset-Dublin-Background.jpg", position: "center" },
    portrait: { src: "assets/Profile-Picture.JPG", alt: "Pegah Soltani overlooking Dublin" },
  },
  links: { linkedin: "https://www.linkedin.com/in/pegahsoltani", email: "pegsoltani@gmail.com", github: "https://github.com/pegahsoltani" },
};

export const home = {
  aboutLabel: "A LITTLE ABOUT ME",
  aboutHeadline: "Making complex things easier to understand.",
  about: [
    "I’ve always been comfortable moving between technical detail and human conversation. Whether I’m discussing constraints with engineers, explaining a decision to a customer, or entering a completely new domain, I try to make things clear, practical, and easy to follow.",
  ],
  aboutPeopleTitle: "Making complexity clear",
  aboutPeopleDescription: "While studying Computer Engineering, I also taught English to business owners from different backgrounds. That experience strengthened my ability to listen carefully, explain the same idea in different ways, and adapt my communication to the person in front of me — skills I now use constantly when working with engineers, customers, and stakeholders.",
  aboutConnectingTitle: "Detailed enough to build from",
  aboutConnectingDescription: "I care a lot about clarity in product specifications. I work closely with engineers to understand constraints, question assumptions, and make sure requirements are realistic enough to build from — not just polished on paper.",
  aboutExploringTitle: "I ask a lot of questions",
  aboutExploringDescription: "When I enter a new domain, I start by understanding how the teams work, who the customers are, what the company is prioritising, and what problem the product is really solving. Then I go through the product myself, ask questions freely, and build context before making decisions.",
  aboutClosing: "Good product work starts when everyone — customer, engineer, and stakeholder — can understand the problem the same way.",
  dublinLabel: "A NEW CHAPTER · DUBLIN, IRELAND",
  dublinHeadline: "Making Dublin feel like home, one adventure at a time.",
  dublin: [
    "I recently moved to Dublin and have been enjoying everything that comes with discovering a new city — long walks, beautiful landscapes, cozy pubs, and conversations with people I’ve just met.",
    "Moving somewhere new has also reminded me how much I enjoy learning my way into unfamiliar environments: asking questions, meeting new people, and gradually understanding how things work.",
    "I’m now excited about the professional side of this new chapter too. I’m exploring Product Manager, Technical Product Manager, and Product Owner opportunities in Ireland where I can bring my product experience, technical background, and customer-facing skills to a new team.",
    "Based in Dublin · Authorized to work in Ireland · No sponsorship required",
  ],
  hiking: "Hiking helps me slow down, feel calm, and clear my head. Being in nature gives me space to meditate and enjoy the moment. I also love making new friends along the way — especially the deer, cats, and occasional rabbits!",
  dancing: "There’s something really motivating about being part of a community that shares a passion. I found mine in salsa dancing. I never thought I could dance until I gave it a try — now I love the dancing, the friendships, and the enthusiasm everyone brings.",
  photos: {
    dublin: { src: "assets/Moved-To-Dublin.JPG", alt: "Pegah outside the Temple Bar pub in Dublin", width: 3024, height: 4032 },
    hiking3: { src: "assets/Hiking3.jpg", alt: "Pegah meeting a deer on a hike", width: 4000, height: 3000 },
    dancing2: { src: "assets/Dancing2.jpeg", alt: "Salsa dancing with friends", width: 945, height: 2048 },
    dancing1: { src: "assets/Dancing1.jpeg", alt: "A group photo with the dance community", width: 2048, height: 1536 },
  },
  featuredProjects: ["cpp-ab-testing", "kiddiedesk", "pacing-monitor"],
};
