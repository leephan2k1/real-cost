import { useAtom } from 'jotai';
import Image from 'next/image';
import { memo, useRef } from 'react';
import { Market } from 'types';
import { useOnClickOutside } from 'usehooks-ts';
import searchResult from '~/atoms/searchResult';

import {
    ArrowTrendingUpIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

function SearchResults() {
    const [result, setResult] = useAtom(searchResult);
    const ref = useRef<HTMLDivElement | null>(null);

    const mapping_market_colors: { [key in Market]: string } = {
        tiki: '#1a94ff',
        lazada: '#0f1470',
        shopee: '#f84a2f',
        all: '#f43f5e',
    };

    useOnClickOutside(ref, () => {
        setResult([]);
    });

    return (
        <div
            ref={ref}
            className={`${
                result.length ? 'md:flex' : 'hidden'
            } smooth-effect absolute top-[105%] hidden h-fit max-h-[400px] w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl`}
        >
            <ul className="flex w-full flex-col space-y-4 overflow-x-hidden overflow-y-scroll py-4">
                {result &&
                    result.length &&
                    result.map((item) => {
                        return (
                            <li
                                key={String(item?.link)}
                                className="absolute-center space-x-2xl flex h-[80px] w-full lg:h-[100px]"
                            >
                                <figure className="relative h-full min-w-[20%] overflow-hidden rounded-xl p-2 lg:min-w-[15%]">
                                    <Image
                                        priority
                                        alt="search-item"
                                        className="absolute left-0 top-0 border-2 object-contain object-center"
                                        layout="fill"
                                        src={item?.img}
                                    />
                                </figure>

                                <div className="flex h-full w-[85%] flex-col justify-evenly rounded-2xl py-2 px-6">
                                    <h2 className="font-secondary text-2xl text-gray-700 line-clamp-1 lg:text-3xl">
                                        {item?.name}
                                    </h2>
                                    <h3 className="text-lg lg:text-xl">
                                        Giá:{' '}
                                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-bold text-transparent">
                                            {item?.price}
                                        </span>
                                    </h3>
                                    <h4 className="text-lg lg:text-xl">
                                        Sàn:{' '}
                                        <span
                                            style={{
                                                color: mapping_market_colors[
                                                    item?.market
                                                ],
                                            }}
                                        >
                                            {item?.market}
                                        </span>
                                    </h4>
                                    <h5 className="flex space-x-2 text-lg lg:text-xl">
                                        <ArrowTrendingUpIcon className="h-6 w-6" />{' '}
                                        <span>{item?.totalSales}</span>
                                    </h5>
                                </div>
                            </li>
                        );
                    })}

                <button className="absolute-center smooth-effect mx-auto w-1/2 rounded-lg bg-[#f0edf4] p-4 hover:bg-gray-200">
                    <span className="text-2xl">Xem thêm</span>
                    <ChevronRightIcon className="h-9 w-9" />
                </button>
            </ul>
        </div>
    );
}

export default memo(SearchResults);
