import { motion, useAnimation } from "framer-motion";
import React, { useState } from "react";
import ReactTypingEffect from 'react-typing-effect';
import './styles.css'

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
      <motion.button
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-16`}
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
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
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
  const resumeButtonClick = () => {
    const resumePath = "/resume.pdf";
    window.open(resumePath, '_blank');
  };
  const LinkedInButton = () => {
      window.open("https://www.linkedin.com/in/tylerramanata", "_blank");
    };

  return(
    <Section>
        <button className="resume-button" onClick={resumeButtonClick}>
            View Resume
        </button>
        <button className="linkedin-button" onClick={LinkedInButton}>
            View LinkedIn
        </button>
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
  <div
    className="border border-gray-300 hover:border-indigo-600 p-4 rounded-lg shadow-md bg-white flex max-w-screen-lg"
    style={{ height: '400px' }}
  >
    {/* Left section: Title, Description, Skills */}
    <div className="flex-1 flex flex-col justify-between w-1/2 pr-4">
      <div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Skills Used:</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 py-1 px-2 rounded-full text-sm text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
    {/* Right section: Image and Visit Website button */}
    <div className="flex-shrink-0 flex flex-col justify-center items-center w-1/2 pl-2">
      <img src={image} alt={title} className="w-56 h-fit rounded-lg mb-4" />
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white py-2 px-3 rounded-lg font-semibold text-sm inline-block hover:bg-indigo-700 transition duration-300 mt-4"
        >
          Visit Website
        </a>
      )}
    </div>
  </div>
);

const ProjectSection = () => {
  const projects = [
    {
      title: "Chariot",
      description:
        "Chariot is a Full-Stack, Ride Hailing iOS Mobile Application. This application was created to solve a problem in college organizations where drivers had to constantly look at their phones when people needed rides. This application was created using AWS services, React, Node.js, python, and Java.",
      image: "projects/chariot.png", // Replace with actual image path
      skills: ["AWS", "React", "Node.js", "Python", "Java"],
      website: "https://www.chariotapp.com", // Example website link
    },
    {
      title: "My Digital Portfolio",
      description:
        "Welcome to my digital portfolio. This project took me countless hours to create using JavaScript (React, Threejs), HTML, and CSS. I also used technologies like blender, framer motion, and maximo.",
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
      website: "google.com", // Example website link
    },
    // Add more projects as needed
  ];

  const [startIndex, setStartIndex] = useState(0);
  const maxVisibleCards = 2; // Number of cards visible at a time

  const controls = useAnimation();

  const nextProjects = () => {
    if (startIndex + maxVisibleCards < projects.length) {
      setStartIndex(startIndex + 1);
      controls.start({ x: `-${(startIndex + 1) * (100 / maxVisibleCards)}%` });
    }
  };

  const prevProjects = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      controls.start({ x: `-${(startIndex - 1) * (100 / maxVisibleCards)}%` });
    }
  };

  return (
    <Section>
      <motion.div
        className="w-full overflow-hidden relative"
        whileInView={"visible"}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <h2 className="text-5xl font-bold mb-8 text-center">Projects</h2>
        <div className="flex overflow-x-hidden mb-4">
          <motion.div
            className="flex transition-all ease-in-out duration-500"
            style={{ x: controls }}
          >
            {projects.slice(startIndex, startIndex + maxVisibleCards).map((project, index) => (
              <div key={index} className="w-full md:w-1/2 px-2">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  skills={project.skills}
                  website={project.website}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className={`bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold text-sm inline-block hover:bg-indigo-700 transition duration-300 ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={prevProjects}
            disabled={startIndex === 0}
          >
            Prev
          </button>
          <button
            className={`bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold text-sm inline-block hover:bg-indigo-700 transition duration-300 ${startIndex + maxVisibleCards >= projects.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={nextProjects}
            disabled={startIndex + maxVisibleCards >= projects.length}
          >
            Next
          </button>
        </div>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section>
      <h2 className="text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white w-96 max-w-full">
        <form>
          <label for="name" className="font-medium text-gray-900 block mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <label
            for="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <label
            for="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <button className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
};