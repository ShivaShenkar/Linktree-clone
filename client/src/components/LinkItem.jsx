import styles from "./styles/LinkItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState,createContext,useMemo } from "react";
import {library,findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ShareCard from "./ShareCard.jsx";
import { createPortal } from "react-dom";


library.add(fas, far, fab)
const LinkContext = createContext(null); 


function LinkItem(props){
    const [isShareHover,setIsShareHover] = useState(false);
    const [isShareClicked,setIsShareClicked] = useState(false);
      
    
    const handleExit = () => {
        setIsShareClicked(false);
        setIsShareHover(false);
    };
    const faSocial = `fa-${props.social.toLowerCase()}`;
    const findIconObj = findIconDefinition({ iconName: faSocial });
    console.log(findIconObj)
    const isIconAvailable = (findIconObj !== undefined);
    

    
    return (
        <>
        <LinkContext.Provider value={props}>
        <div className={`${styles.linkItem} ${!isShareHover ? styles.linkAnimation : ""}`} onClick={()=>{
                if(!isShareHover){
                    window.open(props.link, "_blank");
                }
            }
        }

            >
            <div className={styles.iconAndUsername}>
                {findIconObj&&<FontAwesomeIcon icon={`fa-brands ${faSocial} `} size="xl" />}
                <p className={styles.linkText}  >{props.social} - {props.username} </p>
                <FontAwesomeIcon className={styles.ellipsisIcon} icon="fa-solid fa-ellipsis-vertical" onMouseEnter={()=>setIsShareHover(true)} onMouseLeave={()=>setIsShareHover(false)}  onClick={()=>{setIsShareClicked(true);setIsShareHover(true)}}   />
            </div>
        </div>
        {isShareClicked && createPortal(<ShareCard onExit={handleExit}/>,document.getElementById("modal-root"))}
        </LinkContext.Provider>
        </>
        
    );
} 
export default LinkItem; export {LinkContext};