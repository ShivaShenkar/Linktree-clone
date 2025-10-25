import styles from "./styles/LinkItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

function LinkItem(props){
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
        <div className={styles.linkItem}>
            <div className={styles.iconAndUsername}>
                <FontAwesomeIcon icon={`fa-brands ${faSocial} `} size="xl" /> 
                <p className={styles.linkText}>{props.social} - {props.username}</p>
                <FontAwesomeIcon className={styles.ellipsisIcon} icon="fa-solid fa-ellipsis-vertical" />
            </div>
        </div>

    );
}
export default LinkItem;