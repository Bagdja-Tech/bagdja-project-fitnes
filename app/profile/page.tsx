"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParallaxSection from "@/components/ParallaxSection";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [memberData, setMemberData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    postcode: "",
    emergencyName: "",
    emergencyPhone: "",
    photo: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user") || localStorage.getItem("user");
    const memberDataStorage = sessionStorage.getItem("memberData") || localStorage.getItem("memberData");
    
    if (!userData) {
      router.push("/login?return=/profile");
      return;
    }

    setUser(JSON.parse(userData));
    
    if (memberDataStorage) {
      const data = JSON.parse(memberDataStorage);
      setMemberData(data);
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        dateOfBirth: data.dateOfBirth || "",
        gender: data.gender || "",
        address: data.address || "",
        city: data.city || "",
        postcode: data.postcode || "",
        emergencyName: data.emergencyName || "",
        emergencyPhone: data.emergencyPhone || "",
        photo: data.photo || "",
      });
      if (data.photo) {
        setPhotoPreview(data.photo);
      }
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, photo: base64String }));
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (memberData) {
      const updatedData = { ...memberData, ...formData };
      sessionStorage.setItem("memberData", JSON.stringify(updatedData));
      localStorage.setItem("memberData", JSON.stringify(updatedData));
      setMemberData(updatedData);
    }
    setIsEditing(false);
  };

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.dateOfBirth,
      formData.gender,
      formData.address,
      formData.city,
      formData.postcode,
      formData.emergencyName,
      formData.emergencyPhone,
    ];
    const filled = fields.filter((f) => f && f.trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  };

  const completion = calculateCompletion();
  const displayName = formData.firstName && formData.lastName
    ? `${formData.firstName} ${formData.lastName}`
    : formData.firstName
      ? formData.firstName
      : formData.email?.split("@")[0] || user?.name || "Member";

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500" />
                  <span className="text-sm font-bold uppercase tracking-wider text-orange-400">My Account</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                  MY PROFILE
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                  Manage your personal information and account settings
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                >
                  <svg
                    className="h-5 w-5 transition-transform group-hover:rotate-12"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Profile Content */}
      <section className="bg-black py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Sidebar - Profile Card & Stats */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Card */}
              <ParallaxSection speed={0.3} direction="up">
                <div className="relative overflow-hidden rounded-3xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 shadow-2xl">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
                  
                  <div className="relative text-center">
                    {/* Profile Photo */}
                    <div className="relative mx-auto inline-block">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Profile"
                            className="h-36 w-36 rounded-full border-4 border-gray-700 object-cover shadow-2xl ring-4 ring-orange-500/20"
                          />
                          {isEditing && (
                            <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                              <svg
                                className="h-5 w-5 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-gray-700 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-orange-500/20 shadow-2xl ring-4 ring-orange-500/20">
                            <span className="text-6xl font-black text-white">
                              {formData.firstName?.charAt(0)?.toUpperCase() || 
                               formData.email?.charAt(0)?.toUpperCase() || 
                               user.name?.charAt(0)?.toUpperCase() || 
                               user.email?.charAt(0)?.toUpperCase() || 
                               "U"}
                            </span>
                          </div>
                          {isEditing && (
                            <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                              <svg
                                className="h-5 w-5 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <label className="mt-4 inline-block cursor-pointer rounded-lg border-2 border-gray-700 bg-gray-900/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-orange-500 hover:bg-gray-800">
                        {photoPreview ? "Change Photo" : "Upload Photo"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}

                    {/* Name */}
                    <h2 className="mt-6 text-3xl font-black text-white">
                      {displayName.toUpperCase()}
                    </h2>
                    <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-400">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {formData.email || user.email}
                    </p>

                    {/* Member ID */}
                    {memberData?.memberId && (
                      <div className="mt-6 rounded-xl border border-gray-800 bg-gradient-to-r from-gray-900/50 to-black/50 p-4 backdrop-blur-sm">
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Member ID</div>
                        <div className="mt-1 text-xl font-black text-white">{memberData.memberId}</div>
                      </div>
                    )}

                    {/* Membership Badge */}
                    {memberData?.membership && (
                      <div className="mt-4">
                        <span
                          className={`inline-block rounded-full px-4 py-2 text-xs font-bold ${
                            memberData.membership.location === "Fitness Studio"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                              : memberData.membership.location === "24/7 Gym"
                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                          }`}
                        >
                          {memberData.membership.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ParallaxSection>

              {/* Profile Completion Card */}
              <ParallaxSection speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">Profile Completion</h3>
                    <span className="text-2xl font-black text-orange-500">{completion}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-gray-400">
                    Complete your profile to unlock all features
                  </p>
                </div>
              </ParallaxSection>

              {/* Quick Stats */}
              <ParallaxSection speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
                  <h3 className="mb-4 text-lg font-black text-white">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                          <svg
                            className="h-5 w-5 text-blue-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-300">Bookings</span>
                      </div>
                      <span className="text-lg font-black text-white">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-300">Active</span>
                      </div>
                      <span className="text-lg font-black text-green-400">Yes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                          <svg
                            className="h-5 w-5 text-purple-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-300">Member Since</span>
                      </div>
                      <span className="text-sm font-bold text-white">
                        {memberData?.joinDate
                          ? new Date(memberData.joinDate).toLocaleDateString("en-GB", {
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </ParallaxSection>
            </div>

            {/* Right Content - Information Cards */}
            <div className="lg:col-span-8 space-y-6">
              {/* Personal Information */}
              <ParallaxSection speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 shadow-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                      <svg
                        className="h-6 w-6 text-orange-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-white">PERSONAL INFORMATION</h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="group">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-300">
                        <span>First Name</span>
                        <span className="text-red-500">*</span>
                        {!formData.firstName && (
                          <span className="ml-auto rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">
                            Required
                          </span>
                        )}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.firstName || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="group">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-300">
                        <span>Last Name</span>
                        <span className="text-red-500">*</span>
                        {!formData.lastName && (
                          <span className="ml-auto rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">
                            Required
                          </span>
                        )}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.lastName || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="group">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-300">
                        <svg
                          className="h-4 w-4 text-blue-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email</span>
                      </label>
                      <div className="rounded-lg border-2 border-blue-500/30 bg-blue-500/10 px-4 py-3">
                        <p className="text-lg font-semibold text-white">{formData.email || user.email}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Email cannot be changed
                        </p>
                      </div>
                    </div>
                    <div className="group">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-300">
                        <svg
                          className="h-4 w-4 text-green-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Phone</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 20 1234 5678"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.phone || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="group">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-300">
                        <svg
                          className="h-4 w-4 text-purple-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Date of Birth</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.dateOfBirth
                              ? new Date(formData.dateOfBirth).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : (
                                  <span className="italic text-gray-500">Not provided</span>
                                )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="group">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-300">
                        <svg
                          className="h-4 w-4 text-pink-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Gender</span>
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white capitalize">
                            {formData.gender || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ParallaxSection>

              {/* Address */}
              <ParallaxSection speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 shadow-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-white">ADDRESS</h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-bold text-gray-300">Street Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.address || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-300">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="London"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.city || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-300">Postcode</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          placeholder="SW1A 1AA"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.postcode || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                            </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ParallaxSection>

              {/* Emergency Contact */}
              <ParallaxSection speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 shadow-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20">
                      <svg
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-white">EMERGENCY CONTACT</h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-300">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="emergencyName"
                          value={formData.emergencyName}
                          onChange={handleChange}
                          placeholder="Emergency contact name"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.emergencyName || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-300">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                          placeholder="+44 20 9876 5432"
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      ) : (
                        <div className="rounded-lg border-2 border-gray-800 bg-gray-900/50 px-4 py-3">
                          <p className="text-lg font-semibold text-white">
                            {formData.emergencyPhone || (
                              <span className="italic text-gray-500">Not provided</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ParallaxSection>

              {/* Action Buttons */}
              {isEditing && (
                <ParallaxSection speed={0.3} direction="up">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        const memberDataStorage = sessionStorage.getItem("memberData") || localStorage.getItem("memberData");
                        if (memberDataStorage) {
                          const data = JSON.parse(memberDataStorage);
                          setFormData({
                            firstName: data.firstName || "",
                            lastName: data.lastName || "",
                            email: data.email || "",
                            phone: data.phone || "",
                            dateOfBirth: data.dateOfBirth || "",
                            gender: data.gender || "",
                            address: data.address || "",
                            city: data.city || "",
                            postcode: data.postcode || "",
                            emergencyName: data.emergencyName || "",
                            emergencyPhone: data.emergencyPhone || "",
                            photo: data.photo || "",
                          });
                          if (data.photo) {
                            setPhotoPreview(data.photo);
                          } else {
                            setPhotoPreview(null);
                          }
                        }
                      }}
                      className="rounded-full border-2 border-gray-700 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:border-gray-600 hover:bg-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                    >
                      Save Changes
                    </button>
                  </div>
                </ParallaxSection>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
