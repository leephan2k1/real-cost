import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment, memo, useEffect, useState } from 'react';
import analysisModalState from '~/atoms/analysisModal';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { If, Then } from 'react-if';
import { useRouter } from 'next/router';
import { PRODUCTS_PATH, MARKET_OPTIONS } from '~/constants';

function Analysis() {
    const router = useRouter();
    const [rawText, setRawText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidURL, setIsValidURL] = useState(true);

    const [isOpen, setIsOpen] = useAtom(analysisModalState);

    function closeModal() {
        setIsOpen(false);
        setRawText('');
        setIsValidURL(false);
        setIsLoading(false);
    }

    const checkValidURL = (url: string) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$',
            'i',
        ); // validate fragment locator

        return !!urlPattern.test(url);
    };

    const handleGetContentClipboard = async () => {
        try {
            const text = await navigator.clipboard?.readText();

            if (text) {
                setRawText(text);
            }

            if (!checkValidURL(text)) {
                setIsValidURL(checkValidURL(text));
                return;
            }
        } catch (error) {
            alert(
                'Firefox hoặc trình duyệt bạn đang dùng không hỗ trợ dán link, Hãy dán THỦ CÔNG vào ô nhập liệu bên cạnh!',
            );
        }
    };

    useEffect(() => {
        const arrPath = rawText.split('/');
        const productPath = [...arrPath].pop();

        const marketInLink = MARKET_OPTIONS.find((market) => {
            return arrPath.some((path) => path.includes(market));
        });

        if (marketInLink) {
            router.push(`/${PRODUCTS_PATH}/${marketInLink}/${productPath}`);
        }

        const handleRouteChangeStart = () => {
            setIsLoading(true);
        };

        const handleRouteChangeComplete = () => {
            setIsLoading(false);
            closeModal();
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [rawText]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[500]" onClose={closeModal}>
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
                            <Dialog.Panel className="h-[30vh] w-[70vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:h-[35vh] md:w-[50vw]">
                                <Dialog.Title
                                    as="h3"
                                    className="text-4xl font-medium leading-6 text-gray-900 md:text-5xl"
                                >
                                    Phân tích giá sản phẩm
                                </Dialog.Title>
                                <div className="my-4">
                                    <p className="text-xl italic text-gray-500">
                                        Dán link của sản phẩm vào ô bên dưới (Hỗ
                                        trợ: Tiki, Lazada, Shopee)
                                    </p>
                                </div>

                                <div className="absolute-center mt-10 flex w-full">
                                    <input
                                        onFocus={() => setIsValidURL(true)}
                                        onChange={(e) => {
                                            setRawText(e.currentTarget.value);
                                        }}
                                        type="text"
                                        className="w-3/4 rounded-xl bg-gray-200 py-2 px-4"
                                        required
                                        value={rawText}
                                    />

                                    <button
                                        onClick={handleGetContentClipboard}
                                        className="absolute-center smooth-effect mx-4 space-x-2 rounded-xl border border-gray-700 p-2 text-gray-700 hover:scale-110"
                                    >
                                        <ClipboardIcon className="h-8 w-8" />
                                        <span>Dán</span>
                                    </button>
                                </div>

                                <If condition={!isValidURL}>
                                    <Then>
                                        <p className="my-4 text-rose-400">
                                            Đường dẫn không hợp lệ! Vui cái lòng
                                            kiểm tra lại
                                        </p>
                                    </Then>
                                </If>

                                <If condition={isLoading}>
                                    <Then>
                                        <div className="absolute-center my-4 mx-auto w-3/4 flex-col space-y-4 py-4">
                                            <p>Đang chuyển hướng</p>
                                            <span className="dot-flashing"></span>
                                        </div>
                                    </Then>
                                </If>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(Analysis);
