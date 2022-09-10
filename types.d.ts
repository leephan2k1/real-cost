export interface Navigate {
    title: string;
    link: string;
}

export type Market = 'tiki' | 'shopee' | 'lazada' | 'all';

export interface SearchResult {
    name: string;
    img: string;
    price: string;
    totalSales: string;
    link: string;
    market: Market;
}
