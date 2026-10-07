import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { useEffect, useState, useCallback } from "react";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { Menu } from "./components/Menu";
import { framerMotionConfig } from "./config";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './components/styles.css';
import About from "./components/About";
import Projects from "./components/Projects";
import ProfessionalExperience from "./components/ProfessionalExperience";
import Chariot from "./components/Chariot";

function AppContent() {
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation();

  const particlesInit = useCallback(async engine => {      
    await loadFull(engine);
  }, []);

  useEffect(() => {
    setMenuOpened(false);
  }, [location.pathname]);

  return (
    <MotionConfig transition={{ ...framerMotionConfig }}>
      {location.pathname === "/" && ( // Only render these components on the homepage
        <>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{ 
              "fullScreen": false, 
              "background":{ "image":"linear-gradient(160deg, #f4f0e8 0%, #ece5d9 55%, #e2d8c8 100%)" }, 
              "particles":{ "number":{ "value":10, "density":{ "enable":true, "value_area":600 } }, 
              "color":{ "value":"#8a6a52" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, 
              "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.1, "random":true, "anim":{ "enable":false, "speed":1, 
                "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, 
                "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, 
                  "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, 
                  "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, 
                    "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, 
                    "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, 
                    "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
          />
          <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
            <Experience section={0} menuOpened={menuOpened} />
          </Canvas>
          <Interface />
          <Menu
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        </>
      )}
      <Leva hidden />
      
      <Routes>
        <Route path="/" element={null} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<ProfessionalExperience />} />
        <Route path="/chariot" element={<Chariot />} />
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
