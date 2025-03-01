// src/data/skills.ts

// Definisi tipe untuk skill
export interface Skill {
  name: string;
  icon: string;
  level: number; // 1-100 (percentage)
  category: SkillCategory;
  description?: string;
  yearStarted?: number;
  highlight?: boolean; // Untuk skills yang ingin disorot
  color?: string; // Warna kustom untuk skill ini
  projects?: number[]; // ID proyek yang menggunakan skill ini
  relatedSkills?: string[]; // Skill terkait
}

// Enum untuk kategori skill
export enum SkillCategory {
  FRONTEND = "Frontend Development",
  BACKEND = "Backend Development",
  DESIGN = "UI/UX Design",
  DEVOPS = "DevOps & Deployment",
  DATABASE = "Database Management",
  TOOLS = "Tools & Frameworks"
}

const skills: Skill[] = [
  {
    name: "JavaScript",
    icon: "/icons/javascript-original.svg",
    level: 85, // Konversi dari 4/5 ke persentase
    category: SkillCategory.FRONTEND,
    description: "Modern ES6+, asynchronous programming, closures, and functional programming.",
    yearStarted: 2018,
    highlight: true,
    color: "#F7DF1E", // Warna kuning JavaScript
    projects: [1, 2, 4],
    relatedSkills: ["TypeScript", "React", "Node.js"]
  },
  {
    name: "React",
    icon: "/icons/react-original.svg",
    level: 95,
    category: SkillCategory.FRONTEND,
    description: "Component architecture, hooks, context, Redux, and performance optimization.",
    yearStarted: 2019,
    highlight: true,
    color: "#61DAFB", // Warna biru React
    projects: [1, 2, 4],
    relatedSkills: ["JavaScript", "Next.js", "TypeScript"]
  },
  {
    name: "Next.js",
    icon: "/icons/nextjs-original.svg",
    level: 80,
    category: SkillCategory.FRONTEND,
    description: "Server-side rendering, static site generation, and API routes.",
    yearStarted: 2021,
    highlight: true,
    color: "#000000",
    projects: [1],
    relatedSkills: ["React", "JavaScript", "TypeScript"]
  },
  {
    name: "CSS",
    icon: "/icons/css3-original.svg",
    level: 90,
    category: SkillCategory.FRONTEND,
    description: "Utility-first CSS framework for rapid UI development.",
    yearStarted: 2020,
    highlight: true,
    color: "#38B2AC", // Warna teal Tailwind
    projects: [1, 3],
    relatedSkills: ["CSS", "React", "Design Systems"]
  },
  {
    name: "HTML",
    icon: "/icons/html5-original.svg",
    level: 85,
    category: SkillCategory.FRONTEND,
    description: "Static typing, interfaces, generics, and advanced type features.",
    yearStarted: 2020,
    highlight: true,
    color: "#3178C6", // Warna biru TypeScript
    projects: [1, 2],
    relatedSkills: ["JavaScript", "React", "Node.js"]
  },
  {
    name: "My SQL",
    icon: "/icons/mysql-original.svg",
    level: 75,
    category: SkillCategory.BACKEND,
    description: "RESTful APIs, Express.js, authentication, and middleware.",
    yearStarted: 2019,
    color: "#339933", // Warna hijau Node.js
    projects: [2],
    relatedSkills: ["JavaScript", "Express", "MongoDB"]
  },
  {
    name: "Figma",
    icon: "/icons/figma-original.svg",
    level: 70,
    category: SkillCategory.DESIGN,
    description: "Document modeling, queries, aggregation, and indexing.",
    yearStarted: 2019,
    color: "#47A248", // Warna hijau MongoDB
    projects: [2],
    relatedSkills: [" ui/ux design", "prototyping", "design systems"]
  },
  {
    name: "C++",
    icon: "/icons/cplusplus-original.svg",
    level: 60,
    category: SkillCategory.DEVOPS,
    description: "Relational database design, SQL queries, and transactions.",
    yearStarted: 2021,
    color: "#336791", // Warna biru PostgreSQL
    projects: [],
    relatedSkills: ["Languages",]
  },
  {
    name: "PHP",
    icon: "/icons/php-original.svg",
    level: 55,
    category: SkillCategory.FRONTEND,
    description: "Containerization, Docker Compose, and deployment workflows.",
    yearStarted: 2022,
    color: "#2496ED", // Warna biru Docker
    projects: [],
    relatedSkills: ["HTML, CSS, JavaScript"]
  },
  {
    name: "Java",
    icon: "/icons/java-original.svg",
    level: 70,
    category: SkillCategory.DESIGN,
    description: "UI/UX design, prototyping, and design systems.",
    yearStarted: 2021,
    color: "#F24E1E", // Warna oranye Figma
    projects: [1, 3],
    relatedSkills: ["Languages", "Design Systems"]
  },
  {
    name: "Git & GitHub",
    icon: "/icons/github-original.svg",
    level: 85,
    category: SkillCategory.TOOLS,
    description: "Version control, branching strategies, and CI/CD workflows.",
    yearStarted: 2018,
    highlight: true,
    color: "#181717", // Warna hitam GitHub
    projects: [1, 2, 3, 4],
    relatedSkills: ["Version Control", "Collaboration", "CI/CD"]
  },
  {
    name: "Typescript",
    icon: "/icons/typescript-original.svg",
    level: 75,
    category: SkillCategory.FRONTEND,
    description: "Unit testing, component testing, and test-driven development.",
    yearStarted: 2020,
    color: "#C21325", // Warna merah Jest
    projects: [1, 2],
    relatedSkills: ["Testing", "JavaScript", "React"]
  }
];

// Utility functions - Enhanced dan ditambahkan beberapa

// Mendapatkan skill berdasarkan kategori
export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter(skill => skill.category === category);
};

// Mendapatkan skill teratas berdasarkan level
export const getTopSkills = (count: number = 5): Skill[] => {
  return [...skills].sort((a, b) => b.level - a.level).slice(0, count);
};

// Mendapatkan skill yang di-highlight
export const getHighlightedSkills = (): Skill[] => {
  return skills.filter(skill => skill.highlight);
};

// Mendapatkan semua kategori
export const getAllCategories = (): SkillCategory[] => {
  return Object.values(SkillCategory);
};

// Mendapatkan tahun pengalaman untuk skill tertentu
export const getYearsOfExperience = (skillName: string): number | null => {
  const skill = skills.find(s => s.name === skillName);
  if (skill?.yearStarted) {
    const currentYear = new Date().getFullYear();
    return currentYear - skill.yearStarted;
  }
  return null;
};

// Mendapatkan semua skill yang digunakan dalam project tertentu
export const getSkillsForProject = (projectId: number): Skill[] => {
  return skills.filter(skill => skill.projects?.includes(projectId));
};

// Mendapatkan total tahun pengalaman (dari skill dengan yearStarted paling awal)
export const getTotalYearsOfExperience = (): number => {
  const earliestYear = Math.min(...skills
    .filter(skill => skill.yearStarted !== undefined)
    .map(skill => skill.yearStarted as number));
  
  return new Date().getFullYear() - earliestYear;
};

// Mendapatkan skill yang terkait dengan skill tertentu
export const getRelatedSkills = (skillName: string): Skill[] => {
  const skill = skills.find(s => s.name === skillName);
  if (!skill || !skill.relatedSkills?.length) return [];
  
  return skills.filter(s => skill.relatedSkills?.includes(s.name));
};

// Mencari skill berdasarkan nama (case insensitive)
export const searchSkills = (query: string): Skill[] => {
  const normalizedQuery = query.toLowerCase();
  return skills.filter(skill => 
    skill.name.toLowerCase().includes(normalizedQuery) || 
    skill.description?.toLowerCase().includes(normalizedQuery)
  );
};

export default skills;