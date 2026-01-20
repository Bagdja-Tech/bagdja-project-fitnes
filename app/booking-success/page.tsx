"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  className: string;
  instructor: string;
  day: string;
  time: string;
  price: number;
  duration: string;
  bookingId: string;
  bookingDate: string;
}

export default function BookingSuccess() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingSuccessData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      router.push("/gym-classes");
    }
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!bookingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            CLASS BOOKED SUCCESSFULLY!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Your booking has been confirmed
          </p>
        </div>

        {/* Booking Confirmation Card */}
        <div className="mb-8 rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
          <div className="mb-6 border-b border-gray-800 pb-6">
            <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Booking ID</div>
            <div className="mt-1 text-2xl font-black text-white">{bookingData.bookingId}</div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-black text-white">CLASS DETAILS</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Class</div>
                  <div className="text-lg font-bold text-white">{bookingData.className}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Instructor</div>
                  <div className="text-lg font-bold text-white">{bookingData.instructor}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="text-lg font-bold text-white">{bookingData.duration}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-black text-white">SESSION DETAILS</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Day</div>
                  <div className="text-lg font-bold text-white">{bookingData.day}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="text-lg font-bold text-white">{bookingData.time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Price</div>
                  <div className="text-lg font-bold text-white">£{bookingData.price}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <div className="text-sm text-gray-400">Booked by</div>
            <div className="mt-1 text-lg font-bold text-white">
              {bookingData.firstName} {bookingData.lastName}
            </div>
            <div className="mt-1 text-sm text-gray-300">{bookingData.email}</div>
            <div className="mt-1 text-sm text-gray-300">{bookingData.phone}</div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mb-8 rounded-2xl border-2 border-blue-800 bg-gradient-to-br from-blue-900/20 to-black p-6">
          <h3 className="mb-4 text-xl font-black text-white">IMPORTANT INFORMATION</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <svg
                className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Please arrive 10 minutes before the class starts</span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Bring a water bottle and towel</span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Check your email for a confirmation with all details</span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancellations must be made at least 24 hours in advance</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/gym-classes"
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 sm:w-auto"
          >
            Book Another Class
          </Link>
          <Link
            href="/"
            className="w-full rounded-full border-2 border-gray-700 bg-transparent px-8 py-4 text-center text-lg font-bold text-white transition-all hover:border-gray-600 hover:bg-gray-900 sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
