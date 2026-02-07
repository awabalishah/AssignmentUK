import { Metadata } from 'next'
import data from '@/data/pseo.json'
import servicesData from '@/data/pseo-services.json'
import Link from 'next/link'
import { GraduationCap, Users, Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react'
import ExpertProfile from '@/app/components/ExpertProfile'
import ExpertSummary from '@/app/components/ExpertSummary'
import { AcademicStyle } from '@/app/constants/AcademicStyle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import authorsData from '@/data/authors.json'

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

    const currentAuthor = (authorsData as any[]).find(a =>
        a.specialties.some((spec: string) => subject.name.toLowerCase().includes(spec.toLowerCase()))
    ) || authorsData[0];

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
                "name": "Services",
                "item": "https://assignment-writing.com/#services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": subject.name,
                "item": `https://assignment-writing.com/subject/${subject.id}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": `${subject.name} Help in ${city}`,
                "item": `https://assignment-writing.com/${slug}`
            }
        ]
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Is your ${subject.name} assignment help in ${city} confidential?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, all our academic support services in ${city} are 100% confidential. We use SSL encryption and never share your details with any third party or institution.`
                }
            },
            {
                "@type": "Question",
                "name": `How do you handle referencing for ${subject.name} assignments?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Our experts are well-versed in all major referencing styles used in the UK, including Harvard, APA, OSCOLA, and IEEE. We ensure every citation in your ${subject.name} assignment meets your specific university guidelines.`
                }
            },
            {
                "@type": "Question",
                "name": `What are the delivery times for ${subject.name} help in ${city}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We offer a variety of turnaround times to suit your needs, from 24-hour urgent delivery to standard 10-day windows. Our goal is to ensure you never miss a deadline in ${city}.`
                }
            }
        ]
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Academic Writing Support",
        "name": `${subject.name} Assignment Help in ${city}`,
        "description": subject.description,
        "provider": {
            "@type": "Organization",
            "name": "AssignUK"
        },
        "areaServed": {
            "@type": "City",
            "name": city
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${subject.name} Services`,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `${subject.name} help for local UK universities`
                    }
                }
            ]
        }
    }

    const relatedInCity = (servicesData as any[])
        .filter(s => s.city === city);

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <Breadcrumbs
                items={[
                    { label: 'Services', href: '/#services' },
                    { label: subject.name, href: `/subject/${subject.id}` },
                    { label: `${subject.name} Help in ${city}` }
                ]}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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
                                <span className="text-xs">Verified by <strong>{currentAuthor.name}</strong> (Lead Reviewer, {city} Region)</span>
                            </div>
                            <p className="text-lg text-muted mb-3">
                                Professional assistance for your {subject.name} assignments in {city}. Our experts ensure your work meets the exact criteria set by local tutors.
                            </p>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
                                <a href="#services" className="btn btn-outline">All Subjects</a>
                            </div>
                        </div>
                        <div className="flex flex-col" style={{ gap: '2rem' }}>
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
                                        <MapPin size={20} color="var(--secondary)" />
                                        <span><strong>Local Support:</strong> Near {city} Central & Student Districts</span>
                                    </li>
                                    <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                        <ShieldCheck size={20} color="var(--success)" />
                                        <span><strong>Turnitin Score:</strong> Below 5% Guaranteed</span>
                                    </li>
                                </ul>
                            </div>
                            <ExpertSummary author={currentAuthor} />
                            {/* Quality Guarantee Box */}
                            <div className="glass-card" style={{ padding: '1.5rem', border: '2px solid var(--secondary)', background: 'rgba(212, 175, 55, 0.05)' }}>
                                <div className="flex items-start" style={{ gap: '1rem' }}>
                                    <div style={{ background: 'var(--secondary)', color: '#fff', padding: '0.5rem', borderRadius: '8px' }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold mb-0">Quality Guarantee</h4>
                                        <p className="text-xs mb-0" style={{ opacity: 0.9 }}>{AcademicStyle.guarantee}</p>
                                    </div>
                                </div>
                            </div>
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
                            <p className="text-sm mb-2">Our team is updated with the latest 2024/2025 {AcademicStyle.terms.grading} rubrics used by major universities across the {city} region to ensure {AcademicStyle.firstClass} {AcademicStyle.marks}.</p>
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
            {/* FAQ Section */}
            <section className="section" style={{ borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="text-center mb-3">
                        <h2 className="text-3xl mt-0">Frequently Asked Questions</h2>
                        <p className="text-muted">Direct answers for {subject.name} students in {city}</p>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            {
                                q: `Is your ${subject.name} assignment help in ${city} confidential?`,
                                a: `Yes, all our academic support services in ${city} are 100% confidential. We use SSL encryption and never share your details with any third party or institution.`
                            },
                            {
                                q: `How do you handle referencing for ${subject.name} assignments?`,
                                a: `Our experts are well-versed in all major referencing styles used in the UK, including Harvard, APA, OSCOLA, and IEEE. We ensure every citation in your ${subject.name} assignment meets your specific university guidelines.`
                            },
                            {
                                q: `What are the delivery times for ${subject.name} help in ${city}?`,
                                a: `We offer a variety of turnaround times to suit your needs, from 24-hour urgent delivery to standard 10-day windows. Our goal is to ensure you never miss a deadline in ${city}.`
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                                <h4 className="text-lg mb-1" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Q:</span> {faq.q}
                                </h4>
                                <p className="text-sm text-muted mb-0">
                                    <span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: '0.5rem' }}>A:</span> {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Internal Linking: More in [City] */}
            {relatedInCity.length > 0 && (
                <section className="section section-alt" style={{ borderTop: '1px solid #eee' }}>
                    <div className="container">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h2 className="text-2xl mb-0">Other University Services in {city}</h2>
                                <p className="text-muted">Explore specialized support for students across leading institutions in {city}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {relatedInCity.map((rel: any) => (
                                <Link key={rel.slug} href={`/services/${rel.slug}`}>
                                    <div className="glass-card" style={{ padding: '2rem', height: '100%', transition: 'all 0.3s ease' }}>
                                        <h4 className="mb-1">{rel.subject} Support</h4>
                                        <p className="text-xs text-muted mb-2">{rel.university}</p>
                                        <div className="flex items-center text-xs font-bold text-gradient-gold">
                                            View Details <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
