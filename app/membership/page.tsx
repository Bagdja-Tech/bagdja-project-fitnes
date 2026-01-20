"use client";

import Link from "next/link";
import { memberships } from "@/data/dummy";
import VideoBackground from "@/components/VideoBackground";
import ParallaxSection from "@/components/ParallaxSection";

export default function Membership() {
  return (
    <div className="bg-black">
      {/* Hero Section with Video Background */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <VideoBackground overlayOpacity={0.7}>
          <div className="flex h-full items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <ParallaxSection speed={0.3} direction="up">
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                  MEMBERSHIP
                  <br />
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    OPTIONS
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-200">
                  Choose the membership that fits your lifestyle. Each option clearly indicates which
                  location(s) it includes.
                </p>
              </ParallaxSection>
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* Memberships Grid with Parallax */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                CHOOSE YOUR
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  MEMBERSHIP
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                Premium memberships designed to fit your fitness goals and lifestyle.
              </p>
            </div>
          </ParallaxSection>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {memberships.map((membership, index) => (
              <ParallaxSection key={membership.id} speed={0.3} direction="up">
                <div
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all hover:shadow-2xl ${
                    membership.popular
                      ? "border-orange-500 bg-gradient-to-br from-gray-900 to-black shadow-xl shadow-orange-500/20"
                      : "border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700"
                  }`}
                >
                  {membership.popular && (
                    <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1 text-xs font-bold text-white">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    {/* Location Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          membership.location === "Fitness Studio"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : membership.location === "24/7 Gym"
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        }`}
                      >
                        {membership.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white">{membership.name}</h3>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-black text-white">
                        £{membership.price}
                      </span>
                      <span className="ml-2 text-lg text-gray-400">
                        /{membership.period}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="mt-8 space-y-4">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${
                              membership.popular ? "text-orange-500" : "text-gray-600"
                            }`}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-8">
                      <Link
                        href={`/register?membership=${membership.id}`}
                        className={`block w-full rounded-full px-6 py-3 text-center text-base font-bold transition-all hover:scale-105 ${
                          membership.popular
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/50"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                      >
                        {membership.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location Comparison with Parallax */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                MEMBERSHIP
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  COMPARISON
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                Understand which membership gives you access to which location.
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
                        Membership
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-300">
                        Fitness Studio
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-300">
                        24/7 Gym
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 bg-black">
                    {memberships.map((membership) => (
                      <tr key={membership.id} className="hover:bg-gray-900">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-white">
                          {membership.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          {membership.location === "Fitness Studio" ||
                          membership.location === "Both Locations" ? (
                            <svg
                              className="mx-auto h-5 w-5 text-green-500"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          {membership.location === "24/7 Gym" ||
                          membership.location === "Both Locations" ? (
                            <svg
                              className="mx-auto h-5 w-5 text-green-500"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
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

      {/* FAQ Section with Parallax */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                FREQUENTLY ASKED
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  QUESTIONS
                </span>
              </h2>
            </div>
          </ParallaxSection>

          <div className="mt-12 space-y-8">
            {[
              {
                question: "Can I switch between memberships?",
                answer:
                  "Yes, you can upgrade or change your membership at any time. Contact our team to discuss your options.",
              },
              {
                question: "Do memberships include personal training?",
                answer:
                  "Personal training is available as an additional service. Premium members receive a discount on personal training sessions.",
              },
              {
                question: "Is there a contract or commitment?",
                answer:
                  "We offer flexible month-to-month memberships with no long-term contracts. Cancel anytime with 30 days notice.",
              },
              {
                question: "Can I visit both locations with Premium membership?",
                answer:
                  "Yes, Premium membership gives you full access to both the Fitness Studio and 24/7 Gym locations.",
              },
            ].map((faq, index) => (
              <ParallaxSection key={index} speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
                  <h3 className="text-lg font-black text-white">{faq.question}</h3>
                  <p className="mt-2 text-gray-300">{faq.answer}</p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              READY TO JOIN?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
              Start your fitness journey today with a membership that fits your goals.
            </p>
            <div className="mt-10">
              <Link
                href="/register?membership=2"
                className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
              >
                SIGN UP NOW
              </Link>
            </div>
          </ParallaxSection>
        </div>
      </section>
    </div>
  );
}
