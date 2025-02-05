'use client';

import About from '../Mission/About/About';
import Gallery from '../Mission/Gallery/Gallery';
import GreenCountry from '../Mission/GreenCountry/GreenCountry';
import Hero from '../Mission/Hero/Hero';
import Navigation from '../Mission/Navigation/Navigation';
import Seedlings from '../Mission/Seedlings/Seedlings';
import Statistic from '../Mission/Statistic/Statistic';

interface MissionProps {}

const Mission: React.FC<MissionProps> = () => {
    return (
        <div className={`wrapper`}>
            <Navigation />
            <Hero />
            <About />
            <GreenCountry />
            <Statistic />
            <Seedlings />
            <Gallery />
        </div>
    );
};

export default Mission;
