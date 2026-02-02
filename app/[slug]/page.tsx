import { Metadata } from 'next'
import data from '@/data/pseo.json'
import { GraduationCap, Users, Star, ShieldCheck } from 'lucide-react'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const paths: any[] = []
    data.subjects.forEach(subject => {
        data.cities.forEach(city => {
            paths.push({
                slug: `${subject.id}-assignment-help-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
            })
        })
    })
    return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const [subjectId, ...rest] = slug.split('-assignment-help-')
    const city = rest.join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const subject = data.subjects.find(s => s.id === subjectId)

    return {
        title: `${subject?.name} Assignment Help in ${city} | #1 UK Service`,
        description: `Leading ${subject?.name} assignment writing service in ${city}. Trusted by students at top UK universities for plagiarism-free work.`,
        alternates: {
            canonical: `/${slug}`
        }
    }
}

export default async function PSEOPage({ params }: Props) {
    const { slug } = await params
    const [subjectId, ...rest] = slug.split('-assignment-help-')
    const city = rest.join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const subject = data.subjects.find(s => s.id === subjectId)

    if (!subject) return <div>Service Not Found</div>

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
                "name": subject.name,
                "item": `https://assignment-uk-five.vercel.app/subject/${subject.id}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `${subject.name} in ${city}`,
                "item": `https://assignment-uk-five.vercel.app/${slug}`
            }
        ]
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${subject.name} Assignment Help in ${city}`,
        "description": subject.description,
        "brand": {
            "@type": "Brand",
            "name": "AssignUK"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
        }
    }

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <section className="section hero-gradient" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
                        <div>
                            <div className="flex items-center mb-1 text-gradient-gold" style={{ gap: '0.5rem' }}>
                                <GraduationCap size={20} />
                                <span className="text-xs font-bold uppercase tracking-wider">UK Academic Support</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl mb-1">{subject.name} Assignment Help in {city}</h1>
                            <div className="flex items-center mb-2" style={{ gap: '0.5rem', opacity: 0.8 }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#fff' }}>UK</div>
                                <span className="text-xs">Verified by <strong>Dr. James W.</strong> (Lead Reviewer, {city} Region)</span>
                            </div>
                            <p className="text-lg text-muted mb-3">
                                Professional assistance for your {subject.name} assignments in {city}. Our experts ensure your work meets the exact criteria set by local tutors.
                            </p>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
                                <a href="#services" className="btn btn-outline">All Subjects</a>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '3rem' }}>
                            <h3 className="text-2xl mb-2">Local Stats: {city}</h3>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1.2rem' }}>
                                <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                    <Users size={20} color="var(--secondary)" />
                                    <span><strong>Students Helped:</strong> 1,200+ in {city}</span>
                                </li>
                                <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                    <Star size={20} color="var(--secondary)" fill="var(--secondary)" />
                                    <span><strong>Average Rating:</strong> 4.9/5</span>
                                </li>
                                <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                    <ShieldCheck size={20} color="var(--success)" />
                                    <span><strong>Turnitin Score:</strong> Below 5% Guaranteed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '4rem' }}>
                        <div>
                            <h2 className="text-3xl mb-1">Why Students in {city} Trust Us?</h2>
                            <p className="mb-2">{subject.description}</p>
                            <h3 className="text-xl mb-1 mt-2">Specialized Expertise In:</h3>
                            <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                                {subject.keywords.map(kw => (
                                    <span key={kw} className="text-xs font-bold" style={{ background: 'var(--bg-alt)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid #eee' }}>{kw}</span>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: 'var(--bg-alt)', padding: '3rem', borderRadius: '16px' }}>
                            <h3 className="text-xl mb-2 font-bold">{city} Academic Standards</h3>
                            <p className="text-sm mb-2">Our team is updated with the latest 2024/2025 grading rubrics used by major universities across the {city} region.</p>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                                {[
                                    '100% Plagiarism-Free (Turnitin Report)',
                                    'UK-Based Subject Specialists',
                                    'Direct Communication with Writer',
                                    'Unlimited Free Revisions'
                                ].map(f => (
                                    <li key={f} className="flex items-center" style={{ gap: '0.5rem' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                                        <span className="text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
