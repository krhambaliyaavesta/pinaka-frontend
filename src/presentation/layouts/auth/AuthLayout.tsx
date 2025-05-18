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
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch bg-[#FFFDF5] relative overflow-hidden">
      {/* Decorative elements - similar to the dashboard layout */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12 -z-10 hidden md:block"></div>
      <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm -z-10 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#42B4AC] opacity-40 rounded-md transform rotate-45 -z-10 hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-4 h-16 bg-[#42B4AC] opacity-30 rounded-sm transform -rotate-12 -z-10 hidden lg:block"></div>
      
      {/* Left section with illustration */}
      <div className="hidden lg:flex lg:w-1/2 p-8 items-center justify-center relative">
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
        <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 relative overflow-hidden">
          <div className="h-1 bg-[#42B4AC] absolute top-0 left-0 right-0"></div>
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
