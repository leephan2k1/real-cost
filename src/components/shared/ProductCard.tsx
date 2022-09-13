import Image from 'next/image';
import { BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const ProductCard = () => {
    const [isNotification, setIsNotification] = useState(false);

    // const mapping_market_colors: { [key in Market]: string } = {
    //     tiki: '#1a94ff',
    //     lazada: '#0f1470',
    //     shopee: '#f84a2f',
    //     all: '#f43f5e',
    // };

    const activeNotification = () => {
        setIsNotification((prevState) => !prevState);
    };
    return (
        <div className="sm:py-3 sm:px-1 lg:p-5">
            <div className="smooth-effect relative z-10 font-primary hover:-translate-y-1 sm:h-[265px] sm:w-[155px] lg:h-[290px] lg:w-[185px]">
                <div
                    className="absolute -z-10 rounded-2xl border-2 border-gray-700 bg-[#1a94ff] sm:top-[6px] sm:left-[0px] sm:h-[265px] sm:w-[155px] lg:top-[6px] lg:left-[6px] lg:h-[290px] lg:w-[185px]"
                    // style={{background-color: mapping_market_colors[
                    //     item?.market
                    // ],
                    // }}
                ></div>
                <div className="relative z-20 flex cursor-pointer flex-col rounded-xl border-2 border-black bg-white hover:bg-white sm:h-[265px] sm:w-[155px] lg:h-[290px] lg:w-[185px]">
                    <div className="relative block p-2">
                        <Image
                            className="z-0 rounded-xl"
                            src={{ url }}
                            alt="Product Image"
                            width={190}
                            height={190}
                        />
                        <div className="absolute right-4 top-4 z-10 flex h-14 w-14 rounded-[50%] border border-black bg-white">
                            <div
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
                            </div>
                        </div>
                        <div className="flex flex-col px-2">
                            <span className="line-clamp-2">
                                {/* {{Title}} */}
                            </span>
                            <span className="pt-1 text-4xl font-medium text-red-400">
                                {/* <u>đ</u> {{Price}} */}
                            </span>
                            <div>
                                <span className="float-left py-2 text-xl text-[#1a94ff]">
                                    {/* {{Platform}} */}
                                </span>
                                <span className="float-right py-2 text-xl">
                                    {/* {{Selling count}} */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
