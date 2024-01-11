import { BarsArrowUpIcon, UsersIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (userInput: string) => void;
}

const UserInputBottom = ({ onSubmit }: Props) => {
  const [userInput, setUserInput] = useState("");

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userInput); // Call the passed onSubmit function with the user input
    setUserInput(""); // Clear the input field after submission
  };

  return (
    // <div className="w-full">
    <div className="w-[95%] mt-3">
      <form onSubmit={handleChatSubmit} className="flex space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-grow rounded-l-md py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
          placeholder="Type your message..."
          aria-label="Type your message"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-r-md bg-blue-500 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 py-5"
          aria-label="Send"
        >
          <BarsArrowUpIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};

export default UserInputBottom;
