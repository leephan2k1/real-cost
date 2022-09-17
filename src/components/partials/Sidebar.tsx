import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, memo, useEffect } from 'react';
import sideBarState from '~/atoms/sideBarState';
import { quickList } from '~/constants';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Logo from '../icons/Logo';

function Sidebar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useAtom(sideBarState);

    //hidden sidebar after navigate
    useEffect(() => {
        setIsOpen(false);
    }, [router.pathname]);

    return (
        <AnimatePresence>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel>
                            <Dialog.Overlay
                                className="animate__fadeIn animate__animated animate__faster fixed inset-0 z-[100] bg-black/30"
                                aria-hidden="true"
                            />
                            <motion.aside
                                initial={{ width: 0 }}
                                animate={{
                                    width: 250,
                                }}
                                exit={{
                                    width: 0,
                                    transition: { delay: 0.7, duration: 0.3 },
                                }}
                                className="fixed inset-0 z-[999] flex w-[250px] min-w-[230px] flex-col items-center justify-between bg-white/90 p-4 text-gray-800 md:w-[40%]"
                            >
                                <div className="full-size">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="mt-4 rounded-2xl border-[1px] border-gray-800 bg-white/30 p-2"
                                    >
                                        <XMarkIcon className="h-9 w-9" />
                                    </button>

                                    <Dialog.Title className="font-secondary text-3xl">
                                        <Link href="/">
                                            <a className="full-size">
                                                <figure className="absolute-center h-fit w-full">
                                                    <Logo style="h-24 w-24 fill-gray-800" />
                                                </figure>

                                                <h1 className="text-center text-4xl">
                                                    Real Cost
                                                </h1>
                                            </a>
                                        </Link>
                                    </Dialog.Title>

                                    <div className="my-10 h-fit w-full">
                                        <ul className="full-size px-2 font-secondary text-3xl">
                                            {quickList?.length &&
                                                quickList.map((nvg) => {
                                                    return (
                                                        <Link
                                                            key={nvg.title}
                                                            href={nvg.link}
                                                        >
                                                            <a>
                                                                <li className="my-10 md:my-14">
                                                                    {nvg.title}
                                                                </li>
                                                            </a>
                                                        </Link>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                </div>

                                <footer className="text-lg text-white/70">
                                    &copy; Real Cost 2022
                                </footer>
                            </motion.aside>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </AnimatePresence>
    );
}

export default memo(Sidebar);
