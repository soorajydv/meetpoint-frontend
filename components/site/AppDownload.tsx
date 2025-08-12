import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { AppStoreButton, GooglePlayButton } from "./GooglePlay";

// App Download Section
export const AppDownload: React.FC = () => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsInView(entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className="relative h-[40rem] m-6 flex flex-col items-center justify-center w-full text-black text-center px-4 sm:px-20 overflow-hidden"
        >
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/overlayImage.png')", // your image in public folder
                }}
            ></div>

            {/* Faded Logos */}
            <img
                src="/logo.png"
                alt="Logo 1"
                className="absolute top-4 lg:top-10 left-20 w-50 opacity-5"
            />
            <img
                src="/logo.png"
                alt="Logo 2"
                className="absolute bottom-0 lg:bottom-10 right-50 w-50 opacity-5"
            />

            {/* Content above overlay */}
            <div className="relative z-10 mt-12 lg:mt-0 mb-6 lg:mb-0">
                <h2 className="text-4xl font-semibold text-[#007640]">
                    Even More Handy With
                </h2>
                <h2 className="text-4xl font-semibold mt-1 dark:text-white ">MeetPoint Apps</h2>
                <p className="text-xl mt-0 lg:mt-4 text-[#565657]">Your schedules are always with you</p>

                <div className="flex flex-wrap md:flex-col lg:flex-row w-[70vw] justify-center gap-4 mt-10">
                    <GooglePlayButton />
                    <AppStoreButton />
                </div>
            </div>

            {/* Slanted Animated Mobile Mockup (Appearing from Bottom-Right Corner) */}
            <motion.img
                src="/phone-mockup.png"
                alt="Mobile App Preview"
                className="absolute right-[-10%] bottom-[-10%] w-34 sm:w-30 lg:w-72"
                initial={{ x: "100%", opacity: 0, rotate: -30 }}
                animate={isInView ? { x: "0%", opacity: 1, rotate: -15 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "bottom right" }}
            />
        </div>
    );
};
