import React, { useState } from "react";
import { Menu } from "./Menu"; // Import the Menu button

function Projects() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened((prevState) => !prevState);

  // Sample project data (replace with your actual project details)
  const projectData = [
    {
      id: 1,
      title: "Project 1",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a description of project 1.",
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Project 2",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a description of project 2.",
      skills: ["Python", "Machine Learning", "Pandas"],
    },
    {
      id: 3,
      title: "Project 3",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a description of project 3.",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    // Add more projects as needed
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
          height: "100%", // Full height of the screen
          overflowY: "auto", // Enables vertical scrolling
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ProjectBox Component with more detailed content
const ProjectBox = ({ title, imageUrl, description, skills }) => {
  return (
    <div
      onClick={() => alert(`Navigating to ${title}`)}
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
          width: "200px",
          height: "150px",
          borderRadius: "8px",
          objectFit: "cover",
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