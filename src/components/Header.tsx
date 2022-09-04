import Image from 'next/image';
import {
    Bars3Icon,
    UserCircleIcon,
    BellAlertIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <main>
            <div className="lg:h-[13rem] fixed z-0 flex w-full bg-indigo-500 sm:h-[17rem] md:h-[190px]">
                <Bars3Icon className="lg:hidden absolute cursor-pointer stroke-white sm:left-8 sm:top-16 sm:w-16 md:top-20 md:left-12 md:w-20" />

                <UserCircleIcon className="lg:hidden absolute cursor-pointer stroke-white sm:right-8 sm:top-16 sm:w-16 md:top-20 md:right-12 md:w-20" />
                <div className="sm:absolute-left-center lg:left-40 lg:bottom-[1rem] lg:h-48 lg:w-[220px] absolute items-center px-20 pb-8 sm:h-24 sm:w-[200px] md:w-[220px]">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={140}
                        height={140}
                        className="cursor-pointer"
                    />
                </div>
                <div className="sm:absolute-left-center lg:left-80 lg:top-1/2 lg:flex lg:w-[45%] lg:-translate-y-1/2 lg:translate-x-0 lg:items-center absolute flex sm:bottom-10 sm:left-5 sm:w-[90%] md:w-[85%]">
                    <div className="lg:w-[18%] flex h-16 cursor-pointer rounded-tl-3xl rounded-bl-3xl bg-slate-800 sm:w-[25%]"></div>
                    <input
                        type="text"
                        placeholder="Search something"
                        className="lg:w-[82%] h-16 rounded-tr-3xl rounded-br-3xl pl-3 outline-0 sm:w-[75%]"
                    />
                </div>
                <div className="flex w-full justify-end ">
                    <div className="lg:absolute-center lg:w-40 text-white sm:hidden">
                        <span className="cursor-pointer hover:text-rose-500">
                            Something
                        </span>
                    </div>
                    <div className="lg:absolute-center lg:w-40 text-white sm:hidden">
                        <span className="cursor-pointer hover:text-rose-500">
                            Something
                        </span>
                    </div>
                    <div className="lg:absolute-center lg:w-40 text-white sm:hidden">
                        <span className="cursor-pointer hover:text-rose-500">
                            Something
                        </span>
                    </div>
                    <BellAlertIcon className="lg:absolute-center lg:mx-6 lg:w-12 cursor-pointer text-white hover:text-rose-500 sm:hidden">
                        <Image
                            src="/alert_icon.svg"
                            alt="Logo"
                            width={30}
                            height={30}
                            className="cursor-pointer  hover:text-rose-500"
                        />
                    </BellAlertIcon>
                    <UserCircleIcon className="lg:absolute-center lg:mr-12 lg:ml-4 lg:w-20 cursor-pointer text-white hover:text-rose-500 sm:hidden" />
                </div>
            </div>
        </main>
    );
};

export default Header;
