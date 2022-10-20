import Link from 'next/link';
import Logo from '../icons/Logo';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-600">
                    <Logo style="md:w-24 md:h-24 w-20 h-20 fill-black" />
                </div>

                <p className="mx-auto max-w-md text-center leading-relaxed text-gray-500"></p>

                <div className="my-8">
                    <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                        <li>
                            <Link
                                className="text-gray-700 transition hover:text-gray-700/75"
                                href="/privacy-policy"
                            >
                                Chính sách riêng tư
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="text-gray-700 transition hover:text-gray-700/75"
                                href="/terms-of-service"
                            >
                                Điều khoản dịch vụ
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="text-gray-700 transition hover:text-gray-700/75"
                                href="/faqs"
                            >
                                Câu hỏi thường gặp
                            </Link>
                        </li>
                    </ul>
                </div>

                <ul className="mt-6 flex justify-center gap-6 md:gap-8">
                    <li>
                        <a
                            href="https://github.com/leephan2k1/real-cost"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <svg
                                className="h-10 w-10"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
                <span className="absolute-center mt-6 text-gray-500">
                    &copy; realcost.shop
                </span>
            </div>
        </footer>
    );
};
export default Footer;
