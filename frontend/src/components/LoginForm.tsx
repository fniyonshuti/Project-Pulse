// LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const APIurl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${APIurl}/users/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, handle as text error
        // const textError = await response.text();
        setError(`Server error: ${response.status} ${response.statusText}`);
        return;
      }

      if (!response.ok) {
        setError(data.detail || data.message || "Invalid email or password");
      } else {
        setSuccess("Login successful!");

        // Store token and user info using AuthContext
        if (data.access_token && data.user) {
          login(data.access_token, data.user);
          
          // Call success callback after successful login
          if (typeof onSuccess === "function") {
            setTimeout(() => onSuccess(), 500); // Small delay for better UX
          }
        } else {
          setError("Login response missing token or user data");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError("Network error. Please check if the server is running.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border text-white border-gray-300 dark:border-gray-700 bg-gray-900 placeholder-gray-400 
                     px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border text-white border-gray-300 dark:border-gray-700 bg-gray-900 placeholder-gray-400 
                     px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 
                     transition-all duration-200 hover:underline font-medium"
        >
          Forgot password?
        </button>
      </div>

      {/* Error / Success Messages */}
      {error && (
        <div className="animate-fade-in">
          <p className="text-red-500 text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="animate-fade-in">
          <p className="text-green-500 text-sm font-medium">{success}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white 
                   transition-all duration-300 ease-in-out transform
                   shadow-lg hover:shadow-xl
                   ${
                     loading
                       ? "bg-gray-400 cursor-not-allowed opacity-70"
                       : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-95 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                   }`}
      >
        <span className="flex items-center justify-center gap-2">
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </span>
      </button>
    </form>
  );
};

export default LoginForm;
