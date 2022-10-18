import type { NextPage, GetStaticProps } from 'next';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { If, Then } from 'react-if';
import { ItemsWithKeyword, Market, ProductPreview } from 'types';
import ScrollTop from '~/components/shared/ScrollTop';
import Section from '~/components/shared/Section';
import SuggestionSection from '~/components/shared/SuggestionSection';
import { MARKET_URL } from '~/constants';
import { getSuggestionKeyword as bcGetSuggestionKeyword } from '~/serverless/models/Bc.model';
import { getSuggestionKeyword as tkGetSuggestionKeyword } from '~/serverless/models/Tiki.model';
import Head from '~/components/shared/Head';

interface BrowsePageProps {
    itemsWithKeyword: ItemsWithKeyword[];
}

const BrowsePage: NextPage<BrowsePageProps> = ({ itemsWithKeyword }) => {
    return (
        <>
            <Head
                title="Real Cost - Lướt xem sản phẩm"
                image="https://i.ibb.co/jJZ6czH/real-cost-browse-min.png"
            />

            <ScrollTop>
                <Toaster position="bottom-right" />

                <div className="min-h-screen w-full pt-[100px]">
                    <Section
                        title="Gợi ý hôm nay"
                        style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
                    >
                        <If
                            condition={
                                itemsWithKeyword && itemsWithKeyword?.length
                            }
                        >
                            <Then>
                                {itemsWithKeyword.map((list, index) => {
                                    return (
                                        <SuggestionSection
                                            itemsWithKeyword={list}
                                            index={index}
                                            key={list.keyword}
                                        />
                                    );
                                })}
                            </Then>
                        </If>
                    </Section>
                </div>
            </ScrollTop>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const BASE_URL = MARKET_URL('ecommerce-tracking-server' as Market);

    const [tkSugesstion, bcSugesstion] = await Promise.allSettled([
        tkGetSuggestionKeyword().then((result) => result),
        bcGetSuggestionKeyword().then((result) => result),
    ]);

    const environment = process.env.NODE_ENV || 'development';

    const keywords =
        environment !== 'development'
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              [...tkSugesstion?.value, ...bcSugesstion?.value]
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              [...tkSugesstion?.value, ...bcSugesstion?.value].slice(0, 2);

    const combineData = await Promise.allSettled(
        keywords.map(async (kw: string) => {
            let items: ProductPreview[] = [];

            try {
                const { data } = await axios.get(
                    `${BASE_URL}/products/search`,
                    {
                        params: {
                            market: 'all',
                            keyword: kw,
                        },
                    },
                );

                for (const [key, value] of Object.entries(data?.products)) {
                    if (Array.isArray(value))
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        items = items.concat([
                            ...value?.slice(0, 10).map((item: any) => ({
                                ...item,
                                market: key,
                            })),
                        ]);
                }

                return { keyword: kw, items };
            } catch (error) {
                console.error('error::: ', error);
                return [];
            }
        }),
    );

    return {
        props: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            itemsWithKeyword: combineData.map((e) => e?.value),
        },
    };
};

export default BrowsePage;
