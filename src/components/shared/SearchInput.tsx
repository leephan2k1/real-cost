import { memo, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from '../shared/Input';
import { useEffectOnce } from 'usehooks-ts';

interface SearchInputProps {
    styles?: string;
    focusOnMount?: boolean;
}

function SearchInput({ styles, focusOnMount }: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffectOnce(() => {
        if (focusOnMount) {
            inputRef.current?.focus();
        }
    });

    return (
        <div className={styles}>
            <MagnifyingGlassIcon className="h-8 w-8" />
            <Input
                ref={inputRef}
                placeHolder="Tìm kiếm sản phẩm..."
                style="h-12 w-full"
                type="text"
            />
        </div>
    );
}
export default memo(SearchInput);
