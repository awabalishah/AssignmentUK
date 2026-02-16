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
import TrackedLink from '@/app/components/TrackedLink'
import SubjectChallenges from '@/app/components/SubjectChallenges'

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

    const metaTemplates = [
        `Expert ${service.subject} Help at ${service.university} | Top Grades`,
        `Premium ${service.type} Support - ${service.university} Specialist`,
        `${service.title} | 100% Plagiarism-Free Support in ${service.city}`,
        `Get ${service.subject} Academic Excellence at ${service.university}`
    ];

    return {
        title: metaTemplates[slug.length % 4],
        description: `${service.description} Dedicated PhD writers familiar with ${service.university} standards. Optimized for ${service.referencing} referencing and high-intent modules.`,
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
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1200",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": service.title,
        "description": `Academic support course for ${service.subject} at ${service.university}. Focuses on ${service.modules.slice(0, 3).join(', ')}.`,
        "provider": {
            "@type": "Organization",
            "name": "AssignUK",
            "sameAs": "https://assignment-writing.com"
        },
        "courseCode": `${service.subject.substring(0, 3).toUpperCase()}-${service.city.substring(0, 3).toUpperCase()}`,
        "educationalLevel": "University undergraduate and postgraduate support",
        "about": {
            "@type": "Thing",
            "name": service.subject
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1200"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
            />
            <section className="section hero-gradient" style={{ padding: '6rem 0 8rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '5rem' }}>
                        <div className="animate-fade-in">
                            <div className="flex items-center mb-1 text-secondary" style={{ gap: '0.75rem' }}>
                                <GraduationCap size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">{service.university} Specialist</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl mb-2">{service.title}</h1>
                            <div className="flex items-center mb-3" style={{ gap: '0.75rem', opacity: 0.9 }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--navy-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#fff' }}>UK</div>
                                <span className="text-sm">Verified by <strong>Senior Scholar {currentAuthor.name}</strong></span>
                            </div>
                            <p className="text-lg text-muted mb-4" style={{ lineHeight: '1.8' }}>
                                Bespoke <span className="font-bold text-primary">{service.type}</span> support for students in <span className="font-bold text-primary">{service.city}</span>. Rigorous adherence to <span className="text-gradient-gold font-bold">{service.referencing}</span> standards.
                            </p>
                            <div className="flex" style={{ gap: '1.25rem' }}>
                                <TrackedLink
                                    href="#contact"
                                    className="btn btn-primary"
                                    eventName="lead_inquiry"
                                    eventParams={{ page_topic: service.subject }}
                                    style={{ padding: '1rem 2rem' }}
                                >
                                    Request Bespoke Quote
                                </TrackedLink>
                                <Link href="/#services" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>All Subjects</Link>
                            </div>
                        </div>
                        <div className="flex flex-col animate-fade-in" style={{ gap: '2.5rem', animationDelay: '0.2s' }}>
                            <div className="glass-card" style={{ padding: '3.5rem', background: '#fff', border: '1px solid #E2E8F0' }}>
                                <h3 className="text-2xl mb-2">Service Brief</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: '1.5rem' }}>
                                    {[
                                        { icon: <BookOpen size={20} />, label: 'Specialty', val: service.subject },
                                        { icon: <MapPin size={20} />, label: 'Hub', val: service.city },
                                        { icon: <ShieldCheck size={20} />, label: 'Standards', val: service.referencing }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center" style={{ gap: '1rem' }}>
                                            <div style={{ background: 'var(--bg-alt)', padding: '0.6rem', borderRadius: '12px', color: 'var(--primary)' }}>{item.icon}</div>
                                            <span style={{ fontSize: '1rem' }}><strong style={{ opacity: 0.7 }}>{item.label}:</strong> <span className="font-bold">{item.val}</span></span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1.5px solid #F1F5F9' }}>
                                    <h4 className="text-xs font-bold uppercase mb-2 tracking-widest opacity-60">Curriculum Coverage:</h4>
                                    <div className="flex flex-wrap" style={{ gap: '0.6rem' }}>
                                        {service.modules.map(mod => (
                                            <span key={mod} className="text-xs font-bold" style={{ background: 'var(--secondary-glow)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>
                                                {mod}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <ExpertSummary author={currentAuthor} />
                            <div className="glass-card" style={{ padding: '1.75rem', border: '1.5px solid var(--secondary)', background: 'rgba(207, 158, 46, 0.03)' }}>
                                <div className="flex items-center" style={{ gap: '1.25rem' }}>
                                    <div style={{ background: 'var(--gold-gradient)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px' }}>
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold mb-0">Academic Excellence Guarantee</h4>
                                        <p className="text-xs mb-0" style={{ opacity: 0.8 }}>{AcademicStyle.guarantee}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SubjectChallenges subject={service.subject} />

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
                            <p className="mb-2">
                                {(() => {
                                    const sub = service.subject.toLowerCase();
                                    const key = sub.includes('law') ? 'law' :
                                        sub.includes('nursing') ? 'nursing' :
                                            (sub.includes('business') || sub.includes('mba') || sub.includes('marketing')) ? 'business-writing' :
                                                (sub.includes('computer') || sub.includes('programming')) ? 'programming' :
                                                    sub.includes('economics') ? 'economics' :
                                                        sub.includes('psychology') ? 'psychology' :
                                                            sub.includes('engineering') ? 'engineering' :
                                                                (sub.includes('finance') || sub.includes('accounting')) ? 'finance' :
                                                                    sub.includes('sociology') ? 'sociology' : null;

                                    if (key && AcademicStyle.subjectNuance[key as keyof typeof AcademicStyle.subjectNuance]) {
                                        return AcademicStyle.subjectNuance[key as keyof typeof AcademicStyle.subjectNuance][service.slug.length % 3];
                                    }
                                    return "Technical academic support tailored to your specific module outcomes and university marking rubrics.";
                                })()}
                            </p>
                            <p>
                                Whether you're working on <span className="italic">{service.modules.join(' or ')}</span>,
                                our writers provide the depth of analysis and clarity of argument needed to secure {AcademicStyle.firstClass} {AcademicStyle.marks} in {service.city}.
                                <br /><br />
                                <span className="text-xs text-muted italic">{AcademicStyle.regionalContext[service.slug.length % 3]}</span>
                            </p>
                        </div>
                        <div style={{ background: '#fff', padding: '3.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-premium)' }}>
                            <h3 className="text-2xl mb-2 font-bold">Standard Features:</h3>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1.25rem' }}>
                                {[
                                    '100% Plagiarism-Free (Turnitin Official Report)',
                                    'PhD-Qualified UK Subject Specialists only',
                                    'Secure Messaging with your Private Writer',
                                    'Unlimited Free Revisions & Polishing'
                                ].map(f => (
                                    <li key={f} className="flex items-center" style={{ gap: '1rem' }}>
                                        <CheckCircle2 size={20} color="var(--success)" />
                                        <span className="font-bold" style={{ fontSize: '0.95rem' }}>{f}</span>
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
