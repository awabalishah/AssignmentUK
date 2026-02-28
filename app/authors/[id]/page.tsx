import { notFound } from 'next/navigation'
import authorsData from '@/data/authors.json'
import ExpertProfile from '@/app/components/ExpertProfile'
import Breadcrumbs from '@/app/components/Breadcrumbs'

import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const author = (authorsData as any[]).find((a) => a.id === id);

    return {
        title: `${author?.name} - Academic Specialist | AssignUK`,
        description: `${author?.name} is a senior academic scholar specializing in ${author?.specialties?.join(', ')}. Expert support for UK students.`,
        alternates: {
            canonical: `https://assignment-writing.com/authors/${id}`
        }
    }
}

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
                "item": "https://assignment-writing.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Authors",
                "item": "https://assignment-writing.com/authors"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": author.name,
                "item": `https://assignment-writing.com/authors/${author.id}`
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
