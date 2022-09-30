import { getAxiosClient } from '~/utils/axios';
import { MARKET_URL } from '~/constants';
import { handlePriceNumber } from '~/utils/handlePrice';
import { Product } from 'types';

const axiosClient = getAxiosClient(
    MARKET_URL('tiki'),
    MARKET_URL('tiki'),
    MARKET_URL('tiki') + '/api/v2',
);

export async function getProductDetails(url: string): Promise<Product | null> {
    const lastStr = String(url.split('-').pop());
    const id = lastStr.slice(1, lastStr.indexOf('.'));

    try {
        const { data } = await axiosClient.get(`/products/${id}?platform=web`);

        if (!data) return null;

        const {
            name,
            description,
            images,
            price,
            original_price,
            all_time_quantity_sold,
            brand,
            id: objId,
            current_seller,
        } = data;

        return {
            name,
            description: description ? description : '',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            images: images.map((img) => img?.medium_url),
            price: handlePriceNumber(price),
            priceBeforeDiscount:
                original_price !== price
                    ? handlePriceNumber(original_price)
                    : null,
            totalSales: all_time_quantity_sold ? all_time_quantity_sold : '0',
            brand: brand?.name ? brand?.name : '',
            market: 'tiki',
            product_base_id: `3__${objId}__${current_seller?.product_id}`,
        };
    } catch (error) {
        return null;
    }
}

export async function getSuggestionKeyword() {
    try {
        const { data } = await axiosClient.get(`/search/suggestion`);

        if (!data?.data && !data?.data?.length) return null;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return data.data.map((item) => item?.keyword);
    } catch (error) {
        return null;
    }
}
