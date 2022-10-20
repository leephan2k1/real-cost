import {
    Select,
    SelectItem,
    SelectItemCheck,
    SelectPopover,
    useSelectState,
    SelectArrow,
} from 'ariakit/select';
import { If, Then } from 'react-if';
import { useEffect } from 'react';

function renderValue(value: string[]) {
    if (value.length === 0) return 'Tất cả';
    if (value.length === 1) return value[0];
    return `${value[0]}...`;
}

interface SelectMultipleProps {
    options: string[];
    defaultOption?: string[];
    handleSelect: (value: string[]) => void;
    styles?: string;
}

//ref: https://ariakit.org/examples/select-multiple

export default function SelectMultiple({
    options,
    defaultOption,
    handleSelect,
    styles,
}: SelectMultipleProps) {
    const select = useSelectState({
        defaultValue: defaultOption || options,
        sameWidth: true,
    });

    useEffect(() => {
        if (handleSelect) handleSelect(select.value);
    }, [select.value]);

    return (
        <div
            className={`${styles} smooth-effect flex min-w-full flex-col rounded-xl border-[1px] border-gray-700 bg-white px-2 text-xl text-gray-800 lg:text-2xl`}
        >
            <Select state={select} className="select absolute-center gap-[2px]">
                {select.value.length === options.length
                    ? 'Tất cả'
                    : renderValue(select.value)}
                <SelectArrow />
            </Select>

            <If condition={select.mounted}>
                <Then>
                    <SelectPopover
                        state={select}
                        className="left-1/2 top-4 z-[100] flex w-[110%] -translate-x-1/2 flex-col justify-center space-y-4 whitespace-nowrap rounded-xl border-[1px] border-gray-700 bg-white py-2"
                    >
                        {options.map((value) => (
                            <SelectItem
                                key={value}
                                value={value}
                                className="flex items-center gap-[2px] px-1 hover:cursor-pointer"
                            >
                                <SelectItemCheck />
                                {value}
                            </SelectItem>
                        ))}
                    </SelectPopover>
                </Then>
            </If>
        </div>
    );
}
