import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Box,Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import SocialGallery from "./SocialGallery.jsx";
import styles from "./styles/ShareCard.module.css";

export default function ShareCard({username,social,link}){
    const [isCopied,setIsCopied] = useState(false);
    if(social ==="YT")
        social = "YouTube";
    return(
    <Box className={styles.card} sx={{
        position:"fixed",
        width: { xs: "90vw", sm: "70vw", md: "50vw" },
        height: { xs: "auto", sm: "25rem", md: "30rem" },
        left: { xs: "5vw", sm: "15vw", md: "25vw" },
        top: { xs: "10vh", sm: "15vh", md: "12.5vh" },
        maxHeight: "90vh",
    }}>
        <div className={styles.blob}></div>
        
        <div className={styles.bg}></div>
        
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
    </Box>
    );
}