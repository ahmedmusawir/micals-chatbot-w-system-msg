import { outputLangs, inputLang } from "@/demo-data/languages";
import { Language } from "@/global-interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

interface TranslateContextProps {
  outputLangs: Language[];
  outputLang: string;
  inputLang: string;
  systemInput: string;
  setOutputLang: React.Dispatch<React.SetStateAction<string>>;
  setSystemInput: React.Dispatch<React.SetStateAction<string>>;
}

const TranslateContext = createContext<TranslateContextProps | undefined>(
  undefined
);

interface TranslateProviderProps {
  children: ReactNode;
}

export const TranslateProvider = ({ children }: TranslateProviderProps) => {
  const [outputLang, setOutputLang] = useState<string>(outputLangs[0].title);
  const [systemInput, setSystemInput] = useState("");

  return (
    <TranslateContext.Provider
      value={{
        outputLangs,
        outputLang,
        inputLang,
        systemInput,
        setOutputLang,
        setSystemInput,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslateLangs = () => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error(
      "useTranslateLangs must be used within a TranslateProvider"
    );
  }
  return context;
};
