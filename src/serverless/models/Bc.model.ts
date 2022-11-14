import { getAxiosClient } from '~/utils/axios';
import { Product, Market, ItemHistory, ProductPreview } from 'types';
import { BC_URL, BC_BASE_API, MARKET_MAPPING } from '~/constants';
import { handlePriceNumber } from '~/utils/handlePrice';

const axiosClient = getAxiosClient(BC_URL, BC_URL, BC_BASE_API);

function parseIdToMarket(id: string) {
    if (id[0] === '1') return 'shopee';
    if (id[0] === '2') return 'lazada';
    return 'tiki';
}

export async function getProductDetails(
    market: string,
    url: string,
): Promise<Product | null> {
    try {
        const { data } = await axiosClient.get(`/search/product`, {
            params: {
                product_url: `${MARKET_MAPPING[market]}/${url}`,
            },
        });

        if (!data?.data) return null;

        const {
            name,
            price,
            price_before_discount,
            brand,
            description,
            url_images,
            historical_sold,
            product_base_id,
        } = data?.data?.product_base;

        return {
            name: name ? name : '',
            price: handlePriceNumber(price),
            priceBeforeDiscount: price_before_discount
                ? handlePriceNumber(price_before_discount)
                : null,
            link: `${MARKET_MAPPING[market]}/${
                market === 'lazada' ? 'products/' : ''
            }${url}`,
            brand: brand?.name ? brand?.name : '',
            description: description ? description : '',
            images: url_images ? url_images : [],
            totalSales: historical_sold,
            market: market as Market,
            product_base_id,
        };
    } catch (error) {
        return null;
    }
}

export async function getHistoryPrice(
    id?: string,
): Promise<ItemHistory | null> {
    if (!id) return null;

    try {
        const { data } = await axiosClient.get(`/product/history_price`, {
            params: {
                product_base_id: id,
            },
        });

        if (!data?.data && !data.data?.product_history_data) return null;

        const { price, price_ts } =
            data.data?.product_history_data?.item_history;

        return { price, priceTs: price_ts };
    } catch (error) {
        return null;
    }
}

export async function getSuggestionKeyword(limit = 20) {
    try {
        const { data } = await axiosClient.get(
            `/product/recent/v2?limit=${limit}`,
        );

        if (!data?.data && !data.data?.products) return null;

        const { products } = data?.data;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return products?.map((product) => product?.name);
    } catch (error) {
        return null;
    }
}

export async function getRelatedProducts(
    id: string,
    url: string,
): Promise<ProductPreview[] | null> {
    try {
        const { data: prodDetails } = await axiosClient.get(`/product/detail`, {
            params: {
                product_base_id: id,
                type: 'new',
            },
        });

        if (prodDetails && prodDetails.data?.product_base) {
            const { data } = await axiosClient.get(`/product/related`, {
                params: {
                    product_base_id: id,
                    category_base_id:
                        prodDetails.data.product_base?.category_base_id,
                    type: 'new',
                },
            });

            if (data && data.data && Array.isArray(data.data.products)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return data.data.products.map((p) => {
                    return {
                        name: p.name,
                        img: p.url_thumbnail,
                        price: new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(p.price),
                        totalSales: p.historical_sold,
                        link: `${
                            MARKET_MAPPING[parseIdToMarket(p.product_base_id)]
                        }/${
                            parseIdToMarket(p.product_base_id) === 'lazada'
                                ? 'products/'
                                : ''
                        }${url}`,
                        market: parseIdToMarket(p.product_base_id),
                    };
                });
            } else {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    } catch (error) {
        return null;
    }
}
