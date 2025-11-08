import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, fab,far);

export default function SocialGallery({style,link,username,social}){
    const encodedLink = encodeURIComponent(link);
    const encodedUsername = encodeURIComponent(username);
    const encodedSocial = encodeURIComponent(social);
    return (
        <div className="social-gallery" style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",gap:"1rem",...style}}>
            <a href={`https://x.com/intent/tweet?text=Check%20out%20the%20${encodedSocial}%20of%20${encodedUsername}!%20${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/X.jpg" />
            </a>
            <a href={`https://www.facebook.com/sharer.php?u=${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/facebook.png" />
            </a>
            <a href={`https://wa.me/?text=Check%20out%20the%20${encodedSocial}%20of%20${encodedUsername}!%20${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar>
                    <img src="/src/assets/svg/whatsapp.svg" style={{width:"120%",height:"120%"}} />
                </Avatar>
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/LinkedIn.png" />
            </a>
            <a href="https://www.messenger.com/new" target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/messanger.png" slotProps={{img:{
                    style: { transform: 'scale(0.7)', transformOrigin: 'center' } 
                }}}/>
            </a>
            <a href={`snapchat://creativeKitWeb/camera/1?attachmentUrl=${encodedLink}`} target="_blank" rel="noopener noreferrer">
                <Avatar src="/src/assets/png-jpg/snapchat.jpg" />
            </a>
            <a href={`mailto:?subject=Check%20out%20the%20${encodedSocial}%20of%20${encodedUsername}!%20${encodedLink}`}>
                <Avatar>
                    <FontAwesomeIcon icon="fa-solid fa-envelope" size="lg" />
                </Avatar>
            </a>
        </div>
    )
}