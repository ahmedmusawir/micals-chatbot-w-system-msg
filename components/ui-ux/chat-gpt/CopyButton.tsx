import { FaCopy } from "react-icons/fa6";
import styles from "./ChatMessage.module.scss";

interface Props {
  textToCopy: string;
}

const CopyButton = ({ textToCopy }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Text copied to clipboard");
    });
  };

  return (
    <button onClick={handleCopy} className={styles.copyButton}>
      <FaCopy className="h-7 w-7" />
    </button>
  );
};

export default CopyButton;
