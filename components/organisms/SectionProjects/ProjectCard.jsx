import clsx from 'clsx';
import React from 'react';

const ProjectCard = ({ project }) => {
    const transitionHover =
        'transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 shadow-2xl';
    return (
        <div
            className={clsx(
                'p-4 cursor-pointer bg-[rgb(109,109,109)] shadow-2xl',
                transitionHover
            )}
        >
            <img src={project.image} className="h-48" />
            <div className="text-center">
                <p className="bg-gray-300 tracking-normal inline-block px-4 rounded-b-md">
                    {project.year}
                </p>
                <p className="mt-4">{project.name}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
