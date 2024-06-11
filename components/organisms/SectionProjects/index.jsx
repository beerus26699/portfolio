import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
        name: 'Gossby',
        image: 'https://i.pinimg.com/736x/62/9a/f0/629af00fd412d9b9f5189b81460281ae.jpg',
        year: 2024,
        description: 'Design your own personalized gifts'
    },
    {
        name: 'Ăn Dặm 88',
        image: 'https://andam88.com/andam88_logo.jpeg',
        year: 2023,
        description: 'Affiliate Marketing Online'
    },
    {
        name: 'VDone',
        image: 'https://play-lh.googleusercontent.com/-iCwAP5Z6I8RUeTEVMsE31J0vYVlcAnD2pDPzklY84U2lQi8oic9hGtj9F742eRHcM8=w240-h480-rw',
        year: 2022,
        description: 'Technology platform for livestream, chat, participating in communities'
    }
];

const ProjectsSection = () => {
    return (
        <section id="skills">
            <div className=" px-16 py-20 tracking-widest">
                <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
                    Projects
                </h2>
                <div className="flex justify-evenly mt-16">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project}/>
                    ))}
                </div>
                <div className='text-center mt-10'>More ...</div>
            </div>
        </section>
    );
};

export default ProjectsSection;
