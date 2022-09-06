import { NextPage } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';

const LogIn: NextPage = () => {
    return (
        <div id="login-page" className="relative h-screen">
            <div className="absolute-screen-center content-center font-primary">
                <div className="page sm:w-[960px] md:w-[1600px]">
                    <div className="con sm:-top-20">
                        <div className="box">
                            <span className="flex-center h-56 font-secondary  sm:text-5xl md:text-7xl">
                                Đăng nhập
                            </span>
                            <div className="absolute-screen-center h-[160px] ">
                                <button className="decoration-3 absolute-left-center top-12 flex h-24 rounded-[50px] border-2 border-black bg-sky-300 p-3 hover:bg-sky-200 sm:top-6 sm:w-[250px] md:w-[420px]">
                                    <div className="absolute -left-1.5 w-[70px] sm:-top-1">
                                        <Image
                                            src="/fb_icon.svg"
                                            alt="Facebook Icon"
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                    <span className="flex-center w-full py-3 decoration-4 sm:pl-[4.7rem] sm:text-3xl md:pl-8 md:text-4xl">
                                        Tiếp tục với Facebook
                                    </span>
                                </button>

                                <button className="decoration-3 absolute-left-center top-[125px] flex h-24  rounded-[50px] border-2 border-black bg-yellow-300 p-3 hover:bg-yellow-200 sm:top-36 sm:w-[250px] md:w-[420px]">
                                    <div className="absolute -left-1.5 w-[70px] sm:top-0.5">
                                        <Image
                                            src="/gg_icon.svg"
                                            alt="Facebook Icon"
                                            width={54}
                                            height={54}
                                        />
                                    </div>

                                    <span className="flex-center w-full py-3 decoration-4 sm:pl-[4.7rem] sm:text-3xl md:pl-8 md:text-4xl">
                                        Tiếp tục với Google
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="absolute-left-center -bottom-24 text-justify text-3xl sm:-bottom-20 sm:w-96 md:-bottom-6 md:w-[700px]">
                    Tiếp tục đồng nghĩa với việc bạn ĐỒNG Ý với&nbsp;
                    <span className="cursor-pointer underline hover:text-red-500">
                        Điều khoản dịch vụ
                    </span>{' '}
                    của chúng tôi
                </span>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
LogIn.getLayout = (page: ReactNode) => page;

export default LogIn;
