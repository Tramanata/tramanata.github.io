import React, { useState } from "react";
import { Menu } from "./Menu"; // Import the Menu button
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

function Projects() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened((prevState) => !prevState);
  const navigate = useNavigate();

  // Updated project data
  const projectData = [
    {
      id: 1,
      title: "Embedded Systems Vehicle",
      imageUrl: "public/pictures/esvehicle.png",
      description:
        "Developed an embedded systems vehicle that can perform a series of tasks that include: hard-coded movement, black line sensors, and movement due to IoT/Serial Communication",
      skills: ["C", "Microcontrollers"],
      link: "https://sites.google.com/view/embeddedsystemsrccar/home",
    },
    {
      id: 2,
      title: "Chariot: Ride Share Application",
      imageUrl: "public/pictures/comingsoon.png",
      description: "Coming soon.",
      skills: ["JavaScript", "React", "Firebase"],
    //   link: "/chariot", // Route for Chariot
    },
    {
      id: 3,
      title: "Crypto Web Scraper",
      imageUrl: "public/pictures/cryptowebscraper.png",
      description: "Created Crypto Web Scraper using Playwright and loading data into PostgreSQL database.",
      skills: ["PostgreSQL", "Python", "Playwright"],
      link: "https://github.com/Tramanata/Crypto-Webscraper.git", 
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(19deg, #110d31 0%, #3b0a45 50%, #1c2f50 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} toggleMenu={toggleMenu} />

      {/* Scrollable Project List Container */}
      <div
        style={{
          position: "relative",
          color: "#fff",
          zIndex: 1,
          padding: "20px",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <div style={{ marginTop: "20px" }}>
          {projectData.map((project) => (
            <ProjectBox
              key={project.id}
              title={project.title}
              imageUrl={project.imageUrl}
              description={project.description}
              skills={project.skills}
              link={project.link}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ProjectBox Component with conditional navigation
const ProjectBox = ({ title, imageUrl, description, skills, link, navigate }) => {
  const handleProjectClick = () => {
    if (link.startsWith("http")) {
      window.open(link, "_blank"); // Opens external links in a new tab
    } else {
      navigate(link); // Navigates to internal routes (e.g., "/chariot")
    }
  };

  return (
    <div
      onClick={handleProjectClick}
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        display: "flex",
        gap: "20px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
      }}
    >
      {/* Project Image */}
      <img
        src={imageUrl}
        alt={`${title} thumbnail`}
        style={{
          width: "200px", // This is the width of the image container
          height: "150px", // This is the height of the image container
          borderRadius: "8px",
          objectFit: "contain", // This makes the image cover the area without stretching
        }}
      />

      {/* Project Content */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "1.75em", marginBottom: "10px" }}>{title}</h2>
        <p style={{ fontSize: "1em", marginBottom: "15px" }}>{description}</p>

        {/* Skills List */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.map((skill, index) => (
            <span
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "5px 10px",
                borderRadius: "8px",
                fontSize: "0.9em",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
