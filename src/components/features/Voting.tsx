import { memo, useState } from 'react';
import VotingButton from '~/components/buttons/VotingButton';
import useAxiosClient from '~/services/axiosClient';
import { MARKET_URL } from '~/constants';
import { Market, Product } from 'types';
import useSWR from 'swr';

interface VotingProps {
    product: Product;
}

function Voting({ product }: VotingProps) {
    const [votes, setVotes] = useState<{
        upVotes: string[];
        downVotes: string[];
    }>({ upVotes: [], downVotes: [] });

    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );

    const { isValidating } = useSWR<{
        status: string;
        upVotes: string[];
        downVotes: string[];
    }>(
        product?.link ? `/products/votes?link=${product?.link}` : null,
        async (slug) => {
            const { data } = await axiosClient.get(slug);

            if (data?.upVotes?.length || data?.downVotes?.length) {
                setVotes({
                    upVotes: data?.upVotes,
                    downVotes: data?.downVotes,
                });
            }

            return data;
        },
    );

    // serves the purpose of an optimistic UI
    const handleVotes = (
        voteType: 'upVotes' | 'downVotes',
        action: 'add' | 'remove',
        userId: string,
    ) => {
        setVotes((prevState) => {
            return {
                ...prevState,
                [voteType]:
                    action === 'add'
                        ? [...prevState[voteType], userId]
                        : prevState[voteType].filter(
                              (voteId) => voteId !== userId,
                          ),
            };
        });
    };

    return (
        <div className="flex w-full flex-col">
            <h2 className="italic">
                Số liệu chỉ mang tính tham khảo cho quyết định của bạn (Bạn cũng
                có thể tham gia bình chọn để chia sẻ với mọi người).
            </h2>

            <div className="absolute-center my-4 w-full flex-wrap gap-4">
                <VotingButton
                    isFetching={isValidating}
                    type="upVotes"
                    product={product}
                    voting={votes?.upVotes || []}
                    title="nên mua"
                    handleVotes={handleVotes}
                />
                <VotingButton
                    type="downVotes"
                    isFetching={isValidating}
                    product={product}
                    voting={votes?.downVotes || []}
                    title="không nên mua"
                    handleVotes={handleVotes}
                />
            </div>
        </div>
    );
}

export default memo(Voting);
