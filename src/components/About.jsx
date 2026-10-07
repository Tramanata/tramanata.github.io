import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import "./styles.css";

import aboutPhoto from "../assets/pictures/about-photo.jpg";

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function About() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="page">
      <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} />

      <header className="about-hero">
        <img className="about-photo" src={aboutPhoto} alt="Tyler Ramanata" />
        <h1 className="about-title">About</h1>
        <p className="about-subtitle">Hey, I'm Tyler Ramanata</p>
      </header>

      <main className="about-article">
        <p>
          I'm a software engineer who likes building things end to end, from the infrastructure
          underneath to the app in someone's pocket. Here's a bit more about me.
        </p>

        <h2>Overview</h2>
        <p>
          I'm a Software Engineer at Oracle on the Network Automation team in Oracle Cloud
          Infrastructure. I build the systems that keep a global network healthy: Temporal workflows
          that detect and fix incidents across 50+ data centers, and Flink and Kafka pipelines that
          process over a billion network metrics a day. You can see more on my{" "}
          <Link to="/experience">experience</Link> page.
        </p>

        <h2>Things I'm Proud Of</h2>
        <ul>
          <li>
            I founded <strong>Chariot</strong>, a rideshare app, and took it from an idea to the{" "}
            <ExternalLink href="https://apps.apple.com/us/app/ride-chariot/id6760150604">
              App Store
            </ExternalLink>
            . It now serves 100+ active users.
          </li>
          <li>
            I led a team of five on our senior design project, an AR indoor navigation app that runs
            entirely on the phone to help people with visual or mobility impairments.
          </li>
          <li>I graduated magna cum laude in Computer Engineering from NC State University.</li>
          <li>I earned the Oracle Cloud Infrastructure Associate certification.</li>
        </ul>

        <h2>School</h2>
        <p>
          I studied Computer Engineering at NC State with a minor in Business Administration, and
          studied abroad at the Technical University of Denmark in Copenhagen, taking courses in
          machine learning, AI, autonomous marine robotics, and IoT. Outside of class I was an ECE
          Ambassador, Class VP of Pi Kappa Phi, and a member of the App Development, Machine
          Learning, and Quantum Computing clubs.
        </p>

        <h2>What I'm Into</h2>
        <ul>
          <li>
            <strong>FinTech</strong> – how software is changing the way money moves, gets managed,
            and gets built on.
          </li>
          <li>
            <strong>Startups</strong> – I'm always brainstorming new ideas, and I plan to start a
            business within the next year.
          </li>
          <li>
            <strong>Machine learning</strong> – from vulnerability models at Stratascale to on-device
            object detection in senior design.
          </li>
        </ul>

        <h2>Today</h2>
        <p>
          I'm based in Nashville, Tennessee, working at Oracle and always interested in the next
          exciting step in my journey. If you want to talk FinTech, startups, or anything else, reach
          out on{" "}
          <ExternalLink href="https://www.linkedin.com/in/tylerramanata">LinkedIn</ExternalLink> or
          check out my code on <ExternalLink href="https://github.com/Tramanata">GitHub</ExternalLink>.
        </p>
      </main>
    </div>
  );
}

export default About;
