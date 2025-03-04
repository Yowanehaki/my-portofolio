// src/data/projects.ts

// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  featured?: boolean;
  completionDate?: string;
  client?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A sleek and modern portfolio website built with Next.js and Tailwind CSS.",
    image: "/project1.jpg",
    link: "https://yourportfolio.com",
    github: "https://github.com/yourusername/portfolio",
    featured: true,
    completionDate: "2023-11-15",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with authentication and payment integration.",
    image: "/project2.jpg",
    link: "https://myecommerce.com",
    github: "https://github.com/yourusername/ecommerce",
    featured: true,
    completionDate: "2024-01-20",
    client: "Fashion Boutique Inc.",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity application for organizing tasks with real-time collaboration features.",
    image: "/project3.jpg",
    link: "https://taskmaster.app",
    github: "https://github.com/yourusername/taskmanager",
    featured: false,
    completionDate: "2023-09-10",
    client: "Internal Project",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "An interactive weather dashboard providing real-time forecasts and historical data visualization.",
    image: "/project4.jpg",
    link: "https://weathernow.app",
    github: "https://github.com/yourusername/weather-dashboard",
    featured: false,
    completionDate: "2023-07-05",
  }
];

export default projects;