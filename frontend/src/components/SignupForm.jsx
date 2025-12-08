// SignupForm.jsx
import React, { useState } from "react";

const SignupForm = () => {
  const APIurl = import.meta.env.VITE_API_URL;

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
        setError(result.message || "Signup failed");
      } else {
        setSuccess("Account created successfully!");
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 rounded-lg font-medium text-white transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:bg-green-800"
        }`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;
