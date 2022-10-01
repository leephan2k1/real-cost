import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import SelectBox from '~/components/buttons/SelectBox';
import FsBanner from '~/components/shared/FsBanner';
import ItemContainer from '~/components/shared/ProductsContainer';
import ScrollTop from '~/components/shared/ScrollTop';
import SearchFilter from '~/components/shared/SearchFilter';
import Section from '~/components/shared/Section';

const FlashSalePage: NextPage = () => {
    const router = useRouter();

    useEffectOnce(() => {
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                market: 'tiki',
                searchType: 'flashSale',
            },
        });
    });

    const handleSelectMarket = useCallback(
        (value: string) => {
            const { market } = router.query;

            if (market === value) {
                return;
            }

            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        market: value,
                        searchType: 'flashSale',
                    },
                },
                undefined,
                { shallow: true, scroll: false },
            );
        },
        [router.query],
    );

    return (
        <ScrollTop>
            <div className="flex min-h-screen w-full flex-col pt-[100px]">
                <Section style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]">
                    <FsBanner />
                </Section>

                <Section style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]">
                    <SearchFilter>
                        <>
                            <div className="flex w-60 flex-col space-y-4">
                                <h3 className="font-secondary text-2xl md:text-3xl">
                                    Sàn thương mại
                                </h3>
                                <SelectBox
                                    defaultValue={'tiki'}
                                    handleSelect={handleSelectMarket}
                                    options={['tiki', 'shopee']}
                                />
                            </div>
                        </>
                    </SearchFilter>
                </Section>

                <Section style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]">
                    <ItemContainer />
                </Section>
            </div>
        </ScrollTop>
    );
};

export default FlashSalePage;