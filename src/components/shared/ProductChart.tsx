import { Line } from 'react-chartjs-2';
import { memo, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ItemHistory } from 'types';

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
    const labels = useMemo(() => {
        const { priceTs } = itemHistory;

        return priceTs.map((timeStamp) => {
            const date = new Date(timeStamp);

            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        });
    }, [itemHistory]);

    const data = {
        labels,
        datasets: [
            {
                label: `Biến động giá`,
                data: itemHistory?.price,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3,
            },
        ],
    };

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

    return (
        <div className="mx-auto w-full lg:w-3/4">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Line options={options} data={data} plugins={[chartAreaBorder]} />
        </div>
    );
}

export default memo(ProductChart);
