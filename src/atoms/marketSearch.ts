import { atom } from 'jotai';
import { Market } from 'types';

const searchMarket = atom('tiki' as Market);

export const setMarketAtom = atom(null, (_, set, update: string[]) => {
    let newValue: Market = 'all';

    if (Array.isArray(update)) {
        // 3 is a number of market: tiki, lazada, shope
        if (update.length > 0 && update.length < 3) {
            newValue = update.join('-') as Market;
        }
    }

    return set(searchMarket, newValue);
});

export default searchMarket;
