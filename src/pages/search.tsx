import { NextPage } from 'next';
import { useCallback } from 'react';
import SelectBox from '~/components/buttons/SelectBox';
import SelectMultiple from '~/components/buttons/SelectMultiple';
import ItemContainer from '~/components/shared/ProductsContainer';
import ScrollTop from '~/components/shared/ScrollTop';
import SearchFilter from '~/components/shared/SearchFilter';
import { sort_mapping } from '~/constants';
import usePushQuery from '~/hooks/usePushQuery';

const SearchPage: NextPage = () => {
    const qry = usePushQuery();

    const handleSelectMarkets = useCallback((values: string[]) => {
        if (values.length < 3) {
            qry.push('market', values.join('-'), false);
        } else {
            qry.push('market', 'all', false);
        }
    }, []);

    const handleSelectSort = useCallback((value: string) => {
        qry.push('sort', sort_mapping[value.toLowerCase()], false);
    }, []);

    return (
        <ScrollTop>
            <div className="w-max-[1300px] mx-auto w-[90%] pt-[100px] text-black">
                <SearchFilter>
                    <>
                        <div className="flex w-52 flex-col space-y-4">
                            <h3 className="font-secondary text-2xl md:text-3xl">
                                Sàn thương mại:
                            </h3>
                            <SelectMultiple
                                handleSelect={handleSelectMarkets}
                                options={['tiki', 'lazada', 'shopee']}
                                defaultOption={['tiki']}
                            />
                        </div>

                        <div className="flex w-60 flex-col space-y-4">
                            <h3 className="font-secondary text-2xl md:text-3xl">
                                Bộ lọc:
                            </h3>
                            <SelectBox
                                defaultValue={'Phổ biến'}
                                handleSelect={handleSelectSort}
                                options={[
                                    'Phổ biến',
                                    'Giá cao đến thấp',
                                    'Giá thấp đến cao',
                                ]}
                            />
                        </div>
                    </>
                </SearchFilter>

                <ItemContainer />
            </div>
        </ScrollTop>
    );
};

export default SearchPage;
