import React, { useState } from "react";
import { Menu } from "./Menu";
import "./styles.css";

import esvehicle from "../assets/pictures/esvehicle.png";

// `image` is optional; cards without one render text-only.
const projects = [
  {
    title: "OnDeviceNav",
    context: "Senior design · NC State",
    description:
      "An Android app for turn-by-turn indoor navigation in augmented reality, running entirely on the phone: no floor plans and no internet. It maps the room live with ARCore, detects people and obstacles with a YOLO11 model, and routes around them with A* pathfinding.",
    tech: ["Java", "Android", "ARCore", "TensorFlow Lite", "YOLO11"],
    links: [
      { label: "GitHub", href: "https://github.com/Tramanata/OnDeviceNav" },
      {
        label: "Poster",
        href: "https://drive.google.com/file/d/16b3e3lavmcceDkBZc4czBN0tXCfAw0JP/view?usp=sharing",
      },
    ],
  },
  {
    title: "Chariot",
    context: "iOS app · live on the App Store",
    description:
      "A ride-share app I founded and launched on the App Store, now serving 100+ active users. Riders and drivers get matched in real time, with live location, maps, and per-driver ride queues.",
    tech: ["TypeScript", "React Native", "Expo", "Supabase"],
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/ride-chariot/id6760150604" }],
  },
  {
    title: "Embedded Systems Vehicle",
    context: "ECE 306 · NC State",
    description:
      "A microcontroller-driven car programmed in C. It runs preset movement routines, follows a black line using its sensors, and takes commands over IoT serial communication.",
    tech: ["C", "Microcontrollers"],
    image: esvehicle,
    links: [
      { label: "Project site", href: "https://sites.google.com/view/embeddedsystemsrccar/home" },
      { label: "GitHub", href: "https://github.com/Tramanata/ECE306-Embedded-System-Vehicle" },
    ],
  },
  {
    title: "Crypto Web Scraper",
    context: "Personal project",
    description:
      "A Python scraper that uses Playwright to collect cryptocurrency market data from CoinMarketCap and loads it into a PostgreSQL database.",
    tech: ["Python", "Playwright", "PostgreSQL"],
    links: [{ label: "GitHub", href: "https://github.com/Tramanata/Crypto-Webscraper" }],
  },
];

function Projects() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="page">
      <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} />

      <main className="page-content">
        <h1 className="page-title">Projects</h1>

        <div className="card-list">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
}

const ProjectCard = ({ title, context, description, tech, image, links }) => (
  <article className="card project-card">
    <div className="project-body">
      <p className="project-context">{context}</p>
      <h2 className="card-title">{title}</h2>
      <p className="project-description">{description}</p>
      <p className="card-tech">{tech.join(" · ")}</p>
      {links.length > 0 && (
        <p className="project-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </p>
      )}
    </div>
    {image && <img className="project-image" src={image} alt={title} />}
  </article>
);

export default Projects;
