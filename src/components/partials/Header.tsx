import { useSetAtom, useAtom } from 'jotai';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { HiMenuAlt2 } from 'react-icons/hi';
import mobileSearchState from '~/atoms/mobileSearchState';
import sideBarState from '~/atoms/sideBarState';
import SearchInput from '~/components/shared/SearchInput';
import { quickList } from '~/constants';
import SearchResults from '../shared/SearchResults';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import searchMarket from '~/atoms/marketSearch';
import { Market } from 'types';
import { useMediaQuery } from 'usehooks-ts';
import ListBoxButton from '../buttons/ListBoxButton';
import Logo from '../icons/Logo';
import ClientOnly from '../shared/ClientOnly';

const Header = () => {
    const setSideBarState = useSetAtom(sideBarState);
    const [market, setMarket] = useAtom(searchMarket);
    const matchesMediumScreen = useMediaQuery('(min-width: 768px)');
    const setSearchModalState = useSetAtom(mobileSearchState);

    const handleSelect = (value: string) => {
        const market = value.toLowerCase();

        setMarket(market === 'tất cả' ? ('all' as Market) : (market as Market));
    };

    return (
        <ClientOnly>
            <header className="absolute-center fixed top-0 left-0 z-[80] h-[70px] w-full bg-gradient-to-r from-black/70 to-[#313132] text-white md:h-[85px]">
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
                    <div className="relative z-50 mx-4 flex h-fit w-1/2 items-center justify-end space-x-4 text-gray-800">
                        {/* search options (medium screen)  */}
                        <div className="relative hidden h-full flex-1 items-center justify-end md:flex md:justify-center lg:justify-end">
                            <ListBoxButton
                                options={['tiki', 'lazada', 'shopee', 'tất cả']}
                                defaultOption={
                                    market === 'all' ? 'tất cả' : market
                                }
                                style="bg-white w-full p-2 rounded-lg focus:ring-2 focus:ring-gray-700 text-lg lg:text-2xl"
                                handleSelect={handleSelect}
                            />
                        </div>

                        {/* mobile search button  */}
                        <button
                            onClick={() => setSearchModalState(true)}
                            className="absolute-center rounded-xl bg-white p-3 shadow-lg md:hidden"
                        >
                            <MagnifyingGlassIcon className="h-8 w-8" />
                        </button>

                        <div className="relative hidden h-full w-4/5 md:block">
                            <div className="full-size absolute top-2 left-2 -z-10 rounded-xl border-2 border-dashed border-white"></div>
                            <SearchInput styles="z-[60] hidden items-center space-x-2 overflow-hidden rounded-xl bg-white p-2 shadow-xl md:flex" />
                        </div>

                        {matchesMediumScreen && (
                            <SearchResults styles="absolute top-[105%] hidden h-fit max-h-[400px] w-full bg-white shadow-xl" />
                        )}
                    </div>

                    {/* menu desktop & user  */}
                    <div className="flex h-full w-[25%] items-center justify-evenly lg:w-[40%]">
                        {/* menu  */}
                        <ul className="hidden font-secondary font-light lg:flex lg:space-x-4 lg:text-xl  xl:space-x-8 xl:text-2xl">
                            {quickList.length &&
                                quickList.map((nvg) => {
                                    return (
                                        <li
                                            className="smooth-effect hover:text-gray-300"
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
        </ClientOnly>
    );
};

export default Header;
