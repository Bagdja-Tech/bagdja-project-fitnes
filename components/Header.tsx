"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check if user is logged in
    const checkUser = () => {
      const userData = sessionStorage.getItem("user") || localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    
    checkUser();
    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener("storage", checkUser);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
    setIsUserMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        isScrolled
          ? "border-b border-gray-800 bg-black/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-black tracking-tight text-white">
              S1<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">HEALTH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/gym-classes"
              className="text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
            >
              Gym Classes
            </Link>
            <Link
              href="/24-7-gym"
              className="text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
            >
              24/7 Gym
            </Link>
            <Link
              href="/membership"
              className="text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
            >
              Membership
            </Link>
            <Link
              href="/personal-training"
              className="text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
            >
              Personal Training
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rounded-full border-2 border-gray-700 bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-all hover:border-gray-600"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xs">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">{user.name || user.email?.split("@")[0]}</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-800 bg-gray-900 shadow-xl">
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/my-bookings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/my-membership"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Membership
                      </Link>
                      <div className="my-1 border-t border-gray-800" />
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register?membership=2"
                  className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
                >
                  JOIN NOW
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-800 bg-black/95 py-4 backdrop-blur-md md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-wider text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/gym-classes"
                className="text-sm font-bold uppercase tracking-wider text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Gym Classes
              </Link>
              <Link
                href="/24-7-gym"
                className="text-sm font-bold uppercase tracking-wider text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                24/7 Gym
              </Link>
              <Link
                href="/membership"
                className="text-sm font-bold uppercase tracking-wider text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                href="/personal-training"
                className="text-sm font-bold uppercase tracking-wider text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Personal Training
              </Link>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-bold uppercase tracking-wider text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="text-sm font-bold uppercase tracking-wider text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="rounded-full border-2 border-gray-700 bg-transparent px-6 py-2 text-center text-sm font-bold text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-bold uppercase tracking-wider text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register?membership=2"
                    className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 py-2 text-center text-sm font-bold text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    JOIN NOW
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
