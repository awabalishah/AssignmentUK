import { notFound } from 'next/navigation'
import servicesData from '@/data/pseo-services.json'
import Link from 'next/link'
import { GraduationCap, BookOpen, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

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
    }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = (servicesData as Service[]).find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    // Internal Linking Logic: Find 3 other pages from the same city
    const relatedInCity = (servicesData as Service[])
        .filter(s => s.city === service.city && s.slug !== service.slug)
        .slice(0, 3);

    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": service.title,
        "description": service.description,
        "url": `https://assignment-uk-five.vercel.app/services/${service.slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": service.city,
            "addressCountry": "GB"
        },
        "provider": {
            "@type": "Organization",
            "name": "AssignUK",
            "logo": "https://assignment-uk-five.vercel.app/logo.png"
        }
    };

    return (
        <main>
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
                            <h1 className="text-4xl md:text-5xl mb-2">{service.title}</h1>
                            <p className="text-lg text-muted mb-3">
                                Professional <span className="font-bold">{service.type}</span> support for students in <span className="font-bold">{service.city}</span>. Specialized in <span className="text-gradient-gold font-bold">{service.referencing}</span> standards.
                            </p>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <Link href="/#contact" className="btn btn-primary">Get a Free Quote</Link>
                                <Link href="/#services" className="btn btn-outline">All Subjects</Link>
                            </div>
                        </div>
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
                                <h4 className="text-sm font-bold uppercase mb-1">Key Modules Covered:</h4>
                                <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                                    {service.modules.map(mod => (
                                        <span key={mod} className="text-xs font-bold" style={{ background: 'var(--bg-alt)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid #eee' }}>
                                            {mod}
                                        </span>
                                    ))}
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
                                our writers provide the depth of analysis and clarity of argument needed to secure top-tier marks in {service.city}.
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

            {/* Internal Linking: More in [City] */}
            {relatedInCity.length > 0 && (
                <section className="section section-alt" style={{ borderTop: '1px solid #eee' }}>
                    <div className="container">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h2 className="text-2xl mb-0">Academic Support in {service.city}</h2>
                                <p className="text-muted">More specialized services for students in your area</p>
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
