import { useRouter } from 'next/router';
import { unique } from 'radash';
import { memo, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Market, SearchResult } from 'types';
import { useEventListener } from 'usehooks-ts';
import { MARKET_URL } from '~/constants';
import useAxiosClient from '~/services/axiosClient';
import ProductList from './ProductList';

function ItemContainer() {
    const router = useRouter();
    const [lastElem, setLastElem] = useState(false);
    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );

    const containerRef = useRef<HTMLDivElement | null>(null);

    const currentPage = useRef(1);
    const previousKeyword = useRef(String(router.query?.keyword) || '');
    const isReachingEnd = useRef(false);
    const [items, setItems] = useState<SearchResult[]>([]);

    const { data: resItems } = useSWR<SearchResult[]>(
        router.asPath + String(lastElem),
        async () => {
            const { keyword, market } = router.query;

            if (!keyword || !market) {
                return [];
            }

            const { data } = await axiosClient.get(`/products/search`, {
                params: { ...router.query, page: currentPage.current },
            });

            ++currentPage.current;

            if (!data || !data?.products) {
                return [];
            }

            if (Array.isArray(data?.products) && data?.products.length) {
                return data?.products.map((item: any) => {
                    return { ...item, market };
                });
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            let result = [];

            for (const [key, value] of Object.entries(data?.products)) {
                if (Array.isArray(value))
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    result = result.concat([
                        ...value?.slice(0, 10).map((item: any) => ({
                            ...item,
                            market: key,
                        })),
                    ]);
            }

            return result;
        },
    );

    // hook set result value:
    useEffect(() => {
        isReachingEnd.current =
            Array.isArray(resItems) && resItems.length === 0;

        if (previousKeyword.current !== String(router.query?.keyword)) {
            if (!containerRef.current) return;

            setItems(resItems?.length ? resItems : []);
            previousKeyword.current = String(router.query?.keyword);

            return;
        }

        if (resItems?.length) {
            setItems((prevItems) => {
                return unique(
                    prevItems.concat(unique(resItems, (itm) => itm.link)),
                    (item) => item.link,
                );
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resItems]);

    useEventListener('scroll', () => {
        if (!containerRef.current) return;

        const isNearBottom =
            containerRef.current?.clientHeight / window.scrollY < 1.25;

        if (lastElem !== isNearBottom) {
            setLastElem(isNearBottom);
        }
    });

    return (
        <section ref={containerRef} className="h-fit min-h-screen w-full py-10">
            <ProductList items={items} />
        </section>
    );
}

export default memo(ItemContainer);
