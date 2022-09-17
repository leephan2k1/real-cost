import { atom } from 'jotai';
import { SearchResult } from 'types';

const searchResult = atom({
    items: [] as SearchResult[],
    isFetching: false,
});

export default searchResult;
