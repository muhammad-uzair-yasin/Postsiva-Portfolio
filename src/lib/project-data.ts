export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  media: { type: "image" | "video"; url: string }[];
  features: string[];
  duration: string;
  tech: string[];
  featured?: boolean;
  results: string[];
  client?: string;
  liveLink?: string;
  /** Set when project is owned by a team member; null for legacy or admin-created. */
  ownerId?: string | null;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "healthcare-portal",
    title: "Healthcare Portal",
    category: "Healthcare",
    description: "Secure patient management system with appointment scheduling and tele-health integration.",
    fullDescription: "Our Healthcare Portal is a comprehensive, HIPAA-compliant patient management system designed for modern medical practices. It streamlines the entire patient journey, from initial scheduling to follow-up care, ensuring security and efficiency at every step.",
    image: "/web-development2.png",
    media: [
      { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4" },
      { type: "image", url: "/web-development1.png" },
      { type: "image", url: "/web-development2.png" },
    ],
    features: [
      "Patient appointment scheduling",
      "Secure medical record storage",
      "Tele-health video integration",
      "Real-time patient monitoring"
    ],
    results: [
      "Reduced administrative overhead by 35%",
      "Increased patient engagement by 50%",
      "Achieved 100% HIPAA compliance",
      "Streamlined tele-health consultations"
    ],
    duration: "8 months",
    tech: ["Next.js", "Django", "AWS", "WebRTC"],
    featured: true,
    client: "Global Health Solutions",
    liveLink: "#"
  },
  {
    id: 2,
    slug: "e-learning-platform",
    title: "E-Learning Platform",
    category: "Education",
    description: "Interactive online learning system with video courses and progress tracking.",
    fullDescription: "The E-Learning Platform is an interactive education system built to handle high concurrency and provide a seamless learning experience. With real-time assessments and detailed progress tracking, it empowers both students and educators.",
    image: "/mobile-development2.png",
    media: [
      { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-cafe-34502-large.mp4" },
      { type: "image", url: "/mobile-development1.png" },
      { type: "image", url: "/mobile-development2.png" },
    ],
    features: [
      "Interactive video courses",
      "Real-time quizzes and assessments",
      "Student progress tracking",
      "Certificate generation"
    ],
    results: [
      "Supported 10,000+ concurrent users",
      "98% student satisfaction rate",
      "Automated certificate generation",
      "Highly scalable cloud infrastructure"
    ],
    duration: "5 months",
    tech: ["Vue.js", "Laravel", "AWS MediaConvert"],
    client: "Bright Future Academy",
    liveLink: "#"
  },
  {
    id: 3,
    slug: "real-estate-marketplace",
    title: "Real Estate Marketplace",
    category: "Real Estate",
    description: "Property listing platform with virtual tours and agent matching.",
    fullDescription: "This Real Estate Marketplace redefines property discovery. Features like immersive 3D virtual tours and an advanced mortgage calculator provide users with all the tools they need to find their dream home.",
    image: "/ui-ux-design1.png",
    media: [
      { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-house-and-real-estate-icons-28498-large.mp4" },
      { type: "image", url: "/ui-ux-design1.png" },
      { type: "image", url: "/frontend-development1.png" },
    ],
    features: [
      "Virtual 3D property tours",
      "Advanced search filters",
      "Mortgage calculator",
      "Direct agent messaging"
    ],
    results: [
      "40% increase in property inquiries",
      "Seamless mobile discovery experience",
      "Integrated Google Maps API",
      "Advanced ElasticSearch capabilities"
    ],
    duration: "4 months",
    tech: ["React", "Go", "ElasticSearch", "Google Maps API"],
    client: "Elite Realty Group",
    liveLink: "#"
  },
  {
    id: 4,
    slug: "enterprise-dashboard",
    title: "Enterprise Dashboard",
    category: "Web Development",
    description: "Business intelligence and analytics dashboard with real-time data visualization.",
    fullDescription: "The Enterprise Dashboard provides critical business insights at a glance. Built for decision-makers, it aggregates data from multiple sources and presents it through beautiful, interactive visualizations.",
    image: "/custom-saas-solutions1.png",
    media: [
      { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-4235-large.mp4" },
      { type: "image", url: "/custom-saas-solutions1.png" },
      { type: "image", url: "/backend-development1.png" },
    ],
    features: [
      "Real-time business intelligence",
      "Customizable data visualization",
      "Role-based access control",
      "Multi-source data integration"
    ],
    results: [
      "Real-time decision support",
      "Consolidated multi-department data",
      "High-performance D3.js charts",
      "Enterprise-grade security"
    ],
    duration: "6 months",
    tech: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    client: "Nexus Corp",
    liveLink: "#"
  },
  {
    id: 5,
    slug: "mobile-commerce-app",
    title: "Mobile Commerce App",
    category: "Mobile Development",
    description: "Cross-platform shopping app with inventory sync and secure checkout.",
    fullDescription: "A high-performance mobile commerce solution designed for scale. This app provides a seamless shopping experience with real-time inventory updates and a fast, secure checkout process.",
    image: "/mobile-development2.png",
    media: [
      { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-person-using-a-smartphone-with-a-green-screen-34503-large.mp4" },
      { type: "image", url: "/mobile-development2.png" },
      { type: "image", url: "/frontend-development1.png" },
    ],
    features: [
      "Seamless mobile shopping experience",
      "AI-driven product recommendations",
      "Secure one-click checkout",
      "Real-time order tracking"
    ],
    results: [
      "Reached 50k+ app downloads in 3 months",
      "Reduced checkout friction by 25%",
      "Seamless Stripe integration",
      "Real-time Firebase sync"
    ],
    duration: "4 months",
    tech: ["React Native", "Firebase", "Stripe", "Redux"],
    client: "TrendSetter Retail",
    liveLink: "#"
  },
  {
    id: 6,
    slug: "api-integration-platform",
    title: "API Integration Platform",
    category: "API Development",
    description: "High-availability backend connecting multiple services with REST and GraphQL.",
    fullDescription: "This robust API platform acts as the central nervous system for complex enterprise ecosystems. It orchestrates communication between dozens of services, ensuring data integrity and low latency.",
    image: "/backend-development1.png",
    media: [
      { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-computer-keyboard-close-up-1727-large.mp4" },
      { type: "image", url: "/backend-development1.png" },
      { type: "image", url: "/cloud-devops1.png" },
    ],
    features: [
      "REST and GraphQL API support",
      "Third-party service orchestration",
      "High availability architecture",
      "Comprehensive API documentation"
    ],
    results: [
      "Achieved sub-100ms API latency",
      "99.99% system availability",
      "Scalable Redis caching layer",
      "Automated Docker deployments"
    ],
    duration: "3 months",
    tech: ["Node.js", "GraphQL", "Redis", "Docker"],
    featured: true,
    client: "ConnectFlow Tech",
    liveLink: "#"
  },
];
