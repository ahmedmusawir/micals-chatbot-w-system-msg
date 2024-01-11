import CheckboxGroupCategories from "../ui-ux/blog/CheckboxGroupCategories";
import CheckboxGroupPostTags from "../ui-ux/blog/CheckboxGroupPostTags";
import SwitchButton from "../ui-ux/common/SwitchButton";

const SidebarForm = () => {
  return (
    <div>
      <div className="text-sm font-semibold leading-6 text-gray-400 pb-5">
        Filter Results
      </div>
      <SwitchButton labelText="Featured Only" filter="featured" />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Frameworks
      </div>
      <CheckboxGroupCategories />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Languages
      </div>
      <CheckboxGroupPostTags />
    </div>
  );
};

export default SidebarForm;
