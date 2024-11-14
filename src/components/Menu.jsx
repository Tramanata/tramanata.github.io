import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export const Menu = (props) => {
  const { menuOpened, setMenuOpened } = props;
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-12 right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
      >
        <div className="flex flex-col items-start justify-center p-8 gap-4 flex-grow">
          <MenuButton
            label="Home"
            onClick={() => {
              navigate("/");
              setMenuOpened(false);
            }}
          />
          <MenuButton
            label="Projects"
            onClick={() => {
              navigate("/projects/");
              setMenuOpened(false);
            }}
          />
          <MenuButton
            label="Experience"
            onClick={() => {
              navigate("/experience/");
              setMenuOpened(false);
            }}
          />
        </div>
        
        <div className="flex flex-col items-start justify-end p-8 gap-4">
          <a
            href="https://www.linkedin.com/in/tylerramanata"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold cursor-pointer flex items-center gap-2"
            style={{ color: "#0077B5" }}
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
            LinkedIn
          </a>
          <a
            href="https://github.com/Tramanata"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold cursor-pointer flex items-center gap-2"
            style={{ color: "#333" }}
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            GitHub
          </a>
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};
