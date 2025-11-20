import styles from "./styles/LinkItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState,useRef,useEffect} from "react";
import {library} from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ShareCard from "./ShareCard.jsx";
import { createPortal } from "react-dom";


library.add(fas, far, fab)

function LinkItem(props){
    const [isShareHover,setIsShareHover] = useState(false);
    const [isShareClicked,setIsShareClicked] = useState(false);
    let faSocial;
    switch(props.social){
        case "TikTok":
            faSocial = "fa-tiktok";
            break;
        case "Instagram":
            faSocial = "fa-instagram";
            break;
        case "YT":
            faSocial = "fa-youtube";
            break;
        case "LinkedIn":
            faSocial = "fa-linkedin"
    }
    return (
        <>
        <div className={`${styles.linkItem} ${!isShareHover ? styles.linkAnimation : ""}`} onClick={()=>{
                if(!isShareHover){
                    window.open(props.link, "_blank");
                }
            }
        }

            >
            <div className={styles.iconAndUsername}>
                <FontAwesomeIcon icon={`fa-brands ${faSocial} `} size="xl" /> 
                <p className={styles.linkText}>{props.social} - {props.username}</p>
                <FontAwesomeIcon className={styles.ellipsisIcon} icon="fa-solid fa-ellipsis-vertical" onMouseEnter={()=>setIsShareHover(true)} onMouseLeave={()=>setIsShareHover(false)}  onClick={()=>{setIsShareClicked(true);setIsShareHover(true)}}   />
            </div>
        </div>
        {isShareClicked && createPortal(<ShareCard username={props.username} social={props.social} link={props.link} />,document.getElementById("modal-root"))}
        </>
    );
} 
export default LinkItem;