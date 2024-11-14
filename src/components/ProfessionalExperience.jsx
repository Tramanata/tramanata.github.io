import React, { useState } from "react";
import { Menu } from "./Menu"; // Ensure this path is correct

function ProfessionalExperience() {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((prevState) => !prevState);
  };

  return (
    <div
      style={{
        height: "100vh", // Make the container fit the viewport height
        background: "linear-gradient(19deg, #110d31 0%, #3b0a45 50%, #1c2f50 100%)",
        position: "relative",
        overflow: "auto", // Enable scrolling if content exceeds viewport
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Horizontally center the content
        justifyContent: "flex-start", // Align from the top but allow for vertical centering
        padding: "20px",
        fontFamily: "'Poppins', sans-serif", // Use Poppins font family for a modern look
      }}
    >
      {/* Menu Component */}
      <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} toggleMenu={toggleMenu} />

      

      {/* Work Experience Sections */}
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Stack the boxes vertically
          alignItems: "center", // Horizontally center the boxes
          marginTop: "100px", // Space above the boxes
          width: "100%",
          maxWidth: "1000px", // Limit the max width of the section
          zIndex: 1,
        }}
      >
        {/* Work Experience Box 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            width: "90%", // Limit the width of each box
            maxWidth: "900px", // Ensure the boxes don't stretch too wide
            alignItems: "center", // Vertically center the content inside the box
            transition: "transform 0.3s ease", // Smooth transition for hover effect
          }}
        >
          <img
            src="pictures/stratascales.jpg" // Replace with real image
            alt="Work 1"
            style={{
              width: "250px", // Image size
              height: "250px", // Image size
              borderRadius: "10px",
              marginRight: "20px",
              objectFit: "contain", // Ensure the image fits without zooming
            }}
          />
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "26px", // Increase font size for titles
                color: "#fff",
                fontWeight: "600", // Make the title bolder
                letterSpacing: "1px", // Slightly spread out the letters for a polished look
                textTransform: "uppercase", // Uppercase for added emphasis
                transition: "color 0.3s ease", // Smooth transition for hover effect
              }}
            >
              Stratascale - Software Engineer Intern
            </h2>
            <p
              style={{
                color: "#fff",
                fontSize: "18px", // Increase font size for descriptions
                lineHeight: "1.8",
                fontWeight: "400", // Normal weight for body text
                marginTop: "10px",
              }}
            >
              I participated in a Python-based development project with a team of 10+ engineers, focusing on 
              creating and implementing an ETL process using AWS services to improve database security for 
              Fortune 1000 assets. Additionally, I developed a Machine Learning recommendation system using 
              logistic regression to assist analysts in diagnosing vulnerabilities for over 100 clients. 
              Throughout this experience, I gained expertise in Scrum methodologies and worked with technologies 
              such as AWS (S3, Lambdas, Glue, DynamoDB), Python, Apache Spark, Git, and Jira.
            </p>
            <p
              style={{
                color: "#ddd",
                fontSize: "16px",
                marginTop: "15px",
                fontWeight: "300", // Lighter weight for the duration text
              }}
            >
              <strong>Duration:</strong> Apr 2024 - Aug 2024
            </p>
          </div>
        </div>

        {/* Work Experience Box 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            width: "90%", // Limit the width of each box
            maxWidth: "900px", // Ensure the boxes don't stretch too wide
            alignItems: "center", // Vertically center the content inside the box
            transition: "transform 0.3s ease", // Smooth transition for hover effect
          }}
        >
          <img
            src="pictures/Techmor.jpg" // Replace with real image
            alt="Work 2"
            style={{
              width: "250px", // Image size
              height: "250px", // Image size
              borderRadius: "10px",
              marginRight: "20px",
              objectFit: "contain", // Ensure the image fits without zooming
            }}
          />
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "26px", // Increase font size for titles
                color: "#fff",
                fontWeight: "600", // Make the title bolder
                letterSpacing: "1px", // Slightly spread out the letters for a polished look
                textTransform: "uppercase", // Uppercase for added emphasis
                transition: "color 0.3s ease", // Smooth transition for hover effect
              }}
            >
              Techmor - Computer Engineer Intern
            </h2>
            <p
              style={{
                color: "#fff",
                fontSize: "18px", // Increase font size for descriptions
                lineHeight: "1.8",
                fontWeight: "400", // Normal weight for body text
                marginTop: "10px",
              }}
            >
              I utilized LabView software (C Program) to develop calibration tools for testing the functionality 
              of Analog to CAN Bus, Analog to Digital, and multi-channel products, and debugged faulty systems 
              using soldering tools for PCB adjustments. I tested the performance of Analog to CAN Bus products 
              with oscilloscopes to analyze electrical signal changes and gain. Additionally, I developed PCB 
              boards using KeyCAD software to create programming modules for burning strain gauge programming and
               updating outdated boards.
            </p>
            <p
              style={{
                color: "#ddd",
                fontSize: "16px",
                marginTop: "15px",
                fontWeight: "300", // Lighter weight for the duration text
              }}
            >
              <strong>Duration:</strong> Apr 2023 - Aug 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalExperience;
