import Link from 'next/link';
import { isNumber } from 'radash';
import { memo } from 'react';
import { Else, If, Then } from 'react-if';
import { SearchResult } from 'types';
import Progress from '~/components/shared/Progress';
import { mapping_market_colors, PRODUCTS_PATH } from '~/constants';
import useProduct from '~/context/ProductContext';
import { handleSubPathMarket } from '~/utils/stringHandler';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
    product: SearchResult;
    isFavoriteProduct?: boolean;
}

const ProductCard = ({ product, isFavoriteProduct }: ProductCardProps) => {
    const productCtx = useProduct();

    const handleRemoveProduct = () => {
        if (isFavoriteProduct) {
            productCtx?.removeProduct('single', product?.link);
        }
    };

    return (
        <div className="relative">
            <If condition={isFavoriteProduct}>
                <Then>
                    <div className="absolute-center smooth-effect absolute right-0 top-0 z-40 flex h-14 w-14 rounded-[50%] border border-black bg-white hover:scale-110">
                        <button
                            onClick={handleRemoveProduct}
                            className="absolute-center select-none p-4 "
                        >
                            <XMarkIcon className="h-8 w-8 stroke-1" />
                        </button>
                    </div>
                </Then>
            </If>

            <Link
                href={`/${PRODUCTS_PATH}/${
                    product?.market
                }/${handleSubPathMarket(product?.market, product?.link)}`}
            >
                <a className="absolute-center flex-col">
                    <div className="absolute-center flex-col sm:py-3 sm:px-1 lg:p-5">
                        <div className="smooth-effect relative z-10 font-primary hover:-translate-y-1 sm:h-[265px] sm:w-[155px] lg:h-[290px] lg:w-[185px]">
                            <div
                                className="absolute -z-10 rounded-2xl border-2 border-gray-700 sm:top-[6px] sm:left-[0px] sm:h-[265px] sm:w-[155px] lg:top-[6px] lg:left-[6px] lg:h-[290px] lg:w-[185px]"
                                style={{
                                    backgroundColor:
                                        mapping_market_colors[product?.market],
                                }}
                            ></div>
                            <div className="z-20 flex cursor-pointer flex-col rounded-xl border-2 border-black bg-white hover:bg-white sm:h-[265px] sm:w-[155px] lg:h-[290px] lg:w-[185px]">
                                <div className="space-y-4 p-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.img}
                                        alt="img-item"
                                        className="z-0 h-auto max-h-[150px] w-full rounded-xl"
                                    />

                                    <div className="flex flex-col px-2">
                                        <h2 className="line-clamp-2">
                                            {product.name}
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="pt-1 text-2xl font-medium text-red-400 line-clamp-1 md:text-3xl">
                                                <If
                                                    condition={isNumber(
                                                        product.price,
                                                    )}
                                                >
                                                    <Then>
                                                        {new Intl.NumberFormat(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            },
                                                        ).format(
                                                            Number(
                                                                product.price,
                                                            ),
                                                        )}
                                                    </Then>

                                                    <Else>{product.price}</Else>
                                                </If>
                                            </h3>
                                            <h3 className="m-auto pt-2 text-lg line-through">
                                                <If
                                                    condition={isNumber(
                                                        product?.priceBeforeDiscount,
                                                    )}
                                                >
                                                    <Then>
                                                        {new Intl.NumberFormat(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            },
                                                        ).format(
                                                            Number(
                                                                product?.priceBeforeDiscount,
                                                            ),
                                                        )}
                                                    </Then>

                                                    <Else>
                                                        {
                                                            product?.priceBeforeDiscount
                                                        }
                                                    </Else>
                                                </If>
                                            </h3>
                                        </div>
                                        <div>
                                            <h4
                                                className="float-left py-2 text-xl"
                                                style={{
                                                    color: mapping_market_colors[
                                                        product?.market
                                                    ],
                                                }}
                                            >
                                                {product?.market}
                                            </h4>
                                            <h5 className="float-right py-2 text-xl">
                                                {product.totalSales}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <If condition={product?.qtyRemainPercent !== undefined}>
                        <Then>
                            <Progress
                                done={100 - Number(product?.qtyRemainPercent)}
                            />
                        </Then>
                    </If>
                </a>
            </Link>
        </div>
    );
};

export default memo(ProductCard);
