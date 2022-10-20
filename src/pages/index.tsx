import type { NextPage, GetStaticProps } from 'next';
import { Toaster } from 'react-hot-toast';
import { If, Then } from 'react-if';
import useSwr from 'swr';
import { BcSuggestion, ProductPreview } from 'types';
import Banner from '~/components/partials/Banner';
import Category from '~/components/shared/Category';
import SearchTrends from '~/components/shared/SearchTrends';
import Section from '~/components/shared/Section';
import Slides from '~/components/shared/Slides';
import { BC_BASE_API, BC_URL, BASE_URL } from '~/constants';
import { getAxiosClient } from '~/utils/axios';
import ProductCard from '~/components/shared/ProductCard';
import Head from '~/components/shared/Head';

interface HomeProps {
    suggestion_list: BcSuggestion[];
}

const axiosClient = getAxiosClient(BASE_URL, BASE_URL, BASE_URL);

const Home: NextPage<HomeProps> = ({ suggestion_list }) => {
    const { data: recentlyVoteList } = useSwr<ProductPreview[]>(
        `/products/recently-vote`,
        async (slug) => {
            const { data } = await axiosClient.get(slug);

            return data?.products;
        },
    );

    return (
        <>
            <Head />

            <Toaster position="bottom-right" />

            <div className="flex h-fit min-h-screen flex-col text-gray-700">
                <Section style="z-[60] h-[600px] w-full bg-[url('https://i.ibb.co/7S4dW19/v904-nunny-012-min.jpg')] bg-cover bg-center bg-no-repeat pt-[130px] pb-[100px] text-gray-700">
                    <Banner />
                </Section>

                <If condition={suggestion_list && suggestion_list?.length}>
                    <Then>
                        <Section
                            style="my-10 mx-auto max-w-[1300px] w-[90%]"
                            title="Xu hướng tìm kiếm"
                        >
                            <SearchTrends suggestion_list={suggestion_list} />
                        </Section>
                    </Then>
                </If>

                <If condition={recentlyVoteList && recentlyVoteList.length}>
                    <Then>
                        <Section
                            style="mx-auto w-[90%] max-w-[1300px]"
                            title="Người dùng Real Cost vừa bình chọn"
                        >
                            <Slides>
                                {recentlyVoteList?.map((prod) => {
                                    return (
                                        <ProductCard
                                            product={prod}
                                            key={prod.link}
                                        />
                                    );
                                })}
                            </Slides>
                        </Section>
                    </Then>
                </If>

                <Section
                    style="mx-auto w-[90%] mb-12 mt-6 max-w-[1300px]"
                    title="Danh mục"
                >
                    <Category />
                </Section>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const axiosClient = getAxiosClient(BC_URL, BC_URL, BC_BASE_API);

    try {
        const { data } = await axiosClient.get(
            `/query/suggestion_homepage?limit=30`,
        );

        return {
            props: {
                suggestion_list: data?.data?.lst_query,
            },
            revalidate: 6 * 60 * 60, // 6h
        };
    } catch (error) {
        return { props: { suggestion_list: [] } };
    }
};

export default Home;
