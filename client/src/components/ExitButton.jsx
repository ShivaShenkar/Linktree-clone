import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/ExitButton.module.css"

library.add(fas)

function ExitButton({ onExit,className }) {
  const otherClasses = (className ? ` ${className}` : '');
  return (
    <button onClick={onExit} className={styles['exit-button'] + otherClasses} aria-label="Close">
      <FontAwesomeIcon icon="fa-solid fa-xmark" className={styles.icon} />
    </button>
  );
}

export default ExitButton;