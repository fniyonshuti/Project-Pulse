// SignupForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignupForm = ({ onSuccess }) => {
  const APIurl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
    };

    try {
      const response = await fetch(`${APIurl}/users/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.detail || result.message || "Signup failed");
      } else {
        setSuccess("Account created successfully! Logging you in...");
        
        // Automatically log in the user after successful signup
        try {
          const loginResponse = await fetch(`${APIurl}/users/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          });

          const loginData = await loginResponse.json();

          if (loginResponse.ok && loginData.access_token && loginData.user) {
            // Store token and user info using AuthContext
            login(loginData.access_token, loginData.user);
            
            // Call success callback to navigate to dashboard
            if (typeof onSuccess === "function") {
              onSuccess();
            }
          } else {
            // If auto-login fails, show success but ask user to login manually
            setSuccess("Account created successfully! Please log in to continue.");
          }
        } catch (loginErr) {
          console.error("Auto-login error:", loginErr);
          setSuccess("Account created successfully! Please log in to continue.");
        }
        
        e.target.reset();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      {/* Username */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          name="username"
          type="text"
          placeholder="JohnDoe"
          className="border text-white border-gray-300 dark:border-gray-700 bg-gray-900 text-white 
                     px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="border border-gray-300 dark:border-gray-700 bg-gray-900 text-white 
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
          name="password"
          type="password"
          placeholder="••••••••"
          className="border border-gray-300 dark:border-gray-700 bg-gray-900 text-white 
                     px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Role
        </label>
        <select
          name="role"
          className="border border-gray-300 dark:border-gray-700 bg-gray-900 text-white px-3 py-2 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          <option value="">Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>
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

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white 
                   transition-all duration-300 ease-in-out transform
                   shadow-lg hover:shadow-xl
                   ${
                     loading
                       ? "bg-gray-400 cursor-not-allowed opacity-70"
                       : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:scale-95 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
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
          {loading ? "Creating..." : "Create Account"}
        </span>
      </button>
    </form>
  );
};

export default SignupForm;
