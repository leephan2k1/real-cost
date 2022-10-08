import { memo, useState, useEffect, useCallback, ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import EmblaCarouselButtons from './EmblaCarouselButtons';
// import { SearchResult } from 'types';
// import { If, Then } from 'react-if';
//import ProductCard from '~/components/shared/ProductCard';
interface SlidesProps {
    children: ReactNode;
}

function Slides({ children }: SlidesProps) {
    const [viewportRef, embla] = useEmblaCarousel({
        slidesToScroll: 1,
        skipSnaps: false,
        containScroll: 'trimSnaps',
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
            {/* <If condition={items && items.length}>
                <Then> */}
            <div className="full-size overflow-hidden" ref={viewportRef}>
                <div className="full-size flex select-none space-x-4">
                    {children}
                </div>
            </div>
            {/* </Then>
            </If> */}
        </div>
    );
}

export default memo(Slides);
