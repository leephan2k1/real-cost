import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Toaster } from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import { ItemHistory, Product, ProductPreview } from 'types';
import Voting from '~/components/features/Voting';
import Head from '~/components/shared/Head';
import ProductChart from '~/components/shared/ProductChart';
import ProductDescription from '~/components/shared/ProductDescription';
import ProductHead from '~/components/shared/ProductHead';
import ScrollTop from '~/components/shared/ScrollTop';
import Section from '~/components/shared/Section';
import {
    getHistoryPrice,
    getRelatedProducts,
    getProductDetails as bcGetProductDetails,
} from '~/serverless/models/Bc.model';
import { getProductDetails as tkGetProductDetails } from '~/serverless/models/Tiki.model';
import Slides from '~/components/shared/Slides';
import ProductCard from '~/components/shared/ProductCard';

interface DetailsPageProps {
    product: Product;
    relatedProducts?: ProductPreview[];
    productPriceHistory: ItemHistory | null;
}

const DetailsPage: NextPage<DetailsPageProps> = ({
    product,
    relatedProducts,
    productPriceHistory,
}) => {
    return (
        <>
            <Head
                title={`Real Cost ${product?.name && `- ${product?.name}`}`}
                image={
                    (product &&
                        product?.images?.length &&
                        product?.images[0]) ||
                    'https://i.ibb.co/HPNrGZF/real-cost-homepage-min.png'
                }
            />

            <ScrollTop>
                <div className="min-h-screen w-full pt-[100px]">
                    <Toaster position="bottom-center" />

                    <Section style="w-max-[1300px] h-fit mx-auto w-[90%]">
                        <ProductHead product={product} />
                    </Section>

                    {relatedProducts && relatedProducts.length > 0 && (
                        <Section
                            title="Sản phẩm tương tự"
                            style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
                        >
                            <Slides>
                                {relatedProducts.map((product) => {
                                    return (
                                        <ProductCard
                                            key={product.link}
                                            product={product}
                                        />
                                    );
                                })}
                            </Slides>
                        </Section>
                    )}

                    <Section
                        title="Người dùng Real Cost bình chọn"
                        style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
                    >
                        <Voting product={product} />
                    </Section>

                    <Section
                        title="Lịch sử giá"
                        style="my-10 w-max-[1300px] h-fit mx-auto w-[90%]"
                    >
                        <If condition={!!productPriceHistory}>
                            <Then>
                                <ProductChart
                                    productName={product?.name}
                                    itemHistory={
                                        productPriceHistory as ItemHistory
                                    }
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
                        <ProductDescription
                            description={product?.description}
                        />
                    </Section>
                </div>
            </ScrollTop>
        </>
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

    const relatedProducts = await getRelatedProducts(
        String(product?.product_base_id),
    );

    if (product) {
        return {
            props: {
                product,
                relatedProducts,
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
