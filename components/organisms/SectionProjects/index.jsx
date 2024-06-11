import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
    return (
        <section id="skills">
            <div className=" px-16 py-20 dark:text-text-white tracking-widest">
                <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
                    Projects
                </h2>
                <div className="flex justify-evenly mt-16">
                    {[1, 2, 3].map((index) => (
                        <ProjectCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
