import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSWR from 'swr';
import { Market, ProductPreview } from 'types';
import ProductList from '~/components/shared/ProductList';
import ScrollTop from '~/components/shared/ScrollTop';
import Section from '~/components/shared/Section';
import { MARKET_URL } from '~/constants';
import { ProductContextProvider } from '~/context/ProductContext';
import useAxiosClient from '~/services/axiosClient';
import Head from '~/components/shared/Head';

const ConfirmModal = dynamic(() => import('~/components/shared/ConfirmModal'));

const FavoritesPage: NextPage = () => {
    const { data: session, status } = useSession();

    const [confirmModalState, setConfirmModalState] = useState(false);

    const [items, setItems] = useState<ProductPreview[]>([]);

    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );

    const {
        data: favoriteItems,
        isValidating,
        mutate,
    } = useSWR<{
        _id: string;
        favorite_products: ProductPreview[];
    }>(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `/users/${session?.user?.id}/favorite`,
        async (slug) => {
            const { data } = await axiosClient.get(slug);

            if (data?.status === 'success') {
                return data?.user;
            }
        },
    );

    useEffect(() => {
        if (favoriteItems) {
            favoriteItems?.favorite_products &&
                setItems(
                    Array.from(favoriteItems?.favorite_products).reverse(),
                );
        }
    }, [favoriteItems]);

    const handleConfirmModal = (state: boolean) => {
        setConfirmModalState(state);
    };

    const removeProduct = useCallback(
        async (removeMode: 'single' | 'multiple' | 'deny', link?: string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (status === 'unauthenticated' || !session?.user?.id) return;

            if (removeMode === 'deny') {
                return;
            }

            // Optimistic UI (remove ASAP in the UI)
            toast.success('Xoá sản phẩm thành công');

            if (removeMode === 'multiple') {
                setItems([]);
            } else {
                setItems((prevItems) =>
                    prevItems.filter((item) => item.link !== link),
                );
            }

            try {
                await axiosClient.delete(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    `/users/${session?.user.id}/favorite`,
                    {
                        data: {
                            link:
                                removeMode === 'multiple' ? 'remove-all' : link,
                        },
                    },
                );
            } catch (error) {
                toast.error('Không thành công! Xin hãy thử lại sau');

                // restore item(s)
                // handle steps: mutate (fetchAPI) -> all items will be set again
                mutate();
            }
        },
        [items],
    );

    return (
        <>
            <Head title="Real Cost - Sản phẩm yêu thích" />

            <ScrollTop>
                <Toaster position="bottom-center" />

                <ConfirmModal
                    isOpen={confirmModalState}
                    setOpen={handleConfirmModal}
                    removeAction={removeProduct}
                />

                <ProductContextProvider value={{ removeProduct }}>
                    <div className="min-h-screen w-full pt-[100px]">
                        <Section
                            title="Sản phẩm đã yêu thích"
                            style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
                        >
                            <button
                                onClick={() => {
                                    handleConfirmModal(true);
                                }}
                                className="smooth-effect my-2 rounded-xl border-[1px] border-rose-500 px-4 py-2 hover:scale-110 hover:bg-rose-400 hover:text-white"
                            >
                                Xoá tất cả
                            </button>

                            <div className="full-size py-4">
                                <ProductList
                                    isFavoriteProduct
                                    isFetching={isValidating}
                                    items={items}
                                    isReachingEnd
                                    endMessage={' '}
                                    emptyArrayMessage={
                                        'Bạn chưa có sản phẩm nào yêu thích!'
                                    }
                                />
                            </div>
                        </Section>
                    </div>
                </ProductContextProvider>
            </ScrollTop>
        </>
    );
};

export default FavoritesPage;
