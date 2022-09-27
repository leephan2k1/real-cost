import { Navigate, Market } from 'types';

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const SEARCH_PATH = 'search';

export const BC_URL = String(process.env.BC_URL);
export const BC_BASE_API = String(process.env.BC_BASE_API);

export function MARKET_URL(market: Market) {
    return market === 'tiki' ? 'https://tiki.vn' : BASE_URL;
}

export const MARKET_MAPPING: { [key: string]: string } = {
    shopee: 'https://shopee.vn',
    tiki: 'https://tiki.vn',
    lazada: 'https://www.lazada.vn',
};

export const quickList: Navigate[] = [
    { title: 'Xu Hướng', link: '/' },
    { title: 'Danh Mục', link: '/' },
    { title: 'Danh Sách Sản Phẩm', link: '/' },
    { title: 'Voucher', link: '/' },
];

export const mapping_market_colors: {
    [key: string]: string;
} = {
    tiki: '#1a94ff',
    lazada: '#0f1470',
    shopee: '#f84a2f',
    all: '#f43f5e',
};
