import 'atropos/css';
import 'react-medium-image-zoom/dist/styles.css';

import Atropos from 'atropos/react';
import useEmblaCarousel from 'embla-carousel-react';
import { memo, useCallback, useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { If, Then, Else } from 'react-if';

interface ProductSlidesProps {
    images: string[];
}

function ProductSlides({ images }: ProductSlidesProps) {
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
                className="absolute-center h-3/4 min-h-[380px] w-full overflow-hidden py-2"
                ref={mainViewportRef}
            >
                <div className="full-size flex select-none">
                    <If condition={images && images?.length}>
                        <Then>
                            {images?.map((img, index) => {
                                return (
                                    <figure
                                        key={img + index}
                                        className="absolute-center relative h-full min-w-full overflow-hidden rounded-2xl"
                                    >
                                        <Zoom>
                                            <Atropos
                                                shadow={false}
                                                className="absolute-center smooth-effect h-fit w-full rounded-2xl hover:scale-[90%] hover:cursor-grab"
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={img}
                                                    className="h-full max-h-[350px] w-auto rounded-2xl object-contain"
                                                    alt="product-image"
                                                />
                                            </Atropos>
                                        </Zoom>
                                    </figure>
                                );
                            })}
                        </Then>

                        <Else>
                            {Array.from(new Array(1).keys()).map((idx) => {
                                return (
                                    <figure
                                        key={idx}
                                        className="tailwind-pulse-effect aspect-w-3 aspect-h-5 bg-gray-300"
                                    ></figure>
                                );
                            })}
                        </Else>
                    </If>
                </div>
            </div>

            <div className="relative flex-1 overflow-hidden px-4">
                <div
                    className="full-size overflow-hidden"
                    ref={thumbViewportRef}
                >
                    <div className="full-size flex select-none space-x-4 hover:cursor-pointer">
                        <If condition={images && images?.length}>
                            <Then>
                                {images?.map((img, index) => {
                                    return (
                                        <figure
                                            key={img}
                                            onClick={() => onThumbClick(index)}
                                            className="flex h-full min-w-[20%] items-center"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img}
                                                className="h-auto max-h-[140px] w-auto rounded-2xl object-contain"
                                                alt="product-image"
                                            />
                                        </figure>
                                    );
                                })}
                            </Then>

                            <Else>
                                {Array.from(new Array(5).keys()).map((idx) => {
                                    return (
                                        <figure
                                            key={idx}
                                            className="tailwind-pulse-effect h-full min-w-[20%] rounded-2xl bg-gray-300"
                                        ></figure>
                                    );
                                })}
                            </Else>
                        </If>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default memo(ProductSlides);
