import {useRef,useEffect,useState} from 'react'
import GlassCard from './components/GlassCard.jsx'
import MatrixRain from './components/MatrixRain.jsx';
import { Grow } from '@mui/material'
import eruda from 'eruda';
import utils from './utilities.jsx'

function App() {
  const glassRef = useRef(null);
  const [needsPermission, setNeedsPermission] = useState(utils.isPermissionNeededMobile());
  
  useEffect(()=>{
        if(glassRef.current){
          return utils.deviceTypeSelector(glassRef,needsPermission);
        }
    },[needsPermission]);

  const handlePermissionClick = async () => {
    await utils.handleMobilePermissionRequest(setNeedsPermission);
  };

  return (
    <>
    {/* <script src="node_modules/eruda/eruda.js"></script>
    <script>{eruda.init()}</script> */}
    <MatrixRain/>
    {needsPermission && 
      <button className='permission-button' onClick={handlePermissionClick}>
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
