import data from '@/data/pseo.json'
import Link from 'next/link'
import { MapPin, GraduationCap, ArrowRight, ShieldCheck, Star } from 'lucide-react'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export const metadata = {
    title: 'Student Service Directory | Academic Hubs in the UK',
    description: 'Explore our complete network of UK academic hubs. Specialized assignment help and university support available in every major city across England, Scotland, Wales, and Northern Ireland.',
    alternates: {
        canonical: 'https://assignment-writing.com/locations'
    }
}

export default function LocationsPage() {
    const cities = data.cities.sort();
    const universities = data.universities.sort();

    return (
        <main>
            <Breadcrumbs
                items={[
                    { label: 'Network', href: '/' },
                    { label: 'UK Locations & Universities' }
                ]}
            />

            <section className="section hero-gradient" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div className="text-center mb-4 animate-fade-in">
                        <span className="text-sm font-bold text-gradient-gold uppercase tracking-widest">Global Network • Local Expertise</span>
                        <h1 className="text-5xl md:text-6xl mb-2">Our UK Academic <span className="text-gradient-gold">Directory</span></h1>
                        <p className="text-lg text-muted mx-auto" style={{ maxWidth: '100%' }}>
                            Providing PhD-level academic support across every major educational hub in the United Kingdom. Find your local campus or city below to get specialized assistance.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '5rem' }}>

                        {/* Cities Column */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center mb-3" style={{ gap: '1rem' }}>
                                <div style={{ background: 'var(--bg-alt)', padding: '0.75rem', borderRadius: '12px' }}>
                                    <MapPin className="text-secondary" size={24} />
                                </div>
                                <h2 className="text-3xl mb-0">Covered Cities</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '1rem' }}>
                                {cities.map(city => (
                                    <Link
                                        key={city}
                                        href={`/city/${city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                        className="text-sm font-medium hover:text-secondary transition-colors transition-transform hover:translate-x-2 flex items-center"
                                        style={{ gap: '0.5rem' }}
                                    >
                                        <ArrowRight size={14} className="opacity-30" />
                                        {city}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Stats/Trust Column */}
                        <div className="flex flex-col" style={{ gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '2.5rem', background: 'var(--navy-gradient)', color: '#fff' }}>
                                <h4 style={{ color: '#fff' }} className="mb-2">Nationwide Coverage</h4>
                                <p className="text-sm mb-3" style={{ opacity: 0.8 }}>We support 150+ UK institutions with locally-aware scholars who understand your specific marking rubric.</p>
                                <div className="flex items-center" style={{ gap: '1rem' }}>
                                    <div className="text-3xl font-bold text-secondary">40+</div>
                                    <div className="text-xs uppercase font-bold tracking-widest">Cities Covered</div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <div className="flex items-center mb-2" style={{ gap: '0.75rem' }}>
                                    <ShieldCheck className="text-success" size={20} />
                                    <h4 className="mb-0 text-sm">Quality Assurance</h4>
                                </div>
                                <p className="text-xs text-muted mb-0">Every regional office adheres to our strict 100% plagiarism-free and 2:1 grade guarantee standards.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="flex items-center mb-4" style={{ gap: '1rem' }}>
                        <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '12px', border: '1px solid #eee' }}>
                            <GraduationCap className="text-secondary" size={24} />
                        </div>
                        <h2 className="text-3xl mb-0">Specialized University Hubs</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem' }}>
                        {universities.map(uni => (
                            <Link
                                key={uni}
                                href={`/uni/${uni.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                            >
                                <div className="glass-card" style={{ padding: '1.5rem', height: '100%', background: '#fff', border: '1px solid #eee' }}>
                                    <h5 className="text-sm mb-0">{uni}</h5>
                                    <div className="text-[10px] font-bold text-secondary uppercase mt-1">View Local Hub →</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Contact CTA */}
            <section className="section">
                <div className="container">
                    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', background: 'var(--bg-alt)' }}>
                        <h2 className="text-4xl mb-1">Can't find your institution?</h2>
                        <p className="text-muted mb-3">We cover over 150+ institutions across the UK. Inquire now for bespoke support.</p>
                        <Link href="/#contact" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Get a Custom Quote</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
