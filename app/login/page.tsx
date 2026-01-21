"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo: Accept any email/password combination
    // In production, this would call your auth API
    const userData = {
      email: formData.email,
      name: formData.email.split("@")[0],
      memberId: `S1-${Date.now()}`,
    };

    // Store user session
    sessionStorage.setItem("user", JSON.stringify(userData));
    if (formData.rememberMe) {
      localStorage.setItem("user", JSON.stringify(userData));
    }

    // Redirect to return URL or dashboard
    router.push(returnUrl);
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-black tracking-tight text-white">
              S1<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">HEALTH</span>
            </div>
          </Link>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            LOGIN
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Sign in to your account to manage your membership and bookings
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-orange-400 hover:text-orange-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "SIGN IN"
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/register?membership=2"
                className="font-semibold text-orange-400 hover:text-orange-300"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
