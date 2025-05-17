"use client";

import { FC, useState } from "react";
import { SigninForm } from "@/presentation/organisms/auth/SigninForm/signinForm";
import { SignupForm } from "@/presentation/organisms/auth/SignupForm/signupForm";
import { TokenChecker } from "@/presentation/molecules/auth/TokenChecker";
import AuthLayout from "@/presentation/layouts/auth/AuthLayout";

import loginImage from "/public/2.svg";

interface SigninSignUpProps {
  initialView?: "signin" | "signup";
  showTokenChecker?: boolean;
}

export const SigninSignUp: FC<SigninSignUpProps> = ({
  initialView = "signin",
  showTokenChecker = false,
}) => {
  const [isSigninView, setIsSigninView] = useState(initialView === "signin");

  const toggleAuthView = () => {
    setIsSigninView(!isSigninView);
  };

  const renderForm = () => {
    if (isSigninView) {
      return <SigninForm onSignupClick={toggleAuthView} />;
    }
    return <SignupForm onLoginClick={toggleAuthView} />;
  };

  return (
    <AuthLayout
      title={
        isSigninView ? "Unlock Your Potential! ✨" : "Join Our Community! 🚀"
      }
      description={
        isSigninView
          ? "Sign in now to access amazing features, collect kudos from your team, and maximize your productivity with our powerful team!"
          : "Sign up to join our community, connect with teammates, and unlock all the features of our platform."
      }
      imageSrc={loginImage}
    >
      {renderForm()}

      {/* Show token checker for debugging if enabled */}
      {showTokenChecker && <TokenChecker />}
    </AuthLayout>
  );
};

export default SigninSignUp;
