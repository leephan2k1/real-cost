export interface Navigate {
    title: string;
    link: string;
}

export type Market =
    | 'tiki'
    | 'tiki-shopee'
    | 'tiki-lazada'
    | 'shopee'
    | 'shopee-tiki'
    | 'shopee-lazada'
    | 'lazada'
    | 'lazada-tiki'
    | 'lazada-shopee'
    | 'all';

export interface SearchResult {
    name: string;
    img: string;
    price: string;
    totalSales: string;
    link: string;
    market: Market;
}
