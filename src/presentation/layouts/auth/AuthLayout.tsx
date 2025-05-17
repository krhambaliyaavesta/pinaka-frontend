import { FC, ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  imageSrc: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  imageSrc,
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch bg-[#FFFDF5]">
      {/* Left section with illustration */}
      <div className="hidden lg:flex lg:w-1/2 p-8 items-center justify-center relative">
        <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12"></div>
        <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm"></div>

        <Image
          src={imageSrc}
          alt="Team collaboration"
          fill
          style={{ objectFit: "contain" }}
          className="rounded-lg"
          unoptimized
        />
      </div>

      {/* Right section with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#FFFDF5] rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-1 mt-4">
              {title}
            </h2>
            <p className="text-sm text-gray-600 mb-8">{description}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
