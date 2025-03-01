// src/data/projects.ts

// Definisi tipe untuk data proyek
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  link: string;
  github?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  completionDate: string;
  client?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A sleek and modern portfolio website built with Next.js and Tailwind CSS.",
    longDescription: "This personal portfolio showcases my skills and projects with a minimalist design focused on user experience. It features smooth animations, responsive layout, and optimized performance scoring 98+ on Google Lighthouse.",
    image: "/project1.jpg",
    link: "https://yourportfolio.com",
    github: "https://github.com/yourusername/portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    featured: true,
    completionDate: "2023-11-15",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with authentication and payment integration.",
    longDescription: "This comprehensive e-commerce solution includes product management, cart functionality, user authentication, and secure payment processing. The admin dashboard provides detailed analytics and inventory management capabilities.",
    image: "/project2.jpg",
    link: "https://myecommerce.com",
    github: "https://github.com/yourusername/ecommerce",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    category: "Full Stack",
    featured: true,
    completionDate: "2024-01-20",
    client: "Fashion Boutique Inc.",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity application for organizing tasks with real-time collaboration features.",
    longDescription: "This task management application helps teams organize their workflow with features like task assignment, deadline tracking, progress monitoring, and real-time collaboration. It includes customizable boards and integrates with popular calendar applications.",
    image: "/project3.jpg",
    link: "https://taskmaster.app",
    github: "https://github.com/yourusername/taskmanager",
    technologies: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS"],
    category: "Web Application",
    featured: false,
    completionDate: "2023-09-10",
    client: "Internal Project",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "An interactive weather dashboard providing real-time forecasts and historical data visualization.",
    longDescription: "This weather application fetches data from multiple APIs to provide accurate forecasts, historical weather patterns, and interactive maps. Users can save locations and receive notifications for weather alerts.",
    image: "/project4.jpg",
    link: "https://weathernow.app",
    github: "https://github.com/yourusername/weather-dashboard",
    technologies: ["React", "D3.js", "OpenWeatherAPI", "Recharts"],
    category: "Data Visualization",
    featured: false,
    completionDate: "2023-07-05",
  }
];

// Konstanta untuk jumlah proyek per halaman
export const PROJECTS_PER_PAGE = 3;

// Fungsi untuk mendapatkan total halaman
export const getTotalPages = (): number => {
  return Math.ceil(projects.length / PROJECTS_PER_PAGE);
};

// Fungsi untuk mendapatkan proyek untuk halaman tertentu
export const getProjectsForPage = (page: number): Project[] => {
  const startIndex = (page - 1) * PROJECTS_PER_PAGE;
  return projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
};

// Fungsi utilitas untuk mendapatkan proyek berdasarkan kategori
export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category);
};

// Fungsi untuk mendapatkan proyek yang disorot
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

// Fungsi untuk mendapatkan proyek berdasarkan ID
export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

export default projects;