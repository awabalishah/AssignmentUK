import { notFound } from 'next/navigation'
import data from '@/data/pseo.json'
import servicesData from '@/data/pseo-services.json'
import Link from 'next/link'
import { GraduationCap, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import ExpertProfile from '@/app/components/ExpertProfile'
import ExpertSummary from '@/app/components/ExpertSummary'
import { AcademicStyle } from '@/app/constants/AcademicStyle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import authorsData from '@/data/authors.json'
import TrackedLink from '@/app/components/TrackedLink'

import { Metadata } from 'next'

export async function generateStaticParams() {
    return data.universities.map((uni) => ({
        university: uni.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ university: string }> }): Promise<Metadata> {
    const { university } = await params;
    const realUni = data.universities.find(u =>
        u.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === university
    );

    if (!realUni) return { title: 'University Hub' };

    return {
        title: `Expert Assignment Help at ${realUni} | UK Writers`,
        description: `Get professional academic support for all modules at ${realUni}. 100% plagiarism-free, on-time delivery, and specialized for ${realUni} grading standards.`,
        alternates: {
            canonical: `/uni/${university}`
        }
    }
}

export default async function UniversityPage({ params }: { params: Promise<{ university: string }> }) {
    const { university } = await params;

    const realUni = data.universities.find(u =>
        u.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === university
    );

    if (!realUni) {
        notFound();
    }

    const uniService = (servicesData as any[]).find(s => s.university === realUni);
    const city = uniService?.city || "";
    const relatedInCity = city ? (servicesData as any[]).filter(s => s.city === city && s.university !== realUni) : [];

    const currentAuthor = authorsData[0]; // Lead author for university hub

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
                "name": realUni,
                "item": `https://assignment-writing.com/uni/${university}`
            }
        ]
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Does AssignUK offer specific support for ${realUni} students?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we provide tailored academic support designed specifically to meet the marking rubrics and standards of ${realUni}.`
                }
            },
            {
                "@type": "Question",
                "name": `How do you handle referencing for ${realUni} assignments?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We specialize in all major UK referencing styles required by ${realUni}, including Harvard, OSCOLA, and APA. Every assignment is checked for precise citation accuracy.`
                }
            },
            {
                "@type": "Question",
                "name": "What is the deadline guarantee for university work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer 100% on-time delivery. Whether you need an elite express service or standard turnaround, we guarantee your work will be ready before your deadline."
                }
            }
        ]
    };

    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Academic Support",
        "name": `Expert Academic Support at ${realUni}`,
        "description": `Professional assignment help and exam preparation designed specifically for ${realUni} standards.`,
        "provider": {
            "@type": "Organization",
            "name": "AssignUK"
        }
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <Breadcrumbs
                items={[
                    { label: 'Services', href: '/#services' },
                    { label: realUni }
                ]}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
            <section className="section hero-gradient" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '5rem' }}>
                        <div className="animate-fade-in">
                            <div className="flex items-center mb-1 text-secondary" style={{ gap: '0.75rem' }}>
                                <GraduationCap size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">Tailored for {realUni}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl mb-2">Expert Academic Support at <span className="text-gradient-gold">{realUni}</span></h1>
                            <p className="text-lg text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                Get specialized assignment help and exam preparation designed specifically for <span className="font-bold text-primary">{realUni}</span> graduation standards and {AcademicStyle.terms.grading} rubrics.
                            </p>
                            <div className="flex" style={{ gap: '1.25rem' }}>
                                <TrackedLink
                                    href="#contact"
                                    className="btn btn-primary"
                                    eventName="lead_inquiry"
                                    eventParams={{ page_topic: realUni }}
                                    style={{ padding: '1rem 2rem' }}
                                >
                                    Get a Free Quote
                                </TrackedLink>
                                <Link href="#services" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>Explore Subjects</Link>
                            </div>
                        </div>
                        <div className="flex flex-col animate-fade-in" style={{ gap: '2.5rem', animationDelay: '0.2s' }}>
                            <div className="glass-card" style={{ padding: '3.5rem' }}>
                                <h3 className="text-2xl mb-2">Why {realUni} Students Choose Us?</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: '1.5rem' }}>
                                    {[
                                        'Uni-Specific Marking Knowledge',
                                        'PhD Writers from Russell Group',
                                        '100% Plagiarism-Free Guarantee',
                                        'Fast 24h Express Turnaround'
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
                            <div className="glass-card" style={{ padding: '1.75rem', border: '1.5px solid var(--secondary)', background: 'rgba(207, 158, 46, 0.03)' }}>
                                <div className="flex items-center" style={{ gap: '1.25rem' }}>
                                    <div style={{ background: 'var(--gold-gradient)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px' }}>
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold mb-0">Elite Quality Guarantee</h4>
                                        <p className="text-xs mb-0" style={{ opacity: 0.8 }}>{AcademicStyle.guarantee}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="text-4xl mb-1">Our Coverage in {realUni}</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>From the library to the lecture hall, we support all departments with PhD-level precision.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '2.5rem' }}>
                        {data.subjects.slice(0, 4).map(s => (
                            <div key={s.id} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', background: '#fff', border: '1px solid #E2E8F0' }}>
                                <h4 className="mb-1" style={{ fontSize: '1.1rem' }}>{s.name}</h4>
                                <p className="text-xs text-muted mb-2" style={{ lineHeight: '1.6' }}>{s.description.slice(0, 70)}...</p>
                                <Link href={`/subject/${s.id}`} className="text-xs font-bold text-secondary uppercase tracking-widest">View Program →</Link>
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
                        <p className="text-muted">Academic support queries for {realUni} students</p>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            {
                                q: `Does AssignUK offer specific support for ${realUni} students?`,
                                a: `Yes, we provide tailored academic support designed specifically to meet the marking rubrics and standards of ${realUni}.`
                            },
                            {
                                q: `How do you handle referencing for ${realUni} assignments?`,
                                a: `Our experts are well-versed in all major referencing styles used in the UK, including Harvard, APA, OSCOLA, and IEEE. We ensure every citation meets your specific university guidelines.`
                            },
                            {
                                q: `What is the delivery time for university assignments?`,
                                a: `We offer a variety of turnaround times to suit your needs, from 24-hour urgent delivery to standard 10-day windows. Our goal is to ensure you never miss a deadline.`
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
