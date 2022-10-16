import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { HiMenuAlt2 } from 'react-icons/hi';
import { If, Then } from 'react-if';
import sideBarState from '~/atoms/sideBarState';
import { quickList } from '~/constants';
import useSocket from '~/context/SocketContext';

import { BellIcon } from '@heroicons/react/24/outline';

import Logo from '../icons/Logo';
import ClientOnly from '../shared/ClientOnly';
import DesktopSearch from '../shared/DesktopSearch';
import DialogAnimated from './UserMenu';

const NotificationModal = dynamic(
    () =>
        import('./NotificationModal', {
            ssr: false,
        } as ImportCallOptions),
);

const Header = () => {
    const router = useRouter();
    const socketContext = useSocket();
    const setSideBarState = useSetAtom(sideBarState);
    const { data: session, status } = useSession();

    const [userMenu, setUserMenu] = useState(false);

    const handleUserMenu = () => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else {
            setUserMenu(true);
        }
    };

    return (
        <ClientOnly>
            <header className="absolute-center fixed top-0 left-0 z-[80] h-[70px] w-full bg-white bg-gradient-to-r text-gray-800 md:h-[85px]">
                <div className="w-max-[1300px] flex h-full w-[90%] items-center justify-between">
                    {/* mobile menu  */}
                    <button
                        onClick={() => setSideBarState(true)}
                        className="absolute-center mx-2 h-fit p-2 lg:hidden"
                    >
                        <HiMenuAlt2 className="h-8 w-8" />
                    </button>

                    {/* logo  */}
                    <Link href="/">
                        <a>
                            <figure className="absolute-center h-full">
                                <Logo style="md:w-32 md:h-32 w-24 h-24 fill-gray-600" />
                            </figure>
                        </a>
                    </Link>

                    {/* search  */}
                    <div className="relative z-50 mx-4 flex h-fit w-1/2 items-center justify-end space-x-4 text-gray-800">
                        <DesktopSearch />
                    </div>

                    {/* menu desktop & user  */}
                    <div className="flex h-full w-[25%] items-center justify-evenly lg:w-[40%]">
                        {/* menu  */}
                        <ul className="hidden font-secondary lg:flex lg:space-x-4 lg:text-xl  xl:space-x-8 xl:text-2xl">
                            {quickList.length &&
                                quickList.map((nvg) => {
                                    return (
                                        <li
                                            className="smooth-effect hover:text-blue-500"
                                            key={nvg.title}
                                        >
                                            <Link href={nvg.link}>
                                                <a>{nvg.title}</a>
                                            </Link>
                                        </li>
                                    );
                                })}
                        </ul>

                        {/* notification  */}
                        <div className="flex md:space-x-10">
                            <NotificationModal>
                                <button className="absolute-center relative mx-4 md:mx-0">
                                    <BellIcon className="h-9 w-9" />{' '}
                                    <If condition={socketContext?.ping}>
                                        <Then>
                                            <span className="absolute top-0 right-0 flex h-4 w-4">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
                                            </span>
                                        </Then>
                                    </If>
                                </button>
                            </NotificationModal>

                            {/* user */}
                            <DialogAnimated state={userMenu}>
                                <div
                                    onClick={handleUserMenu}
                                    className="absolute-center ml-4 h-16 w-16 rounded-full bg-white/40 bg-contain bg-center md:ml-0"
                                    style={{
                                        backgroundImage: `url(${
                                            session?.user?.image
                                                ? session?.user?.image
                                                : ''
                                        })`,
                                    }}
                                >
                                    {!session?.user?.image && (
                                        <BiUser className="h-3/4 w-3/4" />
                                    )}
                                </div>
                            </DialogAnimated>
                        </div>
                    </div>
                </div>
            </header>
        </ClientOnly>
    );
};

export default Header;
