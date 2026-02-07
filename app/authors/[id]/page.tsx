import { notFound } from 'next/navigation'
import authorsData from '@/data/authors.json'
import ExpertProfile from '@/app/components/ExpertProfile'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export async function generateStaticParams() {
    return (authorsData as any[]).map((author) => ({
        id: author.id,
    }))
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const author = (authorsData as any[]).find((a) => a.id === id);

    if (!author) {
        notFound();
    }

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://assignment-uk-five.vercel.app"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Authors",
                "item": "https://assignment-uk-five.vercel.app/authors"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": author.name,
                "item": `https://assignment-uk-five.vercel.app/authors/${author.id}`
            }
        ]
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <Breadcrumbs
                items={[
                    { label: 'Authors', href: '#' },
                    { label: author.name }
                ]}
            />

            <ExpertProfile author={author} />
        </main>
    )
}
