import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Section from '~/components/shared/Section';
import ProductHead from '~/components/shared/ProductHead';
import ProductDescription from '~/components/shared/ProductDescription';

const DetailsPage: NextPage = () => {
    return (
        <div className="min-h-screen w-full pt-[100px]">
            <Section style="w-max-[1300px] h-fit mx-auto w-[90%]">
                <ProductHead />
            </Section>

            <Section
                title="Mô tả"
                style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
            >
                <ProductDescription />
            </Section>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            data: [],
        },
    };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true };
};

export default DetailsPage;
