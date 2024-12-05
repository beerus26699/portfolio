import CardSkill from './SkillCard';
import TypescriptIcon from '@/components/atoms/Icons/TypescriptIcon';
import NodejsIcon from '@/components/atoms/Icons/NodejsIcon';
import NestjsIcon from '@/components/atoms/Icons/NestjsIcon';
import PhpIcon from '@/components/atoms/Icons/PhpIcon';
import LaravelIcon from '@/components/atoms/Icons/LaravelIcon';
import NextjsIcon from '@/components/atoms/Icons/NextjsIcon';
import TailwindcssIcon from '@/components/atoms/Icons/TailwindcssIcon';
import MysqlIcon from '@/components/atoms/Icons/MysqlIcon';
import DockerIcon from '@/components/atoms/Icons/DockerIcon';
import KubernetesIcon from '@/components/atoms/Icons/KubernetesIcon';
import RedisIcon from '@/components/atoms/Icons/RedisIcon';
import KafkaIcon from '@/components/atoms/Icons/KafkaIcon';

const SkillsSection = () => {
    const cardSkills = [
        {
            name: 'Typescript',
            color: 'text-[#3178c6]',
            icon: TypescriptIcon,
        },
        {
            name: 'NodeJS',
            color: 'text-[#6cc24a]',
            icon: NodejsIcon,
        },
        {
            name: 'NestJS',
            color: 'text-[#ed2945]',
            icon: NestjsIcon,
        },
        {
            name: 'PHP',
            color: 'text-[#787CB5]',
            icon: PhpIcon,
        },
        {
            name: 'Laravel',
            color: 'text-[#EB4432]',
            icon: LaravelIcon,
        },
        {
            name: 'NextJS',
            color: 'text-[#ffffff]',
            icon: NextjsIcon,
        },
        {
            name: 'Tailwind CSS',
            color: 'text-[#06b6d4]',
            icon: TailwindcssIcon,
        },
        {
            name: 'MySQL',
            color: 'text-[#00758F]',
            icon: MysqlIcon,
        },
        {
            name: 'Docker',
            color: 'text-[#1d63ed]',
            icon: DockerIcon,
        },
        {
            name: 'K8S',
            color: 'text-[#3970e4]',
            icon: KubernetesIcon,
        },
        {
            name: 'Redis',
            color: 'text-[#cf2e2e]',
            icon: RedisIcon,
        },
        {
            name: 'Kafka',
            color: 'text-[#ffffff]',
            icon: KafkaIcon,
        },
    ];

    return (
        <section id="skills">
            <div className="px-0 lg:px-16 py-20 dark:text-text-white tracking-widest">
                <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
                    Skills
                </h2>
                <div
                    className="loop-slider overflow-hidden"
                    style={{
                        '--duration': `30000ms`,
                        '--direction': 'normal',
                    }}
                >
                    <div className="inner">
                        {cardSkills.map((skill, index) => (
                            <CardSkill key={`card_${index}`} skill={skill} />
                        ))}
                        {cardSkills.map((skill, index) => (
                            <CardSkill key={`card1_${index}`} skill={skill} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
