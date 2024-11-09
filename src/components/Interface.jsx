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

    </div>
  );
};

const AboutSection = () => {
  const text = [
    "Tyler Ramanata's\nDigital Portfolio"
  ];
  return (
    <Section>
       {/* <img
          src="./projects/Headshot.png" // Ensure correct path to Headshot.png
          alt="Tyler's Headshot"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%", // Makes the image circular
            marginBottom: "400px",
            marginLeft: "175px",
            border: "4px solid #fff", // Optional border for styling
          }}
        /> */}
      <div className="text-container" style={{ marginTop: '200px' }}>
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
