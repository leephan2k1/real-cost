import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import SelectBox from '~/components/buttons/SelectBox';
import SelectMultiple from '~/components/buttons/SelectMultiple';
import ItemContainer from '~/components/shared/ProductsContainer';
import ScrollTop from '~/components/shared/ScrollTop';
import SearchFilter from '~/components/shared/SearchFilter';
import { MARKET_OPTIONS, sort_mapping } from '~/constants';
import usePushQuery from '~/hooks/usePushQuery';
import { Toaster } from 'react-hot-toast';
import Head from '~/components/shared/Head';

const SearchPage: NextPage = () => {
    const router = useRouter();
    const qry = usePushQuery();

    const queryParams = useMemo(() => {
        const { market, sort } = router.query;

        return {
            market: market
                ? market === 'all'
                    ? MARKET_OPTIONS
                    : String(market).split('-')
                : ['tiki'],
            sort: sort ? String(sort) : 'Phổ biến',
        };
    }, [router]);

    const handleSelectMarkets = useCallback((values: string[]) => {
        if (values.length < 3) {
            qry.push('market', values.join('-'), false, false, true);
        } else {
            qry.push('market', 'all', false, false, true);
        }
    }, []);

    const handleSelectSort = useCallback((value: string) => {
        qry.push('sort', sort_mapping[value.toLowerCase()], false, false, true);
    }, []);

    return (
        <>
            <Head
                title={`Real Cost - ${router.query?.keyword || 'tìm kiếm'}`}
            />

            <ScrollTop>
                <Toaster position="bottom-right" />

                <div className="w-max-[1300px] mx-auto w-[90%] pt-[100px] text-black">
                    <SearchFilter>
                        <>
                            <div className="flex w-fit flex-col space-y-4">
                                <h3 className="font-secondary text-2xl md:text-3xl">
                                    Sàn thương mại:
                                </h3>
                                <SelectMultiple
                                    styles="py-4"
                                    handleSelect={handleSelectMarkets}
                                    options={MARKET_OPTIONS}
                                    defaultOption={queryParams.market}
                                />
                            </div>

                            <div className="flex w-fit min-w-[150px] flex-col space-y-4">
                                <h3 className="font-secondary text-2xl md:text-3xl">
                                    Bộ lọc:
                                </h3>
                                <SelectBox
                                    defaultValue={queryParams.sort}
                                    handleSelect={handleSelectSort}
                                    options={[
                                        'Phổ biến',
                                        'Giá cao đến thấp',
                                        'Giá thấp đến cao',
                                    ]}
                                />
                            </div>
                        </>
                    </SearchFilter>

                    <ItemContainer />
                </div>
            </ScrollTop>
        </>
    );
};

export default SearchPage;
