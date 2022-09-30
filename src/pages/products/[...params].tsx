import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Else, If, Then } from 'react-if';
import { ItemHistory, Product } from 'types';
import ProductChart from '~/components/shared/ProductChart';
import ProductDescription from '~/components/shared/ProductDescription';
import ProductHead from '~/components/shared/ProductHead';
import Section from '~/components/shared/Section';
import {
    getHistoryPrice,
    getProductDetails as bcGetProductDetails,
} from '~/serverless/models/Bc.model';
import { getProductDetails as tkGetProductDetails } from '~/serverless/models/Tiki.model';

interface DetailsPageProps {
    product: Product;
    productPriceHistory: ItemHistory | null;
}

const DetailsPage: NextPage<DetailsPageProps> = ({
    product,
    productPriceHistory,
}) => {
    return (
        <div className="min-h-screen w-full pt-[100px]">
            <Section style="w-max-[1300px] h-fit mx-auto w-[90%]">
                <ProductHead product={product} />
            </Section>

            <Section
                title="Lịch sử giá"
                style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
            >
                <If condition={!!productPriceHistory}>
                    <Then>
                        <ProductChart
                            productName={product?.name}
                            itemHistory={productPriceHistory as ItemHistory}
                        />
                    </Then>

                    <Else>
                        <h3 className="mx-auto">
                            Sản phẩm hiện tại chưa có lịch sử giá
                        </h3>
                    </Else>
                </If>
            </Section>

            <Section
                title="Mô tả"
                style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
            >
                <ProductDescription description={product?.description} />
            </Section>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [market, ...url] = params?.params;

    let product: Product | null;

    switch (market) {
        case 'tiki':
            product = await tkGetProductDetails(url.join('/'));
            break;
        case 'shopee':
        case 'lazada':
            product = await bcGetProductDetails(market, url.join('/'));
            break;
        default:
            return { notFound: true };
    }

    const priceHistory = await getHistoryPrice(product?.product_base_id);

    if (product) {
        return {
            props: {
                product,
                productPriceHistory: priceHistory,
            },
            revalidate: 60 * 60 * 12, //12h
        };
    }

    return { notFound: true };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true };
};

export default DetailsPage;