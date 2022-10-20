import { memo } from 'react';
import {
    MagnifyingGlassIcon,
    InformationCircleIcon,
    BellAlertIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

function Banner() {
    return (
        <div className="full-size flex flex-col justify-evenly">
            <h1 className="font-sans  mx-auto max-w-[80%] py-4 px-8 text-center text-5xl font-black uppercase leading-snug text-[#213547] md:px-0 md:text-6xl md:leading-normal lg:max-w-[1200px] lg:text-8xl lg:leading-[85px]">
                <strong className="bg-gradient-to-br from-[#2980B9] to-[#6DD5FA] bg-clip-text text-transparent">
                    Real Cost
                </strong>{' '}
                giúp bạn mua sắm online tốt hơn mỗi ngày!
            </h1>

            <h2 className="mx-auto my-4 max-w-[80%] text-center font-secondary text-2xl text-gray-800 highlight highlight-cyan-400 highlight-variant-12 md:py-2 md:text-3xl lg:text-4xl">
                Stop clicking &quot;Add to cart&quot; when you don&#39;t know
                the &quot;Real cost&quot;
            </h2>

            <div className="mx-auto my-4 grid w-3/4 grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
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
