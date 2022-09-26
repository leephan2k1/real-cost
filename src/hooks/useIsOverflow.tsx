import { useLayoutEffect, useState, MutableRefObject } from 'react';

//ref solution: https://www.robinwieruch.de/react-custom-hook-check-if-overflow
export function useIsOverflow<T extends HTMLElement>(
    ref: MutableRefObject<T | null>,
    callback?: (value?: boolean) => void,
) {
    const [isOverflow, setIsOverflow] = useState<boolean | undefined>(
        undefined,
    );

    useLayoutEffect(() => {
        const { current } = ref;

        if (!current) return;

        const trigger = () => {
            const hasOverflow = current.scrollHeight > current.clientHeight;

            setIsOverflow(hasOverflow);

            if (callback) callback(hasOverflow);
        };

        if (current) {
            trigger();
        }
    }, [callback, ref]);

    return isOverflow;
}
