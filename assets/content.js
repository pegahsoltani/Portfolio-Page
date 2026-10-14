// Editable copy and explicit mappings to the owner's named photos.
export const profile = {
  name: "Pegah Soltani",
  title: "Technical Product Manager",
  location: "Dublin, Ireland",
  greeting: "Hi, I'm Pegah! 👋",
  headline: "Curious by nature. Product Manager by profession.",
  introduction: [
    "I love asking questions, untangling complex problems, and working with people to turn ideas into products that make a difference.",
    "With a background in Computer Engineering and 5+ years in product management, I bring technical thinking, creativity, and a human perspective to the products I help build.",
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
  aboutHeadline: "Finding the human side of technology.",
  about: [
    "My background in Computer Engineering and over five years in product management has shaped the way I approach problems: stay curious, understand the people involved, and find practical ways to turn complexity into something useful.",
  ],
  aboutPeopleTitle: "People first",
  aboutPeopleDescription: "Teaching English helped me develop the listening, communication, and adaptability skills I still use today.",
  aboutConnectingTitle: "Connecting the dots",
  aboutConnectingDescription: "I enjoy exploring customer needs, technical possibilities, and trade-offs with cross-functional teams to build useful products.",
  aboutExploringTitle: "Always exploring",
  aboutExploringDescription: "Currently learning more about AI products, agentic workflows, and how emerging technologies can solve real problems.",
  aboutClosing: "Good product management, to me, starts with curiosity about people and the discipline to turn what we learn into better decisions.",
  dublinLabel: "A NEW CHAPTER · DUBLIN, IRELAND",
  dublinHeadline: "Making Dublin feel like home, one adventure at a time.",
  dublin: [
    "I recently packed my bags and moved to Dublin, ready for a new chapter and everything that comes with it.",
    "So far, Ireland has been full of lovely surprises. From long walks and beautiful landscapes to cozy pubs and conversations with people I've just met, I've been enjoying the little discoveries that make a new place slowly feel like home.",
    "I'm still finding my favourite corners of the city, making new friends, and building a list of places I want to explore next. And honestly, I think that's one of the best parts of moving somewhere new!",
    "Alongside these adventures, I'm excited about my next professional chapter, too. I'm looking for Product Manager opportunities in Ireland where I can bring my experience, continue learning, and work with people who enjoy building meaningful products together.",
  ],
  hiking: "Hiking helps me slow down, feel calm, and clear my head. Being in nature gives me space to meditate and enjoy the moment. I also love making new friends along the way — especially the deer, cats, and occasional rabbits!",
  dancing: "There’s something really motivating about being part of a community that shares a passion. I found mine in salsa dancing. I never thought I could dance until I gave it a try — now I love the dancing, the friendships, and the enthusiasm everyone brings.",
  photos: {
    dublin: { src: "assets/Moved-To-Dublin.JPG", alt: "Pegah outside the Temple Bar pub in Dublin", width: 3024, height: 4032 },
    hiking3: { src: "assets/Hiking3.jpg", alt: "Pegah meeting a deer on a hike", width: 4000, height: 3000 },
    dancing2: { src: "assets/Dancing2.jpeg", alt: "Salsa dancing with friends", width: 945, height: 2048 },
    dancing1: { src: "assets/Dancing1.jpeg", alt: "A group photo with the dance community", width: 2048, height: 1536 },
  },
  featuredProjects: ["cpp-ab-testing", "kiddiedesk"],
};
