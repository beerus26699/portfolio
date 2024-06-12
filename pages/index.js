import { Inter } from 'next/font/google';
import HeroSection from '@/components/organisms/SectionHero';
import AboutSection from '@/components/organisms/SectionAbout';
import SkillsSection from '@/components/organisms/SectionSkills';
import EmailSection from '@/components/organisms/SectionEmail';
import ProjectsSection from '@/components/organisms/SectionProjects';
import ExperienceSection from '@/components/organisms/SectionExperience';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main>
            {/* <Navbar /> */}
            <div className="container mt-24 mx-auto px-12 py-4">
                <HeroSection />
                {/* <AchievementsSection /> */}
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ExperienceSection />
                <EmailSection />
            </div>
            {/* <Footer /> */}
        </main>
    );
}
