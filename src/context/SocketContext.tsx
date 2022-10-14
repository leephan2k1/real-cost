import { useSession } from 'next-auth/react';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';
import { Product } from 'types';
import { useEffectOnce } from 'usehooks-ts';
import ReactHotToast from '~/components/shared/ReactHotToast';

interface SocketContextType {
    socket: Socket | null;
}

interface SocketContextProps {
    children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const { data } = useSession();
    const isEmitted = useRef(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = data?.user?.id;

    useEffectOnce(() => {
        setSocket(io('http://127.0.0.1:5555'));
    });

    useEffect(() => {
        if (socket?.connected && userId && !isEmitted.current) {
            socket?.emit('online-emitter', { userId });

            isEmitted.current = true;

            socket?.on('productNotifications', (product: Product) => {
                setProduct(product);
            });
        }
    }, [socket, data]);

    useEffect(() => {
        if (product)
            toast.custom((t) => <ReactHotToast t={t} product={product} />, {
                duration: 5000,
            });
    }, [product]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default function useSocket() {
    return useContext(SocketContext);
}
