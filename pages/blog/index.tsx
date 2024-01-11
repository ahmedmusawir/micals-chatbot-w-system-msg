import { Template } from "@/components/page-view";
import style from "./blog.module.scss";
import BlogPageContent from "@/components/page-view/blog/BlogPageContent";
import { PostApiResponse } from "@/services/postService";
import datasource from "@/data-layer";

const BlogPage = ({ initialPosts }: { initialPosts: PostApiResponse }) => {
  console.log("index pg posts", initialPosts);
  return <BlogPageContent initialPosts={initialPosts} />;
};

export const getStaticProps = async () => {
  const posts: PostApiResponse = await datasource.getPosts();

  const postData = posts.data; // This will be of type CompanyData[].
  const postMeta = posts.meta; // This will be of type { pagination: Pagination }.

  console.log("Posts:", postData);
  console.log("Posts Meta:", postMeta);

  // Can destructure data and meta properties:
  // const { data, meta } = jobs;

  return {
    props: {
      initialPosts: posts,
    },
    revalidate: 5,
  };
};

export default BlogPage;
