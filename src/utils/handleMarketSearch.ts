import { MARKET_URL } from '~/constants';
import { handlePriceNumber } from './handlePrice';
import { SearchResult } from 'types';

export function handleTikiSearch(searchResult: any): SearchResult[] | null {
    if (Array.isArray(searchResult)) {
        const products = searchResult.reduce((result, product) => {
            const name = product?.name;
            const img = product?.thumbnail_url;
            const price = handlePriceNumber(product?.price);
            const totalSales = product?.quantity_sold?.text;
            const link = `${MARKET_URL('tiki')}/${product?.url_path}`;
            if (
                name &&
                img &&
                product?.price &&
                totalSales &&
                product?.url_path
            ) {
                result.push({
                    name,
                    img,
                    price,
                    totalSales,
                    link,
                    market: 'tiki',
                });
            }
            return result;
        }, []);

        return products ? products : null;
    }

    return null;
}
