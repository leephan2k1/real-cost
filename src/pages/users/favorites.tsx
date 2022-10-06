import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Market, SearchResult } from 'types';
import ProductList from '~/components/shared/ProductList';
import Section from '~/components/shared/Section';
import { MARKET_URL } from '~/constants';
import useAxiosClient from '~/services/axiosClient';
import ScrollTop from '~/components/shared/ScrollTop';

const FavoritesPage: NextPage = () => {
    const { data: session } = useSession();

    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );

    const { data: favoriteItems, isValidating } = useSWR<{
        _id: string;
        favorite_products: SearchResult[];
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

    return (
        <ScrollTop>
            <div className="min-h-screen w-full pt-[100px]">
                <Section
                    title="Sản phẩm đã yêu thích"
                    style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
                >
                    <ProductList
                        isFetching={isValidating}
                        items={favoriteItems?.favorite_products || []}
                        isReachingEnd
                        endMessage={' '}
                    />
                </Section>
            </div>
        </ScrollTop>
    );
};

export default FavoritesPage;
