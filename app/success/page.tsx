"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string;
  membership: {
    name: string;
    location: string;
    price: number;
  };
  memberId: string;
  joinDate: string;
}

export default function Success() {
  const router = useRouter();
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  useEffect(() => {
    // Get member data from sessionStorage
    const storedData = sessionStorage.getItem("memberData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setMemberData(data);
      
      // Auto-login user after successful registration
      if (data.email && data.password) {
        const userData = {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          memberId: data.memberId,
        };
        sessionStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } else {
      // If no member data, redirect to home
      router.push("/");
    }
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!memberData) {
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
            WELCOME TO S1 HEALTH FITNESS!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Your membership has been activated successfully
          </p>
        </div>

        {/* Membership Card - Printable */}
        <div className="mb-8 flex justify-center" id="membership-card">
          <div className="relative overflow-hidden rounded-2xl border-4 border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 shadow-2xl print:border-2 print:shadow-none print:w-[85.6mm] print:h-[53.98mm] print:rounded-lg print:p-4 print:scale-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
              }} />
            </div>

            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="mb-3 flex items-center justify-between border-b border-gray-800 pb-2 print:mb-2 print:pb-1">
                <div>
                  <div className="text-xl font-black tracking-tight text-white print:text-sm">
                    S1<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">HEALTH</span>
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-gray-400 print:text-[6pt]">FITNESS CLUB</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Member ID</div>
                  <div className="mt-0.5 text-sm font-black text-white print:text-[8pt]">{memberData.memberId}</div>
                </div>
              </div>

              {/* Member Information */}
              <div className="mb-3 flex-1 grid grid-cols-2 gap-3 print:mb-2 print:gap-2">
                <div className="flex flex-col">
                  {/* Photo and Name Row */}
                  <div className="mb-2 flex items-center gap-2 print:mb-1">
                    {memberData.photo && (
                      <img
                        src={memberData.photo}
                        alt={`${memberData.firstName} ${memberData.lastName}`}
                        className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-gray-700 object-cover print:h-[12mm] print:w-[12mm]"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Name</div>
                      <div className="mt-0.5 truncate text-sm font-black text-white print:text-[7pt]">
                        {memberData.firstName} {memberData.lastName}
                      </div>
                    </div>
                  </div>
                  <div className="mb-1.5 print:mb-1">
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Email</div>
                    <div className="mt-0.5 truncate text-[10px] text-gray-300 print:text-[6pt]">{memberData.email}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Phone</div>
                    <div className="mt-0.5 text-[10px] text-gray-300 print:text-[6pt]">{memberData.phone}</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-1.5 print:mb-1">
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Membership</div>
                    <div className="mt-0.5 truncate text-sm font-black text-white print:text-[7pt]">{memberData.membership.name}</div>
                  </div>
                  <div className="mb-1.5 print:mb-1">
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Location</div>
                    <div className="mt-0.5 truncate text-[10px] text-gray-300 print:text-[6pt]">{memberData.membership.location}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Join Date</div>
                    <div className="mt-0.5 text-[10px] text-gray-300 print:text-[6pt]">{formatDate(memberData.joinDate)}</div>
                  </div>
                </div>
              </div>

              {/* Barcode Area */}
              <div className="border-t border-gray-800 pt-2 print:pt-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-shrink-0">
                    <div className="text-[7px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Valid Until</div>
                    <div className="mt-0.5 text-[9px] font-bold text-white print:text-[6pt]">
                      {formatDate(new Date(new Date(memberData.joinDate).setMonth(new Date(memberData.joinDate).getMonth() + 1)).toISOString())}
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    {/* Barcode representation */}
                    <div className="inline-block rounded border border-gray-700 bg-white px-2 py-1 print:px-1 print:py-0.5">
                      <div className="flex items-center justify-center space-x-0.5 print:space-x-[0.5mm]">
                        {memberData.memberId.split("").slice(0, 8).map((char, i) => {
                          const num = isNaN(parseInt(char)) ? 10 : parseInt(char);
                          return (
                            <div
                              key={i}
                              className="w-[1.5px] bg-black print:w-[0.5mm]"
                              style={{ height: `${4 + num * 0.5}mm` }}
                            />
                          );
                        })}
                      </div>
                      <div className="mt-0.5 text-[7px] font-mono text-black print:text-[5pt]">{memberData.memberId}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-[7px] font-bold uppercase tracking-wider text-gray-400 print:text-[5pt]">Fee</div>
                    <div className="mt-0.5 text-[9px] font-bold text-white print:text-[6pt]">£{memberData.membership.price}/mo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={handlePrint}
            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 sm:w-auto print:hidden"
          >
            Print Membership Card
          </button>
          <Link
            href="/"
            className="w-full rounded-full border-2 border-gray-700 bg-transparent px-8 py-4 text-center text-lg font-bold text-white transition-all hover:border-gray-600 hover:bg-gray-900 sm:w-auto print:hidden"
          >
            Back to Home
          </Link>
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-black text-white">WHAT'S NEXT?</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <div className="mb-2 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  1
                </div>
                <h3 className="text-lg font-bold text-white">Download Your Card</h3>
              </div>
              <p className="ml-11 text-sm text-gray-300">
                Print or save your membership card for easy access to the facility.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <div className="mb-2 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  2
                </div>
                <h3 className="text-lg font-bold text-white">Visit the Facility</h3>
              </div>
              <p className="ml-11 text-sm text-gray-300">
                Bring your membership card and ID for your first visit. Our staff will help you get started.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <div className="mb-2 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  3
                </div>
                <h3 className="text-lg font-bold text-white">Check Your Email</h3>
              </div>
              <p className="ml-11 text-sm text-gray-300">
                We've sent a confirmation email with all the details and facility information.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <div className="mb-2 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  4
                </div>
                <h3 className="text-lg font-bold text-white">Start Training</h3>
              </div>
              <p className="ml-11 text-sm text-gray-300">
                You're all set! Start your fitness journey and achieve your goals with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          
          /* Hide everything except the card */
          body > *:not(#membership-card) {
            display: none !important;
          }
          
          /* Center the card on page */
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20mm;
          }
          
          #membership-card {
            margin: 0 !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:border-2 {
            border-width: 2px !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          /* Card specific print styles */
          #membership-card > div {
            width: 85.6mm !important;
            height: 53.98mm !important;
            max-width: 85.6mm !important;
            max-height: 53.98mm !important;
            padding: 4mm !important;
            border-radius: 4mm !important;
          }
          
          /* Adjust text sizes for card */
          #membership-card h1,
          #membership-card h2,
          #membership-card h3 {
            font-size: 10pt !important;
            line-height: 1.2 !important;
            margin: 0 !important;
          }
          
          #membership-card .text-3xl {
            font-size: 12pt !important;
          }
          
          #membership-card .text-2xl {
            font-size: 10pt !important;
          }
          
          #membership-card .text-xl {
            font-size: 9pt !important;
          }
          
          #membership-card .text-lg {
            font-size: 8pt !important;
          }
          
          #membership-card .text-sm {
            font-size: 7pt !important;
          }
          
          #membership-card .text-xs {
            font-size: 6pt !important;
          }
          
          /* Adjust spacing */
          #membership-card .mb-8 {
            margin-bottom: 3mm !important;
          }
          
          #membership-card .mb-4 {
            margin-bottom: 2mm !important;
          }
          
          #membership-card .mb-6 {
            margin-bottom: 2.5mm !important;
          }
          
          #membership-card .mt-1 {
            margin-top: 0.5mm !important;
          }
          
          #membership-card .mt-4 {
            margin-top: 1.5mm !important;
          }
          
          #membership-card .mt-6 {
            margin-top: 2mm !important;
          }
          
          #membership-card .space-y-2 > * + * {
            margin-top: 1mm !important;
          }
          
          /* Photo size for print */
          #membership-card img {
            width: 12mm !important;
            height: 12mm !important;
            border-width: 1px !important;
          }
          
          /* Barcode area */
          #membership-card .flex.items-center.space-x-1 > div {
            height: 8mm !important;
            width: 0.5mm !important;
          }
        }
      `}</style>
    </div>
  );
}
