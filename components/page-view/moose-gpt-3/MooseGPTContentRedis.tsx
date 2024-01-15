import Head from "next/head";
import React from "react";
import { Page } from "../../globals";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/ui-ux/common/Spinner";
import useChatStreaming from "@/hooks/useChatStreaming";
import ChatMessage from "@/components/ui-ux/moose-gpt-3/ChatMessage";
import UserInputBottom from "@/components/ui-ux/moose-gpt-3/UserInputBottom";
import SystemPromptInput from "@/components/ui-ux/moose-gpt-3/SystemPromptInput";
import { useTranslateLangs } from "@/contexts/TranslateContext";

const MooseGPTContentRedis = () => {
  const { systemInput } = useTranslateLangs();
  const { chatMessages, isLoading, submitMessage, setChatMessages } =
    useChatStreaming("/api/moose-chat-memory");
  // Function to handle the form submission
  const handleChatSubmit = async (userInput: string) => {
    submitMessage(userInput, systemInput);
  };

  // Function to handle clear messages
  const handleClearMessage = () => {
    setChatMessages([]);
  };

  return (
    <>
      <Head>
        <title>Mical GPTs</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={true} customYMargin="my-0">
        <div className="flex">
          {/* Left Sidebar Column */}
          {/* <div className="hidden sm:block w-96 bg-gray-300 p-4"> */}
          <div className="hidden sm:block w-1/4 bg-gray-300 p-4">
            <button className="btn mb-3" onClick={handleClearMessage}>
              Clear Messages
            </button>
            <hr />
            <h4 className="mt-5">
              Your System Message: <br />
              <small>This is where you change the bot's personality ...</small>
            </h4>
            <SystemPromptInput />
          </div>
          {/* Left Sidebar Column ENDS*/}

          {/* Right Content Column */}
          <div className="flex-1 bg-gray-200 p-4">
            {/* Main Right Content Block */}
            <section className="flex flex-col h-[90vh]">
              {/* Top Chat Block */}
              <div className="flex items-center h-14">
                <ArrowLeftIcon className="mr-2 h-6 w-6 text-gray-600" />
                <h1 className="text-xl font-bold">Mical's AI Chatroom</h1>
              </div>

              {/* Main Chat Display Block */}
              <div className="overflow-y-auto flex-1  bg-gray-100">
                {/* User & AI Output */}
                <article className="flex justify-center p-5 mb-24  w-[100%]">
                  <section className="w-[90%]">
                    {/* Map through the chat messages and render them */}
                    {chatMessages.map((msg, index) => (
                      <ChatMessage
                        key={index}
                        isUser={msg.isUser}
                        message={msg.text}
                      />
                    ))}
                    {isLoading && <Spinner />}
                  </section>
                </article>
              </div>

              {/* User input Block */}
              <div className=" bg-gray-200 h-21 flex justify-center items-center">
                <UserInputBottom onSubmit={handleChatSubmit} />
              </div>
            </section>
          </div>
          {/* Right Content Column ENDS*/}
        </div>
      </Page>
    </>
  );
};

export default MooseGPTContentRedis;
