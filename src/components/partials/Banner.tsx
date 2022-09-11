import { memo } from 'react';
import {
    MagnifyingGlassIcon,
    InformationCircleIcon,
    BellAlertIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

function Banner() {
    return (
        <div className="full-size flex flex-col justify-between">
            <h1 className="bg-gradient-to-r py-4 px-8 text-center text-3xl uppercase md:px-0 md:text-4xl">
                Real Cost giúp bạn mua sắm online tốt hơn ngày hôm qua!
            </h1>

            <div className="mx-auto grid w-3/4 grid-cols-2  gap-6 md:grid-cols-4 md:gap-0">
                <div className="absolute-center flex-col space-y-6">
                    <div className="relative z-10">
                        <div className="absolute top-[2px] left-[2px] -z-10 rounded-2xl border-2 border-gray-700 bg-[#82d0f1] p-[24px]"></div>
                        <button className="z-10 rounded-2xl border-2 border-gray-700 bg-white p-4">
                            <MagnifyingGlassIcon className="h-10 w-10 text-gray-800" />
                        </button>
                    </div>
                    <h2 className="font-secondary text-3xl  md:text-4xl">
                        Tìm kiếm
                    </h2>
                </div>

                <div className="absolute-center flex-col space-y-6">
                    <div className="relative z-10">
                        <div className="absolute top-[2px] left-[2px] -z-10 rounded-2xl border-2 border-gray-700 bg-[#7ee7d6] p-[24px]"></div>
                        <button className="z-10 rounded-2xl border-2 border-gray-700 bg-white p-4">
                            <InformationCircleIcon className="h-10 w-10 text-gray-800" />
                        </button>
                    </div>
                    <h2 className="font-secondary text-3xl  md:text-4xl">
                        Lịch sử giá
                    </h2>
                </div>

                <div className="absolute-center flex-col space-y-6">
                    <div className="relative z-10">
                        <div className="absolute top-[2px] left-[2px] -z-10 rounded-2xl border-2 border-gray-700 bg-[#d65b3e] p-[24px]"></div>
                        <button className="z-10 rounded-2xl border-2 border-gray-700 bg-white p-4">
                            <BellAlertIcon className="h-10 w-10 text-gray-800" />
                        </button>
                    </div>
                    <h2 className="font-secondary text-3xl  md:text-4xl">
                        Thông báo
                    </h2>
                </div>

                <div className="absolute-center flex-col space-y-6">
                    <div className="relative z-10">
                        <div className="absolute top-[2px] left-[2px] -z-10 rounded-2xl border-2 border-gray-700 bg-[#f8e34f] p-[24px]"></div>
                        <button className="z-10 rounded-2xl border-2 border-gray-700 bg-white p-4">
                            <HeartIcon className="h-10 w-10 text-gray-800" />
                        </button>
                    </div>
                    <h2 className="font-secondary text-3xl  md:text-4xl">
                        Theo dõi
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default memo(Banner);
