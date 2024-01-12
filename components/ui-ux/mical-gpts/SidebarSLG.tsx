import { Language, Message } from "@/global-interfaces";
import React from "react";

interface Props {
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

// const SidebarSLG = ({ setChatMessages }: Props) => {
const SidebarSLG = () => {
  // Function to handle clear messages
  const handleClearMessage = () => {
    // setChatMessages([]);
  };
  return (
    <>
      <div className="hidden sm:block w-64 bg-gray-300 p-4">
        <button className="btn" onClick={handleClearMessage}>
          Clear Messages
        </button>
      </div>
    </>
  );
};

export default SidebarSLG;
