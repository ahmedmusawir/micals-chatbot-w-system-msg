import Link from "next/link";
import Pagination from "./Pagination";
import { PostApiResponse } from "@/services/postService";
import { formatDate, getExcerpt } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/global-interfaces";
import { setCurrentPage } from "@/features/posts/postsFilterSlice";
import PaginationSimple from "./PaginationSimple";

const review = 4;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// const onPageChange = () => {};

const BlogPostList = ({ posts }: { posts: PostApiResponse }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.postsFilters.currentPage
  );
  const postsPerPage = useSelector(
    (state: RootState) => state.postsFilters.postsPerPage
  );

  // console.log("CURRENT PAGE IN BLOGPOSTLIST", currentPage);
  // console.log("POST PER PAGE IN BLOGPOSTLIST", postsPerPage);

  const onPageChange = (newPage: number) => {
    window.scrollTo(0, 0);

    dispatch(setCurrentPage(newPage));
    // TODO: Re-fetch data for the new page
  };
  return (
    <div className="bg-white py-4 sm:py-4">
      {/* <div className="w-full border-8 border-orange-500"> */}
      <div className="w-full">
        <div className="w-full text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-5 px-5">
            Checkout Our Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 px-5">
            Learn how to grow your business with our expert advice.
          </p>
          {/* For screens below 2xl, maintain the current layout */}
          <div className="mt-16 space-y-20 lg:mt-12 lg:space-y-20 2xl:space-y-0 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
            {posts?.data?.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row px-5 md:px-10"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Link href={`/blog/${post.attributes.slug}`}>
                    <img
                      src={post.attributes.featuredImage}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </Link>
                </div>
                <div className="">
                  <div className="flex items-center gap-x-4 text-xs">
                    {post.attributes.categories.data.map((cat) => (
                      <span
                        key={cat.id}
                        className="relative z-10 rounded-full bg-indigo-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {cat.attributes.name}
                      </span>
                    ))}
                  </div>

                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {/* <span className="absolute inset-0" /> */}
                      <Link href={`/blog/${post.attributes.slug}`}>
                        {post.attributes.title}
                      </Link>
                    </h3>
                    <h5 className="text-xs text-purple-600 mt-3">
                      {formatDate(post.attributes.createdAt)}
                    </h5>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {getExcerpt(post.attributes.content, 15)}
                    </p>
                  </div>
                  {post.attributes.isFeatured && (
                    <span className="mt-3 inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white w-full">
                      Featured
                    </span>
                  )}
                  {/* {post.attributes.comments.data.map((com) => com.id)} */}
                  <div className="mt-3 border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4 justify-between">
                      <div className="flex items-center gap-x-4 text-xs">
                        {post.attributes.post_tags.data.map((tag) => (
                          <span
                            key={tag.id}
                            className="relative z-10 rounded-sm bg-red-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {tag.attributes.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPageCount={Math.ceil(
              posts?.meta?.pagination?.total / postsPerPage
            )}
            onPageChange={onPageChange}
            pageSize={postsPerPage}
            totalItemCount={posts?.meta?.pagination?.total}
          />

          <PaginationSimple
            currentPage={currentPage}
            totalPageCount={Math.ceil(
              posts?.meta?.pagination?.total / postsPerPage
            )}
            onPageChange={onPageChange}
            pageSize={postsPerPage}
            totalItemCount={posts?.meta?.pagination?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostList;
