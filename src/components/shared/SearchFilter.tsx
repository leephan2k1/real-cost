import { memo } from 'react';
import SelectMultiple from '~/components/buttons/SelectMultiple';
import SelectBox from '../buttons/SelectBox';

function SearchFilter() {
    const handleSelect = (values: string[]) => {
        console.error(values);
    };

    return (
        <div className="h-[100px] w-full">
            <div className="flex h-full w-full items-center space-x-6 overflow-y-hidden md:space-x-14">
                <div className="flex w-52 flex-col space-y-4">
                    <h3 className="font-secondary text-2xl md:text-3xl">
                        Sàn thương mại:
                    </h3>
                    <SelectMultiple
                        handleSelect={handleSelect}
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
                        handleSelect={(value: string) => {
                            console.error(value);
                        }}
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
