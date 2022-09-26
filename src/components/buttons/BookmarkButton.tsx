import { Button } from 'ariakit/button';
import { Tooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';
import { HeartIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

function BookmarkButton() {
    const tooltip = useTooltipState();

    return (
        <>
            <TooltipAnchor
                state={tooltip}
                as={Button}
                className="button secondary"
            >
                <HeartIcon className="mx-4 h-8 w-8 md:h-10 md:w-10" />
            </TooltipAnchor>
            <Tooltip
                state={tooltip}
                className="animate__zoomIn animate__animated animate__faster absolute-center rounded-xl border-[1px] border-gray-700 p-2"
            >
                Yêu thích
            </Tooltip>
        </>
    );
}

export default memo(BookmarkButton);
