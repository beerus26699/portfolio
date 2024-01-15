"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Languages",
    id: "languages",
    content: (
      <ul className="list-disc pl-2">
        <li>Vietnamese</li>
        <li>English</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
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
  const [tab, setTab] = useState("languages");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/avatar.jpg" width={400} height={400} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full text-gray-n600">
          <h2 className="text-4xl font-bold text-white mb-4">✅ About Me</h2>
          <p className="text-base lg:text-lg font-trebuchet">
            I am a full-stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with Typescript, React, NextJS, Node.js, PostgreSQL,
            Sequelize, and Git .... I am a quick learner and I am always looking
            to expand my knowledge and skills set. I'm excited to work with
            others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("languages")}
              active={tab === "languages"}
            >
              {" "}
              Languages{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
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
