import { memo, useEffect, useRef, useState } from 'react';
import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Else, If, Then } from 'react-if';

interface ProductDescriptionProps {
    description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
    const disclosure = useDisclosureState();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const [parent] = useAutoAnimate<HTMLParagraphElement>();

    useEffect(() => {
        parent.current && setIsOverflow(parent.current?.clientHeight > 200);
    }, [description]);

    return (
        <div
            className={`relative w-full lg:max-w-[70vw] ${
                disclosure.open ? 'h-fit py-4' : 'h-[200px]'
            }`}
            ref={containerRef}
        >
            <article
                className="prose-xl prose min-w-full overflow-x-hidden prose-img:max-w-[60vw] prose-img:rounded-2xl lg:prose-2xl"
                ref={parent}
                dangerouslySetInnerHTML={{ __html: description }}
            ></article>

            <If condition={isOverflow}>
                <Then>
                    <Disclosure
                        state={disclosure}
                        className="absolute-center min-w-screen absolute -bottom-8 left-1/2 w-full -translate-x-1/2 space-x-2 bg-gradient-to-b from-[#ffffff00] to-[#ffffff] py-4"
                    >
                        <span>{disclosure.open ? 'Thu gọn' : 'Xem thêm'}</span>

                        <If condition={disclosure.open}>
                            <Then>
                                <ChevronUpIcon className="animate__rotateIn animate__animated animate__faster h-8 w-8" />
                            </Then>

                            <Else>
                                <ChevronDownIcon className="animate__rotateIn animate__animated animate__faster h-8 w-8" />
                            </Else>
                        </If>
                    </Disclosure>
                </Then>
            </If>
        </div>
    );
}

export default memo(ProductDescription);
