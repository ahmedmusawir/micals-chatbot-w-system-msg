import { Message } from "@/global-interfaces";
import React from "react";
import ChatMessage from "../chat-common/ChatMessage";
import Spinner from "../common/Spinner";

interface Props {
  chatMessages: Message[];
  isLoading: boolean;
}

const TranslateDisplayBlock = ({ chatMessages, isLoading }: Props) => {
  return (
    <div className="overflow-y-auto flex-1  bg-gray-100">
      {/* User & AI Output */}
      <article className="flex justify-center p-5 mb-24  w-[100%]">
        <section className="w-[90%]">
          {/* Map through the chat messages and render them */}
          {chatMessages.map((msg, index) => (
            <ChatMessage key={index} isUser={msg.isUser} message={msg.text} />
          ))}
          {isLoading && <Spinner />}
        </section>
      </article>
    </div>
  );
};

export default TranslateDisplayBlock;
