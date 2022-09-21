import { useRouter } from 'next/router';

export default function usePushQuery() {
    const router = useRouter();

    const query = {
        push: (
            key: string,
            value: string,
            scrollTop: boolean,
            refreshPage?: boolean,
            isShallow?: boolean,
        ) => {
            const queryObj = {
                ...router.query,
                [key]: value,
            };

            if (refreshPage) {
                const { page } = queryObj;
                if (page) {
                    delete queryObj.page;
                }
            }

            router.replace(
                {
                    pathname: router.pathname,
                    query: queryObj,
                },
                undefined,
                { shallow: !!isShallow, scroll: scrollTop },
            );
        },
    };

    return query;
}
