import { UserCircleIcon } from "@heroicons/react/20/solid";
import CommentForm from "../../forms/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { CommentsData } from "@/data-layer/post-entities";
import { RootState } from "@/global-interfaces";
import { openLoginModal } from "@/features/auth/authSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  comments: CommentsData;
}

const Comments = ({ comments }: Props) => {
  const dispatch = useDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  console.log("Comments:", comments);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Comments
          </h2>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            {!isAuthenticated && (
              <button
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                onClick={() => dispatch(openLoginModal())}
              >
                Write a review
              </button>
            )}
          </div>
          {isAuthenticated && <CommentForm postId={1} />}
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {comments.data.length === 0 && (
                <div className="flex item-center p-10">
                  <h2 className="text-lg font-bold text-gray-900">
                    No comment found!
                  </h2>
                </div>
              )}
              {comments.data.length !== 0 &&
                comments.data.map((comment) => {
                  const imgUrl =
                    comment.attributes.user.data?.attributes.profileImage.data
                      ?.attributes.url;

                  return (
                    <div key={comment.id} className="py-12">
                      <div className="flex items-center">
                        {!imgUrl && <UserCircleIcon className="h-12 w-12" />}
                        {imgUrl && (
                          <img
                            src={`${baseUrl}${imgUrl}`}
                            alt={`${comment.attributes.createdAt}.`}
                            className="h-12 w-12 rounded-full"
                          />
                        )}
                        <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">
                            {comment.attributes.user.data?.attributes.username}
                          </h4>

                          <p className="text-xs">
                            {/* Comment Date will go here */}
                            {comment.attributes.createdAt}
                          </p>
                        </div>
                      </div>

                      <div
                        className="mt-4 space-y-6 text-base italic text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: comment.attributes.content,
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
