import Link from 'next/link';
import { memo, useState } from 'react';
import { SearchResult } from 'types';
import { mapping_market_colors, PRODUCTS_PATH } from '~/constants';
import { handleSubPathMarket } from '~/utils/stringHandler';

import { BellIcon } from '@heroicons/react/24/outline';

const ProductCard = ({
    img,
    market,
    name,
    price,
    link,
    totalSales,
}: SearchResult) => {
    const [isNotification, setIsNotification] = useState(false);

    const activeNotification = () => {
        setIsNotification((prevState) => !prevState);
    };

    return (
        <Link
            href={`/${PRODUCTS_PATH}/${market}/${handleSubPathMarket(
                market,
                link,
            )}`}
        >
            <a>
                <div className="absolute-center sm:py-3 sm:px-1 lg:p-5">
                    <div className="smooth-effect relative z-10 font-primary hover:-translate-y-1 sm:h-[265px] sm:w-[155px] lg:h-[290px] lg:w-[185px]">
                        <div
                            className="absolute -z-10 rounded-2xl border-2 border-gray-700 sm:top-[6px] sm:left-[0px] sm:h-[265px] sm:w-[155px] lg:top-[6px] lg:left-[6px] lg:h-[290px] lg:w-[185px]"
                            style={{
                                backgroundColor: mapping_market_colors[market],
                            }}
                        ></div>
                        <div className="relative z-20 flex cursor-pointer flex-col rounded-xl border-2 border-black bg-white hover:bg-white sm:h-[265px] sm:w-[155px] lg:h-[290px] lg:w-[185px]">
                            <div className="relative space-y-4 p-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img}
                                    alt="img-item"
                                    className="z-0 h-auto max-h-[150px] w-full rounded-xl"
                                />
                                <div className="absolute right-4 top-0 z-10 flex h-14 w-14 rounded-[50%] border border-black bg-white">
                                    <button
                                        className="absolute-center w-14 select-none"
                                        onClick={activeNotification}
                                    >
                                        <BellIcon
                                            className="w-12 stroke-1"
                                            style={{
                                                fill: isNotification
                                                    ? '#fde047'
                                                    : '#fff',
                                            }}
                                        />
                                    </button>
                                </div>
                                <div className="flex flex-col px-2">
                                    <h2 className="line-clamp-2">{name}</h2>
                                    <h3 className="pt-1 text-2xl font-medium text-red-400 line-clamp-1 md:text-3xl">
                                        {price}
                                    </h3>
                                    <div>
                                        <h4
                                            className="float-left py-2 text-xl"
                                            style={{
                                                color: mapping_market_colors[
                                                    market
                                                ],
                                            }}
                                        >
                                            {market}
                                        </h4>
                                        <h5 className="float-right py-2 text-xl">
                                            {totalSales}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default memo(ProductCard);
