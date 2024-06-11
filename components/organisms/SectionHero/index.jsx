'use client';
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="lg:py-16 h-[70vh]">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
                >
                    <div className="mb-4 lg:leading-normal font-extrabold">
                        <span className="text-4xl sm:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-from to-to">
                            Hello, I&apos;m Hai
                        </span>
                        <br></br>
                        <br></br>
                        <br></br>
                        <span className="text-white text-2xl sm:text-3xl lg:text-5xl ">
                            <TypeAnimation
                                sequence={[
                                    'Fullstack Web Developer',
                                    2000,
                                    'Solution Technology',
                                    2000,
                                    'Website Designer',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                    </div>
                    <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl font-trebuchet">
                        Hi,👋 I'm Nguyen Van Hai. Fictional person for preview
                        purposes :) I'm working like a full-stack developer,
                        desiging a website. Feel free to contact me. ⭐💜
                    </p>
                    <div>
                        <Link
                            href="#contact"
                            className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-from to-to  text-white"
                        >
                            Contact me
                        </Link>
                        <Link
                            href="/"
                            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-from to-to hover:bg-pink text-white mt-3"
                        >
                            <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                                Download CV
                            </span>
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-4 place-self-center mt-4 lg:mt-0"
                >
                    <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                        <Image
                            src="/images/hero-image2.png"
                            alt="hero image"
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            width={300}
                            height={300}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
