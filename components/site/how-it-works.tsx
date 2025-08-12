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

  return (
    <section id="how" className="container mx-auto px-4 py-[16rem]">
      <div className="text-center mb-15">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <p className="text-muted-foreground">
          From registration to your session in a few simple steps
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8 relative">
        {steps.map((step, index) => {
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
              className="flex-1 min-w-[250px] md:max-w-[300px] flex flex-col items-center text-center relative"
            >
              {/* Wrap content in Link or div with full width and center alignment */}
              {step.href ? (
                <Link href={step.href} className="block w-full">
                  {content}
                </Link>
              ) : (
                <div className="block w-full">
                  {content}
                </div>
              )}

              {/* Arrow for desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-[-35px] text-teal-400 select-none pointer-events-none">
                  ➡
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )
}
