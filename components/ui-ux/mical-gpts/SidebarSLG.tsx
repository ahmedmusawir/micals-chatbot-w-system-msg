import { Message } from "@/global-interfaces";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const SidebarSLG = ({ setChatMessages }: Props) => {
  const router = useRouter();

  const handleClearMessage = () => {
    setChatMessages([]);
  };

  const handleTrainAI = () => {
    router.push("/train-ai-url");
  };

  return (
    <>
      <div className="hidden sm:block w-64 bg-gray-300 p-4">
        <button className="btn w-full mt-3" onClick={handleClearMessage}>
          Clear Messages
        </button>
        <hr />
        <button className="btn w-full mt-3" onClick={handleTrainAI}>
          Train AI
        </button>
      </div>
    </>
  );
};

export default SidebarSLG;
