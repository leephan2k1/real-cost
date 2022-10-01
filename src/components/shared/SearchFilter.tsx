import { memo, ReactNode } from 'react';

interface SearchFilterProps {
    children: ReactNode;
}

function SearchFilter({ children }: SearchFilterProps) {
    return (
        <div className="h-[100px] w-full">
            <div className="flex h-full w-full items-center space-x-6 overflow-y-hidden md:space-x-14">
                {children}
            </div>
        </div>
    );
}

export default memo(SearchFilter);
