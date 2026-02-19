-- Seed projects (from project-data.ts). Run after 001_create_projects.sql.
-- In Supabase: run this in SQL Editor, or use: supabase db reset (applies migrations + seed).

insert into public.projects (
  slug, title, category, description, full_description, image, media, features, duration, tech, featured, results, client, live_link
) values
(
  'healthcare-portal',
  'Healthcare Portal',
  'Healthcare',
  'Secure patient management system with appointment scheduling and tele-health integration.',
  'Our Healthcare Portal is a comprehensive, HIPAA-compliant patient management system designed for modern medical practices. It streamlines the entire patient journey, from initial scheduling to follow-up care, ensuring security and efficiency at every step.',
  '/web-development2.png',
  '[{"type":"video","url":"https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"},{"type":"image","url":"/web-development1.png"},{"type":"image","url":"/web-development2.png"}]'::jsonb,
  '["Patient appointment scheduling","Secure medical record storage","Tele-health video integration","Real-time patient monitoring"]'::jsonb,
  '8 months',
  '["Next.js","Django","AWS","WebRTC"]'::jsonb,
  true,
  '["Reduced administrative overhead by 35%","Increased patient engagement by 50%","Achieved 100% HIPAA compliance","Streamlined tele-health consultations"]'::jsonb,
  'Global Health Solutions',
  '#'
),
(
  'e-learning-platform',
  'E-Learning Platform',
  'Education',
  'Interactive online learning system with video courses and progress tracking.',
  'The E-Learning Platform is an interactive education system built to handle high concurrency and provide a seamless learning experience. With real-time assessments and detailed progress tracking, it empowers both students and educators.',
  '/mobile-development2.png',
  '[{"type":"video","url":"https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-cafe-34502-large.mp4"},{"type":"image","url":"/mobile-development1.png"},{"type":"image","url":"/mobile-development2.png"}]'::jsonb,
  '["Interactive video courses","Real-time quizzes and assessments","Student progress tracking","Certificate generation"]'::jsonb,
  '5 months',
  '["Vue.js","Laravel","AWS MediaConvert"]'::jsonb,
  false,
  '["Supported 10,000+ concurrent users","98% student satisfaction rate","Automated certificate generation","Highly scalable cloud infrastructure"]'::jsonb,
  'Bright Future Academy',
  '#'
),
(
  'real-estate-marketplace',
  'Real Estate Marketplace',
  'Real Estate',
  'Property listing platform with virtual tours and agent matching.',
  'This Real Estate Marketplace redefines property discovery. Features like immersive 3D virtual tours and an advanced mortgage calculator provide users with all the tools they need to find their dream home.',
  '/ui-ux-design1.png',
  '[{"type":"video","url":"https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-house-and-real-estate-icons-28498-large.mp4"},{"type":"image","url":"/ui-ux-design1.png"},{"type":"image","url":"/frontend-development1.png"}]'::jsonb,
  '["Virtual 3D property tours","Advanced search filters","Mortgage calculator","Direct agent messaging"]'::jsonb,
  '4 months',
  '["React","Go","ElasticSearch","Google Maps API"]'::jsonb,
  false,
  '["40% increase in property inquiries","Seamless mobile discovery experience","Integrated Google Maps API","Advanced ElasticSearch capabilities"]'::jsonb,
  'Elite Realty Group',
  '#'
),
(
  'enterprise-dashboard',
  'Enterprise Dashboard',
  'Web Development',
  'Business intelligence and analytics dashboard with real-time data visualization.',
  'The Enterprise Dashboard provides critical business insights at a glance. Built for decision-makers, it aggregates data from multiple sources and presents it through beautiful, interactive visualizations.',
  '/custom-saas-solutions1.png',
  '[{"type":"video","url":"https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-4235-large.mp4"},{"type":"image","url":"/custom-saas-solutions1.png"},{"type":"image","url":"/backend-development1.png"}]'::jsonb,
  '["Real-time business intelligence","Customizable data visualization","Role-based access control","Multi-source data integration"]'::jsonb,
  '6 months',
  '["React","TypeScript","D3.js","Node.js","PostgreSQL"]'::jsonb,
  false,
  '["Real-time decision support","Consolidated multi-department data","High-performance D3.js charts","Enterprise-grade security"]'::jsonb,
  'Nexus Corp',
  '#'
),
(
  'mobile-commerce-app',
  'Mobile Commerce App',
  'Mobile Development',
  'Cross-platform shopping app with inventory sync and secure checkout.',
  'A high-performance mobile commerce solution designed for scale. This app provides a seamless shopping experience with real-time inventory updates and a fast, secure checkout process.',
  '/mobile-development2.png',
  '[{"type":"video","url":"https://assets.mixkit.co/videos/preview/mixkit-person-using-a-smartphone-with-a-green-screen-34503-large.mp4"},{"type":"image","url":"/mobile-development2.png"},{"type":"image","url":"/frontend-development1.png"}]'::jsonb,
  '["Seamless mobile shopping experience","AI-driven product recommendations","Secure one-click checkout","Real-time order tracking"]'::jsonb,
  '4 months',
  '["React Native","Firebase","Stripe","Redux"]'::jsonb,
  false,
  '["Reached 50k+ app downloads in 3 months","Reduced checkout friction by 25%","Seamless Stripe integration","Real-time Firebase sync"]'::jsonb,
  'TrendSetter Retail',
  '#'
),
(
  'api-integration-platform',
  'API Integration Platform',
  'API Development',
  'High-availability backend connecting multiple services with REST and GraphQL.',
  'This robust API platform acts as the central nervous system for complex enterprise ecosystems. It orchestrates communication between dozens of services, ensuring data integrity and low latency.',
  '/backend-development1.png',
  '[{"type":"video","url":"https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-computer-keyboard-close-up-1727-large.mp4"},{"type":"image","url":"/backend-development1.png"},{"type":"image","url":"/cloud-devops1.png"}]'::jsonb,
  '["REST and GraphQL API support","Third-party service orchestration","High availability architecture","Comprehensive API documentation"]'::jsonb,
  '3 months',
  '["Node.js","GraphQL","Redis","Docker"]'::jsonb,
  true,
  '["Achieved sub-100ms API latency","99.99% system availability","Scalable Redis caching layer","Automated Docker deployments"]'::jsonb,
  'ConnectFlow Tech',
  '#'
)
on conflict (slug) do nothing;
