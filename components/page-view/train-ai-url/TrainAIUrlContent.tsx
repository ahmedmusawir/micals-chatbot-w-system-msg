import { Page } from "@/components/globals";
import Head from "next/head";
import React from "react";
import axios from "axios";
import { useTrainAI } from "@/contexts/TrainAIContext";
import Spinner from "@/components/ui-ux/common/Spinner";
import styles from "./ChatMessage.module.scss";
import { useRouter } from "next/router";

const TrainAIUrlContent = () => {
  const router = useRouter();
  const { url, setUrl, isLoading, setIsLoading, serverLogs, setServerLogs } =
    useTrainAI();

  const handleURLSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/train-ai-w-url-faiss-store", {
        url,
      });
      // Store the URL in LocalStorage
      localStorage.setItem("lastTrainedURL", url);
      console.log("Server Response:", response);
      // The server sends back logs in the response
      setServerLogs(response.data.logs);
    } catch (error) {
      console.error("Error training AI:", error);
      // Handle error appropriately
    }
    setIsLoading(false);
  };
  return (
    <>
      <Head>
        <title>Next Page TrainAIUrlContent</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <div className="flex flex-col items-center justify-center">
          <button className="btn mb-2">
            Last trained on:
            <div className="badge">{url && <p>{url}</p>}</div>
          </button>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="input input-bordered w-full max-w-xl"
            required
          />
          <button onClick={handleURLSubmit} className="btn mt-4">
            Start Training AI
          </button>
          {isLoading && <Spinner />}
          <section className={styles.messageContainer}>
            <h3 className="text-center">The Server Messages</h3>
            <pre className="mt-4">
              <code>{serverLogs.join("\n")}</code>
            </pre>
          </section>
          <button
            onClick={() => {
              router.push("/mical-gpt-slg");
            }}
            className="btn mt-4"
          >
            Back to Chatroom
          </button>
        </div>
      </Page>
    </>
  );
};

export default TrainAIUrlContent;
