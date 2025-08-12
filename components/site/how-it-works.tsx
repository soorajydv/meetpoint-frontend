'use client'

import Link from 'next/link'
import { Bell, CalendarClock, Clock, Coins, User, Video } from 'lucide-react'
import React from 'react';

export default function HowItWorks() {
  const steps = [
    { icon: <User />, title: "Register", href: "/register" },
    { icon: <Coins />, title: "Buy coins" },
    { icon: <CalendarClock />, title: "Book a slot" },
    { icon: <Video />, title: "Start session" },
  ];

  const renderStep = (step: typeof steps[number], index: number) => {
    const content = (
      <div className="flex flex-col items-center text-center">
        {/* Icon badge */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-700 text-white font-bold mb-4 dark:bg-teal-400 dark:text-black shrink-0">
          {React.cloneElement(step.icon, { className: "h-6 w-6" })}
        </div>

        {/* Step */}
        <div className="font-medium text-lg">{step.title}</div>
      </div>
    );

    return (
      <div
        key={index}
        className="flex-1 min-w-[150px] md:min-w-[250px] md:max-w-[300px] flex flex-col items-center text-center relative"
      >
        {step.href ? (
          <Link href={step.href} className="block w-full">
            {content}
          </Link>
        ) : (
          <div className="block w-full">{content}</div>
        )}

        {/* Arrow shown on all screens */}
        {index < steps.length - 1 && (
          <div
            className="absolute top-1/2 right-[-25px] -translate-y-1/2 text-teal-400 select-none pointer-events-none
                       md:right-[-35px]"
            aria-hidden="true"
          >
            ➡
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="how" className="container mx-auto px-4 py-[6rem]">
      <div className="text-center mb-15">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <p className="text-muted-foreground">
          From registration to your session in a few simple steps
        </p>
      </div>

      {/* All steps side by side on mobile */}
      <div className="flex flex-row flex-wrap justify-center gap-14 relative">
        {steps.map(renderStep)}
      </div>
    </section>
  )
}
