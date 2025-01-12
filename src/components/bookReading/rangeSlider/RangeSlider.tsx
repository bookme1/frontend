import { Slider } from "./RangeSlider.styles";
import { RangeSliderProps } from "./RangeSlider.types";


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
		<Slider
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
			className="range-slider"
		>
			<div
				className="range-slider-bar"
				style={{
					width: `${((currentValue - min) / (max - min)) * 100}%`,
				}}
			>
				<span className="range-slider-handle" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
					<span className={`range-slider-label ${!withLabel && 'sr-only'}`}>{currentValue}</span>
				</span>
			</div>
		</Slider>
	);
};

export default RangeSlider;
