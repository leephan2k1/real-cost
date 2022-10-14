import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Fragment, memo, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { Else, If, Then } from 'react-if';
import { Market, Product } from 'types';
import SelectBox from '~/components/buttons/SelectBox';
import SelectMultiple from '~/components/buttons/SelectMultiple';
import { MARKET_URL } from '~/constants';
import useAxiosClient from '~/services/axiosClient';
import { handleSelectMultipleChannel } from '~/utils/arrayHandler';
import { convertPriceStringToNumber } from '~/utils/stringHandler';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const PriceForm = dynamic(
    () =>
        import('~/components/forms/PriceForm', {
            ssr: false,
        } as ImportCallOptions),
);

interface SubscribeProps {
    product: Product;
    shouldShow: boolean;
    handleToggle: (state: boolean) => void;
}

const priceConditionsMapping: { [key: string]: string } = {
    'Giá lên hoặc xuống': 'any',
    'Giá lên': 'gt',
    'Giá xuống': 'lt',
};

function Subscribe({ handleToggle, shouldShow, product }: SubscribeProps) {
    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );

    const { data: session, status } = useSession();

    const [conditions, setConditions] = useState<{
        notifyChannel: string;
        priceCondition: string;
        priceNeedToNotify: number;
    }>({
        notifyChannel: 'email',
        priceCondition: 'any',
        priceNeedToNotify: product?.price
            ? convertPriceStringToNumber(product?.price)
            : 0,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showInputPrice, setShowInputPrice] = useState(false);

    const handleClose = () => {
        setIsSubmitting(false);
        setShowInputPrice(false);
        handleToggle(false);
    };

    const handleSelectPriceCondition = (value: string) => {
        setShowInputPrice(value.toLocaleLowerCase() === 'tuỳ chọn');

        if (value.toLocaleLowerCase() === 'giá hiện tại') {
            setConditions((prevState) => ({
                ...prevState,
                priceNeedToNotify: convertPriceStringToNumber(product?.price),
            }));
        }
    };

    const handleFormPriceInput = (price: string) => {
        setConditions((prevState) => ({
            ...prevState,
            priceNeedToNotify: Number(price),
        }));
    };

    const handleSubmitSubscribeNotifcation = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { id } = session?.user;

        if (status === 'unauthenticated' || !id || !product) {
            toast.error('Có gì đó không đúng, thử lại sau nhé bạn!');
            return;
        }

        setIsSubmitting(true);

        try {
            const { data } = await axiosClient.post(`/users/${id}/subscribe`, {
                link: product.link,
                img: product.images[0],
                market: product.market,
                name: product.name,
                price: conditions.priceNeedToNotify,
                totalSales: product.totalSales,
                notifyChannel: conditions.notifyChannel,
                priceCondition: conditions.priceCondition,
            });

            if (data?.status === 'success') {
                handleClose();
                toast.success('Theo dõi giá sản phẩm thành công!');
            }
        } catch (error) {
            toast.error('Có gì đó không đúng, thử lại sau nhé bạn!');
        }
    };

    return (
        <>
            <Transition appear show={shouldShow} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[100]"
                    onClose={handleClose}
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
                                <Dialog.Panel className="smooth-effect flex h-fit w-[70vw] transform flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl lg:w-[50vw]">
                                    <div className="mb-8 flex items-center justify-between px-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="font-medium leading-6 text-gray-900 lg:text-5xl"
                                        >
                                            Nhận thông báo
                                        </Dialog.Title>

                                        <button
                                            onClick={handleClose}
                                            className="smooth-effect rounded-2xl border-[1px] border-gray-700 p-2 hover:bg-rose-400 hover:text-white"
                                        >
                                            <XMarkIcon className="h-8 w-8" />
                                        </button>
                                    </div>

                                    <div className="flex h-fit w-full flex-col space-y-6 px-6">
                                        <section className="flex flex-col space-y-4">
                                            <label className="text-3xl">
                                                Kênh thông báo:
                                            </label>
                                            <small className="italic">
                                                Khi chọn thông báo bằng trình
                                                duyệt, hãy nhớ bật{' '}
                                                <a
                                                    className="text-blue-400"
                                                    rel="noreferrer"
                                                    target="_blank"
                                                    href="https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DAndroid"
                                                >
                                                    quyền thông báo
                                                </a>{' '}
                                                trên trình duyệt cho Real Cost
                                                bạn nhé!
                                            </small>
                                            <button className="w-52">
                                                <SelectMultiple
                                                    options={[
                                                        'Email',
                                                        'Trình duyệt',
                                                    ]}
                                                    handleSelect={(
                                                        values: string[],
                                                    ) => {
                                                        setConditions(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                notifyChannel:
                                                                    handleSelectMultipleChannel(
                                                                        values,
                                                                    ),
                                                            }),
                                                        );
                                                    }}
                                                    defaultOption={['Email']}
                                                />
                                            </button>
                                        </section>

                                        <section className="flex flex-col space-y-4">
                                            <label className="text-3xl">
                                                Thông báo khi:
                                            </label>

                                            <button className="w-72">
                                                <SelectBox
                                                    handleSelect={(
                                                        value: string,
                                                    ) =>
                                                        setConditions(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                priceCondition:
                                                                    priceConditionsMapping[
                                                                        value
                                                                    ],
                                                            }),
                                                        )
                                                    }
                                                    options={[
                                                        'Giá lên hoặc xuống',
                                                        'Giá lên',
                                                        'Giá xuống',
                                                    ]}
                                                    defaultValue={
                                                        'Giá lên hoặc xuống'
                                                    }
                                                />
                                            </button>
                                        </section>

                                        <section className="flex flex-col space-y-4">
                                            <label className="text-3xl">
                                                Biến động giá tại:
                                            </label>

                                            <div className="flex space-x-4">
                                                <button className="w-64">
                                                    <SelectBox
                                                        handleSelect={
                                                            handleSelectPriceCondition
                                                        }
                                                        options={[
                                                            'Giá hiện tại',
                                                            'Tuỳ chọn',
                                                        ]}
                                                        defaultValue={
                                                            'Giá hiện tại'
                                                        }
                                                    />
                                                </button>
                                                {!showInputPrice && (
                                                    <h3 className="absolute-center">
                                                        {product?.price}
                                                    </h3>
                                                )}
                                            </div>
                                        </section>

                                        {showInputPrice && (
                                            <section className="flex flex-col space-y-4">
                                                <label className="text-3xl">
                                                    Tuỳ chọn:
                                                </label>

                                                <button className="w-full">
                                                    <PriceForm
                                                        handleSetValue={
                                                            handleFormPriceInput
                                                        }
                                                    />
                                                </button>
                                            </section>
                                        )}
                                    </div>

                                    <div className="my-4 flex w-full flex-row-reverse px-4">
                                        <button
                                            onClick={
                                                handleSubmitSubscribeNotifcation
                                            }
                                            disabled={isSubmitting}
                                            type="button"
                                            className="smooth-effect rounded-md border border-transparent bg-blue-100 px-6 py-2 text-3xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            <If condition={isSubmitting}>
                                                <Then>
                                                    <VscLoading className="h-8 w-8 animate-spin text-gray-700" />
                                                </Then>
                                                <Else>Lưu</Else>
                                            </If>
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default memo(Subscribe);
