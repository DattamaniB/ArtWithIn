import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createHttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'magazine-secret-key-editorial';

async function startServer() {
  const app = express();
  const server = createHttpServer(app);
  const wss = new WebSocketServer({ server });
  const PORT = 3000;

  // Track connected clients
  const clients = new Map<string, WebSocket>();

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // In-memory "database" (Simulating real DB)
  let users: any[] = [
    {
      _id: "1",
      name: "Aarav",
      email: "aarav@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "Video Editor",
      userType: "creator",
      username: "@aarav_storyteller",
      verified: true,
      availabilityStatus: "Available for Work",
      coverBanner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200",
      profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      bio: "Cinematic storyteller crafting luxury brand narratives. Over 6 years of experience editing high-concept automotive and fashion commercials.",
      quote: "Creativity is the greatest rebellion in existence. Pacing and timing are the heartbeat of modern visual expression.",
      aboutMe: "I am a multi-disciplinary post-production specialist and commercial film editor based in Mumbai. I collaborate with high-end luxury agencies and fashion houses to compile moody transitions, analog styles, and stunning color profiles that demand attention.",
      location: "Mumbai, India",
      followers: 1240,
      following: ["2"],
      projects: 38,
      projectsCompleted: 74,
      likesReceived: 2410,
      profileViews: 6840,
      rate: "₹3,500/hr",
      creatorTrustScore: 96,
      creatorTier: "Master",
      trustFactors: {
        profileCompletion: 100,
        portfolioQuality: 95,
        responseRate: 98,
        clientReviews: 97,
        projectSuccessRate: 95
      },
      skillsTags: ["Video Editing", "Color Grading", "Visual FX", "Audio Design", "Direction"],
      skillCategories: {
        primary: "Post-Production",
        secondary: ["Color correction", "Soundscape engineering", "Multi-cam editing"]
      },
      primarySkill: "DaVinci Resolve",
      secondarySkills: ["Adobe Premiere Pro", "After Effects", "ProTools"],
      softwareList: [
        { name: "DaVinci Resolve", level: "Master" },
        { name: "Adobe Premiere Pro", level: "Master" },
        { name: "Adobe After Effects", level: "Expert" },
        { name: "ProTools", level: "Intermediate" }
      ],
      certifications: [
        { name: "Certified DaVinci Colorist", issuer: "Blackmagic Design", date: "2024" },
        { name: "Avid Certified Professional", issuer: "Avid Technology", date: "2023" }
      ],
      yearsOfExperience: 6,
      freelanceExperience: "4 Years",
      agencyExperience: "2 Years",
      workHistory: [
        { company: "Vogue India Production", role: "Lead Editor", duration: "2024 - Present", description: "Led creative assembly, atmospheric scoring, and final color profiles for luxury editorial campaigns." },
        { company: "Red Giant Media", role: "Junior FX Editor", duration: "2022 - 2024", description: "Handled keyframing, grading, and typographic title integrations for commercial short dispatches." }
      ],
      education: [
        { school: "National Institute of Design", degree: "B.Des in Film & Video Communication", year: "2022" }
      ],
      achievements: ["NID Best Cinematic Concept Award 2022", "Vimeo Staff Pick 2025"],
      servicesOffered: [
        { serviceName: "Luxury Auto Commercial Edit", description: "Full DaVinci color grade, Sound design, high-contrast pacing, and 4K final mastering.", startingPrice: "25000", deliveryTime: "5 Days", revisionCount: 3 },
        { serviceName: "Fashion Editorial Reel Edit", description: "Analog film emulation, vertical social media crop layouts, high-tempo pacing, and music sync.", startingPrice: "12000", deliveryTime: "3 Days", revisionCount: 2 }
      ],
      reviews: [
        { id: "rev-c1", creatorName: "PixelForge Studios", creatorId: "recruiter-1", rating: 5, reviewText: "Aarav is an absolute master of pacing. He completed the edit 2 days before the deadline, responded in minutes, and handled color profiling exquisitely.", projectName: "Automotive Luxury Commercial", date: "15/05/2026" }
      ],
      collaborationHistory: [
        { companyName: "PixelForge Studios", projectName: "Automotive Commercial", projectStatus: "Completed", reviewScore: 5, completionDate: "2026-05-15" }
      ],
      youtube: "youtube.com/c/aaravvideo",
      discord: "aarav#2938",
      instagram: "@aarav_cinematic",
      linkedin: "linkedin.com/company/aarav",
      website: "www.aaravvideo.com",
      onboarded: true,
      portfolio: [
        { id: "p1", title: "Midnight over Mumbai", type: "Video", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac" },
        { id: "p2", title: "Street Life Exhibit", type: "Stills", url: "https://images.unsplash.com/photo-1493238792000-8113da705763" }
      ]
    },
    {
      _id: "2",
      name: "Meera",
      email: "meera@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "Graphic Designer",
      userType: "creator",
      username: "@meera_design",
      verified: true,
      availabilityStatus: "Open to Collaboration",
      coverBanner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      bio: "Bold identities for bold brands. Specializing in minimal high-contrast layouts and typographic grid packaging.",
      quote: "Design is not what it looks like and feels like. Design is how it works. Minimal black and white principles represent the ultimate sophistication.",
      aboutMe: "I am an graphic artisan and brand consultant. My practices focus heavily on the International Typographic Style (Swiss style), developing mathematical grids, packaging shapes, and high-fidelity component layouts in Figma.",
      location: "Bangalore, India",
      followers: 890,
      following: ["1"],
      projects: 54,
      projectsCompleted: 98,
      likesReceived: 3120,
      profileViews: 9420,
      rate: "₹2,800/hr",
      creatorTrustScore: 98,
      creatorTier: "Grandmaster",
      trustFactors: {
        profileCompletion: 100,
        portfolioQuality: 98,
        responseRate: 96,
        clientReviews: 99,
        projectSuccessRate: 98
      },
      skillsTags: ["Brand Identity", "Figma Design", "Layout Systems", "Typography", "Packaging"],
      skillCategories: {
        primary: "Visual Branding",
        secondary: ["Minimalist packaging", "Typeface configuration", "Figma component systems"]
      },
      primarySkill: "Swiss Typography",
      secondarySkills: ["Figma", "Adobe Illustrator", "Adobe InDesign"],
      softwareList: [
        { name: "Figma", level: "Master" },
        { name: "Adobe Illustrator", level: "Master" },
        { name: "Adobe InDesign", level: "Master" },
        { name: "Photoshop", level: "Expert" }
      ],
      certifications: [
        { name: "Certified Typography Master", issuer: "Basel School of Design", date: "2023" }
      ],
      yearsOfExperience: 8,
      freelanceExperience: "5 Years",
      agencyExperience: "3 Years",
      workHistory: [
        { company: "Studio Minimal", role: "Senior Identity Designer", duration: "2023 - 2025", description: "Crafted minimal visual brand guidelines, mathematical posters, and packaging shapes." },
        { company: "Pentagram London", role: "Junior Design Partner", duration: "2020 - 2023", description: "Collaborated on international geometric posters and black & white editorial layouts." }
      ],
      education: [
        { school: "National Institute of Design", degree: "M.Des in Graphic Design", year: "2020" }
      ],
      achievements: ["Red Dot Design Winner 2023", "Tokyo Type Directors Club Selection 2024"],
      servicesOffered: [
        { serviceName: "Luxury Brand Identity Suite", description: "Typographic logo design, complete geometric brand guidelines, color systems, and Figma active assets.", startingPrice: "40000", deliveryTime: "7 Days", revisionCount: 4 },
        { serviceName: "Minimal Typographic Packaging", description: "Bespoke package sizing, dye-lines, material consulting, and typographic layouts.", startingPrice: "18000", deliveryTime: "4 Days", revisionCount: 2 }
      ],
      reviews: [
        { id: "rev-c2", creatorName: "PixelForge Studios", creatorId: "recruiter-1", rating: 5, reviewText: "Meera is an incredible aesthetic designer. Her Swiss grid layout transformed our client's guidelines into a work of art. Speed, compliance, and creativity were immaculate.", projectName: "Vogue India Concept Layout", date: "22/05/2026" }
      ],
      collaborationHistory: [
        { companyName: "PixelForge Studios", projectName: "Vogue India Concept Layout", projectStatus: "Completed", reviewScore: 5, completionDate: "2026-05-22" }
      ],
      youtube: "youtube.com/c/meeradesign",
      discord: "meera#1109",
      instagram: "@meera_minimalist",
      linkedin: "linkedin.com/company/meera",
      website: "www.meeradesign.com",
      onboarded: true,
      portfolio: [
        { id: "p3", title: "Vogue India Concept", type: "Layout", url: "https://images.unsplash.com/photo-1541462608141-ad511aaeee73" }
      ]
    },
  ];

  let posts = [
    { _id: "1", creatorId: "1", name: "Aarav", role: "Video Editor", text: "Finished editing a luxury brand reel with cinematic transitions and moody color grading. Client approved on the first draft!", likes: 120, comments: 2, cat: "Video", time: "2h", commentsList: [
      { _id: "c1", creatorId: "2", name: "Meera", role: "Graphic Designer", text: "Stunning grading! The transition at 0:12 is exceptionally smooth.", time: "1h ago" },
      { _id: "c2", creatorId: "1", name: "Aarav", role: "Video Editor", text: "Thanks Meera! Appreciate the feedback.", time: "45m ago" }
    ] },
    { _id: "2", creatorId: "2", name: "Meera", role: "Graphic Designer", text: "Created a bold new logo for a startup coffee brand with a minimal black and red theme. Shipping next week!", likes: 85, comments: 1, cat: "Design", time: "5h", commentsList: [
      { _id: "c3", creatorId: "1", name: "Aarav", role: "Video Editor", text: "The minimal look fits perfectly. Excellent choice of color contrast.", time: "3h ago" }
    ] },
  ];

  let conversations: any[] = [
    { _id: "convo-1", participants: ["1", "2"], msgs: [{ from: "1", text: "Hi Meera, I saw your design work!", time: new Date().toISOString() }] },
  ];

  let notifications: any[] = [
    { _id: "1", userId: "1", type: "hire", icon: "💼", title: "Nexus Studio sent a hire request", detail: "Video Editor · 3-month contract · ₹45,000/mo", time: "2m ago", read: false, actionable: true, responded: null },
    { _id: "2", userId: "2", type: "like", icon: "❤️", title: "Aarav liked your portfolio post", detail: '"Cinematic reel — loved the color grade!"', time: "15m ago", read: false, actionable: false, responded: null },
  ];

  const DB_PATH = path.join(__dirname, 'db.json');

  const loadDatabase = () => {
    if (fs.existsSync(DB_PATH)) {
      try {
        const raw = fs.readFileSync(DB_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.users) users = parsed.users;
        if (parsed.posts) posts = parsed.posts;
        if (parsed.conversations) conversations = parsed.conversations;
        if (parsed.notifications) notifications = parsed.notifications;
        console.log("Persistent database loaded successfully from db.json");
      } catch (e) {
        console.error("Failed to load database. Falling back to default data.", e);
      }
    } else {
      saveDatabase();
    }

    // Ensure Creator Aarav is fully updated in the database
    const aaravIndex = users.findIndex(u => u._id === "1");
    if (aaravIndex !== -1 && !users[aaravIndex].coverBanner) {
      users[aaravIndex] = {
        ...users[aaravIndex],
        userType: "creator",
        username: "@aarav_storyteller",
        verified: true,
        availabilityStatus: "Available for Work",
        coverBanner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
        bio: "Cinematic storyteller crafting luxury brand narratives. Over 6 years of experience editing high-concept automotive and fashion commercials.",
        quote: "Creativity is the greatest rebellion in existence. Pacing and timing are the heartbeat of modern visual expression.",
        aboutMe: "I am a multi-disciplinary post-production specialist and commercial film editor based in Mumbai. I collaborate with high-end luxury agencies and fashion houses to compile moody transitions, analog styles, and stunning color profiles that demand attention.",
        projectsCompleted: 74,
        likesReceived: 2410,
        profileViews: 6840,
        creatorTrustScore: 96,
        creatorTier: "Master",
        trustFactors: {
          profileCompletion: 100,
          portfolioQuality: 95,
          responseRate: 98,
          clientReviews: 97,
          projectSuccessRate: 95
        },
        skillsTags: ["Video Editing", "Color Grading", "Visual FX", "Audio Design", "Direction"],
        skillCategories: {
          primary: "Post-Production",
          secondary: ["Color correction", "Soundscape engineering", "Multi-cam editing"]
        },
        primarySkill: "DaVinci Resolve",
        secondarySkills: ["Adobe Premiere Pro", "After Effects", "ProTools"],
        softwareList: [
          { name: "DaVinci Resolve", level: "Master" },
          { name: "Adobe Premiere Pro", level: "Master" },
          { name: "Adobe After Effects", level: "Expert" },
          { name: "ProTools", level: "Intermediate" }
        ],
        certifications: [
          { name: "Certified DaVinci Colorist", issuer: "Blackmagic Design", date: "2024" },
          { name: "Avid Certified Professional", issuer: "Avid Technology", date: "2023" }
        ],
        yearsOfExperience: 6,
        freelanceExperience: "4 Years",
        agencyExperience: "2 Years",
        workHistory: [
          { company: "Vogue India Production", role: "Lead Editor", duration: "2024 - Present", description: "Led creative assembly, atmospheric scoring, and final color profiles for luxury editorial campaigns." },
          { company: "Red Giant Media", role: "Junior FX Editor", duration: "2022 - 2024", description: "Handled keyframing, grading, and typographic title integrations for commercial short dispatches." }
        ],
        education: [
          { school: "National Institute of Design", degree: "B.Des in Film & Video Communication", year: "2022" }
        ],
        achievements: ["NID Best Cinematic Concept Award 2022", "Vimeo Staff Pick 2025"],
        servicesOffered: [
          { serviceName: "Luxury Auto Commercial Edit", description: "Full DaVinci color grade, Sound design, high-contrast pacing, and 4K final mastering.", startingPrice: "25000", deliveryTime: "5 Days", revisionCount: 3 },
          { serviceName: "Fashion Editorial Reel Edit", description: "Analog film emulation, vertical social media crop layouts, high-tempo pacing, and music sync.", startingPrice: "12000", deliveryTime: "3 Days", revisionCount: 2 }
        ],
        reviews: [
          { id: "rev-c1", creatorName: "PixelForge Studios", creatorId: "recruiter-1", rating: 5, reviewText: "Aarav is an absolute master of pacing. He completed the edit 2 days before the deadline, responded in minutes, and handled color profiling exquisitely.", projectName: "Automotive Luxury Commercial", date: "15/05/2026" }
        ],
        collaborationHistory: [
          { companyName: "PixelForge Studios", projectName: "Automotive Commercial", projectStatus: "Completed", reviewScore: 5, completionDate: "2026-05-15" }
        ],
        youtube: "youtube.com/c/aaravvideo",
        discord: "aarav#2938",
        instagram: "@aarav_cinematic",
        linkedin: "linkedin.com/company/aarav",
        website: "www.aaravvideo.com",
        onboarded: true
      };
      saveDatabase();
    }

    // Ensure Creator Meera is fully updated in the database
    const meeraIndex = users.findIndex(u => u._id === "2");
    if (meeraIndex !== -1 && !users[meeraIndex].coverBanner) {
      users[meeraIndex] = {
        ...users[meeraIndex],
        userType: "creator",
        username: "@meera_design",
        verified: true,
        availabilityStatus: "Open to Collaboration",
        coverBanner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
        bio: "Bold identities for bold brands. Specializing in minimal high-contrast layouts and typographic grid packaging.",
        quote: "Design is not what it looks like and feels like. Design is how it works. Minimal black and white principles represent the ultimate sophistication.",
        aboutMe: "I am an graphic artisan and brand consultant. My practices focus heavily on the International Typographic Style (Swiss style), developing mathematical grids, packaging shapes, and high-fidelity component layouts in Figma.",
        projectsCompleted: 98,
        likesReceived: 3120,
        profileViews: 9420,
        rate: "₹2,800/hr",
        creatorTrustScore: 98,
        creatorTier: "Grandmaster",
        trustFactors: {
          profileCompletion: 100,
          portfolioQuality: 98,
          responseRate: 96,
          clientReviews: 99,
          projectSuccessRate: 98
        },
        skillsTags: ["Brand Identity", "Figma Design", "Layout Systems", "Typography", "Packaging"],
        skillCategories: {
          primary: "Visual Branding",
          secondary: ["Minimalist packaging", "Typeface configuration", "Figma component systems"]
        },
        primarySkill: "Swiss Typography",
        secondarySkills: ["Figma", "Adobe Illustrator", "Adobe InDesign"],
        softwareList: [
          { name: "Figma", level: "Master" },
          { name: "Adobe Illustrator", level: "Master" },
          { name: "Adobe InDesign", level: "Master" },
          { name: "Photoshop", level: "Expert" }
        ],
        certifications: [
          { name: "Certified Typography Master", issuer: "Basel School of Design", date: "2023" }
        ],
        yearsOfExperience: 8,
        freelanceExperience: "5 Years",
        agencyExperience: "3 Years",
        workHistory: [
          { company: "Studio Minimal", role: "Senior Identity Designer", duration: "2023 - 2025", description: "Crafted minimal visual brand guidelines, mathematical posters, and packaging shapes." },
          { company: "Pentagram London", role: "Junior Design Partner", duration: "2020 - 2023", description: "Collaborated on international geometric posters and black & white editorial layouts." }
        ],
        education: [
          { school: "National Institute of Design", degree: "M.Des in Graphic Design", year: "2020" }
        ],
        achievements: ["Red Dot Design Winner 2023", "Tokyo Type Directors Club Selection 2024"],
        servicesOffered: [
          { serviceName: "Luxury Brand Identity Suite", description: "Typographic logo design, complete geometric brand guidelines, color systems, and Figma active assets.", startingPrice: "40000", deliveryTime: "7 Days", revisionCount: 4 },
          { serviceName: "Minimal Typographic Packaging", description: "Bespoke package sizing, dye-lines, material consulting, and typographic layouts.", startingPrice: "18000", deliveryTime: "4 Days", revisionCount: 2 }
        ],
        reviews: [
          { id: "rev-c2", creatorName: "PixelForge Studios", creatorId: "recruiter-1", rating: 5, reviewText: "Meera is an incredible aesthetic designer. Her Swiss grid layout transformed our client's guidelines into a work of art. Speed, compliance, and creativity were immaculate.", projectName: "Vogue India Concept Layout", date: "22/05/2026" }
        ],
        collaborationHistory: [
          { companyName: "PixelForge Studios", projectName: "Vogue India Concept Layout", projectStatus: "Completed", reviewScore: 5, completionDate: "2026-05-22" }
        ],
        youtube: "youtube.com/c/meeradesign",
        discord: "meera#1109",
        instagram: "@meera_minimalist",
        linkedin: "linkedin.com/company/meera",
        website: "www.meeradesign.com",
        onboarded: true
      };
      saveDatabase();
    }

    // Ensure Creator Kabir is fully updated/seeded in database
    const kabirExists = users.some(u => u._id === "3");
    if (!kabirExists) {
      const seededKabir = {
        _id: "3",
        name: "Kabir Mehta",
        email: "kabir@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "Photographer",
        userType: "creator",
        username: "@kabir_streetwear",
        verified: true,
        availabilityStatus: "Available for Work",
        coverBanner: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
        profilePic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
        bio: "Neon-lit fashion campaigns and editorial portraits — shooting the future of streetwear with analog soul.",
        quote: "Photography is the story I fail to put into words. Finding soul in high-contrast urban shadows.",
        aboutMe: "I am an editorial and street photographer based in Hyderabad. I specialize in late-night low-light analog photography, capturing neon glare and dark fashion silhouettes for contemporary streetwear brands.",
        location: "Hyderabad, India",
        followers: 2100,
        following: [],
        projects: 1,
        projectsCompleted: 88,
        likesReceived: 4950,
        profileViews: 12450,
        rate: "₹4,200/hr",
        creatorTrustScore: 97,
        creatorTier: "Grandmaster",
        trustFactors: {
          profileCompletion: 100,
          portfolioQuality: 98,
          responseRate: 95,
          clientReviews: 97,
          projectSuccessRate: 98
        },
        skillsTags: ["Streetwear", "Analog Film", "Low-Light", "Color Grading", "Portraits"],
        skillCategories: {
          primary: "Editorial Photography",
          secondary: ["Neon portraiture", "Analog film emulation", "High-contrast urban layouts"]
        },
        primarySkill: "Lightroom Classic",
        secondarySkills: ["Photoshop", "Capture One", "Indesign"],
        softwareList: [
          { name: "Lightroom Classic", level: "Master" },
          { name: "Adobe Photoshop", level: "Master" },
          { name: "Capture One", level: "Expert" }
        ],
        certifications: [
          { name: "Certified Leica Artisan", issuer: "Leica Academy", date: "2024" }
        ],
        yearsOfExperience: 5,
        freelanceExperience: "3 Years",
        agencyExperience: "2 Years",
        workHistory: [
          { company: "Streetwear Syndicate", role: "Lead Photographer", duration: "2024 - Present", description: "Shot seasonal print lookbooks, catalog grids, and high-tempo vertical digital campaigns." }
        ],
        education: [
          { school: "JNTU Fine Arts College", degree: "BFA in Photography", year: "2021" }
        ],
        achievements: ["National Street Photography Winner 2023"],
        servicesOffered: [
          { serviceName: "Streetwear Lookbook Shoot", description: "4-hour urban shoot, 20 high-contrast analog edits, fashion styling support.", startingPrice: "35000", deliveryTime: "6 Days", revisionCount: 3 }
        ],
        reviews: [],
        collaborationHistory: [
          { companyName: "PixelForge Studios", projectName: "Neon Streetwear Photoshoot", projectStatus: "Completed", reviewScore: 5, completionDate: "2026-05-20" }
        ],
        youtube: "youtube.com/c/kabirphoto",
        discord: "kabir#9932",
        instagram: "@kabir_mehta",
        linkedin: "linkedin.com/in/kabirmehta",
        website: "www.kabirphoto.com",
        onboarded: true,
        portfolio: [
          { id: "p4", title: "Neon Tokyo", type: "Stills", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26" }
        ]
      };
      users.push(seededKabir);
      saveDatabase();
    }

    // Ensure PixelForge Studios Recruiter is always seeded in database
    const recruiterExists = users.some(u => u._id === "recruiter-1");
    if (!recruiterExists) {
      const seededRecruiter = {
        _id: "recruiter-1",
        name: "PixelForge Studios",
        email: "info@pixelforge.com",
        password: bcrypt.hashSync("password123", 10),
        role: "Creative Agency",
        userType: "recruiter",
        verified: true,
        industry: "Creative Agency",
        companySize: "50-100 Employees",
        foundedYear: 2018,
        website: "www.pixelforge.com",
        linkedin: "linkedin.com/company/pixelforge",
        instagram: "instagram.com/pixelforge",
        location: "Hyderabad, India",
        bio: "PixelForge Studios is a premier multi-disciplinary creative agency specializing in cinematic video productions, premium visual advertising campaigns, and interactive design layouts for world-class luxury brands. Our team of 80+ designers, animators, and color grading artists craft high-fidelity process dispatches that wow.",
        missionStatement: "To forge unforgettable visual identities and narratives that transcend ordinary brand interactions.",
        servicesOffered: ["Cinematic Video Production", "Luxury Brand Identity", "High-End Visual Advertising", "Interactive Web Layouts"],
        companyStats: { projectsPosted: 84, creatorsHired: 126, responseRate: "97%", avgResponseTime: "2 Hours", profileViews: 1420 },
        hiringTrust: { trustScore: 92, paymentsCompleted: 124, avgPaymentTime: "2 Days", disputes: 0, successfulCollaborations: 118 },
        followers: 340,
        following: [],
        portfolio: [],
        profilePic: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=300",
        companyBanner: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200",
        onboarded: true,
        opportunities: [
          {
            id: "op-1",
            title: "Video Editor",
            description: "We are looking for an expert Video Editor to lead creative visual pacing for an upcoming premium automotive commercial. You must have advanced DaVinci color grading skills and editorial luxury brand pacing sensibilities.",
            requiredSkills: ["DaVinci", "Color Grading", "Video Editing"],
            budget: "20000",
            workMode: "Remote",
            experienceLevel: "Intermediate",
            deadline: "2026-06-15",
            applicants: []
          },
          {
            id: "op-2",
            title: "Lead Graphic Designer",
            description: "Seeking a senior visual designer to craft bold black-and-red minimalist visual identity guidelines for an eco-luxury fashion line launch.",
            requiredSkills: ["Figma", "Photoshop", "Brand Identity"],
            budget: "45000",
            workMode: "Hybrid",
            experienceLevel: "Expert",
            deadline: "2026-06-20",
            applicants: []
          }
        ],
        portfolioShowcase: [
          {
            id: "sc-1",
            title: "Summer Brand Campaign",
            description: "A premium digital ad rollout for a major sustainable luxury apparel house, featuring high-contrast editorial photography and short-form video dispatches.",
            coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
            results: "2M Views · 35% Engagement Increase"
          }
        ],
        collaborations: [
          {
            id: "col-1",
            creatorName: "Kabir Mehta",
            creatorId: "3",
            projectName: "Neon Streetwear Photoshoot",
            status: "Completed",
            review: "Kabir delivered 48 highly editorial neon fashion campaigns on analog select grids. Exceptional soul and professional compliance."
          }
        ],
        reviews: [
          {
            id: "rev-1",
            creatorName: "Kabir Mehta",
            creatorId: "3",
            rating: 5,
            reviewText: "PixelForge Studios has an incredibly smooth pipeline. Fast communication, payment processed in 24 hours, and absolute creative autonomy given to their artisans.",
            projectName: "Neon Streetwear Photoshoot",
            date: "2026-05-20"
          }
        ],
        hiringPreferences: {
          preferredExperience: "Intermediate+",
          projectType: "Freelance",
          workMode: "Remote",
          languages: ["English", "Telugu"],
          availability: "Hiring Now"
        }
      };
      users.push(seededRecruiter);
      saveDatabase();
    }
  };

  const saveDatabase = () => {
    try {
      const data = { users, posts, conversations, notifications };
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error("Failed to persist database to db.json", e);
    }
  };

  loadDatabase();

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      req.user = decoded;
      next();
    });
  };

  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already exists' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: String(Date.now()),
        name,
        email,
        password: hashedPassword,
        role: role || "Member",
        userType: "creator",
        skills: [],
        bio: `Editorial talent specializing in ${role || "Member"}.`,
        quote: "True excellence is not a single dispatch, but the cumulative ledger of one's creative output.",
        location: "Location redacted",
        followers: 0,
        projects: 0,
        rate: "₹0",
        profilePic: "",
        following: [],
        portfolio: [],
        onboarded: false,
        skillsTags: [],
        secondarySkills: [],
        softwareList: [],
        certifications: [],
        workHistory: [],
        education: [],
        reviews: [],
        opportunities: [],
        portfolioShowcase: [],
        collaborations: [],
        hiringPreferences: {
          preferredExperience: "Intermediate+",
          projectType: "Freelance",
          workMode: "Remote",
          languages: ["English"],
          availability: "Available for Work"
        }
      };
      users.push(newUser);

      // Add welcome notification
      notifications.push({
        _id: String(Date.now() + 1),
        userId: newUser._id,
        type: "system",
        icon: "✨",
        title: "Welcome to the Ledger",
        detail: `Greetings, ${newUser.name}. Your editorial dossier has been established. Begin by showcasing your expertise.`,
        time: "Just now",
        read: false,
        actionable: false,
        responded: null
      });

      saveDatabase();
      const token = jwt.sign({ id: newUser._id, name: newUser.name, role: newUser.role }, JWT_SECRET);
      const { password: _, ...userWithoutPass } = newUser;
      res.json({ token, user: userWithoutPass });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = users.find(u => u.email === email);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET);
      const { password: _, ...userWithoutPass } = user;
      res.json({ token, user: userWithoutPass });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/users/me', authenticate, (req: any, res) => {
    const user = users.find(u => u._id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
  });

  app.put('/api/users/me', authenticate, (req: any, res) => {
    const userIndex = users.findIndex(u => u._id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const { name, role, bio, skills, rate, portfolio, followers, onboarded } = req.body;

    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      name: name ?? users[userIndex].name,
      role: role ?? users[userIndex].role,
      bio: bio ?? users[userIndex].bio,
      skills: skills ?? users[userIndex].skills,
      rate: rate ?? users[userIndex].rate,
      followers: followers ?? users[userIndex].followers ?? 0,
      projects: portfolio ? portfolio.length : (users[userIndex].projects ?? 0),
      portfolio: portfolio ?? (users[userIndex] as any).portfolio,
      onboarded: onboarded ?? (users[userIndex] as any).onboarded,
    };

    saveDatabase();
    const { password: _, ...userWithoutPass } = users[userIndex];
    res.json(userWithoutPass);
  });

  // Search API
  app.get('/api/search', (req, res) => {
    const q = (req.query.q as string || '').toLowerCase().trim();
    if (!q) return res.json({ users: [], posts: [] });

    // Weight-based keyword matching algorithm
    const filterUsers = users.filter(u => {
      const matchName = u.name.toLowerCase().includes(q);
      const matchRole = u.role.toLowerCase().includes(q);
      const matchBio = u.bio.toLowerCase().includes(q);
      const matchSkills = u.skills.some(s => s.toLowerCase().includes(q));
      return matchName || matchRole || matchBio || matchSkills;
    }).map(({ password: _, ...u }) => u);

    const filterPosts = posts.filter(p => {
      const matchText = p.text.toLowerCase().includes(q);
      const matchCat = p.cat.toLowerCase().includes(q);
      const matchName = p.name.toLowerCase().includes(q);
      return matchText || matchCat || matchName;
    });

    res.json({ users: filterUsers, posts: filterPosts });
  });

  // API Routes
  app.get('/api/dashboard/stats', authenticate, (req: any, res) => {
    const user = users.find(u => u._id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userPosts = posts.filter(p => p.creatorId === user._id);
    const reach = (user.followers || 0) * 3.5 + userPosts.length * 12;
    const engagements = userPosts.reduce((sum, p) => sum + p.likes + p.comments, 0);

    res.json({
      reach: `${(reach / 1000).toFixed(1)}K`,
      engagements: engagements + (user.followers || 0) * 0.1,
      portfolioCount: (user as any).portfolio?.length || 0,
      followers: user.followers || 0
    });
  });

  app.get('/api/posts', (req, res) => res.json(posts));
  app.get('/api/posts/following', authenticate, (req: any, res) => {
    const user = users.find(u => u._id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const followingIds = (user as any).following || [];
    const filteredPosts = posts.filter(p => followingIds.includes(p.creatorId));
    res.json(filteredPosts);
  });
  app.post('/api/posts', authenticate, (req: any, res) => {
    const newPost = {
      _id: String(Date.now()),
      creatorId: req.user.id,
      name: req.user.name,
      role: req.user.role,
      text: req.body.text,
      likes: 0,
      comments: 0,
      cat: req.body.cat || "General",
      time: "now",
      mediaUrl: req.body.mediaUrl,
      mediaType: req.body.mediaType,
      commentsList: []
    };
    posts = [newPost, ...posts];
    saveDatabase();
    res.json(newPost);
  });
  app.put('/api/posts/:id/like', (req, res) => {
    const post = posts.find(p => p._id === req.params.id);
    if (post) {
      post.likes += 1;
      saveDatabase();
      res.json({ likes: post.likes });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  });

  app.get('/api/posts/:id/comments', (req, res) => {
    const post = posts.find(p => p._id === req.params.id);
    if (post) {
      res.json((post as any).commentsList || []);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  });

  app.post('/api/posts/:id/comments', authenticate, (req: any, res) => {
    const post = posts.find(p => p._id === req.params.id);
    if (post) {
      const newComment = {
        _id: String(Date.now()),
        creatorId: req.user.id,
        name: req.user.name,
        role: req.user.role,
        text: req.body.text,
        time: "Just now"
      };
      if (!(post as any).commentsList) {
        (post as any).commentsList = [];
      }
      (post as any).commentsList.push(newComment);
      post.comments = ((post.comments || 0) as number) + 1;

      // Notify post creator
      if (post.creatorId !== req.user.id) {
        notifications.push({
          _id: String(Date.now()),
          userId: post.creatorId,
          type: "comment",
          icon: "💬",
          title: `${req.user.name} commented on your dispatch`,
          detail: `"${req.body.text.substring(0, 40)}${req.body.text.length > 40 ? '...' : ''}"`,
          time: "Just now",
          read: false,
          actionable: false,
          responded: null,
          linkId: post._id,
          linkType: "post"
        });
      }

      saveDatabase();
      res.json(newComment);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  });

  app.get('/api/users', (req, res) => res.json(users.map(({ password: _, ...u }) => u)));
  app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u._id === req.params.id);
    if (user) {
      const { password: _, ...userWithoutPass } = user;
      res.json(userWithoutPass);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

  app.post('/api/users/:id/follow', authenticate, (req: any, res) => {
    const targetId = req.params.id;
    const userId = req.user.id;
    if (targetId === userId) return res.status(400).json({ error: "Cannot follow yourself" });

    const user = users.find(u => u._id === userId);
    const target = users.find(u => u._id === targetId);
    if (!user || !target) return res.status(404).json({ error: 'User not found' });

    const following = (user as any).following || [];
    const isFollowing = following.includes(targetId);

    if (isFollowing) {
      (user as any).following = following.filter((id: string) => id !== targetId);
      target.followers = Math.max(0, (target.followers || 0) - 1);
    } else {
      (user as any).following = [...following, targetId];
      target.followers = (target.followers || 0) + 1;

      // Notify target
      notifications.push({
        _id: String(Date.now()),
        userId: targetId,
        type: "follow",
        icon: "👤",
        title: `${user.name} followed you`,
        detail: "They'll now see your dispatches in their feed.",
        time: "Just now",
        read: false,
        actionable: false,
        responded: null,
        linkId: userId,
        linkType: "profile" as any
      });
    }

    saveDatabase();
    res.json({ following: (user as any).following, followers: target.followers });
  });

  app.get('/api/messages/conversations', authenticate, (req: any, res) => {
    const userConvos = conversations.filter(c => c.participants.includes(req.user.id))
      .map(c => {
        const otherId = c.participants.find((p: string) => p !== req.user.id);
        const otherUser = users.find(u => u._id === otherId);
        return {
          ...c,
          name: otherUser?.name || "Member",
          otherId
        };
      });
    res.json(userConvos);
  });

  app.post('/api/messages/start', authenticate, (req: any, res) => {
    const { partnerId } = req.body;
    let convo = conversations.find(c =>
      c.participants.includes(req.user.id) && c.participants.includes(partnerId)
    );

    if (!convo) {
      convo = {
        _id: `convo-${Date.now()}`,
        participants: [req.user.id, partnerId],
        msgs: []
      };
      conversations.push(convo);
      saveDatabase();
    }
    res.json(convo);
  });

  app.post('/api/messages', authenticate, (req: any, res) => {
    const { conversationId, text } = req.body;
    const convo = conversations.find(c => c._id === conversationId);
    if (convo) {
      const msg = { from: req.user.id, text, time: new Date().toISOString() };
      convo.msgs.push(msg);

      // Notify other participant via WS
      const otherId = convo.participants.find((p: string) => p !== req.user.id);
      const client = clients.get(otherId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'message', conversationId, msg }));
      }

      // Add notification for other user
      notifications.push({
        _id: String(Date.now()),
        userId: otherId,
        type: "message",
        icon: "✉️",
        title: `New message from ${req.user.name}`,
        detail: text,
        time: "Just now",
        read: false,
        actionable: false,
        responded: null,
        linkId: req.body.conversationId,
        linkType: "message" as any
      });

      saveDatabase();
      res.json({ success: true, msg });
    } else {
      res.status(404).json({ error: 'Conversation not found' });
    }
  });

  app.post('/api/users/:id/hire', authenticate, (req: any, res) => {
    const targetId = req.params.id;
    const userId = req.user.id;
    const target = users.find(u => u._id === targetId);
    if (!target) return res.status(404).json({ error: 'User not found' });

    notifications.push({
      _id: String(Date.now()),
      userId: targetId,
      type: "hire",
      icon: "💼",
      title: `Service Proposal: ${req.user.name}`,
      detail: `${req.user.name} wants to engage your services for a new assignment.`,
      time: "Just now",
      read: false,
      actionable: true,
      responded: null,
      linkId: userId,
      linkType: "profile" as any
    });

    saveDatabase();
    res.json({ success: true });
  });

  app.post('/api/users/:id/opportunities/:opId/apply', authenticate, (req: any, res) => {
    const recruiterId = req.params.id;
    const opId = req.params.opId;
    const userId = req.user.id;
    const applicant = users.find(u => u._id === userId);
    const recruiter = users.find(u => u._id === recruiterId);
    if (!applicant || !recruiter) return res.status(404).json({ error: 'User not found' });

    const opportunity = recruiter.opportunities?.find((o: any) => o.id === opId);
    if (!opportunity) return res.status(404).json({ error: 'Opportunity not found' });

    opportunity.applicants = opportunity.applicants || [];
    if (!opportunity.applicants.includes(userId)) {
      opportunity.applicants.push(userId);
    }

    notifications.push({
      _id: String(Date.now()),
      userId: recruiterId,
      type: "application",
      icon: "📜",
      title: `Application Received: ${opportunity.title}`,
      detail: `${applicant.name} applied for your open opportunities grid slot.`,
      time: "Just now",
      read: false,
      actionable: false,
      responded: null,
      linkId: userId,
      linkType: "profile" as any
    });

    saveDatabase();
    res.json({ success: true, opportunity });
  });

  app.post('/api/users/:id/reviews', authenticate, (req: any, res) => {
    const targetId = req.params.id;
    const userId = req.user.id;
    const { rating, reviewText, projectName } = req.body;
    const creator = users.find(u => u._id === userId);
    const recruiter = users.find(u => u._id === targetId);
    if (!creator || !recruiter) return res.status(404).json({ error: 'User not found' });

    const newReview = {
      id: String(Date.now()),
      creatorName: creator.name,
      creatorId: userId,
      rating: Number(rating) || 5,
      reviewText: reviewText || "",
      projectName: projectName || "Bespoke Assignment",
      date: new Date().toLocaleDateString("en-GB")
    };

    recruiter.reviews = recruiter.reviews || [];
    recruiter.reviews.push(newReview);

    const totalRating = recruiter.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    const avgRating = totalRating / recruiter.reviews.length;
    recruiter.hiringTrust = recruiter.hiringTrust || { trustScore: 90, paymentsCompleted: 0, avgPaymentTime: "Same Day", disputes: 0, successfulCollaborations: 0 };
    recruiter.hiringTrust.trustScore = Math.min(100, Math.max(0, Math.round(avgRating * 20)));

    notifications.push({
      _id: String(Date.now()),
      userId: targetId,
      type: "review",
      icon: "✨",
      title: `New Review Received from ${creator.name}`,
      detail: `Rated ${rating}★ for project "${projectName}".`,
      time: "Just now",
      read: false,
      actionable: false,
      responded: null,
      linkId: userId,
      linkType: "profile" as any
    });

    saveDatabase();
    res.json({ success: true, reviews: recruiter.reviews, hiringTrust: recruiter.hiringTrust });
  });

  app.get('/api/notifications', authenticate, (req: any, res) => {
    const userNotifs = notifications.filter(n => n.userId === req.user.id);
    res.json(userNotifs);
  });
  app.put('/api/notifications/read-all', authenticate, (req: any, res) => {
    notifications = notifications.map(n =>
      n.userId === req.user.id ? { ...n, read: true } : n
    );
    saveDatabase();
    res.json({ success: true });
  });
  app.put('/api/notifications/:id/respond', authenticate, (req: any, res) => {
    const notif = notifications.find(n => n._id === req.params.id && n.userId === req.user.id);
    if (notif) {
      notif.responded = req.body.response;
      notif.read = true;
      saveDatabase();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // WebSocket logic
  wss.on('connection', (ws, req) => {
    let userId: string | null = null;

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'auth') {
          const decoded = jwt.verify(data.token, JWT_SECRET) as any;
          userId = decoded.id;
          if (userId) clients.set(userId, ws);
        }
      } catch (e) {
        console.error("WS Auth failed");
      }
    });

    ws.on('close', () => {
      if (userId) clients.delete(userId);
    });
  });
}

startServer();
