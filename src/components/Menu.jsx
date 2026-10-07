import React, { useState } from "react";
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
        className="z-20 fixed top-12 right-12 p-3 bg-[#b5543a] w-11 h-11 rounded-md"
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
            label="About Me"
            onClick={() => {
              navigate("/about");
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
          <CopyEmailButton />
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
          <a
            href="https://leetcode.com/u/tylerramanata/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold cursor-pointer flex items-center gap-2"
            style={{ color: "#FFA116" }}
          >
            <LeetCodeIcon />
            LeetCode
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
      className="text-2xl font-bold cursor-pointer hover:text-[#b5543a] transition-colors"
    >
      {label}
    </button>
  );
};

// Font Awesome has no LeetCode icon; path from Simple Icons (CC0).
const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const EMAIL = "tramanata@gmail.com";

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for browsers without the async clipboard API.
    const field = document.createElement("textarea");
    field.value = text;
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
};

// Shows the address and copies it on click instead of opening a mail client.
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await copyText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Copy email address"
      className="text-lg font-bold cursor-pointer flex items-center gap-2"
      style={{ color: "#EA4335" }}
    >
      <GmailIcon />
      <span aria-live="polite">{copied ? "Copied!" : EMAIL}</span>
    </button>
  );
};

// Font Awesome has no Gmail icon; path from Simple Icons (CC0).
const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);
