import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { useDebounce, useEffectOnce } from 'usehooks-ts';
import marketSearch from '~/atoms/marketSearch';
import searchResult from '~/atoms/searchResult';
import { MARKET_URL } from '~/constants';
import useAxiosClient from '~/services/axiosClient';
import { handleTikiSearch } from '~/utils/handleMarketSearch';

interface SearchInputProps {
    styles?: string;
    focusOnMount?: boolean;
}

function SearchInput({ styles, focusOnMount }: SearchInputProps) {
    const [value, setValue] = useState('');
    const market = useAtomValue(marketSearch);
    const setResult = useSetAtom(searchResult);
    const axiosClient = useAxiosClient(MARKET_URL[market]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const debouncedValue = useDebounce<string>(value, 400);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        setResult([]);

        (async function () {
            try {
                switch (market) {
                    case 'tiki':
                        const { data: tikiData } = await axiosClient.get(
                            `/api/v2/products?limit=10&aggregations=2&q=${encodeURIComponent(
                                debouncedValue,
                            )}`,
                        );

                        const tikiResult = handleTikiSearch(tikiData?.data);

                        if (tikiResult?.length) {
                            setResult(tikiResult);
                        } else {
                            setResult([]);
                        }
                        break;

                    case 'lazada':
                    case 'shopee':
                    case 'all':
                        const { data } = await axiosClient.get(
                            `/products/search`,
                            {
                                params: {
                                    market: market,
                                    keyword: debouncedValue,
                                },
                            },
                        );

                        if (!data || !data?.products) {
                            setResult([]);
                            break;
                        }

                        if (market !== 'all' && data?.products?.length) {
                            setResult(
                                data?.products
                                    .map((item: any) => {
                                        return { ...item, market };
                                    })
                                    .slice(0, 10),
                            );
                            break;
                        }

                        const { tiki, lazada, shopee } = data?.products;

                        setResult([
                            ...tiki?.slice(0, 10).map((item: any) => ({
                                ...item,
                                market: 'tiki',
                            })),
                            ...lazada?.slice(0, 10).map((item: any) => ({
                                ...item,
                                market: 'lazada',
                            })),
                            ...shopee?.slice(0, 10).map((item: any) => ({
                                ...item,
                                market: 'shopee',
                            })),
                        ]);

                        break;

                    default:
                        setResult([]);
                }
            } catch (error) {
                console.error(error);
                setResult([]);
            }
        })();
    }, [debouncedValue, market]);

    useEffectOnce(() => {
        if (focusOnMount) {
            inputRef.current?.focus();
        }
    });

    return (
        <div className={styles}>
            <MagnifyingGlassIcon className="h-8 w-8" />

            <input
                onChange={handleChange}
                value={value}
                type="text"
                className="h-12 w-full"
                placeholder="Tìm kiếm sản phẩm..."
            />
        </div>
    );
}
export default memo(SearchInput);
