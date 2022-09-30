import { memo, useMemo } from 'react';
import { FaceSmileIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { If, Then, Else } from 'react-if';

interface VotingButtonProps {
    type: 'up' | 'down';
    voting: number;
    title: string;
}

function VotingButton({ type, title, voting }: VotingButtonProps) {
    const formattedVoting = useMemo(() => {
        return new Intl.NumberFormat('en', { notation: 'compact' }).format(
            voting,
        );
    }, [voting]);

    return (
        <button className="smooth-effect absolute-center w-fit space-x-3 rounded-2xl border-[1px] border-gray-700 p-4 hover:scale-[90%]">
            <If condition={type === 'up'}>
                <Then>
                    <FaceSmileIcon className="h-8 w-8 text-green-500" />
                </Then>

                <Else>
                    <FaceFrownIcon className="h-8 w-8 text-rose-500" />
                </Else>
            </If>
            <span>
                {formattedVoting} {title}
            </span>
        </button>
    );
}

export default memo(VotingButton);
