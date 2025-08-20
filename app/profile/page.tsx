'use client'

import { useState } from "react";
import { Star, MessageCircle, Mic, Video, ArrowRight } from "lucide-react";

const ProfileCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-[100vh]  p-8">
            <div
                className={`relative w-80 transition-all h-[60vh] duration-500 ease-out transform ${isHovered ? 'scale-105' : 'scale-100'
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Card Container */}
                <div
                    className={`relative overflow-hidden rounded-sm transition-all duration-500 ease-out ${isHovered
                        ? 'bg-blue-400 shadow-profile-hover h-[510px]'
                        : 'bg-white shadow-profile h-[360px]'
                        }`}
                >
                    {/* Image Container */}
                    <div className="relative w-full h-42">
                        <img
                            src={'./lawyer-portrait.png'}
                            alt="Dr. Aasha Koirala"
                            className="w-full h-full object-cover "
                        />
                    </div>

                    {/* Details Container */}
                    <div
                        className={`relative transition-all duration-500 ease-out ${isHovered
                            ? 'text-white px-6 pt-4'
                            : 'text-gray-900 px-6 pt-4'
                            }`}
                    >
                        {/* Triangle Background (transparent inside, white outside) */}
                        {!isHovered && (
                            <svg
                                className="absolute -top-16 left-0 w-full h-16 -z-0 pointer-events-none"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                {/* Outer white rect minus inner triangle (hole) */}
                                <path
                                    d="M0,0 H100 V100 H0 Z M0,0 L100,0 L50,100 Z"
                                    fill="white"
                                    fillRule="evenodd"
                                />
                            </svg>
                        )}


                        {/* Content (above triangle) */}
                        <div className="relative z-10">
                            {/* Name and Title */}
                            <div className="text-center">
                                <h2 className={`font-bold transition-all duration-300 ${isHovered ? 'text-2xl' : 'text-xl'
                                    }`}>
                                    Dr. Aasha Koirala
                                </h2>
                                <p className={`transition-all duration-300 ${isHovered ? 'text-blue-100 text-lg mb-4' : 'text-gray-600 text-base mb-4'
                                    }`}>
                                    Therapist
                                </p>
                            </div>
                        </div>

                        {/* Expanded Content - Only visible on hover */}
                        <div
                            className={`transition-all duration-500 ease-out ${isHovered
                                ? 'opacity-100 translate-y-0 max-h-96'
                                : 'opacity-0 translate-y-8 max-h-0 overflow-hidden'
                                }`}
                        >
                            <p className="text-center text-blue-100 mb-6 animate-slide-up">
                                Mental wellness specialist with 8+ years of experience.
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-center mb-2">
                            <Star className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-yellow-300'
                                } fill-current`} />
                            <span className={`ml-2 font-semibold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-900'
                                }`}>
                                4.9 (142)
                            </span>
                        </div>

                        {/* Expanded Content - Coins and Actions */}
                        <div
                            className={`transition-all duration-500 delay-100 ease-out ${isHovered
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8 pointer-events-none'
                                }`}
                        >
                            {/* Coins Badge */}
                            <div className="flex justify-center mb-2">
                                <div className="bg-blue-800 text-white px-6 py-2 rounded-sm font-semibold animate-slide-up">
                                    300 Coins
                                </div>
                            </div>

                            {/* Action Icons */}
                            <div className="flex justify-center space-x-8">
                                <button className="p-3 rounded-full bg-transparent hover:bg-transparent transition-colors duration-200 animate-slide-up">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </button>
                                <button className="p-3 rounded-full bg-transparent hover:bg-transparent transition-colors duration-200 animate-slide-up">
                                    <Mic className="w-6 h-6 text-white" />
                                </button>
                                <button className="p-3 rounded-full bg-transparent hover:bg-transparent transition-colors duration-200 animate-slide-up">
                                    <Video className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Book Button - Always visible */}
                    </div>
                    <div className="p-1">
                        <button
                            className="w-full font-semibold rounded-sm transition-all duration-200 bg-blue-800 text-white flex items-center justify-center gap-1 px-4 py-2"
                        >
                            <span>Book Therapist</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileCard;