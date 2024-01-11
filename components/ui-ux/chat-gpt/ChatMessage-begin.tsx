import { FaRobot, FaUserCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
// import styles from "./ChatMessage.module.scss";
import CopyButton from "./CopyButton";

interface Props {
  isUser: boolean;
  message: string;
}

const ChatMessage = ({ isUser, message }: Props) => {
  // Apply different styles based on the speaker
  const messageStyles = isUser
    ? "bg-blue-100 text-right"
    : "bg-white text-left ml-5";
  const iconStyles = isUser ? "justify-end" : "justify-start";
  const Icon = isUser ? FaUserCircle : FaRobot;

  return (
    <div className={`flex ${iconStyles} my-5`}>
      <Icon className={`flex-shrink-0 h-8 w-8 ${isUser ? "mr-4" : "ml-4"}`} />
      <div className={`p-5 mb-8 rounded-lg flex-grow ${messageStyles}`}>
        <section>
          <ReactMarkdown>{message}</ReactMarkdown>
        </section>
      </div>
    </div>
  );
};

export default ChatMessage;
