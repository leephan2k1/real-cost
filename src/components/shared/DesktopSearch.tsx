import { useAtomValue, useSetAtom } from 'jotai';
import { memo } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import searchMarket, { setMarketAtom } from '~/atoms/marketSearch';
import mobileSearchState from '~/atoms/mobileSearchState';
import SelectMultiple from '~/components/buttons/SelectMultiple';
import SearchInput from '~/components/shared/SearchInput';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import SearchResults from '../shared/SearchResults';

function DesktopSearch() {
    const market = useAtomValue(searchMarket);
    const setMarket = useSetAtom(setMarketAtom);
    const setSearchModalState = useSetAtom(mobileSearchState);
    const matchesMediumScreen = useMediaQuery('(min-width: 768px)');

    const handleSelect = (values: string[]) => {
        setMarket(values);
    };

    return (
        <>
            {/* search options (medium screen)  */}
            <div className="relative hidden h-full flex-1 items-center justify-end md:flex md:justify-center lg:justify-end">
                <SelectMultiple
                    handleSelect={handleSelect}
                    options={['tiki', 'lazada', 'shopee']}
                    defaultOption={[...market.split('-')]}
                />
            </div>

            {/* mobile search button  */}
            <button
                onClick={() => setSearchModalState(true)}
                className="absolute-center rounded-xl border-[1px] border-gray-600 bg-white p-3 shadow-lg md:hidden"
            >
                <MagnifyingGlassIcon className="h-8 w-8" />
            </button>

            {matchesMediumScreen && (
                <div className="relative h-full w-4/5">
                    <div className="full-size absolute top-2 left-2 -z-10 rounded-xl border-2 border-dashed border-gray-800"></div>
                    <SearchInput styles="z-[60] border-[1px] border-gray-800 hidden items-center space-x-2 overflow-hidden rounded-xl bg-white p-2 shadow-xl md:flex" />
                </div>
            )}

            {matchesMediumScreen && (
                <SearchResults styles="absolute top-[105%] hidden h-fit max-h-[400px] w-full bg-white shadow-xl" />
            )}
        </>
    );
}

export default memo(DesktopSearch);
