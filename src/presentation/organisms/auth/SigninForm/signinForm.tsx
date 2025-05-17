"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/presentation/atoms/auth/Input/Input";
import { Button } from "@/presentation/atoms/auth/Button/Button";
import { MdEmail, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignin } from "@/modules/auth";
import { useToast } from "@/modules/toast";
import { useRouter } from "next/navigation";
import { UserStatus } from "@/modules/auth/domain/enums";

interface SigninFormProps {
  onSignupClick?: () => void;
}

type SigninFormInputs = {
  email: string;
  password: string;
};

export const SigninForm: FC<SigninFormProps> = ({ onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isLoading, error } = useSignin();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>({
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    try {
      const user = await signin(data.email, data.password);
      if (user) {
        toast.success("Signed in successfully!");

        // Check if user status is pending and redirect to waiting-approval page
        if (user.status === UserStatus.PENDING) {
          router.push("/waiting-approval");
        } else {
          // Default redirect for approved users
          router.push("/dashboard");
        }
      } else if (error) {
        toast.error(error.message || "Sign in failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      toast.error("An unexpected error occurred");
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
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="relative">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="Your Official @Company Email"
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
            placeholder="Create Your Secret Handshake"
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
          disabled={isLoading}
          isLoading={isLoading}
        >
          Sign In
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
export default SigninForm;
