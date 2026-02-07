import { notFound } from 'next/navigation'
import servicesData from '@/data/pseo-services.json'
import Link from 'next/link'
import { GraduationCap, BookOpen, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import ExpertProfile from '@/app/components/ExpertProfile'
import ExpertSummary from '@/app/components/ExpertSummary'
import { AcademicStyle } from '@/app/constants/AcademicStyle'
import { ShieldCheck, Award, Fingerprint } from 'lucide-react'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import authorsData from '@/data/authors.json'

// Type definition for service data
interface Service {
    slug: string;
    title: string;
    subject: string;
    university: string;
    city: string;
    referencing: string;
    modules: string[];
    type: string;
    description: string;
}

export async function generateStaticParams() {
    return (servicesData as Service[]).map((service) => ({
        slug: service.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = (servicesData as Service[]).find(s => s.slug === slug);

    if (!service) return { title: 'Service Not Found' };

    return {
        title: service.title,
        description: service.description,
        alternates: {
            canonical: `/services/${service.slug}`
        }
    }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = (servicesData as Service[]).find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    const currentAuthor = (authorsData as any[]).find(a =>
        a.specialties.some((spec: string) => service.subject.toLowerCase().includes(spec.toLowerCase()))
    ) || authorsData[0];

    // Internal Linking Logic: Find 3 other pages from the same city
    const relatedInCity = (servicesData as Service[])
        .filter(s => s.city === service.city && s.slug !== service.slug);

    // Semantic SEO: Find 3 other schools for the same subject
    const relatedSchools = (servicesData as Service[])
        .filter(s => s.subject === service.subject && s.slug !== service.slug)
        .slice(0, 3);

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Is your ${service.subject} service at ${service.university} confidential?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we provide 100% confidential support. All communication is encrypted, and your data is never shared with ${service.university} or any third party.`
                }
            },
            {
                "@type": "Question",
                "name": `How do you ensure correct ${service.referencing} referencing?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Our writers are specialists in ${service.referencing} standards. Every ${service.type} is double-checked by our quality team to ensure every citation meets the specific manual requirements of your department.`
                }
            },
            {
                "@type": "Question",
                "name": `What is the typical delivery time for a ${service.type} at ${service.university}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `We offer flexible delivery options ranging from 24-hour express turnaround to standard 7-day windows. We guarantee that your ${service.subject} assignment will be delivered before your deadline, allowing ample time for review.`
                }
            }
        ]
    };

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
                "name": service.subject,
                "item": `https://assignment-writing.com/subject/${service.subject.toLowerCase()}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": service.title,
                "item": `https://assignment-writing.com/services/${service.slug}`
            }
        ]
    };

    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.type,
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "AssignUK",
            "logo": "https://assignment-writing.com/logo.png"
        },
        "areaServed": {
            "@type": "City",
            "name": service.city
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${service.subject} Support`,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `${service.subject} Help at ${service.university}`
                    }
                }
            ]
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
                    { label: service.subject, href: `/subject/${service.subject.toLowerCase()}` },
                    { label: service.title }
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
            {/* SEO Optimized Hero Section */}
            <section className="section hero-gradient" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
                        <div>
                            <div className="flex items-center mb-1 text-gradient-gold" style={{ gap: '0.5rem' }}>
                                <GraduationCap size={20} />
                                <span className="text-xs font-bold uppercase tracking-wider">{service.university} Experts</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl mb-1">{service.title}</h1>
                            <div className="flex items-center mb-2" style={{ gap: '0.5rem', opacity: 0.8 }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#fff' }}>UK</div>
                                <span className="text-xs">Identified & Verified by <strong>{currentAuthor.name}</strong> (Subject Lead)</span>
                            </div>
                            <p className="text-lg text-muted mb-3">
                                Professional <span className="font-bold">{service.type}</span> support for students in <span className="font-bold">{service.city}</span>. Specialized in <span className="text-gradient-gold font-bold">{service.referencing}</span> standards.
                            </p>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <Link href="/#contact" className="btn btn-primary">Get a Free Quote</Link>
                                <Link href="/#services" className="btn btn-outline">All Subjects</Link>
                            </div>
                        </div>
                        <div className="flex flex-col" style={{ gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '3rem' }}>
                                <h3 className="text-2xl mb-2">Service Details</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: '1.2rem' }}>
                                    <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                        <BookOpen size={20} color="var(--secondary)" />
                                        <span><strong>Subject:</strong> {service.subject}</span>
                                    </li>
                                    <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                        <MapPin size={20} color="var(--secondary)" />
                                        <span><strong>Location:</strong> {service.city}</span>
                                    </li>
                                    <li className="flex items-center" style={{ gap: '0.75rem' }}>
                                        <CheckCircle2 size={20} color="var(--success)" />
                                        <span><strong>Style:</strong> {service.referencing}</span>
                                    </li>
                                </ul>
                                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                                    <h4 className="text-sm font-bold uppercase mb-1">Key {AcademicStyle.modules} Covered:</h4>
                                    <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                                        {service.modules.map(mod => (
                                            <span key={mod} className="text-xs font-bold" style={{ background: 'var(--bg-alt)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid #eee' }}>
                                                {mod}
                                            </span>
                                        ))}
                                    </div>
                                </div>
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
                            <h2 className="text-3xl mb-1">Why Choose Our {service.subject} Experts?</h2>
                            <p className="mb-2">
                                Our team is intimately familiar with the academic expectations at <span className="font-bold">{service.university}</span>.
                                We don't just write; we research and reference according to the specific <span className="font-bold">{service.referencing}</span> guidelines
                                required by your department.
                            </p>
                            <p>
                                Whether you're working on <span className="italic">{service.modules.join(' or ')}</span>,
                                our writers provide the depth of analysis and clarity of argument needed to secure {AcademicStyle.firstClass} {AcademicStyle.marks} in {service.city}.
                            </p>
                        </div>
                        <div style={{ background: 'var(--bg-alt)', padding: '3rem', borderRadius: '16px' }}>
                            <h3 className="text-xl mb-2 font-bold">Standard Features:</h3>
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

            {/* Technical Referencing Standards: Trust Badge Section */}
            <section className="section" style={{ background: 'var(--navy-gradient)', color: '#fff' }}>
                <div className="container">
                    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.3)', background: 'rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ display: 'inline-flex', background: 'var(--secondary)', color: '#fff', padding: '0.75rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                            <Fingerprint size={32} />
                        </div>
                        <h2 className="text-3xl mb-1" style={{ color: '#fff' }}>Technical Referencing Standards</h2>
                        <div className="flex items-center justify-center mb-1" style={{ gap: '0.5rem' }}>
                            <span className="text-2xl font-bold text-gradient-gold">{service.referencing} Certified</span>
                        </div>
                        {service.referencing === 'OSCOLA' && (
                            <p className="text-lg mb-0" style={{ opacity: 0.9 }}>
                                Specialized in UK Law citations, including primary sources, neutral citations, and statutory instruments.
                            </p>
                        )}
                        {service.referencing === 'Harvard' && (
                            <p className="text-lg mb-0" style={{ opacity: 0.9 }}>
                                Strict adherence to Cite Them Right (UK) standards.
                            </p>
                        )}
                        {!['OSCOLA', 'Harvard'].includes(service.referencing) && (
                            <p className="text-lg mb-0" style={{ opacity: 0.9 }}>
                                Precise adherence to {service.referencing} academic citation manuals required by {service.university}.
                            </p>
                        )}
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.7 }}>
                            <div className="flex items-center text-xs" style={{ gap: '0.5rem' }}>
                                <CheckCircle2 size={14} /> 100% Accuracy
                            </div>
                            <div className="flex items-center text-xs" style={{ gap: '0.5rem' }}>
                                <CheckCircle2 size={14} /> University Verified
                            </div>
                            <div className="flex items-center text-xs" style={{ gap: '0.5rem' }}>
                                <CheckCircle2 size={14} /> QAA Compliant
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section: How It Works */}
            <section className="section" style={{ borderTop: '1px solid #eee' }}>
                <div className="container">
                    <div className="text-center mb-3">
                        <h2 className="text-3xl mt-0">Our 4-Step Academic Success Process</h2>
                        <p className="text-muted">How we ensure your {service.subject} assignment meets {service.university} and {AcademicStyle.standards}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '2rem' }}>
                        {[
                            { step: '01', title: 'Consultation', desc: 'Brief our {service.subject} lead on your specific module requirements.' },
                            { step: '02', title: 'Expert Matching', desc: 'We assign a PhD writer familiar with {service.university} marking rubrics.' },
                            { step: '03', title: 'Draft Review', desc: 'Receive an initial draft for feedback and alignment check.' },
                            { step: '04', title: 'Final Delivery', desc: 'Get your polished, {service.referencing}-referenced work with a Turnitin report.' }
                        ].map((s, idx) => (
                            <div key={idx} style={{ position: 'relative', padding: '1rem' }}>
                                <div className="text-4xl font-black text-gradient-gold" style={{ opacity: 0.2, marginBottom: '-1rem' }}>{s.step}</div>
                                <h4 className="text-xl mb-1">{s.title.replace('{service.subject}', service.subject)}</h4>
                                <p className="text-sm text-muted">{s.desc.replace('{service.subject}', service.subject).replace('{service.university}', service.university).replace('{service.referencing}', service.referencing)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Comparison Table */}
            <section className="section section-alt" style={{ borderTop: '1px solid #eee' }}>
                <div className="container">
                    <div className="text-center mb-3">
                        <h2 className="text-3xl mt-0">Why We Outperform Competitors</h2>
                        <p className="text-muted">A direct comparison of our standards vs. generic writing services</p>
                    </div>
                    <div className="glass-card" style={{ padding: 0, overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--navy-gradient)', color: '#fff' }}>
                                    <th style={{ padding: '1.5rem', textAlign: 'left' }}>Feature</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center' }}>AssignUK</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center' }}>Generic Sites</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { f: 'Writer Origin', us: 'UK-Based Scholars', them: 'Offshore/Freelance' },
                                    { f: 'Referencing Accuracy', us: 'Perfect ' + service.referencing, them: 'Generic Styles' },
                                    { f: 'Turnitin Report', us: 'Included Free', them: 'Extra Charge' },
                                    { f: 'Free Revisions', us: 'Unlimited', them: 'Limited to 7 days' },
                                    { f: 'University Knowledge', us: service.university + ' Specific', them: 'General Theory Only' },
                                    { f: 'Target Standard', us: 'Reliable ' + AcademicStyle.firstClass, them: 'Pass Only' }
                                ].map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1.2rem', fontWeight: 'bold' }}>{row.f}</td>
                                        <td style={{ padding: '1.2rem', textAlign: 'center', color: 'var(--success)', fontWeight: 'bold' }}>{row.us}</td>
                                        <td style={{ padding: '1.2rem', textAlign: 'center', opacity: 0.6 }}>{row.them}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Semantic SEO: Top Schools for [Subject] */}
            {relatedSchools.length > 0 && (
                <section className="section" style={{ background: '#fff' }}>
                    <div className="container">
                        <div className="mb-3">
                            <h2 className="text-2xl mb-1 mt-0">Elite Support for {service.subject}</h2>
                            <p className="text-muted">Specialized assistance for {service.subject} students at other leading UK institutions</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {relatedSchools.map(rel => (
                                <Link key={rel.slug} href={`/services/${rel.slug}`}>
                                    <div className="glass-card" style={{ padding: '2rem', height: '100%', transition: 'all 0.3s ease' }}>
                                        <h4 className="mb-1">{rel.subject} - {rel.university}</h4>
                                        <p className="text-xs text-muted mb-2">{rel.city} Hub</p>
                                        <div className="flex items-center text-xs font-bold text-gradient-gold">
                                            Academic Guide <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="section" style={{ borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="text-center mb-3">
                        <h2 className="text-3xl mt-0">Frequently Asked Questions</h2>
                        <p className="text-muted">Common queries from {service.university} students</p>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            {
                                q: `Is using this ${service.type} service legal?`,
                                a: `Absolutely. We provide academic research and model writing assistance that serves as a study guide. It is intended to help you understand complex ${service.subject} topics and improve your own writing standards.`
                            },
                            {
                                q: `Can I request a writer who knows ${service.university} specifically?`,
                                a: `Yes. We prioritize assigning writers who have either graduated from or have extensive experience with ${service.university}'s specific academic expectations and marking rubrics.`
                            },
                            {
                                q: `What if I need a revision for my ${service.subject} assignment?`,
                                a: `We offer unlimited free revisions for 14 days after delivery. Simply highlight the areas needing adjustment, and your writer will refine them until they meet your satisfaction.`
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
                        {/* New Required FAQs */}
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h4 className="text-lg mb-1" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Q:</span> How do you ensure correct {service.referencing} referencing?
                            </h4>
                            <p className="text-sm text-muted mb-0">
                                <span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: '0.5rem' }}>A:</span> Our writers are specialists in {service.referencing} standards. Every {service.type} is double-checked by our quality team to ensure every citation meets the specific manual requirements of your {service.university} department.
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h4 className="text-lg mb-1" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Q:</span> What is the typical delivery time for my assignment?
                            </h4>
                            <p className="text-sm text-muted mb-0">
                                <span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: '0.5rem' }}>A:</span> We offer flexible delivery options ranging from 24-hour express turnaround to standard 7-day windows. We guarantee that your {service.subject} assignment will be delivered before your deadline.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Linking: More in [City] */}
            {relatedInCity.length > 0 && (
                <section className="section section-alt" style={{ borderTop: '1px solid #eee' }}>
                    <div className="container">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h2 className="text-2xl mb-0">Other University Services in {service.city}</h2>
                                <p className="text-muted">Explore specialized support for students across leading institutions in {service.city}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {relatedInCity.map(rel => (
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
