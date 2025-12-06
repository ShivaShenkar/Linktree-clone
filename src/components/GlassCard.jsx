import { Box} from "@mui/material";
import {useState} from "react";
import Links from "./Links.jsx"
import Avatar from '@mui/material/Avatar';
import { Grow } from "@mui/material";
import styles from "./styles/GlassCard.module.css";
import profilePic from "../assets/png-jpg/profile_pic.jpg";
import db from "../data/db.js";

function GlassCard({ bgColor = "#FFF", blur = "10px", ...rest}) { 

    const [imageUrl,setImageUrl] = useState(profilePic);
    const [username,setUsername] = useState(db.username);
    const [bio,setBio] = useState(db.bio);
    return <>
        <Box ref={rest.ref} className = {styles['glass-card']}>
            <Grow in timeout={500}><Avatar src={imageUrl} className={styles['card-avatar']}/></Grow>
            <Grow in timeout={1000}><h2 className={styles['card-username']}>{username}</h2></Grow>
            <Grow in timeout={1500}><p className={styles['card-bio']}>{bio}</p></Grow>
            <Links/>      
        </Box>
           
                
    </>;
}
 
export default GlassCard;
