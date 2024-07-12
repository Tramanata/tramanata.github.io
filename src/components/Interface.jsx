import { motion, useAnimation } from "framer-motion";
import React, { useState } from "react";
import ReactTypingEffect from 'react-typing-effect';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import emailjs from 'emailjs-com';



const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen reen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <SkillsSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = () => {
  const text = [
    "Tyler Ramanata's\nDigital Portfolio"
  ];
  return (
    <Section>
      <div className="text-container">
      <h1 className="text-5xl italic font-extrabold leading-snug">
            <ReactTypingEffect
                text={text}
                speed={100}
                eraseSpeed={100}
                eraseDelay={2000}
                typingDelay={500}
                cursor="|"
                displayTextRenderer={(text, i) => {
                    return (
                        <span>
                            {text.split('\n').map((item, index) => (
                                <React.Fragment key={index}>
                                    {item}
                                    {index < text.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </span>
                    );
                }}
                
            />
        </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I am a student at NC State University majoring in
        <br />
        Computer Engineering and minoring in Business
        <br/>
        Administration. I hope to pursue a career
        <br/>
        in software engineering/developing. Feel free to
        <br/>
        explore my portfolio to learn more about my
        <br/>
        professional goals, skills, and projects.

      </motion.p>
      
      </div>
    </Section>
  );
};

const skills = [
  {
      title: "JavaScript (React|Threejs)",
      level: 80,
  },
  {
      title: "Java (Data Structure and Algorithms)",
      level: 50,
  },
  {
      title: "Python",
      level: 80,
  },
  {
      title: "AWS",
      level: 40,
  },
  {
      title: "Rust",
      level: 10,
  },
];

const SkillsSection = () => {
  return(
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold">Skills</h2>
        <div className=" mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-gray-800"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
const ProjectCard = ({ title, description, image, skills, website }) => (
  <div className="project-card">
    <img src={image} alt={title} />
    <div className="project-card-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <span key={index} className="skill">{skill}</span>
        ))}
      </div>
      {website && (
        <div className="button-container">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  </div>
);

const ProjectSection = () => {
  const projects = [
    {
      title: "Chariot",
      description:
        "Chariot is a full-stack ride-hailing iOS app built for college organizations to solve the issue of drivers constantly checking their phones for ride requests. It uses AWS, React, Node.js, Python, and Java.",
      image: "projects/chariot.png", // Replace with actual image path
      skills: ["AWS", "React", "Node.js", "Python", "Java"],
      website: "https://sites.google.com/view/theappchariot?usp=sharing", // Example website link
    },
    {
      title: "Tanning Timer iOS Mobile App",
      description:
        "Coming Soon: Developed an iOS Mobile App that used Weather API and react javascript to hold a timer for the recommended tanning time based on the UV. ",
      image: "projects/TanningUV.png", // Replace with actual image path
      skills: ["JavaScript", "React", "WeatherAPI", "Expo"],
      website: "google.com", // Example website link
    },
    {
      title: "My Digital Portfolio",
      description:
        "Welcome to my digital portfolio! This project took countless hours to create using JavaScript (React, Three.js), HTML, and CSS, along with Blender, Framer Motion, and Maximo.",
      image: "projects/portfoliopic.png", // Replace with actual image path
      skills: ["JavaScript", "React", "Threejs", "HTML", "CSS", "Blender", "Framer Motion"],
      website: "https://tramanata.github.io", // Example website link
    },
    {
      title: "Rust Blockchain",
      description:
        "Using Rust to develop a blockchain system. Learning to use Smart Contracts and Consensus Algorithms for efficient and secure transfers.",
      image: "projects/comingsoon.jpg", // Replace with actual image path
      skills: ["Rust", "Blockchain", "Smart Contracts", "Consensus Algorithms"],
      website: "google.com", // Example website link
    },
    {
      title: "Frogzilla",
      description:
        "First ever coding project created 10th Grade. Used JavaScript to create a basic targeting game using your cursor.",
      image: "projects/frogzilla.png", // Replace with actual image path
      skills: ["JavaScript"],
      website: "https://sites.google.com/view/frogzilla?usp=sharing", // Example website link
    },
    // Add more projects as needed
  ];

  const [startIndex, setStartIndex] = useState(0);
  const maxVisibleCards = 2; // Number of cards visible at a time

  const nextProjects = () => {
    if (startIndex + maxVisibleCards < projects.length) {
      setStartIndex(startIndex + maxVisibleCards);
    }
  };

  const prevProjects = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - maxVisibleCards);
    }
  };

  return (
    <section className="project-container">
      <h2 className="page-title">Projects</h2>
      <div className="project-wrapper">
        {projects.slice(startIndex, startIndex + maxVisibleCards).map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            skills={project.skills}
            website={project.website}
          />
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={prevProjects} disabled={startIndex === 0}>Prev</button>
        <button onClick={nextProjects} disabled={startIndex + maxVisibleCards >= projects.length}>Next</button>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const LinkedInButton = () => {
    window.open("https://www.linkedin.com/in/tylerramanata", "_blank");
  };

  const GithubButton = () => {
    window.open("https://github.com/Tramanata", "_blank");
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cyefz2f', 'template_j23jtl6', e.target, 'RQzrTL5Y7W5LBqx-s')
      .then((result) => {
        alert("Message sent successfully!");
      }, (error) => {
        alert("Message sending failed. Please try again.");
      });
  };

  return (
    <Section>
      <button className="linkedin-button" onClick={LinkedInButton}>
        <FontAwesomeIcon icon={faLinkedin} /> {' '}
        LinkedIn
      </button>
      <button className="github-button" onClick={GithubButton}>
        <FontAwesomeIcon icon={faGithub} /> {' '}
        Github
      </button>

      <h2 className="text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white w-96 max-w-full">
        <form onSubmit={sendEmail}>
          <label htmlFor="name" className="font-medium text-gray-900 block mb-1">Name</label>
          <input type="text" name="name" id="name" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3" />
          
          <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">Email</label>
          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3" />
          
          <label htmlFor="message" className="font-medium text-gray-900 block mb-1 mt-8">Message</label>
          <textarea name="message" id="message" className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3" />
          
          <button type="submit" className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16">Submit</button>
        </form>
      </div>
    </Section>
  );
};