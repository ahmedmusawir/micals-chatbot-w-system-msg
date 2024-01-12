import { createContext, ReactNode, useContext, useState } from "react";

interface TrainAIContextProps {
  url: string;
  serverLogs: string[];
  isLoading: boolean;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setServerLogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const TrainAIContext = createContext<TrainAIContextProps | undefined>(
  undefined
);

interface TrainAIProviderProps {
  children: ReactNode;
}

export const TrainAIProvider = ({ children }: TrainAIProviderProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverLogs, setServerLogs] = useState<string[]>([]);

  return (
    <TrainAIContext.Provider
      value={{
        url,
        setUrl,
        serverLogs,
        setServerLogs,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TrainAIContext.Provider>
  );
};

export const useTrainAI = () => {
  const context = useContext(TrainAIContext);
  if (!context) {
    throw new Error(
      "useTranslateLangs must be used within a TranslateProvider"
    );
  }
  return context;
};
