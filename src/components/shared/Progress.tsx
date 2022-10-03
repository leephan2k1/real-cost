import { memo } from 'react';

interface ProgressProps {
    done: number;
}

function Progress({ done }: ProgressProps) {
    return (
        <div className="my-2 flex h-[30px] w-full items-center overflow-hidden rounded-2xl bg-slate-300 lg:w-[90%]">
            <div
                className="absolute-center h-full rounded-2xl bg-gradient-to-r from-rose-500  to-red-300 text-xl text-white"
                style={{
                    width: `${done}%`,
                }}
            >
                {done > 35 && `Đã bán ${done}%`}
            </div>

            {done <= 35 && <h4 className="px-4">Đã bán {done}%</h4>}
        </div>
    );
}

export default memo(Progress);
