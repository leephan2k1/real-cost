import { atom } from 'jotai';
import { SearchResult } from 'types';

const searchResult = atom([] as SearchResult[]);

export default searchResult;
