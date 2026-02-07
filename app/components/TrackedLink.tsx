'use client';

import Link from 'next/link';
import { sendGAEvent } from './GoogleAnalytics';

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
    eventName: string;
    eventParams?: Record<string, any>;
    children: React.ReactNode;
}

export default function TrackedLink({
    eventName,
    eventParams,
    onClick,
    children,
    ...props
}: TrackedLinkProps) {

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        sendGAEvent(eventName, eventParams);
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
}
