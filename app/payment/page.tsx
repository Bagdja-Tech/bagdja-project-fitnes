"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { memberships, classTypes } from "@/data/dummy";

function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentType = searchParams.get("type") || "membership"; // "membership" or "class"
  const selectedMembershipId = searchParams.get("membership") || "2";
  const classId = searchParams.get("classId");

  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    billingCity: "",
    billingPostcode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedMembership = memberships.find(
    (m) => m.id === parseInt(selectedMembershipId)
  ) || memberships[1];

  const selectedClass = classTypes.find((c) => c.id === parseInt(classId || "0"));

  useEffect(() => {
    if (paymentType === "class") {
      // Get booking data for class
      const storedData = sessionStorage.getItem("bookingData");
      if (storedData) {
        setBookingData(JSON.parse(storedData));
      } else {
        router.push(`/class/${classId}`);
      }
    } else {
      // Get registration data for membership
      const storedData = sessionStorage.getItem("registrationData");
      if (storedData) {
        setBookingData(JSON.parse(storedData));
      } else {
        router.push(`/register?membership=${selectedMembershipId}`);
      }
    }
  }, [router, selectedMembershipId, paymentType, classId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (formatted.length <= 19) {
        setPaymentData((prev) => ({ ...prev, [name]: formatted }));
      }
    }
    // Format expiry date (MM/YY)
    else if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
      setPaymentData((prev) => ({ ...prev, [name]: formatted }));
    }
    // Format CVV (3-4 digits)
    else if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4);
      setPaymentData((prev) => ({ ...prev, [name]: formatted }));
    }
    else {
      setPaymentData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
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

    if (!paymentData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required";
    } else if (paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }
    
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    }
    
    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3-4 digits";
    }
    
    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = "Billing address is required";
    }
    
    if (!paymentData.billingCity.trim()) {
      newErrors.billingCity = "City is required";
    }
    
    if (!paymentData.billingPostcode.trim()) {
      newErrors.billingPostcode = "Postcode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (paymentType === "class") {
      // Store class booking data
      const completeData = {
        ...bookingData,
        payment: paymentData,
        bookingId: `CLASS-${Date.now()}`,
        bookingDate: new Date().toISOString(),
        type: "class",
      };

      sessionStorage.setItem("bookingSuccessData", JSON.stringify(completeData));
      router.push("/booking-success");
    } else {
      // Store membership data
      const completeData = {
        ...bookingData,
        payment: paymentData,
        membership: selectedMembership,
        memberId: `S1-${Date.now()}`,
        joinDate: new Date().toISOString(),
        type: "membership",
      };

      sessionStorage.setItem("memberData", JSON.stringify(completeData));
      router.push("/success");
    }
  };

  if (!bookingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const orderTitle = paymentType === "class" ? selectedClass?.name : selectedMembership.name;
  const orderLocation = paymentType === "class" ? "Fitness Studio" : selectedMembership.location;
  const orderPrice = paymentType === "class" ? selectedClass?.price || 0 : selectedMembership.price;

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
            PAYMENT
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Complete your membership registration
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-8 rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
          <h3 className="mb-4 text-xl font-black text-white">ORDER SUMMARY</h3>
          <div className="space-y-3">
            {paymentType === "class" ? (
              <>
                <div className="flex justify-between text-gray-300">
                  <span>Class:</span>
                  <span className="font-semibold text-white">{orderTitle}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Day:</span>
                  <span className="font-semibold text-white">{bookingData.day}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Time:</span>
                  <span className="font-semibold text-white">{bookingData.time}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Instructor:</span>
                  <span className="font-semibold text-white">{bookingData.instructor}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Duration:</span>
                  <span className="font-semibold text-white">{bookingData.duration}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-gray-300">
                  <span>Membership:</span>
                  <span className="font-semibold text-white">{orderTitle}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Location:</span>
                  <span className="font-semibold text-white">{orderLocation}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Billing Cycle:</span>
                  <span className="font-semibold text-white">Monthly</span>
                </div>
              </>
            )}
            <div className="border-t border-gray-800 pt-3">
              <div className="flex justify-between text-xl font-black text-white">
                <span>Total:</span>
                <span>
                  £{orderPrice}
                  {paymentType === "membership" && `/${selectedMembership.period}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card Information */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">CARD INFORMATION</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.cardNumber ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.cardName ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder={bookingData ? `${bookingData.firstName} ${bookingData.lastName}` : "John Doe"}
                />
                {errors.cardName && (
                  <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-gray-300">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    maxLength={5}
                    className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                      errors.expiryDate ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    maxLength={4}
                    className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                      errors.cvv ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="123"
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-black text-white">BILLING ADDRESS</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  value={paymentData.billingAddress}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                    errors.billingAddress ? "border-red-500" : "border-gray-700"
                  }`}
                    placeholder={bookingData?.address || "123 Main Street"}
                />
                {errors.billingAddress && (
                  <p className="mt-1 text-sm text-red-500">{errors.billingAddress}</p>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-gray-300">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="billingCity"
                    value={paymentData.billingCity}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                      errors.billingCity ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder={bookingData?.city || "London"}
                  />
                  {errors.billingCity && (
                    <p className="mt-1 text-sm text-red-500">{errors.billingCity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="billingPostcode"
                    value={paymentData.billingPostcode}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-lg border-2 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none ${
                      errors.billingPostcode ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder={bookingData?.postcode || "SW1A 1AA"}
                  />
                  {errors.billingPostcode && (
                    <p className="mt-1 text-sm text-red-500">{errors.billingPostcode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <div className="flex items-start">
              <svg
                className="mr-3 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm text-gray-300">
                Your payment information is encrypted and secure. We use industry-standard SSL
                encryption to protect your data.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Link
              href={
                paymentType === "class"
                  ? `/class/${classId}/book?day=${bookingData.day}&time=${bookingData.time}`
                  : `/register?membership=${selectedMembershipId}`
              }
              className="text-sm font-semibold text-gray-400 hover:text-white"
            >
              ← Back to {paymentType === "class" ? "Booking" : "Registration"}
            </Link>
            <button
              type="submit"
              disabled={isProcessing}
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center">
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
                  Processing Payment...
                </span>
              ) : (
                `Pay £${orderPrice} Now`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <PaymentForm />
    </Suspense>
  );
}
