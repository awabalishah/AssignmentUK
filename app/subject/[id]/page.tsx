import { notFound } from 'next/navigation'
import data from '@/data/pseo.json'
import Link from 'next/link'
import ExpertProfile from '@/app/components/ExpertProfile'
import ExpertSummary from '@/app/components/ExpertSummary'
import { AcademicStyle } from '@/app/constants/AcademicStyle'
import { ShieldCheck } from 'lucide-react'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import InstantQuoteSidebar from '@/app/components/InstantQuoteSidebar'
import authorsData from '@/data/authors.json'
import TrackedLink from '@/app/components/TrackedLink'
import SubjectChallenges from '@/app/components/SubjectChallenges'

export async function generateStaticParams() {
    return data.subjects.map((subject) => ({
        id: subject.id,
    }))
}

export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const subject = data.subjects.find((s) => s.id === id);

    if (!subject) {
        notFound();
    }

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
            }
        ]
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Is your ${subject.name} assignment help confidential?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, all our ${subject.name} academic support services are 100% confidential. We use SSL encryption and never share your details with any third party.`
                }
            },
            {
                "@type": "Question",
                "name": `How do you handle referencing for ${subject.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We specialize in all major UK referencing styles including Harvard, APA, OSCOLA, and IEEE. Every ${subject.name} assignment is double-checked for referencing accuracy.`
                }
            },
            {
                "@type": "Question",
                "name": "What is the delivery time for university assignments?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Delivery times range from 24-hour express to standard 7-day windows, depending on your needs. We always guarantee delivery before your deadline."
                }
            }
        ]
    };

    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Academic Support",
        "name": `Premium ${subject.name} Assignment Help`,
        "description": subject.description,
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
                    { label: subject.name }
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
            <section className="section hero-gradient" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-sm font-bold text-gradient-gold mb-1" style={{ textTransform: 'uppercase' }}>Expert Academic Support</span>
                        <h1 className="text-4xl mb-2">Premium {subject.name} Assignment Help</h1>
                        <p className="text-lg text-muted mb-3" style={{ maxWidth: '800px' }}>
                            {subject.description} tailored for UK university standards. Get top-tier results with our specialized experts.
                        </p>
                        <div className="flex justify-center" style={{ gap: '1rem' }}>
                            <TrackedLink
                                href="#contact"
                                className="btn btn-gold"
                                eventName="lead_inquiry"
                                eventParams={{ page_topic: subject.name }}
                            >
                                Get Started
                            </TrackedLink>
                            <Link href="/#services" className="btn btn-outline">All Subjects</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 className="text-3xl mb-1">Master Your {subject.name} {AcademicStyle.modules}</h2>
                            <p className="mb-2">Our team of UK-based scholars specializes in {subject.name}, ensuring every assignment meets rigorous academic criteria. Whether it's a first-year essay or a final dissertation, we provide the clarity and depth required for {AcademicStyle.firstClass} {AcademicStyle.marks}.</p>
                            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                                {subject.keywords.map(kw => (
                                    <div key={kw} className="flex items-center" style={{ gap: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                                        <span className="text-sm font-bold">{kw}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-card" style={{ padding: '3rem', marginTop: '3rem' }}>
                                <h3 className="text-2xl mb-1">Our Success Guarantee</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                                    <li className="flex" style={{ gap: '0.75rem' }}>
                                        <span style={{ color: 'var(--success)' }}>✓</span>
                                        <span>NMC & UK Professional Standards</span>
                                    </li>
                                    <li className="flex" style={{ gap: '0.75rem' }}>
                                        <span style={{ color: 'var(--success)' }}>✓</span>
                                        <span>100% Original Content (Turnitin Safe)</span>
                                    </li>
                                    <li className="flex" style={{ gap: '0.75rem' }}>
                                        <span style={{ color: 'var(--success)' }}>✓</span>
                                        <span>Unlimited Free Revisions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col" style={{ gap: '2rem' }}>
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

            {/* GEO Optimized Section */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="text-3xl text-center mb-3">Supporting Students Across the UK</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h4 className="mb-1">Top UK Cities</h4>
                            <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                                {data.cities.slice(0, 10).map(city => (
                                    <span key={city} className="text-xs" style={{ background: '#fff', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #eee' }}>{city}</span>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h4 className="mb-1">Target Universities</h4>
                            <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                                {data.universities.slice(0, 5).map(uni => (
                                    <span key={uni} className="text-xs" style={{ background: '#fff', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #eee' }}>{uni}</span>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h4 className="mb-1">2025 Standards</h4>
                            <p className="text-xs">All our {subject.name} experts are updated with the latest 2024/2025 {AcademicStyle.terms.grading} rubrics used by Russell Group universities to ensure {AcademicStyle.firstClass} results.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ Section */}
            <section className="section" style={{ borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="text-center mb-3">
                        <h2 className="text-3xl mt-0">Frequently Asked Questions</h2>
                        <p className="text-muted">Common queries about {subject.name} support</p>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            {
                                q: `Is your ${subject.name} assignment help confidential?`,
                                a: `Yes, all our academic support services are 100% confidential. We use SSL encryption and never share your details with any third party.`
                            },
                            {
                                q: `How do you handle referencing for ${subject.name}?`,
                                a: `Our experts are well-versed in all major referencing styles used in the UK, including Harvard, APA, OSCOLA, and IEEE. We ensure every citation meets your specific university guidelines.`
                            },
                            {
                                q: `What are the delivery times for university assignments?`,
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
            {/* Instant Quote Floating Widget */}
            <InstantQuoteSidebar />
        </main>
    )
}
