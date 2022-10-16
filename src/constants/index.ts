import { Navigate, Market } from 'types';

export const DOMAIN_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const BASE_URL = `${DOMAIN_BASE_URL}/api/v1`;

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
    { title: 'Phân tích', link: '/flash-sale' },
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
            href: '/',
            title: 'Thời trang nam',
            img: '/images/male_fashion.webp',
            bgColor: '#6E85B7',
        },
        {
            id: 10,
            href: '/',
            title: 'Thời trang nữ',
            img: '/images/female_fashion.png',
            bgColor: '#FF7171',
        },
    ],
    [
        {
            id: 2,
            href: '/',
            title: 'Túi ví nam',
            img: '/images/male_wallet.webp',
            bgColor: '#FF9494',
        },
        {
            id: 11,
            href: '/',
            title: 'Túi ví nữ',
            img: '/images/female_bag.webp',
            bgColor: '#C1EFFF',
        },
    ],
    [
        {
            id: 3,
            href: '/',
            title: 'Giày dép nam',
            img: '/images/male_shoe.png',
            bgColor: '#AAC4FF',
        },
        {
            id: 12,
            href: '/',
            title: 'Giày dép nữ',
            img: '/images/female_shoe.webp',
            bgColor: '#F38BA0',
        },
    ],
    [
        {
            id: 4,
            href: '/',
            title: 'Thời trang bé',
            img: '/images/kid_clothes.jpeg',
            bgColor: '#FCD1D1',
        },
        {
            id: 13,
            href: '/',
            title: 'Mẹ & Bé',
            img: '/images/kid.jpeg',
            bgColor: '#9AD0EC',
        },
    ],
    [
        {
            id: 5,
            href: '/',
            title: 'Làm đẹp',
            img: '/images/lipstick.png',
            bgColor: '#99FEFF',
        },
        {
            id: 14,
            href: '/',
            title: 'Đồng hồ',
            img: '/images/watch.webp',
            bgColor: '#F8B195',
        },
    ],
    [
        {
            id: 6,
            href: '/',
            title: 'Máy tính',
            img: '/images/macbook.png',
            bgColor: '#FF8364',
        },
        {
            id: 15,
            href: '/',
            title: 'Điện thoại',
            img: '/images/iphone.png',
            bgColor: '#A7C5EB',
        },
    ],
    [
        {
            id: 7,
            href: '/',
            title: 'Thể thao',
            img: '/images/sport.webp',
            bgColor: '#CCF6C8',
        },
        {
            id: 16,
            href: '/',
            title: 'Đời sống',
            img: '/images/kitchen_pot.png',
            bgColor: '#FF8AAE',
        },
    ],
    [
        {
            id: 8,
            href: '/',
            title: 'Thiết bị điện tử',
            img: '/images/e-machine.png',
            bgColor: '#FFC4E1',
        },

        {
            id: 17,
            href: '/',
            title: 'Sách & Tạp chí',
            img: '/images/book.png',
            bgColor: '#8DB596',
        },
    ],
    [
        {
            id: 9,
            href: '/',
            title: 'Xe máy',
            img: '/images/motorbike.png',
            bgColor: '#BEDBBB',
        },
        {
            id: 18,
            href: '/',
            title: 'Thú cưng',
            img: '/images/pet.webp',
            bgColor: '#FFC7C7',
        },
    ],
];
