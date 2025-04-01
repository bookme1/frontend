import React from 'react';

import Image from 'next/image';

import styles from './Statistic.module.css';

import plantingMarks from '../../../assets/mission/planting-marks-png.png';
import plantingRate from '../../../assets/mission/planting-rate.webp';
import sectionNTree from '../../../assets/mission/section-N-tree.webp';

const Statistic = () => {
    return (
        <section className={styles.statisticSection} id="statistic">
            <Image
                src={sectionNTree}
                alt="sectionNTree"
                width={466}
                height={456}
                className={styles.sectionNTree}
            />
            <Image
                src={plantingMarks}
                alt="plantingMarks"
                width={174}
                height={197}
                className={styles.plantingMarks}
            />
            <Image
                src={plantingRate}
                alt="plantingRate"
                width={242}
                height={307}
                className={styles.plantingRate}
            />
        </section>
    );
};

export default Statistic;
