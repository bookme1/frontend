import { KeyboardEvent, MouseEvent, RefObject, TouchEvent } from "react";

interface SharedRangeSliderProps {
  min: number;
  max: number;
  width?: number;
  withLabel?: boolean;
}

export interface RangeSliderProps extends SharedRangeSliderProps {
  currentValue: number;
  isDragging: boolean;
  onMouseDown: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  sliderRef: RefObject<HTMLDivElement>;
}

export interface RangeSliderContainerProps extends SharedRangeSliderProps {
  initialValue: number;
  onChange: (currentValue: number) => void;
  step?: number;
}