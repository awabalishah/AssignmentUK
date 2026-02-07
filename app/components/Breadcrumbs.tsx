import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="container" aria-label="Breadcrumb" style={{ padding: '1.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', position: 'relative', zIndex: 10 }}>
            <Link href="/" className="flex items-center text-muted hover:text-secondary" style={{ transition: 'all 0.2s ease', display: 'flex', alignItems: 'center' }}>
                <Home size={14} style={{ marginRight: '4px' }} />
                <span className="hidden md:inline">Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center" style={{ gap: '0.5rem' }}>
                    <ChevronRight size={12} className="text-muted" style={{ opacity: 0.5 }} />
                    {item.href ? (
                        <Link href={item.href} className="text-muted hover:text-secondary" style={{ transition: 'all 0.2s ease' }}>
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-bold text-gradient-gold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}
