import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { useEffect, useState, useCallback } from "react";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { Menu } from "./components/Menu";
import { ScrollManager } from "./components/ScrollManager";
import { framerMotionConfig } from "./config";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './components/styles.css';
import Projects from "./components/Projects";
import ProfessionalExperience from "./components/ProfessionalExperience";

function AppContent() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation(); // Now this will work as expected

  const particlesInit = useCallback(async engine => {      
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <MotionConfig transition={{ ...framerMotionConfig }}>
      {location.pathname === "/" && ( // Only render these components on the homepage
        <>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{ 
              "fullScreen": false, 
              "background":{ "image":"linear-gradient(19deg, #110d31 0%, #3b0a45 50%, #1c2f50 100%)" }, 
              "particles":{ "number":{ "value":10, "density":{ "enable":true, "value_area":600 } }, 
              "color":{ "value":"#ffffff" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, 
              "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, 
                "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, 
                "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, 
                  "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, 
                  "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, 
                    "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, 
                    "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, 
                    "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
          />
          <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
            <ScrollControls pages={0} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Experience section={section} menuOpened={menuOpened} />
              </Scroll>
              <Scroll html>
                <Interface />
              </Scroll>
            </ScrollControls>
          </Canvas>
          <Menu
            onSectionChange={setSection}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
          <Cursor />
        </>
      )}
      <Leva hidden />
      
      <Routes>
        <Route path="/" element={<Interface />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<ProfessionalExperience />} />
      </Routes>
    </MotionConfig>
  );
}

function App() {
  return (
    <Router> 
      <AppContent />
    </Router>
  );
}

export default App;