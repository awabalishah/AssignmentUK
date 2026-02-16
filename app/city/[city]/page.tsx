import { notFound } from 'next/navigation'
import data from '@/data/pseo.json'
import servicesData from '@/data/pseo-services.json'
import Link from 'next/link'
import { MapPin, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import ExpertSummary from '@/app/components/ExpertSummary'
import { AcademicStyle } from '@/app/constants/AcademicStyle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import authorsData from '@/data/authors.json'
import TrackedLink from '@/app/components/TrackedLink'

import { Metadata } from 'next'

export async function generateStaticParams() {
    return data.cities.map((city) => ({
        city: city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const realCity = data.cities.find(c =>
        c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === city
    );

    if (!realCity) return { title: 'UK Service Locations' };

    return {
        title: `Expert Assignment Help in ${realCity} | UK Academic Writers`,
        description: `Struggling with assignments in ${realCity}? Get professional support for all UK universities in ${realCity}. 100% plagiarism-free, specialized local tutors, and on-time delivery.`,
        alternates: {
            canonical: `/city/${city}`
        }
    }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;

    const realCity = data.cities.find(c =>
        c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === city
    );

    if (!realCity) {
        notFound();
    }

    // Find universities in this city by checking pseo-services.json or using basic mapping
    const unisInCity = (servicesData as any[])
        .filter(s => s.city.toLowerCase() === realCity.toLowerCase())
        .map(s => s.university);

    // De-duplicate unis
    const uniqueUnis = Array.from(new Set(unisInCity));

    const currentAuthor = authorsData[0];

    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Academic Support",
        "name": `Assignment Help in ${realCity}`,
        "description": `Professional academic assistance for university students in ${realCity}. Trusted by 1,200+ local students.`,
        "provider": {
            "@type": "Organization",
            "name": "AssignUK",
            "logo": "https://assignment-writing.com/logo.png"
        },
        "areaServed": {
            "@type": "City",
            "name": realCity
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1240",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
            <Breadcrumbs
                items={[
                    { label: 'Locations', href: '/#services' },
                    { label: realCity }
                ]}
            />

            <section className="section hero-gradient" style={{ padding: '6rem 0 8rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '5rem' }}>
                        <div className="animate-fade-in">
                            <div className="flex items-center mb-1 text-secondary" style={{ gap: '0.75rem' }}>
                                <MapPin size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">Local Support in {realCity}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl mb-2">Premiere Assignment Help in <span className="text-gradient-gold">{realCity}</span></h1>
                            <p className="text-lg text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                Connecting students across <span className="font-bold text-primary">{realCity}</span> with elite academic scholars. Specialized support for every major institution in the area.
                                <br />
                                <span className="text-sm italic font-medium">{AcademicStyle.regionalContext[city.length % 3]}</span>
                            </p>
                            <div className="flex" style={{ gap: '1.25rem' }}>
                                <TrackedLink
                                    href="#contact"
                                    className="btn btn-primary"
                                    eventName="lead_inquiry"
                                    eventParams={{ location: realCity }}
                                    style={{ padding: '1rem 2rem' }}
                                >
                                    Get a Free Quote
                                </TrackedLink>
                                <Link href="#universities" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>Local Universities</Link>
                            </div>
                        </div>
                        <div className="flex flex-col animate-fade-in" style={{ gap: '2.5rem', animationDelay: '0.2s' }}>
                            <div className="glass-card" style={{ padding: '3.5rem' }}>
                                <h3 className="text-2xl mb-2">Regional Academic Excellence</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: '1.5rem' }}>
                                    {[
                                        `Local Experts familiar with ${realCity} Standards`,
                                        'Specialized Russell Group PhD Writers',
                                        'Confidential & Secure Service',
                                        'Direct WhatsApp Communication'
                                    ].map(item => (
                                        <li key={item} className="flex items-center" style={{ gap: '1rem' }}>
                                            <div style={{ background: 'var(--bg-alt)', padding: '0.4rem', borderRadius: '50%', display: 'flex' }}>
                                                <CheckCircle2 size={20} color="var(--success)" />
                                            </div>
                                            <span className="font-bold" style={{ fontSize: '0.95rem' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <ExpertSummary author={currentAuthor as any} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="universities">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="text-4xl mb-1">Universities We Cover in {realCity}</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Specialized academic assistance for students at all major {realCity} institutions.</p>
                    </div>
                    {uniqueUnis.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2rem' }}>
                            {uniqueUnis.map(uni => (
                                <Link key={uni} href={`/uni/${uni.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                                    <div className="glass-card p-6 text-center hover-glow transition-all">
                                        <GraduationCap size={40} className="mx-auto mb-4 text-secondary" />
                                        <h4 className="mb-0">{uni}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 glass-card">
                            <p className="text-muted">We provide support for all institutions in {realCity}, including distance learning students.</p>
                            <Link href="#contact" className="btn btn-gold">Inquire for My University</Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="text-4xl mb-1">Our Specialist Subjects</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Available to all students in {realCity} across these core disciplines.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '2.5rem' }}>
                        {data.subjects.map(s => (
                            <div key={s.id} className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: '#fff' }}>
                                <h4 className="mb-2">{s.name}</h4>
                                <Link href={`/subject/${s.id}`} className="text-xs font-bold text-secondary uppercase tracking-widest">Explore Program →</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
