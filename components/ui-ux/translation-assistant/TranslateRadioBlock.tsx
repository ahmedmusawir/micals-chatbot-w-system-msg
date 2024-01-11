import { useTranslateLangs } from "@/contexts/TranslateContext";
import { ChangeEvent } from "react";

const TranslateRadioBlock = () => {
  const { outputLangs, setOutputLang } = useTranslateLangs();
  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedLang = outputLangs.find(
      (lang) => lang.id === event.target.id
    );
    if (selectedLang) {
      setOutputLang(selectedLang.title);
    }
  };
  return (
    <div>
      <label className="text-base font-semibold text-gray-900">
        Pick A Language:
      </label>
      <p className="text-sm text-gray-500">
        Once you pick a language, anything you pass to the assistant via the
        chat input will be translated into that language
      </p>
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4">
          {outputLangs.map((lang, index) => (
            <div key={lang.id} className="flex items-center">
              <input
                id={lang.id}
                name="notification-method"
                type="radio"
                defaultChecked={index === 0}
                onChange={handleLanguageChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={lang.id}
                className="ml-3 block text-lg font-medium leading-6 text-gray-900"
              >
                {lang.title} ({lang.country})
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default TranslateRadioBlock;
