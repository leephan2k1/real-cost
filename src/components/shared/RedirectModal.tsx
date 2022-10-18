import { Fragment, memo } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface RedirectModalProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
}

function RedirectModal({ isOpen, setIsOpen }: RedirectModalProps) {
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[500]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex h-[300px] w-[350px] transform flex-col overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="absolute-center my-4 mx-auto w-3/4 flex-col space-y-4 py-4 text-4xl">
                                    <p>Đang chuyển hướng</p>
                                    <span className="dot-flashing"></span>
                                </div>

                                <div className="absolute-center w-full flex-1 flex-col space-y-10">
                                    <span className="animate-spin-slow">
                                        ٩(๑˃̵ᴗ˂̵)و
                                    </span>
                                    <span>Đợi tí nhé</span>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(RedirectModal);
