import Link from 'next/link';
import { memo } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { Product } from 'types';
import { PRODUCTS_PATH } from '~/constants';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { handleSubPathMarket } from '~/utils/stringHandler';

interface ReactHotToastProps {
    product: Product;
    t: Toast;
}

function ReactHotToast({ product, t }: ReactHotToastProps) {
    const [parent] = useAutoAnimate<HTMLDivElement>();

    return (
        <div
            ref={parent}
            className={`pointer-events-auto flex h-fit w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
            <Link
                href={`/${PRODUCTS_PATH}/${
                    product?.market
                }/${handleSubPathMarket(product?.market, product?.link)}`}
            >
                <a className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="absolute-center mx-4 py-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="h-10 w-10 rounded-full"
                                src={product?.images[0] || product?.images[1]}
                                alt=""
                            />
                        </div>
                        <div className="flex-1 ml-3">
                            <h1 className="text-xl font-medium text-gray-900 line-clamp-1 md:text-2xl">
                                {product?.name}
                            </h1>
                            <p className="mt-1 text-lg text-gray-500">
                                {`Giá mới: ${product?.price}`}
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default memo(ReactHotToast);
