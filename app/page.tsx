"use client";

import Link from "next/link";
import { locations } from "@/data/dummy";
import VideoBackground from "@/components/VideoBackground";
import ParallaxSection from "@/components/ParallaxSection";

export default function Home() {
  return (
    <div className="bg-black">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <VideoBackground overlayOpacity={0.6}>
          <div className="flex h-full items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <ParallaxSection speed={0.3} direction="up">
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  PREMIUM FITNESS.
                  <br />
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    TWO LOCATIONS.
                  </span>
                </h1>
              </ParallaxSection>
              <ParallaxSection speed={0.2} direction="up">
                <p className="mx-auto mt-8 max-w-2xl text-xl font-medium leading-8 text-gray-200 sm:text-2xl">
                  Experience premium fitness with our two distinct locations: structured group
                  classes at our Studio, or train independently at our 24/7 Gym.
                </p>
              </ParallaxSection>
              <ParallaxSection speed={0.1} direction="up">
                <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link
                    href="/gym-classes"
                    className="group relative overflow-hidden rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10">VIEW CLASSES</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                  <Link
                    href="/24-7-gym"
                    className="rounded-full border-2 border-white bg-transparent px-10 py-4 text-base font-bold text-white transition-all hover:bg-white hover:text-black"
                  >
                    EXPLORE 24/7 GYM
                  </Link>
                </div>
              </ParallaxSection>
            </div>
          </div>
        </VideoBackground>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Two Locations Section with Parallax */}
      <section className="relative bg-black py-32 sm:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                CHOOSE YOUR
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  EXPERIENCE
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-300">
                We operate two separate locations, each offering a distinct fitness experience
                tailored to your preferences.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {/* Fitness Studio */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative p-10 sm:p-12">
                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white">
                      STUDIO LOCATION
                    </span>
                  </div>
                  <h3 className="text-4xl font-black text-white">FITNESS STUDIO</h3>
                  <p className="mt-6 text-lg text-gray-300">{locations.studio.description}</p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="mr-4 h-6 w-6 flex-shrink-0 text-blue-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">Group fitness classes only</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-4 h-6 w-6 flex-shrink-0 text-blue-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">Timetable-based sessions</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-4 h-6 w-6 flex-shrink-0 text-blue-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">Structured, coached sessions</span>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Link
                      href="/gym-classes"
                      className="group inline-flex items-center text-lg font-bold text-white transition-colors hover:text-blue-400"
                    >
                      VIEW CLASSES
                      <svg
                        className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            {/* 24/7 Gym */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative p-10 sm:p-12">
                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-bold text-white">
                      GYM LOCATION
                    </span>
                  </div>
                  <h3 className="text-4xl font-black text-white">24/7 GYM</h3>
                  <p className="mt-6 text-lg text-gray-300">{locations.gym.description}</p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-start">
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
                      <span className="text-gray-300">24/7 access</span>
                    </li>
                    <li className="flex items-start">
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
                      <span className="text-gray-300">Standalone gym facilities</span>
                    </li>
                    <li className="flex items-start">
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
                      <span className="text-gray-300">Train independently</span>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Link
                      href="/24-7-gym"
                      className="group inline-flex items-center text-lg font-bold text-white transition-colors hover:text-orange-400"
                    >
                      EXPLORE GYM
                      <svg
                        className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Parallax */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-32 sm:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                WHY S1 HEALTH
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  FITNESS
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-300">
                Premium facilities, professional guidance, and a commitment to your fitness journey.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "PREMIUM QUALITY",
                description: "High-end equipment and facilities designed for serious fitness enthusiasts.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "PROFESSIONAL",
                description: "Certified trainers and coaches dedicated to your success.",
                color: "from-red-500 to-orange-500",
              },
              {
                title: "MODERN",
                description: "State-of-the-art facilities with the latest fitness technology.",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "TRUSTWORTHY",
                description: "A proven track record of helping members achieve their goals.",
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => (
              <ParallaxSection key={index} speed={0.3} direction="up">
                <div className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 transition-all hover:border-gray-700 hover:shadow-xl">
                  <div
                    className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${item.color}`}
                  />
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-4 text-gray-400">{item.description}</p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="relative bg-black py-32 sm:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-900/20 to-red-900/20" />
        <ParallaxSection speed={0.3} direction="up">
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              READY TO START
              <br />
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                YOUR JOURNEY?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-300">
              Choose the membership that fits your lifestyle and goals.
            </p>
            <div className="mt-12">
              <Link
                href="/membership"
                className="group relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-12 py-5 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
              >
                <span className="relative z-10">VIEW MEMBERSHIPS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </ParallaxSection>
      </section>
    </div>
  );
}
