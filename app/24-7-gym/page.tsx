"use client";

import Link from "next/link";
import { useState } from "react";
import { locations, gymLocations } from "@/data/dummy";
import VideoBackground from "@/components/VideoBackground";
import ParallaxSection from "@/components/ParallaxSection";
import GoogleMap from "@/components/GoogleMap";

export default function Gym24_7() {
  const [selectedLocation, setSelectedLocation] = useState(gymLocations[0]);

  return (
    <div className="bg-black">
      {/* Hero Section with Video Background */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <VideoBackground overlayOpacity={0.7}>
          <div className="flex h-full items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <ParallaxSection speed={0.3} direction="up">
                <span className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-bold text-white">
                  24/7 GYM LOCATION
                </span>
                <h1 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                  24/7 GYM
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-200">
                  Train on your schedule. Our standalone gym offers 24/7 access with premium
                  equipment and facilities for independent training.
                </p>
              </ParallaxSection>
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* Overview Section with Parallax */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ParallaxSection speed={0.3} direction="up">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  INDEPENDENT
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    TRAINING
                  </span>
                </h2>
                <p className="mt-6 text-lg text-gray-300">
                  Our 24/7 gym is designed for those who prefer to train independently. With
                  round-the-clock access, you can work out whenever it fits your schedule—early
                  morning, late night, or anywhere in between.
                </p>
                <p className="mt-4 text-lg text-gray-300">
                  No classes, no timetables, just you and your fitness goals. Train at your own pace
                  with access to premium equipment and facilities.
                </p>
              </div>
            </ParallaxSection>
            <ParallaxSection speed={0.3} direction="up">
              <div>
                <h3 className="text-2xl font-black text-white">WHY CHOOSE 24/7 ACCESS?</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Train whenever you want, 24 hours a day",
                    "No class schedules or booking required",
                    "Full access to all gym equipment",
                    "Flexible training routine",
                    "Privacy and focus",
                    "Perfect for shift workers and busy schedules",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="mr-4 h-6 w-6 flex-shrink-0 text-orange-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Facilities Section with Parallax */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                PREMIUM FACILITIES
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                State-of-the-art equipment and amenities for your training needs.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Cardio Equipment",
                description: "Latest treadmills, bikes, rowers, and ellipticals from top brands",
              },
              {
                title: "Strength Training",
                description: "Comprehensive free weights, machines, and functional training areas",
              },
              {
                title: "Functional Zone",
                description: "Dedicated space for functional movements, TRX, and bodyweight training",
              },
              {
                title: "Locker Facilities",
                description: "Secure lockers and changing rooms with showers",
              },
              {
                title: "Premium Equipment",
                description: "Top-tier brands including Technogym, Life Fitness, and more",
              },
              {
                title: "Clean & Safe",
                description: "Regularly sanitized facilities with 24/7 security access",
              },
            ].map((facility, index) => (
              <ParallaxSection key={index} speed={0.3} direction="up">
                <div className="overflow-hidden rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 transition-all hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20">
                  <h3 className="text-lg font-black text-white">{facility.title}</h3>
                  <p className="mt-2 text-gray-300">{facility.description}</p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section with List and Map */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                OUR LOCATIONS
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                Find the 24/7 Gym location nearest to you. All locations offer the same premium
                facilities and 24/7 access.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Locations List */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="space-y-4">
                {gymLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
                      selectedLocation.id === location.id
                        ? "border-orange-500 bg-gradient-to-br from-gray-900 to-black shadow-xl shadow-orange-500/20"
                        : "border-gray-800 bg-gradient-to-br from-gray-900/50 to-black hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-white">{location.name}</h3>
                        <div className="mt-3 space-y-2 text-sm text-gray-300">
                          <div className="flex items-start">
                            <svg
                              className="mr-2 h-5 w-5 flex-shrink-0 text-orange-500"
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
                            <span>{location.address}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="mr-2 h-5 w-5 flex-shrink-0 text-orange-500"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{location.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="mr-2 h-5 w-5 flex-shrink-0 text-orange-500"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-semibold text-orange-400">{location.hours}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {location.features.map((feature, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedLocation.id === location.id && (
                        <div className="ml-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                            <svg
                              className="h-4 w-4 text-white"
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
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ParallaxSection>

            {/* Google Map */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="h-[600px] w-full rounded-2xl border-2 border-gray-800 overflow-hidden">
                <GoogleMap
                  lat={selectedLocation.coordinates.lat}
                  lng={selectedLocation.coordinates.lng}
                  zoom={15}
                  locationName={selectedLocation.name}
                  address={selectedLocation.address}
                  className="h-full w-full"
                />
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              START TRAINING
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                TODAY
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
              Join our 24/7 gym and train on your schedule with premium facilities.
            </p>
            <div className="mt-10">
              <Link
                href="/membership"
                className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
              >
                VIEW MEMBERSHIP OPTIONS
              </Link>
            </div>
          </ParallaxSection>
        </div>
      </section>
    </div>
  );
}
