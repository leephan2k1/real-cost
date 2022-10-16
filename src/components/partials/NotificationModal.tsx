import { Button } from 'ariakit';
import { Dialog, useDialogState } from 'ariakit/dialog';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import useSWR from 'swr';
import { ProductPreview } from 'types';
import { BASE_URL, mapping_market_colors, PRODUCTS_PATH } from '~/constants';
import useSocket from '~/context/SocketContext';
import useAxiosClient from '~/services/axiosClient';
import { handleSubPathMarket } from '~/utils/stringHandler';
import { useRouter } from 'next/router';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface NotificationProps {
    children: ReactNode;
}

export default function NotificationModal({ children }: NotificationProps) {
    const router = useRouter();
    const socketContext = useSocket();
    const axiosClient = useAxiosClient(BASE_URL);
    const { data: session, status } = useSession();
    const dialog = useDialogState({ animated: true });

    const [items, setItems] = useState<
        { productLink: string; product: ProductPreview; seen: Date }[]
    >([]);

    const [parent] = useAutoAnimate<HTMLDivElement>();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = session?.user?.id;

    const { data: notificationItems, mutate } = useSWR<
        { productLink: string; product: ProductPreview; seen: Date }[]
    >(`${socketContext?.product?.link}${socketContext?.ping}`, async () => {
        const { data } = await axiosClient.get(
            `/users/${userId}/notifications`,
        );

        if (data?.status === 'success') {
            setItems(data.notifications);
            return data.notifications;
        }

        return [];
    });

    const handleShowDialog = () => {
        if (status === 'unauthenticated') {
            toast.error('Đăng nhập để thao tác bạn nhé!');
            return;
        }

        socketContext?.resetState();
        dialog.toggle();
    };

    /* A useEffect hook that listens to the route change event. When the route changes, it will check if
    the dialog is open. If it is, it will close the dialog and delete the notification from the
    database. */
    useEffect(() => {
        const handleRouteChange = async (url: string) => {
            const prodLink = String(url.split('/').pop());
            const itemWasSeen =
                notificationItems &&
                notificationItems.find((item) =>
                    item.productLink.includes(prodLink),
                );

            if (dialog.open) {
                try {
                    dialog.setOpen(false);
                    await axiosClient.delete(`/users/${userId}/notifications`, {
                        params: {
                            productLink: itemWasSeen?.productLink,
                        },
                    });

                    mutate();
                } catch (error) {
                    console.error(error);
                }
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [dialog.open]);

    const handleFilterItems = (type: 'all' | 'seen') => {
        if (type === 'all') {
            setItems(notificationItems ? notificationItems : []);
        } else {
            setItems((prevState) => prevState.filter((item) => !!item?.seen));
        }
    };

    return (
        <>
            <Button
                onClick={handleShowDialog}
                className="relative h-16 w-16 rounded-full bg-contain bg-center md:ml-0"
            >
                {children}
            </Button>
            <Dialog
                state={dialog}
                className="dialog animate__zoomIn animate__animated animate-duration-200 fixed right-[3%] z-[200] mx-auto flex max-h-[65rem] min-h-[300px] w-[80vw] flex-col space-y-4 overflow-x-hidden overflow-y-scroll rounded-2xl border-2 border-gray-500 bg-white font-secondary sm:top-24 md:right-[14%] md:top-28 md:w-[40rem]"
            >
                <If condition={Array.isArray(items) && items?.length}>
                    <Then>
                        <h1 className="my-2 min-h-[30px] py-4 text-center text-4xl">
                            Thông báo
                        </h1>

                        <h2 className="min-h-[20px] text-center font-primary text-xl italic">
                            Những thông báo đã xem sẽ tự động xoá sau 2 ngày
                        </h2>

                        <div className="flex min-h-[25px] w-full space-x-4 px-4">
                            <button
                                onClick={() => handleFilterItems('all')}
                                className="absolute-center smooth-effect py-2 px-4 hover:rounded-xl hover:bg-gray-200"
                            >
                                Tất cả
                            </button>
                            <button
                                onClick={() => handleFilterItems('seen')}
                                className="absolute-center smooth-effect py-2 px-4 hover:rounded-xl hover:bg-gray-200"
                            >
                                Đã xem
                            </button>
                        </div>

                        <div
                            ref={parent}
                            className="flex w-full flex-1 flex-col-reverse justify-end space-y-4 pb-6"
                        >
                            {items?.map((item) => {
                                return (
                                    <Link
                                        className="flex h-40 w-full flex-col"
                                        href={`/${PRODUCTS_PATH}/${
                                            item.product.market
                                        }/${handleSubPathMarket(
                                            item.product.market,
                                            item.product.link,
                                        )}`}
                                        key={item.productLink}
                                    >
                                        <a
                                            className={`smooth-effect z-20 flex cursor-pointer items-center overflow-hidden rounded-2xl ${
                                                item?.seen ? 'opacity-60' : ''
                                            }`}
                                        >
                                            <div className="absolute-center m-4 flex h-32 w-32 rounded-2xl border-[1px] border-black">
                                                <Image
                                                    src={item.product.img}
                                                    alt=""
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                            <div className="flex w-[26rem] flex-col items-start font-primary">
                                                <span className="flex text-[1.6rem] font-medium line-clamp-2">
                                                    {item.product.name}
                                                </span>
                                                <span className="text-[1.4rem]">
                                                    Sản phẩm đã có giá mới
                                                </span>
                                                <div className="flex w-full flex-row">
                                                    <span className="flex  basis-1/2 text-[1.4rem]">
                                                        Giá:&nbsp;{' '}
                                                        <span className="text-[1.4rem] text-rose-600">
                                                            {item.product.price}
                                                        </span>
                                                    </span>
                                                    <span className="flex  basis-1/2 text-[1.4rem]">
                                                        Sàn:&nbsp;{' '}
                                                        <span
                                                            className="text-[1.4rem]"
                                                            style={{
                                                                color: mapping_market_colors[
                                                                    item.product
                                                                        .market
                                                                ],
                                                            }}
                                                        >
                                                            {
                                                                item.product
                                                                    .market
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex content-end items-center">
                                                {!item?.seen && (
                                                    <span className="h-5 w-5 rounded-full bg-sky-600"></span>
                                                )}
                                            </div>
                                        </a>
                                    </Link>
                                );
                            })}
                        </div>
                    </Then>
                    <Else>
                        <h4 className="absolute-center w-full py-4  font-secondary text-4xl">
                            Hiện chưa có thông báo...
                        </h4>
                    </Else>
                </If>
            </Dialog>
        </>
    );
}
