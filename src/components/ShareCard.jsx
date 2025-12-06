import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Box,Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useState,useRef,useEffect,useContext} from "react";
import SocialGallery from "./SocialGallery.jsx";
import styles from "./styles/ShareCard.module.css";
import {LinkContext} from "./LinkItem.jsx";
import ExitButton from "./ExitButton.jsx";

export default function ShareCard({onExit}){
    const linkObj = useContext(LinkContext);
    

    const [isCopied,setIsCopied] = useState(false);
    const cardRef = useRef(null);
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const updateDiagonal = () => {
          const { width, height } = card.getBoundingClientRect();
          const diagonal = Math.sqrt(width ** 2 + height ** 2);
          card.style.setProperty('--card-diagonal', `${diagonal}px`);
        };
        updateDiagonal();
        const observer = new ResizeObserver(updateDiagonal);
        observer.observe(card);
        return () => observer.disconnect();
      }, []);
    return(
    
    <Box ref={cardRef} className={`${styles.card}`} sx={{
        width: { xs: "90vw", sm: "70vw", md: "50vw" },
        maxWidth: { xs: "90vw", sm: "70vw", md: "50vw" },
        height: { xs: "auto", sm: "25rem", md: "30rem" },
        maxHeight: { xs: "85vh", sm: "85vh", md: "85vh" },
        left: { xs: "5vw", sm: "15vw", md: "25vw" },
        top: { xs: "10vh", sm: "15vh", md: "12.5vh" },
        right: { xs: "5vw", sm: "15vw", md: "25vw" },
        boxSizing: "border-box",
        overflow: "hidden"}}>
        <ExitButton onExit={onExit} className={styles['exit-button']}/>
        
        
        <Box className={styles['content']} sx={{
            padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            boxSizing: "border-box",
            "::before":{
                height: `calc(sqrt(pow(50vw, 2) + pow(30rem, 2)))`,
            }
        }}>
            
            <Typography className={styles.title} sx={{
                fontSize: { xs: "1rem", sm: "2.5rem", md: "3rem",lg: "3.5rem"},
                lineHeight: { xs: "1.3", sm: "1.3", md: "1.2" }
            }}>
                Share the link of {linkObj.username} on {linkObj.social}
            </Typography>
            <Box className={`${styles['link-row']}`} sx={{marginBottom: { xs: "1rem", sm: "2rem", md: "3rem" }}}>
                <Typography className={styles['link-text']} sx={{fontSize: { xs: "0.75rem", sm: "1rem", md: "1.75rem", lg: "2rem", xl: "2.25rem" }}}>
                    {linkObj.link}
                </Typography>
            <Tooltip title="Copied!" arrow placement="top" open={isCopied} disableFocusListener disableHoverListener disableTouchListener>
                <Box component="span" className={styles['copy-icon']} onClick={()=>{
                    setIsCopied(true);
                    navigator.clipboard.writeText(linkObj.link);
                    window.clearTimeout(window.__copiedTimer);
                    window.__copiedTimer = window.setTimeout(()=> setIsCopied(false), 1200);
                }}>
                    <FontAwesomeIcon icon="fa-solid fa-copy" />
                </Box>
            </Tooltip>
            </Box>
            <SocialGallery/>
        </Box>
    </Box>);
}