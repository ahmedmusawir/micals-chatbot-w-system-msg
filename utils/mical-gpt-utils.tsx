import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import * as cheerio from "cheerio";
import * as puppeteer from "puppeteer";
import { Document } from "langchain/document";

export async function processURLToFaissVectorStore(url: string) {
  console.log("Making the call to:", url);

  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: "new",
    },
    async evaluate(page: puppeteer.Page, browser: puppeteer.Browser) {
      try {
        await page.goto(url, { waitUntil: "networkidle0" });
        const textContent = await page.evaluate(() => {
          // Clean up the HTML content and extract the text
          const bodyElement = document.querySelector("body");
          return bodyElement ? bodyElement.textContent : "";
        });
        await browser.close();
        return textContent || "";
      } catch (error) {
        console.error("Error occurred while loading the page: ", error);
        await browser.close();
        return ""; // return empty string in case of an error
      }
    },
  });

  console.log("Loading URL to Docs");

  const urlDocs = await loader.load();
  const pageContent = urlDocs[0].pageContent; // Access the extracted text content

  // console.log(pageContent);

  // Load the HTML content into cheerio
  const $ = cheerio.load(pageContent);

  $("script, style").remove(); // Remove unnecessary elements

  // Further clean-up using regular expressions (example)
  const cleanedText = $("body")
    .html()
    ?.replace(/<style[^>]*>.*<\/style>/gms, "");

  // Load the cleaned HTML again to extract text
  const cleaned$ = cheerio.load(cleanedText!);

  // Extract the text from the HTML content
  const textContent = cleaned$("body").text();

  // console.log(textContent);

  const docs = textContent.replace(/[^\x20-\x7E]+/g, ""); // Remove non-ASCII characters

  //   console.log(docs);

  // Create Document instances
  const documents = [new Document({ pageContent: docs })];

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
  });

  const splitDocuments = await splitter.splitDocuments(documents);

  //   console.log(splitDocuments);

  // Initialize OpenAI embeddings
  const embeddings = new OpenAIEmbeddings();
  // Process and store embeddings in batches
  const batchSize = 10; // Adjust based on your needs
  let allDocs = [];

  for (let i = 0; i < splitDocuments.length; i += batchSize) {
    const batch = splitDocuments.slice(i, i + batchSize);

    // Add batch documents to allDocs array
    allDocs.push(...batch);
  }

  // Load the docs into the vector store
  const vectorStore = await FaissStore.fromDocuments(allDocs, embeddings);

  await vectorStore.save("./store/faiss-vector-store/");

  console.log("Faiss Vector store created successfully!");
}
