import { Button } from 'ariakit/button';
import { Tooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';
import { memo, ReactNode } from 'react';

interface ButtonTooltipProps {
    children: ReactNode;
    title: string;
    handler: () => void;
}

function ButtonTooltip({ children, title, handler }: ButtonTooltipProps) {
    const tooltip = useTooltipState();

    return (
        <>
            <TooltipAnchor
                state={tooltip}
                as={Button}
                className="button secondary"
                onClick={handler}
            >
                {children}
            </TooltipAnchor>
            <Tooltip
                state={tooltip}
                className="animate__zoomIn animate__animated animate__faster absolute-center rounded-xl border-[1px] border-gray-700 p-2"
            >
                {title}
            </Tooltip>
        </>
    );
}

export default memo(ButtonTooltip);
