'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import desktopHero from '@/assets/main/hero_desktop.webp';
import mobileHero from '@/assets/main/hero_mobile.webp';
import tabletHero from '@/assets/main/hero_tablet.webp';

const HeroImage = () => {
    const [heroImage, setHeroImage] = useState(mobileHero.src); 

    useEffect(() => {
        const getHeroImage = () => {
            const width = window.innerWidth;
            if (width>375 && width < 767) return mobileHero.src;
            if (width > 768 && width < 1280) return tabletHero.src;
            return desktopHero.src;
        };

        // Set image by mounting
        setHeroImage(getHeroImage());

        // Add listener on resize
        const handleResize = () => setHeroImage(getHeroImage());
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Image
            src={heroImage}
            alt="Hero Image"
            loading="eager"
            layout="responsive"
            width={343}
            height={420}
            style={{
                borderRadius: '20px',
                objectFit: 'fill',
            }}
        />
    );
};

export default HeroImage;
