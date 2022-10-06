import { Button } from 'ariakit/button';
import { Dialog, DialogHeading, useDialogState } from 'ariakit/dialog';
import { signOut, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

import {
    ArrowRightOnRectangleIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

interface UserMenuProps {
    state: boolean;
    children: ReactNode;
}

export default function UserMenu({ state, children }: UserMenuProps) {
    const dialog = useDialogState({ animated: true });
    const { data: session, status } = useSession();

    useEffect(() => {
        dialog.setOpen(state);
    }, [state]);

    const handleShowDialog = () => {
        if (status === 'unauthenticated') {
            return;
        }
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
                className="dialog fixed right-[2.5%] z-[200] flex w-96 flex-col overflow-auto rounded-2xl border-[1px] border-black bg-white p-4 py-4 sm:top-24 md:right-[10%] md:top-28 "
            >
                <h2 className="my-4">
                    <DialogHeading className="text-center font-secondary text-3xl font-medium">
                        {session?.user?.name}
                    </DialogHeading>
                </h2>

                <hr className="my-4 mx-auto h-[1px] w-3/4 border-gray-400" />

                <ul className=" my-2 flex w-full flex-col space-y-4">
                    <li className="group flex h-fit items-center space-x-4">
                        <HeartIcon className="smooth-effect h-8 w-8 group-hover:text-rose-400" />
                        <button className="w-fit py-2">
                            Sản phẩm yêu thích
                        </button>
                    </li>
                    <li className="group flex h-fit items-center space-x-4">
                        <ArrowRightOnRectangleIcon className="smooth-effect h-8 w-8 group-hover:text-blue-400" />
                        <button
                            onClick={() => {
                                dialog.toggle();
                                signOut({ redirect: false });
                            }}
                            className="w-fit py-2"
                        >
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </Dialog>
        </>
    );
}
