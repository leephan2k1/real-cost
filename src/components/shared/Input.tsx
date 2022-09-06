import { HTMLInputTypeAttribute, memo } from 'react';
import { forwardRef } from 'react';

interface InputProps {
    type: HTMLInputTypeAttribute;
    placeHolder?: string;
    style?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type, style, placeHolder }, ref) => {
        return (
            <input
                placeholder={placeHolder}
                className={style}
                ref={ref}
                type={type}
            />
        );
    },
);

Input.displayName = 'Input';

export default memo(Input);
