import { memo, ReactNode, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { ArrowUpIcon } from '@heroicons/react/24/outline';

interface ScrollTopProps {
    children: ReactNode;
}

function ScrollTop({ children }: ScrollTopProps) {
    const lastScrollTop = useRef(0);
    const [isScrollUp, setIsScrollUp] = useState(false);

    useEventListener('scroll', () => {
        const st = window.pageYOffset;

        if (st > lastScrollTop.current) {
            setIsScrollUp(false);
        } else {
            setIsScrollUp(true);
        }
        lastScrollTop.current = st;
    });

    return (
        <>
            {children}

            {isScrollUp && (
                <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="animate__fadeInUp animate__animated animate__faster smooth-effect fixed bottom-10 right-6 z-[100] rounded-full border-[1px] border-gray-700 bg-blue-400 p-4 hover:bg-blue-400/50"
                >
                    <div className="absolute-screen-center absolute h-[130%] w-[130%] rounded-full border-[2px] border-dashed border-gray-400"></div>
                    <ArrowUpIcon className="h-8 w-8 text-white md:h-6 md:w-6" />
                </button>
            )}
        </>
    );
}

export default memo(ScrollTop);
