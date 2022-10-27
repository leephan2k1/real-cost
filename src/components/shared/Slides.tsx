import { memo, useState, useEffect, useCallback, ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import EmblaCarouselButtons from './EmblaCarouselButtons';

interface SlidesProps {
    children: ReactNode;
}

function Slides({ children }: SlidesProps) {
    const [viewportRef, embla] = useEmblaCarousel({
        slidesToScroll: 2,
        skipSnaps: false,
        containScroll: 'trimSnaps',
        align: 'start',
        speed: 10,
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect]);

    return (
        <div className="relative my-4 mx-auto w-full">
            <div className="mb-2 ml-1 flex space-x-4">
                <EmblaCarouselButtons
                    direction="left"
                    onClick={scrollPrev}
                    enabled={prevBtnEnabled}
                />
                <EmblaCarouselButtons
                    direction="right"
                    onClick={scrollNext}
                    enabled={nextBtnEnabled}
                />
            </div>

            <div className="full-size overflow-hidden" ref={viewportRef}>
                <div className="full-size flex select-none space-x-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default memo(Slides);
