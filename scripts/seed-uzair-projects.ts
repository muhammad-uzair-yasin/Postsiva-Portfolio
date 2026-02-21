/**
 * Seed Uzair's portfolio projects into Postsiva-Tech.
 * Images are hosted on storage.postsiva.com (uploaded separately).
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env
 * Run: cd Postsiva-Tech && npx tsx scripts/seed-uzair-projects.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadEnv() {
  const envPath = join(process.cwd(), ".env");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");
}

const UZAIR_PROJECTS = [
  {
    title: "Agentia (AI base website)",
    description:
      "A complete website featuring my AI tools and other projects. Built with modern web technologies including GeminiAI integration, Python backend, and responsive design using Tailwind CSS.",
    fullDescription:
      "A complete website featuring my AI tools and other projects. Built with modern web technologies including GeminiAI integration, Python backend, and responsive design using Tailwind CSS. Features AI tools integration and a portfolio of additional projects.",
    image: "https://storage.postsiva.com/uploads/6999af451d02e_1771679557.png",
    category: "Web Development",
    tech: ["GeminiAI", "Python", "HTML", "JavaScript", "Tailwind CSS"],
    githubLink: "https://github.com/Uzair-DeVops/Agentia",
    liveLink: "https://uzair-devops.github.io/Agentia/",
  },
  {
    title: "Complete Multipage Website (Tailwind CSS)",
    description:
      "Developed using HTML, CSS, Tailwind CSS, and JavaScript, focusing on modern UI/UX with a responsive design.",
    fullDescription:
      "Developed using HTML, CSS, Tailwind CSS, and JavaScript, focusing on modern UI/UX with a responsive design. Features responsive multi-page layout, Tailwind-based styling, and modern UI/UX design principles.",
    image: "https://storage.postsiva.com/uploads/6999af4781ec0_1771679559.png",
    category: "Web Development",
    tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    githubLink: "https://github.com/Uzair-DeVops/Complete_Website_no_1",
    liveLink: "https://complete-website-no-1.vercel.app/",
  },
  {
    title: "Complete AI Application with Multiple Features",
    description:
      "Developed agentic AI applications using LangChain and LLMs, making AI more interactive and context-aware.",
    fullDescription:
      "Developed agentic AI applications using LangChain and LLMs, making AI more interactive and context-aware. Features context-aware AI responses, agent-based architecture, and seamless integration with external APIs.",
    image: "https://storage.postsiva.com/uploads/6999af488ddc6_1771679560.png",
    category: "AI / ML",
    tech: ["LangChain", "Python", "Gemini"],
    githubLink: "https://github.com/Uzair-DeVops/Complete_AI_Application",
    liveLink: "https://completeaiapplication-ctrwnjvn2lqdtzkbgndjoc.streamlit.app/",
  },
  {
    title: "Postsiva",
    description:
      "A comprehensive social automation tool designed to streamline social media management workflows. Built as Backend Developer using FastAPI.",
    fullDescription:
      "A comprehensive social automation tool designed to streamline social media management workflows. Built as a collaborative team project where I served as the Backend Developer, architecting and implementing the entire backend infrastructure using FastAPI. The platform includes advanced AI features for intelligent content automation, scheduling, and analytics.",
    image: "https://storage.postsiva.com/uploads/6999af498d36c_1771679561.png",
    category: "Backend Development",
    tech: ["FastAPI", "Python", "Next.js", "AI", "Backend Development", "REST API", "Social Automation"],
    githubLink: null,
    liveLink: "https://postsiva.com/",
  },
  {
    title: "Postsiva – Facebook Automation",
    description:
      "Next-generation Facebook automation platform for faster, smarter growth. Scale reach, automate engagement, and close more deals on Facebook.",
    fullDescription:
      "Next-generation Facebook automation platform for faster, smarter growth. Scale reach, automate engagement, and close more deals on Facebook. Features smart automation with human-like behavior, precision targeting, advanced analytics, engagement booster, team collaboration, and enterprise-grade safety with proxy rotation.",
    image: "https://storage.postsiva.com/uploads/6999af50e9d95_1771679568.jpeg",
    category: "Backend Development",
    tech: ["FastAPI", "Python", "Next.js", "AI", "Backend Development", "REST API", "Facebook Automation"],
    githubLink: null,
    liveLink: "https://facebook.postsiva.com/",
  },
  {
    title: "Postsiva – YouTube Automation",
    description:
      "YouTube automation platform that streamlines content creation and channel growth. AI-powered titles, descriptions, thumbnails, and timestamps.",
    fullDescription:
      "YouTube automation platform that streamlines content creation and channel growth. Users upload videos and the platform automatically generates AI-powered titles, descriptions, thumbnails, and timestamps based on channel persona. Features include smart scheduling, auto-publishing, channel analytics with growth trends, and an AI Comment Replier.",
    image: "https://storage.postsiva.com/uploads/6999af5200c07_1771679570.jpeg",
    category: "Backend Development",
    tech: ["FastAPI", "Python", "Next.js", "AI", "Backend Development", "REST API", "YouTube Automation"],
    githubLink: "https://github.com/Uzair-DevOps",
    liveLink: "https://youtube.postsiva.com/",
  },
  {
    title: "Postsiva – LinkedIn Automation",
    description:
      "LinkedIn automation and growth platform. Create, schedule, and publish posts with AI-generated content for personal profiles and company pages.",
    fullDescription:
      "LinkedIn automation and growth platform to grow presence faster and smarter. Create, schedule, and publish posts with AI-generated content for personal profiles and company pages from one platform. Features include AI content generation (idea-to-post, enhance, content-to-image), persona builder, media storage, scheduling, and analytics.",
    image: "https://storage.postsiva.com/uploads/6999af53709dd_1771679571.png",
    category: "Backend Development",
    tech: ["FastAPI", "Python", "Backend", "LinkedIn API", "AI", "REST API", "OAuth"],
    githubLink: null,
    liveLink: "https://linkedin.postsiva.com/",
  },
  {
    title: "MoboCheck Platform",
    description:
      "Full-stack, multi-role enterprise dashboard built with React and TypeScript. Permissions managed via Casbin in the backend.",
    fullDescription:
      "MoboCheck Backoffice is a full-stack, multi-role enterprise dashboard built with React and TypeScript. Permissions for all roles—including admins—are managed in the backend via Casbin and sent dynamically to the frontend, ensuring each user sees only the features allowed for their role.",
    image: "https://storage.postsiva.com/uploads/6999af550ac7c_1771679573.png",
    category: "Web Development",
    tech: ["React", "Node.js", "MySQL", "Casbin", "Tailwind CSS", "REST API"],
    githubLink: null,
    liveLink: "https://mobocheck.com",
  },
  {
    title: "Qyra AI Assistant",
    description:
      "AI-driven ecosystem integrated with Esqyra Watch. Fluid voice and chat interactions, task management, health insights, and news aggregator.",
    fullDescription:
      "A comprehensive AI-driven ecosystem designed to streamline daily life. Seamlessly integrated with the Esqyra Watch, the application delivers complete information through fluid voice and chat interactions. It merges intelligent task management with proactive health and productivity insights.",
    image: "https://storage.postsiva.com/uploads/6999af56ba3bf_1771679574.png",
    category: "Mobile Development",
    tech: ["React Native", "TypeScript", "REST API", "MySQL", "Tailwind CSS", "AI"],
    githubLink: null,
    liveLink: "https://app.esqyra.com",
  },
];

async function main() {
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("team_slug", "uzair-yasin")
    .maybeSingle();

  const ownerId = profile?.user_id ?? null;

  console.log("Seeding", UZAIR_PROJECTS.length, "Uzair projects...\n");

  for (const p of UZAIR_PROJECTS) {
    const slug = slugify(p.title);
    const row = {
      slug,
      title: p.title,
      category: p.category,
      description: p.description,
      full_description: p.fullDescription,
      image: p.image,
      media: [{ type: "image" as const, url: p.image }],
      features: [],
      duration: "",
      tech: p.tech,
      featured: false,
      results: [],
      client: null,
      live_link: p.liveLink,
      github_link: p.githubLink,
      owner_id: ownerId,
    };

    const { error } = await supabase.from("projects").upsert(row, {
      onConflict: "slug",
      ignoreDuplicates: false,
    });

    if (error) {
      console.error("Failed:", p.title, error.message);
    } else {
      console.log("OK:", p.title);
    }
  }

  console.log("\nDone. Projects are visible on the landing page.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
