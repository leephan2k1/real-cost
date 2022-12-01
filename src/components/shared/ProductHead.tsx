import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { memo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';
import { Else, If, Then } from 'react-if';
import useSwr from 'swr';
import { Market, Product } from 'types';
import { useIntersectionObserver } from 'usehooks-ts';
import { mapping_market_colors, MARKET_URL } from '~/constants';
import useAxiosClient from '~/services/axiosClient';

import {
    ArrowTopRightOnSquareIcon,
    BellIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

import BookmarkButton from '../buttons/ButtonTooltip';
import ProductImgPreview from './ProductSlides';

const Subscribe = dynamic(
    () =>
        import('~/components/features/Subscribe', {
            ssr: false,
        } as ImportCallOptions),
);

const RedirectModal = dynamic(
    () =>
        import('~/components/shared/RedirectModal', {
            ssr: false,
        } as ImportCallOptions),
);

interface ProductHeadProps {
    product: Product;
}

function ProductHead({ product }: ProductHeadProps) {
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const entry = useIntersectionObserver(btnRef, {});
    const isVisible = !!entry?.isIntersecting;
    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );
    const [isRedirect, setRedirect] = useState(false);

    const [shouldShowNotification, setShouldShowNotification] = useState(false);

    const [fvState, setFvState] = useState(false);

    const { data: session, status } = useSession();

    const { data: favoriteState, isValidating } = useSwr<{
        status: string;
        isSaved: boolean;
    }>(
        product?.link,
        async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { id } = session?.user;

            const { data } = await axiosClient.post(
                `/users/${id}/get-favorite`,
                {
                    link: product?.link,
                },
            );

            if (data) {
                setFvState(data?.isSaved);
            }

            return data;
        },
        {
            onError: () => {
                setFvState(false);
            },
        },
    );

    const handleRedirect = async () => {
        if (product?.market === 'lazada') {
            window.open(product?.link, '_blank');
            return;
        }

        setRedirect(true);

        try {
            const { data } = await axiosClient.get(`/products/generate-link`, {
                params: {
                    productLink: product?.link,
                    market: product?.market,
                },
            });

            if (data?.productLink) {
                window.open(data?.productLink, '_blank');
                setRedirect(false);
            }
        } catch (error) {
            console.error(error);

            // fallback a missing AF link
            window.open(product?.link, '_blank');

            setRedirect(false);
        }
    };

    const handleToggleFavorite = async () => {
        if (status === 'unauthenticated') {
            toast.error('Đăng nhập để thao tác nhé bạn!');
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { id } = session?.user;

            if (!id || !product) throw new Error();

            // DELETE
            if (fvState) {
                toast.success('Xoá khỏi danh sách thành công!');

                const { data } = await axiosClient.delete(
                    `/users/${id}/favorite`,
                    {
                        data: {
                            link: product?.link,
                        },
                    },
                );

                if (!data || data?.status !== 'success') throw new Error();

                setFvState(false);
            }
            //POST
            else {
                toast.success('Thêm vào danh sách thành công!');

                const { data } = await axiosClient.post(
                    `/users/${id}/favorite`,
                    {
                        name: product?.name,
                        link: product?.link,
                        market: product?.market,
                        img: product?.images[0],
                        price: product?.price,
                        totalSales: product?.totalSales,
                    },
                );

                if (!data || data?.status !== 'success') throw new Error();

                setFvState(true);
            }
        } catch (error) {
            toast.error('Lỗi rồi, thử lại sau!');
        }
    };

    const handleToggleNotify = (state: boolean) => {
        if (status === 'unauthenticated') {
            toast.error('Đăng nhập để thao tác bạn nhé!');
            return;
        }

        setShouldShowNotification(state);
    };

    return (
        <>
            <Subscribe
                product={product}
                handleToggle={handleToggleNotify}
                shouldShow={shouldShowNotification}
            />

            <RedirectModal
                isOpen={isRedirect}
                setIsOpen={(state: boolean) => setRedirect(state)}
            />

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
                                <h1 className="overflow-hidden font-secondary text-3xl font-medium line-clamp-2 md:w-4/5 md:text-4xl lg:text-5xl lg:line-clamp-3">
                                    {product?.name}
                                </h1>

                                <div className="my-4 flex w-full items-center space-x-4 font-secondary md:space-x-6">
                                    <h3 className="text-4xl text-rose-500 md:text-5xl">
                                        {product?.price}
                                    </h3>
                                    <If
                                        condition={product?.priceBeforeDiscount}
                                    >
                                        <Then>
                                            <h3 className="text-3xl text-gray-600 line-through">
                                                {product?.priceBeforeDiscount}
                                            </h3>
                                        </Then>
                                    </If>
                                </div>

                                <h4>Đã bán: {product?.totalSales}</h4>

                                <div className="flex w-full items-center space-x-8">
                                    <button
                                        ref={btnRef}
                                        onClick={handleRedirect}
                                        className="smooth-effect absolute-center w-fit space-x-4 rounded-2xl bg-[#f84a2f] p-4 text-white hover:scale-[110%]"
                                    >
                                        <span>Đi đến nơi bán</span>
                                        <ArrowTopRightOnSquareIcon className="h-8 w-8" />
                                    </button>

                                    <If condition={isValidating}>
                                        <Then>
                                            <VscLoading className="h-8 w-8 animate-spin text-gray-700" />
                                        </Then>

                                        <Else>
                                            <BookmarkButton
                                                handler={handleToggleFavorite}
                                                title={`${
                                                    favoriteState?.isSaved
                                                        ? 'Huỷ yêu thích'
                                                        : 'Yêu thích'
                                                }`}
                                            >
                                                <If condition={fvState}>
                                                    <Then>
                                                        <HeartIconSolid className="animate__heartBeat animate__animated animate__faster mx-4 h-8 w-8 text-rose-500 md:h-10 md:w-10" />
                                                    </Then>

                                                    <Else>
                                                        <HeartIcon className="animate__heartBeat animate__animated animate__faster mx-4 h-8 w-8 md:h-10 md:w-10" />
                                                    </Else>
                                                </If>
                                            </BookmarkButton>
                                        </Else>
                                    </If>

                                    <BookmarkButton
                                        handler={() => handleToggleNotify(true)}
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

                {!isVisible && (
                    <button
                        onClick={handleRedirect}
                        className="animate__fadeIn animate__faster animate__animated smooth-effect absolute-center fixed left-1/2 bottom-6 z-[50] w-fit -translate-x-1/2 space-x-4 rounded-2xl bg-[#f84a2f] p-4 px-10 text-white hover:scale-[110%] md:px-10 lg:px-16"
                    >
                        <span>Đi đến nơi bán</span>
                        <ArrowTopRightOnSquareIcon className="h-8 w-8" />
                    </button>
                )}
            </div>
        </>
    );
}

export default memo(ProductHead);
