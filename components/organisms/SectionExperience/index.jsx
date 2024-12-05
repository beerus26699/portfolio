import React from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ExperienceTags from './ExperienceTags';
import SchoolIcon from '@/components/atoms/Icons/SchoolIcon';
import LaravelIcon from '@/components/atoms/Icons/LaravelIcon';
import NextjsIcon from '@/components/atoms/Icons/NextjsIcon';

const ExperienceSection = () => {
    return (
        <section className="bg-brown-b200 dark:bg-dark-d200 px-0 sm:px-16 py-20 tracking-widest">
            <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
                Experience
            </h2>
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work "
                    contentStyle={{ background: '#ddd', color: '#fff' }}
                    date="2017 - 2022"
                    iconClassName="bg-from"
                    icon={<SchoolIcon className="text-white" />}
                >
                    <h3 className="vertical-timeline-element-title text-xl font-bold text-black">
                        Hanoi University of Science and Technology
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle text-black">
                        Software Engineer
                    </h4>
                    <p className='text-black'>Graduated with Engineer Degree. CPA: 3.0</p>
                    <ExperienceTags
                        tags={[
                            'Javsscript',
                            'Docker',
                            'Python',
                            'IOT',
                            'Blockchain',
                        ]}
                    />
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="3/2020 - 9/2020"
                    contentStyle={{ background: '#ddd', color: '#fff' }}
                    iconClassName="bg-from"
                    icon={<LaravelIcon className="text-white" />}
                >
                    <h3 className="vertical-timeline-element-title text-xl font-bold text-black">
                        STI Vietnam
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle text-black">
                        Intern web developer
                    </h4>
                    <p className='text-black'>
                        Web developer using Laravel framework. Build CMS website
                        for company 's production
                    </p>
                    <ExperienceTags tags={['Laravel', 'PHP', 'Jquery']} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="6/2021 - now"
                    contentStyle={{ background: '#ddd', color: '#fff' }}
                    iconClassName="bg-from"
                    icon={<NextjsIcon className="text-white" />}
                >
                    <h3 className="vertical-timeline-element-title text-xl font-bold text-black">
                        DLS company
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle text-black">
                        Fullstack web developer
                    </h4>
                    <p className='text-black'>
                        Develop website - product for company. Do task about
                        both backend and frontend.
                    </p>
                    <ExperienceTags
                        tags={['NestJS', 'NextJs', 'Tailwind CSS', 'PHP']}
                    />
                </VerticalTimelineElement>
            </VerticalTimeline>
        </section>
    );
};

export default ExperienceSection;
