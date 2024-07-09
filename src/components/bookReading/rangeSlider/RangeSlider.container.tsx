import {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  KeyboardEvent,
  TouchEvent,
  useCallback,
} from "react";
import { RangeSliderContainerProps } from "./RangeSlider.types";
import RangeSlider from "./RangeSlider";

export const RangeSliderContainer = ({
  min,
  max,
  initialValue,
  onChange,
  width,
  step = 1,
  withLabel = false,
}: RangeSliderContainerProps) => {

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);


  const moveSliderPosition = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const sliderBoundingClientRect =
        sliderRef.current?.getBoundingClientRect();
      
      if (sliderBoundingClientRect) {
        const posX =
          ((event as MouseEvent).clientX ||
            (event as TouchEvent).touches[0].clientX) -
          sliderBoundingClientRect.left;
        const totalWidth = sliderBoundingClientRect.width;
        
        let selectedValue = Math.round((posX / totalWidth) * (max - min) + min);
        selectedValue = Math.max(min, selectedValue);
        selectedValue = Math.min(max, selectedValue);
        
        setCurrentValue(selectedValue);
      }
    },
    [max, min]
  );


  const onMouseUp = useCallback(() => {
    onChange(currentValue);
    setIsDragging(false);
  }, [currentValue, onChange]);
  
  const onMouseMove = useCallback(
    (event: Event) => {
      if (isDragging) {
        moveSliderPosition(event as unknown as MouseEvent);
      }
    },
    [isDragging, moveSliderPosition]
  );
  
  const onMouseDown = (event: MouseEvent) => {
    moveSliderPosition(event);
    setIsDragging(true);
  };
  

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      let selectedValue = currentValue;
      
      if (event.key === "ArrowLeft") {
      selectedValue = Math.max(currentValue - step, min);
    } else if (event.key === "ArrowRight") {
      selectedValue = Math.min(currentValue + step, max);
    }
    
    setCurrentValue(selectedValue);
    onChange(selectedValue);
    }
  };
  

  const onTouchStart = (event: TouchEvent) => {
    setIsDragging(true);
    moveSliderPosition(event);
  };
  
  const onTouchMove = useCallback(
    (event: Event) => {
      moveSliderPosition(event as unknown as TouchEvent);
    },
    [moveSliderPosition]
  );
  
  const onTouchEnd = useCallback(() => {
    onChange(currentValue);
    setIsDragging(false);
  }, [currentValue, onChange]);


  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, {
        passive: true, 
      });
      window.addEventListener("touchend", onTouchEnd);
    }
  
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, onMouseMove, onMouseUp, onTouchEnd, onTouchMove]);

  return (
    <RangeSlider
      min={min}
      max={max}
      width={width}
      withLabel={withLabel}
      currentValue={currentValue}
      isDragging={isDragging}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onKeyDown={onKeyDown}
      sliderRef={sliderRef}
    />
  );

}
