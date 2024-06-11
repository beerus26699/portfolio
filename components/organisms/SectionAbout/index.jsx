'use client';
import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import CodeIcon from '@/components/atoms/Icons/CodeIcon';
import NodejsIcon from '@/components/atoms/Icons/NodejsIcon';
import NextjsIcon from '@/components/atoms/Icons/NextjsIcon';
import ReactjsIcon from '@/components/atoms/Icons/ReactjsIcon';

const TAB_DATA = [
    {
        title: 'Languages',
        id: 'languages',
        content: (
            <ul className="list-disc pl-2">
                <li>Vietnamese</li>
                <li>English</li>
            </ul>
        ),
    },
    {
        title: 'Education',
        id: 'education',
        content: (
            <ul className="list-disc pl-2">
                <li>Hanoi University of Science and Technology</li>
            </ul>
        ),
    },
    //   {
    //     title: "Certifications",
    //     id: "certifications",
    //     content: (
    //       <ul className="list-disc pl-2">
    //         <li>AWS Cloud Practitioner</li>
    //         <li>Google Professional Cloud Developer</li>
    //       </ul>
    //     ),
    //   },
];

const AboutSection = () => {
    const [tab, setTab] = useState('languages');
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section className="text-white" id="about">
            <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
                <div
                    className="shadow-xl p-4 max-w-fit mx-auto bg-[rgb(109,109,109)]"
                    style={{ boxShadow: '0 4px 6px rgb(0 0 0 / 30%)' }}
                >
                    <div className="border-b p-2 pt-0 flex justify-start gap-3 border-[rgb(73,73,73)] mb-2">
                        <div
                            className="rounded-full"
                            style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: 'rgb(237, 76, 92)',
                            }}
                        ></div>
                        <div
                            className="rounded-full"
                            style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: 'rgb(253, 203, 88)',
                            }}
                        ></div>
                        <div
                            className="rounded-full"
                            style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: 'rgb(120, 177, 89)',
                            }}
                        ></div>
                    </div>
                    <img src="/images/avatar2.jpg" className="h-[400px]" />
                    <div className="p-4 pb-1 flex justify-center gap-3">
                        {/* <FaReact className='w-12 h-auto text-blue-b400'/> */}
                        {/* <FaNodeJs className='w-12 h-auto text-green-g500'/> */}
                        {/* <FaLaravel className='w-12 h-auto text-red'/> */}
                        {/* <span className="text-5xl">⭐⭐⭐</span> */}
                        {/* <CodeIcon className='w-12 h-12' /> */}
                        <NodejsIcon className='w-12 h-12 text-[#6cc24a]' />
                        <ReactjsIcon className='w-12 h-12 text-[#61DBFB]' />
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full text-gray-n600">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        ✅ About Me
                    </h2>
                    <p className="text-base lg:text-lg font-trebuchet">
                        I am a full-stack web developer with a passion for
                        creating interactive and responsive web applications. I
                        have experience working with Typescript, React, NextJS,
                        Node.js, PostgreSQL, Sequelize, and Git .... I am a
                        quick learner and I am always looking to expand my
                        knowledge and skills set. I'm excited to work with
                        others to create amazing applications.
                    </p>
                    <div className="flex flex-row justify-start mt-8">
                        <TabButton
                            selectTab={() => handleTabChange('languages')}
                            active={tab === 'languages'}
                        >
                            {' '}
                            Languages{' '}
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange('education')}
                            active={tab === 'education'}
                        >
                            {' '}
                            Education{' '}
                        </TabButton>
                        {/* <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton> */}
                    </div>
                    <div className="mt-8">
                        {TAB_DATA.find((t) => t.id === tab).content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
