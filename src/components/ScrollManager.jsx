import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const ScrollManager = (props) => {
  const { onSectionChange } = props;
  const data = useScroll();
  const lastScroll = useRef(0);

  useFrame(() => {
    const curSection = Math.floor(data.scroll.current * data.pages);
    if (curSection !== lastScroll.current) {
      onSectionChange(curSection);  // Only track section changes
      lastScroll.current = curSection;
    }
  });

  return null; // No additional scroll manipulation
};