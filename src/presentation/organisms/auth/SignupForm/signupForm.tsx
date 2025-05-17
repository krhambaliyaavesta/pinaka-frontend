"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/presentation/atoms/auth/Input/Input";
import { Button } from "@/presentation/atoms/auth/Button/Button";
import { MdEmail, MdLock, MdPerson, MdWork } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "@/modules/auth";
import { useToast } from "@/modules/toast";

interface SignupFormProps {
  onLoginClick?: () => void;
}

type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  password: string;
};

export const SignupForm: FC<SignupFormProps> = ({ onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading, error } = useSignup();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      const user = await signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle || "",
      });

      if (user) {
        toast.success("Account created successfully!");
        // Optionally redirect the user or switch to login
        if (onLoginClick) {
          onLoginClick();
        }
      } else if (error) {
        toast.error(error.message || "Failed to create account");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="relative">
          <Input
            id="firstName"
            type="text"
            label="First Name"
            placeholder="Your Awesome First Name"
            autoComplete="given-name"
            className="pl-10"
            {...register("firstName", { required: "First name is required" })}
            error={errors.firstName?.message}
          />
          <div className="absolute top-9 left-3 text-gray-500">
            <MdPerson className="h-5 w-5" />
          </div>
        </div>

        <div className="relative">
          <Input
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Your Brilliant Last Name"
            autoComplete="family-name"
            className="pl-10"
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message}
          />
          <div className="absolute top-9 left-3 text-gray-500">
            <MdPerson className="h-5 w-5" />
          </div>
        </div>

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
            id="jobTitle"
            type="text"
            label="Job Title"
            placeholder="Your Superpower / Role in the Team"
            className="pl-10"
            {...register("jobTitle", { required: "Job title is required" })}
            error={errors.jobTitle?.message}
          />
          <div className="absolute top-9 left-3 text-gray-500">
            <MdWork className="h-5 w-5" />
          </div>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Create Your Secret Handshake (Password)"
            className="pl-10 pr-10"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            error={errors.password?.message}
          />
          <div className="absolute top-9 left-3 text-gray-500">
            <MdLock className="h-5 w-5" />
          </div>
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
        </div>

        <Button
          fullWidth
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onLoginClick}
            className="font-medium text-teal-500 hover:text-teal-600 cursor-pointer"
          >
            Login now
          </button>
        </p>
      </div>
    </div>
  );
};
export default SignupForm;
