"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { classTypes, timetable } from "@/data/dummy";
import ParallaxSection from "@/components/ParallaxSection";

export default function ClassDetail() {
  const params = useParams();
  const router = useRouter();
  const classId = parseInt(params.id as string);

  const classData = classTypes.find((c) => c.id === classId);

  if (!classData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Class not found</h1>
          <Link href="/gym-classes" className="mt-4 text-blue-400 hover:text-blue-300">
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  // Find upcoming classes from timetable
  const upcomingClasses = timetable
    .flatMap((day) =>
      day.classes
        .filter((c) => c.class === classData.name)
        .map((c) => ({
          ...c,
          day: day.day,
        }))
    )
    .slice(0, 5); // Show next 5 available sessions

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <Link
              href="/gym-classes"
              className="mb-6 inline-flex items-center text-sm font-semibold text-gray-400 hover:text-white"
            >
              ← Back to Classes
            </Link>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      classData.intensity === "High"
                        ? "bg-red-500 text-white"
                        : classData.intensity === "Medium"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    {classData.intensity}
                  </span>
                  <span className="text-sm text-gray-400">{classData.duration}</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                  {classData.name}
                </h1>
                <p className="mt-4 text-xl text-gray-300">{classData.description}</p>
                <div className="mt-6 flex items-center gap-6">
                  <div>
                    <div className="text-sm text-gray-400">Instructor</div>
                    <div className="text-lg font-bold text-white">{classData.instructor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Price</div>
                    <div className="text-2xl font-black text-white">£{classData.price}</div>
                  </div>
                </div>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Class Details */}
      <section className="bg-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <ParallaxSection speed={0.3} direction="up">
              <div>
                <h2 className="mb-6 text-3xl font-black text-white">ABOUT THIS CLASS</h2>
                <p className="text-lg leading-relaxed text-gray-300">{classData.fullDescription}</p>
                
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-black text-white">INSTRUCTOR</h3>
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <div className="mb-2 text-lg font-bold text-white">{classData.instructor}</div>
                    <p className="text-sm text-gray-300">{classData.instructorBio}</p>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.3} direction="up">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-black text-white">CLASS DETAILS</h3>
                  <div className="space-y-3 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-semibold text-white">{classData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Intensity:</span>
                      <span className="font-semibold text-white">{classData.intensity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Participants:</span>
                      <span className="font-semibold text-white">{classData.maxParticipants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Equipment:</span>
                      <span className="font-semibold text-white">{classData.equipment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Suitable For:</span>
                      <span className="font-semibold text-white">{classData.suitableFor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-black text-white">BENEFITS</h3>
                  <ul className="space-y-2">
                    {classData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
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
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                UPCOMING SESSIONS
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                Choose a session time that works for you
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingClasses.map((session, index) => (
              <ParallaxSection key={index} speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 transition-all hover:border-blue-500">
                  <div className="mb-4">
                    <div className="text-sm font-bold text-gray-400">{session.day}</div>
                    <div className="mt-1 text-2xl font-black text-white">{session.time}</div>
                  </div>
                  <div className="mb-4 text-sm text-gray-300">
                    <div>Instructor: {session.instructor}</div>
                  </div>
                  <Link
                    href={`/class/${classId}/book?day=${session.day}&time=${session.time}`}
                    className="block w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-center text-sm font-bold text-white transition-all hover:scale-105"
                  >
                    Book This Session
                  </Link>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              READY TO BOOK?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
              Select a session time above to reserve your spot
            </p>
          </ParallaxSection>
        </div>
      </section>
    </div>
  );
}
