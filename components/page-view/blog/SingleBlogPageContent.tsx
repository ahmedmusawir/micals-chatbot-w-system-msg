import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Page } from "../../globals";
import { PostData } from "@/data-layer/post-entities";
import Comments from "../../ui-ux/blog/Comments";
import { formatDate } from "@/utils";

interface Props {
  post: PostData;
}

const SingleBlogPageContent = ({ post }: Props) => {
  return (
    <>
      <Head>
        <title>Single Post Page</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <div className="relative isolate">
          <div className="bg-black/70 px-6 py-24 sm:py-16 lg:px-8">
            <img
              src={post.attributes.featuredImage}
              alt={post.attributes.title}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />

            <div className="mx-auto max-w-2xl text-center  backgroundImage relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {post.attributes.title}
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-300">
                {formatDate(post.attributes.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/blog"
          className="pt-5 pb-2 rounded-full bg-white px-2.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back To Blog Page
        </Link>
        <div className="mt-16">
          <div className="strapiMarkdownRichText">
            <ReactMarkdown>{post.attributes.content}</ReactMarkdown>
          </div>
        </div>
        <hr />
        {/* <Comments comments={post.attributes.comments} /> THIS IS THE SSG BASED IMPLEMENTATION DON'T REMOVE*/}
        <Comments postId={post.id} />
      </Page>
    </>
  );
};

export default SingleBlogPageContent;
