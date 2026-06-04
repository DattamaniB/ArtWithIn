import React, { useMemo, useState, useEffect, useRef, ReactNode } from "react";
import {
  Home,
  Search,
  MessageSquare,
  Bell,
  LayoutDashboard,
  User,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Send,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  CircleDollarSign,
  CheckCircle2,
  MoreVertical,
  Filter,
  Users,
  Camera,
  Film,
  Circle,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Star,
  Globe,
  ExternalLink,
  Linkedin,
  Instagram,
  Mail,
  Trash2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  paper: "#F4F1EA",
  ink: "#111111",
  inkMid: "#444444",
  inkFaint: "#888888",
  rule: "#C8C0B0",
  accent: "#B5342A",
  accentBg: "rgba(181,52,42,0.06)",
  surface: "#FDFBF7",
  white: "#FFFFFF",
  success: "#2a7a4b",
  border: "rgba(0, 0, 0, 0.15)",
  line: "rgba(0, 0, 0, 0.1)",
};

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=JetBrains+Mono:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body,#root{height:100%;}
  body{background:${C.paper};color:${C.ink};font-family:'Spectral', serif; -webkit-font-smoothing: antialiased;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:${C.paper};}
  ::-webkit-scrollbar-thumb{background:${C.rule};}
  input,textarea,select,button{font-family:'Spectral', serif;}
  input:focus,textarea:focus,select:focus{outline:none;}
  .byline{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:${C.inkFaint};font-weight: 500;}
  .headline-xl{font-family:'Bodoni Moda',serif;font-weight:700;font-size:clamp(32px,5vw,60px);line-height:1.05;}
  .headline-lg{font-family:'Bodoni Moda',serif;font-weight:600;font-size:clamp(24px,3.5vw,40px);line-height:1.1;}
  .headline-md{font-family:'Bodoni Moda',serif;font-weight:600;font-size:24px;line-height:1.2;}
  .headline-sm{font-family:'Bodoni Moda',serif;font-weight:600;font-size:18px;line-height:1.3;}
  .body-copy{font-family:'Spectral', serif; font-size:17px;line-height:1.6;color:${C.inkMid};}
  .italic-serif{font-family:'Spectral',serif;font-style:italic;}
  .mono{font-family:'JetBrains Mono',monospace;font-size:11px;}
  .section-tag{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:${C.white};background:${C.ink};padding:2px 8px;display:inline-block;}
  .section-tag-red{background:${C.accent};}
  .drop-cap::first-letter{font-family:'Bodoni Moda',serif;font-size:3.6em;font-weight:700;line-height:0.75;float:left;margin:4px 6px 0 0;color:${C.ink};}
  .pull-quote{font-family:'Bodoni Moda',serif;font-style:italic;font-size:22px;line-height:1.4;border-top:2px solid ${C.ink};border-bottom:2px solid ${C.ink};padding:12px 0;margin:14px 0;color:${C.ink};}
  .nav-btn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;padding:8px 18px;background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;color:${C.inkMid};transition:color .15s; font-weight: 500;}
  .nav-btn:hover{color:${C.ink};}
  .nav-btn.active{color:${C.accent};border-bottom:2px solid ${C.accent};font-weight:700;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:translateY(0);}}
  .fade-in{animation:fadeIn .3s ease forwards;}
  .paper-grain{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");}
  
  .hoarding-frame {
    border: 1px solid ${C.ink};
    padding: 4px;
    background: ${C.paper};
    position: relative;
  }
  .hoarding-inner {
    border: 4px double ${C.ink};
    padding: 2px;
    background: ${C.ink};
    overflow: hidden;
  }
  .hoarding-cap {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    background: ${C.ink};
    color: ${C.paper};
    padding: 4px 8px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    display: inline-block;
    margin-top: -1px;
    font-weight: 500;
  }
  .media-glow {
    filter: sepia(0.2) contrast(1.1);
  }
`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  bio?: string;
  quote?: string;
  location?: string;
  skills?: string[];
  rate?: string;
  followers?: number;
  projects?: number;
  profilePic?: string;
  following?: string[];
  portfolio?: PortfolioItem[];
  onboarded?: boolean;

  // Recruiter & General fields
  userType?: "creator" | "recruiter";
  companyLogo?: string;
  companyBanner?: string;
  verified?: boolean;
  industry?: string;
  companySize?: string;
  foundedYear?: number;
  website?: string;
  linkedin?: string;
  instagram?: string;
  missionStatement?: string;
  servicesOffered?: any[];
  companyStats?: {
    projectsPosted: number;
    creatorsHired: number;
    responseRate: string;
    avgResponseTime: string;
    profileViews: number;
  };
  hiringTrust?: {
    trustScore: number;
    paymentsCompleted: number;
    avgPaymentTime: string;
    disputes: number;
    successfulCollaborations: number;
  };
  opportunities?: {
    id: string;
    title: string;
    description: string;
    requiredSkills: string[];
    budget: string;
    workMode: string;
    experienceLevel: string;
    deadline: string;
    applicants?: string[];
  }[];
  portfolioShowcase?: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    results: string;
  }[];
  collaborations?: {
    id: string;
    creatorName: string;
    creatorId: string;
    projectName: string;
    status: string;
    review: string;
  }[];
  reviews?: {
    id: string;
    creatorName: string;
    creatorId: string;
    rating: number;
    reviewText: string;
    projectName: string;
    date: string;
  }[];
  hiringPreferences?: {
    preferredExperience: string;
    projectType: string;
    workMode: string;
    languages: string[];
    availability: string;
  };

  // Creator advanced fields
  coverBanner?: string;
  username?: string;
  availabilityStatus?: string;
  aboutMe?: string;
  projectsCompleted?: number;
  likesReceived?: number;
  profileViews?: number;
  creatorTrustScore?: number;
  creatorTier?: string;
  trustFactors?: {
    profileCompletion: number;
    portfolioQuality: number;
    responseRate: number;
    clientReviews: number;
    projectSuccessRate: number;
  };
  skillsTags?: string[];
  skillCategories?: {
    primary: string;
    secondary: string[];
  };
  primarySkill?: string;
  secondarySkills?: string[];
  softwareList?: {
    name: string;
    level: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
  yearsOfExperience?: number;
  freelanceExperience?: string;
  agencyExperience?: string;
  workHistory?: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education?: {
    school: string;
    degree: string;
    year: string;
  }[];
  achievements?: string[];
  youtube?: string;
  discord?: string;
  timelineEvents?: {
    type: string;
    title: string;
    description: string;
    time: string;
  }[];
  bookmarked?: boolean;
}
interface Post {
  _id: string;
  creatorId: string;
  name: string;
  role: string;
  text: string;
  likes: number;
  comments: number;
  cat: string;
  time: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}
interface Creator {
  _id: string;
  name: string;
  role: string;
  skills: string[];
  bio: string;
  quote?: string;
  location?: string;
  followers: number;
  projects: number;
  rate: string;
  profilePic?: string;
  following?: string[];
  portfolio?: PortfolioItem[];
  onboarded?: boolean;

  // Recruiter & General fields
  userType?: "creator" | "recruiter";
  companyLogo?: string;
  companyBanner?: string;
  verified?: boolean;
  industry?: string;
  companySize?: string;
  foundedYear?: number;
  website?: string;
  linkedin?: string;
  instagram?: string;
  missionStatement?: string;
  servicesOffered?: any[];
  companyStats?: {
    projectsPosted: number;
    creatorsHired: number;
    responseRate: string;
    avgResponseTime: string;
    profileViews: number;
  };
  hiringTrust?: {
    trustScore: number;
    paymentsCompleted: number;
    avgPaymentTime: string;
    disputes: number;
    successfulCollaborations: number;
  };
  opportunities?: {
    id: string;
    title: string;
    description: string;
    requiredSkills: string[];
    budget: string;
    workMode: string;
    experienceLevel: string;
    deadline: string;
    applicants?: string[];
  }[];
  portfolioShowcase?: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    results: string;
  }[];
  collaborations?: {
    id: string;
    creatorName: string;
    creatorId: string;
    projectName: string;
    status: string;
    review: string;
  }[];
  reviews?: {
    id: string;
    creatorName: string;
    creatorId: string;
    rating: number;
    reviewText: string;
    projectName: string;
    date: string;
  }[];
  hiringPreferences?: {
    preferredExperience: string;
    projectType: string;
    workMode: string;
    languages: string[];
    availability: string;
  };

  // Creator advanced fields
  coverBanner?: string;
  username?: string;
  availabilityStatus?: string;
  aboutMe?: string;
  projectsCompleted?: number;
  likesReceived?: number;
  profileViews?: number;
  creatorTrustScore?: number;
  creatorTier?: string;
  trustFactors?: {
    profileCompletion: number;
    portfolioQuality: number;
    responseRate: number;
    clientReviews: number;
    projectSuccessRate: number;
  };
  skillsTags?: string[];
  skillCategories?: {
    primary: string;
    secondary: string[];
  };
  primarySkill?: string;
  secondarySkills?: string[];
  softwareList?: {
    name: string;
    level: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
  yearsOfExperience?: number;
  freelanceExperience?: string;
  agencyExperience?: string;
  workHistory?: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education?: {
    school: string;
    degree: string;
    year: string;
  }[];
  achievements?: string[];
  youtube?: string;
  discord?: string;
  timelineEvents?: {
    type: string;
    title: string;
    description: string;
    time: string;
  }[];
  bookmarked?: boolean;
}
interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  url: string;
}
interface Convo {
  _id: string;
  name: string;
  unread: number;
  msgs: { from: string; text: string }[];
}
interface Notif {
  _id: string;
  type: string;
  icon: string | ReactNode;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  actionable: boolean;
  responded: string | null;
  linkId?: string;
  linkType?: "profile" | "message" | "post";
}

// ── Fallback Data ─────────────────────────────────────────────────────────────
const ROLES = [
  "Designer",
  "Video Editor",
  "Photographer",
  "UI/UX Designer",
  "Filmmaker",
  "Animator",
  "Illustrator",
  "Motion Designer",
];

const FB_CREATORS: Creator[] = [
  {
    _id: "1",
    name: "Aarav Shah",
    role: "Video Editor",
    skills: ["Premiere Pro", "DaVinci", "Color Grading"],
    bio: "Cinematic storyteller crafting luxury brand narratives with an eye for the extraordinary. Specializing in high-contrast editorial edits.",
    followers: 1240,
    projects: 38,
    rate: "₹3,500/hr",
  },
  {
    _id: "2",
    name: "Meera Iyer",
    role: "Graphic Designer",
    skills: ["Photoshop", "Figma", "Illustrator"],
    bio: "Bold identities for bold brands. Known for minimal black & white editorial aesthetics and grid-perfect layout architecture.",
    followers: 890,
    projects: 54,
    rate: "₹2,800/hr",
  },
  {
    _id: "3",
    name: "Kabir Mehta",
    role: "Photographer",
    skills: ["Lightroom", "Portraits", "Fashion"],
    bio: "Neon-lit fashion campaigns and editorial portraits — shooting the future of streetwear with analog soul.",
    followers: 2100,
    projects: 71,
    rate: "₹4,200/hr",
  },
];
const FB_POSTS: Post[] = [
  {
    _id: "p1",
    creatorId: "1",
    name: "Aarav Shah",
    role: "Video Editor",
    text: "Finished editing a luxury brand reel with cinematic transitions and moody color grading. Client approved on the first draft — a rare triumph in the industry.",
    likes: 120,
    comments: 18,
    cat: "Video",
    time: "2h",
    mediaUrl:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    mediaType: "image",
  },
  {
    _id: "p2",
    creatorId: "2",
    name: "Meera Iyer",
    role: "Graphic Designer",
    text: "Created a bold new logo for a startup coffee brand with a minimal black and red theme. The work ships next week after months in the drafting room.",
    likes: 85,
    comments: 11,
    cat: "Design",
    time: "5h",
    mediaUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    mediaType: "image",
  },
  {
    _id: "p3",
    creatorId: "3",
    name: "Kabir Mehta",
    role: "Photographer",
    text: "Shot a neon-themed fashion portrait series for a streetwear campaign. 48 final selects delivered to the art director this morning.",
    likes: 230,
    comments: 34,
    cat: "Photo",
    time: "1d",
    mediaUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    mediaType: "image",
  },
];

// ── API ───────────────────────────────────────────────────────────────────────
const API_BASE = "/api";
const tok = () => localStorage.getItem("token") || "";
const ah = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${tok()}`,
});

const fetchJSON = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    console.error("Failed to parse JSON:", text);
  }
  if (!res.ok)
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  return data;
};

const api = {
  login: (d: object) =>
    fetchJSON(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }),
  register: (d: object) =>
    fetchJSON(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }),
  getMe: () => fetchJSON(`${API_BASE}/users/me`, { headers: ah() }),

  getPosts: (q?: string) =>
    fetchJSON(q ? `${API_BASE}/search?q=${q}` : `${API_BASE}/posts`).then(
      (d) => (q ? d.posts : d),
    ),
  getFollowingPosts: () =>
    fetchJSON(`${API_BASE}/posts/following`, { headers: ah() }),
  createPost: (data: object) =>
    fetchJSON(`${API_BASE}/posts`, {
      method: "POST",
      headers: ah(),
      body: JSON.stringify(data),
    }),
  likePost: (id: string) =>
    fetchJSON(`${API_BASE}/posts/${id}/like`, { method: "PUT", headers: ah() }),
  getComments: (id: string) =>
    fetchJSON(`${API_BASE}/posts/${id}/comments`, { headers: ah() }),
  addComment: (id: string, text: string) =>
    fetchJSON(`${API_BASE}/posts/${id}/comments`, {
      method: "POST",
      headers: ah(),
      body: JSON.stringify({ text }),
    }),

  getUsers: (q?: string) =>
    fetchJSON(q ? `${API_BASE}/search?q=${q}` : `${API_BASE}/users`).then(
      (d) => (q ? d.users : d),
    ),
  getUser: (id: string) =>
    fetchJSON(`${API_BASE}/users/${id}`, { headers: ah() }),
  followUser: (id: string) =>
    fetchJSON(`${API_BASE}/users/${id}/follow`, {
      method: "POST",
      headers: ah(),
    }),

  getConvos: () =>
    fetchJSON(`${API_BASE}/messages/conversations`, { headers: ah() }),
  sendMessage: (data: object) =>
    fetchJSON(`${API_BASE}/messages`, {
      method: "POST",
      headers: ah(),
      body: JSON.stringify(data),
    }),
  startConversation: (partnerId: string) =>
    fetchJSON(`${API_BASE}/messages/start`, {
      method: "POST",
      headers: ah(),
      body: JSON.stringify({ partnerId }),
    }),

  getNotifs: () => fetchJSON(`${API_BASE}/notifications`, { headers: ah() }),
  markAllRead: () =>
    fetchJSON(`${API_BASE}/notifications/read-all`, {
      method: "PUT",
      headers: ah(),
    }),
  respondNotif: (id: string, response: string) =>
    fetchJSON(`${API_BASE}/notifications/${id}/respond`, {
      method: "PUT",
      headers: ah(),
      body: JSON.stringify({ response }),
    }),
  hireUser: (id: string) =>
    fetchJSON(`${API_BASE}/users/${id}/hire`, {
      method: "POST",
      headers: ah(),
    }),
  updateMe: (data: object) =>
    fetchJSON(`${API_BASE}/users/me`, {
      method: "PUT",
      headers: ah(),
      body: JSON.stringify(data),
    }),
  applyOpportunity: (id: string, opId: string) =>
    fetchJSON(`${API_BASE}/users/${id}/opportunities/${opId}/apply`, {
      method: "POST",
      headers: ah(),
    }),
  submitReview: (id: string, reviewData: object) =>
    fetchJSON(`${API_BASE}/users/${id}/reviews`, {
      method: "POST",
      headers: ah(),
      body: JSON.stringify(reviewData),
    }),
  getDashboardStats: () =>
    fetchJSON(`${API_BASE}/dashboard/stats`, { headers: ah() }),
};

// ── Reusable Components ───────────────────────────────────────────────────────
const HR = ({
  thick = false,
  style = {},
}: {
  thick?: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      borderTop: thick ? `3px double ${C.ink}` : `1px solid ${C.rule}`,
      ...style,
    }}
  />
);

const Tag = ({
  children,
  red = false,
}: {
  children: string;
  red?: boolean;
}) => (
  <span className={`section-tag${red ? " section-tag-red" : ""}`}>
    {children}
  </span>
);

const Byline = ({
  author,
  role,
  time,
}: {
  author: string;
  role?: string;
  time?: string;
}) => (
  <div className="byline" style={{ marginBottom: 5 }}>
    By <strong>{author}</strong>
    {role ? ` · ${role}` : ""}
    {time ? ` · ${time}` : ""}
  </div>
);

const Ink = ({
  name,
  size = 40,
  color,
  src,
  style = {},
}: {
  name: string;
  size?: number;
  color?: string;
  src?: string;
  style?: React.CSSProperties;
}) => {
  const bg = color || C.ink;
  if (src) {
    const isVideo = src.startsWith("data:video/") || src.endsWith(".mp4") || src.endsWith(".webm");
    if (isVideo) {
      return (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: size,
            height: size,
            border: `1px solid ${C.ink}`,
            objectFit: "cover",
            flexShrink: 0,
            ...style,
          }}
        />
      );
    }
    return (
      <img
        src={src}
        style={{
          width: size,
          height: size,
          border: `1px solid ${C.ink}`,
          objectFit: "cover",
          flexShrink: 0,
          ...style,
        }}
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `1px solid ${C.ink}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Bodoni Moda', serif",
        fontWeight: 700,
        fontSize: size * 0.38,
        color: bg,
        background: C.paper,
        flexShrink: 0,
        letterSpacing: "-0.02em",
        ...style,
      }}
    >
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
};

const Btn = ({
  children,
  onClick,
  variant = "primary",
  style = {},
  disabled = false,
  fullWidth = false,
}: {
  children: React.ReactNode;
  onClick?: (e?: any) => void | Promise<void>;
  variant?: "primary" | "ghost" | "success" | "danger";
  style?: React.CSSProperties;
  disabled?: boolean;
  fullWidth?: boolean;
}) => {
  const [hov, setHov] = useState(false);
  const base: React.CSSProperties = {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "8px 18px",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all .15s",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    ...style,
  };
  const vs: Record<string, React.CSSProperties> = {
    primary: {
      background: hov && !disabled ? C.inkMid : C.ink,
      color: C.paper,
    },
    ghost: {
      background: hov && !disabled ? C.ink : "transparent",
      color: hov && !disabled ? C.paper : C.ink,
      border: `1px solid ${C.ink}`,
    },
    success: {
      background: hov && !disabled ? C.success : "transparent",
      color: hov && !disabled ? C.paper : C.success,
      border: `1px solid ${C.success}`,
    },
    danger: {
      background: hov && !disabled ? C.accent : "transparent",
      color: hov && !disabled ? C.paper : C.accent,
      border: `1px solid ${C.accent}`,
    },
  };
  return (
    <button
      style={{ ...base, ...vs[variant] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Field = ({
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  type = "text",
  style = {},
  onKeyDown,
}: {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  style?: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) => {
  const base: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${C.rule}`,
    padding: "8px 2px",
    color: C.ink,
    fontFamily: "'Spectral',serif",
    fontStyle: "italic",
    fontSize: 14,
    outline: "none",
    resize: "none",
    ...style,
  };
  return multiline ? (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={base}
      rows={rows}
    />
  ) : (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={base}
      type={type}
      onKeyDown={onKeyDown}
    />
  );
};

const Card = ({
  children,
  style = {},
  className = "",
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  key?: any;
}) => (
  <div
    className={className}
    style={{ background: C.surface, border: `1px solid ${C.rule}`, ...style }}
  >
    {children}
  </div>
);

const Hoarding = ({
  url,
  type,
  label,
  caption,
  onLightbox,
}: {
  url: string;
  type: "image" | "video";
  label?: string;
  caption?: string;
  onLightbox?: (url: string, type: "image" | "video") => void;
  key?: any;
}) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hov, setHov] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div
      className="hoarding-frame mb-6 shadow-sm group"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="hoarding-inner relative cursor-pointer overflow-hidden"
        onClick={() => onLightbox?.(url, type)}
      >
        {type === "video" ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={url}
              className="w-full grayscale-[0.25] group-hover:grayscale-0 transition-all duration-500"
              loop
              muted={muted}
              playsInline
            />
            <div
              className={`absolute inset-0 bg-black/15 flex items-center justify-center transition-opacity duration-350 ${
                hov || !playing ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex gap-4">
                <button
                  onClick={togglePlay}
                  className="bg-paper/85 backdrop-blur-md p-2.5 rounded-full border border-ink/40 hover:border-ink hover:bg-ink hover:text-paper transition-all duration-300 shadow-md"
                >
                  {playing ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-paper/85 backdrop-blur-md p-2.5 rounded-full border border-ink/40 hover:border-ink hover:bg-ink hover:text-paper transition-all duration-300 shadow-md"
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
            </div>
            {!playing && (
              <div className="absolute top-2 right-2 byline bg-paper px-2 py-0.5 border border-ink">
                PAUSED
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <img
              src={url}
              className="w-full grayscale-[0.25] group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <Maximize2
                size={20}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
      {label && (
        <div className="hoarding-cap absolute -top-3 left-4">{label}</div>
      )}
      {caption && (
        <div
          style={{
            background: C.surface,
            borderTop: `1px solid ${C.rule}`,
            padding: "12px 16px",
          }}
        >
          <div
            className="byline"
            style={{
              fontSize: 7,
              color: C.accent,
              marginBottom: 4,
              letterSpacing: "0.12em",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ◆ ARCHIVE SPECIMEN FILE
          </div>
          <p
            style={{
              fontFamily: "'Spectral', serif",
              fontSize: 13,
              fontStyle: "italic",
              color: C.inkMid,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

const NewspaperLoading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(244, 241, 234, 0.75)",
      backdropFilter: "blur(12px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
    className="paper-grain"
  >
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: `2px solid ${C.rule}`,
          borderTopColor: C.accent,
          borderRightColor: C.accent,
        }}
      />
      {/* Inner pulsing Monogram */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          fontFamily: "'Bodoni Moda', serif",
          fontSize: 32,
          fontWeight: 800,
          color: C.ink,
          letterSpacing: "-0.05em",
        }}
      >
        AW
      </motion.div>
    </div>
    
    {/* Loading Message */}
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="byline"
      style={{
        marginTop: 24,
        color: C.accent,
        fontWeight: 700,
        letterSpacing: "0.25em",
        fontSize: 10,
        textTransform: "uppercase",
      }}
    >
      Updating Dossier Ledger…
    </motion.div>
  </motion.div>
);

const LateBreakingTicker = ({
  setPage,
  setSelectedCreator,
  setActiveConvoId,
}: {
  setPage: (p: string) => void;
  setSelectedCreator: (c: any) => void;
  setActiveConvoId: (id: string) => void;
}) => {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = () =>
    api
      .getNotifs()
      .then(setNotifs)
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchNotifs();
    const inv = setInterval(fetchNotifs, 10000);
    return () => clearInterval(inv);
  }, []);

  const handleAction = async (id: string, resp: string) => {
    try {
      await api.respondNotif(id, resp);
      setNotifs((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, responded: resp, read: true } : n,
        ),
      );
    } catch (e) {
      console.error("Action failed", e);
    }
  };

  const navigate = async (n: Notif) => {
    if (!n.linkId) return;
    if (n.linkType === "profile") {
      const u = await api.getUser(n.linkId);
      setSelectedCreator(u);
      setPage("Profile");
    } else if (n.linkType === "message") {
      setActiveConvoId(n.linkId);
      setPage("Messages");
    }
  };

  if (loading && notifs.length === 0) return null;

  return (
    <aside
      style={{
        paddingLeft: 32,
        borderLeft: `1px solid ${C.rule}`,
        height: "fit-content",
        position: "sticky",
        top: 120,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div className="section-tag section-tag-red">Late-Breaking</div>
        {notifs.some((n) => !n.read) && (
          <button
            onClick={async () => {
              try {
                await api.markAllRead();
                setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
              } catch (e) {
                console.error("Mark all read failed", e);
              }
            }}
            className="byline"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 8,
              textDecoration: "underline",
              padding: 0,
              color: C.accent,
            }}
          >
            MARK ALL READ
          </button>
        )}
      </div>
      <HR style={{ marginBottom: 20 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {notifs.slice(0, 8).map((n) => (
          <motion.div
            key={n._id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ position: "relative", opacity: n.read ? 0.6 : 1 }}
          >
            <div
              className="byline"
              style={{
                fontSize: 8,
                color: C.accent,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {n.icon} {n.type.toUpperCase()} · {n.time}
            </div>
            <div
              className={`headline-sm ${n.linkId ? "cursor-pointer hover:underline" : ""}`}
              onClick={() => navigate(n)}
              style={{ fontSize: 13, lineHeight: 1.25, fontWeight: 800 }}
            >
              {n.title.toUpperCase()}
            </div>
            <div
              className="italic-serif"
              style={{
                fontSize: 11,
                color: C.inkMid,
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              {n.detail}
            </div>

            {n.actionable && !n.responded && (
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => handleAction(n._id, "accepted")}
                  style={{
                    fontSize: 9,
                    padding: "4px 8px",
                    background: C.success,
                    color: C.white,
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="byline"
                >
                  ACCEPT
                </button>
                <button
                  onClick={() => handleAction(n._id, "declined")}
                  style={{
                    fontSize: 9,
                    padding: "4px 8px",
                    background: C.ink,
                    color: C.white,
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="byline"
                >
                  PASS
                </button>
              </div>
            )}

            {n.responded && (
              <div
                className="byline"
                style={{ fontSize: 8, color: C.accent, marginTop: 8 }}
              >
                ◆ PROTOCOL {n.responded.toUpperCase()}
              </div>
            )}

            <HR
              style={{ marginTop: 20, borderStyle: "dotted", opacity: 0.5 }}
            />
          </motion.div>
        ))}
        {notifs.length === 0 && (
          <div className="italic-serif text-sm opacity-40 text-center py-10">
            No urgent dispatches at this hour. All channels reported quiet.
          </div>
        )}
      </div>
      <div
        style={{
          marginTop: 32,
          padding: 12,
          background: C.accentBg,
          border: `1px dashed ${C.accent}`,
          textAlign: "center",
        }}
      >
        <div className="byline" style={{ fontSize: 7, opacity: 0.5 }}>
          Official Gazette Registry v1.1.2
        </div>
      </div>
    </aside>
  );
};

// ── Onboarding Tour ───────────────────────────────────────────────────────────
const OnboardingTour = ({
  currentUser,
  onUpdate,
  onComplete,
}: {
  currentUser: User;
  onUpdate: (u: any) => void;
  onComplete: () => void;
}) => {
  const [phase, setPhase] = useState<"choice" | "showcase" | "setup" | "finished">("choice");
  const [intent, setIntent] = useState<"hire" | "creative" | null>(null);

  // Hiring Form states
  const [companyName, setCompanyName] = useState(currentUser.name || "");
  const [companyLocation, setCompanyLocation] = useState(currentUser.location || "Hyderabad, India");
  const [hiringRole, setHiringRole] = useState("Agency Director");
  const [hiringBio, setHiringBio] = useState("");
  const [industry, setIndustry] = useState("Creative Agency");
  const [companySize, setCompanySize] = useState("50-100 Employees");
  const [foundedYear, setFoundedYear] = useState("2018");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyBanner, setCompanyBanner] = useState("");

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Creative Form states
  const [creativeName, setCreativeName] = useState(currentUser.name || "");
  const [creativeRole, setCreativeRole] = useState(currentUser.role || "Video Editor");
  const [creativeBio, setCreativeBio] = useState("");
  const [creativeSkills, setCreativeSkills] = useState("");
  const [creativeRate, setCreativeRate] = useState("");

  // First Portfolio state
  const [newPortTitle, setNewPortTitle] = useState("");
  const [newPortUrl, setNewPortUrl] = useState("");
  const [newPortType, setNewPortType] = useState<"image" | "video">("image");
  const portFileInputRef = useRef<HTMLInputElement>(null);
  const [publishing, setPublishing] = useState(false);

  const onPortFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setNewPortUrl(compressed);
    };
    reader.readAsDataURL(file);
  };

  const onLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setCompanyLogo(compressed);
    };
    reader.readAsDataURL(file);
  };

  const onBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setCompanyBanner(compressed);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      if (intent === "hire") {
        const servicesArr = servicesOffered
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        const updated = await api.updateMe({
          name: companyName || currentUser.name,
          role: hiringRole || "Agency Director",
          bio: hiringBio || "Seeking creative talent for ongoing campaigns.",
          location: companyLocation,
          userType: "recruiter",
          verified: false,
          industry: industry,
          companySize: companySize,
          foundedYear: parseInt(foundedYear) || 2018,
          website: companyWebsite,
          linkedin: linkedin,
          instagram: instagram,
          missionStatement: missionStatement,
          servicesOffered: servicesArr,
          companyLogo: companyLogo,
          companyBanner: companyBanner,
          skills: [],
          rate: "Commission-Based",
          portfolio: [],
          onboarded: true,
          companyStats: {
            projectsPosted: 0,
            creatorsHired: 0,
            responseRate: "100%",
            avgResponseTime: "1 Hour",
            profileViews: 0
          },
          hiringTrust: {
            trustScore: 90,
            paymentsCompleted: 0,
            avgPaymentTime: "Same Day",
            disputes: 0,
            successfulCollaborations: 0
          },
          opportunities: [],
          portfolioShowcase: [],
          collaborations: [],
          reviews: [],
          hiringPreferences: {
            preferredExperience: "Intermediate+",
            projectType: "Freelance",
            workMode: "Remote",
            languages: ["English"],
            availability: "Hiring Now"
          }
        });
        onUpdate(updated);
      } else {
        const skillsArr = creativeSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        
        const portfolioItem = newPortTitle && newPortUrl ? [{
          id: String(Date.now()),
          title: newPortTitle,
          type: newPortType,
          url: newPortUrl
        }] : [];

        const parsedRate = creativeRate ? `₹${parseInt(creativeRate).toLocaleString('en-IN')}/hr` : "Contact for Rate";

        const updated = await api.updateMe({
          name: creativeName || currentUser.name,
          role: creativeRole || "Creative Partner",
          bio: creativeBio || "Dossier registered via induction portal.",
          skills: skillsArr,
          rate: parsedRate,
          portfolio: portfolioItem,
          onboarded: true,
          userType: "creator",
        });
        onUpdate(updated);
      }
      setPhase("finished");
    } catch (err) {
      console.error("Failed to compile dossier:", err);
      alert("Error compiling dossier. Please review your entries.");
    }
    setPublishing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <Card
        style={{
          maxWidth: phase === "setup" ? 640 : 540,
          width: "100%",
          padding: 32,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
        className="shadow-2xl relative"
      >
        {/* Header Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span className="byline" style={{ color: C.accent }}>
            Induction Registry // Phase {phase === "choice" ? "I" : phase === "showcase" ? "II" : phase === "setup" ? "III" : "IV"}
          </span>
          <button
            onClick={onComplete}
            className="text-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer"
          >
            <Plus className="w-5 h-5 rotate-45" style={{ color: C.inkMid }} />
          </button>
        </div>

        {/* Phase 1: Choice & Intent */}
        {phase === "choice" && (
          <div className="fade-in" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <h2 className="headline-lg" style={{ marginBottom: 12 }}>
              DETERMINE YOUR INTENT
            </h2>
            <p className="italic-serif text-sm text-zinc-600 mb-6">
              Welcome to ArtWithin. To calibrate the talent ledger and correspondent registry channels, please specify your primary operational focus.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {/* Hiring intent selection card */}
              <div
                onClick={() => {
                  setIntent("hire");
                  setPhase("showcase");
                }}
                style={{
                  border: `1px solid ${intent === "hire" ? C.accent : C.rule}`,
                  background: intent === "hire" ? C.accentBg : "transparent",
                  padding: 24,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
                className="hover:border-zinc-800"
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>💼</div>
                <div className="headline-sm" style={{ fontSize: 13, marginBottom: 8 }}>
                  I AM SEEKING TALENT
                </div>
                <p className="body-copy" style={{ fontSize: 11, fontStyle: "italic", lineHeight: 1.4 }}>
                  "I want to explore verified creative dossiers, dispatch project proposals, and commission bespoke artwork."
                </p>
              </div>

              {/* Creative intent selection card */}
              <div
                onClick={() => {
                  setIntent("creative");
                  setPhase("showcase");
                }}
                style={{
                  border: `1px solid ${intent === "creative" ? C.accent : C.rule}`,
                  background: intent === "creative" ? C.accentBg : "transparent",
                  padding: 24,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
                className="hover:border-zinc-800"
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>🎨</div>
                <div className="headline-sm" style={{ fontSize: 13, marginBottom: 8 }}>
                  I AM AN ARTISAN
                </div>
                <p className="body-copy" style={{ fontSize: 11, fontStyle: "italic", lineHeight: 1.4 }}>
                  "I want to compile my creative dossier, showcase visual plates, and establish correspondence contracts."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Showcase */}
        {phase === "showcase" && (
          <div className="fade-in" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <h2 className="headline-lg" style={{ marginBottom: 12 }}>
              THE TALENT ECOSYSTEM
            </h2>
            <p className="italic-serif text-sm text-zinc-600 mb-6">
              Before setting up your active credentials, let us summarize the primary registry channels.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {[
                {
                  title: "1. The Talent Ledger Registry",
                  desc: "Browse premium creative dossiers. Query specializations, evaluate rates, and commission secure assignments.",
                  icon: "🔍",
                },
                {
                  title: "2. The Gazette Dispatches",
                  desc: "A chronological feed of active visual process plates. Follow creators to receive instant dispatches on your custom home feed.",
                  icon: "📰",
                },
                {
                  title: "3. Direct Correspondence",
                  desc: "Establish direct, private links through secure communication channels for negotiation and active contracts.",
                  icon: "✉️",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: 14,
                    border: `1px solid ${C.rule}`,
                    background: C.surface,
                  }}
                >
                  <div style={{ fontSize: 20 }}>{item.icon}</div>
                  <div>
                    <div className="headline-sm" style={{ fontSize: 12, marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <p className="body-copy" style={{ fontSize: 11, color: C.inkMid }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${C.rule}` }}>
              <Btn variant="ghost" onClick={() => setPhase("choice")}>
                ← Back
              </Btn>
              <Btn onClick={() => setPhase("setup")}>
                Calibrate Dossier →
              </Btn>
            </div>
          </div>
        )}

        {/* Phase 3: Setup Profile Form */}
        {phase === "setup" && (
          <div className="fade-in" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <h2 className="headline-lg" style={{ marginBottom: 10 }}>
              CALIBRATE ACTIVE DOSSIER
            </h2>
            <p className="italic-serif text-xs text-zinc-500 mb-6">
              Provide necessary parameters to compile your profile within the official directory.
            </p>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
              {intent === "hire" ? (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        COMPANY / ENTITY NAME
                      </div>
                      <Field
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. PixelForge Studios"
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        OPERATIONAL TITLE / ROLE
                      </div>
                      <Field
                        value={hiringRole}
                        onChange={(e) => setHiringRole(e.target.value)}
                        placeholder="e.g. Managing Director"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        INDUSTRY
                      </div>
                      <Field
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g. Creative Agency"
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        COMPANY SIZE
                      </div>
                      <select
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="mono bg-transparent border-b border-rule p-2 text-[11px]"
                        style={{ color: C.ink, width: "100%", outline: "none", fontFamily: "'Spectral',serif", fontStyle: "italic" }}
                      >
                        <option value="1-10 Employees">1-10 EMPLOYEES</option>
                        <option value="10-50 Employees">10-50 EMPLOYEES</option>
                        <option value="50-100 Employees">50-100 EMPLOYEES</option>
                        <option value="100+ Employees">100+ EMPLOYEES</option>
                      </select>
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        FOUNDED YEAR
                      </div>
                      <Field
                        value={foundedYear}
                        onChange={(e) => setFoundedYear(e.target.value)}
                        placeholder="e.g. 2018"
                        type="number"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        LOCATION
                      </div>
                      <Field
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                        placeholder="e.g. Hyderabad, India"
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        WEBSITE
                      </div>
                      <Field
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="e.g. www.pixelforge.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        LINKEDIN URL
                      </div>
                      <Field
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/company/..."
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        INSTAGRAM HANDLE
                      </div>
                      <Field
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        MISSION STATEMENT
                      </div>
                      <Field
                        value={missionStatement}
                        onChange={(e) => setMissionStatement(e.target.value)}
                        placeholder="e.g. To forge unforgettable visual narratives..."
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        SERVICES OFFERED (COMMA SEPARATED)
                      </div>
                      <Field
                        value={servicesOffered}
                        onChange={(e) => setServicesOffered(e.target.value)}
                        placeholder="Video Production, Luxury Branding"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="byline" style={{ fontSize: 8, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                      <span>COMPANY DESCRIPTION & OVERVIEW</span>
                      <span style={{ color: (hiringBio.length < 500 || hiringBio.length > 1000) ? C.accent : C.success }}>
                        {hiringBio.length} / 500-1000 chars
                      </span>
                    </div>
                    <Field
                      value={hiringBio}
                      onChange={(e) => setHiringBio(e.target.value)}
                      placeholder="PixelForge Studios is a premier multi-disciplinary creative agency specializing in..."
                      multiline
                      rows={4}
                    />
                    <div className="italic-serif text-[10px] text-zinc-400 mt-1">
                      ◆ Recommended character limit: 500 to 1000 characters for high-end editorial display.
                    </div>
                  </div>

                  {/* Logo & Banner Base64 upload drawers */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, border: `1px dashed ${C.rule}`, padding: 16, background: C.surface }}>
                    <div>
                      <div className="byline" style={{ fontSize: 7, color: C.accent, marginBottom: 6 }}>
                        ◆ COMPANY LOGO SIGNAGE
                      </div>
                      <Btn variant="ghost" onClick={() => logoFileInputRef.current?.click()} style={{ fontSize: 8, padding: "4px 10px" }} fullWidth>
                        {companyLogo ? "Change Logo" : "Upload Logo"}
                      </Btn>
                      <input type="file" ref={logoFileInputRef} hidden accept="image/*" onChange={onLogoFileChange} />
                      {companyLogo && (
                        <div style={{ marginTop: 8, height: 60, display: "flex", justifyContent: "center", alignItems: "center", background: C.white, border: `1px solid ${C.rule}` }}>
                          <img src={companyLogo} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 7, color: C.accent, marginBottom: 6 }}>
                        ◆ COMPANY EDITORIAL BANNER
                      </div>
                      <Btn variant="ghost" onClick={() => bannerFileInputRef.current?.click()} style={{ fontSize: 8, padding: "4px 10px" }} fullWidth>
                        {companyBanner ? "Change Banner" : "Upload Banner"}
                      </Btn>
                      <input type="file" ref={bannerFileInputRef} hidden accept="image/*,video/*" onChange={onBannerFileChange} />
                      {companyBanner && (
                        <div style={{ marginTop: 8, height: 60, display: "flex", justifyContent: "center", alignItems: "center", background: C.white, border: `1px solid ${C.rule}` }}>
                          {companyBanner.startsWith("data:video/") || companyBanner.endsWith(".mp4") || companyBanner.endsWith(".webm") ? (
                            <video src={companyBanner} autoPlay muted loop playsInline style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} />
                          ) : (
                            <img src={companyBanner} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        ARTISAN NAME
                      </div>
                      <Field
                        value={creativeName}
                        onChange={(e) => setCreativeName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        PRIMARY DISCIPLINE
                      </div>
                      <select
                        value={creativeRole}
                        onChange={(e) => setCreativeRole(e.target.value)}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          borderBottom: `1px solid ${C.rule}`,
                          padding: "8px 2px",
                          color: C.ink,
                          fontFamily: "'Spectral',serif",
                          fontStyle: "italic",
                          fontSize: 14,
                          outline: "none",
                          cursor: "pointer",
                        }}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        EXPERTISE SPECIALIZATIONS (COMMA SEPARATED)
                      </div>
                      <Field
                        value={creativeSkills}
                        onChange={(e) => setCreativeSkills(e.target.value)}
                        placeholder="DaVinci, Color Grading, Photoshop"
                      />
                    </div>
                    <div>
                      <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                        CONTRACT RATE (INR / HR)
                      </div>
                      <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${C.rule}` }}>
                        <span className="mono" style={{ fontSize: 13, paddingRight: 6 }}>₹</span>
                        <input
                          type="number"
                          value={creativeRate}
                          onChange={(e) => setCreativeRate(e.target.value)}
                          placeholder="e.g. 3500"
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            padding: "8px 2px",
                            color: C.ink,
                            fontFamily: "'Spectral',serif",
                            fontStyle: "italic",
                            fontSize: 14,
                            outline: "none",
                          }}
                        />
                        <span className="byline" style={{ fontSize: 8, paddingLeft: 6 }}>/ HR</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                      BIOGRAPHICAL DOSSIER DETAILS
                    </div>
                    <Field
                      value={creativeBio}
                      onChange={(e) => setCreativeBio(e.target.value)}
                      placeholder="Compile biographical details and creative philosophies to file under your registry search index..."
                      multiline
                      rows={3}
                    />
                  </div>

                  {/* Portfolio Plate Sub-Form */}
                  <div
                    style={{
                      border: `1px dashed ${C.rule}`,
                      padding: 16,
                      background: `${C.surface}`,
                    }}
                  >
                    <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 8 }}>
                      ◆ COMMISSION YOUR FIRST VISUAL PLATE ENTRY (OPTIONAL)
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                      <div>
                        <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                          PLATE TITLE
                        </div>
                        <Field
                          value={newPortTitle}
                          onChange={(e) => setNewPortTitle(e.target.value)}
                          placeholder="e.g. Cinematic Reel 01"
                          style={{ fontSize: 12 }}
                        />
                      </div>
                      <div>
                        <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                          MEDIA FORMAT & UPLOAD
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <select
                            value={newPortType}
                            onChange={(e) => {
                              setNewPortType(e.target.value as "image" | "video");
                              setNewPortUrl("");
                            }}
                            className="mono bg-transparent border-b border-rule p-1 text-[9px]"
                            style={{ color: C.ink }}
                          >
                            <option value="image">IMAGE</option>
                            <option value="video">VIDEO</option>
                          </select>
                          <Btn
                            variant="ghost"
                            onClick={() => portFileInputRef.current?.click()}
                            style={{ fontSize: 8, padding: "2px 8px" }}
                          >
                            Upload File
                          </Btn>
                        </div>
                        <input
                          type="file"
                          ref={portFileInputRef}
                          hidden
                          accept={newPortType === "image" ? "image/*" : "video/*"}
                          onChange={onPortFileChange}
                        />
                      </div>
                    </div>

                    {newPortUrl && (
                      <div style={{ border: `1px solid ${C.rule}`, background: C.paper, padding: 8, marginTop: 8 }}>
                        <div className="byline" style={{ fontSize: 6, color: C.accent, marginBottom: 4 }}>
                          ◆ PLATE ASSET LOADED
                        </div>
                        <div style={{ height: 90, display: "flex", justifyContent: "center", alignItems: "center", background: C.white, border: `1px solid ${C.rule}`, overflow: "hidden" }}>
                          {newPortType === "image" ? (
                            <img src={newPortUrl} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                          ) : (
                            <video src={newPortUrl} style={{ maxHeight: "100%", maxWidth: "100%" }} muted autoplay loop />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${C.rule}` }}>
              <Btn variant="ghost" onClick={() => setPhase("showcase")}>
                ← Back
              </Btn>
              <Btn onClick={handlePublish} disabled={publishing}>
                {publishing ? "Publishing..." : "Publish Dossier →"}
              </Btn>
            </div>
          </div>
        )}

        {/* Phase 4: Finished */}
        {phase === "finished" && (
          <div className="fade-in" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📜</div>
            <h2 className="headline-lg" style={{ marginBottom: 12 }}>
              DOSSIER COMPILED
            </h2>
            <div className="section-tag section-tag-red" style={{ marginBottom: 20 }}>
              VERIFIED ACTIVE REGISTERED
            </div>
            <p className="italic-serif text-sm text-zinc-600 mb-8" style={{ maxWidth: 420 }}>
              Congratulations. Your active credentials and philosophical parameters have been filed within the decentralized ArtWithin Ledger. You are now prepared to explore dispatches and establish private correspondence.
            </p>

            <Btn fullWidth onClick={onComplete} style={{ padding: "12px 0" }}>
              Access The Feed →
            </Btn>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

// ── Auth Page ─────────────────────────────────────────────────────────────────
function AuthPage({
  onAuth,
  wrapApi,
}: {
  onAuth: (user: User, token: string) => void;
  wrapApi?: <T>(fn: () => Promise<T>) => Promise<T>;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Designer");
  const [userType, setUserType] = useState<"creator" | "recruiter">("creator");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberedEmail") ? true : false,
  );
  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date()
    .toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  useEffect(() => {
    if (rememberMe) localStorage.setItem("rememberedEmail", email);
    else localStorage.removeItem("rememberedEmail");
  }, [email, rememberMe]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setLoading(true);
    try {
      const payload =
        mode === "login"
          ? { email: email.trim().toLowerCase(), password }
          : { name: name.trim(), email: email.trim().toLowerCase(), password, role, userType };
      const data = await (wrapApi
        ? wrapApi(() => api[mode](payload))
        : api[mode](payload));
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (!data.token) {
        setError("Authentication failed — please try again.");
        setLoading(false);
        return;
      }

      if (rememberMe) localStorage.setItem("rememberedEmail", email);
      else localStorage.removeItem("rememberedEmail");

      if (mode === "register") {
        setSuccess("Registration successful! You may now sign in.");
        setMode("login");
        setName("");
        setPassword("");
        setLoading(false);
        return;
      }
      onAuth(data.user, data.token);
    } catch (err: any) {
      setError(
        err.message ||
        "Server unreachable — please ensure the backend is running.",
      );
    }
    setLoading(false);
  };



  return (
    <div
      className="paper-grain"
      style={{
        minHeight: "100vh",
        background: C.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <HR thick />
          <div
            className="byline"
            style={{ padding: "6px 0", letterSpacing: "0.4em" }}
          >
            {today}
          </div>
          <HR />
          <div
            className="headline-xl"
            style={{ padding: "14px 0 6px", letterSpacing: "-0.02em" }}
          >
            ARTWITHIN
          </div>
          <div
            className="italic-serif"
            style={{ fontSize: 13, color: C.inkMid, marginBottom: 10 }}
          >
            "The Creative Commerce Gazette"
          </div>
          <HR thick />
        </div>

        <Card style={{ padding: "32px 36px" }}>
          <div
            style={{
              display: "flex",
              borderBottom: `1px solid ${C.rule}`,
              marginBottom: 24,
            }}
          >
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setSuccess("");
                }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: mode === m ? C.ink : C.inkFaint,
                  borderBottom:
                    mode === m ? `2px solid ${C.ink}` : "2px solid transparent",
                  fontWeight: mode === m ? 700 : 400,
                  marginBottom: -1,
                }}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <div
            className="byline"
            style={{
              textAlign: "center",
              marginBottom: 20,
              fontSize: 9,
              letterSpacing: "0.5em",
            }}
          >
            {mode === "login"
              ? "— PRESS CREDENTIALS —"
              : "— NEW CORRESPONDENT ENROLMENT —"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {mode === "register" && (
              <>
                <div>
                  <div className="byline" style={{ marginBottom: 6 }}>
                    Account Type
                  </div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setUserType("creator");
                        setRole("Designer");
                      }}
                      style={{
                        flex: 1,
                        padding: "6px 12px",
                        fontSize: 9,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: userType === "creator" ? C.ink : "transparent",
                        color: userType === "creator" ? C.paper : C.ink,
                        border: `1px solid ${C.ink}`,
                        cursor: "pointer",
                        fontWeight: userType === "creator" ? 700 : 400
                      }}
                    >
                      ARTISAN / CREATOR
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserType("recruiter");
                        setRole("Creative Agency");
                      }}
                      style={{
                        flex: 1,
                        padding: "6px 12px",
                        fontSize: 9,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: userType === "recruiter" ? C.ink : "transparent",
                        color: userType === "recruiter" ? C.paper : C.ink,
                        border: `1px solid ${C.ink}`,
                        cursor: "pointer",
                        fontWeight: userType === "recruiter" ? 700 : 400
                      }}
                    >
                      AGENCY / RECRUITER
                    </button>
                  </div>
                </div>

                {userType === "creator" && (
                  <div>
                    <div className="byline" style={{ marginBottom: 6 }}>
                      Primary Creative Role
                    </div>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="mono bg-transparent border-b border-rule p-2 w-full text-[11px] mb-3"
                      style={{ color: C.ink, outline: "none", fontStyle: "italic", border: "none", borderBottom: `1px solid ${C.rule}`, fontFamily: "'Spectral', serif" }}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <div className="byline" style={{ marginBottom: 6 }}>
                    Full Name (or Agency Name)
                  </div>
                  <Field
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={userType === "recruiter" ? "e.g. PixelForge Studios" : "e.g. Aarav Shah"}
                  />
                </div>
              </>
            )}
            <div>
              <div className="byline" style={{ marginBottom: 6 }}>
                Email Address
              </div>
              <Field
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correspondent@gazette.com"
                type="email"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div>
              <div className="byline" style={{ marginBottom: 6 }}>
                Password
              </div>
              <Field
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: `1px solid ${C.rule}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: rememberMe ? C.ink : "transparent",
                }}
              >
                {rememberMe && <CheckCircle2 size={10} color={C.white} />}
              </div>
              <span className="byline" style={{ fontSize: 8 }}>
                Remember Credentials
              </span>
            </div>
          </div>

          {error && (
            <div
              className="byline"
              style={{
                marginTop: 16,
                padding: "10px 14px",
                background: C.accentBg,
                border: `1px solid ${C.accent}`,
                color: C.accent,
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="byline"
              style={{
                marginTop: 16,
                padding: "10px 14px",
                background: "rgba(42,122,75,0.06)",
                border: `1px solid ${C.success}`,
                color: C.success,
              }}
            >
              {success}
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <Btn
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
              style={{ padding: "12px 0" }}
            >
              {loading
                ? "Processing..."
                : mode === "login"
                  ? "Enter the Gazette →"
                  : "Submit Application →"}
            </Btn>
          </div>

          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: `1px solid ${C.rule}`,
              textAlign: "center",
            }}
          >
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setSuccess("");
              }}
              className="byline"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 9,
                textDecoration: "underline",
              }}
            >
              {mode === "login"
                ? "No account? Register as a Correspondent"
                : "Already enrolled? Sign In"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Pages ───────────────────────────────────────────────────────────────────

function HomePage({
  posts,
  setPosts,
  setPage,
  setSelectedCreator,
  currentUser,
  search,
  setSearch,
  wrapApi,
  onLightbox,
}: {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setPage: (p: string) => void;
  setSelectedCreator: (c: Creator) => void;
  currentUser: User | null;
  search: string;
  setSearch: (s: string) => void;
  wrapApi?: <T>(fn: () => Promise<T>) => Promise<T>;
  onLightbox?: (url: string, type: "image" | "video") => void;
}) {
  const [text, setText] = useState("");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [feedType, setFeedType] = useState<"all" | "following">("all");
  const [media, setMedia] = useState<{
    url: string;
    type: "image" | "video";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      api.getDashboardStats()
        .then(setStats)
        .catch(console.error);
    }
  }, [currentUser, posts]);

  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [postComments, setPostComments] = useState<Record<string, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [loadingComments, setLoadingComments] = useState<Record<string, boolean>>({});

  const toggleComments = async (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      if (!postComments[postId]) {
        setLoadingComments((prev) => ({ ...prev, [postId]: true }));
        try {
          const comments = await api.getComments(postId);
          setPostComments((prev) => ({ ...prev, [postId]: comments || [] }));
        } catch (e) {
          console.error("Failed to load comments", e);
        } finally {
          setLoadingComments((prev) => ({ ...prev, [postId]: false }));
        }
      }
    }
  };

  const handleAddComment = async (postId: string) => {
    const textVal = commentInputs[postId] || "";
    if (!textVal.trim()) return;
    try {
      const newComment = await api.addComment(postId, textVal.trim());
      setPostComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: (p.comments || 0) + 1 } : p,
        ),
      );
    } catch (e) {
      console.error("Failed to add comment", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts =
      feedType === "all" ? api.getPosts(search) : api.getFollowingPosts();
    fetchPosts
      .then((d) => {
        setPosts(Array.isArray(d) && d.length > 0 ? d : FB_POSTS);
        setLoading(false);
      })
      .catch(() => {
        setPosts(FB_POSTS);
        setLoading(false);
      });
  }, [search, feedType]);

  const handlePost = async () => {
    if (!text.trim() && !media) return;
    setPosting(true);
    try {
      const saved = await (wrapApi
        ? wrapApi(async () =>
          api.createPost({
            text: text.trim(),
            cat: "General",
            mediaUrl: media?.url,
            mediaType: media?.type,
          }),
        )
        : api.createPost({
          text: text.trim(),
          cat: "General",
          mediaUrl: media?.url,
          mediaType: media?.type,
        }));
      setPosts((prev) => [saved, ...prev]);
      setText("");
      setMedia(null);
    } catch (err) {
      console.error("Posting failed:", err);
    }
    setPosting(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const type = file.type.startsWith("video") ? "video" : "image";
      const mediaUrl = type === "video" ? url : await compressImage(url, 800, 0.7);
      setMedia({ url: mediaUrl, type });
    };
    reader.readAsDataURL(file);
  };

  const toggleLike = async (id: string) => {
    const was = likedIds.has(id);
    setLikedIds((prev) => {
      const n = new Set(prev);
      was ? n.delete(id) : n.add(id);
      return n;
    });
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, likes: p.likes + (was ? -1 : 1) } : p,
      ),
    );
    try {
      await api.likePost(id);
    } catch { }
  };

  if (loading)
    return (
      <div
        className="italic-serif"
        style={{ textAlign: "center", padding: 80, color: C.inkFaint }}
      >
        Gathering the morning edition…
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fade-in"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderBottom: `1px solid ${C.rule}`,
          marginBottom: 24,
        }}
      >
        {[
          ["Direct Dispatch", String(posts.length), "New Briefs Filed"],
          ["Portfolio Reach", stats?.reach || "4.8K", "Unique Impressions"],
          ["Active Strategy", stats?.followers !== undefined ? String(stats.followers) : "29", stats?.followers !== undefined ? "Active Followers" : "Messages Pending"],
        ].map(([l, v, s], i) => (
          <div
            key={l}
            style={{
              padding: "12px 16px",
              borderRight: i < 2 ? `1px solid ${C.rule}` : "none",
              textAlign: "center",
            }}
          >
            <div className="byline" style={{ marginBottom: 4 }}>
              {l}
            </div>
            <div className="headline-lg" style={{ lineHeight: 1 }}>
              {v}
            </div>
            <div
              className="italic-serif"
              style={{ fontSize: 11, color: C.inkFaint }}
            >
              {s}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <button
          onClick={() => setFeedType("all")}
          className={`nav-btn ${feedType === "all" ? "active" : ""}`}
          style={{ padding: "12px 0" }}
        >
          All Dispatches
        </button>
        {currentUser && (
          <button
            onClick={() => setFeedType("following")}
            className={`nav-btn ${feedType === "following" ? "active" : ""}`}
            style={{ padding: "12px 0" }}
          >
            Following
          </button>
        )}
      </div>

      <Card style={{ padding: 16, marginBottom: 24 }}>
        <div className="byline" style={{ marginBottom: 10 }}>
          SUBMIT A DISPATCH TO THE GAZETTE
        </div>
        <Field
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a creative update, project announcement, or portfolio piece…"
          multiline
          rows={3}
        />
        {media && (
          <div
            style={{
              position: "relative",
              marginTop: 12,
              border: `1px solid ${C.rule}`,
              height: 200,
              overflow: "hidden",
            }}
          >
            {media.type === "image" ? (
              <img src={media.url} className="w-full h-full object-cover" />
            ) : (
              <video
                src={media.url}
                className="w-full h-full object-cover"
                controls
              />
            )}
            <button
              onClick={() => setMedia(null)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: C.ink,
                color: C.white,
                border: "none",
                borderRadius: "50%",
                width: 20,
                height: 20,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
            paddingTop: 10,
            borderTop: `1px solid ${C.rule}`,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*,video/*"
              onChange={onFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="byline"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Camera className="w-3 h-3" /> ATTACH ASSET
            </button>
          </div>
          <Btn
            onClick={handlePost}
            disabled={posting || (!text.trim() && !media)}
          >
            {posting ? "Publishing…" : "Publish Dispatch →"}
          </Btn>
        </div>
      </Card>

      {posts.length === 0 && (
        <div
          className="italic-serif"
          style={{ textAlign: "center", padding: 60, color: C.inkFaint }}
        >
          No dispatches on current record.
        </div>
      )}

      {posts.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 0,
            borderTop: `3px double ${C.ink}`,
          }}
        >
          <div
            style={{
              padding: "16px 24px 16px 0",
              borderRight: `1px solid ${C.rule}`,
            }}
          >
            <Tag red>{posts[0].cat}</Tag>
            <h2 className="headline-xl" style={{ margin: "12px 0" }}>
              {posts[0].name.toUpperCase()} REVEALS LATEST PLATE ARCHITECTURE
            </h2>
            <HR style={{ margin: "12px 0" }} />
            <Byline
              author={posts[0].name}
              role={posts[0].role}
              time={posts[0].time}
            />
            {posts[0].mediaUrl ? (
              <Hoarding
                url={posts[0].mediaUrl}
                type={posts[0].mediaType || "image"}
                label={`PLATE EXHIBIT — ${posts[0].cat.toUpperCase()}`}
                caption={`Documented capture from ${posts[0].name}'s latest workshop session. Metadata suggests technical variance in color space.`}
                onLightbox={onLightbox}
              />
            ) : (
              <div
                style={{
                  margin: "16px 0",
                  border: `3px double ${C.ink}`,
                  padding: 4,
                  background: C.paper,
                }}
              >
                <div
                  style={{
                    border: `1px solid ${C.ink}`,
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.inkFaint,
                  }}
                  className="byline"
                >
                  No visual dispatch attached
                </div>
              </div>
            )}
            <p className="body-copy drop-cap">
              {posts[0].text} This contribution signifies a notable shift in the
              ecosystem, according to various archive observers.
            </p>
            <div
              style={{
                display: "flex",
                gap: 24,
                marginTop: 20,
                paddingTop: 12,
                borderTop: `1px solid ${C.rule}`,
              }}
            >
              <button
                onClick={() => toggleLike(posts[0]._id)}
                className="byline"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: likedIds.has(posts[0]._id) ? C.accent : C.inkMid,
                }}
              >
                {likedIds.has(posts[0]._id) ? "♥" : "♡"} {posts[0].likes} LIKES
              </button>
              <button
                onClick={() => toggleComments(posts[0]._id)}
                className="byline"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: expandedPostId === posts[0]._id ? C.accent : C.inkMid,
                  fontWeight: expandedPostId === posts[0]._id ? 700 : 400,
                }}
              >
                ✎ {posts[0].comments} RESPONSES
              </button>
              <Btn
                variant="ghost"
                style={{ marginLeft: "auto", fontSize: 8, padding: "4px 10px" }}
                onClick={() => {
                  api.getUser(posts[0].creatorId).then((u) => {
                    setSelectedCreator(u);
                    setPage("Profile");
                  });
                }}
              >
                PROFILE →
              </Btn>
            </div>

            {/* Collapsible comments/responses view */}
            <AnimatePresence>
              {expandedPostId === posts[0]._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    overflow: "hidden",
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: `1px solid ${C.rule}`,
                  }}
                >
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>
                    ◆ Dispatch Correspondence Responses
                  </div>
                  {loadingComments[posts[0]._id] ? (
                    <div className="italic-serif text-xs opacity-50 py-4">Transmitting archives...</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                      {(postComments[posts[0]._id] || []).map((c) => (
                        <div key={c._id} style={{ borderBottom: `1px dashed ${C.rule}`, paddingBottom: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <div className="byline" style={{ fontSize: 9, fontWeight: 700 }}>{c.name} · {c.role}</div>
                            <div className="byline" style={{ fontSize: 8, opacity: 0.6 }}>{c.time}</div>
                          </div>
                          <div className="italic-serif text-sm text-zinc-700">{c.text}</div>
                        </div>
                      ))}
                      {(postComments[posts[0]._id] || []).length === 0 && (
                        <div className="italic-serif text-xs opacity-40 py-4">No dispatches responded to this plate yet.</div>
                      )}
                    </div>
                  )}
                  {currentUser && (
                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                      <Field
                        value={commentInputs[posts[0]._id] || ""}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [posts[0]._id]: e.target.value })}
                        placeholder="Write a response to this dispatch..."
                        style={{ flex: 1, fontSize: 12 }}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(posts[0]._id)}
                      />
                      <Btn onClick={() => handleAddComment(posts[0]._id)} style={{ fontSize: 8, padding: "4px 12px" }}>
                        RESPOND →
                      </Btn>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div style={{ padding: "16px 0 16px 24px" }}>
            <div className="byline" style={{ marginBottom: 12 }}>
              OTHER DISPATCHES
            </div>
            {posts.slice(1, 6).map((p) => (
              <div
                key={p._id}
                style={{
                  marginBottom: 16,
                  paddingBottom: 16,
                  borderBottom: `1px solid ${C.rule}`,
                }}
              >
                <div className="headline-sm">
                  {p.name}: {p.text.split(" ").slice(0, 6).join(" ")}…
                </div>
                <Byline author={p.name} time={p.time} />
                <div style={{ display: "flex", gap: 12, marginTop: 4, alignItems: "center" }}>
                  <button
                    onClick={() => toggleLike(p._id)}
                    className="byline"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: likedIds.has(p._id) ? C.accent : C.inkFaint,
                    }}
                  >
                    {likedIds.has(p._id) ? "♥" : "♡"} {p.likes}
                  </button>
                  <button
                    onClick={() => toggleComments(p._id)}
                    className="byline"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: expandedPostId === p._id ? C.accent : C.inkFaint,
                    }}
                  >
                    ✎ {p.comments || 0} RESPONSES
                  </button>
                </div>

                <AnimatePresence>
                  {expandedPostId === p._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        overflow: "hidden",
                        marginTop: 10,
                        paddingTop: 8,
                        borderTop: `1px dashed ${C.rule}`,
                      }}
                    >
                      {loadingComments[p._id] ? (
                        <div className="italic-serif text-[10px] opacity-50 py-2">Transmitting...</div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
                          {(postComments[p._id] || []).map((c) => (
                            <div key={c._id} style={{ borderBottom: `1px dotted ${C.rule}`, paddingBottom: 6 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                <div className="byline" style={{ fontSize: 8, fontWeight: 700 }}>{c.name}</div>
                                <div className="byline" style={{ fontSize: 7, opacity: 0.6 }}>{c.time}</div>
                              </div>
                              <div className="italic-serif text-[11px] text-zinc-700">{c.text}</div>
                            </div>
                          ))}
                          {(postComments[p._id] || []).length === 0 && (
                            <div className="italic-serif text-[10px] opacity-40 py-2">No responses.</div>
                          )}
                        </div>
                      )}
                      {currentUser && (
                        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                          <Field
                            value={commentInputs[p._id] || ""}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [p._id]: e.target.value })}
                            placeholder="Write a response..."
                            style={{ flex: 1, fontSize: 11 }}
                            onKeyDown={(e) => e.key === "Enter" && handleAddComment(p._id)}
                          />
                          <Btn onClick={() => handleAddComment(p._id)} style={{ fontSize: 7, padding: "2px 8px" }}>
                            →
                          </Btn>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ExplorePage({
  setPage,
  setSelectedCreator,
  search,
  currentUser,
  onUpdate,
}: {
  setPage: (p: string) => void;
  setSelectedCreator: (c: any) => void;
  search: string;
  currentUser: User | null;
  onUpdate: (u: any) => void;
}) {
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [exploreTab, setExploreTab] = useState<"creators" | "recruiters">("creators");
  const [activeSkill, setActiveSkill] = useState("All");
  const [loading, setLoading] = useState(true);

  // Recruiter filters
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSize, setFilterSize] = useState("All");
  const [filterHiring, setFilterHiring] = useState("All");
  const [filterVerified, setFilterVerified] = useState(false);

  // Creator advanced filters
  const [filterTool, setFilterTool] = useState("All");
  const [filterExp, setFilterExp] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState("All");

  useEffect(() => {
    setLoading(true);
    api
      .getUsers()
      .then((d) => {
        setRawUsers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        setRawUsers(FB_CREATORS as any);
        setLoading(false);
      });
  }, []);

  const handleFollow = async (creatorId: string) => {
    if (!currentUser) return;
    try {
      const res = await api.followUser(creatorId);
      setRawUsers((prev) =>
        prev.map((u) => (u._id === creatorId ? { ...u, followers: res.followers } : u))
      );
      onUpdate({ ...currentUser, following: res.following });
    } catch (err) {
      console.error("Direct follow failed:", err);
    }
  };

  const filteredCreators = useMemo(() => {
    return rawUsers.filter((u) => {
      if (u.userType === "recruiter") return false;

      if (search) {
        const q = search.toLowerCase();
        const matchName = u.name?.toLowerCase().includes(q);
        const matchRole = u.role?.toLowerCase().includes(q);
        const matchBio = u.bio?.toLowerCase().includes(q);
        const matchSkills = u.skills?.some((s) => s.toLowerCase().includes(q));
        const matchSoftware = u.softwareList?.some((s) => s.name.toLowerCase().includes(q));
        if (!matchName && !matchRole && !matchBio && !matchSkills && !matchSoftware) return false;
      }

      if (activeSkill !== "All") {
        const matchRole = u.role?.toLowerCase().includes(activeSkill.toLowerCase());
        const matchSkills = u.skills?.some((s) => s.toLowerCase().includes(activeSkill.toLowerCase()));
        if (!matchRole && !matchSkills) return false;
      }

      if (filterTool !== "All") {
        const matchSoftware = u.softwareList?.some((s) => s.name.toLowerCase().includes(filterTool.toLowerCase()));
        if (!matchSoftware) return false;
      }

      if (filterExp !== "All") {
        const years = u.yearsOfExperience || 0;
        if (filterExp === "Junior" && years >= 3) return false;
        if (filterExp === "Mid" && (years < 3 || years >= 6)) return false;
        if (filterExp === "Senior" && years < 6) return false;
      }

      if (filterAvailability !== "All") {
        if (u.availabilityStatus !== filterAvailability) return false;
      }

      return true;
    });
  }, [rawUsers, search, activeSkill, filterTool, filterExp, filterAvailability]);

  const filteredRecruiters = useMemo(() => {
    return rawUsers.filter((u) => {
      if (u.userType !== "recruiter") return false;

      if (search) {
        const q = search.toLowerCase();
        const matchName = u.name?.toLowerCase().includes(q);
        const matchBio = u.bio?.toLowerCase().includes(q);
        const matchIndustry = u.industry?.toLowerCase().includes(q);
        if (!matchName && !matchBio && !matchIndustry) return false;
      }

      if (filterIndustry !== "All") {
        if (u.industry !== filterIndustry) return false;
      }

      if (filterLocation.trim()) {
        const locQ = filterLocation.toLowerCase().trim();
        if (!u.location?.toLowerCase().includes(locQ)) return false;
      }

      if (filterSize !== "All") {
        if (u.companySize !== filterSize) return false;
      }

      if (filterHiring !== "All") {
        const isHiringNow = u.hiringPreferences?.availability === "Hiring Now" || u.rate === "Hiring Now" || (u as any).availability === "Hiring Now";
        if (filterHiring === "Hiring Now" && !isHiringNow) return false;
        if (filterHiring === "Not Hiring" && isHiringNow) return false;
      }

      if (filterVerified && !u.verified) return false;

      return true;
    });
  }, [rawUsers, search, filterIndustry, filterLocation, filterSize, filterHiring, filterVerified]);

  if (loading)
    return (
      <div
        className="italic-serif"
        style={{ textAlign: "center", padding: 60, color: C.inkFaint }}
      >
        Consulting the registry…
      </div>
    );

  return (
    <div className="fade-in">
      {/* Switcher Tab Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginBottom: 32,
          borderBottom: `2px double ${C.rule}`,
          paddingBottom: 16,
        }}
      >
        <button
          onClick={() => setExploreTab("creators")}
          className="headline-md bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            color: exploreTab === "creators" ? C.accent : C.inkFaint,
            borderBottom: exploreTab === "creators" ? `2px solid ${C.accent}` : "none",
            paddingBottom: 4,
            fontSize: 16,
            letterSpacing: "0.05em"
          }}
        >
          ◆ CREATIVE ARTISANS
        </button>
        <button
          onClick={() => setExploreTab("recruiters")}
          className="headline-md bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            color: exploreTab === "recruiters" ? C.accent : C.inkFaint,
            borderBottom: exploreTab === "recruiters" ? `2px solid ${C.accent}` : "none",
            paddingBottom: 4,
            fontSize: 16,
            letterSpacing: "0.05em"
          }}
        >
          ◆ RECRUITING FIRMS
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        <HR thick />
        <div className="headline-xl" style={{ padding: "10px 0 4px" }}>
          {exploreTab === "creators" ? "TALENT REGISTRY" : "COMMERCE LEDGER"}
        </div>
        <div
          className="italic-serif"
          style={{ fontSize: 12, color: C.inkMid, marginBottom: 8 }}
        >
          {exploreTab === "creators"
            ? "A Complete Survey of All Creative Correspondents"
            : "A Comprehensive Directory of Registered Recruiting Entities"}
        </div>
        <HR thick />
      </div>

      {exploreTab === "creators" ? (
        <>
          {/* Creator Filters Panel */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              margin: "20px 0",
              padding: 16,
              background: C.surface,
              border: `1px solid ${C.rule}`,
            }}
          >
            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                SPECIALIZED SOFTWARE / TOOL
              </div>
              <select
                value={filterTool}
                onChange={(e) => setFilterTool(e.target.value)}
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              >
                <option value="All">ALL TOOLS</option>
                <option value="DaVinci Resolve">DAVINCI RESOLVE</option>
                <option value="Figma">FIGMA</option>
                <option value="Adobe Premiere Pro">PREMIERE PRO</option>
                <option value="Adobe Illustrator">ILLUSTRATOR</option>
                <option value="Adobe InDesign">INDESIGN</option>
                <option value="Photoshop">PHOTOSHOP</option>
              </select>
            </div>

            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                EXPERIENCE LEVEL
              </div>
              <select
                value={filterExp}
                onChange={(e) => setFilterExp(e.target.value)}
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              >
                <option value="All">ALL EXPERIENCE LEVELS</option>
                <option value="Junior">JUNIOR (&lt; 3 YEARS)</option>
                <option value="Mid">MID-LEVEL (3-6 YEARS)</option>
                <option value="Senior">SENIOR (6+ YEARS)</option>
              </select>
            </div>

            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                AVAILABILITY STATUS
              </div>
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              >
                <option value="All">ALL AVAILABILITIES</option>
                <option value="Available for Work">AVAILABLE FOR WORK</option>
                <option value="Open to Collaboration">OPEN TO COLLABORATION</option>
                <option value="Busy">BUSY</option>
                <option value="Not Available">NOT AVAILABLE</option>
              </select>
            </div>
          </div>

          {/* Creative categories */}
          <div
            style={{
              display: "flex",
              gap: 20,
              margin: "16px 0",
              overflowX: "auto",
              paddingBottom: 10,
              borderBottom: `1px solid ${C.rule}`,
            }}
          >
            {[
              "All",
              "Designer",
              "Video Editor",
              "Photographer",
              "UI/UX Designer",
            ].map((s) => (
              <button
                key={s}
                onClick={() => setActiveSkill(s)}
                className={`nav-btn${activeSkill === s ? " active" : ""}`}
                style={{ padding: "4px 0", fontSize: 9 }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Creatives List */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {filteredCreators.map((c) => (
              <Card key={c._id} style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <Ink name={c.name} src={c.profilePic} size={48} />
                  <div>
                    <div className="headline-sm">{c.name}</div>
                    <div className="byline">{c.role}</div>
                  </div>
                </div>
                <p
                  className="body-copy"
                  style={{ fontStyle: "italic", fontSize: 12, marginBottom: 16 }}
                >
                  "{c.bio}"
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    borderTop: `1px solid ${C.rule}`,
                    paddingTop: 12,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 8 }}>
                      FOLLOWERS
                    </div>
                    <div className="headline-sm">{c.followers}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 8 }}>
                      PLATES
                    </div>
                    <div className="headline-sm">{c.projects}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 8 }}>
                      RATE
                    </div>
                    <div className="headline-sm" style={{ fontSize: 10 }}>
                      {c.rate}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <Btn
                    fullWidth
                    variant="ghost"
                    style={{ fontSize: 9 }}
                    onClick={() => {
                      setSelectedCreator(c);
                      setPage("Profile");
                    }}
                  >
                    Examine Dossier →
                  </Btn>
                  {currentUser && currentUser._id !== c._id && (
                    <Btn
                      fullWidth
                      variant={currentUser.following?.includes(c._id) ? "ghost" : "primary"}
                      style={{ fontSize: 9 }}
                      onClick={() => handleFollow(c._id)}
                    >
                      {currentUser.following?.includes(c._id) ? "Unfollow" : "Follow"}
                    </Btn>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Recruiter Filters Panel */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              margin: "20px 0",
              padding: 16,
              background: C.surface,
              border: `1px solid ${C.rule}`,
            }}
          >
            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                INDUSTRY SPECIFICATION
              </div>
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              >
                <option value="All">ALL INDUSTRIES</option>
                <option value="Creative Agency">CREATIVE AGENCY</option>
                <option value="Game Studio">GAME STUDIO</option>
                <option value="Tech Firm">TECH FIRM</option>
                <option value="Film Production">FILM PRODUCTION</option>
              </select>
            </div>

            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                COMPANY SIZE
              </div>
              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              >
                <option value="All">ALL SIZES</option>
                <option value="1-10 Employees">1-10 EMPLOYEES</option>
                <option value="10-50 Employees">10-50 EMPLOYEES</option>
                <option value="50-100 Employees">50-100 EMPLOYEES</option>
                <option value="100+ Employees">100+ EMPLOYEES</option>
              </select>
            </div>

            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                HIRING STATUS
              </div>
              <select
                value={filterHiring}
                onChange={(e) => setFilterHiring(e.target.value)}
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              >
                <option value="All">ALL AVAILABILITIES</option>
                <option value="Hiring Now">HIRING NOW</option>
                <option value="Not Hiring">NOT HIRING</option>
              </select>
            </div>

            <div>
              <div className="byline" style={{ fontSize: 7, marginBottom: 4 }}>
                SEARCH LOCATION
              </div>
              <input
                type="text"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                placeholder="e.g. Hyderabad"
                className="mono bg-transparent border-b border-rule p-1 text-[10px]"
                style={{ color: C.ink, width: "100%", outline: "none", fontStyle: "italic" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingSelf: "center", paddingTop: 14 }}>
              <input
                type="checkbox"
                id="filterVerified"
                checked={filterVerified}
                onChange={(e) => setFilterVerified(e.target.checked)}
                style={{ cursor: "pointer", accentColor: C.accent }}
              />
              <label htmlFor="filterVerified" className="byline" style={{ fontSize: 7, cursor: "pointer" }}>
                VERIFIED FIRMS ONLY
              </label>
            </div>
          </div>

          {/* Recruiters List */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {filteredRecruiters.map((r) => (
              <Card key={r._id} style={{ padding: 0, overflow: "hidden" }} className="hover:shadow-md transition-shadow">
                {/* Banner representation */}
                <div style={{ height: 90, borderBottom: `1px solid ${C.rule}`, position: "relative", overflow: "hidden", background: C.accentBg }}>
                  {r.companyBanner ? (
                    (() => {
                      const isVideo = r.companyBanner.startsWith("data:video/") || r.companyBanner.endsWith(".mp4") || r.companyBanner.endsWith(".webm");
                      if (isVideo) {
                        return <video src={r.companyBanner} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
                      }
                      return <img src={r.companyBanner} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
                    })()
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="byline" style={{ opacity: 0.15 }}>ARTWITHIN LEDGER</span>
                    </div>
                  )}
                </div>

                {/* Profile Pic Signage */}
                <div style={{ display: "flex", gap: 14, padding: "16px 16px 12px", marginTop: -32, position: "relative", zIndex: 10 }}>
                  <Ink
                    name={r.name}
                    src={r.companyLogo}
                    size={52}
                    style={{ border: `3px solid ${C.paper}`, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", background: C.white }}
                  />
                  <div style={{ marginTop: 24 }}>
                    <div className="headline-sm" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {r.name}
                      {r.verified && <span style={{ color: C.success, fontSize: 12, fontWeight: 700 }} title="Verified Agency">✓</span>}
                    </div>
                    <div className="byline" style={{ fontSize: 8 }}>{r.industry} // {r.companySize}</div>
                  </div>
                </div>

                {/* Short bio */}
                <div style={{ padding: "0 16px 12px" }}>
                  <p className="body-copy text-[12px] italic-serif leading-relaxed text-zinc-600 line-clamp-2">
                    "{r.bio || "Registered seeking-talent ledger profile."}"
                  </p>
                </div>

                {/* Metrics Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    borderTop: `1px solid ${C.rule}`,
                    borderBottom: `1px solid ${C.rule}`,
                    padding: "10px 0",
                    margin: "0 16px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 7 }}>
                      TRUST SCORE
                    </div>
                    <div className="headline-sm" style={{ fontSize: 13, color: C.accent }}>
                      {r.hiringTrust?.trustScore || 90}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 7 }}>
                      JOBS FILED
                    </div>
                    <div className="headline-sm" style={{ fontSize: 13 }}>
                      {r.opportunities?.length || 0}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 7 }}>
                      LOCATION
                    </div>
                    <div className="headline-sm" style={{ fontSize: 9 }} title={r.location}>
                      {r.location?.split(",")[0] || "Redacted"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12, padding: 16 }}>
                  <Btn
                    fullWidth
                    variant="ghost"
                    style={{ fontSize: 9 }}
                    onClick={() => {
                      setSelectedCreator(r);
                      setPage("Profile");
                    }}
                  >
                    Examine Firm →
                  </Btn>
                  {currentUser && currentUser._id !== r._id && (
                    <Btn
                      fullWidth
                      variant={currentUser.following?.includes(r._id) ? "ghost" : "primary"}
                      style={{ fontSize: 9 }}
                      onClick={() => handleFollow(r._id)}
                    >
                      {currentUser.following?.includes(r._id) ? "Unfollow" : "Follow"}
                    </Btn>
                  )}
                </div>
              </Card>
            ))}
            {filteredRecruiters.length === 0 && (
              <div className="col-span-3 text-center italic-serif py-16 text-zinc-400">
                No recruiting firms matched your specific filter metrics.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MessagesPage({
  activeConvoId,
  setActiveConvoId,
  incomingMsg,
  setIncomingMsg,
  currentUser,
  wrapApi,
}: {
  activeConvoId: string;
  setActiveConvoId: (id: string) => void;
  incomingMsg: any;
  setIncomingMsg: (m: any) => void;
  currentUser: User | null;
  wrapApi?: <T>(fn: () => Promise<T>) => Promise<T>;
}) {
  const [convos, setConvos] = useState<Convo[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const sortedConvos = useMemo(() => {
    return [...convos].sort((a, b) => {
      const aTime = a.msgs && a.msgs.length > 0 ? new Date(a.msgs[a.msgs.length - 1].time || 0).getTime() : 0;
      const bTime = b.msgs && b.msgs.length > 0 ? new Date(b.msgs[b.msgs.length - 1].time || 0).getTime() : 0;
      return bTime - aTime;
    });
  }, [convos]);

  const [allCreators, setAllCreators] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    api.getUsers().then((users) => {
      const others = users.filter((u) => u._id !== currentUser?._id);
      setAllCreators(others);
    });
  }, [currentUser]);

  useEffect(() => {
    api.getConvos().then((d) => {
      setConvos(d);
      if (!activeConvoId && d.length) setActiveConvoId(d[0]._id);
    });
  }, []);

  useEffect(() => {
    if (incomingMsg) {
      setConvos((prev) =>
        prev.map((c) =>
          c._id === incomingMsg.conversationId
            ? { ...c, msgs: [...c.msgs, incomingMsg.msg] }
            : c,
        ),
      );
      setIncomingMsg(null);
    }
  }, [incomingMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convos]);

  const active = convos.find((c) => c._id === activeConvoId);

  const send = async () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setInput("");
    setConvos((prev) =>
      prev.map((c) =>
        c._id === activeConvoId
          ? {
              ...c,
              msgs: [...c.msgs, { from: currentUser?._id || "me", text: txt, time: new Date().toISOString() }],
            }
          : c
      )
    );
    // Bypassed wrapApi to prevent blocking loading overlay during active chat
    await api.sendMessage({ conversationId: activeConvoId, text: txt });
  };

  return (
    <div
      className="fade-in"
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        height: 600,
        border: `1px solid ${C.rule}`,
      }}
    >
      <div
        style={{
          borderRight: `1px solid ${C.rule}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 12,
            borderBottom: `1px solid ${C.rule}`,
            background: C.surface,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="byline" style={{ fontWeight: 700 }}>
              Correspondence
            </span>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                background: C.ink,
                color: C.paper,
                border: "none",
                fontSize: 8,
                padding: "2px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {showDropdown ? "CLOSE ×" : "+ START CHAT"}
            </button>
          </div>

          {showDropdown && (
            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                maxHeight: 180,
                overflowY: "auto",
                padding: 2,
                border: `1px solid ${C.rule}`,
                background: C.white,
              }}
            >
              {allCreators.map((c) => (
                <button
                  key={c._id}
                  onClick={async () => {
                    setShowDropdown(false);
                    try {
                      const convo = await api.startConversation(c._id);
                      const updatedConvos = await api.getConvos();
                      setConvos(updatedConvos);
                      setActiveConvoId(convo._id);
                    } catch (e) {
                      console.error("Failed to start thread", e);
                    }
                  }}
                  className="byline text-left hover:bg-zinc-100"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "6px 8px",
                    cursor: "pointer",
                    fontSize: 8,
                    width: "100%",
                    borderBottom: `1px dotted ${C.rule}`,
                  }}
                >
                  ◆ {c.name.toUpperCase()} · {c.role}
                </button>
              ))}
              {allCreators.length === 0 && (
                <div className="italic-serif text-[10px] opacity-40 p-2 text-center">
                  No correspondents online.
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {sortedConvos.map((c) => (
            <div
              key={c._id}
              onClick={() => setActiveConvoId(c._id)}
              style={{
                padding: 16,
                cursor: "pointer",
                background:
                  activeConvoId === c._id ? C.accentBg : "transparent",
                borderBottom: `1px solid ${C.rule}`,
              }}
            >
              <div className="headline-sm" style={{ fontSize: 13 }}>
                {c.name}
              </div>
              <div className="byline" style={{ fontSize: 8 }}>
                Latest Message Attached
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: 16,
            borderBottom: `1px solid ${C.rule}`,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Ink name={active?.name || "?"} size={30} />
          <div className="headline-sm">
            {active?.name || "Select dispatch thread"}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {active?.msgs.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf:
                  m.from === currentUser?._id ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              <div
                style={{
                  padding: "10px 16px",
                  background: m.from === currentUser?._id ? C.ink : C.white,
                  color: m.from === currentUser?._id ? C.white : C.ink,
                  border: `1px solid ${C.rule}`,
                  fontFamily: "'Spectral',serif",
                  fontStyle: "italic",
                  fontSize: 14,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
        <div
          style={{
            padding: 16,
            borderTop: `1px solid ${C.rule}`,
            display: "flex",
            gap: 12,
          }}
        >
          <Field
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type dispatch…"
            style={{ flex: 1 }}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Btn onClick={send}>Send →</Btn>
        </div>
      </div>
    </div>
  );
}
function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const s = await api.getDashboardStats();
      setStats(s);
      const notifs = await api.getNotifs();
      const hireProposals = notifs.filter((n: any) => n.type === "hire");
      setProposals(hireProposals);
    } catch (e) {
      console.error("Failed to load dashboard data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleProposalAction = async (id: string, response: string) => {
    try {
      await api.respondNotif(id, response);
      fetchDashboardData();
    } catch (e) {
      console.error("Action failed", e);
    }
  };

  if (loading)
    return (
      <div className="italic-serif text-center py-20 opacity-40">
        Compiling financial ledgers...
      </div>
    );

  const ITEMS = [
    ["Profile Reach", stats?.reach || "0", "+12%"],
    ["Engagements", stats?.engagements || "0", "+4%"],
    ["Portfolio Items", stats?.portfolioCount || "0", "Updated"],
    ["Followers", stats?.followers || "0", "+2%"],
  ];

  return (
    <div className="fade-in">
      <div
        className="headline-xl"
        style={{ textAlign: "center", marginBottom: 32 }}
      >
        QUARTERLY EARNINGS REPORT
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {ITEMS.map(([l, v, t]) => (
          <Card key={l} style={{ padding: 20, textAlign: "center" }}>
            <div className="byline" style={{ fontSize: 8 }}>
              {l}
            </div>
            <div className="headline-lg">{v}</div>
            <div
              className="italic-serif"
              style={{ fontSize: 10, color: C.success }}
            >
              {t} Movement
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Tag red>Official Engagement Ledger</Tag>
          <h2 className="headline-md" style={{ marginTop: 8 }}>
            SERVICE PROPOSALS & CONTRACTS
          </h2>
          <HR style={{ width: 60, margin: "12px auto" }} />
        </div>

        <Card style={{ padding: 24 }}>
          {proposals.length === 0 ? (
            <div className="italic-serif text-center py-10 opacity-50 text-sm">
              No active hiring assignments or service proposals filed at this hour.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {proposals.map((p) => (
                <div
                  key={p._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px dashed ${C.rule}`,
                    paddingBottom: 16,
                  }}
                >
                  <div style={{ flex: 1, paddingRight: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span className="byline" style={{ fontSize: 8, color: C.accent }}>💼 {p.type.toUpperCase()}</span>
                      <span className="byline" style={{ fontSize: 8, opacity: 0.6 }}>· {p.time}</span>
                    </div>
                    <div className="headline-sm" style={{ fontSize: 15, marginBottom: 4 }}>
                      {p.title}
                    </div>
                    <div className="italic-serif text-xs text-zinc-600">{p.detail}</div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {!p.responded ? (
                      <>
                        <Btn
                          variant="success"
                          onClick={() => handleProposalAction(p._id, "accepted")}
                          style={{ fontSize: 8, padding: "6px 12px" }}
                        >
                          ACCEPT
                        </Btn>
                        <Btn
                          variant="danger"
                          onClick={() => handleProposalAction(p._id, "declined")}
                          style={{ fontSize: 8, padding: "6px 12px" }}
                        >
                          DECLINE
                        </Btn>
                      </>
                    ) : (
                      <span
                        className="byline"
                        style={{
                          fontSize: 9,
                          color: p.responded === "accepted" ? C.success : C.accent,
                          fontWeight: 750,
                          border: `1px solid ${p.responded === "accepted" ? C.success : C.accent}`,
                          padding: "4px 10px",
                        }}
                      >
                        ◆ PROTOCOL {p.responded.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function RecruiterProfilePage({
  profile,
  currentUser,
  setPage,
  setActiveConvoId,
  onUpdate,
  wrapApi,
  onLightbox,
}: {
  profile: Creator;
  currentUser: User | null;
  setPage: (p: string) => void;
  setActiveConvoId: (id: string) => void;
  onUpdate?: (u: any) => void;
  wrapApi?: <T>(fn: () => Promise<T>) => Promise<T>;
  onLightbox?: (url: string, type: "image" | "video") => void;
}) {
  const [rec, setRec] = useState<Creator>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"dossier" | "opportunities" | "trust">("dossier");
  
  // Edit Profile States
  const [editName, setEditName] = useState(profile.name || "");
  const [editLocation, setEditLocation] = useState(profile.location || "");
  const [editIndustry, setEditIndustry] = useState(profile.industry || "");
  const [editCompanySize, setEditCompanySize] = useState(profile.companySize || "50-100 Employees");
  const [editFoundedYear, setEditFoundedYear] = useState(String(profile.foundedYear || 2018));
  const [editWebsite, setEditWebsite] = useState(profile.website || "");
  const [editBio, setEditBio] = useState(profile.bio || "");
  const [editMission, setEditMission] = useState(profile.missionStatement || "");
  const [editServices, setEditServices] = useState(profile.servicesOffered?.join(", ") || "");
  const [editLogo, setEditLogo] = useState(profile.companyLogo || "");
  const [editBanner, setEditBanner] = useState(profile.companyBanner || "");
  const [saving, setSaving] = useState(false);

  // Sync state
  useEffect(() => {
    setRec(profile);
    setEditName(profile.name || "");
    setEditLocation(profile.location || "");
    setEditIndustry(profile.industry || "");
    setEditCompanySize(profile.companySize || "50-100 Employees");
    setEditFoundedYear(String(profile.foundedYear || 2018));
    setEditWebsite(profile.website || "");
    setEditBio(profile.bio || "");
    setEditMission(profile.missionStatement || "");
    setEditServices(profile.servicesOffered?.join(", ") || "");
    setEditLogo(profile.companyLogo || "");
    setEditBanner(profile.companyBanner || "");
  }, [profile]);

  const isMe = currentUser?._id === rec._id;

  // Follow states
  const [following, setFollowing] = useState(currentUser?.following?.includes(rec._id) || false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFollowing(currentUser.following?.includes(rec._id) || false);
    }
  }, [currentUser, rec._id]);

  const handleFollow = async () => {
    if (!currentUser) return;
    setFollowLoading(true);
    try {
      const res = await api.followUser(rec._id);
      setFollowing(!following);
      setRec(prev => ({ ...prev, followers: res.followers }));
      onUpdate?.({ ...currentUser, following: res.following });
    } catch (err) {
      console.error("Follow failed:", err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleMsg = async () => {
    const convo = await (wrapApi
      ? wrapApi(() => api.startConversation(rec._id))
      : api.startConversation(rec._id));
    setActiveConvoId(convo._id);
    setPage("Messages");
  };

  // Opportunity Creation Form States
  const [showAddOp, setShowAddOp] = useState(false);
  const [newOpTitle, setNewOpTitle] = useState("");
  const [newOpDesc, setNewOpDesc] = useState("");
  const [newOpSkills, setNewOpSkills] = useState("");
  const [newOpBudget, setNewOpBudget] = useState("");
  const [newOpMode, setNewOpMode] = useState("Remote");
  const [newOpExp, setNewOpExp] = useState("Intermediate");
  const [newOpDeadline, setNewOpDeadline] = useState("");
  const [submittingOp, setSubmittingOp] = useState(false);

  const handleCreateOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpTitle || !newOpDesc || !newOpBudget) return;
    setSubmittingOp(true);
    try {
      const skillsArr = newOpSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const newOp = {
        id: "op-" + Date.now(),
        title: newOpTitle,
        description: newOpDesc,
        requiredSkills: skillsArr,
        budget: newOpBudget,
        workMode: newOpMode,
        experienceLevel: newOpExp,
        deadline: newOpDeadline || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        applicants: []
      };

      const updatedOps = [...(rec.opportunities || []), newOp];
      const updated = await api.updateMe({
        opportunities: updatedOps
      });
      setRec(updated);
      onUpdate?.(updated);
      setShowAddOp(false);
      setNewOpTitle("");
      setNewOpDesc("");
      setNewOpSkills("");
      setNewOpBudget("");
      setNewOpMode("Remote");
      setNewOpExp("Intermediate");
      setNewOpDeadline("");
    } catch (err) {
      console.error("Failed to create opportunity", err);
      alert("Failed to add opportunity.");
    } finally {
      setSubmittingOp(false);
    }
  };

  // Job Application States
  const [applyingOpId, setApplyingOpId] = useState<string | null>(null);

  const handleApply = async (opId: string) => {
    if (!currentUser) {
      alert("Please login to apply.");
      return;
    }
    setApplyingOpId(opId);
    try {
      const res = await api.applyOpportunity(rec._id, opId);
      alert("Application received. Your creative credentials have been sent to their pending ledger!");
      const updatedOps = rec.opportunities?.map(op => op.id === opId ? res.opportunity : op) || [];
      setRec(prev => ({ ...prev, opportunities: updatedOps }));
    } catch (err) {
      console.error("Apply failed", err);
      alert("Failed to apply for this opportunity.");
    } finally {
      setApplyingOpId(null);
    }
  };

  // Portfolio Showcase Campaign States
  const [showAddSc, setShowAddSc] = useState(false);
  const [newScTitle, setNewScTitle] = useState("");
  const [newScDesc, setNewScDesc] = useState("");
  const [newScResults, setNewScResults] = useState("");
  const [newScCover, setNewScCover] = useState("");
  const [submittingSc, setSubmittingSc] = useState(false);
  const scFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateShowcase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScTitle || !newScDesc || !newScCover) return;
    setSubmittingSc(true);
    try {
      const newSc = {
        id: "sc-" + Date.now(),
        title: newScTitle,
        description: newScDesc,
        coverImage: newScCover,
        results: newScResults || "Metric Pending"
      };

      const updatedSc = [...(rec.portfolioShowcase || []), newSc];
      const updated = await api.updateMe({
        portfolioShowcase: updatedSc
      });
      setRec(updated);
      onUpdate?.(updated);

      // Auto-post new campaign showcase to home feed
      try {
        await api.createPost({
          text: `Added a new campaign showcase: "${newScTitle}" - ${newScDesc}. Results: ${newScResults || "Metric Pending"}`,
          cat: "Showcase",
          mediaUrl: newScCover,
          mediaType: "image"
        });
      } catch (postErr) {
        console.error("Auto-posting campaign showcase failed:", postErr);
      }

      setShowAddSc(false);
      setNewScTitle("");
      setNewScDesc("");
      setNewScResults("");
      setNewScCover("");
    } catch (err) {
      console.error("Failed to add showcase item", err);
      alert("Failed to add campaign showcase.");
    } finally {
      setSubmittingSc(false);
    }
  };

  const onScCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setNewScCover(compressed);
    };
    reader.readAsDataURL(file);
  };

  // Review Form States
  const [showAddRev, setShowAddRev] = useState(false);
  const [newRevRating, setNewRevRating] = useState(5);
  const [newRevText, setNewRevText] = useState("");
  const [newRevProject, setNewRevProject] = useState("");
  const [submittingRev, setSubmittingRev] = useState(false);

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRevText) return;
    setSubmittingRev(true);
    try {
      const res = await api.submitReview(rec._id, {
        rating: newRevRating,
        reviewText: newRevText,
        projectName: newRevProject || "Bespoke Assignment"
      });
      alert("Your rated review has been successfully indexed in the recruiter's ledger!");
      setRec(prev => ({
        ...prev,
        reviews: res.reviews,
        hiringTrust: res.hiringTrust
      }));
      setShowAddRev(false);
      setNewRevText("");
      setNewRevProject("");
      setNewRevRating(5);
    } catch (err) {
      console.error("Failed to submit review", err);
      alert("Failed to submit review.");
    } finally {
      setSubmittingRev(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const servicesArr = editServices
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const updated = await api.updateMe({
        name: editName,
        location: editLocation,
        industry: editIndustry,
        companySize: editCompanySize,
        foundedYear: parseInt(editFoundedYear) || 2018,
        website: editWebsite,
        bio: editBio,
        missionStatement: editMission,
        servicesOffered: servicesArr,
        companyLogo: editLogo,
        companyBanner: editBanner,
      });
      setRec(updated);
      onUpdate?.(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Save profile failed", err);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setEditLogo(compressed);
    };
    reader.readAsDataURL(file);
  };

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setEditBanner(compressed);
    };
    reader.readAsDataURL(file);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        style={{
          display: "inline-block",
          marginRight: 2,
          fill: i < rating ? C.accent : "none",
          color: i < rating ? C.accent : C.rule
        }}
      />
    ));
  };

  const averageRating = useMemo(() => {
    if (!rec.reviews || rec.reviews.length === 0) return 5;
    const total = rec.reviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((total / rec.reviews.length).toFixed(1));
  }, [rec.reviews]);

  return (
    <div className="fade-in max-w-4xl mx-auto paper-grain" style={{ background: C.paper, padding: "20px 0" }}>
      {/* Recruiter Hero & Cover Banner with Double border framing */}
      <div style={{
        height: 240,
        border: `4px double ${C.ink}`,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        padding: 16,
        overflow: "hidden",
        background: C.accentBg
      }}>
        {/* Render Banner Asset (Image or Video) */}
        {(() => {
          const bannerUrl = isEditing ? editBanner : rec.companyBanner;
          if (!bannerUrl) return null;
          const isVideo = bannerUrl.startsWith("data:video/") || bannerUrl.endsWith(".mp4") || bannerUrl.endsWith(".webm");
          if (isVideo) {
            return (
              <video
                src={bannerUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0
                }}
              />
            );
          }
          return (
            <img
              src={bannerUrl}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0
              }}
            />
          );
        })()}
        {isEditing && (
          <button
            onClick={() => bannerInputRef.current?.click()}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: C.ink,
              color: C.white,
              border: "none",
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              cursor: "pointer",
              fontWeight: 600,
              zIndex: 10
            }}
          >
            SELECT BANNER ASSET
          </button>
        )}
        <input type="file" ref={bannerInputRef} hidden accept="image/*,video/*" onChange={onBannerChange} />

        {/* Floating circular Logo pic */}
        <div style={{
          position: "absolute",
          bottom: -50,
          left: 24,
          zIndex: 50,
          background: C.white,
          border: `3px solid ${C.paper}`,
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
          display: "inline-block"
        }}>
          <Ink
            name={rec.name}
            src={isEditing ? editLogo : rec.companyLogo}
            size={100}
          />
          {isEditing && (
            <button
              onClick={() => logoInputRef.current?.click()}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                background: C.ink,
                color: C.white,
                border: "none",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={14} />
            </button>
          )}
          <input type="file" ref={logoInputRef} hidden accept="image/*" onChange={onLogoChange} />
        </div>
      </div>

      {/* Main Recruiter Header Actions and Information */}
      <div style={{ paddingLeft: 140, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, marginRight: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h1 className="headline-lg" style={{ fontSize: 32 }}>
              {isEditing ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 26, width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, outline: "none", color: C.ink }}
                  placeholder="PixelForge Studios"
                />
              ) : (
                rec.name.toUpperCase()
              )}
            </h1>
            {rec.verified && <span style={{ color: C.success, fontSize: 22, fontWeight: 700 }} title="Verified Recruiting Entity">✓</span>}
            
            {!isEditing && (
              <span style={{
                fontSize: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                background: rec.hiringPreferences?.availability === "Hiring Now" ? C.accentBg : "rgba(0,0,0,0.05)",
                color: rec.hiringPreferences?.availability === "Hiring Now" ? C.accent : C.inkFaint,
                border: `1px solid ${rec.hiringPreferences?.availability === "Hiring Now" ? C.accent : C.rule}`,
                padding: "2px 8px",
                borderRadius: 12
              }}>
                ◆ HIRING: {rec.hiringPreferences?.availability?.toUpperCase() || "HIRING NOW"}
              </span>
            )}
          </div>
          <div className="byline" style={{ display: "flex", alignItems: "center", gap: 12, color: C.accent, marginTop: 6, flexWrap: "wrap" }}>
            <span>
              {isEditing ? (
                <input
                  value={editIndustry}
                  onChange={(e) => setEditIndustry(e.target.value)}
                  style={{ fontSize: 10, width: 150, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, outline: "none", color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}
                  placeholder="Creative Agency"
                />
              ) : (
                rec.industry?.toUpperCase() || "RECRUITING FIRM"
              )}
            </span>
            <span>//</span>
            <span className="mono" style={{ fontSize: 9, color: C.inkFaint }}>
              FOUNDED: {isEditing ? (
                <input
                  type="number"
                  value={editFoundedYear}
                  onChange={(e) => setEditFoundedYear(e.target.value)}
                  style={{ fontSize: 9, width: 60, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}
                />
              ) : (
                rec.foundedYear || 2018
              )}
            </span>
            <span>//</span>
            <span className="mono" style={{ fontSize: 9, color: C.inkMid }}>
              {isEditing ? (
                <input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  style={{ fontSize: 9, width: 120, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, outline: "none", color: C.inkMid }}
                  placeholder="Hyderabad, India"
                />
              ) : (
                rec.location || "Location Unknown"
              )}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          {isMe ? (
            <div style={{ display: "flex", gap: 8 }}>
              {isEditing ? (
                <>
                  <Btn 
                    onClick={handleSaveProfile} 
                    disabled={saving || (isEditing && (editBio.length < 500 || editBio.length > 1000))}
                  >
                    {saving ? "SAVING..." : "SAVE DOSSIER"}
                  </Btn>
                  <Btn variant="ghost" onClick={() => setIsEditing(false)}>
                    CANCEL
                  </Btn>
                </>
              ) : (
                <Btn variant="ghost" onClick={() => setIsEditing(true)}>
                  REVISE DOSSIER →
                </Btn>
              )}
            </div>
          ) : (
            <>
              {currentUser && (
                <Btn variant={following ? "ghost" : "primary"} onClick={handleFollow} disabled={followLoading} style={{ fontSize: 9, padding: "8px 14px" }}>
                  {following ? "UNFOLLOW FIRM" : "FOLLOW FIRM"}
                </Btn>
              )}
              <Btn variant="ghost" onClick={handleMsg} style={{ fontSize: 9, padding: "8px 14px" }}>
                CHAT WIRE
              </Btn>
            </>
          )}
        </div>
      </div>

      {/* Recruiter corporate metadata switcher */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
        marginTop: 36,
        marginBottom: 24,
        borderBottom: `2px double ${C.rule}`,
        paddingBottom: 12,
        flexWrap: "wrap"
      }}>
        {[
          { key: "dossier", label: "◆ CORPORATE DOSSIER & SHOWCASE" },
          { key: "opportunities", label: "◆ OPPORTUNITIES BOARD" },
          { key: "trust", label: "◆ HIRING TRUST & REVIEWS" }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className="headline-md bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              color: activeTab === t.key ? C.accent : C.inkFaint,
              borderBottom: activeTab === t.key ? `2px solid ${C.accent}` : "none",
              paddingBottom: 4,
              fontSize: 14,
              letterSpacing: "0.06em",
              fontWeight: 700
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SPREAD CONTENT PANELS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* TAB 1: CORPORATE DOSSIER & SHOWCASE */}
          {activeTab === "dossier" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column (2 cols): Bio, Mission, Case Studies & Collaborations */}
              <div className="md:col-span-2">
                <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ CORPORATE PROFILE</div>
                
                {isEditing ? (
                  <div style={{ marginBottom: 20 }}>
                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>MISSION CREDO</label>
                    <input
                      value={editMission}
                      onChange={(e) => setEditMission(e.target.value)}
                      style={{ width: "100%", padding: 6, fontStyle: "italic", border: `1px solid ${C.rule}`, background: "transparent", fontSize: 13, marginBottom: 12 }}
                      placeholder="e.g. To forge unforgettable visual narratives..."
                    />

                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>SERVICES & COMPLIANCES (COMMA SEPARATED)</label>
                    <input
                      value={editServices}
                      onChange={(e) => setEditServices(e.target.value)}
                      style={{ width: "100%", padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 13, marginBottom: 12 }}
                      placeholder="Video Production, Luxury Branding"
                    />

                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>CORPORATE DESCRIPTION (500-1000 CHARACTERS REQUIRED)</label>
                    <textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      style={{ width: "100%", height: 160, padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 14, resize: "none", marginBottom: 6 }}
                      placeholder="PixelForge Studios is a premier multi-disciplinary creative agency specializing in cinematic video productions..."
                    />
                    
                    {/* Character limit validators and count display */}
                    {editBio.length < 500 || editBio.length > 1000 ? (
                      <div style={{ color: C.accent, fontSize: 8, fontWeight: 700 }} className="byline">
                        ⚠️ Description must be between 500 and 1000 characters (Currently: {editBio.length} chars)
                      </div>
                    ) : (
                      <div style={{ color: C.success, fontSize: 8, fontWeight: 700 }} className="byline">
                        ✓ Character count optimal ({editBio.length} characters)
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ marginBottom: 28 }}>
                    {rec.missionStatement && (
                      <div className="pull-quote" style={{ marginTop: 0, marginBottom: 16 }}>
                        "{rec.missionStatement}"
                      </div>
                    )}
                    <p className="body-copy drop-cap" style={{ fontSize: 16, lineHeight: 1.6 }}>
                      {rec.bio || "Seeking creative talent for ongoing campaigns."}
                    </p>
                  </div>
                )}

                {/* Services badge cloud */}
                {!isEditing && rec.servicesOffered && rec.servicesOffered.length > 0 && (
                  <div style={{ marginBottom: 28 }}>
                    <div className="byline" style={{ marginBottom: 8, color: C.accent }}>◆ COMPLIANCES & CORE SERVICES</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {rec.servicesOffered.map((s, idx) => (
                        <span key={idx} style={{
                          fontSize: 9,
                          fontFamily: "'JetBrains Mono', monospace",
                          background: C.accentBg,
                          color: C.accent,
                          border: `1px solid ${C.rule}`,
                          padding: "4px 10px"
                        }}>
                          ◆ {s.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Showcase Grid */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div className="byline" style={{ color: C.accent }}>◆ BRAND CAMPAIGNS & CASE STUDIES</div>
                    {isMe && !showAddSc && (
                      <button onClick={() => setShowAddSc(true)} className="byline" style={{ background: "none", border: "none", color: C.ink, cursor: "pointer", textDecoration: "underline", fontSize: 8 }}>
                        + FILE SHOWCASE
                      </button>
                    )}
                  </div>

                  {showAddSc && (
                    <Card style={{ padding: 16, marginBottom: 20, border: `2px dashed ${C.rule}` }}>
                      <form onSubmit={handleCreateShowcase}>
                        <div className="byline" style={{ color: C.accent, marginBottom: 12 }}>◆ FILE NEW CAMPAIGN SHOWCASE</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
                          <div>
                            <label className="byline" style={{ fontSize: 7 }}>CAMPAIGN TITLE</label>
                            <Field value={newScTitle} onChange={(e) => setNewScTitle(e.target.value)} placeholder="Summer Brand Campaign" />
                          </div>
                          <div>
                            <label className="byline" style={{ fontSize: 7 }}>METRICS / RESULTS</label>
                            <Field value={newScResults} onChange={(e) => setNewScResults(e.target.value)} placeholder="2M Views · 35% Engagement" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                          <div>
                            <label className="byline" style={{ fontSize: 7, display: "block", marginBottom: 4 }}>COVER IMAGE FILE</label>
                            <Btn variant="ghost" style={{ width: "100%", fontSize: 8 }} onClick={() => scFileInputRef.current?.click()}>
                              {newScCover ? "CHANGE COVER IMAGE" : "SELECT IMAGE FILE"}
                            </Btn>
                            <input type="file" ref={scFileInputRef} hidden accept="image/*" onChange={onScCoverChange} />
                          </div>
                          {newScCover && (
                            <div style={{ height: 48, display: "flex", justifyContent: "center", alignItems: "center", background: C.white, border: `1px solid ${C.rule}` }}>
                              <img src={newScCover} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                            </div>
                          )}
                        </div>

                        <div style={{ marginBottom: 14 }}>
                          <label className="byline" style={{ fontSize: 7 }}>CAMPAIGN SCOPE DETAILS</label>
                          <Field multiline rows={2} value={newScDesc} onChange={(e) => setNewScDesc(e.target.value)} placeholder="Summarize deliverables..." />
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                          <Btn onClick={(e) => handleCreateShowcase(e as any)} disabled={submittingSc}>
                            FILE SHOWCASE
                          </Btn>
                          <Btn variant="ghost" onClick={() => setShowAddSc(false)}>CANCEL</Btn>
                        </div>
                      </form>
                    </Card>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {rec.portfolioShowcase && rec.portfolioShowcase.length > 0 ? (
                      rec.portfolioShowcase.map((sc) => (
                        <div key={sc.id} style={{ border: `1px solid ${C.rule}`, background: C.surface, padding: 6 }}>
                          <div style={{ height: 130, overflow: "hidden", border: `1px solid ${C.rule}` }}>
                            <img src={sc.coverImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ padding: 6 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span className="headline-sm" style={{ fontSize: 12, fontWeight: 800 }}>{sc.title.toUpperCase()}</span>
                              <span className="mono" style={{ fontSize: 7, color: C.accent, fontWeight: 700, border: `1px solid ${C.accent}`, padding: "1px 4px" }}>
                                {sc.results.toUpperCase()}
                              </span>
                            </div>
                            <p className="body-copy" style={{ fontSize: 11, color: C.inkMid, lineHeight: 1.4, marginTop: 4 }}>
                              {sc.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 italic-serif text-center py-8 opacity-40 text-sm" style={{ gridColumn: "span 2" }}>
                        No campaign showcases cataloged on dossier.
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Collaborations completed history */}
                <div>
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ VERIFIED PARTNERSHIPS LEDGER</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {rec.collaborations && rec.collaborations.length > 0 ? (
                      rec.collaborations.map((col) => (
                        <div key={col.id} style={{ borderBottom: `1px dotted ${C.rule}`, paddingBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <span className="headline-sm" style={{ fontSize: 11, fontWeight: 700 }}>{col.projectName.toUpperCase()}</span>
                              <span className="byline" style={{ fontSize: 7.5, color: C.inkMid, marginLeft: 8 }}>PARTNER: {col.creatorName.toUpperCase()}</span>
                            </div>
                            <span className="mono" style={{ fontSize: 8, color: C.success }}>{col.status.toUpperCase()}</span>
                          </div>
                          <p className="body-copy" style={{ fontSize: 11, color: C.inkFaint, fontStyle: "italic", marginTop: 2 }}>
                            "{col.review}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="italic-serif text-zinc-400 text-xs py-2">
                        No platform creative collaborations completed.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column (1 col): Recruiter statistics & references links */}
              <div>
                <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ CORPORATE LEDGER METRICS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>JOBS POSTED</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{rec.opportunities?.length || 0}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>CREATORS HIRED</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{rec.companyStats?.creatorsHired || 0}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>RESPONSE RATE</div>
                    <div className="headline-md" style={{ fontSize: 16, color: C.success, marginTop: 4 }}>{rec.companyStats?.responseRate || "100%"}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>RESPONSE SPEED</div>
                    <div className="headline-md" style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>{rec.companyStats?.avgResponseTime || "2 Hours"}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>PROFILE VIEWS</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{rec.companyStats?.profileViews || 0}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>FIRM FOLLOWERS</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{rec.followers || 0}</div>
                  </div>
                </div>

                {/* Company hiring specifications & references */}
                <div style={{ border: `1px solid ${C.rule}`, padding: 16, background: C.surface, marginBottom: 20 }}>
                  <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 12 }}>◆ HIRING PARAMETERS SPEC</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      ["EXPERIENCE REQUIRED", rec.hiringPreferences?.preferredExperience || "Intermediate+"],
                      ["ASSIGNMENT FORMAT", rec.hiringPreferences?.projectType || "Freelance / Contract"],
                      ["WORK MODES ACCEPTED", rec.hiringPreferences?.workMode || "Remote / Hybrid"],
                      ["LANGUAGES DEMANDED", rec.hiringPreferences?.languages?.join(", ") || "English"]
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dashed ${C.border}`, paddingBottom: 6 }}>
                        <span className="byline" style={{ fontSize: 7 }}>{k}</span>
                        <span className="mono" style={{ fontWeight: 700, fontSize: 9 }}>{v.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ border: `4px double ${C.ink}`, padding: 16, background: C.surface }}>
                  <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 12 }}>◆ REGISTERED REFERENCES</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 6.5 }}>COMPANY EMAIL</div>
                      <div className="headline-sm" style={{ fontSize: 12, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                        <Mail size={12} style={{ color: C.accent }} />
                        {isEditing ? (
                          <input value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} style={{ fontSize: 10, width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }} placeholder="info@company.com" />
                        ) : (
                          rec.email || "info@pixelforge.com"
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="byline" style={{ fontSize: 6.5 }}>OFFICIAL WEBSITE</div>
                      <div className="headline-sm" style={{ fontSize: 12, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                        <Globe size={12} style={{ color: C.accent }} />
                        {isEditing ? (
                          <input value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} style={{ fontSize: 10, width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }} placeholder="www.company.com" />
                        ) : (
                          rec.website ? (
                            <a href={`https://${rec.website}`} target="_blank" rel="noreferrer" style={{ color: C.ink, textDecoration: "none" }}>{rec.website} ↗</a>
                          ) : "Not Listed"
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="byline" style={{ fontSize: 6.5 }}>SIZE & STAFF</div>
                      <div className="headline-sm" style={{ fontSize: 12, marginTop: 2 }}>
                        {isEditing ? (
                          <select value={editCompanySize} onChange={(e) => setEditCompanySize(e.target.value)} className="mono text-[10px] w-full" style={{ background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}>
                            <option value="1-10 Employees">1-10 EMPLOYEES</option>
                            <option value="10-50 Employees">10-50 EMPLOYEES</option>
                            <option value="50-100 Employees">50-100 EMPLOYEES</option>
                            <option value="100+ Employees">100+ EMPLOYEES</option>
                          </select>
                        ) : (
                          rec.companySize?.toUpperCase() || "50-100 EMPLOYEES"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPPORTUNITIES BOARD */}
          {activeTab === "opportunities" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div className="byline">ACTIVE TALENT ACQUISITIONS</div>
                  <h2 className="headline-md" style={{ fontSize: 24, marginTop: 4 }}>OPEN OPPORTUNITIES BOARD</h2>
                </div>
                {isMe && !showAddOp && (
                  <Btn onClick={() => setShowAddOp(true)}>+ PROPOSE OPPORTUNITY</Btn>
                )}
              </div>

              {showAddOp && (
                <Card style={{ padding: 24, marginBottom: 24, border: `3px double ${C.ink}` }}>
                  <form onSubmit={handleCreateOpportunity}>
                    <div className="byline" style={{ color: C.accent, marginBottom: 16 }}>◆ FILE NEW TALENT OPPORTUNITY</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                      <div>
                        <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>OPPORTUNITY TITLE</label>
                        <Field value={newOpTitle} onChange={(e) => setNewOpTitle(e.target.value)} placeholder="e.g. Lead Video Editor" />
                      </div>
                      <div>
                        <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>REQUIRED SKILLS (COMMA SEPARATED)</label>
                        <Field value={newOpSkills} onChange={(e) => setNewOpSkills(e.target.value)} placeholder="DaVinci, Color Grading, Pacing" />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                      <div>
                        <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>BUDGET (INR FIXED)</label>
                        <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${C.rule}` }}>
                          <span className="mono" style={{ fontSize: 13, paddingRight: 6 }}>₹</span>
                          <input
                            type="number"
                            value={newOpBudget}
                            onChange={(e) => setNewOpBudget(e.target.value)}
                            placeholder="e.g. 20000"
                            style={{ width: "100%", background: "transparent", border: "none", padding: "8px 2px", outline: "none", fontStyle: "italic", color: C.ink, fontSize: 14 }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>WORK MODE</label>
                        <select value={newOpMode} onChange={(e) => setNewOpMode(e.target.value)} className="mono bg-transparent border-b border-rule p-2" style={{ width: "100%", outline: "none", color: C.ink, fontStyle: "italic", border: "none", borderBottom: `1px solid ${C.rule}`, fontFamily: "'Spectral', serif" }}>
                          <option value="Remote">REMOTE</option>
                          <option value="Hybrid">HYBRID</option>
                          <option value="On-site">ON-SITE</option>
                        </select>
                      </div>
                      <div>
                        <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>EXPERIENCE LEVEL</label>
                        <select value={newOpExp} onChange={(e) => setNewOpExp(e.target.value)} className="mono bg-transparent border-b border-rule p-2" style={{ width: "100%", outline: "none", color: C.ink, fontStyle: "italic", border: "none", borderBottom: `1px solid ${C.rule}`, fontFamily: "'Spectral', serif" }}>
                          <option value="Entry">ENTRY LEVEL</option>
                          <option value="Intermediate">INTERMEDIATE</option>
                          <option value="Expert">EXPERT</option>
                        </select>
                      </div>
                      <div>
                        <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>DEADLINE DATE</label>
                        <Field type="date" value={newOpDeadline} onChange={(e) => setNewOpDeadline(e.target.value)} />
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label className="byline" style={{ fontSize: 8, marginBottom: 4, display: "block" }}>COMPREHENSIVE OPPORTUNITY DETAILS</label>
                      <Field multiline rows={3} value={newOpDesc} onChange={(e) => setNewOpDesc(e.target.value)} placeholder="Provide full scope details..." />
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                      <Btn onClick={(e) => handleCreateOpportunity(e as any)} disabled={submittingOp}>
                        {submittingOp ? "PUBLISHING..." : "FILE ACQUISITION"}
                      </Btn>
                      <Btn variant="ghost" onClick={() => setShowAddOp(false)}>CANCEL</Btn>
                    </div>
                  </form>
                </Card>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {rec.opportunities && rec.opportunities.length > 0 ? (
                  rec.opportunities.map((op) => {
                    const hasApplied = currentUser && op.applicants?.includes(currentUser._id);
                    return (
                      <Card key={op.id} style={{ padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <h3 className="headline-sm">{op.title}</h3>
                            <span className="mono" style={{ fontSize: 9, background: C.accentBg, color: C.accent, padding: "2px 6px", border: `1px solid ${C.rule}`, fontWeight: 700 }}>
                              ₹{parseInt(op.budget || "0").toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="byline" style={{ fontSize: 7.5, color: C.inkFaint, marginTop: 4, marginBottom: 12 }}>
                            MODE: {op.workMode.toUpperCase()} // LEVEL: {op.experienceLevel.toUpperCase()} // DEADLINE: {op.deadline}
                          </div>
                          <p className="body-copy" style={{ fontSize: 13, color: C.inkMid, lineHeight: 1.5, marginBottom: 16 }}>
                            {op.description}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                            {op.requiredSkills.map((s, i) => (
                              <span key={i} className="mono" style={{ fontSize: 8, background: C.paper, padding: "2px 6px", border: `1px solid ${C.rule}` }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ borderTop: `1px solid ${C.rule}`, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="byline" style={{ fontSize: 7 }}>
                            {op.applicants?.length || 0} APPLICANTS REGISTERED
                          </span>
                          {!isMe && currentUser && (
                            <Btn
                              variant={hasApplied ? "success" : "primary"}
                              style={{ fontSize: 8, padding: "4px 10px" }}
                              disabled={hasApplied || applyingOpId === op.id}
                              onClick={() => handleApply(op.id)}
                            >
                              {hasApplied ? "✓ APPLIED" : applyingOpId === op.id ? "APPLYING..." : "APPLY FOR ASSIGNMENT"}
                            </Btn>
                          )}
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="col-span-2 italic-serif py-12 text-center text-zinc-400 w-full" style={{ gridColumn: "span 2" }}>
                    No talent acquisitions currently filed on the board.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TRUST & REVIEWS REGISTRY */}
          {activeTab === "trust" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column Radial Trust Score */}
              <div style={{ border: `4px double ${C.ink}`, padding: 24, background: C.surface, textAlign: "center" }}>
                <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 20 }}>HIRING TRUST INDEX RECORD</div>
                
                {/* SVG Radial Meter */}
                <div style={{ width: 140, height: 140, margin: "0 auto 16px", position: "relative" }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke={C.rule} strokeWidth="6" opacity="0.3" />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke={C.accent}
                      strokeWidth="6"
                      strokeDasharray="276"
                      strokeDashoffset={276 - (276 * (rec.hiringTrust?.trustScore || 90)) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifycontent: "center" }}>
                    <div className="headline-md" style={{ fontSize: 28, fontWeight: 800, margin: "22px 0 0" }}>{rec.hiringTrust?.trustScore || 90}</div>
                    <div className="byline" style={{ fontSize: 6.5 }}>TRUST INDEX</div>
                  </div>
                </div>

                <div className="headline-sm" style={{ fontSize: 16 }}>{rec.hiringTrust?.trustScore && rec.hiringTrust.trustScore >= 95 ? "ELITE" : "PREFERRED"} HIRING AGENCY</div>
                <p className="italic-serif text-[11px] text-zinc-500 mt-2 leading-relaxed">
                  "Hiring entity has a clean payment ledger with verified creative partnerships completions."
                </p>
                <Linkedin size={12} style={{ color: C.accent }} />
                {rec.linkedin ? (
                  <a href={`https://${rec.linkedin}`} target="_blank" rel="noreferrer" style={{ color: C.ink, textDecoration: "none" }}>LINKEDIN PAGE ↗</a>
                ) : "Not Listed"}
              </div>

              {/* Middle Column Creator Reviews Registry */}
              <div style={{ border: `4px double ${C.ink}`, padding: 24, background: C.surface, display: "flex", flexDirection: "column", height: "100%" }}>
                <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 12 }}>◆ PLATFORM CREATOR REVIEWS ({rec.reviews?.length || 0})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", flex: 1, maxHeight: 280 }}>
                  {rec.reviews && rec.reviews.length > 0 ? (
                    rec.reviews.map((rev) => (
                      <Card key={rev.id} style={{ padding: 12, background: C.paper }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 4 }}>
                          <div>
                            <div className="headline-sm" style={{ fontSize: 10, fontWeight: 700 }}>{rev.projectName.toUpperCase()}</div>
                            <div className="byline" style={{ fontSize: 6.5, color: C.inkMid }}>BY {rev.creatorName.toUpperCase()}</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={8} style={{ fill: i < rev.rating ? C.accent : "none", color: i < rev.rating ? C.accent : C.rule }} />
                            ))}
                          </div>
                        </div>
                        <p className="body-copy" style={{ fontSize: 10, fontStyle: "italic", color: C.inkMid, lineHeight: 1.3, marginTop: 4 }}>
                          "{rev.reviewText}"
                        </p>
                      </Card>
                    ))
                  ) : (
                    <div className="italic-serif text-zinc-400 text-xs py-4 text-center">
                      No creator reviews indexed.
                    </div>
                  )}
                </div>
              </div>

              <div style={{ border: `4px double ${C.ink}`, padding: 24, background: C.surface }}>
                <div className="byline" style={{ fontSize: 6.5 }}>INSTAGRAM CORRESPONDENCE</div>
                <div className="headline-sm" style={{ fontSize: 12, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                  <Instagram size={12} style={{ color: C.accent }} />
                  {rec.instagram ? (
                    <a href={`https://instagram.com/${rec.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ color: C.ink, textDecoration: "none" }}>{rec.instagram}</a>
                  ) : "Not Listed"}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Creator Dossier & Ledger Layout Component ──────────────────────────────────
interface CreatorDossierLayoutProps {
  profile: Creator;
  currentUser: User | null;
  setPage: (p: string) => void;
  setActiveConvoId: (id: string) => void;
  onUpdate?: (u: any) => void;
  wrapApi?: <T>(fn: () => Promise<T>) => Promise<T>;
  onLightbox?: (url: string, type: "image" | "video") => void;
}

function CreatorDossierLayout({
  profile: initialProfile,
  currentUser,
  setPage,
  setActiveConvoId,
  onUpdate,
  wrapApi,
  onLightbox,
}: CreatorDossierLayoutProps) {
  const [profile, setProfile] = useState<Creator>(initialProfile);
  const [activeTab, setActiveTab] = useState<"dossier" | "proficiencies" | "collaborations" | "analytics">("dossier");
  const [isEditing, setIsEditing] = useState(false);

  // Sync state when initialProfile changes
  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  const isMe = currentUser?._id === profile._id;

  // Identity Form fields
  const [editName, setEditName] = useState(profile.name || "");
  const [editRole, setEditRole] = useState(profile.role || "");
  const [editBio, setEditBio] = useState(profile.bio || "");
  const [editAboutMe, setEditAboutMe] = useState(profile.aboutMe || "");
  const [editQuote, setEditQuote] = useState(profile.quote || "");
  const [editLocation, setEditLocation] = useState(profile.location || "");
  const [editRate, setEditRate] = useState(profile.rate || "");
  const [editBanner, setEditBanner] = useState(profile.coverBanner || "");
  const [editProfilePic, setEditProfilePic] = useState(profile.profilePic || "");
  const [editSkillsTags, setEditSkillsTags] = useState(profile.skillsTags?.join(", ") || "");
  const [editPrimarySkill, setEditPrimarySkill] = useState(profile.primarySkill || "");
  const [editSecondarySkills, setEditSecondarySkills] = useState(profile.secondarySkills?.join(", ") || "");
  
  // Social links
  const [editYoutube, setEditYoutube] = useState(profile.youtube || "");
  const [editDiscord, setEditDiscord] = useState(profile.discord || "");
  const [editInstagram, setEditInstagram] = useState(profile.instagram || "");
  const [editLinkedin, setEditLinkedin] = useState(profile.linkedin || "");
  const [editWebsite, setEditWebsite] = useState(profile.website || "");

  const [saving, setSaving] = useState(false);

  // Sync fields when profile changes
  useEffect(() => {
    setEditName(profile.name || "");
    setEditRole(profile.role || "");
    setEditBio(profile.bio || "");
    setEditAboutMe(profile.aboutMe || "");
    setEditQuote(profile.quote || "");
    setEditLocation(profile.location || "");
    setEditRate(profile.rate || "");
    setEditBanner(profile.coverBanner || "");
    setEditProfilePic(profile.profilePic || "");
    setEditSkillsTags(profile.skillsTags?.join(", ") || "");
    setEditPrimarySkill(profile.primarySkill || "");
    setEditSecondarySkills(profile.secondarySkills?.join(", ") || "");
    setEditYoutube(profile.youtube || "");
    setEditDiscord(profile.discord || "");
    setEditInstagram(profile.instagram || "");
    setEditLinkedin(profile.linkedin || "");
    setEditWebsite(profile.website || "");
  }, [profile]);

  // Follow states
  const [following, setFollowing] = useState(currentUser?.following?.includes(profile._id) || false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followers || 0);

  useEffect(() => {
    if (currentUser) {
      setFollowing(currentUser.following?.includes(profile._id) || false);
    }
  }, [currentUser, profile._id]);

  useEffect(() => {
    setFollowersCount(profile.followers || 0);
  }, [profile.followers]);

  // Copy success & Bookmarked state
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [bookmarked, setBookmarked] = useState(!!localStorage.getItem(`bookmarked_${profile._id}`));
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);

  // Inline forms states
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceTime, setNewServiceTime] = useState("3 Days");
  const [newServiceRevisions, setNewServiceRevisions] = useState(3);
  const [submittingService, setSubmittingService] = useState(false);

  const [showAddTool, setShowAddTool] = useState(false);
  const [newToolName, setNewToolName] = useState("");
  const [newToolLevel, setNewToolLevel] = useState("MAESTRO");
  const [submittingTool, setSubmittingTool] = useState(false);

  const [showAddWork, setShowAddWork] = useState(false);
  const [newWorkCompany, setNewWorkCompany] = useState("");
  const [newWorkRole, setNewWorkRole] = useState("");
  const [newWorkDuration, setNewWorkDuration] = useState("");
  const [newWorkDesc, setNewWorkDesc] = useState("");
  const [submittingWork, setSubmittingWork] = useState(false);

  const [showAddCert, setShowAddCert] = useState(false);
  const [newCertName, setNewCertName] = useState("");
  const [newCertIssuer, setNewCertIssuer] = useState("");
  const [newCertDate, setNewCertDate] = useState("");
  const [submittingCert, setSubmittingCert] = useState(false);

  const [showAddEdu, setShowAddEdu] = useState(false);
  const [newEduSchool, setNewEduSchool] = useState("");
  const [newEduDegree, setNewEduDegree] = useState("");
  const [newEduYear, setNewEduYear] = useState("");
  const [submittingEdu, setSubmittingEdu] = useState(false);

  // Pinned portfolio entry
  const [newPortTitle, setNewPortTitle] = useState("");
  const [newPortUrl, setNewPortUrl] = useState("");
  const [newPortType, setNewPortType] = useState<"image" | "video">("image");
  const [addingPort, setAddingPort] = useState(false);

  const [analyticsFilter, setAnalyticsFilter] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const portInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleFollow = async () => {
    if (!currentUser) return;
    setFollowLoading(true);
    try {
      const res = await api.followUser(profile._id);
      setFollowing(!following);
      setFollowersCount(res.followers);
      setProfile(prev => ({ ...prev, followers: res.followers }));
      onUpdate?.({ ...currentUser, following: res.following });
    } catch (err) {
      console.error("Follow failed:", err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleMsg = async () => {
    const convo = await (wrapApi
      ? wrapApi(() => api.startConversation(profile._id))
      : api.startConversation(profile._id));
    setActiveConvoId(convo._id);
    setPage("Messages");
  };

  const handleHire = async () => {
    try {
      await api.hireUser(profile._id);
      alert("Provisional assignment proposal dispatched to the talent registry ledger.");
    } catch (e) {
      console.error("Hire failed", e);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const skillsArr = editSkillsTags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const secondaryArr = editSecondarySkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const dataToSave = {
        name: editName,
        role: editRole,
        bio: editBio,
        aboutMe: editAboutMe,
        quote: editQuote,
        location: editLocation,
        rate: editRate,
        coverBanner: editBanner,
        profilePic: editProfilePic,
        skillsTags: skillsArr,
        primarySkill: editPrimarySkill,
        secondarySkills: secondaryArr,
        youtube: editYoutube,
        discord: editDiscord,
        instagram: editInstagram,
        linkedin: editLinkedin,
        website: editWebsite
      };

      const updated = await (wrapApi
        ? wrapApi(() => api.updateMe(dataToSave))
        : api.updateMe(dataToSave));

      setProfile(updated);
      onUpdate?.(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to update dossier registry.");
    } finally {
      setSaving(false);
    }
  };

  const onProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setEditProfilePic(compressed);
    };
    reader.readAsDataURL(file);
  };

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setEditBanner(compressed);
    };
    reader.readAsDataURL(file);
  };

  const onPortFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setNewPortUrl(compressed);
    };
    reader.readAsDataURL(file);
  };

  // Inline forms additions
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServiceDesc || !newServicePrice) return;
    
    // Rupee Numeric pricing validation
    const priceNum = parseInt(newServicePrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid numeric starting price in INR (Rupees).");
      return;
    }

    setSubmittingService(true);
    try {
      const newService = {
        serviceName: newServiceName,
        description: newServiceDesc,
        startingPrice: String(priceNum),
        deliveryTime: newServiceTime,
        revisionCount: newServiceRevisions
      };

      const updatedServices = [...(profile.servicesOffered || []), newService];
      const updated = await api.updateMe({ servicesOffered: updatedServices });
      setProfile(updated);
      onUpdate?.(updated);
      
      // Reset
      setNewServiceName("");
      setNewServiceDesc("");
      setNewServicePrice("");
      setShowAddService(false);
    } catch (err) {
      console.error("Failed to add service", err);
      alert("Failed to register service.");
    } finally {
      setSubmittingService(false);
    }
  };

  const handleAddTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName) return;
    setSubmittingTool(true);
    try {
      const newTool = {
        name: newToolName,
        level: newToolLevel
      };
      const updatedTools = [...(profile.softwareList || []), newTool];
      const updated = await api.updateMe({ softwareList: updatedTools });
      setProfile(updated);
      onUpdate?.(updated);
      setNewToolName("");
      setShowAddTool(false);
    } catch (err) {
      console.error("Failed to add software tool", err);
      alert("Failed to register tool.");
    } finally {
      setSubmittingTool(false);
    }
  };

  const handleAddWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkCompany || !newWorkRole || !newWorkDuration) return;
    setSubmittingWork(true);
    try {
      const newWork = {
        company: newWorkCompany,
        role: newWorkRole,
        duration: newWorkDuration,
        description: newWorkDesc
      };
      const updatedWork = [...(profile.workHistory || []), newWork];
      const updated = await api.updateMe({ workHistory: updatedWork });
      setProfile(updated);
      onUpdate?.(updated);
      setNewWorkCompany("");
      setNewWorkRole("");
      setNewWorkDuration("");
      setNewWorkDesc("");
      setShowAddWork(false);
    } catch (err) {
      console.error("Failed to add work experience", err);
      alert("Failed to register experience.");
    } finally {
      setSubmittingWork(false);
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName || !newCertIssuer) return;
    setSubmittingCert(true);
    try {
      const newCert = {
        name: newCertName,
        issuer: newCertIssuer,
        date: newCertDate || new Date().getFullYear().toString()
      };
      const updatedCert = [...(profile.certifications || []), newCert];
      const updated = await api.updateMe({ certifications: updatedCert });
      setProfile(updated);
      onUpdate?.(updated);
      setNewCertName("");
      setNewCertIssuer("");
      setNewCertDate("");
      setShowAddCert(false);
    } catch (err) {
      console.error("Failed to add certification", err);
      alert("Failed to register certification.");
    } finally {
      setSubmittingCert(false);
    }
  };

  const handleAddEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduSchool || !newEduDegree) return;
    setSubmittingEdu(true);
    try {
      const newEdu = {
        school: newEduSchool,
        degree: newEduDegree,
        year: newEduYear || new Date().getFullYear().toString()
      };
      const updatedEdu = [...(profile.education || []), newEdu];
      const updated = await api.updateMe({ education: updatedEdu });
      setProfile(updated);
      onUpdate?.(updated);
      setNewEduSchool("");
      setNewEduDegree("");
      setNewEduYear("");
      setShowAddEdu(false);
    } catch (err) {
      console.error("Failed to add education", err);
      alert("Failed to register academic degree.");
    } finally {
      setSubmittingEdu(false);
    }
  };

  const handleAddPortfolioItem = async () => {
    if (!newPortTitle || !newPortUrl) return;
    setAddingPort(true);
    try {
      const newItem = {
        id: "p-" + Date.now(),
        title: newPortTitle,
        type: newPortType,
        url: newPortUrl
      };
      const updatedPort = [...(profile.portfolio || []), newItem];
      const updated = await api.updateMe({ portfolio: updatedPort });
      setProfile(updated);
      onUpdate?.(updated);

      // Auto-post new portfolio item to home feed
      try {
        await api.createPost({
          text: `Uploaded a new portfolio piece: "${newPortTitle}"`,
          cat: "Portfolio",
          mediaUrl: newPortUrl,
          mediaType: newPortType
        });
      } catch (postErr) {
        console.error("Auto-posting portfolio item failed:", postErr);
      }

      setNewPortTitle("");
      setNewPortUrl("");
    } catch (err) {
      console.error("Failed to upload portfolio item", err);
      alert("Failed to upload portfolio piece.");
    } finally {
      setAddingPort(false);
    }
  };

  const handleToggleAvailability = async (status: string) => {
    try {
      const updated = await api.updateMe({ availabilityStatus: status });
      setProfile(updated);
      onUpdate?.(updated);
    } catch (err) {
      console.error("Failed to toggle availability", err);
    }
  };

  const handleShare = () => {
    const link = `https://artwithin.onrender.com/#/profile/${profile._id}`;
    navigator.clipboard.writeText(link).then(() => {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    });
  };

  const handleBookmark = () => {
    if (bookmarked) {
      localStorage.removeItem(`bookmarked_${profile._id}`);
      setBookmarked(false);
    } else {
      localStorage.setItem(`bookmarked_${profile._id}`, "true");
      setBookmarked(true);
      setShowBookmarkToast(true);
      setTimeout(() => setShowBookmarkToast(false), 3500);
    }
  };

  const completedFields = [
    profile.name,
    profile.role,
    profile.bio,
    profile.profilePic,
    profile.coverBanner,
    profile.skillsTags?.length,
    profile.portfolio?.length
  ].filter(Boolean).length;
  
  const profileCompletion = Math.min(100, Math.round((completedFields / 7) * 100));

  const averageRating = useMemo(() => {
    if (!profile.reviews || profile.reviews.length === 0) return 5.0;
    const total = profile.reviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((total / profile.reviews.length).toFixed(1));
  }, [profile.reviews]);

  return (
    <div className="fade-in max-w-4xl mx-auto paper-grain" style={{ background: C.paper, padding: "20px 0" }}>
      {/* Toast notifications */}
      <AnimatePresence>
        {showCopySuccess && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 1000, background: C.ink, color: C.white, border: `1px solid ${C.rule}`, padding: "10px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
            ◆ DOSSIER CREDENTIAL HASH COPIED TO WIRE
          </motion.div>
        )}
        {showBookmarkToast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 1000, background: C.accent, color: C.white, border: `1px solid ${C.rule}`, padding: "10px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
            ◇ CREATIVE DOSSIER BOOKMARKED IN PLATFORM REGISTRY
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover Banner with Double border framing */}
      <div style={{
        height: 240,
        border: `4px double ${C.ink}`,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        padding: 16,
        overflow: "hidden",
        background: C.accentBg
      }}>
        {/* Render Banner Asset (Image or Video) */}
        {(() => {
          const bannerUrl = isEditing ? editBanner : profile.coverBanner;
          if (!bannerUrl) return null;
          const isVideo = bannerUrl.startsWith("data:video/") || bannerUrl.endsWith(".mp4") || bannerUrl.endsWith(".webm");
          if (isVideo) {
            return (
              <video
                src={bannerUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0
                }}
              />
            );
          }
          return (
            <img
              src={bannerUrl}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0
              }}
            />
          );
        })()}
        {isEditing && (
          <button
            onClick={() => bannerInputRef.current?.click()}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: C.ink,
              color: C.white,
              border: "none",
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              cursor: "pointer",
              fontWeight: 600,
              zIndex: 10
            }}
          >
            SELECT BANNER ASSET
          </button>
        )}
        <input type="file" ref={bannerInputRef} hidden accept="image/*,video/*" onChange={onBannerChange} />

        {/* Floating Profile pic */}
        <div style={{
          position: "absolute",
          bottom: -50,
          left: 24,
          zIndex: 50,
          background: C.white,
          border: `3px solid ${C.paper}`,
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
          display: "inline-block"
        }}>
          <Ink
            name={profile.name}
            src={isEditing ? editProfilePic : profile.profilePic}
            size={100}
          />
          {isEditing && (
            <button
              onClick={() => logoInputRef.current?.click()}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                background: C.ink,
                color: C.white,
                border: "none",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={14} />
            </button>
          )}
          <input type="file" ref={logoInputRef} hidden accept="image/*" onChange={onProfilePicChange} />
        </div>
      </div>

      {/* Main Identity and Actions Header Block */}
      <div style={{ paddingLeft: 140, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, marginRight: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h1 className="headline-lg" style={{ fontSize: 32 }}>
              {isEditing ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 26, width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, outline: "none", color: C.ink }}
                  placeholder="Aarav Shah"
                />
              ) : (
                profile.name.toUpperCase()
              )}
            </h1>
            {profile.verified && <span style={{ color: C.success, fontSize: 22, fontWeight: 700 }} title="Verified Creative Partner">✓</span>}
            
            {/* Availability Pill */}
            {!isEditing && (
              <span style={{
                fontSize: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                background: profile.availabilityStatus === "Available for Work" || profile.availabilityStatus === "Open to Collaboration" ? C.accentBg : "rgba(0,0,0,0.05)",
                color: profile.availabilityStatus === "Available for Work" || profile.availabilityStatus === "Open to Collaboration" ? C.accent : C.inkFaint,
                border: `1px solid ${profile.availabilityStatus === "Available for Work" || profile.availabilityStatus === "Open to Collaboration" ? C.accent : C.rule}`,
                padding: "2px 8px",
                borderRadius: 12
              }}>
                ◆ {profile.availabilityStatus?.toUpperCase() || "AVAILABLE FOR WORK"}
              </span>
            )}
          </div>
          <div className="byline" style={{ display: "flex", alignItems: "center", gap: 12, color: C.accent, marginTop: 6, flexWrap: "wrap" }}>
            <span>
              {isEditing ? (
                <input
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  style={{ fontSize: 10, width: 150, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, outline: "none", color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}
                  placeholder="Video Editor"
                />
              ) : (
                profile.role?.toUpperCase() || "CREATIVE ARTISAN"
              )}
            </span>
            <span>//</span>
            <span className="mono" style={{ fontSize: 9, color: C.inkFaint }}>
              {profile.username || `@${profile.name?.toLowerCase().replace(/\s+/g, '_')}`}
            </span>
            <span>//</span>
            <span className="mono" style={{ fontSize: 9, color: C.inkMid }}>
              {isEditing ? (
                <input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  style={{ fontSize: 9, width: 120, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, outline: "none", color: C.inkMid }}
                  placeholder="Mumbai, India"
                />
              ) : (
                profile.location || "Location Unknown"
              )}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          {isMe ? (
            <div style={{ display: "flex", gap: 8 }}>
              {isEditing ? (
                <>
                  <Btn onClick={handleSaveProfile} disabled={saving}>
                    {saving ? "SAVING..." : "SAVE DOSSIER"}
                  </Btn>
                  <Btn variant="ghost" onClick={() => setIsEditing(false)}>
                    CANCEL
                  </Btn>
                </>
              ) : (
                <Btn variant="ghost" onClick={() => setIsEditing(true)}>
                  REVISE DOSSIER →
                </Btn>
              )}
            </div>
          ) : (
            <>
              {currentUser && (
                <button
                  onClick={handleBookmark}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.ink}`,
                    cursor: "pointer",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s"
                  }}
                  title={bookmarked ? "Bookmarked" : "Save Profile"}
                >
                  <Bookmark size={15} style={{ fill: bookmarked ? C.accent : "none", color: bookmarked ? C.accent : C.ink }} />
                </button>
              )}
              <button
                onClick={handleShare}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.ink}`,
                  cursor: "pointer",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Share Profile Credential Hash"
              >
                <ExternalLink size={15} style={{ color: C.ink }} />
              </button>
              {currentUser && (
                <Btn variant={following ? "ghost" : "primary"} onClick={handleFollow} disabled={followLoading} style={{ fontSize: 9, padding: "8px 14px" }}>
                  {following ? "UNFOLLOW" : "FOLLOW"}
                </Btn>
              )}
              <Btn variant="ghost" onClick={handleMsg} style={{ fontSize: 9, padding: "8px 14px" }}>
                CHAT WIRE
              </Btn>
              <Btn variant="success" onClick={handleHire} style={{ fontSize: 9, padding: "8px 14px" }}>
                PROPOSE
              </Btn>
            </>
          )}
        </div>
      </div>

      {/* Availability selector if isMe */}
      {isMe && !isEditing && (
        <div style={{ paddingLeft: 140, marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span className="byline" style={{ fontSize: 7 }}>ADJUST PLATFORM STATUS:</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["Available for Work", "Open to Collaboration", "Busy", "Not Available"].map((st) => (
              <button
                key={st}
                onClick={() => handleToggleAvailability(st)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 7.5,
                  padding: "2px 8px",
                  background: profile.availabilityStatus === st ? C.accentBg : "transparent",
                  color: profile.availabilityStatus === st ? C.accent : C.inkFaint,
                  border: `1px solid ${profile.availabilityStatus === st ? C.accent : C.rule}`,
                  cursor: "pointer",
                  fontWeight: profile.availabilityStatus === st ? 700 : 500
                }}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Typographic spread tabs switcher */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
        marginTop: 32,
        marginBottom: 24,
        borderBottom: `2px double ${C.rule}`,
        paddingBottom: 12,
        flexWrap: "wrap"
      }}>
        {[
          { key: "dossier", label: "◆ DOSSIER & PORTFOLIO" },
          { key: "proficiencies", label: "◆ PROFICIENCIES & BACKGROUND" },
          { key: "collaborations", label: "◆ COLLABORATIVE LEDGER" },
          { key: "analytics", label: "◆ ANALYTICS & ACTIVITY" }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className="headline-md bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              color: activeTab === t.key ? C.accent : C.inkFaint,
              borderBottom: activeTab === t.key ? `2px solid ${C.accent}` : "none",
              paddingBottom: 4,
              fontSize: 14,
              letterSpacing: "0.06em",
              fontWeight: 700
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SPREAD CONTENT PANELS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* TAB 1: DOSSIER & PORTFOLIO */}
          {activeTab === "dossier" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column (2 cols): Bio, About Me, Pinned visual plates & portfolio grid */}
              <div className="md:col-span-2">
                <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ BIOGRAPHICAL RECORD</div>
                
                {isEditing ? (
                  <div style={{ marginBottom: 20 }}>
                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>TAGLINE/QUOTE</label>
                    <input
                      value={editQuote}
                      onChange={(e) => setEditQuote(e.target.value)}
                      style={{ width: "100%", padding: 6, fontStyle: "italic", border: `1px solid ${C.rule}`, background: "transparent", fontSize: 13, marginBottom: 12 }}
                      placeholder="Creativity is the greatest rebellion..."
                    />

                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>SHORT BIOGRAPHY</label>
                    <textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      style={{ width: "100%", height: 80, padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 14, resize: "none", marginBottom: 12 }}
                      placeholder="Short intro bio..."
                    />

                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>ABOUT ME DETAILED DESCRIPTION</label>
                    <textarea
                      value={editAboutMe}
                      onChange={(e) => setEditAboutMe(e.target.value)}
                      style={{ width: "100%", height: 120, padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 14, resize: "none" }}
                      placeholder="Detailed about me story..."
                    />
                  </div>
                ) : (
                  <div style={{ marginBottom: 28 }}>
                    {profile.quote && (
                      <div className="pull-quote" style={{ marginTop: 0, marginBottom: 16 }}>
                        "{profile.quote}"
                      </div>
                    )}
                    <p className="body-copy drop-cap" style={{ fontSize: 16, lineHeight: 1.6 }}>
                      {profile.bio || "Dossier pending description update."}
                    </p>
                    {profile.aboutMe && (
                      <p className="body-copy" style={{ fontSize: 14, color: C.inkMid, marginTop: 14, borderLeft: `2px solid ${C.rule}`, paddingLeft: 12, fontStyle: "italic" }}>
                        {profile.aboutMe}
                      </p>
                    )}
                  </div>
                )}

                {/* Pinned & Featured works */}
                <div style={{ marginBottom: 32 }}>
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ FEATURED ARCHIVE SPECIMENS</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {profile.portfolio && profile.portfolio.slice(0, 2).map((item) => (
                      <div key={item.id} style={{ border: `1px solid ${C.rule}`, background: C.surface, padding: 6 }}>
                        <div style={{ height: 130, overflow: "hidden", border: `1px solid ${C.rule}`, position: "relative" }}>
                          {item.type === "video" ? (
                            <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted loop playsInline autoPlay />
                          ) : (
                            <img src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          )}
                          <div style={{ position: "absolute", top: 6, left: 6, background: C.ink, color: C.white, fontSize: 6.5, fontFamily: "'JetBrains Mono', monospace", padding: "2px 6px" }}>
                            PINNED FEATURE
                          </div>
                        </div>
                        <div style={{ padding: "6px 4px 2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="headline-sm" style={{ fontSize: 11 }}>{item.title.toUpperCase()}</span>
                          <span className="mono" style={{ fontSize: 8, color: C.accent }}>{item.type.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                    {(!profile.portfolio || profile.portfolio.length === 0) && (
                      <div className="col-span-2 italic-serif text-center py-8 opacity-40 text-sm">
                        No pinned visual plates currently filed.
                      </div>
                    )}
                  </div>
                </div>

                {/* Portfolio grid ledger */}
                <div>
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ PORTFOLIO LEDGER PLATES ({profile.portfolio?.length || 0})</div>
                  
                  {isMe && (
                    <Card style={{ padding: 16, marginBottom: 20, border: `2px dashed ${C.rule}` }}>
                      <div className="byline" style={{ marginBottom: 10 }}>ADD NEW ARCHIVE SPECIMEN</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
                        <div>
                          <label className="byline" style={{ fontSize: 7, marginBottom: 2 }}>TITLE</label>
                          <input
                            value={newPortTitle}
                            onChange={(e) => setNewPortTitle(e.target.value)}
                            style={{ width: "100%", padding: 4, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}
                            placeholder="Midnight over Mumbai"
                          />
                        </div>
                        <div>
                          <label className="byline" style={{ fontSize: 7, marginBottom: 2 }}>ASSET TYPE</label>
                          <select
                            value={newPortType}
                            onChange={(e) => setNewPortType(e.target.value as any)}
                            className="mono bg-transparent border-b border-rule p-1 text-[9px]"
                            style={{ color: C.ink, width: "100%" }}
                          >
                            <option value="image">IMAGE SPECIMEN</option>
                            <option value="video">VIDEO SPECIMEN</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <label className="byline" style={{ fontSize: 7, marginBottom: 2 }}>LOCAL FILE UPLOAD OR URI</label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            value={newPortUrl}
                            onChange={(e) => setNewPortUrl(e.target.value)}
                            style={{ width: "100%", padding: 4, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}
                            placeholder="https://images.unsplash.com/..."
                          />
                          <Btn variant="ghost" style={{ fontSize: 8, padding: "4px 8px" }} onClick={() => portInputRef.current?.click()}>
                            LOCAL
                          </Btn>
                          <input type="file" ref={portInputRef} hidden accept={newPortType === "image" ? "image/*" : "video/*"} onChange={onPortFileChange} />
                        </div>
                      </div>

                      <Btn onClick={handleAddPortfolioItem} disabled={addingPort}>
                        {addingPort ? "UPLOADING..." : "+ ADD SPECIMEN TO LEDGER"}
                      </Btn>
                    </Card>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {profile.portfolio?.map((item) => (
                      <Hoarding
                        key={item.id}
                        url={item.url}
                        type={item.type as any}
                        label={item.title}
                        caption={`Specimen ${item.id.toUpperCase()} archived under ${profile.name}'s creative ledger.`}
                        onLightbox={onLightbox}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (1 col): Creator statistics & Services Offered Ledger */}
              <div>
                <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ OPERATIONAL STATS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>FOLLOWERS</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{followersCount}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>PORTFOLIO PLATES</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{profile.portfolio?.length || 0}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>HOURLY RATE</div>
                    <div className="headline-md" style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>
                      {isEditing ? (
                        <input
                          value={editRate}
                          onChange={(e) => setEditRate(e.target.value)}
                          style={{ fontSize: 10, width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, textAlign: "center" }}
                          placeholder="₹3,500/hr"
                        />
                      ) : (
                        profile.rate || "Contact Rate"
                      )}
                    </div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>PROJECTS COMPLETED</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{profile.projectsCompleted || profile.portfolio?.length || 0}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>LIKES RECEIVED</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{profile.likesReceived || 120}</div>
                  </div>
                  <div style={{ border: `1px solid ${C.rule}`, padding: 10, background: C.surface, textAlign: "center" }}>
                    <div className="byline" style={{ fontSize: 6 }}>PROFILE VIEWS</div>
                    <div className="headline-md" style={{ fontSize: 16, marginTop: 4 }}>{profile.profileViews || 340}</div>
                  </div>
                </div>

                {/* Services Offered Ledger */}
                <div style={{ border: `4px double ${C.ink}`, padding: 16, background: C.surface }}>
                  <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>SERVICES OFFERED LEDGER</span>
                    <span>₹ INR</span>
                  </div>

                  {/* Add service inline button */}
                  {isMe && !showAddService && (
                    <button
                      onClick={() => setShowAddService(true)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: `1px dashed ${C.accent}`,
                        color: C.accent,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8,
                        fontWeight: 700,
                        padding: "6px 0",
                        cursor: "pointer",
                        marginBottom: 16,
                        letterSpacing: "0.1em"
                      }}
                    >
                      + ADD NEW SERVICE SPECIFICATION
                    </button>
                  )}

                  {/* Add service form */}
                  {showAddService && (
                    <form onSubmit={handleAddService} style={{ border: `1px solid ${C.rule}`, padding: 10, marginBottom: 16, background: C.paper }}>
                      <div className="byline" style={{ fontSize: 7, color: C.accent, marginBottom: 8 }}>◆ CONFIGURE SERVICE SPEC</div>
                      
                      <input
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        placeholder="Service Name (e.g. Cinema Edit)"
                        style={{ width: "100%", fontSize: 11, padding: 4, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`, marginBottom: 8 }}
                        required
                      />

                      <textarea
                        value={newServiceDesc}
                        onChange={(e) => setNewServiceDesc(e.target.value)}
                        placeholder="Brief execution deliverables details..."
                        style={{ width: "100%", fontSize: 11, padding: 4, background: "transparent", border: `1px solid ${C.rule}`, height: 50, resize: "none", marginBottom: 8 }}
                        required
                      />

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <div>
                          <label className="byline" style={{ fontSize: 6.5 }}>PRICE (INR INTEGER)</label>
                          <input
                            type="number"
                            value={newServicePrice}
                            onChange={(e) => setNewServicePrice(e.target.value)}
                            placeholder="e.g. 15000"
                            style={{ width: "100%", fontSize: 11, padding: 2, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}
                            required
                          />
                        </div>
                        <div>
                          <label className="byline" style={{ fontSize: 6.5 }}>DELIVERY TIME</label>
                          <input
                            value={newServiceTime}
                            onChange={(e) => setNewServiceTime(e.target.value)}
                            placeholder="e.g. 3 Days"
                            style={{ width: "100%", fontSize: 11, padding: 2, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <Btn variant="primary" style={{ fontSize: 7.5, padding: "4px 8px" }} disabled={submittingService} onClick={(e) => handleAddService(e as any)}>
                          SAVE SPEC
                        </Btn>
                        <Btn variant="ghost" style={{ fontSize: 7.5, padding: "4px 8px" }} onClick={() => setShowAddService(false)}>
                          CANCEL
                        </Btn>
                      </div>
                    </form>
                  )}

                  {/* Services List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {profile.servicesOffered && profile.servicesOffered.length > 0 ? (
                      profile.servicesOffered.map((serv, idx) => (
                        <div key={idx} style={{ borderBottom: idx < (profile.servicesOffered?.length || 0) - 1 ? `1px dashed ${C.border}` : "none", paddingBottom: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <span className="headline-sm" style={{ fontSize: 12, fontWeight: 800 }}>{serv.serviceName?.toUpperCase()}</span>
                            <span className="mono" style={{ color: C.accent, fontWeight: 700, fontSize: 10 }}>
                              ₹{parseInt(serv.startingPrice || "0").toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="body-copy" style={{ fontSize: 11.5, color: C.inkMid, lineHeight: 1.4, margin: "4px 0" }}>
                            {serv.description}
                          </p>
                          <div className="byline" style={{ fontSize: 7, color: C.inkFaint }}>
                            DELIVERY: {serv.deliveryTime?.toUpperCase()} // REVISIONS: {serv.revisionCount || 3} ALLOWED
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="italic-serif text-zinc-400 text-xs py-4 text-center">
                        No service specifications currently cataloged on the ledger.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFICIENCIES & BACKGROUND */}
          {activeTab === "proficiencies" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Spread Column: Skills & Tools proficiencies scale */}
              <div>
                <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ SKILLS TAG LEDGER</div>
                
                {isEditing ? (
                  <div style={{ marginBottom: 20 }}>
                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>PRIMARY CRITICAL SKILL</label>
                    <input
                      value={editPrimarySkill}
                      onChange={(e) => setEditPrimarySkill(e.target.value)}
                      style={{ width: "100%", padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 13, marginBottom: 12 }}
                      placeholder="DaVinci Resolve Colorist"
                    />

                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>SECONDARY DISCIPLINE TAGS (COMMA SEPARATED)</label>
                    <input
                      value={editSecondarySkills}
                      onChange={(e) => setEditSecondarySkills(e.target.value)}
                      style={{ width: "100%", padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 13, marginBottom: 12 }}
                      placeholder="Figma UI, Soundscapes"
                    />

                    <label className="byline" style={{ fontSize: 7, marginBottom: 4, display: "block" }}>GENERAL EXPERTISE TAGS (COMMA SEPARATED)</label>
                    <input
                      value={editSkillsTags}
                      onChange={(e) => setEditSkillsTags(e.target.value)}
                      style={{ width: "100%", padding: 6, border: `1px solid ${C.rule}`, background: "transparent", fontSize: 13 }}
                      placeholder="Video VFX, Pacing, Sound Editing"
                    />
                  </div>
                ) : (
                  <div style={{ marginBottom: 24, border: `1px solid ${C.rule}`, padding: 16, background: C.surface }}>
                    <div style={{ marginBottom: 14 }}>
                      <span className="byline" style={{ fontSize: 7, color: C.inkFaint }}>PRIMARY DISCIPLINE</span>
                      <div className="headline-sm" style={{ fontSize: 16, marginTop: 2 }}>{profile.primarySkill || "General Creative Practitioner"}</div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <span className="byline" style={{ fontSize: 7, color: C.inkFaint }}>SECONDARY FIELDS</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                        {profile.secondarySkills?.map((s, idx) => (
                          <span key={idx} className="mono" style={{ fontSize: 8, background: C.paper, padding: "2px 8px", border: `1px solid ${C.rule}` }}>{s}</span>
                        )) || <span className="italic-serif text-xs">None declared</span>}
                      </div>
                    </div>

                    <div>
                      <span className="byline" style={{ fontSize: 7, color: C.inkFaint }}>GENERAL SPECIALTIES</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                        {profile.skillsTags?.map((s, idx) => (
                          <span key={idx} className="mono" style={{ fontSize: 8, background: C.accentBg, color: C.accent, border: `1px solid ${C.rule}`, padding: "2px 8px" }}>{s}</span>
                        )) || <span className="italic-serif text-xs">None declared</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tools & Software proficiency scales */}
                <div style={{ border: `4px double ${C.ink}`, padding: 16, background: C.surface }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span className="byline" style={{ color: C.accent, fontSize: 8 }}>SPECIALIZED SOFTWARE PROFICIENCIES</span>
                    <span className="byline" style={{ fontSize: 7, color: C.inkFaint }}>TYPOGRAPHIC SCALE</span>
                  </div>

                  {isMe && !showAddTool && (
                    <button
                      onClick={() => setShowAddTool(true)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: `1px dashed ${C.accent}`,
                        color: C.accent,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8,
                        fontWeight: 700,
                        padding: "6px 0",
                        cursor: "pointer",
                        marginBottom: 16
                      }}
                    >
                      + REGISTER NEW TOOL CREDENTIAL
                    </button>
                  )}

                  {showAddTool && (
                    <form onSubmit={handleAddTool} style={{ border: `1px solid ${C.rule}`, padding: 10, marginBottom: 16, background: C.paper }}>
                      <div className="byline" style={{ fontSize: 7, color: C.accent, marginBottom: 8 }}>◆ ADD SOFTWARE TOOL</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <input
                          value={newToolName}
                          onChange={(e) => setNewToolName(e.target.value)}
                          placeholder="e.g. DaVinci Resolve"
                          style={{ width: "100%", fontSize: 11, padding: 4, background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}` }}
                          required
                        />
                        <select
                          value={newToolLevel}
                          onChange={(e) => setNewToolLevel(e.target.value)}
                          className="mono bg-transparent border-b border-rule p-1 text-[9px]"
                          style={{ color: C.ink }}
                        >
                          <option value="APPRENTICE">APPRENTICE (LEARNING)</option>
                          <option value="JOURNEYMAN">JOURNEYMAN (PROFICIENT)</option>
                          <option value="MAESTRO">MAESTRO (ADVANCED)</option>
                          <option value="GRANDMASTER">GRANDMASTER (EXPERT/EXCEPTIONAL)</option>
                        </select>
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <Btn variant="primary" style={{ fontSize: 7.5, padding: "4px 8px" }} onClick={(e) => handleAddTool(e as any)}>
                          SAVE TOOL
                        </Btn>
                        <Btn variant="ghost" style={{ fontSize: 7.5, padding: "4px 8px" }} onClick={() => setShowAddTool(false)}>
                          CANCEL
                        </Btn>
                      </div>
                    </form>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {profile.softwareList && profile.softwareList.length > 0 ? (
                      profile.softwareList.map((tool, idx) => {
                        const scoreMap: Record<string, number> = {
                          APPRENTICE: 25,
                          JOURNEYMAN: 50,
                          MAESTRO: 75,
                          GRANDMASTER: 100,
                          Expert: 75,
                          Master: 95,
                          Intermediate: 50
                        };
                        const normLevel = (tool.level === "Master" || tool.level === "Expert" || tool.level === "Intermediate") ? tool.level : tool.level.toUpperCase();
                        const percent = scoreMap[normLevel] || 50;
                        return (
                          <div key={idx}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                              <span className="headline-sm" style={{ fontSize: 12, fontWeight: 700 }}>{tool.name.toUpperCase()}</span>
                              <span className="mono" style={{ fontSize: 8.5, color: C.accent, fontWeight: 700 }}>
                                {normLevel}
                              </span>
                            </div>
                            <div style={{ height: 4, background: C.rule, position: "relative" }}>
                              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${percent}%`, background: C.ink }} />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="italic-serif text-zinc-400 text-xs py-4 text-center">
                        No software proficiencies cataloged.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Spread Column: Academic History, Certifications, and Work timeline */}
              <div>
                {/* Academic Achievements & Education */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span className="byline" style={{ color: C.accent }}>◆ ACADEMIC DEGREES</span>
                    {isMe && (
                      <button onClick={() => setShowAddEdu(true)} className="byline" style={{ background: "none", border: "none", color: C.ink, cursor: "pointer", textDecoration: "underline", fontSize: 7 }}>
                        + DECREE
                      </button>
                    )}
                  </div>

                  {showAddEdu && (
                    <form onSubmit={handleAddEdu} style={{ border: `1px solid ${C.rule}`, padding: 10, marginBottom: 14, background: C.paper }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <input value={newEduSchool} onChange={(e) => setNewEduSchool(e.target.value)} placeholder="School/University" className="text-xs p-1 bg-transparent border-b border-rule" required />
                        <input value={newEduDegree} onChange={(e) => setNewEduDegree(e.target.value)} placeholder="Degree Details" className="text-xs p-1 bg-transparent border-b border-rule" required />
                      </div>
                      <input value={newEduYear} onChange={(e) => setNewEduYear(e.target.value)} placeholder="Year (e.g. 2022)" className="text-xs p-1 bg-transparent border-b border-rule mb-2" />
                      <div style={{ display: "flex", gap: 6 }}>
                        <button type="submit" className="byline bg-ink text-white px-2 py-1 border-none cursor-pointer" style={{ fontSize: 7 }}>ADD</button>
                        <button type="button" onClick={() => setShowAddEdu(false)} className="byline bg-transparent px-2 py-1 border border-ink cursor-pointer" style={{ fontSize: 7 }}>CANCEL</button>
                      </div>
                    </form>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {profile.education?.map((edu, idx) => (
                      <div key={idx} style={{ borderBottom: `1px dotted ${C.rule}`, paddingBottom: 6 }}>
                        <div className="headline-sm" style={{ fontSize: 11, fontWeight: 700 }}>{edu.degree}</div>
                        <div className="byline" style={{ fontSize: 7.5, color: C.inkMid, marginTop: 2 }}>
                          {edu.school.toUpperCase()} · {edu.year}
                        </div>
                      </div>
                    )) || <span className="italic-serif text-xs opacity-50">No degrees filed.</span>}
                  </div>
                </div>

                {/* Certifications Ledger */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span className="byline" style={{ color: C.accent }}>◆ PLATFORM CERTIFICATIONS LEDGER</span>
                    {isMe && (
                      <button onClick={() => setShowAddCert(true)} className="byline" style={{ background: "none", border: "none", color: C.ink, cursor: "pointer", textDecoration: "underline", fontSize: 7 }}>
                        + CERTIFICATE
                      </button>
                    )}
                  </div>

                  {showAddCert && (
                    <form onSubmit={handleAddCert} style={{ border: `1px solid ${C.rule}`, padding: 10, marginBottom: 14, background: C.paper }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <input value={newCertName} onChange={(e) => setNewCertName(e.target.value)} placeholder="Cert Title" className="text-xs p-1 bg-transparent border-b border-rule" required />
                        <input value={newCertIssuer} onChange={(e) => setNewCertIssuer(e.target.value)} placeholder="Issuer Body" className="text-xs p-1 bg-transparent border-b border-rule" required />
                      </div>
                      <input value={newCertDate} onChange={(e) => setNewCertDate(e.target.value)} placeholder="Date Awarded" className="text-xs p-1 bg-transparent border-b border-rule mb-2" />
                      <div style={{ display: "flex", gap: 6 }}>
                        <button type="submit" className="byline bg-ink text-white px-2 py-1 border-none cursor-pointer" style={{ fontSize: 7 }}>ADD</button>
                        <button type="button" onClick={() => setShowAddCert(false)} className="byline bg-transparent px-2 py-1 border border-ink cursor-pointer" style={{ fontSize: 7 }}>CANCEL</button>
                      </div>
                    </form>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {profile.certifications?.map((cert, idx) => (
                      <div key={idx} style={{ borderBottom: `1px dotted ${C.rule}`, paddingBottom: 6 }}>
                        <div className="headline-sm" style={{ fontSize: 11, fontWeight: 700 }}>{cert.name.toUpperCase()}</div>
                        <div className="byline" style={{ fontSize: 7.5, color: C.inkMid, marginTop: 2 }}>
                          {cert.issuer.toUpperCase()} · AWARDED: {cert.date}
                        </div>
                      </div>
                    )) || <span className="italic-serif text-xs opacity-50">No certifications logged.</span>}
                  </div>
                </div>

                {/* Chronological Work History vertical dotted timeline */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span className="byline" style={{ color: C.accent }}>◆ CHRONOLOGICAL WORK TIMELINE</span>
                    {isMe && (
                      <button onClick={() => setShowAddWork(true)} className="byline" style={{ background: "none", border: "none", color: C.ink, cursor: "pointer", textDecoration: "underline", fontSize: 7 }}>
                        + EXPERIENCE
                      </button>
                    )}
                  </div>

                  {showAddWork && (
                    <form onSubmit={handleAddWork} style={{ border: `1px solid ${C.rule}`, padding: 12, marginBottom: 16, background: C.paper }}>
                      <div className="byline" style={{ fontSize: 7, color: C.accent, marginBottom: 8 }}>◆ ADD WORK EXPERIENCE</div>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <input value={newWorkCompany} onChange={(e) => setNewWorkCompany(e.target.value)} placeholder="Company Name" className="text-xs p-1 bg-transparent border-b border-rule" required />
                        <input value={newWorkRole} onChange={(e) => setNewWorkRole(e.target.value)} placeholder="Role / Title" className="text-xs p-1 bg-transparent border-b border-rule" required />
                      </div>
                      <input value={newWorkDuration} onChange={(e) => setNewWorkDuration(e.target.value)} placeholder="Duration (e.g. 2024 - Present)" className="text-xs p-1 bg-transparent border-b border-rule mb-2" required />
                      <textarea value={newWorkDesc} onChange={(e) => setNewWorkDesc(e.target.value)} placeholder="Scope & details of deliverables..." className="text-xs p-1 bg-transparent border border-rule mb-2 w-full h-16 resize-none" />
                      
                      <div style={{ display: "flex", gap: 6 }}>
                        <button type="submit" className="byline bg-ink text-white px-2 py-1 border-none cursor-pointer" style={{ fontSize: 7.5 }}>SAVE</button>
                        <button type="button" onClick={() => setShowAddWork(false)} className="byline bg-transparent px-2 py-1 border border-ink cursor-pointer" style={{ fontSize: 7.5 }}>CANCEL</button>
                      </div>
                    </form>
                  )}

                  <div style={{ borderLeft: `1px dotted ${C.rule}`, paddingLeft: 16, marginLeft: 6, display: "flex", flexDirection: "column", gap: 20 }}>
                    {profile.workHistory?.map((work, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        {/* Timeline dot */}
                        <div style={{ position: "absolute", left: -22, top: 4, width: 9, height: 9, borderRadius: "50%", background: C.accent, border: `2px solid ${C.paper}` }} />
                        <div className="byline" style={{ fontSize: 7.5, color: C.accent }}>{work.duration.toUpperCase()}</div>
                        <h4 className="headline-sm" style={{ fontSize: 13, fontWeight: 700, margin: "2px 0" }}>{work.role.toUpperCase()}</h4>
                        <div className="byline" style={{ fontSize: 8, color: C.inkMid }}>AT {work.company.toUpperCase()}</div>
                        <p className="body-copy" style={{ fontSize: 11.5, color: C.inkMid, lineHeight: 1.4, marginTop: 4 }}>
                          {work.description}
                        </p>
                      </div>
                    ))}
                    {(!profile.workHistory || profile.workHistory.length === 0) && (
                      <div className="italic-serif text-zinc-400 text-xs py-4">
                        No previous work history cataloged in timeline.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLLABORATIVE LEDGER */}
          {activeTab === "collaborations" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Radial trust score display */}
              <div style={{ border: `4px double ${C.ink}`, padding: 24, background: C.surface, textAlign: "center" }}>
                <div className="byline" style={{ color: C.accent, fontSize: 8, marginBottom: 20 }}>CREATIVE TRUST LEDGER RECORD</div>
                
                {/* SVG Radial Meter */}
                <div style={{ width: 140, height: 140, margin: "0 auto 16px", position: "relative" }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke={C.rule} strokeWidth="6" opacity="0.3" />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke={C.accent}
                      strokeWidth="6"
                      strokeDasharray="276"
                      strokeDashoffset={276 - (276 * (profile.creatorTrustScore || 96)) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className="headline-md" style={{ fontSize: 28, fontWeight: 800 }}>{profile.creatorTrustScore || 96}</div>
                    <div className="byline" style={{ fontSize: 6.5 }}>RATING SCORE</div>
                  </div>
                </div>

                <div className="headline-sm" style={{ fontSize: 16 }}>{profile.creatorTier?.toUpperCase() || "MASTER"} TRUST TIER</div>
                <p className="italic-serif text-[11px] text-zinc-500 mt-2 leading-relaxed">
                  "This creative partner is recognized by the ledger audit framework as an active verified creative."
                </p>

                {/* Factors breakdown */}
                <HR style={{ margin: "20px 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
                  {[
                    ["Dossier Completeness", profile.trustFactors?.profileCompletion || profileCompletion],
                    ["Portfolio Quality", profile.trustFactors?.portfolioQuality || 95],
                    ["Platform Response Rate", profile.trustFactors?.responseRate || 98],
                    ["Client Review Index", profile.trustFactors?.clientReviews || Math.round(averageRating * 20)],
                    ["Assignment Success", profile.trustFactors?.projectSuccessRate || 95]
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifycontent: "space-between", alignItems: "center" }}>
                      <span className="byline" style={{ fontSize: 7 }}>{k}</span>
                      <span className="mono" style={{ fontWeight: 700, fontSize: 9 }}>{v}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Columns: past collaborations and platform client reviews list */}
              <div className="md:col-span-2">
                {/* Platform Collaborations list */}
                <div style={{ marginBottom: 28 }}>
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ VERIFIED PARTNERSHIPS REGISTER</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {profile.collaborationHistory && profile.collaborationHistory.length > 0 ? (
                      profile.collaborationHistory.map((collab, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px dotted ${C.rule}`, paddingBottom: 6 }}>
                          <div>
                            <span className="headline-sm" style={{ fontSize: 11, fontWeight: 700 }}>{collab.projectName.toUpperCase()}</span>
                            <span className="byline" style={{ fontSize: 7, color: C.inkMid, marginLeft: 8 }}>WITH {collab.companyName.toUpperCase()}</span>
                          </div>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <span className="mono" style={{ fontSize: 8, color: C.success }}>{collab.projectStatus.toUpperCase()}</span>
                            <span className="byline" style={{ fontSize: 7, color: C.inkFaint }}>{collab.completionDate}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="italic-serif text-zinc-400 text-xs py-4">
                        No previous platform collaborations filed in this ledger.
                      </div>
                    )}
                  </div>
                </div>

                {/* Client Reviews Registry */}
                <div>
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ PLATFORM CLIENT REVIEWS REGISTRY ({profile.reviews?.length || 0})</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {profile.reviews && profile.reviews.length > 0 ? (
                      profile.reviews.map((rev) => (
                        <Card key={rev.id} style={{ padding: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <div>
                              <span className="headline-sm" style={{ fontSize: 12, fontWeight: 700 }}>{rev.projectName.toUpperCase()}</span>
                              <span className="byline" style={{ fontSize: 7.5, color: C.inkMid, marginLeft: 8 }}>BY {rev.creatorName.toUpperCase()}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={11} style={{ fill: i < rev.rating ? C.accent : "none", color: i < rev.rating ? C.accent : C.rule }} />
                              ))}
                            </div>
                          </div>
                          <p className="body-copy" style={{ fontSize: 12, fontStyle: "italic", color: C.inkMid, lineHeight: 1.4 }}>
                            "{rev.reviewText}"
                          </p>
                          <div className="byline" style={{ fontSize: 6.5, color: C.inkFaint, marginTop: 8, textAlign: "right" }}>
                            RECORDED INDEX DATE: {rev.date}
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="italic-serif text-zinc-400 text-xs py-4 text-center">
                        No client reviews indexed in ledger.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANALYTICS & ACTIVITY */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left columns (2 cols): Curve view analytics graph and chronological activity registry */}
              <div className="md:col-span-2">
                {/* SVG Curve Graph Card */}
                <Card style={{ padding: 20, marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <div className="byline" style={{ fontSize: 7.5 }}>ENGAGEMENT CURVE REPORT</div>
                      <h3 className="headline-sm" style={{ fontSize: 16, marginTop: 2 }}>PROFILE VIEWS & LIKES ANALYTICS</h3>
                    </div>
                    {/* Filter buttons */}
                    <div style={{ display: "flex", gap: 4 }}>
                      {["daily", "weekly", "monthly", "yearly"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setAnalyticsFilter(f as any)}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 7.5,
                            padding: "2px 8px",
                            background: analyticsFilter === f ? C.ink : "transparent",
                            color: analyticsFilter === f ? C.white : C.inkFaint,
                            border: `1px solid ${C.rule}`,
                            cursor: "pointer"
                          }}
                        >
                          {f.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG graph container */}
                  <div style={{ width: "100%" }}>
                    <SVGAnalyticsGraph filter={analyticsFilter} />
                  </div>

                  {/* Legends */}
                  <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, background: C.ink }} />
                      <span className="byline" style={{ fontSize: 7 }}>TOTAL PROFILE VIEWS</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, background: C.accent }} />
                      <span className="byline" style={{ fontSize: 7 }}>PORTFOLIO LIKES ACCRUAL</span>
                    </div>
                  </div>
                </Card>

                {/* Chronological Activity timeline */}
                <div>
                  <div className="byline" style={{ marginBottom: 12, color: C.accent }}>◆ CHRONOLOGICAL PLATFORM ACTIVITY LOG</div>
                  <div style={{ borderLeft: `1px dotted ${C.rule}`, paddingLeft: 16, marginLeft: 6, display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { type: "upload", title: "PORTFOLIO LEDGER ACCRUAL", desc: `Successfully cataloged portfolio entry: "${profile.portfolio?.[0]?.title || 'Mumbai Stills'}" in database archive.`, time: "2 Hours ago" },
                      { type: "follow", title: "PARTNERSHIP CORRESPONDENCE UPDATE", desc: "A recruiting partner followed your creative dispatch registry feed.", time: "1 Day ago" },
                      { type: "achievement", title: "CREATIVE TIER ADVANCEMENT", desc: `Awarded verified platform ${profile.creatorTier || 'Master'} Trust Tier credentials after successful contract compliance audits.`, time: "3 Days ago" },
                      { type: "review", title: "CLIENT RATED DISPATCH RATING INDEXED", desc: "Indexed perfect 5-star verified rated review from corporate client in collaborative database.", time: "1 Week ago" }
                    ].map((evt, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: -21, top: 4, width: 7, height: 7, borderRadius: "50%", background: C.accent }} />
                        <div className="byline" style={{ fontSize: 7.5, color: C.accent }}>{evt.title}</div>
                        <p className="body-copy" style={{ fontSize: 11.5, color: C.inkMid, lineHeight: 1.4, margin: "2px 0" }}>
                          {evt.desc}
                        </p>
                        <span className="byline" style={{ fontSize: 6.5, opacity: 0.5 }}>{evt.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Future-ready placeholder panels */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="byline" style={{ color: C.accent }}>◆ FUTURE PLATFORM AGREEMENTS PREVIEW</div>

                {/* Placeholders */}
                {[
                  { title: "Escrow Protective Channels", desc: "Platform automatic smart contracts escrow. Lock deposit budgets to Rupees INR in trust reserves before starting assignments. Safeguards creator dispatch deliverables payments.", badge: "UNDER DEPLOYMENT" },
                  { title: "AI-Powered Talent Matching", desc: "Analytical recommendations. Match software proficiencies and years of experience automatically against corporate open opportunities budgets. High correspondence recommendations.", badge: "BETA MODEL" },
                  { title: "Active Platforms Contracts", desc: "Manage verified active assignments and deliverables ledgers in real-time. Transparent milestones progress reporting.", badge: "WIRE CHANNELS" },
                  { title: "Artisan Rankings Leaderboard", desc: "Global and regional percentile rankings compiled monthly based on creative trust scores and verified portfolio plate accruals.", badge: "SYSTEM REGISTRY" }
                ].map((item, idx) => (
                  <div key={idx} style={{ border: `1px solid ${C.rule}`, padding: 14, background: C.surface, position: "relative" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span className="headline-sm" style={{ fontSize: 11, fontWeight: 700 }}>{item.title.toUpperCase()}</span>
                      <span className="mono" style={{ fontSize: 6, background: C.accentBg, color: C.accent, padding: "1px 5px", border: `1.5px solid ${C.accent}` }}>{item.badge}</span>
                    </div>
                    <p className="body-copy" style={{ fontSize: 11, color: C.inkFaint, lineHeight: 1.4, fontStyle: "italic" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <HR thick style={{ marginTop: 40, marginBottom: 20 }} />
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <div className="byline" style={{ opacity: 0.3 }}>— END OF DOSSIER —</div>
      </div>
    </div>
  );
}

// ── SVG Analytics Graph Helper Component ────────────────────────────────────────
function SVGAnalyticsGraph({ filter }: { filter: "daily" | "weekly" | "monthly" | "yearly" }) {
  const dataMap = {
    daily: {
      labels: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
      views: [30, 20, 12, 35, 95, 130, 105, 140, 180, 150, 80, 45],
      likes: [5, 3, 2, 8, 28, 35, 29, 38, 55, 42, 18, 10]
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      views: [450, 520, 610, 480, 590, 720, 680],
      likes: [120, 145, 190, 130, 175, 240, 210]
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      views: [1800, 2100, 2450, 2200],
      likes: [550, 680, 890, 710]
    },
    yearly: {
      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      views: [5200, 6100, 7100, 8200, 9400, 11200],
      likes: [1800, 2300, 2900, 3400, 4100, 5100]
    }
  };

  const current = dataMap[filter];
  const maxViews = Math.max(...current.views) * 1.15;
  const maxLikes = Math.max(...current.likes) * 1.15;

  const w = 500;
  const h = 180;
  const padLeft = 40;
  const padBottom = 25;
  const padTop = 15;
  const padRight = 15;

  const graphW = w - padLeft - padRight;
  const graphH = h - padTop - padBottom;

  const getViewsCoords = () => {
    return current.views.map((v, i) => {
      const x = padLeft + (i / (current.views.length - 1)) * graphW;
      const y = padTop + (1 - v / maxViews) * graphH;
      return { x, y };
    });
  };

  const getLikesCoords = () => {
    return current.likes.map((l, i) => {
      const x = padLeft + (i / (current.likes.length - 1)) * graphW;
      const y = padTop + (1 - l / maxLikes) * graphH;
      return { x, y };
    });
  };

  const viewsCoords = getViewsCoords();
  const likesCoords = getLikesCoords();

  const viewsPath = viewsCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const likesPath = likesCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');

  const viewsFill = viewsCoords.length ? `${viewsPath} L ${viewsCoords[viewsCoords.length - 1].x} ${h - padBottom} L ${padLeft} ${h - padBottom} Z` : "";
  const likesFill = likesCoords.length ? `${likesPath} L ${likesCoords[likesCoords.length - 1].x} ${h - padBottom} L ${padLeft} ${h - padBottom} Z` : "";

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ background: C.surface, border: `1px solid ${C.rule}` }}>
      <defs>
        <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.ink} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.ink} stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="likesGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      
      {/* Gridlines */}
      {Array.from({ length: 4 }).map((_, idx) => {
        const y = padTop + (idx / 3) * graphH;
        return (
          <line key={idx} x1={padLeft} y1={y} x2={w - padRight} y2={y} stroke={C.rule} strokeWidth="0.5" strokeDasharray="3 3" />
        );
      })}

      {/* Paths */}
      {viewsFill && <path d={viewsFill} fill="url(#viewsGrad)" />}
      {likesFill && <path d={likesFill} fill="url(#likesGrad)" />}

      <path d={viewsPath} fill="none" stroke={C.ink} strokeWidth="2" />
      <path d={likesPath} fill="none" stroke={C.accent} strokeWidth="2" />

      {/* Dots & Labels */}
      {viewsCoords.map((c, i) => (
        <circle key={`v-${i}`} cx={c.x} cy={c.y} r="3" fill={C.ink} stroke={C.paper} strokeWidth="1" />
      ))}
      {likesCoords.map((c, i) => (
        <circle key={`l-${i}`} cx={c.x} cy={c.y} r="3" fill={C.accent} stroke={C.paper} strokeWidth="1" />
      ))}

      {/* Bottom X Labels */}
      {current.labels.map((lbl, i) => {
        const x = padLeft + (i / (current.labels.length - 1)) * graphW;
        return (
          <text key={i} x={x} y={h - 8} fontSize="7" fontFamily="'JetBrains Mono', monospace" fill={C.inkFaint} textAnchor="middle">
            {lbl.toUpperCase()}
          </text>
        );
      })}

      {/* Y Axis Numbers */}
      <text x={padLeft - 6} y={padTop + 4} fontSize="6" fontFamily="'JetBrains Mono', monospace" fill={C.inkFaint} textAnchor="end">
        {Math.round(maxViews)}
      </text>
      <text x={padLeft - 6} y={padTop + graphH + 4} fontSize="6" fontFamily="'JetBrains Mono', monospace" fill={C.inkFaint} textAnchor="end">
        0
      </text>
    </svg>
  );
}

function ProfilePage({
  creator,
  setPage,
  setActiveConvoId,
  currentUser,
  onUpdate,
  wrapApi,
  onLightbox,
}: {
  creator: Creator | null;
  setPage: (p: string) => void;
  setActiveConvoId: (id: string) => void;
  currentUser: User | null;
  onUpdate?: (u: any) => void;
  wrapApi?: <T>(fn: () => Promise<T>) => Promise<T>;
  onLightbox?: (url: string, type: "image" | "video") => void;
}) {
  const [profile, setProfile] = useState<Creator | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editQuote, setEditQuote] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editRate, setEditRate] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editProfilePic, setEditProfilePic] = useState("");
  const [editFollowers, setEditFollowers] = useState(0);
  const [editProjects, setEditProjects] = useState(0);
  const [editPortfolio, setEditPortfolio] = useState<PortfolioItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [hiring, setHiring] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState("");
  const [newPortUrl, setNewPortUrl] = useState("");
  const [newPortType, setNewPortType] = useState<"image" | "video">("image");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const portFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (creator) setProfile(creator);
    else if (currentUser) {
      setProfile({
        _id: currentUser._id,
        name: currentUser.name,
        role: currentUser.role,
        bio: currentUser.bio || "Dossier pending update.",
        quote: currentUser.quote || "True excellence is not a single dispatch, but the cumulative ledger of one's creative output.",
        location: currentUser.location || "Location redacted",
        skills: currentUser.skills || [],
        followers: currentUser.followers || 0,
        projects: currentUser.projects || 0,
        rate: currentUser.rate || "Contact for rate",
        profilePic: currentUser.profilePic,
        portfolio: currentUser.portfolio || [],
        userType: currentUser.userType || "creator",
        companyLogo: currentUser.companyLogo,
        companyBanner: currentUser.companyBanner,
        verified: currentUser.verified,
        industry: currentUser.industry,
        companySize: currentUser.companySize,
        foundedYear: currentUser.foundedYear,
        website: currentUser.website,
        linkedin: currentUser.linkedin,
        instagram: currentUser.instagram,
        missionStatement: currentUser.missionStatement,
        servicesOffered: currentUser.servicesOffered,
        companyStats: currentUser.companyStats,
        hiringTrust: currentUser.hiringTrust,
        opportunities: currentUser.opportunities,
        portfolioShowcase: currentUser.portfolioShowcase,
        collaborations: currentUser.collaborations,
        reviews: currentUser.reviews,
        hiringPreferences: currentUser.hiringPreferences
      });
      setEditBio(currentUser.bio || "");
      setEditQuote(currentUser.quote || "");
      setEditLocation(currentUser.location || "");
      setEditRate(currentUser.rate || "");
      setEditSkills(currentUser.skills?.join(", ") || "");
      setEditName(currentUser.name || "");
      setEditRole(currentUser.role || "");
      setEditProfilePic(currentUser.profilePic || "");
      setEditFollowers(currentUser.followers || 0);
      setEditProjects(currentUser.projects || 0);
      setEditPortfolio(currentUser.portfolio || []);
    }
  }, [creator, currentUser]);

  useEffect(() => {
    if (profile) setEditPortfolio(profile.portfolio || []);
  }, [profile]);

  useEffect(() => {
    if (profile && currentUser) {
      setFollowing(currentUser.following?.includes(profile._id) || false);
    }
  }, [profile, currentUser]);

  const handleMsg = async () => {
    if (!profile) return;
    const convo = await (wrapApi
      ? wrapApi(() => api.startConversation(profile._id))
      : api.startConversation(profile._id));
    setActiveConvoId(convo._id);
    setPage("Messages");
  };

  const handleFollow = async () => {
    if (!profile || !currentUser) return;
    setFollowLoading(true);
    try {
      const res = await api.followUser(profile._id);
      setFollowing(!following);
      setProfile({ ...profile, followers: res.followers });
      onUpdate?.({ ...currentUser, following: res.following });
    } catch (err) {
      console.error("Follow failed:", err);
    }
    setFollowLoading(false);
  };

  const handleHire = async () => {
    if (!profile) return;
    setHiring(true);
    try {
      await api.hireUser(profile._id);
      alert("Proposal dispatched to correspondent registry.");
    } catch (e) {
      console.error("Hire failed", e);
    }
    setHiring(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const skillsArr = editSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const updated = await (wrapApi
        ? wrapApi(() =>
          api.updateMe({
            name: editName,
            role: editRole,
            bio: editBio,
            quote: editQuote,
            location: editLocation,
            rate: editRate,
            followers: editFollowers,
            projects: editProjects,
            skills: skillsArr,
            profilePic: editProfilePic,
            portfolio: editPortfolio,
          }),
        )
        : api.updateMe({
          name: editName,
          role: editRole,
          bio: editBio,
          quote: editQuote,
          location: editLocation,
          rate: editRate,
          followers: editFollowers,
          projects: editProjects,
          skills: skillsArr,
          profilePic: editProfilePic,
          portfolio: editPortfolio,
        }));
      onUpdate?.(updated);
      setProfile({
        ...profile!,
        name: updated.name,
        role: updated.role,
        bio: updated.bio,
        quote: updated.quote,
        location: updated.location,
        rate: updated.rate,
        followers: updated.followers,
        projects: updated.projects,
        skills: updated.skills,
        profilePic: updated.profilePic,
        portfolio: updated.portfolio,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
    setSaving(false);
  };

  const onProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setEditProfilePic(compressed);
    };
    reader.readAsDataURL(file);
  };

  const onPortFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const url = ev.target?.result as string;
      const compressed = file.type.startsWith("image/") ? await compressImage(url) : url;
      setNewPortUrl(compressed);
    };
    reader.readAsDataURL(file);
  };

  if (!profile) return null;

  if (profile.userType !== "recruiter") {
    return (
      <CreatorDossierLayout
        profile={profile}
        currentUser={currentUser}
        setPage={setPage}
        setActiveConvoId={setActiveConvoId}
        onUpdate={(updatedUser) => {
          setProfile(updatedUser);
          onUpdate?.(updatedUser);
        }}
        wrapApi={wrapApi}
        onLightbox={onLightbox}
      />
    );
  }

  if (profile.userType === "recruiter") {
    return (
      <RecruiterProfilePage
        profile={profile}
        currentUser={currentUser}
        setPage={setPage}
        setActiveConvoId={setActiveConvoId}
        onUpdate={(updatedUser) => {
          setProfile(updatedUser);
          onUpdate?.(updatedUser);
        }}
        wrapApi={wrapApi}
        onLightbox={onLightbox}
      />
    );
  }

  const isMe = currentUser?._id === profile._id;

  const checklist = [
    { label: "IDENTITY DEFINED", done: !!profile.name && profile.name !== "NEW ARCHIVE CREATOR" },
    { label: "ROLE ASSIGNED", done: !!profile.role && profile.role !== "FIELD OPERATIVE" },
    { label: "BIOGRAPHICAL DATA", done: !!profile.bio && profile.bio.length > 10 },
    { label: "VISUAL DESIGNEE", done: !!profile.profilePic },
    { label: "FISCAL VALUATION", done: !!profile.rate },
    { label: "SKILL REPERTOIRE", done: (profile.skills?.length || 0) > 0 },
    { label: "ARCHIVE SAMPLES", done: (profile.portfolio?.length || 0) > 0 },
  ];

  const completedCount = checklist.filter((i) => i.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Ink
            name={profile.name}
            size={100}
            color={C.accent}
            src={isEditing ? editProfilePic : profile.profilePic}
          />
          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                background: C.ink,
                color: C.white,
                border: "none",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={14} />
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={onProfilePicChange}
          />
        </div>
        {isEditing ? (
          <div style={{ marginTop: 20, maxWidth: 400, margin: "20px auto 0" }}>
            <Field
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Full Name"
              style={{
                textAlign: "center",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "'Bodoni Moda', serif",
              }}
            />
            <Field
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              placeholder="e.g. Video Editor"
              style={{
                textAlign: "center",
                fontSize: 12,
                marginTop: 8,
                letterSpacing: "0.2em",
              }}
            />
          </div>
        ) : (
          <>
            <h1
              className="headline-xl"
              style={{ margin: "20px 0 8px", fontSize: 42 }}
            >
              {profile.name.toUpperCase()}
            </h1>
            <div
              className="byline"
              style={{ letterSpacing: "0.6em", color: C.accent }}
            >
              {profile.role}
            </div>
          </>
        )}
        <div className="italic-serif text-sm mt-4 opacity-60">
          Credential Hash: {profile._id.slice(-8).toUpperCase()}
        </div>
        <HR thick style={{ marginTop: 32 }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 50,
          marginBottom: 60,
        }}
      >
        <div>
          <div className="byline" style={{ marginBottom: 16 }}>
            CORRESPONDENT DOSSIER
          </div>
          {isEditing ? (
            <div style={{ marginBottom: 20 }}>
              <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>LOCATION</div>
              <Field
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="e.g. London, UK"
                style={{ fontSize: 13 }}
              />
              <div className="byline" style={{ fontSize: 8, marginBottom: 4, marginTop: 12 }}>BIOGRAPHICAL DATA</div>
              <Field
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Biographical notes..."
                multiline
                rows={4}
                style={{ fontSize: 15, fontStyle: "normal" }}
              />
            </div>
          ) : (
            <>
              <div className="mono" style={{ fontSize: 10, color: C.accent, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={10} /> {profile.location || "LOCATION UNKNOWN"}
              </div>
              <p className="body-copy drop-cap" style={{ fontSize: 15, lineHeight: 1.6, color: C.inkMid }}>
                {profile.bio}
              </p>
            </>
          )}

          {/* Render Skills Tag Ledger in Non-editing view */}
          {!isEditing && profile.skills && profile.skills.length > 0 && (
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <div className="byline" style={{ marginBottom: 12, color: C.accent, fontSize: 8, letterSpacing: '0.12em' }}>
                ◆ EXPERTISE SPECIALIZATIONS REGISTERED
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {profile.skills.map((s) => (
                  <span
                    key={s}
                    className="mono"
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: C.paper,
                      color: C.ink,
                      border: `1px solid ${C.rule}`,
                      padding: "4px 10px",
                      letterSpacing: '0.05em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.accent }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pull-quote" style={{ marginTop: 24 }}>
            {isEditing ? (
              <div>
                <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>PERSONAL CREDO / QUOTE</div>
                <Field
                  value={editQuote}
                  onChange={(e) => setEditQuote(e.target.value)}
                  placeholder="Insert mission statement..."
                  multiline
                  rows={2}
                  style={{ fontSize: 18, fontStyle: "italic", border: 'none', padding: 0 }}
                />
              </div>
            ) : (
              `"${profile.quote || "True excellence is not a single dispatch, but the cumulative ledger of one's creative output. My work is my testimony."}"`
            )}
          </div>
        </div>
        <div>
          <div className="byline" style={{ marginBottom: 16 }}>
            VALUATION METRICS
          </div>
          <div style={{ marginBottom: 28 }}>
            {[
              ["Followers", isEditing ? editFollowers : profile.followers],
              ["Plates Filed", isEditing ? editPortfolio.length : profile.projects],
              ["Contract Rate", isEditing ? "RATE BELOW" : profile.rate],
              ["Status", "ACTIVE"],
              ["Report Status", progressPercent >= 100 ? "VERIFIED" : "PROVISIONAL"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${C.rule}`,
                }}
              >
                <span className="byline" style={{ fontSize: 8 }}>
                  {k}
                </span>
                <span
                  className="headline-sm"
                  style={{
                    fontSize: 11,
                    color: k === "Status" ? C.success : C.ink,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {isMe && progressPercent < 100 && (
            <div
              style={{
                border: `1px solid ${C.rule}`,
                padding: 16,
                background: `${C.rule}33`,
                marginBottom: 32,
              }}
            >
              <div className="byline" style={{ marginBottom: 12, color: C.accent }}>
                PROFILE INTEGRITY REPORT
              </div>
              <div
                style={{
                  height: 4,
                  background: C.rule,
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: C.accent,
                    width: `${progressPercent}%`,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {checklist.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      opacity: item.done ? 0.4 : 1,
                    }}
                  >
                    {item.done ? (
                      <CheckCircle2 size={10} color={C.success} />
                    ) : (
                      <Circle size={10} color={C.inkFaint} />
                    )}
                    <span
                      className="mono"
                      style={{
                        fontSize: 8,
                        textDecoration: item.done ? "line-through" : "none",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div
                  className="byline"
                  style={{ fontSize: 8, marginBottom: 4 }}
                >
                  RATE
                </div>
                <Field
                  value={editRate}
                  onChange={(e) => setEditRate(e.target.value)}
                  placeholder="e.g. ₹3,500/hr"
                />
              </div>
              <div>
                <div
                  className="byline"
                  style={{ fontSize: 8, marginBottom: 4 }}
                >
                  SKILLS (COMMA SEPARATED)
                </div>
                <Field
                  value={editSkills}
                  onChange={(e) => setEditSkills(e.target.value)}
                  placeholder="Premiere Pro, DaVinci..."
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <Btn fullWidth onClick={saveProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save Dossier"}
                </Btn>
                <Btn
                  fullWidth
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Btn>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {isMe ? (
                <Btn
                  fullWidth
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                >
                  Revise Dossier →
                </Btn>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <Btn
                    fullWidth
                    onClick={handleMsg}
                    style={{ padding: "12px 0" }}
                  >
                    Establish Correspondence →
                  </Btn>
                  <Btn
                    fullWidth
                    variant="success"
                    onClick={handleHire}
                    disabled={hiring}
                    style={{ padding: "12px 0" }}
                  >
                    {hiring ? "Sending Proposal..." : "◆ Propose Assignment"}
                  </Btn>
                  <Btn
                    fullWidth
                    variant={following ? "ghost" : "primary"}
                    onClick={handleFollow}
                    disabled={followLoading}
                    style={{ padding: "12px 0" }}
                  >
                    {following ? "◆ Unfollow Dispatch" : "◇ Follow Dispatch"}
                  </Btn>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-20">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Tag red>Archives & Artifacts</Tag>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>
            THE PORTFOLIO LEDGER
          </h2>
          <HR style={{ width: 100, margin: "16px auto" }} />
        </div>

        {isEditing && (
          <Card
            style={{
              padding: 24,
              marginBottom: 32,
              border: `2px dashed ${C.rule}`,
            }}
          >
            <div className="byline" style={{ marginBottom: 16 }}>
              ADD NEW ARCHIVE ENTRY
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                  TITLE
                </div>
                <Field
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  placeholder="e.g. Artifact 05"
                />
              </div>
              <div>
                <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                  TYPE & MEDIA
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <select
                    value={newPortType}
                    onChange={(e) => {
                      setNewPortType(e.target.value as "image" | "video");
                      setNewPortUrl("");
                    }}
                    className="mono bg-transparent border-b border-rule p-2 text-[10px]"
                    style={{ color: C.ink }}
                  >
                    <option value="image">IMAGE</option>
                    <option value="video">VIDEO</option>
                  </select>
                  <Btn
                    variant="ghost"
                    onClick={() => portFileInputRef.current?.click()}
                    style={{ fontSize: 10, padding: "0 10px" }}
                  >
                    Upload File
                  </Btn>
                </div>
                <input
                  type="file"
                  ref={portFileInputRef}
                  hidden
                  accept={newPortType === "image" ? "image/*" : "video/*"}
                  onChange={onPortFileChange}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className="byline" style={{ fontSize: 8, marginBottom: 4 }}>
                OR EXTERNAL URL
              </div>
              <Field
                value={newPortUrl}
                onChange={(e) => setNewPortUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            {/* Media Upload Live Preview */}
            {newPortUrl && (
              <div style={{ marginTop: 16, marginBottom: 16, border: `1px solid ${C.rule}`, background: C.paper, padding: 12 }}>
                <div className="byline" style={{ fontSize: 7, color: C.accent, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ◆ ASSET PREVIEW LOADED (LEDGER READY)
                </div>
                <div style={{ height: 130, overflow: 'hidden', border: `1px solid ${C.rule}`, background: C.white, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {newPortType === 'image' ? (
                    <img src={newPortUrl} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  ) : (
                    <video src={newPortUrl} style={{ maxHeight: '100%', maxWidth: '100%' }} muted controls />
                  )}
                </div>
                <div className="italic-serif text-[10px] mt-2 text-zinc-500 text-center">
                  {newPortUrl.startsWith('data:') ? "✓ Local file read successfully" : `✓ Linked to external URI: ${newPortUrl.substring(0, 45)}...`}
                </div>
              </div>
            )}

            <Btn
              onClick={() => {
                if (newPortTitle && newPortUrl) {
                  setEditPortfolio([
                    ...editPortfolio,
                    {
                      id: String(Date.now()),
                      title: newPortTitle,
                      type: newPortType,
                      url: newPortUrl,
                    },
                  ]);
                  setNewPortTitle("");
                  setNewPortUrl("");
                }
              }}
            >
              + Add to Ledger
            </Btn>
          </Card>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {(isEditing ? editPortfolio : profile.portfolio || []).map((item) => (
            <div key={item.id} style={{ position: "relative" }}>
              <Hoarding
                url={item.url}
                type={item.type as any}
                label={item.title}
                caption={`${item.type.toUpperCase()} dispatch attributed to ${profile.name}'s archive.`}
                onLightbox={onLightbox}
              />
              {isEditing && (
                <button
                  onClick={() =>
                    setEditPortfolio(editPortfolio.filter((p) => p.id !== item.id))
                  }
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    background: C.accent,
                    color: C.white,
                    border: "none",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {!isEditing &&
            (!profile.portfolio || profile.portfolio.length === 0) && (
              <div className="col-span-2 italic-serif text-center py-20 opacity-40">
                No archives currently filed for this correspondent.
              </div>
            )}
        </div>
      </div>

      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <div className="byline" style={{ opacity: 0.3 }}>
          — END OF DOSSIER —
        </div>
      </div>
    </div>
  );
}

const Lightbox = ({
  url,
  type,
  onClose,
}: {
  url: string;
  type: "image" | "video";
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 2000,
      background: "rgba(0,0,0,0.92)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    }}
    onClick={onClose}
  >
    <button
      onClick={onClose}
      style={{
        position: "absolute",
        top: 24,
        right: 24,
        color: "white",
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 2001,
      }}
    >
      <X size={32} />
    </button>
    <div
      style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
      onClick={(e) => e.stopPropagation()}
    >
      {type === "video" ? (
        <video
          src={url}
          controls
          autoPlay
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        />
      ) : (
        <img
          src={url}
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        />
      )}
    </div>
  </motion.div>
);

const compressImage = (base64Str: string, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith("data:image/")) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
  });
};

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => sessionStorage.getItem("artwithin_page") || "Home");
  const [user, setUser] = useState<User | null>(null);
  const [lightbox, setLightbox] = useState<{
    url: string;
    type: "image" | "video";
  } | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(() => {
    const saved = sessionStorage.getItem("artwithin_selectedCreator");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [activeConvoId, setActiveConvoId] = useState(() => sessionStorage.getItem("artwithin_activeConvoId") || "");
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [incomingMsg, setIncomingMsg] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [unreadConvos, setUnreadConvos] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ title: string; text: string; conversationId: string } | null>(null);

  const pageRef = useRef(page);
  const activeConvoIdRef = useRef(activeConvoId);
  useEffect(() => { pageRef.current = page; }, [page]);
  useEffect(() => { activeConvoIdRef.current = activeConvoId; }, [activeConvoId]);

  useEffect(() => {
    if (page === "Messages" && activeConvoId) {
      setUnreadConvos((prev) => {
        if (prev.has(activeConvoId)) {
          const n = new Set(prev);
          n.delete(activeConvoId);
          return n;
        }
        return prev;
      });
    }
  }, [page, activeConvoId]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    sessionStorage.setItem("artwithin_page", page);
  }, [page]);

  useEffect(() => {
    if (selectedCreator) {
      sessionStorage.setItem("artwithin_selectedCreator", JSON.stringify(selectedCreator));
    } else {
      sessionStorage.removeItem("artwithin_selectedCreator");
    }
  }, [selectedCreator]);

  useEffect(() => {
    sessionStorage.setItem("artwithin_activeConvoId", activeConvoId);
  }, [activeConvoId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .getMe()
        .then((u) => {
          setUser(u);
          if (!u.onboarded && !localStorage.getItem(`onboarded_${u._id}`))
            setShowOnboarding(true);
          setupWS(token);
        })
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }
  }, []);

  const wrapApi = async (fn: () => Promise<any>) => {
    setGlobalLoading(true);
    try {
      const res = await fn();
      return res;
    } finally {
      setTimeout(() => setGlobalLoading(false), 150); // Small delay for visual impact
    }
  };

  const setupWS = (token: string) => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}`);
    ws.onopen = () => ws.send(JSON.stringify({ type: "auth", token }));
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "message") {
        setIncomingMsg(data);
        const isCurrentlyLooking = pageRef.current === "Messages" && activeConvoIdRef.current === data.conversationId;
        if (!isCurrentlyLooking) {
          setUnreadConvos((prev) => {
            const n = new Set(prev);
            n.add(data.conversationId);
            return n;
          });
          setToast({
            title: `New message from ${data.senderName || "someone"}`,
            text: data.msg.text,
            conversationId: data.conversationId
          });
        }
      }
    };
    ws.onclose = () => {
      setTimeout(() => {
        setupWS(token);
      }, 3000);
    };
    ws.onerror = () => {
      ws.close();
    };
  };

  const handleAuth = async (u: User, token: string) => {
    await wrapApi(async () => {
      localStorage.setItem("token", token);
      setUser(u);
      if (!u.onboarded && !localStorage.getItem(`onboarded_${u._id}`)) setShowOnboarding(true);
      setupWS(token);
    });
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setPage("Home");
    setSelectedCreator(null);
    setActiveConvoId("");
  };

  if (!authChecked)
    return (
      <>
        <style>{G}</style>
        <div
          className="paper-grain"
          style={{
            position: "fixed",
            inset: 0,
            background: C.paper,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Spectral', serif",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: `2px solid ${C.rule}`,
                borderTopColor: C.accent,
                borderRightColor: C.accent,
              }}
            />
            {/* Inner pulsing Monogram */}
            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                position: "absolute",
                fontFamily: "'Bodoni Moda', serif",
                fontSize: 32,
                fontWeight: 800,
                color: C.ink,
                letterSpacing: "-0.05em",
              }}
            >
              AW
            </motion.div>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="byline"
            style={{
              marginTop: 24,
              color: C.accent,
              fontWeight: 700,
              letterSpacing: "0.25em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Initializing Registry Dossier…
          </motion.div>
        </div>
      </>
    );
  if (!user)
    return (
      <>
        <style>{G}</style>
        <AnimatePresence>
          {globalLoading && <NewspaperLoading />}
        </AnimatePresence>
        <AuthPage onAuth={handleAuth} wrapApi={wrapApi} />
      </>
    );

  return (
    <>
      <style>{G}</style>
      <div
        className="paper-grain"
        style={{ minHeight: "100vh", background: C.paper }}
      >
        <AnimatePresence>
          {showOnboarding && user && (
            <OnboardingTour
              currentUser={user}
              onUpdate={setUser}
              onComplete={() => {
                setShowOnboarding(false);
                setPage("Home");
                localStorage.setItem(`onboarded_${user._id}`, "true");
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {globalLoading && <NewspaperLoading />}
        </AnimatePresence>

        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: C.paper,
            borderBottom: `1px solid ${C.rule}`,
          }}
        >
          <div style={{ height: 4, background: C.accent }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 32px",
              borderBottom: `1px solid ${C.rule}`,
            }}
          >
            <div className="byline">
              {new Date()
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
                .toUpperCase()}
            </div>
            <div
              className="headline-xl"
              style={{
                fontSize: 42,
                letterSpacing: "0.15em",
                cursor: "pointer",
                lineHeight: 1,
                margin: "10px 0",
                fontWeight: 800,
              }}
              onClick={() => setPage("Home")}
            >
              ARTWITHIN
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right" }}>
                <div className="headline-sm" style={{ fontSize: 13 }}>
                  {user.name}
                </div>
                <div className="byline" style={{ fontSize: 8 }}>
                  {user.role}
                </div>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedCreator(null);
                  setPage("Profile");
                }}
              >
                <Ink name={user.name} size={34} src={user.profilePic} />
              </div>
              <button
                onClick={logout}
                className="byline"
                style={{
                  padding: "4px 10px",
                  border: `1px solid ${C.rule}`,
                  background: "none",
                  cursor: "pointer",
                }}
              >
                EXIT
              </button>
            </div>
          </div>
          {/* Centered Search Sub-Row directly above navigation options */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "8px 32px 14px",
              borderBottom: `1px solid ${C.line}`,
              background: C.paper,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: `1px solid ${C.rule}`,
                padding: "6px 12px",
                background: C.white,
                height: 32,
                width: "100%",
                maxWidth: 480,
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <Search size={13} color={C.inkFaint} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the talent ledger & dispatches…"
                style={{
                  border: "none",
                  background: "transparent",
                  fontStyle: "italic",
                  fontSize: 11,
                  width: "100%",
                  outline: "none",
                  color: C.ink,
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: C.inkFaint,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 32px",
            }}
          >
            {["Home", "Explore", "Messages", "Dashboard", "Profile"].map(
              (p) => (
                <button
                  key={p}
                  className={`nav-btn${page === p ? " active" : ""}`}
                  onClick={() => {
                    if (p === "Profile") setSelectedCreator(null);
                    setPage(p);
                  }}
                  style={{ position: "relative" }}
                >
                  {p}
                  {p === "Messages" && unreadConvos.size > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 8,
                        width: 6,
                        height: 6,
                        background: C.accent,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </button>
              ),
            )}
          </div>
        </header>

        <main
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "24px 32px 80px",
            display: "grid",
            gridTemplateColumns:
              page === "Home" || page === "Explore" || page === "Profile"
                ? "1fr 280px"
                : "1fr",
            gap: 32,
          }}
        >
          <div style={{ minWidth: 0 }}>
            {page === "Home" && (
              <HomePage
                posts={posts}
                setPosts={setPosts}
                setPage={setPage}
                setSelectedCreator={setSelectedCreator}
                currentUser={user}
                search={search}
                setSearch={setSearch}
                wrapApi={wrapApi}
                onLightbox={(url, type) => setLightbox({ url, type })}
              />
            )}
            {page === "Explore" && (
              <ExplorePage
                setPage={setPage}
                setSelectedCreator={setSelectedCreator}
                search={search}
                currentUser={user}
                onUpdate={setUser}
              />
            )}
            {page === "Messages" && (
              <MessagesPage
                activeConvoId={activeConvoId}
                setActiveConvoId={setActiveConvoId}
                incomingMsg={incomingMsg}
                setIncomingMsg={setIncomingMsg}
                currentUser={user}
                wrapApi={wrapApi}
              />
            )}
            {page === "Dashboard" && <DashboardPage />}
            {page === "Profile" && (
              <ProfilePage
                creator={selectedCreator}
                setPage={setPage}
                setActiveConvoId={setActiveConvoId}
                currentUser={user}
                onUpdate={setUser}
                wrapApi={wrapApi}
                onLightbox={(url, type) => setLightbox({ url, type })}
              />
            )}
          </div>
          {(page === "Home" || page === "Explore" || page === "Profile") && (
            <LateBreakingTicker
              setPage={setPage}
              setSelectedCreator={setSelectedCreator}
              setActiveConvoId={setActiveConvoId}
            />
          )}
        </main>
        <AnimatePresence>
          {lightbox && (
            <Lightbox
              url={lightbox.url}
              type={lightbox.type}
              onClose={() => setLightbox(null)}
            />
          )}
        </AnimatePresence>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              onClick={() => {
                setActiveConvoId(toast.conversationId);
                setPage("Messages");
                setToast(null);
              }}
              style={{
                position: "fixed",
                bottom: 24,
                right: 24,
                background: C.white,
                color: C.ink,
                border: `2px solid ${C.accent}`,
                padding: "12px 18px",
                maxWidth: 320,
                zIndex: 1000,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <div className="byline" style={{ color: C.accent, marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{toast.title}</span>
                <span style={{ fontSize: 8 }}>CLICK TO VIEW</span>
              </div>
              <div className="italic-serif" style={{ fontSize: 13, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                "{toast.text}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
