import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { max, min } from 'radash';
import { memo, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ItemHistory } from 'types';
import MultiRangeSlider from '~/components/shared/MultiRangeSlider';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const chartAreaBorder = {
    id: 'chartAreaBorder',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    beforeDraw(chart, args, options) {
        const {
            ctx,
            chartArea: { left, top, width, height },
        } = chart;
        ctx.save();
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.setLineDash(options.borderDash || []);
        ctx.lineDashOffset = options.borderDashOffset;
        ctx.strokeRect(left, top, width, height);
        ctx.restore();
    },
};

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ lịch sử giá của ISamsung',
        },
        chartAreaBorder: {
            borderColor: 'gray',
            borderWidth: 2,
            borderDash: [5, 5],
            borderDashOffset: 2,
        },
        tooltip: {
            callbacks: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                label: function (context) {
                    let label = context?.dataset?.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(context.parsed.y);
                    }
                    return label;
                },
            },
        },
    },

    scales: {
        y: {
            ticks: {
                callback: (value: number) => {
                    return new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(value);
                },
            },
        },
    },
};

interface ProductChartProps {
    itemHistory: ItemHistory;
    productName: string;
}

function ProductChart({ itemHistory, productName }: ProductChartProps) {
    const [clusterRange, setClusterRange] = useState<{
        min: number;
        max: number;
    }>({ min: 0, max: itemHistory?.priceTs.length });

    const labels = useMemo(() => {
        const { priceTs } = itemHistory;

        return priceTs
            .slice(clusterRange.min, clusterRange.max)
            .map((timeStamp) => {
                const date = new Date(timeStamp);

                return `${date.getDate()}/${
                    date.getMonth() + 1
                }/${date.getFullYear()}`;
            });
    }, [itemHistory, clusterRange]);

    const items = useMemo(() => {
        return itemHistory?.price.slice(clusterRange.min, clusterRange.max);
    }, [itemHistory, clusterRange]);

    const value = useMemo(() => {
        return {
            min: min(itemHistory?.price, (price) => price),
            max: max(itemHistory?.price, (price) => price),
        };
    }, [itemHistory]);

    Object.assign(options, {
        ...options,
        plugins: {
            ...options.plugins,
            title: {
                ...options.plugins.title,
                text: `Lịch sử giá của ${productName}`,
            },
        },
    });

    const data = {
        labels,
        datasets: [
            {
                label: `Giá`,
                data: items,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const handleRangeSliderChange = ({
        min,
        max,
    }: {
        min: number;
        max: number;
    }) => {
        setClusterRange({ ...clusterRange, min, max });
    };

    return (
        <div className="h-fit w-full">
            <div className="my-6 flex w-full items-center space-x-4">
                <h2 className="text-lg md:text-2xl">Thời gian: </h2>
                <MultiRangeSlider
                    items={itemHistory.priceTs}
                    min={0}
                    max={itemHistory?.priceTs?.length}
                    onChange={handleRangeSliderChange}
                />
            </div>

            <div className="mx-auto mt-16 w-full lg:w-3/4">
                <div className="absolute-center w-full space-x-4">
                    <h3 className="flex flex-col items-center space-x-4 md:flex-row">
                        <span>Giá cao nhất:</span>
                        <span className="rounded-2xl border-[2px] border-rose-500 px-4 py-2">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(value.max)}
                        </span>
                    </h3>
                    <h3 className="flex flex-col items-center space-x-4 md:flex-row">
                        <span>Giá thấp nhất:</span>
                        <span className="rounded-2xl border-[2px] border-green-500 px-4 py-2">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(value.min)}
                        </span>
                    </h3>
                </div>

                <Line
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    options={options}
                    data={data}
                    plugins={[chartAreaBorder]}
                />
            </div>
        </div>
    );
}

export default memo(ProductChart);
