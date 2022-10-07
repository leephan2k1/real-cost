import { useSession } from 'next-auth/react';
import { memo, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import { Market, Product } from 'types';
import { MARKET_URL } from '~/constants';
import useAxiosClient from '~/services/axiosClient';
import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline';

interface VotingButtonProps {
    type: 'upVotes' | 'downVotes';
    voting: string[];
    title: string;
    product: Product;
    isFetching?: boolean;
    handleVotes: (
        voteType: 'upVotes' | 'downVotes',
        action: 'add' | 'remove',
        userId: string,
    ) => void;
}

function VotingButton({
    type,
    title,
    voting,
    product,
    isFetching,
    handleVotes,
}: VotingButtonProps) {
    const { status, data } = useSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = data?.user?.id;

    const axiosClient = useAxiosClient(
        MARKET_URL('e-commerce-server' as Market),
    );

    const isVoted = useMemo(() => {
        return !!voting.find((vote) => vote === userId);
    }, [voting, data]);

    const formattedVoting = useMemo(() => {
        return new Intl.NumberFormat('en', { notation: 'compact' }).format(
            voting?.length || 0,
        );
    }, [voting]);

    const handleClickVoting = async () => {
        if (status === 'unauthenticated' || !userId) {
            toast.error(`Đăng nhập để bình chọn bạn nhé!`);
            return;
        }

        if (isVoted) {
            toast.success(`Huỷ bình chọn ${title} thành công`);
        } else {
            toast.success(`Bình chọn ${title} thành công`);
        }

        const { name, link, market, images, price, totalSales } = product;

        const payload = {
            name,
            link,
            market,
            img: images[0],
            price,
            totalSales,
        };

        try {
            if (!isVoted) {
                handleVotes(type, 'add', userId);

                await axiosClient.post(
                    `/users/${userId}/votes?voteType=${type.replace(
                        'Votes',
                        '',
                    )}`,
                    payload,
                );
            } else {
                handleVotes(type, 'remove', userId);

                await axiosClient.delete(
                    `/users/${userId}/votes?voteType=${type.replace(
                        'Votes',
                        '',
                    )}`,
                    {
                        data: payload,
                    },
                );
            }
        } catch (error) {
            toast.error(`Có gì đó sai sai? Thử lại sau nhé bạn!`);
        }
    };

    return (
        <>
            <If condition={isFetching}>
                <Then>
                    <button className="tailwind-pulse-effect h-[46px] w-[150px] rounded-2xl bg-gray-300"></button>
                </Then>

                <Else>
                    <button
                        onClick={handleClickVoting}
                        className={`smooth-effect absolute-center w-fit space-x-3 rounded-2xl  ${
                            isVoted
                                ? type === 'upVotes'
                                    ? 'border-2 border-green-500'
                                    : 'border-2 border-rose-500'
                                : 'border-[1px]  border-gray-700'
                        } p-4 hover:scale-[90%]`}
                    >
                        <If condition={type === 'upVotes'}>
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
                </Else>
            </If>
        </>
    );
}

export default memo(VotingButton);
