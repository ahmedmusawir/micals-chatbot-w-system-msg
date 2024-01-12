import Head from "next/head";
import React from "react";
import { Page } from "../../globals";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import UserInputBottom from "@/components/ui-ux/chat-common/UserInputBottom";
import TranslateDisplayBlock from "@/components/ui-ux/translation-assistant/TranslateDisplayBlock";
import useChatStreaming from "@/hooks/useChatStreaming";
import SidebarSLG from "@/components/ui-ux/mical-gpts/SidebarSLG";
import { useTrainAI } from "@/contexts/TrainAIContext";

const MicalGPTSlgContent = () => {
  const { url } = useTrainAI();
  // Output Streaming Hook
  const { chatMessages, isLoading, submitMessage, setChatMessages } =
    useChatStreaming("/api/mical-slg-chat");
  // Function to handle the form submission
  const handleChatSubmit = async (userInput: string, systemInput: string) => {
    submitMessage(userInput, systemInput);
  };

  return (
    <>
      <Head>
        <title>Moose GPTs</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={true} customYMargin="my-0">
        <div className="flex">
          {/* Left Sidebar Column */}
          <SidebarSLG setChatMessages={setChatMessages} />
          {/* Left Sidebar Column ENDS*/}

          {/* Right Content Column */}
          <div className="flex-1 bg-gray-200 p-4">
            {/* Main Right Content Block */}
            <section className="flex flex-col h-[90vh]">
              {/* Top Chat Block */}
              <div className="flex items-center h-14">
                <ArrowLeftIcon className="mr-2 h-6 w-6 text-gray-600" />
                <h1 className="text-xl font-bold">
                  GPT on SLG |{" "}
                  <button className="btn mb-2">
                    Last trained on:
                    <div className="badge">{url && <p>{url}</p>}</div>
                  </button>
                </h1>
              </div>

              {/* Main Chat Display Block */}
              <TranslateDisplayBlock
                chatMessages={chatMessages}
                isLoading={isLoading}
              />

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

export default MicalGPTSlgContent;
