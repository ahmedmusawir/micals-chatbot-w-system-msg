import { useTranslateLangs } from "@/contexts/TranslateContext";
import { FormEvent, useState } from "react";

const SystemPromptInput = () => {
  const { systemInput, setSystemInput } = useTranslateLangs();

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const resetTextArea = () => {
    setSystemInput(""); // Clear the input field after submission
  };

  return (
    <div className="w-full mt-3">
      <form onSubmit={handleChatSubmit} className="flex flex-col">
        <textarea
          value={systemInput}
          onChange={(e) => setSystemInput(e.target.value)}
          className="mb-5 h-96 p-5"
          placeholder="Type your message..."
          aria-label="Type your message"
          required
        />
        <section className="flex mr-3">
          <button type="submit" className="btn w-[50%] mx-1" aria-label="Send">
            Save
          </button>
          <button
            type="button"
            className="btn btn-error w-[50%] mx-1"
            aria-label="Send"
            onClick={resetTextArea}
          >
            Clear
          </button>
        </section>
      </form>
      <p className="mt-12 font-bold">
        This app is NOT mobile responsive. So plz always use full screen view
        while testing. Don't have time for that crap right now ... sorry!
      </p>
    </div>
  );
};

export default SystemPromptInput;
