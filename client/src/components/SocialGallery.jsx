import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { LinkContext } from "./LinkItem";
import { useContext} from "react"; 


library.add(fas, fab,far);



export default function SocialGallery(){
    const linkObj = useContext(LinkContext);
    const encodedLink = encodeURIComponent(linkObj.link);
    const encodedUsername = encodeURIComponent(linkObj.username);
    const encodedSocial = encodeURIComponent(linkObj.social);
    return (
        <>
        
        <div className="social-gallery" style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"0.5rem",flexWrap:"wrap",maxWidth:"100%",boxSizing:"border-box",padding:"0 0.5rem"}}>
            <a href={`https://x.com/intent/tweet?text=Check%20out%20the%20${encodedSocial}%20of%20${encodedUsername}!%20${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/socialGallery/X.jpg" />
            </a>
            <a href={`https://www.facebook.com/socialGallery/sharer.php?u=${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/socialGallery/facebook.png" />
            </a>
            <a href={`https://wa.me/?text=Check%20out%20the%20${encodedSocial}%20of%20${encodedUsername}!%20${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar>
                    <img src="/src/assets/svg/whatsapp.svg" style={{width:"120%",height:"120%"}} />
                </Avatar>
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/socialGallery/LinkedIn.png" />
            </a>
            <a href="https://www.messenger.com/new" target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/socialGallery/messanger.png" slotProps={{img:{
                    style: { transform: 'scale(0.7)', transformOrigin: 'center' } 
                }}}/>
            </a>
            <a href={`snapchat://creativeKitWeb/camera/1?attachmentUrl=${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/socialGallery/snapchat.jpg" />
            </a>
            <a href={`mailto:?subject=Check%20out%20the%20${encodedSocial}%20of%20${encodedUsername}!%20${encodedLink}`}>
                <Avatar>
                    <FontAwesomeIcon icon="fa-solid fa-envelope" size="lg" />
                </Avatar>
            </a>
        </div>
        </>
    )
}