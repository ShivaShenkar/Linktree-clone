export async function handlePermissionRequest() {
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

export const setupDeviceOrientation = async () => {
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

export const handleCardTilt = (cardRef) => {
    return (e)=>{
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const centerX = windowWidth/2;
        const centerY = windowHeight/2;
        
        const rotateX = ((e.clientY - centerY) / centerY) * 10; 
        const rotateY = ((e.clientX - centerX) / centerX) * 10;
        
        if (cardRef.current) {
            cardRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };
};


// export const handleCardTilt = (cardRef,e) => {
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;
//     const centerX = windowWidth/2;
//     const centerY = windowHeight/2;
    
//     const rotateX = ((e.clientY - centerY) / centerY) * 10; 
//     const rotateY = ((e.clientX - centerX) / centerX) * 10;
    
//     if (cardRef.current) {
//         cardRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
//     }
// };

// export const handleOrientation = (cardRef,e) => {
//     if(window.matchMedia("(orientation: portrait)").matches)
//         cardRef.current.style.transform = `rotateY(${-e.gamma}deg)`;
//     else
//         cardRef.current.style.transform = `rotateY(${-e.beta}deg)`;
// };

export const handleOrientation = (cardRef) => {
    return (e) =>{
        if(window.matchMedia("(orientation: portrait)").matches)
            cardRef.current.style.transform = `rotateY(${-e.gamma}deg)`;
        else
            cardRef.current.style.transform = `rotateY(${-e.beta}deg)`;
    };
};


export default {handlePermissionRequest,setupDeviceOrientation,handleCardTilt,handleOrientation}