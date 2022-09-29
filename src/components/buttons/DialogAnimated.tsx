import { Button } from 'ariakit';
import { useSession, signOut } from 'next-auth/react';
import { Dialog, DialogHeading, useDialogState } from 'ariakit/dialog';
import { ReactNode, useEffect } from 'react';

interface DialogAnimatedProps {
    state: boolean;
    children: ReactNode;
}

export default function DialogAnimated({
    state,
    children,
}: DialogAnimatedProps) {
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
                className="dialog absolute-center fixed right-[2.3%] z-[200] flex w-96 flex-col overflow-auto rounded-2xl border-[1px] border-black bg-white p-4 sm:top-24 md:top-28 "
            >
                <header className="header">
                    <DialogHeading className="text-center font-secondary text-3xl font-medium">
                        {session?.user?.name}
                    </DialogHeading>
                </header>
                <div>
                    <button className="w-full pt-2 font-primary">
                        Sản phẩm quan tâm
                    </button>
                    <button
                        onClick={() => signOut()}
                        className="w-full pt-2 font-primary"
                    >
                        Đăng xuất
                    </button>
                </div>
            </Dialog>
        </>
    );
}
