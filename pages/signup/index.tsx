import SignupContent from "@/components/page-view/auth/SignupContent";
import styles from "./signup.module.scss";
import withoutAuth from "@/hoc/withoutAuth";

const SignupPage = () => {
  return <SignupContent />;
};

export default withoutAuth(SignupPage);
