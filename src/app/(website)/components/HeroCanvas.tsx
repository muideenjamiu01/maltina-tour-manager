"use client"

import Image from "next/image"

export default function HeroCanvas({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<section className="relative w-full min-h-screen ">
  <div className="relative w-full">
    <Image
      src="/assets/hero-bus.png"
      alt="Maltina Nourishment Tour Bus"
      width={1920}
      height={900}
      priority
      className="w-full "
    />
  </div>

  {/* CONTENT OVERLAY */}
  <div className="absolute inset-0 z-20">

    {children}
  </div>

</section>

  )
}
