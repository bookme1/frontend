import styles from './RangeSlider.module.css';
import { RangeSliderProps } from './RangeSlider.types';

const RangeSlider = ({
    min,
    max,
    width,
    withLabel,
    currentValue,
    isDragging,
    onMouseDown,
    onTouchStart,
    onKeyDown,
    sliderRef,
}: RangeSliderProps) => {
    return (
        <div
            ref={sliderRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onKeyDown={onKeyDown}
            style={{
                width: width ? `${width}px` : '100%',
            }}
            className={styles.rangeSlider}
        >
            <div
                className={styles.rangeSliderBar}
                style={{
                    width: `${((currentValue - min) / (max - min)) * 100}%`,
                }}
            >
                <span
                    className={styles.rangeSliderHandle}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <span
                        className={`${styles.rangeSliderLabel} ${!withLabel && styles.srOnly}`}
                    >
                        {currentValue}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default RangeSlider;
