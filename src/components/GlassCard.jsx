import { Box} from "@mui/material";
import { makeStyles } from "@mui/styles";
import color from "color";
import profilePic from "../assets/shiva_profile_pic.jpg"
import Links from "./Links.jsx"
import Avatar from '@mui/material/Avatar';
import { Grow } from "@mui/material";

const useStyles = makeStyles({
    glass: (props) => ({
        fontFamily:"DM Sans,sans-serif",
        width: "100%",
        height: "100%",
        backgroundColor: color(props.bgColor).alpha(0.2).string(),
        backgroundImage: `linear-gradient(to bottom right, ${ color(props.bgColor).alpha(0.2).string()}, ${ color(props.bgColor).alpha(0).string()})`,
        backdropFilter: `blur(${props.blur})`,
        boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
        borderRadius: 20,
        // "& > *":{
        //     border: "1px solid black"
        // },
        "& > p,h2":{
            color:"white"
        },
        display: "flex",
        flexDirection: "column",
        justifyContent:"flex-start",
        alignItems: "center",
        gap: "2vh",
        transformStyle:"preserve-3d",
        transition:"0.2s ease",
        "@media (max-width: 1024px)":{
            width: "min(85vw, 380px)",
            padding: "1.5rem",
        }

    }),
});

function GlassCard({ bgColor = "#FFF", blur = "10px", ...rest}) { 
    // pass a small props object to the hook so rule functions can access it
    const classes = useStyles({ bgColor, blur });
    return <>
        <Box ref={rest.ref} className = {classes.glass}>
            <Grow in timeout={500}><Avatar alt="theGoatShiva" src={profilePic} sx = {{height: "96px", width: "96px",marginTop:"2rem"}}/></Grow>
            <Grow in timeout={1000}><h2 id="username">{rest.username}</h2></Grow>
            <Grow in timeout={1500}><p id="bio">{rest.bio}</p></Grow>
            <Links linksArr={rest.socials} delay={4}/>      
        </Box>
           
                
    </>;
}

export default GlassCard;
Reflect