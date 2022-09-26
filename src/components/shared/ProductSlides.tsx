import 'atropos/css';
import 'react-medium-image-zoom/dist/styles.css';

import Atropos from 'atropos/react';
import useEmblaCarousel from 'embla-carousel-react';
import { memo, useCallback, useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';

const slides = [
    'https://salt.tikicdn.com/cache/750x750/ts/review/95/09/96/6d7660a404a6209a431d1ac99ae9d0ff.jpg.webp',
    'https://salt.tikicdn.com/cache/750x750/ts/product/6a/4a/d3/696c5f6aa4810d0ed3cb8b354010c60f.jpg.webp',
    'https://salt.tikicdn.com/cache/750x750/ts/product/89/a2/42/a8687c880f35b82fc2164eb4cbb8dc58.jpg.webp',
    'https://salt.tikicdn.com/cache/750x750/ts/product/93/5e/3e/4dad40ab5ac13305f59960335d5b637c.jpg.webp',
    'https://salt.tikicdn.com/cache/750x750/ts/review/57/75/4d/f1412b19cbc0dcba3dfa3f9cce0b9421.jpg.webp',
];

function ProductSlides() {
    const [_, setSelectedIndex] = useState(0);
    const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });

    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!embla || !emblaThumbs) return;
            if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
        },
        [embla, emblaThumbs],
    );

    const onSelect = useCallback(() => {
        if (!embla || !emblaThumbs) return;
        setSelectedIndex(embla.selectedScrollSnap());
        emblaThumbs.scrollTo(embla.selectedScrollSnap());
    }, [embla, emblaThumbs, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();
        embla.on('select', onSelect);
    }, [embla, onSelect]);

    return (
        <aside className="flex h-3/4 w-full flex-col border-b-[2px] border-dashed border-gray-700 py-2 md:h-full md:w-[30%] md:border-b-0 md:border-r-[2px]">
            <div
                className="h-3/4 w-full overflow-hidden py-2"
                ref={mainViewportRef}
            >
                <div className="full-size flex select-none">
                    {slides.map((slide, index) => {
                        return (
                            <figure
                                key={index}
                                className="absolute-center relative h-full min-w-full overflow-hidden rounded-2xl"
                            >
                                <Zoom>
                                    <Atropos
                                        shadow={false}
                                        className="absolute-center smooth-effect h-fit w-full rounded-2xl hover:scale-[90%] hover:cursor-grab"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={slide}
                                            className="h-full max-h-[350px] w-auto rounded-2xl object-contain"
                                            alt="product-image"
                                        />
                                    </Atropos>
                                </Zoom>
                            </figure>
                        );
                    })}
                </div>
            </div>

            <div className="relative flex-1">
                <div
                    className="full-size overflow-hidden"
                    ref={thumbViewportRef}
                >
                    <div className="full-size flex select-none space-x-4 hover:cursor-pointer">
                        {slides.map((slide, index) => {
                            return (
                                <figure
                                    key={slide}
                                    onClick={() => onThumbClick(index)}
                                    className="flex h-full min-w-[20%] items-center"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={slide}
                                        className="h-auto max-h-full w-auto rounded-2xl object-contain"
                                        alt="product-image"
                                    />
                                </figure>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default memo(ProductSlides);
