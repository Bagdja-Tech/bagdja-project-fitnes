"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { memberships } from "@/data/dummy";

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedMembershipId = searchParams.get("membership") || "2";

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    photo: "", // Base64 string for photo
    
    // Address
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    
    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    
    // Health Information
    hasMedicalCondition: false,
    medicalCondition: "",
    hasInjury: false,
    injuryDetails: "",
    
    // Membership
    membershipId: selectedMembershipId,
    startDate: new Date().toISOString().split("T")[0],
    
    // Terms
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedMembership = memberships.find(
    (m) => m.id === parseInt(selectedMembershipId)
  ) || memberships[1];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please upload an image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Image size must be less than 5MB",
        }));
        return;
      }

      // Read file as base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          photo: base64String,
        }));
        setPhotoPreview(base64String);
        
        // Clear error
        if (errors.photo) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.photo;
            return newErrors;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: "",
    }));
    setPhotoPreview(null);
    // Reset file input
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
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
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";
    if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency contact name is required";
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency contact phone is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
    if (!formData.agreePrivacy) newErrors.agreePrivacy = "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Store form data in sessionStorage for next step
    sessionStorage.setItem("registrationData", JSON.stringify(formData));

    // Redirect to payment page
    setTimeout(() => {
      router.push(`/payment?membership=${selectedMembershipId}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-black tracking-tight text-white">
              S1<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">HEALTH</span>
            </div>
          </Link>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            JOIN S1 HEALTH FITNESS
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Complete your registration to start your fitness journey
          </p>
        </div>

        {/* Selected Membership Card */}
        <div className="mb-8 rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-gray-400">SELECTED MEMBERSHIP</span>
              <h3 className="mt-1 text-2xl font-black text-white">{selectedMembership.name}</h3>
              <p className="mt-1 text-gray-300">{selectedMembership.location}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">
                £{selectedMembership.price}
                <span className="text-lg text-gray-400">/{selectedMembership.period}</span>
              </div>
            </div>
          </div>
          <Link
            href="/membership"
            className="mt-4 inline-block text-sm font-semibold text-orange-400 hover:text-orange-300"
          >
            Change membership →
          </Link>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">PERSONAL INFORMATION</h2>
            
            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Profile Photo
              </label>
              <div className="flex items-start gap-6">
                {/* Photo Preview */}
                <div className="flex-shrink-0">
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="h-32 w-32 rounded-full border-4 border-gray-700 object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                        aria-label="Remove photo"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-dashed border-gray-700 bg-gray-900">
                      <svg
                        className="h-12 w-12 text-gray-600"
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
                  )}
                </div>
                
                {/* Upload Button */}
                <div className="flex-1">
                  <label
                    htmlFor="photo"
                    className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-orange-500 hover:bg-gray-800"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {photoPreview ? "Change Photo" : "Upload Photo"}
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    JPG, PNG or GIF. Max size 5MB. Recommended: Square image, at least 400x400px
                  </p>
                  {errors.photo && (
                    <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
                  )}
                </div>
              </div>
            </div>

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
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white focus:border-orange-500 focus:outline-none ${
                    errors.gender ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">ADDRESS</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.address ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-bold text-gray-300">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                      errors.city ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="London"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                      errors.postcode ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="SW1A 1AA"
                  />
                  {errors.postcode && (
                    <p className="mt-1 text-sm text-red-500">{errors.postcode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">EMERGENCY CONTACT</h2>
            <div className="grid gap-6 sm:grid-cols-3">
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
              <div>
                <label className="block text-sm font-bold text-gray-300">Relation</label>
                <input
                  type="text"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                  placeholder="Spouse, Parent, etc."
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">HEALTH INFORMATION</h2>
            <div className="space-y-6">
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
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="hasInjury"
                  id="hasInjury"
                  checked={formData.hasInjury}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="hasInjury" className="ml-3 text-sm text-gray-300">
                  I have a current injury that may affect my ability to exercise
                </label>
              </div>
              {formData.hasInjury && (
                <div>
                  <label className="block text-sm font-bold text-gray-300">Please provide details</label>
                  <textarea
                    name="injuryDetails"
                    value={formData.injuryDetails}
                    onChange={handleChange}
                    rows={3}
                    className="mt-2 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                    placeholder="Please describe your injury..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">TERMS & CONDITIONS</h2>
            <div className="space-y-4">
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
                <p className="ml-8 text-sm text-red-500">{errors.agreeTerms}</p>
              )}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  id="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="agreePrivacy" className="ml-3 text-sm text-gray-300">
                  I agree to the{" "}
                  <Link href="/privacy" className="font-semibold text-orange-400 hover:text-orange-300">
                    Privacy Policy
                  </Link>{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.agreePrivacy && (
                <p className="ml-8 text-sm text-red-500">{errors.agreePrivacy}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Link
              href="/membership"
              className="text-sm font-semibold text-gray-400 hover:text-white"
            >
              ← Back to Membership
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Continue to Payment →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
