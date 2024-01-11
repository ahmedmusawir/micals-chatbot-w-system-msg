import {
  addPostTagTerm,
  removePostTagTerm,
  setCurrentPage,
} from "@/features/posts/postsFilterSlice";
import { RootState } from "@/global-interfaces";
import { useDispatch, useSelector } from "react-redux";

const CheckboxGroupPostTags = () => {
  const dispatch = useDispatch();

  const postTagTerms = useSelector(
    (state: RootState) => state.postsFilters.postTagTerms
  );
  const postTagsOptions = [
    { value: "3", display: "Javascript" },
    {
      value: "4",
      display: "Typescript",
    },
    {
      value: "1",
      display: "CSS",
    },
    {
      value: "2",
      display: "SCSS",
    },
  ];

  const handlePostTagsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(setCurrentPage(1));

    if (checked) {
      dispatch(addPostTagTerm(value)); // If checked, add the postTags term
    } else {
      dispatch(removePostTagTerm(value)); // If unchecked, remove the postTags term
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Post Tags</legend>
      <div className="space-y-3">
        {postTagsOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id={option.value}
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={handlePostTagsSelect}
                checked={postTagTerms?.includes(option.value)}
                value={option.value}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor={option.value}
                className="text-xs font-semibold leading-6 text-gray-400"
              >
                {option.display}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroupPostTags;
