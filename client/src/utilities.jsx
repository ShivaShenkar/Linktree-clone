/**
 * Checks if permission is needed to access DeviceOrientation API (for iOS 13+ devices)
 * @returns {boolean} - True if permission is needed, false otherwise
 */
export function isPermissionNeededMobile() {
  return (window.matchMedia('(pointer: coarse)').matches && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission === 'function');
}

/**
 * Handles the permission  request (if needed) for the mobile device orientation API
 * @param {Function} setNeedsPermission - Function to update the state indicating if permission is needed
 * @returns {Promise<boolean>} - True if the permission is granted, false otherwise
 */
export  async function handleMobilePermissionRequest(setNeedsPermission){
  //if permission is needed (iOS 13+)
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const response = await DeviceOrientationEvent.requestPermission();
      setNeedsPermission(false);

    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }
}





export const handleMouseCardTilt = (cardRef) => {
  return (e)=>{
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = windowWidth/2;
    const centerY = windowHeight/2;

    const linksElement = cardRef.current?.querySelector('.links');
    if (linksElement) {
      const linksRect = linksElement.getBoundingClientRect();
      const linksStartY = linksRect.top;      // Starting y position
      const linksEndY = linksRect.bottom;
      var rotateX;
      if(e.clientY<linksStartY)
        rotateX = ((e.clientY - linksStartY) / linksStartY) * 10;
      else if(e.clientY>linksEndY)
        rotateX = ((e.clientY - linksEndY) / linksEndY) * 10;
      else
        rotateX = 0;
      const rotateY = ((e.clientX - centerX) / centerX) * 10;

      if (cardRef.current) {
          cardRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      }  
    }
    else{
      const rotateX = ((e.clientY - centerY) / centerY) * 10;
      const rotateY = ((e.clientX - centerX) / centerX) * 10;

      if (cardRef.current) {
          cardRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      }
    }
    
  };
};

export const handleMobileCardOrientation = (cardRef) => {
    return (e) =>{
        if(window.matchMedia("(orientation: portrait)").matches)
            cardRef.current.style.transform = `rotateY(${-e.gamma}deg)`;
        else
            cardRef.current.style.transform = `rotateY(${-e.beta}deg)`;
    };
};

export function deviceTypeSelector(cardRef,needsPermission){
  console.log(cardRef.current.style);
  //if Device has a pointer:fine (mouse,mousepad,stylus)
  if (window.matchMedia('(pointer: fine)').matches) { 
    window.addEventListener('mousemove', handleMouseCardTilt(cardRef));
    return () => window.removeEventListener('mousemove', handleMouseCardTilt(cardRef));
  } 
  //else if device has a pointer:coarse (touchscreen) and supports DeviceOrientationEvent API (Mobile,Tablet)
  if (window.matchMedia('(pointer: coarse)').matches && 'DeviceOrientationEvent' in window) {
    // Check if permission is already granted
    if (!needsPermission) {
      window.addEventListener('deviceorientation', handleMobileCardOrientation(cardRef));
      return () => window.removeEventListener('deviceorientation', handleMobileCardOrientation);
    }
  }
  return undefined;
  
}




export default {isPermissionNeededMobile,handleMobilePermissionRequest,handleMouseCardTilt,handleMobileCardOrientation,deviceTypeSelector}

