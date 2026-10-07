import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "./styles.css";

const TITLE = "Tyler Ramanata";
const BIO =
  "I'm a Software Engineer at Oracle on the Network Automation team. I studied Computer Engineering at NC State University and have a deep interest in FinTech and startups. Always interested in the next exciting step in my journey!";

const TYPE_SPEED_MS = 45;
const BIO_TYPE_SPEED_MS = 18;
const PAUSE_AFTER_TITLE_MS = 400;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Types out each string in order, one after the other. Returns how many
// characters of each string are currently visible.
const useTypewriter = (strings, speeds, startDelay) => {
  const [counts, setCounts] = useState(() =>
    prefersReducedMotion() ? strings.map((s) => s.length) : strings.map(() => 0)
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timer;
    let index = 0;
    let chars = 0;

    const tick = () => {
      if (index >= strings.length) return;
      chars += 1;
      const typingIndex = index;
      const typedChars = chars;
      setCounts((prev) => prev.map((c, i) => (i === typingIndex ? typedChars : c)));

      if (chars < strings[index].length) {
        timer = setTimeout(tick, speeds[index]);
      } else {
        index += 1;
        chars = 0;
        timer = setTimeout(tick, PAUSE_AFTER_TITLE_MS);
      }
    };

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, []);

  return counts;
};

// Renders the full text invisibly to reserve its space, with the typed portion
// layered on top, so the card never changes size while typing.
const TypedText = ({ text, count, showCaret }) => (
  <span className="typed">
    <span className="typed-ghost" aria-hidden="true">
      {text}
    </span>
    <span className="typed-live" aria-hidden="true">
      {text.slice(0, count)}
      {showCaret && <span className="typed-caret" />}
    </span>
    <span className="sr-only">{text}</span>
  </span>
);

export const Interface = () => {
  const [titleCount, bioCount] = useTypewriter(
    [TITLE, BIO],
    [TYPE_SPEED_MS, BIO_TYPE_SPEED_MS],
    900
  );
  const typingTitle = titleCount < TITLE.length;

  return (
    <motion.section
      className="hero-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      <h1 className="hero-title">
        <TypedText text={TITLE} count={titleCount} showCaret={typingTitle} />
      </h1>
      <p className="hero-bio">
        <TypedText text={BIO} count={bioCount} showCaret={!typingTitle} />
      </p>
    </motion.section>
  );
};
