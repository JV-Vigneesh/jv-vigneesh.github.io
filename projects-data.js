// Shared Projects Database for Dynamic Rendering
const projectsData = [
  {
    id: "gen-agritech",
    title: "Gen Agritech",
    tag: "WEB · MAINTENANCE",
    category: "web",
    url: "https://www.genagritech.com",
    githubUrl: "https://github.com/JV-Vigneesh",
    image: "assets/images/gen-agritech.png",
    shortDescription: "Multi-page company website built with HTML, CSS & JS — deployed on GoDaddy with cPanel.",
    longDescription: "Gen Agritech is a professional multi-page agricultural technology website built from the ground up for a modern farming and agri-tech innovation firm. Focused on visual storytelling, high performance, and absolute ease of navigation, the website serves as the primary digital interface for clients looking to explore advanced farming solutions, consulting services, and sustainable agriculture products.",
    role: "Lead Full-Stack Developer",
    duration: "3 Months (2024)",
    techStack: ["HTML5", "CSS3", "JavaScript", "cPanel", "GoDaddy Hosting", "SEO Optimization"],
    features: [
      "Highly responsive layouts tailored for mobile, tablet, and desktop viewports",
      "Dynamic interactive sections highlighting agricultural innovations and impact metrics",
      "Comprehensive product showcase with category filtering and visual grids",
      "Secure contact and consultation booking forms utilizing backend server integration",
      "Optimized media assets resulting in Google PageSpeed scores above 90 on both desktop and mobile",
      "cPanel deployment and custom domain setup with SSL/TLS implementation"
    ],
    screenshots: [
      "assets/images/gen-agritech.png"
    ]
  },
  {
    id: "naturezone-organics",
    title: "Naturezone Organics",
    tag: "WEB · MAINTENANCE",
    category: "web",
    url: "https://naturezoneorganics.com",
    githubUrl: "https://github.com/JV-Vigneesh",
    image: "assets/images/naturezone-organics.png",
    shortDescription: "Designed and currently maintaining a multi-page organics business website.",
    longDescription: "Naturezone Organics is a highly-aesthetic farm-to-table organic food and agricultural product showcase designed to promote sustainable lifestyle choices and premium organic farming. In addition to high-fidelity frontend execution, this project represents an ongoing maintenance engagement, overseeing regular updates, database checks, user flow enhancements, and visual identity styling.",
    role: "UI/UX Designer & Web Administrator",
    duration: "Ongoing Maintenance (Started 2024)",
    techStack: ["HTML5", "Vanilla CSS", "JavaScript", "Database Management", "SEO", "Graphic Design"],
    features: [
      "Immersive organic-themed user interface utilizing vibrant HSL green color palettes",
      "Smooth micro-interactions and transitions enhancing natural user journeys",
      "Regular structural maintenance and security patches keeping uptime at 99.9%",
      "Complete brand assets integration including customized logos, icons, and product labels",
      "Integrated SEO strategy that doubled organic monthly search impressions within four months",
      "Optimized wholesale order inquiry funnel for bulk agricultural B2B operations"
    ],
    screenshots: [
      "assets/images/naturezone-organics.png"
    ]
  },
  {
    id: "jvs-fintech",
    title: "JVS FinTech",
    tag: "APP · FINANCE",
    category: "app",
    url: "",
    githubUrl: "https://github.com/JV-Vigneesh",
    image: "assets/images/jvs-fintech.png",
    shortDescription: "Developed an windows app for accounting to simplify financial management for businesses of all sizes.",
    longDescription: "JVS FinTech is an accounting software designed to simplify financial management for businesses of all sizes. Currently in the early stages of development, JVS FinTech provides essential features like invoicing, quotations, delivery challans, and inventory tracking. With multi-company support and PDF/print capabilities, it's an all-in-one solution for managing your business finances with ease.",
    duration: "Ongoing",
    techStack: ["ElectronJS", "ReactJS", "TailwindCSS", "Database Management"],
    features: [
      "Dashboard Overview: A clear and intuitive dashboard providing an immediate overview of your business’s financial health.",
      "Invoicing: Create, send, and manage professional invoices with ease. Track payment statuses and generate detailed reports.",
      "Quotations: Generate and send professional quotations to clients quickly. Track their status and convert them into invoices when needed.",
      "Delivery Challans: Efficiently manage and track the delivery of goods with comprehensive challan management.",
      "Inventory Management: Keep track of your stock in real-time. Manage products, quantities, and stock levels effortlessly.",
      "Multi-Company Support: Manage multiple companies from a single interface, providing flexibility for businesses with diverse operations.",
      "PDF/Print Capabilities: Easily generate and print invoices, quotations, challans, and other important documents in PDF format for official records and sharing.",
      "User Management: Secure login and role-based access control to ensure data security and restrict access to authorized personnel.",
      "Data Management: Robust data management system with secure local storage for all your business information."
    ],
    screenshots: [
      "assets/images/jvs-fintech.png"
    ]
  },
  {
    id: "repoguard",
    title: "RepoGuard",
    tag: "DEVOPS",
    category: "devops",
    url: "https://repo-guard-black.vercel.app",
    githubUrl: "https://github.com/JV-Vigneesh/repoguard",
    image: "assets/images/repo-guard.png",
    shortDescription: "GitHub governance dashboard auditing repos for branch protection & tagging compliance.",
    longDescription: "RepoGuard is an advanced DevOps compliance dashboard engineered to provide organization-wide visibility into repository governance. It integrates directly with the GitHub REST API to perform automated security and standard compliance audits across hundreds of repos. Designed specifically for DevOps and Security teams, it streamlines policy enforcement and vulnerability prevention in software development pipelines.",
    role: "DevOps & React Developer",
    duration: "2 Months (2025)",
    techStack: ["React", "TypeScript", "TailwindCSS", "GitHub REST API", "Vercel", "DevOps Pipelines"],
    features: [
      "Continuous repository auditing checking for branch protection rule coverage",
      "Auto-tagging compliance scanner verifying repository metadata, topics, and owner tags",
      "Interactive status dashboard with real-time charts showing organization security scores",
      "Quick-fix actions trigger allowing admins to enforce standard rules directly from the dashboard",
      "Role-based OAuth authentication integrating enterprise GitHub organization credentials",
      "Full typescript security ensuring rock-solid state management and type safety"
    ],
    screenshots: [
      "assets/images/repo-guard.png"
    ]
  },
  {
    id: "ai-quiz-master",
    title: "AI Quiz Master",
    tag: "AWS · GEMINI AI",
    category: "ai",
    url: "https://quickmaster.ai",
    githubUrl: "https://github.com/JV-Vigneesh",
    image: "assets/images/ai-quiz-master.png",
    shortDescription: "An AI-powered application leveraging AWS serverless architecture and Gemini models.",
    longDescription: "AI Quiz Master is an enterprise knowledge assistant that harnesses the power of Google's Gemini models and AWS serverless computing to enable instant, context-aware Q&A and quiz generation. Built to eliminate the friction of digging through PDFs, word files, and spreadsheets, users can upload documents and immediately query them with natural language, receiving precise citations and summaries.",
    role: "AI & Serverless Architect",
    duration: "3 Months (2025)",
    techStack: ["AWS Lambda", "AWS S3", "DynamoDB", "Gemini 1.5 Pro API", "Python", "React", "Vector Embeddings"],
    features: [
      "Serverless ingestion pipeline converting uploaded documents into optimized vector embeddings",
      "Context-rich search indexing allowing semantic search capabilities instead of simple keyword matching",
      "Ultra-low latency AI chat responses using streaming data backends via WebSocket connections",
      "Automatic generation of document summaries and highlighted inline citations pointing to original sources",
      "Completely serverless scaling costing pennies even under high-load query bursts",
      "Secure user tenant spaces isolating sensitive corporate data with robust AWS IAM controls"
    ],
    screenshots: [
      "assets/images/ai-quiz-master.png"
    ]
  },
  {
    id: "robotic-arm",
    title: "5-DOF Robotic Arm",
    tag: "ENGINEERING",
    category: "engineering",
    url: "#",
    githubUrl: "https://github.com/JV-Vigneesh",
    image: "assets/images/project-robotic.jpg",
    shortDescription: "A physical 5-Degree-of-Freedom robotic arm with custom CAD design, prototyping, and inverse kinematics control.",
    longDescription: "Serving as the mechanical engineering capstone project, this physical 5-Degree-of-Freedom (5-DOF) robotic arm bridges heavy physical prototyping with automated software control. Built to perform high-precision pick-and-place maneuvers, the robotic arm features full custom computer-aided design (CAD) chassis parts, 3D printed components, hardware actuation via high-torque servo motors, and a microcontrolled software system running inverse kinematics.",
    role: "Hardware & Kinematics Lead",
    duration: "6 Months (Capstone 2024)",
    techStack: ["SolidWorks CAD", "3D Printing & Prototyping", "Arduino C++", "Inverse Kinematics", "Servo Actuation", "Hardware Integration"],
    features: [
      "Rigid structural body designed in SolidWorks and optimized through finite element stress analysis",
      "5 degrees of freedom enabling smooth spatial articulation and gripper orientation adjustments",
      "Custom Arduino firmware implementing real-time trigonometric inverse kinematics equations",
      "Pick-and-place routines with repeatable spatial precision within +/- 2.5 millimeters",
      "Integrated analog joystick manual overrides alongside automated path-following software control",
      "Advanced power distribution board resolving high-current servo demands and isolating controller noise"
    ],
    screenshots: [
      "assets/images/project-robotic.jpg"
    ]
  }
];
