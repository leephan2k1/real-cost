import { SearchResult } from 'types';
import { memo } from 'react';
import { Else, If, Then } from 'react-if';
import ProductCard from './ProductCard';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { VscLoading } from 'react-icons/vsc';

interface ProductListProps {
    items: SearchResult[];
}

function ProductList({ items }: ProductListProps) {
    const [parent] = useAutoAnimate<HTMLDivElement>();

    return (
        <If condition={items && items.length}>
            <Then>
                <div
                    ref={parent}
                    className="flex w-full flex-wrap items-center gap-y-6 gap-x-4"
                >
                    {items.map((item) => {
                        return (
                            <ProductCard
                                img={item.img}
                                link={item.link}
                                market={item?.market}
                                name={item.name}
                                price={item.price}
                                totalSales={item.totalSales}
                                key={item.link}
                            />
                        );
                    })}
                </div>

                <div className="absolute-center my-10 w-full space-x-4">
                    <VscLoading className="h-10 w-10 animate-spin text-gray-700 md:h-12 md:w-12" />
                    <span>Đang tải thêm</span>
                </div>
            </Then>

            <Else>
                <div className="absolute-center w-full flex-col">
                    <FaceFrownIcon className="h-10 w-10" />
                    <h2 className="uppercase">
                        Rất tiếc! Hãy thử tìm kiếm lại
                    </h2>
                </div>
            </Else>
        </If>
    );
}

export default memo(ProductList);
