import { memo, useRef } from 'react';
import { useIsOverflow } from '~/hooks/useIsOverflow';
import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Else, If, Then } from 'react-if';

function ProductDescription() {
    const disclosure = useDisclosureState();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isOverflow = useIsOverflow<HTMLElement>(containerRef);

    const [parent] = useAutoAnimate<HTMLParagraphElement>();

    return (
        <div
            className={`relative ${
                disclosure.open ? 'h-fit py-4' : 'h-[200px]'
            }`}
            ref={containerRef}
        >
            <p className="lg:w-4/5" ref={parent}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                fugit repellendus, quidem ab quos voluptatibus optio aut maiores
                provident magnam. Velit vel nemo est vitae nesciunt et dolor
                praesentium sint! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Atque fugit repellendus, quidem ab quos
                voluptatibus optio aut maiores provident magnam. Velit vel nemo
                est vitae nesciunt et dolor praesentium sint! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Atque fugit repellendus,
                quidem ab quos voluptatibus optio aut maiores provident magnam.
                Velit vel nemo est vitae nesciunt et dolor praesentium sint!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                fugit repellendus, quidem ab quos voluptatibus optio aut maiores
                provident magnam. Velit vel nemo est vitae nesciunt et dolor
                praesentium sint! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Atque fugit repellendus, quidem ab quos
                voluptatibus optio aut maiores provident magnam. Velit vel nemo
                est vitae nesciunt et dolor praesentium sint! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Atque fugit repellendus,
                quidem ab quos voluptatibus optio aut maiores provident magnam.
                Velit vel nemo est vitae nesciunt et dolor praesentium sint!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                fugit repellendus, quidem ab quos voluptatibus optio aut maiores
                provident magnam. Velit vel nemo est vitae nesciunt et dolor
                praesentium sint! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Atque fugit repellendus, quidem ab quos
                voluptatibus optio aut maiores provident magnam. Velit vel nemo
                est vitae nesciunt et dolor praesentium sint!
            </p>

            <If condition={isOverflow}>
                <Then>
                    <Disclosure
                        state={disclosure}
                        className="absolute-center absolute -bottom-8 left-1/2 w-full -translate-x-1/2 space-x-2 bg-gradient-to-b from-[#ffffff00] to-[#ffffff] py-4"
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
