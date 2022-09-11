export function handlePriceNumber(priceNumber: number) {
    return priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
}
