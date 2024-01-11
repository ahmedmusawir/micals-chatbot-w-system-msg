import { useRouter } from "next/router";
import { RootState } from "@/global-interfaces";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const Router = useRouter();
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    // If user is not authenticated, redirect to home
    if (isAuthenticated) {
      Router.push("/profile");
      return null;
    }

    // If user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
