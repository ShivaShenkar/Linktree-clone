import {useRef,useEffect,useState} from 'react'
import GlassCard from './components/GlassCard.jsx'
import MatrixRain from './components/MatrixRain.jsx';
import { Grow } from '@mui/material'
import eruda from 'eruda';
import utils from './utilities.jsx'
import ReactDOM from "react-dom"
import React from "react"


//function to check if permission is needed to access DeviceOrientation API (for iOS 13+ devices)
function isPermissionNeededMobile() {
  return (window.matchMedia('(pointer: coarse)').matches && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission === 'function');
}

function App() {
  const glassRef = useRef(null);
  const [needsPermission, setNeedsPermission] = useState(isPermissionNeededMobile());
  useEffect(()=>{
      return utils.deviceTypeSelector(glassRef,setNeedsPermission);
    },[]);
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
