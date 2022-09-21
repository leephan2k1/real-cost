import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { memo, useRef } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { Else, If, Then } from 'react-if';
import { useOnClickOutside } from 'usehooks-ts';
import searchMarket from '~/atoms/marketSearch';
import searchResult from '~/atoms/searchResult';
import { mapping_market_colors, SEARCH_PATH } from '~/constants';
import mobileSearchState from '~/atoms/mobileSearchState';
import { useSetAtom } from 'jotai';

import {
    ArrowTrendingUpIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface SearchResultsProps {
    styles?: string;
    isMobile?: boolean;
}

function SearchResults({ styles, isMobile }: SearchResultsProps) {
    const router = useRouter();
    const market = useAtomValue(searchMarket);
    const ref = useRef<HTMLDivElement | null>(null);
    const [result, setResult] = useAtom(searchResult);
    const setModalSearch = useSetAtom(mobileSearchState);

    useOnClickOutside(ref, () => {
        if (!isMobile) {
            setResult({
                items: [],
                isFetching: false,
            });
        }
    });

    const handleGoToSearchPage = () => {
        setModalSearch(false);

        setResult({
            items: [],
            isFetching: false,
        });

        router.push(
            `/${SEARCH_PATH}?market=${market}&keyword=${encodeURIComponent(
                String(
                    document
                        .querySelector('#real-cost-search')
                        ?.getAttribute('value'),
                ),
            )}`,
        );
    };

    return (
        <div
            ref={ref}
            className={`${
                result.isFetching ? 'md:flex' : 'hidden'
            } ${styles} smooth-effect z-[100] flex-col overflow-hidden rounded-xl border-[1px] border-gray-500`}
        >
            <ul className="flex w-full flex-col space-y-4 overflow-x-hidden overflow-y-scroll py-4">
                <If condition={result.items && result.items?.length}>
                    <Then>
                        {result.items.map((item) => {
                            return (
                                <li
                                    key={String(item?.link)}
                                    className="absolute-center space-x-2xl flex h-[80px] w-full lg:h-[100px]"
                                >
                                    <figure className="relative h-full min-w-[20%] overflow-hidden rounded-xl p-2 lg:min-w-[15%]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            alt="search-item"
                                            className="full-size rounded-xl object-contain object-center"
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
                    </Then>

                    <Else>
                        <div className="full-size absolute-center">
                            <VscLoading className="h-8 w-8 animate-spin text-gray-700" />
                        </div>
                    </Else>
                </If>

                <button
                    onClick={handleGoToSearchPage}
                    className="absolute-center smooth-effect mx-auto w-1/2 rounded-lg bg-[#f0edf4] p-4 hover:bg-gray-200"
                >
                    <span className="text-2xl">Xem thêm</span>
                    <ChevronRightIcon className="h-9 w-9" />
                </button>
            </ul>
        </div>
    );
}

export default memo(SearchResults);
