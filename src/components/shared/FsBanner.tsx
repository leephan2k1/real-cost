import { memo } from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';

function FsBanner() {
    return (
        <div className="absolute-center h-[250px] w-full rounded-xl border-2 border-dashed border-gray-700 md:h-[300px]">
            <h1 className="absolute-center text-3xl md:text-5xl lg:text-6xl">
                <span>Giá sốc</span>{' '}
                <BoltIcon className="h-20 w-20  fill-rose-500" />{' '}
                <span>Hôm nay</span>
            </h1>
        </div>
    );
}

export default memo(FsBanner);
