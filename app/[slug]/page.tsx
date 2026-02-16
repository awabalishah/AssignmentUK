import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import data from '@/data/pseo.json'
import servicesData from '@/data/pseo-services.json'
import Link from 'next/link'
import { GraduationCap, Users, Star, ShieldCheck, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import ExpertProfile from '@/app/components/ExpertProfile'
import ExpertSummary from '@/app/components/ExpertSummary'
import { AcademicStyle } from '@/app/constants/AcademicStyle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import authorsData from '@/data/authors.json'
import TrackedLink from '@/app/components/TrackedLink'
import SubjectChallenges from '@/app/components/SubjectChallenges'

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

    // Strict pattern matching for [subject]-assignment-help-[city]
    if (!slug.includes('-assignment-help-')) {
        return notFound()
    }

    const [subjectId, ...rest] = slug.split('-assignment-help-')
    const citySlug = rest.join('-')
    const city = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const subject = data.subjects.find(s => s.id === subjectId)

    // Validate if subject exists and if city exists in our data
    const cityExists = data.cities.some(c => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === citySlug.toLowerCase())

    if (!subject || !cityExists) return notFound()

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
            "name": "AssignUK",
            "logo": "https://assignment-writing.com/logo.png"
        },
        "areaServed": {
            "@type": "City",
            "name": city
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1200",
            "bestRating": "5",
            "worstRating": "1"
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
            <section className="section hero-gradient" style={{ padding: '6rem 0 8rem 0', borderBottom: '1px solid #eee' }}>
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
                                <TrackedLink
                                    href="#contact"
                                    className="btn btn-primary"
                                    eventName="lead_inquiry"
                                    eventParams={{ page_topic: subject.name }}
                                >
                                    Get a Free Quote
                                </TrackedLink>
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

            {/* Local Academic Context - Enhancement for uniqueness */}
            <section className="section" style={{ background: '#fff', borderTop: '1px solid #eee' }}>
                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--secondary-glow)' }}>
                        <h2 className="text-3xl mb-2">Academic Excellence in {city}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2rem' }}>
                            <div>
                                <h4 className="text-lg mb-1 font-bold">Local Standards</h4>
                                <p className="text-sm text-muted">{AcademicStyle.regionalContext[0]} We focus on the specific marking criteria prevalent across {city}&apos;s higher education institutions.</p>
                            </div>
                            <div>
                                <h4 className="text-lg mb-1 font-bold">Expert Insights</h4>
                                <p className="text-sm text-muted">{AcademicStyle.regionalContext[1]} This ensures your {subject.name} assignment resonates with local academic expectations.</p>
                            </div>
                            <div>
                                <h4 className="text-lg mb-1 font-bold">University Hub</h4>
                                <p className="text-sm text-muted">{AcademicStyle.regionalContext[2]} Our support is designed for students seeking top-tier results in the {city} area.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subject Specific Technical Depth */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="text-3xl mb-3 text-center">Technical Depth in {subject.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem' }}>
                        {AcademicStyle.subjectNuance[subject.id as keyof typeof AcademicStyle.subjectNuance]?.map((nuance, i) => (
                            <div key={i} className="flex items-start" style={{ gap: '1rem' }}>
                                <div style={{ background: 'var(--primary)', color: '#fff', padding: '0.5rem', borderRadius: '50%', flexShrink: 0 }}>
                                    <CheckCircle2 size={16} />
                                </div>
                                <p className="text-sm font-medium">{nuance}.</p>
                            </div>
                        ))}
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
