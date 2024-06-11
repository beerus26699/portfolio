import clsx from 'clsx';
import React from 'react'

const ProjectCard = () => {
    const transitionHover = 'transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 shadow-2xl';
    return (
        <div className={clsx("p-4 cursor-pointer bg-[rgb(109,109,109)] shadow-2xl", transitionHover)}>
            <img src="images/project.jpeg" className="h-48"/>
            <div className="text-center">
                <p className="bg-gray-300 tracking-normal inline-block px-4 rounded-b-md">2021</p>
                <p className="mt-4">Girl with picture</p>
            </div>
        </div>
    )
}

export default ProjectCard
