import { memo } from 'react';
import SelectMultiple from '~/components/buttons/SelectMultiple';
import SelectBox from '../buttons/SelectBox';
import usePushQuery from '~/hooks/usePushQuery';

const sort_mapping: { [key: string]: string } = {
    'phổ biến': '',
    'giá thấp đến cao': 'asc',
    'giá cao đến thấp': 'desc',
};

function SearchFilter() {
    const qry = usePushQuery();

    const handleSelectMarkets = (values: string[]) => {
        if (values.length < 3) {
            qry.push('market', values.join('-'), false);
        } else {
            qry.push('market', 'all', false);
        }
    };

    const handleSelectSort = (value: string) => {
        qry.push('sort', sort_mapping[value.toLowerCase()], false);
    };

    return (
        <div className="h-[100px] w-full">
            <div className="flex h-full w-full items-center space-x-6 overflow-y-hidden md:space-x-14">
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
            </div>
        </div>
    );
}

export default memo(SearchFilter);
