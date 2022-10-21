import { Navigate, Market } from 'types';

export const DOMAIN_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const BASE_URL = `${DOMAIN_BASE_URL}/api/v1`;

export const WEBSITE_URL = 'https://realcost.shop';

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

export const FAQS_DOCS = [
    {
        title: 'Real Cost ra đời để làm gì?',
        desc: 'Real Cost lấy cảm hứng từ BeeCost và Lichsugia.com, giúp người dùng mua sắm thông minh hơn trong thế giới thương mại điện tử tại Việt Nam',
    },

    {
        title: 'Bạn muốn đóng góp thêm tính năng hoặc sửa lỗi cho Real Cost?',
        desc: 'Nếu bạn muốn đóng góp thêm tính năng có thể liên hệ mình qua email pttl2k1@gmail.com hoặc trietly@protonmail.com. Nếu muốn tham gia sửa lỗi cho Real Cost cũng có thể liên hệ qua email hoặc góp ý trên issues github: https://github.com/leephan2k1/real-cost . Rất cảm ơn!',
    },
    {
        title: 'Real Cost vi phạm DMCA, làm sao yêu cầu gỡ bỏ nội dung?',
        desc: 'Đa số dữ liệu Real Cost được lấy từ các sàn thương mại Tiki, Lazada, Shopee và trang phân tích Bee Cost. Nếu bạn là người sở hữu trí tuệ các dữ liệu số trên và và cảm thấy rằng Real Cost vi phạm Digital Millennium Copyright Act hãy liên hệ mình qua pttl2k1@gmail.com hoặc trietly@protonmail.com để được xem xét gỡ xuống. Nhưng lưu ý rằng: Real Cost hoạt động phi thương mại, mình không nhận được chi phí trực tiếp nào từ dữ liệu cũng như KHÔNG quảng cáo trên website',
    },

    {
        title: 'Các tính năng chính của Real Cost?',
        desc: 'Tìm kiếm, phân tích, nhận thông báo, yêu thích các sản phẩm và hàng hoá trên các sàn thương mại điện tử',
    },

    {
        title: 'Mình muốn tài trợ cho Real Cost?',
        desc: 'Nếu bạn có thành ý muốn tài trợ (kinh phí hoặc dữ liệu) cho Real Cost, bạn có thể gửi email cho mình: pttl2k1@gmail.com hoặc trietly@protonmail.com',
    },
    {
        title: 'Real Cost có các tính năng tính phí nào?',
        desc: 'Real Cost là dự án mã nguồn mở và không có tính năng nào tính phí. => Vì sử dụng miễn phí nên nếu gặp khó khăn về việc duy trì máy chủ hoặc vấn đề pháp lý, mình sẽ ngừng triển khai Real Cost',
    },

    {
        title: 'Real Cost hỗ trợ các sàn thương mại điện tử nào?',
        desc: 'Real Cost hỗ trợ các 3 sàn thương mại điện tử phổ biến hiện tại ở Việt Nam: Tiki, Shopee, Lazada',
    },
    {
        title: 'Real Cost được xây dựng dựa trên?',
        desc: 'Real Cost sử dụng các giải pháp: NextJS, TailwindCSS, Fastify, MongoDB, SocketIO,... với rất nhiều 🧡 và tâm huyết',
    },
    {
        title: 'Real Cost đã được phát triển trong bao lâu?',
        desc: 'Từ lúc lên ý tưởng và thiết kế và tham khảo giao diện, cơ sở dữ liệu, triển khai thì khoảng 2 tháng',
    },

    {
        title: 'Real Cost cạnh tranh với những đối thủ nào?',
        desc: 'Như "Real Cost ra đời để làm gì?" và hoàn toàn không muốn bị so sánh cũng như cạnh tranh với bất kỳ website nào tương tự. Đồng thời đây cũng là dự án chỉ mang tính học hỏi và xây dựng các bộ công nghệ mã nguồn mở xoay quanh ngôn ngữ Javascript',
    },
];

export const CategoryItems = [
    [
        {
            id: 1,
            href: '/search?market=all',
            title: 'Thời trang nam',
            img: '/images/male_fashion.png',
            bgColor: '#6E85B7',
        },
        {
            id: 10,
            href: '/search?market=all',
            title: 'Thời trang nữ',
            img: '/images/female_fashion.png',
            bgColor: '#FF7171',
        },
    ],
    [
        {
            id: 2,
            href: '/search?market=all',
            title: 'Túi ví nam',
            img: '/images/male_wallet.png',
            bgColor: '#FF9494',
        },
        {
            id: 11,
            href: '/search?market=all',
            title: 'Túi ví nữ',
            img: '/images/female_bag.png',
            bgColor: '#C1EFFF',
        },
    ],
    [
        {
            id: 3,
            href: '/search?market=all',
            title: 'Giày dép nam',
            img: '/images/male_shoe.png',
            bgColor: '#AAC4FF',
        },
        {
            id: 12,
            href: '/search?market=all',
            title: 'Giày dép nữ',
            img: '/images/female_shoe.png',
            bgColor: '#F38BA0',
        },
    ],
    [
        {
            id: 4,
            href: '/search?market=all',
            title: 'Thời trang bé',
            img: '/images/kid_clothes.png',
            bgColor: '#FCD1D1',
        },
        {
            id: 13,
            href: '/search?market=all',
            title: 'Mẹ & Bé',
            img: '/images/kid.png',
            bgColor: '#9AD0EC',
        },
    ],
    [
        {
            id: 5,
            href: '/search?market=all',
            title: 'Làm đẹp',
            img: '/images/lipstick.png',
            bgColor: '#99FEFF',
        },
        {
            id: 14,
            href: '/search?market=all',
            title: 'Đồng hồ',
            img: '/images/watch.png',
            bgColor: '#F8B195',
        },
    ],
    [
        {
            id: 6,
            href: '/search?market=all',
            title: 'Máy tính',
            img: '/images/macbook.png',
            bgColor: '#FF8364',
        },
        {
            id: 15,
            href: '/search?market=all',
            title: 'Điện thoại',
            img: '/images/iphone.png',
            bgColor: '#A7C5EB',
        },
    ],
    [
        {
            id: 7,
            href: '/search?market=all',
            title: 'Thể thao',
            img: '/images/sport.png',
            bgColor: '#CCF6C8',
        },
        {
            id: 16,
            href: '/search?market=all',
            title: 'Đời sống',
            img: '/images/kitchen_pot.png',
            bgColor: '#FF8AAE',
        },
    ],
    [
        {
            id: 8,
            href: '/search?market=all',
            title: 'Thiết bị điện tử',
            img: '/images/e-machine.png',
            bgColor: '#FFC4E1',
        },

        {
            id: 17,
            href: '/search?market=all',
            title: 'Sách & Tạp chí',
            img: '/images/book.png',
            bgColor: '#8DB596',
        },
    ],
    [
        {
            id: 9,
            href: '/search?market=all',
            title: 'Xe máy',
            img: '/images/motorbike.png',
            bgColor: '#BEDBBB',
        },
        {
            id: 18,
            href: '/search?market=all',
            title: 'Thú cưng',
            img: '/images/pet.png',
            bgColor: '#FFC7C7',
        },
    ],
];
