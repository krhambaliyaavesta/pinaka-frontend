"use client";

import React, { useEffect, useState } from "react";
import { AuthModule } from "@/modules/auth/AuthModule";

interface TokenCheckerProps {
  children?: React.ReactNode;
}

/**
 * Component to check if a JWT token is present from the API response
 * Useful for debugging authentication
 */
export const TokenChecker: React.FC<TokenCheckerProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenType, setTokenType] = useState<string>("API Response");

  useEffect(() => {
    // Check if authenticated
    const authenticated = AuthModule.isAuthenticated();
    setIsAuthenticated(authenticated);

    // Get token if authenticated
    if (authenticated) {
      const authToken = AuthModule.getToken();
      setToken(authToken);
      setTokenType("API Response (stored in memory/storage)");
    }
  }, []);

  // Function to copy token to clipboard
  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard
        .writeText(token)
        .then(() => alert("Token copied to clipboard!"))
        .catch((err) => console.error("Failed to copy token: ", err));
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 my-4">
      <h3 className="font-bold text-lg mb-2">Auth Status</h3>
      <p className="mb-2">
        <span className="font-semibold">Authenticated:</span>{" "}
        <span className={isAuthenticated ? "text-green-600" : "text-red-600"}>
          {isAuthenticated ? "Yes" : "No"}
        </span>
      </p>

      {token && (
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold">Token Source:</p>
            <span className="text-blue-600 text-sm">{tokenType}</span>
          </div>

          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold">JWT Token:</p>
            <button
              onClick={copyToClipboard}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Copy
            </button>
          </div>

          <div className="relative">
            <p className="overflow-x-auto text-xs bg-gray-200 p-2 rounded whitespace-nowrap max-h-20 overflow-y-auto">
              {token}
            </p>
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Note:</span> This token is
              received directly from the API response and stored using our
              TokenStorage service.
            </p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
