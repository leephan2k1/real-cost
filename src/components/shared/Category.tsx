import Link from 'next/link';
import Image from 'next/image';
import Slides from '~/components/shared/Slides';
import { CategoryItems } from '~/constants/index';

function Category() {
    return (
        <div className="relative top-2 mx-auto max-w-[1170px]">
            <div className="absolute-center smooth-effect flex w-full flex-col overflow-hidden font-primary sm:top-10 lg:top-16">
                <div className="absolute-center flex w-full flex-wrap px-4">
                    <Slides>
                        {CategoryItems?.map((item, index) => {
                            return (
                                <div
                                    className=" flex flex-0 flex-col "
                                    key={index}
                                >
                                    {item.map((value) => {
                                        return (
                                            <Link
                                                href={`${
                                                    value.href
                                                }&keyword=${encodeURIComponent(
                                                    value.title,
                                                )}`}
                                                key={value.id}
                                            >
                                                <div className="smooth-effect z-20 flex-0 cursor-pointer  hover:-translate-y-1 ">
                                                    <div className="z-100 absolute-center relative my-3 block h-52 flex-col  rounded-2xl border-[1px] border-black bg-white text-center hover:bg-white">
                                                        <div
                                                            className="absolute top-2 -z-10 h-full w-full rounded-2xl border-[1px] border-gray-700 "
                                                            style={{
                                                                backgroundColor:
                                                                    value.bgColor,
                                                            }}
                                                        ></div>

                                                        <Image
                                                            src={value?.img}
                                                            alt=""
                                                            width={80}
                                                            height={80}
                                                        />
                                                        <span className="z-100 my-1 text-[1.7rem]">
                                                            {value.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </Slides>
                </div>
            </div>
        </div>
    );
}

export default Category;
