import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to Pinaka
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
        <p className="text-gray-600 mb-6">
          This is the main page of the application. You can navigate to the
          dashboard after login.
        </p>
        <Link
          href="/login"
          className="bg-[#42B4AC] text-white px-4 py-2 rounded-md text-sm inline-block mr-4"
        >
          Login
        </Link>
        <Link
          href="/dashboard"
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
