export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  description: string;
  fullDescription: string;
  image: string;
  skills: string[];
  certificates: { name: string; issuer?: string; year?: string; image?: string; link?: string }[];
  bulletPoints: string[];
  cvLink: string;
  socials: {
    linkedin?: string;
    email?: string;
    phone?: string;
    github?: string;
  };
};

export const seniorDevelopers: TeamMember[] = [
  {
    slug: "uzair-yasin",
    name: "Engr. Uzair Yasin",
    role: "Agentic AI & Backend Developer",
    description: "Developing Agentic AI systems and optimized backend APIs",
    fullDescription: "Engr. Uzair Yasin is a Generative AI Engineer and Full-Stack Developer with expertise in Python, FastAPI, and Next.js. Currently working as an Agentic AI & Backend Developer at Cartlow, he specializes in building innovative digital solutions using LangChain, CrewAI, and LLMs. A collaborative team player, Uzair is focused on solving real-world problems through impactful AI features like data summarization and chatbot automation.",
    image: "/uzair.png",
    skills: [
      // Programming Languages
      "Python",
      "JavaScript",
      "TypeScript",

      // Front End Web-Dev
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "JavaScript",

      // Back End Web-Dev
      "Node.js",
      "Express.js",
      "Mongoose",
      "MongoDB",
      "Next.js",

      // Back End Web-Dev (Python)
      "Django",
      "FastAPI",
      "Flask",

      // Generative AI
      "LLMs",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "SDK",
      "Gemini",
      "Custom GPTs",

      // Libraries
      "Numpy",
      "Pandas",
      "Matplotlib",

      // Others
      "Data Structures",
      "OOPs",
      "Problem Solving"
    ],
    bulletPoints: [
      "Developing Agentic AI systems using LangChain and CrewAI at Cartlow",
      "Expertise in building scalable backend APIs with FastAPI, Django, and Flask",
      "Full-stack development with Next.js, TypeScript, and modern UI frameworks",
      "Strong academic record with 3.5 CGPA from UET Lahore"
    ],
    certificates: [
      { 
        name: "Crash Course on Python", 
        issuer: "Google",
        image: "/uzair-detail/Crash-Course-on-Python-(Google).png",
        link: "https://www.coursera.org/account/accomplishments/verify/0AC62NB76RPV" 
      },
      { 
        name: "Artificial Intelligence and Machine Learning", 
        issuer: "UET Lahore",
        image: "/uzair-detail/Artificial-Intelligence-and-Machine-Learning-(UET).png",
        link: "https://www.linkedin.com/posts/uzair-yasin_artificialintelligence-machinelearning-python-activity-7242350360986603520-iVrw/" 
      },
      { 
        name: "Introduction to HTML, CSS, & JavaScript", 
        issuer: "IBM",
        image: "/uzair-detail/Introduction-to-HTML-CSS-&-JavaScript-(IBM).png",
        link: "https://www.coursera.org/account/accomplishments/verify/6LJPLMFC408J" 
      },
      { 
        name: "AI For Everyone", 
        issuer: "DeepLearning.AI",
        image: "/uzair-detail/Al-For-Everyone-(DeepLearningAl).png",
        link: "https://www.coursera.org/account/accomplishments/verify/E7TKKCDZCET7" 
      },
      { 
        name: "Career Essentials in Generative AI", 
        issuer: "Microsoft & LinkedIn",
        image: "/uzair-detail/Career-Essentials-in-Generative-Al-(Microsoft and Linkedin).png",
        link: "https://www.linkedin.com/posts/uzair-yasin_certificate-of-completion-activity-7169777884792799232-pbrh/" 
      },
      { 
        name: "Introduction to FastAPI Framework", 
        issuer: "Duke University",
        image: "/uzair-detail/Introduction-to-FastAPI-Framework(Duke-University).png",
        link: "https://www.coursera.org/account/accomplishments/verify/6SQCYK51ATQ3" 
      },
      { 
        name: "T3 Stack (TypeScript, Tailwind CSS, Next.js)", 
        issuer: "UET Lahore",
        image: "/uzair-detail/T3-Stack-(TypeScript-Tailwind-CSS-Next.js).png",
        link: "https://www.linkedin.com/posts/uzair-yasin_typescript-nextjs-tailwindcss-activity-7237680136114843648-1baj/" 
      }
    ],
    cvLink: "/uzair-detail/uzair-cv.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/uzair-yasin",
      email: "uzairyasin395@gmail.com",
      phone: "(+92) 3236891550"
    }
  },
  {
    slug: "fahad-jabbar",
    name: "Engr. Fahad Jabbar",
    role: "Senior Frontend Engineer",
    description: "Crafting user-friendly designs that deliver smooth experiences",
    fullDescription: "Engr. Fahad Jabbar is a dedicated Senior Frontend Engineer with a profound expertise in building high-performance, immersive digital experiences. Specializing in modern web technologies, he blends creative design with technical precision to build user interfaces that are not only visually stunning but also highly accessible and performant. With a strong background in Next.js and Framer Motion, Fahad focuses on creating seamless user journeys that drive engagement and business value.",
    image: "/fahad.jpg",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux & Context API",
      "UI/UX Design (Figma)",
      "Performance Optimization",
      "API Integration (REST/GraphQL)",
      "Responsive Web Design"
    ],
    bulletPoints: [
      "Expertise in building complex, high-performance web applications with Next.js",
      "Advanced knowledge of animation and motion design using Framer Motion",
      "Strong focus on pixel-perfect UI implementation and accessibility (A11y)",
      "Proven track record of optimizing bundle sizes and improving Core Web Vitals",
      "Lead frontend architect for enterprise-scale digital transformations"
    ],
    certificates: [],
    cvLink: "/fahad-detail/fahad-cv.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/mfahadjbr/",
      email: "mfahadjbr@gmail.com",
      phone: "(+92) 3295851873"
    }
  }
];

export const testimonialTeam: TeamMember[] = [
  {
    slug: "maryam-riaz",
    name: "Maryam Riaz",
    role: "Frontend Engineer",
    description: "Crafting user-friendly designs that deliver smooth experiences",
    fullDescription: `Maryam Riaz is a dedicated Frontend Engineer with a passion for crafting intelligent and visually engaging web applications. She holds a Master’s degree in Computer Science (MCS) from the Virtual University of Pakistan, providing her with strong expertise in AI, Data Structures, Algorithms, and modern Web Technologies.

Maryam is a Certified Cloud Applied Generative AI Engineer (PIAIC, 2024), with advanced proficiency in Next.js, TypeScript, Tailwind CSS, Python, and FastAPI. She specializes in developing responsive, accessible, and high-performance web solutions—seamlessly integrating AI-driven features to deliver real-world value.`,
    image: "/maryam-detail/maryam.png", // Ensure 'maryam.jpg' is present in public/
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Tailwind CSS",
      "ShadCN UI",
      "Figma",
      "C++",
      "AI / LLM",
      "Agentic AI",
      "Prompt Engineering",
      "Context Engineering",
      "FastAPI",
      "n8n Automation",
      "Git",
      "GitHub",
      "VS Code",
      "Docker",
      "API Development",
      "UI / UX Design",
      "Database",
      "Automation"
    ],
    bulletPoints: [
      "Master of Computer Science (Virtual University of Pakistan)",
      "Joined PIAIC – Certified Cloud Applied Generative AI Engineer (2024)",
      "Skilled in building beautiful and interactive web experiences",
      "Focused on AI-integrated, responsive, and creative web applications",
      "Avid explorer of new technologies and automation workflows"
    ],
    certificates: [
      {
        name: "Building Voice Agents for Production",
        issuer: "DeepLearning.AI",
        image: "/maryam-detail/Building-Voice-Agents-for-Production.png", // Place this image in the public folder as 'cert-voice-agents.jpg'
        link: "https://learn.deeplearning.ai/accomplishments/e34bc7ae-ecd2-4e4f-9df6-ebd194ea2d6c?usp=sharing"
      },
      {
        name: "n8n Automation",
        issuer: "Udemy",
        image: "/maryam-detail/n8n-automation.png", // Place in public as 'cert-n8n-automation.jpg'
        link: "https://www.udemy.com/certificate/UC-638baeaa-6453-4da2-aa24-20facc3708c3/"
      },
      {
        name: "HTML, CSS and JavaScript Certificate",
        issuer: "Coursera",
        image: "/maryam-detail/HTML-CSS-and-JavaScript-Certificate.png", // Place in public as 'cert-html-css-js.jpg'
        link: "https://www.coursera.org/account/accomplishments/verify/YPH8WP5S5HZX"
      },
      {
        name: "PHP",
        issuer: "Great Learning Academy",
        image: "/maryam-detail/PHP.png", // Place in public as 'cert-php.jpg'
        link: "https://www.mygreatlearning.com/certificate/EGMUHVFF"
      }
    ],
    cvLink: "/maryam-cv.pdf", // Place resume as 'maryam-cv.pdf' in public/
    socials: {
      linkedin: "https://www.linkedin.com/in/maryamriazdev/",
      email: "maryamriaz408@gmail.com",
      // Add phone if desired, otherwise leave blank or omit
    }
  },
  {
    slug: "abdul-hannan",
    name: "Abdul Hannan",
    role: "Full Stack Engineer",
    description: "MERN stack developer creating responsive and immersive web experiences",
    fullDescription: "Abdul Hannan specializes in React/Next + FastAPI/Node/Express with expertise in PostgreSQL, MongoDB, Docker & Cloud technologies. His focus on modern web technologies and collaborative approach results in robust and scalable applications that are both beautiful and highly performant.",
    image: "/hannan-detail/abdulhannan.jpg",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Git",
      "GitHub",
      "RESTful APIs",
      "Responsive Design",
      "CI/CD",
      "Cloud Deployment"
    ],
    bulletPoints: [
      "Proficient in MERN stack development with cutting-edge technologies",
      "Expert in responsive design that adapts fluidly to different screen sizes",
      "Builds accessible and engaging digital spaces for diverse user needs",
      "Continuous learner thriving on exploring innovative solutions"
    ],
    certificates: [
      { 
        name: "AI For Everyone", 
        issuer: "Coursera",
        image: "/hannan-detail/AI-For-Everyone.jpg",
        link: "#" 
      },
      // { 
      //   name: "MERN Stack", 
      //   issuer: "Various",
      //   image: "",
      //   link: "#" 
      // },
      { 
        name: "C++ Essentials 1", 
        issuer: "Cisco & C++ Institute",
        image: "/hannan-detail/C++-Essentials.jpg",
        link: "#" 
      },
      { 
        name: "Introduction to Front-End Development", 
        issuer: "Meta",
        image: "/hannan-detail/Introduction-to-Front-End-Development.jpg",
        link: "#"
      }
    ],
    cvLink: "/Profile.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/abdul-hannan-bhatti/",
      email: "abdulhannan.personal@gmail.com",
      phone: "+923334688363"
    }
  },
  {
    slug: "alisha-kayani",
    name: "Alisha Kayani",
    role: "Backend Software Engineer ",
    description: "Building scalable backend infrastructure with Python and FastAPI",
    fullDescription: `I am a Software Engineer specializing in Backend Development and AI Automation. I build scalable APIs and intelligent agentic workflows using Python (FastAPI) and modern full-stack technologies. My experience includes integrating LLMs, cloud infrastructure, and process automation for real-world business solutions.

I am continuously learning, currently expanding my skills at PIAIC in Cloud Native Applied Generative AI. With a degree in Software Engineering from Virtual University, I focus on delivering reliable and efficient systems that drive innovation and automate complex tasks.

Let's connect to create practical, future-ready AI software together.`,
    image: "/alisha-detail/alisha-image.jpeg",
    skills: [
      // Core Backend
      "Python",
      "FastAPI",
      "Django",
      "API Design",
      "OAuth",
      "JWT",
      "ETL Pipelines",
      "CI/CD",
      "Cloud Deployment",
      // Generative AI / Agentic
      "LLM Integration",
      "Agentic Workflows",
      "Agent Factory",
      "Automation",
      "Zapier",
      "n8n",
      // Full Stack
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Next.js",
      "React",
      "MongoDB",
      // General
      "Software Development",
      "System Optimization",
      "Problem Solving"
    ],
    bulletPoints: [
      "Built autonomous AI agentic workflows for automating complex SaaS integrations",
      "Developed robust server-side logic (auth, validation, API integrations: Stripe, OpenAI, CRMs)",
      "Refactored legacy codebases to optimize API endpoints and improve app stability",
      "Built custom automation scripts and ETL pipelines to synchronize data between disparate systems using Python, Zapier, and n8n",
      "Managed full software lifecycle including database design, deployment, and CI/CD"
    ],
    certificates: [
      {
        name: "Stanford Programming Course",
        issuer: "Stanford University",
        image: "/alisha-detail/Programming-Course.png",
        link: "https://codeinplace.stanford.edu/cip5/certificate/4v8xfd"
      }
    ],
    cvLink: "/alisha-kayani-cv.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/alisha-kayani",
      email: "alishakayani.ai@gmail.com",
    }
  },
  {
    slug: "esha-amjad",
    name: "Esha Amjad",
    role: "Backend Software Engineer",
    description: "Professional AI Engineer specializing in Agentic systems, Python programming, and practical automation.",
    fullDescription: `Esha Amjad is a professional Computer Science graduate (BSCS, LCWU) with expertise in Artificial Intelligence, Agentic AI systems, and Python development. Dedicated to innovation and continuous learning, she excels at building AI-driven solutions, with strengths in prompt engineering, workflow automation, and modern Agentic SDKs for real-world applications. 

Esha enjoys transforming concepts into tangible, practical projects—recently developing "PyMentorBot," an AI-powered learning assistant, and working as an intern at Cognizec Software Solutions. Her teaching experience as a Computer Lecturer reflects a commitment to knowledge sharing and clear communication. Deeply collaborative, adaptable, and analytical, she values teamwork and enthusiastically seeks opportunities for growth in the fast-evolving AI landscape.`,
    image: "/esha-amjad/esha-amjad.jpeg", // Ensure this image is present in the public folder
    skills: [
      // Technical Skills
      "Python",
      "AI / Agentic AI (OpenAI Agents SDK)",
      "Prompt Engineering",
      "Context Engineering",
      "RAG",
      "Claude Code",
      "LangChain",
      "FastAPI",
      "Git",
      "GitHub",
      // Web Basics
      "HTML",
      "CSS",
      "JavaScript",
      // Familiar Languages
      "C",
      "C++"
    ],
    bulletPoints: [
      "Developed AI automation solutions using Python and Agentic SDKs during internship at Cognizec Software Solutions (2025)",
      "Enhanced AI system responses and workflow efficiency with advanced prompt engineering",
      "Built utilities and tools for intelligent, automated workflows",
      "Created 'PyMentorBot'—an AI-powered learning assistant for academic and educational support (FYP)",
      "Designed and implemented Agentic AI assistants using Python, RAG, and prompt engineering concepts",
      "Experience as Computer Lecturer (CTI), teaching programming and practical computer science",
      "Strong collaborator—adept at adapting to new challenges and technologies"
    ],
    certificates: [],
    cvLink: "/esha-amjad/esha-cv.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/esha-amjad-06599735b/",
      email: "esha26amjad@gmail.com",
      phone: "+92 306 8168024"
    }
  },
];

export const allTeamMembers = [...seniorDevelopers, ...testimonialTeam];
