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

export async function generateStaticParams() {
    return data.universities.map((uni) => ({
        university: uni.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
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
                "item": "https://assignment-uk-five.vercel.app"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://assignment-uk-five.vercel.app/#services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": realUni,
                "item": `https://assignment-uk-five.vercel.app/uni/${university}`
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
            <section className="section hero-gradient" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
                        <div>
                            <div className="flex items-center mb-1 text-gradient-gold" style={{ gap: '0.5rem' }}>
                                <GraduationCap size={20} />
                                <span className="text-xs font-bold uppercase tracking-wider">Tailored for {realUni}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl mb-2">Expert Academic Support at <span className="text-gradient-gold">{realUni}</span></h1>
                            <p className="text-lg text-muted mb-3">
                                Get specialized assignment help and exam preparation designed specifically for <span className="font-bold">{realUni}</span> graduation standards and {AcademicStyle.terms.grading} rubrics.
                            </p>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <Link href="/#contact" className="btn btn-primary">Get a Free Quote</Link>
                                <Link href="/#services" className="btn btn-outline">Explore Subjects</Link>
                            </div>
                        </div>
                        <div className="flex flex-col" style={{ gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '3rem' }}>
                                <h3 className="text-2xl mb-2">Why {realUni} Students Choose Us?</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: '1.2rem' }}>
                                    {[
                                        'Uni-Specific Marking Knowledge',
                                        'PhD Writers from Russell Group',
                                        '100% Plagiarism-Free Guarantee',
                                        'Fast 24h Express Turnaround'
                                    ].map(item => (
                                        <li key={item} className="flex items-center" style={{ gap: '0.75rem' }}>
                                            <CheckCircle2 size={20} color="var(--success)" />
                                            <span className="font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <ExpertSummary author={currentAuthor as any} />
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

            <section className="section">
                <div className="container">
                    <div className="text-center mb-3">
                        <h2 className="text-3xl mb-1">Our Coverage in {realUni}</h2>
                        <p className="text-muted">From the library to the lecture hall, we support all departments.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {data.subjects.slice(0, 4).map(s => (
                            <div key={s.id} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <h4 className="mb-1">{s.name}</h4>
                                <p className="text-xs text-muted mb-2">{s.description.slice(0, 60)}...</p>
                                <Link href={`/subject/${s.id}`} className="text-xs font-bold text-gradient-gold">View Details →</Link>
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
