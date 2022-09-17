import { Navigate, Market } from 'types';

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export function MARKET_URL(market: Market) {
    return market === 'tiki' ? 'https://tiki.vn' : BASE_URL;
}

export const quickList: Navigate[] = [
    { title: 'Xu Hướng', link: '/' },
    { title: 'Danh Mục', link: '/' },
    { title: 'Danh Sách Sản Phẩm', link: '/' },
    { title: 'Voucher', link: '/' },
];
