export const jobs = [
    {
        id: 1,
        title: "Senior Full Stack Developer",
        location: "Remote / Spring, TX",
        job_mode: "Remote",
        about_role: "We are looking for a Senior Full Stack Developer to lead our web development projects using Next.js and Node.js.",
        responsibilities: "Design and implement scalable web applications. Collaborate with UX/UI designers. Mentor junior developers.",
        requirements: "5+ years of experience with React/Next.js. Strong knowledge of Node.js and PostgreSQL.",
        nice_to_have: "Experience with AWS or Vercel deployments.",
        posted_at: "2026-03-24T10:00:00Z"
    },
    {
        id: 2,
        title: "UI/UX Designer",
        location: "Hybrid / Houston, TX",
        job_mode: "Hybrid",
        about_role: "Create stunning and intuitive user interfaces for our diverse range of clients.",
        responsibilities: "Develop wireframes and prototypes. Conduct user research. Design high-fidelity UI mockups.",
        requirements: "3+ years of experience in UI/UX design. Proficiency in Figma or Adobe XD.",
        nice_to_have: "Basic knowledge of HTML/CSS.",
        posted_at: "2026-03-22T09:00:00Z"
    }
];

export const industries = [
    { id: 1, name: "Artificial Intelligence", description: "Innovating with AI to transform industries.", img: "AI.png" },
    { id: 2, name: "Digital Marketing", description: "Driving growth through data-driven marketing.", img: "dig_market.png" },
    { id: 3, name: "Web & App Development", description: "Building scalable digital platforms.", img: "web_dev.png" },
    { id: 4, name: "Cybersecurity", description: "Securing your digital world.", img: "cyber_sec.png" },
    { id: 5, name: "Data Analytics", description: "Unlocking insights from data.", img: "data_anal.png" },
    { id: 6, name: "E-commerce", description: "Revolutionizing online retail.", img: "e_com.png" },
];

export const insights = [
    {
        id: 1,
        title: "The Future of AI in 2025",
        description: "Discover how AI is reshaping the software industry and what to expect in the coming years. AI is not just a tool but a fundamental shift in how we build and interact with software.",
        content: "Full content of the AI insight goes here...",
        image: "AI.png",
        date: "March 20, 2026"
    },
    {
        id: 2,
        title: "Cybersecurity Best Practices",
        description: "Stay ahead of threats with our latest guide on securing your business's digital infrastructure. Protecting data is more critical than ever in the age of remote work.",
        content: "Full content of the cybersecurity insight goes here...",
        image: "cyber_sec.png",
        date: "March 15, 2026"
    }
];

export const categories = [
    { id: 1, name: "Web & App Development" },
    { id: 2, name: "Digital Marketing" },
    { id: 3, name: "Data Analytics" },
];

export const projects = [
    {
        id: 1,
        categoryId: 1,
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform built with Next.js and Stripe.",
        link: "https://example.com/project1",
        images: ["e_com.png", "code.png"]
    },
    {
        id: 2,
        categoryId: 1,
        title: "Healthcare App",
        description: "A telemedicine app for patient-doctor consultations.",
        link: "https://example.com/project2",
        images: ["h_tech.png", "web_dev.png"]
    }
];
