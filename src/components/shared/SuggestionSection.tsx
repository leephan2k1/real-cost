import Link from 'next/link';
import { memo } from 'react';
import { If, Then } from 'react-if';
import { ItemsWithKeyword } from 'types';
import Slides from '~/components/shared/Slides';
import { TailwindColors } from '~/constants';
import { rotateColors } from '~/utils/arrayHandler';
import { SEARCH_PATH } from '~/constants';
import ProductCard from '~/components/shared/ProductCard';

interface SuggestionSectionProps {
    itemsWithKeyword: ItemsWithKeyword;
    index: number;
}

function SuggestionSection({
    itemsWithKeyword,
    index,
}: SuggestionSectionProps) {
    return (
        <If
            condition={itemsWithKeyword.items && itemsWithKeyword.items?.length}
        >
            <Then>
                <div className="flex min-h-[300px] w-full flex-col py-4">
                    <div className="flex flex-wrap items-center space-x-4">
                        <Link
                            href={`/${SEARCH_PATH}?market=all&keyword=${encodeURIComponent(
                                itemsWithKeyword.keyword,
                            )}`}
                        >
                            <a>
                                <h1
                                    className={`font-semibold capitalize lg:text-3xl`}
                                    style={{
                                        color: rotateColors(
                                            TailwindColors,
                                            index,
                                        ),
                                    }}
                                >
                                    # {itemsWithKeyword.keyword}
                                </h1>
                            </a>
                        </Link>
                    </div>

                    <If
                        condition={
                            itemsWithKeyword?.items &&
                            itemsWithKeyword?.items?.length
                        }
                    >
                        <Then>
                            <Slides>
                                {itemsWithKeyword.items.map((item) => {
                                    return (
                                        <ProductCard
                                            product={item}
                                            key={item.link}
                                        />
                                    );
                                })}
                            </Slides>
                        </Then>
                    </If>
                </div>
            </Then>
        </If>
    );
}

export default memo(SuggestionSection);
