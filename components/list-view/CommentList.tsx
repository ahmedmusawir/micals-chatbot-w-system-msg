import { Comments } from "@/data-layer/post-entities";
import { useDeleteCommentMutation } from "@/features/comments/apiComments";
import { ApiError, RootState } from "@/global-interfaces";
import { formatDate } from "@/utils";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface CommentListProps {
  comments: Comments[] | undefined;
}

const CommentList = ({ comments }: CommentListProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const user = useSelector((state: RootState) => state.auth.user);
  const { id: currentUserId } = user || {};

  const [deleteComment, { isLoading, isError, data, error }] =
    useDeleteCommentMutation();

  const sortedComments = [...(comments || [])].sort((a, b) => {
    return (
      new Date(b.attributes.createdAt).getTime() -
      new Date(a.attributes.createdAt).getTime()
    );
  });

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id)
      .unwrap()
      .then(() => {
        // Successful delete.
        toast.success("Comment Delete Successful!");
      })
      .catch((rawError) => {
        const error = rawError as ApiError;
        console.error("Error during signup:", error);
        // Handle the error.
        const serverErrorMessage = error?.data?.error;
        const message = serverErrorMessage || "An unknown error occurred";

        // Update the local state with the error message.
        console.log("Server-side error during Logout", message);
        toast.error("Error deleting comment. Please try again.");
      });
  };

  return (
    <div>
      {sortedComments.map((comment) => {
        const imgUrl =
          comment.attributes.user.data?.attributes.profileImage.data?.attributes
            .url;
        const { id: commentUserId } = comment.attributes.user.data || {};

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
                  {formatDate(comment.attributes.createdAt)}
                </p>
              </div>
            </div>
            <div
              className="my-10 space-y-6 text-base italic text-gray-600"
              dangerouslySetInnerHTML={{
                __html: comment.attributes.content,
              }}
            />
            {commentUserId === currentUserId && (
              <button
                className="btn btn-sm btn-error float-right text-white -mt-10"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            )}
            <hr className="mt-5" />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
