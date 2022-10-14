import { MARKET_MAPPING } from '~/constants';

export function handleSubPathMarket(market: string, url: string) {
    if (market !== 'lazada') {
        return url?.replace(`${MARKET_MAPPING[market]}/`, '');
    }

    return url?.replace(`${MARKET_MAPPING[market]}/products/`, '');
}

export function convertPriceStringToNumber(price: string) {
    return Number(price.replace('đ', '').replace('.', ''));
}
