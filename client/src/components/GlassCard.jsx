import { Box} from "@mui/material";
import { makeStyles } from "@mui/styles";
import color from "color";
import profilePic from "../assets/png-jpg/shiva_profile_pic.jpg"
import Links from "./Links.jsx"
import Avatar from '@mui/material/Avatar';
import { Grow } from "@mui/material";
import styles from "./styles/GlassCard.module.css";

function GlassCard({ bgColor = "#FFF", blur = "10px", ...rest}) { 
    // pass a small props object to the hook so rule functions can access it
    return <>
        <Box ref={rest.ref} className = {styles['glass-card']}>
            <Grow in timeout={500}><Avatar alt="theGoatShiva" src={profilePic} className={styles['card-avatar']}/></Grow>
            <Grow in timeout={1000}><h2 className={styles['card-username']}>{rest.username}</h2></Grow>
            <Grow in timeout={1500}><p className={styles['card-bio']}>{rest.bio}</p></Grow>
            <Links props={{linksArr:rest.socials,delay:4}}/>      
        </Box>
           
                
    </>;
}

export default GlassCard;
Reflect