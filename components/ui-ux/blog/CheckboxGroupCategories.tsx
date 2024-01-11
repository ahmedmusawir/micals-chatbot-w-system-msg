import {
  addCategoryTerm,
  removeCategoryTerm,
  setCurrentPage,
} from "@/features/posts/postsFilterSlice";
import { RootState } from "@/global-interfaces";
import { useDispatch, useSelector } from "react-redux";

const CheckboxGroupCategories = () => {
  const dispatch = useDispatch();

  const categoryTerms = useSelector(
    (state: RootState) => state.postsFilters.categoryTerms
  );

  const frameworkOptions = [
    { value: "2", display: "React.js" },
    { value: "1", display: "Next.js" },
    { value: "3", display: "Docker" },
    { value: "4", display: "Angular" },
    { value: "5", display: "Vue.js" },
  ];

  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(setCurrentPage(1));

    if (checked) {
      dispatch(addCategoryTerm(value)); // If checked, add the category term
    } else {
      dispatch(removeCategoryTerm(value)); // If unchecked, remove the category term
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Job Types</legend>
      <div className="space-y-3">
        {frameworkOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id={option.value}
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={handleCategorySelect}
                checked={categoryTerms?.includes(option.value)}
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

export default CheckboxGroupCategories;
