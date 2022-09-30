import { memo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { If, Then, Else } from 'react-if';

interface SlidesButtonProps {
    enabled: boolean;
    onClick: () => void;
    direction: 'left' | 'right';
}

const SlidesButton = ({ enabled, onClick, direction }: SlidesButtonProps) => (
    <button
        className="smooth-effect rounded-full border-[1px] border-gray-700 p-2 hover:scale-110"
        onClick={onClick}
        disabled={!enabled}
    >
        <If condition={direction === 'left'}>
            <Then>
                <ChevronLeftIcon className="h-8 w-8" />
            </Then>

            <Else>
                <ChevronRightIcon className="h-8 w-8" />
            </Else>
        </If>
    </button>
);

export default memo(SlidesButton);
