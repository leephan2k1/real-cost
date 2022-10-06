import { Navigate, Market } from 'types';

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const SEARCH_PATH = 'search';

export const PRODUCTS_PATH = 'products';

export const USER_PATH = 'users';

export const FAVORITES_PATH = `/${USER_PATH}/favorites`;

export const BC_URL = String(process.env.BC_URL);
export const BC_BASE_API = String(process.env.BC_BASE_API);

export const MARKET_OPTIONS = ['tiki', 'lazada', 'shopee'];

export function MARKET_URL(market: Market) {
    return market === 'tiki' ? 'https://tiki.vn' : BASE_URL;
}

export const TailwindColors = [
    '#facc15',
    '#a3e635',
    '#fbbf24',
    '#34d399',
    '#fb923c',
    '#22d3ee',
    '#f87171',
    '#38bdf8',
    '#f472b6',
    '#818cf8',
    '#fb7185',
    '#a78bfa',
    '#e879f9',
];

export const sort_mapping: { [key: string]: string } = {
    'phổ biến': '',
    'giá thấp đến cao': 'asc',
    'giá cao đến thấp': 'desc',
};

export const MARKET_MAPPING: { [key: string]: string } = {
    shopee: 'https://shopee.vn',
    tiki: 'https://tiki.vn',
    lazada: 'https://www.lazada.vn',
};

export const quickList: Navigate[] = [
    { title: 'Danh Sách Sản Phẩm', link: '/browse' },
    { title: 'Deal', link: '/flash-sale' },
];

export const mapping_market_colors: {
    [key: string]: string;
} = {
    tiki: '#1a94ff',
    lazada: '#0f1470',
    shopee: '#f84a2f',
    all: '#f43f5e',
};
