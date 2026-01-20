"use client";

import { useState } from "react";
import Link from "next/link";
import { locations, classTypes, timetable, studioLocations } from "@/data/dummy";
import VideoBackground from "@/components/VideoBackground";
import ParallaxSection from "@/components/ParallaxSection";
import GoogleMap from "@/components/GoogleMap";

export default function GymClasses() {
  const [selectedLocation, setSelectedLocation] = useState(studioLocations[0]);

  return (
    <div className="bg-black">
      {/* Hero Section with Video Background */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <VideoBackground overlayOpacity={0.7}>
          <div className="flex h-full items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <ParallaxSection speed={0.3} direction="up">
                <span className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white">
                  FITNESS STUDIO LOCATION
                </span>
                <h1 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                  GYM CLASSES
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-200">
                  Structured, coached group fitness sessions designed to push you further. Join our
                  community and experience the power of group training.
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
                  GROUP TRAINING
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    EXPERIENCE
                  </span>
                </h2>
                <p className="mt-6 text-lg text-gray-300">
                  Our group fitness classes combine expert coaching with the motivation of training
                  alongside others. Each session is carefully structured to maximize results while
                  ensuring proper form and technique.
                </p>
                <p className="mt-4 text-lg text-gray-300">
                  Whether you're looking to build strength, improve cardiovascular fitness, or enhance
                  flexibility, our diverse class schedule has something for everyone.
                </p>
              </div>
            </ParallaxSection>
            <ParallaxSection speed={0.3} direction="up">
              <div>
                <h3 className="text-2xl font-black text-white">BENEFITS OF GROUP TRAINING</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Expert coaching and guidance",
                    "Structured, time-efficient workouts",
                    "Motivation from training with others",
                    "Accountability and consistency",
                    "Variety to keep workouts engaging",
                    "Community support and encouragement",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
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
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Class Types Section with Parallax */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                OUR CLASSES
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                A diverse range of classes to suit every fitness goal and preference.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classTypes.map((classType, index) => (
              <ParallaxSection key={classType.id} speed={0.3} direction="up">
                <Link href={`/class/${classType.id}`}>
                  <div className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white">{classType.name}</h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            classType.intensity === "High"
                              ? "bg-red-500 text-white"
                              : classType.intensity === "Medium"
                                ? "bg-yellow-500 text-black"
                                : "bg-green-500 text-white"
                          }`}
                        >
                          {classType.intensity}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-300">{classType.description}</p>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                        <span>{classType.duration}</span>
                        <span>with {classType.instructor}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-white">£{classType.price}</span>
                        <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section with Parallax */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                CLASS TIMETABLE
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                Plan your week with our structured class schedule.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-12 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg border-2 border-gray-800 shadow-xl">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300">
                        Day
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-300">
                        Schedule
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 bg-black">
                    {timetable.map((day, dayIndex) => (
                      <tr key={dayIndex} className="hover:bg-gray-900">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-white">
                          {day.day}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {day.classes.map((classItem, classIndex) => (
                              <div
                                key={classIndex}
                                className="rounded-md border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs"
                              >
                                <span className="font-bold text-blue-400">{classItem.time}</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-300">{classItem.class}</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-500">{classItem.instructor}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                Find the Fitness Studio location nearest to you. All locations offer the same premium
                group fitness classes and expert coaching.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Locations List */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="space-y-4">
                {studioLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
                      selectedLocation.id === location.id
                        ? "border-blue-500 bg-gradient-to-br from-gray-900 to-black shadow-xl shadow-blue-500/20"
                        : "border-gray-800 bg-gradient-to-br from-gray-900/50 to-black hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-white">{location.name}</h3>
                        <div className="mt-3 space-y-2 text-sm text-gray-300">
                          <div className="flex items-start">
                            <svg
                              className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
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
                              className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
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
                              className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-semibold text-blue-400">{location.hours}</span>
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
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
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
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              READY TO JOIN
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                OUR CLASSES?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
              Start your group fitness journey with unlimited access to all classes.
            </p>
            <div className="mt-10">
              <Link
                href="/membership"
                className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
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
