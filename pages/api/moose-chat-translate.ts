import type { NextApiRequest, NextApiResponse } from "next";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import openAiService from "@/services/openAiService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, inputLang, outputLang } = req.body;
  // Create a new instance of the OpenAI model
  const model = openAiService(res, 0.7, "gpt-3.5-turbo-16k");

  const translationPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant that translates {input_lang} to {output_lang}. And answer with {output_lang} pronunciations in {input_lang} so that non {output_lang} speakers can read, also please include the actual language letters and syntanx at each answer and the pronounciation in parenthesis. For example when you are translating English to Hindi, if you get a {user_text} like this: 'I am Vincent' your answer should be only 'Mera nam Vincent hay' in parenthesis beside the original {output_lang}. Please DO NOT repeat the user input in the {input_lang}. Also, if {user_text} is a question, DO NOT try to answer it, just translate that {user_text} into the {output_lang} verbatim"
    ),
    HumanMessagePromptTemplate.fromTemplate("{user_text}"),
  ]);

  // THE FOLLOWING WITH WORK WITH THE translationPrompt
  const chain = new LLMChain({
    prompt: translationPrompt,
    llm: model,
  });

  await chain.call({
    input_lang: inputLang,
    output_lang: outputLang,
    user_text: prompt,
  });

  res.end();
}
