"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VoteConfirm() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({ email: "", mobile: "" });

  // Handle vote confirmation
  const handleConfirmVote = () => {
    let valid = true;
    const newErrors = { email: "", mobile: "" };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Mobile validation
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!/^\d{10,15}$/.test(mobile)) {
      newErrors.mobile = "Invalid mobile number";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Navigate to next page
      router.push(`/beforeConfirming?email=${email}&mobile=${mobile}`);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Image
        src="/assets/background.png"
        alt="Vote background"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 px-4 py-20">
          {/* LEFT SIDE */}
          <div className="space-y-2 text-black max-w-md mx-6 md:mx-20 mt-6 ml-6 mb-4">
            {/* Back Link */}
            <Link
              href="/vioteforFavourite"
              className="inline-flex items-center gap-2 text-black text-sm font-medium px-2 py-1 rounded-md"
            >
              ← Back to all Finalists
            </Link>

            <div className="ml-5">
              <div>
                <p className="inline-block border-2 border-orange-400 text-black px-2 py-1 rounded text-sm">
                  South West
                </p>
                <p className="inline-block ml-2 text-sm">Lagos</p>
              </div>

              <p className="text-md font-medium">Aisha. K</p>

              <p className="text-xs text-black">
                Age 12 • Female • JSS 2 • Government Primary School Ikeja
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-md mx-auto text-center space-y-6 pt-5">
            {/* Designer Image */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/sampleperson.png"
                alt="Designer"
                fill
                className="object-cover"
              />
            </div>

            {/* Design Image */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/sampleperson.png"
                alt="Design artwork"
                fill
                className="object-cover"
              />
            </div>

            {/* Design Story */}
            <div className="bg-white/90 rounded-lg p-4 text-left shadow-md">
              <h3 className="font-semibold text-sm text-gray-800">Design Story</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                This design represents creativity, culture, and imagination inspired
                by everyday life and the joy of childhood.
              </p>
            </div>

            {/* Confirm Vote Form */}
            <div className="px-4 py-4 text-left space-y-5">
              <h3 className="font-semibold text-black text-sm">Confirm Your Vote</h3>

              {/* Email */}
              <div>
                <label className="block text-sm text-black mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-100 text-black placeholder-gray-400 
                    rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500
                    ${errors.email ? "border border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm text-black mb-1">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full bg-gray-100 text-black placeholder-gray-400 
                    rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500
                    ${errors.mobile ? "border border-red-500" : ""}`}
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Helper Text */}
              <p className="text-xs text-black  leading-relaxed">
                You can only vote once using the same email and mobile number.
              </p>

              {/* Confirm Vote Button */}
              <button
                type="button"
                onClick={handleConfirmVote}
                className="bg-gray-200 text-black rounded-md transition p-2  "
              >
                Confirm Vote for this Design
              </button>

              {/* Rules Link */}
              <div className="text-center pt-4">
                <a
                  href="#"
                  className="text-sm underline text-black rounded-2xl p-2"
                >
                  Read competition rules
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
