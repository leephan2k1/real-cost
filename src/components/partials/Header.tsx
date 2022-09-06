import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { HiMenuAlt2 } from 'react-icons/hi';
import ListBoxButton from '../buttons/ListBoxButton';
import Logo from '../icons/Logo';
import Input from '../shared/Input';
import sideBarState from '~/atoms/sideBarState';
import { useSetAtom } from 'jotai';
import { quickList } from '~/constants';

const Header = () => {
    const setSideBarState = useSetAtom(sideBarState);

    const handleSelect = (value: string) => {
        // not completed
        console.error(value);
    };

    return (
        <header className="absolute-center fixed top-0 left-0 z-[500] h-[75px] w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white md:h-[90px]">
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
                            <Logo style="md:w-32 md:h-32 w-24 h-24 fill-white" />
                        </figure>
                    </a>
                </Link>

                {/* search  */}
                <div className="z-50 mx-4 flex h-fit w-1/2 items-center justify-end space-x-4 text-gray-800">
                    {/* search options (medium screen)  */}
                    <div className="relative hidden h-full flex-1 items-center justify-end md:flex md:justify-center lg:justify-end">
                        <ListBoxButton
                            options={['Tất cả', 'Lazada', 'Tiki', 'Shopee']}
                            defaultOption="Lazada"
                            style="bg-white w-32 p-2 rounded-lg focus:ring-4 focus:ring-blue-500"
                            handleSelect={handleSelect}
                        />
                    </div>

                    <button className="absolute-center rounded-xl bg-white p-3 shadow-lg md:hidden">
                        <MagnifyingGlassIcon className="h-8 w-8" />
                    </button>

                    <div className="hidden h-full w-3/4 items-center space-x-2 overflow-hidden rounded-xl bg-white p-2 shadow-xl md:flex">
                        <MagnifyingGlassIcon className="h-8 w-8" />
                        <Input
                            placeHolder="Tìm kiếm sản phẩm..."
                            style="h-12 w-full"
                            type="text"
                        />
                    </div>
                </div>

                {/* menu desktop & user  */}
                <div className="flex h-full w-[25%] items-center justify-evenly lg:w-1/2">
                    {/* menu  */}
                    <ul className="hidden font-secondary lg:flex lg:space-x-4 lg:text-2xl xl:space-x-6 xl:text-3xl">
                        {quickList.length &&
                            quickList.map((nvg) => {
                                return (
                                    <li key={nvg.title}>
                                        <Link href={nvg.link}>
                                            <a>Xu hướng</a>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>

                    {/* notification  */}
                    <button className="absolute-center mx-4 md:mx-0">
                        <BellIcon className="h-9 w-9" />
                    </button>

                    {/* user */}
                    <Link href="/login">
                        <a>
                            <button className="absolute-center ml-4 h-16 w-16 rounded-full bg-white/40 md:ml-0">
                                <BiUser className="h-3/4 w-3/4" />
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
