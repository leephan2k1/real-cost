import { memo } from 'react';
import { If, Then } from 'react-if';
import { Product } from 'types';
import { mapping_market_colors } from '~/constants';

import {
    ArrowTopRightOnSquareIcon,
    BellIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

import BookmarkButton from '../buttons/ButtonTooltip';
import ProductImgPreview from './ProductSlides';

interface ProductHeadProps {
    product: Product;
}

function ProductHead({ product }: ProductHeadProps) {
    return (
        <div className="smooth-effect relative h-fit w-full rounded-2xl border-[2px] border-gray-700 md:h-[400px] lg:h-[500px]">
            <div
                className="full-size absolute top-4 left-4 -z-50 rounded-2xl border-2 border-gray-700 "
                style={{
                    backgroundColor: mapping_market_colors[product?.market],
                }}
            ></div>
            <div className="full-size z-60 flex flex-col rounded-2xl bg-white md:flex-row">
                <ProductImgPreview images={product?.images} />

                <aside className="flex-1 p-4 md:p-6">
                    <div className="full-size flex flex-col justify-between bg-red-400/0">
                        <div className="space-y-3 md:space-y-6">
                            <h2 className="text-xl">
                                Thương hiệu: {product?.brand}
                            </h2>
                            <h1 className="py-3 font-secondary text-3xl font-medium line-clamp-2 md:w-4/5 md:text-4xl lg:text-5xl lg:line-clamp-3">
                                {product?.name}
                            </h1>

                            <div className="my-4 flex w-full items-center space-x-4 font-secondary md:space-x-6">
                                <h3 className="text-4xl text-rose-500 md:text-5xl">
                                    {product?.price}
                                </h3>
                                <If condition={product?.priceBeforeDiscount}>
                                    <Then>
                                        <h3 className="text-3xl text-gray-600 line-through">
                                            {product?.priceBeforeDiscount}
                                        </h3>
                                    </Then>
                                </If>
                            </div>

                            <h4>Đã bán: {product?.totalSales}</h4>

                            <div className="flex w-full items-center space-x-8">
                                <button className="smooth-effect absolute-center w-fit space-x-4 rounded-2xl bg-[#f84a2f] p-4 text-white hover:scale-[110%]">
                                    <span>Đi đến nơi bán</span>
                                    <ArrowTopRightOnSquareIcon className="h-8 w-8" />
                                </button>

                                <BookmarkButton
                                    handler={() => {
                                        // console.log('test');
                                    }}
                                    title="Yêu thích"
                                >
                                    <HeartIcon className="mx-4 h-8 w-8 md:h-10 md:w-10" />
                                </BookmarkButton>

                                <BookmarkButton
                                    handler={() => {
                                        // console.log('test');
                                    }}
                                    title="Nhận thông báo"
                                >
                                    <BellIcon className="mx-4 h-8 w-8 md:h-10 md:w-10" />
                                </BookmarkButton>
                            </div>
                        </div>

                        <h4 className="my-4">
                            Sàn thương mại:{' '}
                            <span
                                style={{
                                    color: mapping_market_colors[
                                        product?.market
                                    ],
                                }}
                            >
                                {product?.market}
                            </span>
                        </h4>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default memo(ProductHead);
