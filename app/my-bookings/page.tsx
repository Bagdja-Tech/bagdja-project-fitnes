"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParallaxSection from "@/components/ParallaxSection";

interface Booking {
  id: string;
  className: string;
  instructor: string;
  day: string;
  time: string;
  date: string;
  duration: string;
  price: number;
  status: "confirmed" | "completed" | "cancelled";
  bookingDate: string;
}

export default function MyBookings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (!userData) {
      router.push("/login?return=/my-bookings");
      return;
    }

    setUser(JSON.parse(userData));

    // Get bookings from sessionStorage/localStorage
    // In production, this would come from API
    const bookingData = sessionStorage.getItem("bookingSuccessData");
    if (bookingData) {
      const data = JSON.parse(bookingData);
      setBookings([
        {
          id: data.bookingId,
          className: data.className,
          instructor: data.instructor,
          day: data.day,
          time: data.time,
          date: new Date().toISOString().split("T")[0],
          duration: data.duration,
          price: data.price,
          status: "confirmed",
          bookingDate: data.bookingDate,
        },
      ]);
    }

    // Add some dummy bookings for demo
    const dummyBookings: Booking[] = [
      {
        id: "CLASS-001",
        className: "HIIT Training",
        instructor: "Sarah Johnson",
        day: "Monday",
        time: "18:00",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        duration: "45 minutes",
        price: 15,
        status: "confirmed",
        bookingDate: new Date().toISOString(),
      },
      {
        id: "CLASS-002",
        className: "Yoga Flow",
        instructor: "Emma Williams",
        day: "Wednesday",
        time: "09:00",
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        duration: "60 minutes",
        price: 12,
        status: "confirmed",
        bookingDate: new Date().toISOString(),
      },
      {
        id: "CLASS-003",
        className: "Boxing",
        instructor: "James Wilson",
        day: "Friday",
        time: "19:30",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        duration: "50 minutes",
        price: 20,
        status: "completed",
        bookingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    setBookings((prev) => [...prev, ...dummyBookings]);
  }, [router]);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "upcoming") {
      return booking.status === "confirmed" && new Date(booking.date) >= new Date();
    }
    if (filter === "past") {
      return booking.status === "completed" || new Date(booking.date) < new Date();
    }
    return true;
  });

  const handleCancel = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" as const } : b))
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              MY BOOKINGS
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              View and manage your class bookings
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-black py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 border-b border-gray-800">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                filter === "all"
                  ? "border-b-2 border-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                filter === "upcoming"
                  ? "border-b-2 border-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                filter === "past"
                  ? "border-b-2 border-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="bg-black py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredBookings.length === 0 ? (
            <ParallaxSection speed={0.3} direction="up">
              <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-12 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-4 text-xl font-black text-white">No Bookings Found</h3>
                <p className="mt-2 text-gray-400">
                  {filter === "upcoming"
                    ? "You don't have any upcoming bookings"
                    : filter === "past"
                      ? "You don't have any past bookings"
                      : "You haven't booked any classes yet"}
                </p>
                <Link
                  href="/gym-classes"
                  className="mt-6 inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-base font-bold text-white transition-all hover:scale-105"
                >
                  Browse Classes
                </Link>
              </div>
            </ParallaxSection>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <ParallaxSection key={booking.id} speed={0.3} direction="up">
                  <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 transition-all hover:border-gray-700">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="text-2xl font-black text-white">{booking.className}</h3>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  booking.status === "confirmed"
                                    ? "bg-green-500 text-white"
                                    : booking.status === "completed"
                                      ? "bg-gray-600 text-white"
                                      : "bg-red-500 text-white"
                                }`}
                              >
                                {booking.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                              <div className="flex items-center text-sm text-gray-400">
                                <svg
                                  className="mr-2 h-5 w-5 text-blue-500"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(booking.date)}
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <svg
                                  className="mr-2 h-5 w-5 text-blue-500"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {booking.time} ({booking.duration})
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <svg
                                  className="mr-2 h-5 w-5 text-blue-500"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {booking.instructor}
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <svg
                                  className="mr-2 h-5 w-5 text-blue-500"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                £{booking.price}
                              </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                              Booking ID: {booking.id}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 lg:items-end">
                        {booking.status === "confirmed" && new Date(booking.date) >= new Date() && (
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="rounded-full border-2 border-red-500 bg-transparent px-6 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                          >
                            Cancel Booking
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <Link
                            href={`/class/${booking.id}`}
                            className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 text-center text-sm font-bold text-white transition-all hover:scale-105"
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </ParallaxSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {filteredBookings.length > 0 && (
        <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <ParallaxSection speed={0.3} direction="up">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                BOOK MORE CLASSES
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                Explore our full class schedule and book your next session
              </p>
              <div className="mt-10">
                <Link
                  href="/gym-classes"
                  className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                >
                  BROWSE CLASSES
                </Link>
              </div>
            </ParallaxSection>
          </div>
        </section>
      )}
    </div>
  );
}
