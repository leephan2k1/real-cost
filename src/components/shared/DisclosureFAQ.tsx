import { memo } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

interface DisclosureFAQProps {
    title: string;
    desc: string;
}

function DisclosureFAQ({ desc, title }: DisclosureFAQProps) {
    return (
        <div className="w-full px-4">
            <div className="w-full rounded-2xl bg-white p-2 md:w-3/4">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="smooth-effect flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-4xl font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                <h1 className="py-2 text-2xl">{title}</h1>
                                <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-8 w-8 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-2xl text-gray-500">
                                {desc}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}

export default memo(DisclosureFAQ);
