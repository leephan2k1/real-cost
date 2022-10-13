import Image from 'next/image';
import Link from 'next/link';
import { If, Then, Else } from 'react-if';
import { Button } from 'ariakit';
import { Dialog, useDialogState } from 'ariakit/dialog';
import { ReactNode, useEffect } from 'react';

interface NotificationProps {
    state: boolean;
    children: ReactNode;
}

export default function NotificationPanel({
    state,
    children,
}: NotificationProps) {
    const dialog = useDialogState({ animated: true });

    useEffect(() => {
        dialog.setOpen(state);
    }, [state]);

    const handleShowDialog = () => {
        dialog.toggle();
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
                className="dialog absolute-center fixed right-[2.3%] z-[200] mx-auto flex h-auto max-h-[50rem] flex-col overflow-auto  rounded-2xl border-[1px] border-black bg-white font-secondary sm:top-24 sm:w-[80vw] md:top-28 lg:w-[40rem]"
            >
                <If condition={NotificationItems.length}>
                    <Then>
                        <div className=" h-auto w-full flex-col flex-wrap overflow-auto pt-2">
                            {NotificationItems?.map((item, index) => {
                                return (
                                    <div
                                        className="flex h-40 w-full flex-col"
                                        key={index}
                                    >
                                        <Link href={item.href} key={item.id}>
                                            <div className="smooth-effect z-20 flex cursor-pointer items-center overflow-hidden rounded-2xl">
                                                <div className="absolute-center m-4 flex h-32 w-32 rounded-2xl border-[1px] border-black">
                                                    <Image
                                                        src={item?.img}
                                                        alt=""
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                                <div className="flex w-[26rem] flex-col items-start font-primary">
                                                    <span className="flex text-[1.6rem] font-medium line-clamp-2">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-[1.4rem]">
                                                        Sản phẩm đã có giá mới
                                                        !!
                                                    </span>
                                                    <div className="flex w-full flex-row">
                                                        <span className="flex flex basis-1/2 text-[1.4rem]">
                                                            Giá:&nbsp;{' '}
                                                            <span className="text-[1.4rem] text-rose-600">
                                                                {item.price}
                                                            </span>
                                                        </span>
                                                        <span className="flex flex basis-1/2 text-[1.4rem]">
                                                            Sàn:&nbsp;{' '}
                                                            <span
                                                                className="text-[1.4rem]"
                                                                // style={{
                                                                //     color: mapping_market_colors[
                                                                //         market
                                                                //     ],
                                                                // }}
                                                            >
                                                                {item.market}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex content-end items-center">
                                                    <div className="h-5 w-5 rounded-full bg-blue-600"></div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </Then>
                    <Else>
                        <div className="absolute-center h-36 w-full cursor-pointer flex-col flex-wrap overflow-auto rounded-2xl text-center font-secondary">
                            Hiện chưa có thông báo nào !!
                            <br />
                            Chọn sản phẩm yêu thích để nhận thông báo khi giá
                            thay đổi !
                        </div>
                    </Else>
                </If>
            </Dialog>
        </>
    );
}
