import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NotFound: NextPage = () => {
    const router = useRouter();

    return (
        <div
            id="not-found-page"
            className="absolute-center min-h-screen w-full flex-col"
        >
            <div className="absolute-center flex-col">
                <h1 className="h1-404">404</h1>
                <h3 className="h3-404">page not found</h3>
            </div>
            <div className="container">
                <div className="ghost-copy">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                </div>
                <div className="ghost">
                    <div className="face">
                        <div className="eye"></div>
                        <div className="eye-right"></div>
                        <div className="mouth"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>
            <div className="bottom mb-6">
                <div className="buttons">
                    <button className="btn" onClick={() => router.back()}>
                        Back
                    </button>
                    <Link href="/">
                        <a>
                            <button className="btn">Home</button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
