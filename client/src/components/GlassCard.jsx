import { Box} from "@mui/material";
import {useEffect,useState} from "react";
import Links from "./Links.jsx"
import Avatar from '@mui/material/Avatar';
import { Grow } from "@mui/material";
import styles from "./styles/GlassCard.module.css";

function GlassCard({ bgColor = "#FFF", blur = "10px", ...rest}) { 

    const [imageUrl,setImageUrl] = useState("");
    const [username,setUsername] = useState("");
    const [bio,setBio] = useState("");
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_HOST}/api/username`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        .then(response=>response.json())
        .then(data=>setUsername(data.username))
        .catch(error=>console.error("Error fetching username:",error));

        fetch(`${import.meta.env.VITE_SERVER_HOST}/api/bio`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        .then(response=>response.json())
        .then(data=>setBio(data.bio))
        .catch(error=>console.error("Error fetching bio:",error));

        fetch(`${import.meta.env.VITE_SERVER_HOST}/api/profile-pic`,{
            method: 'GET',
            headers: {
                'Content-Type': 'image/jpeg',
            },
            mode: 'cors'
        })
        .catch(error=>console.error("Error fetching profile picture:",error));
        setImageUrl(`${import.meta.env.VITE_SERVER_HOST}/api/profile-pic`);
    },[]);
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
Reflect