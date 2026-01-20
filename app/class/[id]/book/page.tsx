"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { classTypes } from "@/data/dummy";

export default function BookClass() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = parseInt(params.id as string);
  const selectedDay = searchParams.get("day") || "";
  const selectedTime = searchParams.get("time") || "";

  const classData = classTypes.find((c) => c.id === classId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    emergencyName: "",
    emergencyPhone: "",
    hasMedicalCondition: false,
    medicalCondition: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!classData) {
      router.push("/gym-classes");
    }
  }, [classData, router]);

  if (!classData) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency contact name is required";
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency contact phone is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Store booking data
    const bookingData = {
      ...formData,
      classId: classData.id,
      className: classData.name,
      instructor: classData.instructor,
      day: selectedDay,
      time: selectedTime,
      price: classData.price,
      duration: classData.duration,
      type: "class", // To distinguish from membership
    };

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

    setTimeout(() => {
      router.push(`/payment?type=class&classId=${classId}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/class/${classId}`}
            className="mb-6 inline-flex items-center text-sm font-semibold text-gray-400 hover:text-white"
          >
            ← Back to Class Details
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            BOOK CLASS
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Complete your booking for {classData.name}
          </p>
        </div>

        {/* Booking Summary */}
        <div className="mb-8 rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
          <h3 className="mb-4 text-xl font-black text-white">BOOKING SUMMARY</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Class:</span>
              <span className="font-semibold text-white">{classData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Day:</span>
              <span className="font-semibold text-white">{selectedDay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time:</span>
              <span className="font-semibold text-white">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Instructor:</span>
              <span className="font-semibold text-white">{classData.instructor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="font-semibold text-white">{classData.duration}</span>
            </div>
            <div className="border-t border-gray-800 pt-3">
              <div className="flex justify-between text-xl font-black text-white">
                <span>Total:</span>
                <span>£{classData.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">PERSONAL INFORMATION</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.firstName ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.lastName ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
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
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="+44 20 1234 5678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white focus:border-orange-500 focus:outline-none ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">EMERGENCY CONTACT</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.emergencyName ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Jane Doe"
                />
                {errors.emergencyName && (
                  <p className="mt-1 text-sm text-red-500">{errors.emergencyName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.emergencyPhone ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="+44 20 9876 5432"
                />
                {errors.emergencyPhone && (
                  <p className="mt-1 text-sm text-red-500">{errors.emergencyPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">HEALTH INFORMATION</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="hasMedicalCondition"
                  id="hasMedicalCondition"
                  checked={formData.hasMedicalCondition}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="hasMedicalCondition" className="ml-3 text-sm text-gray-300">
                  I have a medical condition that may affect my ability to exercise
                </label>
              </div>
              {formData.hasMedicalCondition && (
                <div>
                  <label className="block text-sm font-bold text-gray-300">Please provide details</label>
                  <textarea
                    name="medicalCondition"
                    value={formData.medicalCondition}
                    onChange={handleChange}
                    rows={3}
                    className="mt-2 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                    placeholder="Please describe your medical condition..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 h-5 w-5 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="font-semibold text-orange-400 hover:text-orange-300">
                  Terms and Conditions
                </Link>{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="ml-8 mt-1 text-sm text-red-500">{errors.agreeTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Link
              href={`/class/${classId}`}
              className="text-sm font-semibold text-gray-400 hover:text-white"
            >
              ← Back to Class Details
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : `Continue to Payment (£${classData.price}) →`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
