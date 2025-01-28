'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import desktopHero from '@/assets/main/hero_desktop.webp';
import mobileHero from '@/assets/main/hero_mobile.webp';
import tabletHero from '@/assets/main/hero_tablet.webp';

const HeroImage = () => {
    const [heroImage, setHeroImage] = useState(desktopHero.src); // By default desktop

    useEffect(() => {
        const getHeroImage = () => {
            const width = window.innerWidth;
            if (width < 480) return mobileHero.src;
            if (width < 768) return tabletHero.src;
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
            width={1280}
            height={720}
            style={{
                borderRadius: '20px',
                objectFit: 'cover',
            }}
        />
    );
};

export default HeroImage;
