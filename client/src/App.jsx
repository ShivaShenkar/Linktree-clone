import {useRef,useEffect,useState} from 'react'
import GlassCard from './components/GlassCard.jsx'
import MatrixRain from './components/MatrixRain.jsx';
import { Grow } from '@mui/material'
import eruda from 'eruda';
import utils from './utilities.jsx'

function App() {
  const glassRef = useRef(null);
  const [needsPermission, setNeedsPermission] = useState(false);

  

  useEffect(()=>{
      if (window.matchMedia('(pointer: fine)').matches) { 
        window.addEventListener('mousemove', utils.handleCardTilt(glassRef));
        return () => window.removeEventListener('mousemove', utils.handleCardTilt(glassRef));
      } 
      if ('DeviceOrientationEvent' in window) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          setNeedsPermission(true);
        } else {
          // For devices that don't require permission (like Android)
          utils.setupDeviceOrientation();
        }
        return () => window.removeEventListener('deviceorientation', utils.handleOrientation(glassRef));
      }
    }
  ,[]);
  return (
    <>
    <script src="node_modules/eruda/eruda.js"></script>
    <script>{eruda.init()}</script>
    <MatrixRain/>
    {needsPermission && 
      <button className='permission-button' onClick={handlePermissionRequest}>
        Enable Motion Effects
      </button>
    }
    <div className="app-root">
      <Grow in>
        <div className="glass-wrapper">
          <GlassCard ref={glassRef} />
        </div>
      </Grow>
    </div>
    </>  );
}

export default App
