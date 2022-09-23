import { forwardRef, ReactNode } from 'react';

import {
    ChevronRightIcon,
    ArrowLeftIcon,
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface SectionProps {
    title?: string;
    style?: string;
    children?: ReactNode;
    linkHints?: boolean;
    arrowTrendingUp?: boolean;
    link?: string;
    backLink?: string;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
    (
        { children, title, style, linkHints, link, backLink, arrowTrendingUp },
        ref,
    ) => {
        return (
            <section ref={ref} className={style}>
                {title && (
                    <h2 className="mt-4 flex select-none items-center font-secondary text-3xl hover:cursor-pointer  md:text-4xl lg:text-5xl">
                        {backLink ? (
                            <Link href={backLink}>
                                <a>
                                    {' '}
                                    <ArrowLeftIcon className="hover:text-primary mr-4 h-8 w-8 transition-all lg:h-10 lg:w-10" />
                                </a>
                            </Link>
                        ) : null}

                        <div className="hover:text-primary flex items-center transition-all">
                            {!link ? (
                                title
                            ) : (
                                <Link href={link}>
                                    <a>{title}</a>
                                </Link>
                            )}
                            {linkHints && (
                                <ChevronRightIcon className="h-8 w-8 lg:h-10 lg:w-10" />
                            )}
                            {arrowTrendingUp && (
                                <ArrowTrendingUpIcon className="mx-4 h-8 w-8 lg:h-10 lg:w-10" />
                            )}
                        </div>
                    </h2>
                )}
                {children}
            </section>
        );
    },
);

Section.displayName = 'Section';

export default Section;
