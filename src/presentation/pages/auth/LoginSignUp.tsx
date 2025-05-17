"use client";

import { FC, useState } from "react";
import { LoginForm } from "@/presentation/organisms/auth/LoginForm/loginForm";
import { SignupForm } from "@/presentation/organisms/auth/SignupForm/signupForm";
import AuthLayout from "@/presentation/layouts/auth/AuthLayout";

import loginImage from "/public/2.svg";

export const LoginSignUp: FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleAuthView = () => {
    setIsLoginView(!isLoginView);
  };

  const renderForm = () => {
    if (isLoginView) {
      return <LoginForm onSignupClick={toggleAuthView} />;
    }
    return <SignupForm onLoginClick={toggleAuthView} />;
  };

  return (
    <AuthLayout
      title={isLoginView ? "Unlock Your Potential! ✨" : "Join Our Community! 🚀"}
      description={
        isLoginView
          ? "Log in now to access amazing features, collect kudos from your team, and maximize your productivity with our powerful team!"
          : "Sign up to join our community, connect with teammates, and unlock all the features of our platform."
      }
      imageSrc={loginImage}
    >
     {renderForm()}
    </AuthLayout>
  );
};

export default LoginSignUp;
