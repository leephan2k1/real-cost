import type { NextPage, GetStaticProps } from 'next';
import { Toaster } from 'react-hot-toast';
import { If, Then } from 'react-if';
import { BcSuggestion } from 'types';
import Banner from '~/components/partials/Banner';
import SearchTrends from '~/components/shared/SearchTrends';
import Section from '~/components/shared/Section';
import { BC_BASE_API, BC_URL } from '~/constants';
import { getAxiosClient } from '~/utils/axios';

interface HomeProps {
    suggestion_list: BcSuggestion[];
}

const Home: NextPage<HomeProps> = ({ suggestion_list }) => {
    return (
        <>
            <Toaster position="bottom-right" />

            <div className="flex h-fit min-h-screen flex-col text-gray-700">
                <Section style="z-[60] h-[600px] w-full bg-[url('https://i.ibb.co/7S4dW19/v904-nunny-012-min.jpg')] bg-cover bg-center bg-no-repeat pt-[130px] pb-[100px] text-gray-700">
                    <Banner />
                </Section>

                <If condition={suggestion_list && suggestion_list?.length}>
                    <Then>
                        <Section
                            style="my-10 w-max-[1300px] mx-auto w-[90%]"
                            title="Xu hướng tìm kiếm"
                        >
                            <SearchTrends suggestion_list={suggestion_list} />
                        </Section>
                    </Then>
                </If>
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
