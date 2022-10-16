import { atom } from 'jotai';
import { ProductPreview } from 'types';

const searchResult = atom({
    items: [] as ProductPreview[],
    isFetching: false,
});

export default searchResult;
