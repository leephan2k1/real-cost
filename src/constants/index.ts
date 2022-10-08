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

export const CategoryItems = [
    [
        {
            id: 1,
            href: `/`,
            title: 'Thời trang nam',
            img: media1,
            bgColor: '#6E85B7',
        },
        {
            id: 10,
            href: `/`,
            title: 'Thời trang nữ',
            img: media10,
            bgColor: '#FF7171',
        },
    ],
    [
        {
            id: 2,
            href: `/`,
            title: 'Túi ví nam',
            img: media2,
            bgColor: '#FF9494',
        },
        {
            id: 11,
            href: `/`,
            title: 'Túi ví nữ',
            img: media11,
            bgColor: '#C1EFFF',
        },
    ],
    [
        {
            id: 3,
            href: `/`,
            title: 'Giày dép nam',
            img: media3,
            bgColor: '#AAC4FF',
        },
        {
            id: 12,
            href: `/`,
            title: 'Giày dép nữ',
            img: media12,
            bgColor: '#F38BA0',
        },
    ],
    [
        {
            id: 4,
            href: `/`,
            title: 'Thời trang bé',
            img: media4,
            bgColor: '#FCD1D1',
        },
        {
            id: 13,
            href: `/`,
            title: 'Mẹ & Bé',
            img: media13,
            bgColor: '#9AD0EC',
        },
    ],
    [
        {
            id: 5,
            href: `/`,
            title: 'Làm đẹp',
            img: media5,
            bgColor: '#99FEFF',
        },
        {
            id: 14,
            href: `/`,
            title: 'Đồng hồ',
            img: media14,
            bgColor: '#F8B195',
        },
    ],
    [
        {
            id: 6,
            href: `/`,
            title: 'Máy tính',
            img: media6,
            bgColor: '#FF8364',
        },
        {
            id: 15,
            href: `/`,
            title: 'Điện thoại',
            img: media15,
            bgColor: '#A7C5EB',
        },
    ],
    [
        {
            id: 7,
            href: `/`,
            title: 'Thể thao',
            img: media7,
            bgColor: '#CCF6C8',
        },
        {
            id: 16,
            href: `/`,
            title: 'Đời sống',
            img: media16,
            bgColor: '#FF8AAE',
        },
    ],
    [
        {
            id: 8,
            href: `/`,
            title: 'Thiết bị điện tử',
            img: media8,
            bgColor: '#FFC4E1',
        },

        {
            id: 17,
            href: `/`,
            title: 'Sách & Tạp chí',
            img: media17,
            bgColor: '#8DB596',
        },
    ],
    [
        {
            id: 9,
            href: `/`,
            title: 'Xe máy',
            img: media9,
            bgColor: '#BEDBBB',
        },
        {
            id: 18,
            href: `/`,
            title: 'Thú cưng',
            img: media18,
            bgColor: '#FFC7C7',
        },
    ],
];
