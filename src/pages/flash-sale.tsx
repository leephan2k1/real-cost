import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { useEffectOnce } from 'usehooks-ts';
import SelectBox from '~/components/buttons/SelectBox';
import FsBanner from '~/components/shared/FsBanner';
import ItemContainer from '~/components/shared/ProductsContainer';
import ScrollTop from '~/components/shared/ScrollTop';
import SearchFilter from '~/components/shared/SearchFilter';
import Section from '~/components/shared/Section';
import Head from '~/components/shared/Head';

const FlashSalePage: NextPage = () => {
    const router = useRouter();

    const queryParams = useMemo(() => {
        const { market } = router.query;

        return {
            market: market ? String(market) : 'tiki',
        };
    }, [router]);

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
        <>
            <Head
                title="Real Cost - Flash-sale"
                description="Săn flash-sale với Real Cost"
                image="https://i.ibb.co/vX1QVm1/real-cost-flash-sale-min.png"
            />

            <ScrollTop>
                <Toaster position="bottom-right" />

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
                                        defaultValue={queryParams.market}
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
        </>
    );
};

export default FlashSalePage;
