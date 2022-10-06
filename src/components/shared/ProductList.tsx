import { memo } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { Else, If, Then } from 'react-if';
import { SearchResult } from 'types';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

import ProductCard from './ProductCard';

interface ProductListProps {
    items: SearchResult[];
    isFetching?: boolean;
    isReachingEnd?: boolean;
    endMessage?: string;
    emptyArrayMessage?: string;
    isFavoriteProduct?: boolean;
}

function ProductList({
    items,
    isReachingEnd,
    isFetching,
    endMessage,
    emptyArrayMessage,
    isFavoriteProduct,
}: ProductListProps) {
    const [parent] = useAutoAnimate<HTMLDivElement>();

    return (
        <div ref={parent}>
            <If condition={items && items.length}>
                <Then>
                    <div className="smooth-effect flex w-full flex-wrap items-center gap-6">
                        {items.map((item) => {
                            return (
                                <ProductCard
                                    isFavoriteProduct={isFavoriteProduct}
                                    product={item}
                                    key={item.link}
                                />
                            );
                        })}
                    </div>

                    <div className="absolute-center smooth-effect my-10 w-full space-x-4">
                        {isReachingEnd ? (
                            <>
                                <span className="mx-2">
                                    {endMessage
                                        ? endMessage
                                        : '😁 Đã lướt hết rồi, hôm sau quay lại nhé bạn!'}
                                </span>
                            </>
                        ) : (
                            <>
                                {' '}
                                <VscLoading className="h-10 w-10 animate-spin text-gray-700 md:h-12 md:w-12" />
                                <span>Đang tải thêm</span>
                            </>
                        )}
                    </div>
                </Then>

                <Else>
                    <div className="absolute-center smooth-effect w-full flex-col">
                        <If condition={isFetching}>
                            <Then>
                                <VscLoading className="h-10 w-10 animate-spin text-gray-700 md:h-12 md:w-12" />
                                <span>Đang tải</span>
                            </Then>

                            <Else>
                                <If condition={!emptyArrayMessage}>
                                    <Then>
                                        {() => (
                                            <>
                                                <FaceFrownIcon className="h-10 w-10" />
                                                <h2 className="uppercase">
                                                    Rất tiếc! Hãy thử tìm kiếm
                                                    lại
                                                </h2>
                                            </>
                                        )}
                                    </Then>

                                    <Else>
                                        <h2 className="uppercase">
                                            {emptyArrayMessage}
                                        </h2>
                                    </Else>
                                </If>
                            </Else>
                        </If>
                    </div>
                </Else>
            </If>
        </div>
    );
}

export default memo(ProductList);
