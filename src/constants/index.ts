import { Navigate, Market } from 'types';

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const MARKET_URL: { [key in Market]: string } = {
    tiki: 'https://tiki.vn',
    lazada: BASE_URL, // -> lazada blocked by cors
    shopee: BASE_URL, // -> shopee blocked by cors
    all: BASE_URL,
};

export const quickList: Navigate[] = [
    { title: 'Xu Hướng', link: '/' },
    { title: 'Danh Mục', link: '/' },
    { title: 'Danh Sách Sản Phẩm', link: '/' },
    { title: 'Voucher', link: '/' },
];
