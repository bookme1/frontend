import Image from 'next/image';

import desktopHero from '@/assets/main/hero_desktop.webp';

const HeroImage = () => {
    return (
        <Image
            src={desktopHero}
            alt="Hero"
            fill
            priority
            sizes="(max-width: 767px) 375px, 
                   (max-width: 1279px) 768px, 
                   1280px"
            style={{
                borderRadius: '20px',
                objectFit: 'cover',
            }}
        />
    );
};

export default HeroImage;
