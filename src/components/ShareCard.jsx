import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Box,Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useState,useRef,useEffect} from "react";
import SocialGallery from "./SocialGallery.jsx";
import styles from "./styles/ShareCard.module.css";


export default function ShareCard({username,social,link,className}){

    const [isCopied,setIsCopied] = useState(false);
    const cardRef = useRef(null);
    if(social ==="YT")
        social = "YouTube";
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
    <Box ref={cardRef} className={`${styles.card} ${className}`} sx={{
        position:"fixed",
        width: { xs: "90vw", sm: "70vw", md: "50vw" },
        height: { xs: "auto", sm: "25rem", md: "30rem" },
        // left: { xs: "5vw", sm: "15vw", md: "25vw" },
        // top: { xs: "10vh", sm: "15vh", md: "12.5vh" },
        maxHeight: "90vh",
        zIndex:2,
        "@keyframes rotBGimg":{
            from:{
                transform: "rotate(0deg)",
            },
            to:{
                transform: "rotate(360deg)",
            }
        },
        '::before':{
            content: '""',
            position: "absolute",
            border:"1px solid black",
            backgroundImage: "linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255))",
            width:"20%",
            height: "calc(var(--card-diagonal) + 30%)",
            animation: "rotBGimg 3s linear infinite",
            transition: "all 0.2s linear",
            ZIndex:0,
        },
        "::after ":{
            content: "''",
            position: "absolute",
            inset: "5px",
            borderRadius: "15px",
            ZIndex:1,
            backgroundColor: "#fff",
        } 

    }}>
        
        
        <Box className={styles.content} sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"space-around",
            padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            overflow: "auto",
            borderRadius: "10px",
        }}>
            <Typography sx={{
                fontSize: { xs: "1.5rem", sm: "2.5rem", md: "4rem" },
                fontFamily:"Roboto,sans-serif",
                fontWeight:"200",
                fontStyle:"italic",
                textAlign: "center",
                lineHeight: 1.2
            }}>Share the link of {username} on {social}</Typography>
            <Box className={isCopied ? styles.copied : ""} sx={{
                display: "flex", 
                alignItems: "center", 
                gap: 1, 
                whiteSpace: "nowrap", 
                marginBottom: { xs: "1rem", sm: "2rem", md: "3rem" },
                flexWrap: "wrap",
                justifyContent: "center"
            }}>
                <Typography sx={{
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                    fontFamily:"Roboto,sans-serif",
                    fontWeight:"200",
                    fontStyle:"italic",
                    wordBreak: "break-all"
                }}>{link}</Typography>
            <Tooltip
                title="Copied!"
                arrow
                placement="top"
                open={isCopied}
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <Box component="span" sx={{display: "inline-flex", cursor: "pointer"}} onClick={()=>{
                    setIsCopied(true);
                    navigator.clipboard.writeText(link);
                    window.clearTimeout(window.__copiedTimer);
                    window.__copiedTimer = window.setTimeout(()=> setIsCopied(false), 1200);
                }}>
                    <FontAwesomeIcon icon="fa-solid fa-copy" />
                </Box>
            </Tooltip>
            </Box>

            <SocialGallery style={{marginBottom:"3rem"}} link={link} username={username} social={social}/>
        </Box>
    </Box>);
}