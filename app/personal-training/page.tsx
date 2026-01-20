import Link from "next/link";
import { personalTraining } from "@/data/dummy";

export default function PersonalTraining() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {personalTraining.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
              {personalTraining.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400">
              {personalTraining.description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Personal Training?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              One-on-one guidance tailored to your specific goals and needs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {personalTraining.benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Who Is Personal Training For?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Personal training is ideal for anyone looking to maximize their results with expert
                guidance. Whether you're just starting out or looking to break through a plateau,
                our trainers will help you achieve your goals faster and more effectively.
              </p>
            </div>
            <div>
              <ul className="space-y-4">
                {[
                  "Beginners who want to learn proper form and technique",
                  "Experienced athletes looking to optimize performance",
                  "Individuals with specific health or fitness goals",
                  "People recovering from injuries (with medical clearance)",
                  "Busy professionals who want efficient, effective workouts",
                  "Anyone seeking accountability and motivation",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="mr-3 h-6 w-6 flex-shrink-0 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Trainers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Certified professionals dedicated to your success.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {personalTraining.trainers.map((trainer, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="p-6">
                  <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-500">
                      {trainer.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 text-center text-sm font-medium text-gray-600">
                    {trainer.specialization}
                  </p>
                  <p className="mt-1 text-center text-xs text-gray-500">
                    {trainer.experience}
                  </p>
                  <p className="mt-4 text-sm text-gray-600 text-center">{trainer.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Personal Training Packages
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Choose a package that fits your commitment level. Save more with larger packages.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {personalTraining.pricing.map((packageItem, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border-2 ${
                  packageItem.sessions === 10
                    ? "border-gray-900 bg-gray-900 shadow-xl"
                    : "border-gray-200 bg-white shadow-sm"
                } transition-shadow hover:shadow-lg`}
              >
                <div className="p-8">
                  {packageItem.sessions === 10 && (
                    <div className="mb-4 text-center">
                      <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                        Best Value
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3
                      className={`text-2xl font-bold ${
                        packageItem.sessions === 10 ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {packageItem.sessions} Session{packageItem.sessions > 1 ? "s" : ""}
                    </h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span
                        className={`text-4xl font-bold ${
                          packageItem.sessions === 10 ? "text-white" : "text-gray-900"
                        }`}
                      >
                        £{packageItem.price}
                      </span>
                      {packageItem.sessions > 1 && (
                        <span
                          className={`ml-2 text-lg ${
                            packageItem.sessions === 10 ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          /package
                        </span>
                      )}
                    </div>
                    {packageItem.savings && (
                      <p
                        className={`mt-2 text-sm font-medium ${
                          packageItem.sessions === 10 ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        {packageItem.savings}
                      </p>
                    )}
                    {packageItem.sessions > 1 && (
                      <p
                        className={`mt-2 text-sm ${
                          packageItem.sessions === 10 ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        £{Math.round(packageItem.price / packageItem.sessions)} per session
                      </p>
                    )}
                  </div>

                  <div className="mt-8">
                    <button
                      className={`w-full rounded-full px-6 py-3 text-base font-semibold transition-colors ${
                        packageItem.sessions === 10
                          ? "bg-white text-gray-900 hover:bg-gray-100"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits vs Training Alone */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
              Personal Training vs. Training Alone
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">With Personal Training</h3>
                <ul className="mt-4 space-y-2">
                  {[
                    "Customized program for your goals",
                    "Expert form correction",
                    "Accountability and motivation",
                    "Faster results",
                    "Injury prevention",
                    "Progressive overload planning",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <svg
                        className="mr-2 h-5 w-5 flex-shrink-0 text-green-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Training Alone</h3>
                <ul className="mt-4 space-y-2">
                  {[
                    "Generic workout plans",
                    "Risk of poor form",
                    "Self-motivation required",
                    "Slower progress",
                    "Higher injury risk",
                    "Plateau challenges",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <svg
                        className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Book a consultation with one of our trainers to discuss your goals and create a
            personalized plan.
          </p>
          <div className="mt-10">
            <button className="rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
