import {useRef,useEffect,useState} from 'react'
import GlassCard from './components/GlassCard.jsx'
import MatrixRain from './components/MatrixRain.jsx';
import { Grow } from '@mui/material'
import eruda from 'eruda';

function App() {
  const containerRef = useRef(null);
  const glassRef = useRef(null);
  const [initialOrientation, setInitialOrientation] = useState(null);
  const [needsPermission, setNeedsPermission] = useState(false);

  async function handlePermissionRequest() {
    try {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === 'granted') {
        setNeedsPermission(false);
        setupDeviceOrientation();
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }

  const setupDeviceOrientation = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
      }
    } else {
      // For devices that don't require permission
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  const handleCardTilt = (e) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = windowWidth/2;
    const centerY = windowHeight/2;
    
    const rotateX = ((e.clientY - centerY) / centerY) * 10; 
    const rotateY = ((e.clientX - centerX) / centerX) * 10;
    
    if (glassRef.current) {
      glassRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleOrientation = (e) => {
    if(window.matchMedia("(orientation: portrait)").matches)
      glassRef.current.style.transform = `rotateY(${-e.gamma}deg)`;
    else
      glassRef.current.style.transform = `rotateY(${-e.beta}deg)`;
  };

  let linksArr = [
    { id:1, social: "TikTok", username: "thegoatshiva" },
    { id:2, social: "Instagram", username: "thegoatshiva" },
    { id:3, social: "YT", username: "thegoatshiva" },
    {id:4, social:"LinkedIn", username:"Lior Fikhman"},
  ];
  useEffect(()=>{
      if (window.matchMedia('(pointer: fine)').matches) { 
        window.addEventListener('mousemove', handleCardTilt);
        return () => window.removeEventListener('mousemove', handleCardTilt);
      } 
      if ('DeviceOrientationEvent' in window) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          setNeedsPermission(true);
        } else {
          // For devices that don't require permission (like Android)
          setupDeviceOrientation();
        }
        return () => window.removeEventListener('deviceorientation', handleOrientation);
      }
    }
  ,[]);
  return (
    <>
    <script src="node_modules/eruda/eruda.js"></script>
    <script>{eruda.init()}</script>
    <MatrixRain/>
    {needsPermission && (
      <button 
        onClick={handlePermissionRequest}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Enable Motion Effects
      </button>
    )}
    <div className="app-root" style={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"space-around",height:'100vh'}}>
      <Grow in>
        <div ref={containerRef} className="glass-wrapper">
          <GlassCard ref={glassRef} username="thegoatshiva" bio="Be yourself, everyone else is already taken." socials = {linksArr}/>
        </div>
      </Grow>
    </div>
    </>  );
}

export default App
