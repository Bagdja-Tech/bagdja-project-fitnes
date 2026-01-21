"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParallaxSection from "@/components/ParallaxSection";

export default function MyMembership() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [memberData, setMemberData] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("user") || localStorage.getItem("user");
    const memberDataStorage = sessionStorage.getItem("memberData") || localStorage.getItem("memberData");
    
    if (!userData) {
      router.push("/login?return=/my-membership");
      return;
    }

    setUser(JSON.parse(userData));
    
    if (memberDataStorage) {
      setMemberData(JSON.parse(memberDataStorage));
    }
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getNextBillingDate = (joinDate: string) => {
    const date = new Date(joinDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="bg-black">
        <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ParallaxSection speed={0.3} direction="up">
              <div className="text-center">
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                  MY MEMBERSHIP
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                  You don't have an active membership yet
                </p>
                <div className="mt-10">
                  <Link
                    href="/membership"
                    className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                  >
                    VIEW MEMBERSHIPS
                  </Link>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>
      </div>
    );
  }

  const membership = memberData.membership;
  const nextBillingDate = getNextBillingDate(memberData.joinDate);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.3} direction="up">
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              MY MEMBERSHIP
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Manage your membership and billing information
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Membership Details */}
      <section className="bg-black py-16 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Membership Card */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
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
                <h2 className="text-2xl font-black text-white">{membership.name}</h2>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-white">£{membership.price}</span>
                  <span className="ml-2 text-lg text-gray-400">/{membership.period}</span>
                </div>
                <div className="mt-6 rounded-lg bg-gray-900/50 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Member ID</div>
                  <div className="mt-1 text-sm font-bold text-white">{memberData.memberId}</div>
                </div>
              </div>
            </ParallaxSection>

            {/* Membership Info */}
            <ParallaxSection speed={0.3} direction="up">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
                  <h3 className="mb-6 text-2xl font-black text-white">MEMBERSHIP DETAILS</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Status</div>
                      <div className="mt-2">
                        <span className="inline-block rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Join Date</div>
                      <div className="mt-2 text-lg font-bold text-white">
                        {formatDate(memberData.joinDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Next Billing</div>
                      <div className="mt-2 text-lg font-bold text-white">
                        {formatDate(nextBillingDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Billing Cycle</div>
                      <div className="mt-2 text-lg font-bold text-white">Monthly</div>
                    </div>
                  </div>
                </div>

                {/* Membership Features */}
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
                  <h3 className="mb-6 text-2xl font-black text-white">MEMBERSHIP BENEFITS</h3>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {membership.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="mr-3 h-5 w-5 flex-shrink-0 text-orange-500"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment Method */}
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">PAYMENT METHOD</h3>
                      <p className="mt-2 text-gray-400">
                        {memberData.payment?.cardNumber
                          ? `**** **** **** ${memberData.payment.cardNumber.slice(-4)}`
                          : "No payment method on file"}
                      </p>
                    </div>
                    <button className="rounded-full border-2 border-gray-700 bg-transparent px-6 py-2 text-sm font-bold text-white transition-all hover:border-gray-600">
                      Update
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/membership"
                    className="flex-1 rounded-full border-2 border-gray-700 bg-transparent px-6 py-3 text-center text-base font-bold text-white transition-all hover:border-gray-600"
                  >
                    Change Membership
                  </Link>
                  <button className="flex-1 rounded-full border-2 border-red-500 bg-transparent px-6 py-3 text-base font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white">
                    Cancel Membership
                  </button>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Payment History */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.4} direction="up">
            <h2 className="mb-8 text-3xl font-black text-white sm:text-4xl">PAYMENT HISTORY</h2>
          </ParallaxSection>

          <div className="space-y-4">
            {[
              {
                date: memberData.joinDate,
                amount: membership.price,
                description: "Initial membership payment",
                status: "Paid",
              },
              {
                date: nextBillingDate,
                amount: membership.price,
                description: "Monthly membership fee",
                status: "Pending",
              },
            ].map((payment, index) => (
              <ParallaxSection key={index} speed={0.3} direction="up">
                <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{payment.description}</div>
                      <div className="mt-1 text-sm text-gray-400">{formatDate(payment.date)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-white">£{payment.amount}</div>
                      <div className="mt-1">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            payment.status === "Paid"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
