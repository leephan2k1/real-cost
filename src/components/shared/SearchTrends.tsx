import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import Link from 'next/link';
import { unique } from 'radash';
import { memo, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { BcSuggestion } from 'types';
import { SEARCH_PATH } from '~/constants';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface SearchTrendsProps {
    suggestion_list: BcSuggestion[];
}

function SearchTrends({ suggestion_list }: SearchTrendsProps) {
    const LIMIT_RENDER = 10;

    const [trendingList, setTrendingList] = useState(() =>
        suggestion_list.slice(0, LIMIT_RENDER),
    );

    const [parent] = useAutoAnimate<HTMLUListElement>();
    const disclosure = useDisclosureState();

    useEffect(() => {
        if (disclosure.open) {
            setTrendingList((prevState) =>
                unique(
                    prevState.concat(suggestion_list.slice(LIMIT_RENDER)),
                    (item) => item.slug,
                ),
            );
        } else {
            setTrendingList((prevState) =>
                unique(prevState.slice(0, LIMIT_RENDER), (item) => item.slug),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disclosure.open]);

    return (
        <div className="h-fit w-full">
            <ul
                ref={parent}
                className="full-size my-2 flex flex-wrap gap-4 text-2xl md:text-3xl"
            >
                <If condition={trendingList && trendingList?.length}>
                    <Then>
                        {trendingList.map((trend) => {
                            return (
                                <Link
                                    key={trend.slug}
                                    href={`/${SEARCH_PATH}?market=all&keyword=${encodeURIComponent(
                                        trend.name,
                                    )}`}
                                >
                                    <a>
                                        <li className="smooth-effect max-h-[40px] overflow-hidden rounded-2xl border-[1px] border-gray-700 px-4 py-3 line-clamp-1 hover:cursor-pointer hover:outline-double hover:outline-blue-500">
                                            {trend.name}
                                        </li>
                                    </a>
                                </Link>
                            );
                        })}
                    </Then>
                </If>
            </ul>

            <Disclosure
                state={disclosure}
                className="absolute-center w-full space-x-2"
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
        </div>
    );
}

export default memo(SearchTrends);
