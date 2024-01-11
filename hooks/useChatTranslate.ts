import { Message } from "@/global-interfaces";
import { useState } from "react";

const useChatTranslate = (apiEndpoint: string) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitMessage = async (
    userInput: string,
    inputLang: string,
    outputLang: string
  ) => {
    setIsLoading(true);

    // Add user's message to the chat
    setChatMessages((prev) => [...prev, { isUser: true, text: userInput }]);

    // API call to get the AI response
    const response = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({ prompt: userInput, inputLang, outputLang }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reader = response.body?.getReader();

    if (reader) {
      setIsLoading(false);
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        aiResponse += new TextDecoder().decode(value);

        setChatMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (!lastMessage.isUser && !lastMessage.text.endsWith(aiResponse)) {
            return prev
              .slice(0, -1)
              .concat([{ ...lastMessage, text: aiResponse }]);
          } else {
            return [...prev, { isUser: false, text: aiResponse }];
          }
        });
      }
    }
  };

  return { chatMessages, isLoading, submitMessage, setChatMessages };
};

export default useChatTranslate;
