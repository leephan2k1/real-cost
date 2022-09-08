import { useAtom } from 'jotai';
import { Fragment, memo, useState } from 'react';
import mobileSearchState from '~/atoms/mobileSearchState';

import { Dialog, Transition } from '@headlessui/react';
import {
    Square2StackIcon,
    StopIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import ListBoxButton from '../buttons/ListBoxButton';
import SearchInput from './SearchInput';

function MobileSearchModal() {
    const [zoomIn, setZoomIn] = useState(false);
    const [isOpen, setIsOpen] = useAtom(mobileSearchState);

    const handleSelect = (value: string) => {
        // not completed
        console.error(value);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 z-[100] bg-black bg-opacity-25" />
                </Transition.Child>

                <div
                    className={`smooth-effect fixed left-1/2 z-[200] ${
                        zoomIn ? 'top-0 h-full w-screen' : 'top-[15%] w-full'
                    } -translate-x-1/2 overflow-y-auto`}
                >
                    <div
                        className={`mx-auto flex min-h-full  ${
                            zoomIn ? 'w-full' : 'w-[85%]'
                        } items-center justify-center p-4 text-center`}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`smooth-effect ${
                                    zoomIn ? 'h-[90vh]' : 'h-[30vh]'
                                } w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                            >
                                <Dialog.Title
                                    as="div"
                                    className="my-4 flex items-center justify-between font-secondary  leading-6 text-gray-900"
                                >
                                    <div className="absolute-center space-x-2">
                                        <h3 className="text-4xl uppercase">
                                            tìm kiếm:
                                        </h3>

                                        <ListBoxButton
                                            options={[
                                                'Tất cả',
                                                'Lazada',
                                                'Tiki',
                                                'Shopee',
                                            ]}
                                            defaultOption="Lazada"
                                            style="bg-white border-gray-500 border-[1px] w-32 p-2 rounded-lg"
                                            handleSelect={handleSelect}
                                        />
                                    </div>

                                    <div className="space-x-6">
                                        <button
                                            onClick={() =>
                                                setZoomIn(
                                                    (prevState) => !prevState,
                                                )
                                            }
                                        >
                                            {zoomIn ? (
                                                <Square2StackIcon className="h-8 w-8" />
                                            ) : (
                                                <StopIcon className="h-8 w-8" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <XMarkIcon className="h-8 w-8" />
                                        </button>
                                    </div>
                                </Dialog.Title>
                                <div className="relative my-6">
                                    <div className="absolute top-2 left-[52%] -z-10 h-full w-[80%] -translate-x-1/2 rounded-xl border-2 border-dashed border-gray-500"></div>
                                    <SearchInput
                                        focusOnMount
                                        styles="z-50 h-full w-[80%] mx-auto items-center space-x-2 overflow-hidden rounded-xl bg-white p-2 shadow-lg border-2 border-gray-500 flex"
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(MobileSearchModal);
