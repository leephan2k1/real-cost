import {
    Select,
    SelectItem,
    SelectPopover,
    useSelectState,
} from 'ariakit/select';
import { memo, useEffect } from 'react';
import { If, Then } from 'react-if';

interface SelectBoxProps {
    options: string[];
    handleSelect: (value: string) => void;
    defaultValue?: string;
}

function SelectBox({ options, handleSelect, defaultValue }: SelectBoxProps) {
    const select = useSelectState({
        defaultValue: defaultValue ?? options[0],
        sameWidth: true,
        gutter: 4,
    });

    useEffect(() => {
        handleSelect(select.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [select]);

    return (
        <div className="smooth-effect flex min-w-full flex-col rounded-xl border-[1px] border-gray-700 bg-white py-4 px-2 text-xl text-gray-800 lg:text-2xl">
            <Select state={select} className="absolute-center gap-[2px]" />
            <SelectPopover
                state={select}
                className="left-1/2 top-4 z-[100] flex w-[110%] -translate-x-1/2 flex-col justify-center space-y-4 whitespace-nowrap rounded-xl border-[1px] border-gray-700 bg-white py-2 px-3"
            >
                <If condition={options && options?.length}>
                    <Then>
                        {options.map((opt, idx) => {
                            return (
                                <SelectItem
                                    className="hover:cursor-pointer"
                                    value={opt}
                                    key={idx}
                                />
                            );
                        })}
                    </Then>
                </If>
            </SelectPopover>
        </div>
    );
}

export default memo(SelectBox);
