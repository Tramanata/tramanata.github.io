import React, { useState } from "react";
import { Menu } from "./Menu";
import "./styles.css";

const jobs = [
  {
    company: "Oracle",
    role: "Software Engineer · Oracle Cloud Infrastructure",
    location: "Nashville, TN",
    dates: "",
    highlights: [
      "Designed Temporal workflows in Java that automate anomaly detection and incident remediation across 50+ Oracle data centers, using idempotent activities and exponential-backoff retries to recover safely from partial failures.",
      "Built and maintain Apache Flink and Kafka stream processing pipelines on the Network Health Monitoring team, handling over 1 billion networking metrics a day.",
      "Orchestrated high-availability deployments to 50+ Oracle regions, dynamically scaling Kubernetes nodes and cluster pools to match compute demand.",
    ],
    tech: ["Java", "Temporal", "Apache Flink", "Apache Kafka", "Kubernetes"],
  },
  {
    company: "Wells Fargo",
    role: "Software Engineering Intern",
    location: "Charlotte, NC",
    dates: "Apr 2025 – Aug 2025",
    highlights: [
      "Delivered a client-facing agentic AI chatbot with React, Java, and Google ADK, speeding up responses and improving self-service across 10,000+ client requests.",
      "Integrated internal AI tools with semantic search APIs for faster retrieval of financial client data, cutting manual query resolution for support teams by 20%.",
      "Automated CI/CD pipelines with GitHub Actions and OpenShift, enabling more frequent releases without downtime.",
    ],
    tech: ["React", "JavaScript", "Java", "Google ADK", "GitHub Actions", "OpenShift"],
  },
  {
    company: "Stratascale",
    role: "Software Engineer Intern",
    location: "Charlotte, NC",
    dates: "Apr 2024 – Aug 2024",
    highlights: [
      "Built an ETL pipeline on AWS (Glue, S3, DynamoDB, Aurora, CloudWatch) with SQL and Python, processing 50M+ records.",
      "Transformed large datasets with PySpark and Pandas for efficient storage and analysis.",
      "Developed a scikit-learn logistic regression model that classifies high- vs. low-priority vulnerabilities for SOC analysts.",
    ],
    tech: ["Python", "AWS", "PySpark", "Pandas", "scikit-learn", "SQL"],
  },
  {
    company: "Techmor",
    role: "Computer Engineer Intern",
    location: "",
    dates: "Apr 2023 – Aug 2023",
    highlights: [
      "Built LabVIEW calibration tools to test analog-to-CAN bus, analog-to-digital, and multi-channel products.",
      "Tested CAN bus products with oscilloscopes to analyze signal changes and gain, and repaired faulty boards by soldering.",
      "Designed PCBs in KiCad for strain gauge programming modules and to replace outdated boards.",
    ],
    tech: ["LabVIEW", "C", "KiCad", "PCB design"],
  },
];

function ProfessionalExperience() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="page">
      <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} />

      <main className="page-content">
        <h1 className="page-title">Experience</h1>

        <div className="card-list">
          {jobs.map((job) => (
            <JobCard key={job.company} {...job} />
          ))}
        </div>
      </main>
    </div>
  );
}

const JobCard = ({ company, role, location, dates, highlights, tech }) => (
  <article className="card">
    <div className="job-header">
      <h2 className="card-title">{company}</h2>
      {dates && <p className="job-dates">{dates}</p>}
    </div>
    <p className="job-role">{[role, location].filter(Boolean).join(" · ")}</p>
    <ul className="job-highlights">
      {highlights.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <p className="card-tech">{tech.join(" · ")}</p>
  </article>
);

export default ProfessionalExperience;
