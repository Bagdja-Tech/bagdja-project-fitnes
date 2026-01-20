import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-xl font-black tracking-tight text-white">
              S1<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">HEALTH</span>
            </div>
            <p className="text-sm text-gray-400">
              Premium fitness club with two locations offering group classes and 24/7 gym access.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Locations</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/gym-classes"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Fitness Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/24-7-gym"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  24/7 Gym
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/membership"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/personal-training"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Personal Training
                </Link>
              </li>
              <li>
                <Link
                  href="/gym-classes"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Class Timetable
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>Studio: +44 20 1234 5678</li>
              <li>24/7 Gym: +44 20 9876 5432</li>
              <li>info@s1healthfitness.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} S1 Health Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
