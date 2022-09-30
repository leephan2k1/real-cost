import { memo } from 'react';
import VotingButton from '~/components/buttons/VotingButton';

function Voting() {
    return (
        <div className="flex w-full flex-col">
            <h2 className="italic">
                Số liệu chỉ mang tính tham khảo cho quyết định của bạn (Bạn cũng
                có thể tham gia bình chọn để chia sẻ với mọi người).
            </h2>

            <div className="absolute-center my-4 w-full flex-wrap gap-4">
                <VotingButton type="up" voting={10000} title="nên mua" />
                <VotingButton type="down" voting={100} title="không nên mua" />
            </div>
        </div>
    );
}

export default memo(Voting);
