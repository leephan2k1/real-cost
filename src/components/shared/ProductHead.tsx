import { memo } from 'react';

import BookmarkButton from '../buttons/BookmarkButton';
import ProductImgPreview from './ProductSlides';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

function ProductHead() {
    return (
        <div className="smooth-effect relative h-fit w-full rounded-2xl border-[2px] border-gray-700 md:h-[400px] lg:h-[500px]">
            <div className="full-size absolute top-4 left-4 -z-50 rounded-2xl border-2 border-gray-700 bg-blue-400"></div>
            <div className="full-size z-60 flex flex-col rounded-2xl bg-white md:flex-row">
                <ProductImgPreview />

                <aside className="flex-1 p-4 md:p-6">
                    <div className="full-size flex flex-col justify-between bg-red-400/0">
                        <div className="space-y-3 md:space-y-6">
                            <h2 className="text-xl">Thương hiệu: ABC</h2>
                            <h1 className="font-secondary text-3xl font-medium line-clamp-2 md:w-4/5 md:text-4xl lg:text-5xl lg:line-clamp-3">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Corrupti quia numquam, iure
                                consequuntur dolore obcaecati molestiae delectus
                                eligendi! Quis tempore consequatur natus
                                accusantium nulla veritatis velit alias nihil
                                suscipit eos.
                            </h1>

                            <div className="my-4 flex w-full items-center space-x-4 font-secondary md:space-x-6">
                                <h3 className="text-4xl text-rose-500 md:text-5xl">
                                    60.860 ₫
                                </h3>
                                <h3 className="text-3xl text-gray-600 line-through">
                                    1000000
                                </h3>
                            </div>

                            <h4>Đã bán: 100</h4>

                            <div className="flex w-full items-center space-x-8">
                                <button className="smooth-effect absolute-center w-fit space-x-4 rounded-2xl bg-[#f84a2f] p-4 text-white hover:scale-[110%]">
                                    <span>Đi đến nơi bán</span>
                                    <ArrowTopRightOnSquareIcon className="h-8 w-8" />
                                </button>

                                <BookmarkButton />
                            </div>
                        </div>

                        <h4 className="my-4">
                            Sàn thương mại:{' '}
                            <span className="text-blue-500">Tiki</span>
                        </h4>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default memo(ProductHead);
