import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Giuseppe Mattia Greco",
  DESCRIPTION: "Personal site and portfolio",
  EMAIL: "greco.giuseppemattia@proton.me",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "Instagram",
    HREF: "https://www.instagram.com/mattia_greek/",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/giumatt",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/giuseppe-mattia-greco/",
  },
];
