// src/data/projects.ts

// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github?: string;
  featured?: boolean;
  completionDate?: string;
  client?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Proyek Kapita Selekta Informatika",
    description: "Website edukasi tentang lingkungan pada desa",
    image: "/project1.png",
    github: "https://github.com/Yowanehaki/Web_KSI",
    featured: true,
    completionDate: "2023-11-15",
  },
  {
    id: 2,
    title: "Proyek Pemrograman Berorientasi Objek",
    description: "Game berbasis Python.",
    image: "/project2.png",
    github: "https://github.com/Yowanehaki/Tetap-Hidup-Adventure-Game-Interaktif",
    featured: true,
    completionDate: "2024-01-20",
    client: "Fashion Boutique Inc.",
  },
  {
    id: 3,
    title: "Proyek Sistem Tertanam",
    description: "Alat IoT memonitoring tanaman Hidroponik.",
    image: "/project3.jpg",
    github: "https://github.com/yourusername/taskmanager",
    featured: false,
    completionDate: "2023-09-10",
    client: "Internal Project",
  },
  {
    id: 4,
    title: "Proyek Pengembangan Aplikasi Mobile",
    description: "Aplikasi untuk monitoring tugas akhir Mahasiswa.",
    image: "/project4.jpg",
    github: "https://github.com/Yowanehaki/Tamate_App",
    featured: false,
    completionDate: "2023-07-05",
  }
];

export default projects;