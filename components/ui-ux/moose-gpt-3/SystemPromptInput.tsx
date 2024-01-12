import { useTranslateLangs } from "@/contexts/TranslateContext";
import { BarsArrowUpIcon, UsersIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";

const SystemPromptInput = () => {
  const { systemInput, setSystemInput } = useTranslateLangs();

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSystemInput(""); // Clear the input field after submission
  };

  return (
    // <div className="w-full">
    <div className="w-[95%] mt-3">
      <form onSubmit={handleChatSubmit} className="flex flex-col">
        <textarea
          value={systemInput}
          onChange={(e) => setSystemInput(e.target.value)}
          className="mb-5 h-64 p-5"
          placeholder="Type your message..."
          aria-label="Type your message"
          required
        />
        <button type="submit" className="btn" aria-label="Send">
          Save
        </button>
      </form>
    </div>
  );
};

export default SystemPromptInput;
