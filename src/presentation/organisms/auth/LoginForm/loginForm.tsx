"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/presentation/atoms/auth/Input/Input";
import { Button } from "@/presentation/atoms/auth/Button/Button";
import { MdEmail, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormProps {
  onSignupClick?: () => void;
}

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginForm: FC<LoginFormProps> = ({ onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    console.log("Submitting login data:", data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordVisibility = () => {
    
    return (
      <button
        type="button"
        className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <FaEye className="h-5 w-5" />
        ) : (
          <FaEyeSlash className="h-5 w-5" />
        )}
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="relative">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="nirupa@example.com"
            autoComplete="email"
            className="pl-10"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <div className="absolute top-9 left-3 text-gray-500">
            <MdEmail className="h-5 w-5" />
          </div>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="pl-10 pr-10"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />
          <div className="absolute top-9 left-3 text-gray-500">
            <MdLock className="h-5 w-5" />
          </div>
          {renderPasswordVisibility()}
        </div>

        <div className="flex items-center justify-end mb-2">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-gray-500 hover:text-gray-700"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full"
          type="submit"
          disabled={loading}
          isLoading={loading}
        >
          Login Now
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSignupClick}
            className="font-medium text-teal-500 hover:text-teal-600 cursor-pointer"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
