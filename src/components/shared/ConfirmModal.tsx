import { Dialog, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    setOpen: (state: boolean) => void;
    removeAction: (
        removeMode: 'single' | 'multiple' | 'deny',
        link?: string,
    ) => Promise<void>;
}

function ConfirmModal({ isOpen, setOpen, removeAction }: ConfirmModalProps) {
    function closeModal() {
        setOpen(false);
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
                            <Dialog.Panel className="flex h-[260px] w-[320px] transform flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="absolute-center space-x-4 text-4xl font-medium leading-6 text-gray-900"
                                >
                                    <span>Chắc khum?</span>
                                </Dialog.Title>

                                <h5 className="absolute-center w-full text-9xl">
                                    🤔
                                </h5>

                                <div className="mt-4 flex justify-end space-x-6 font-primary">
                                    <button
                                        onClick={() => {
                                            removeAction('deny');
                                            closeModal();
                                        }}
                                        type="button"
                                        className="smooth-effect rounded-xl border border-sky-700 py-2 px-4 text-sky-500 hover:scale-110"
                                    >
                                        Khum
                                    </button>

                                    <button
                                        type="button"
                                        className="smooth-effect rounded-xl border border-red-700 py-2 px-4 text-red-500 hover:scale-110"
                                        onClick={() => {
                                            removeAction('multiple');
                                            closeModal();
                                        }}
                                    >
                                        Chắc!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(ConfirmModal);
