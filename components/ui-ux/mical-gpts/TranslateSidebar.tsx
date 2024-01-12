import { Language, Message } from "@/global-interfaces";
import React from "react";
import TranslateRadioBlock from "./TranslateRadioBlock";

interface Props {
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const TranslateSidebar = ({ setChatMessages }: Props) => {
  // Function to handle clear messages
  const handleClearMessage = () => {
    setChatMessages([]);
  };
  return (
    <>
      <div className="hidden sm:block w-64 bg-gray-300 p-4">
        <button className="btn" onClick={handleClearMessage}>
          Clear Messages
        </button>
        <section className="mt-10">
          <TranslateRadioBlock />
        </section>
      </div>
    </>
  );
};

export default TranslateSidebar;
