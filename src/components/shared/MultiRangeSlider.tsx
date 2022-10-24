/*
 This file is taken from here: https://codesandbox.io/s/b9l0g?file=/src/multiRangeSlider/MultiRangeSlider.tsx
 https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1
*/

import {
    ChangeEvent,
    FC,
    memo,
    useCallback,
    useEffect,
    useState,
    useRef,
} from 'react';
import classnames from 'classnames';

interface MultiRangeSliderProps {
    items: number[];
    min: number;
    max: number;
    onChange: (values: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
    items,
    min,
    max,
    onChange,
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max],
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal]);

    return (
        <div className="my-6" id="multi-range-slider">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                className={classnames(
                    'thumb thumb--zindex-3 w-[80vw] md:w-[450px] lg:w-[350px]',
                    {
                        'thumb--zindex-5': minVal > max - 100,
                    },
                )}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                className="thumb thumb--zindex-4 w-[80vw] md:w-[450px] lg:w-[350px]"
            />

            <div className="relative w-[80vw] md:w-[450px] lg:w-[350px]">
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
                <div className="slider__left-value">{`${
                    new Date(items[minVal]).getMonth() + 1
                }/${new Date(items[minVal]).getFullYear()}`}</div>
                <div className="slider__right-value">{`${
                    new Date(items[maxVal - 1]).getMonth() + 1
                }/${new Date(items[maxVal - 1]).getFullYear()}`}</div>
            </div>
        </div>
    );
};

export default memo(MultiRangeSlider);
