import SingleBlogPageContent from "@/components/page-view/blog/SingleBlogPageContent";
import Spinner from "@/components/ui-ux/common/Spinner";
import datasource from "@/data-layer";
import { PostData } from "@/data-layer/post-entities";
import { GetStaticPropsContext } from "next";
import React from "react";

interface Props {
  post: PostData;
}

const SingleBlogPage = ({ post }: Props) => {
  if (!post) return <Spinner />;

  return (
    <div>
      <SingleBlogPageContent post={post} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const slugs = await datasource.getPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params!.slug as string;
  const post = await datasource.getPostBySlug(slug);

  console.log("Company Data: Static Props", post);

  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 5,
  };
};

export default SingleBlogPage;
