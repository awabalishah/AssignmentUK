import { notFound } from 'next/navigation'
import data from '@/data/pseo.json'
import Link from 'next/link'

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

    return (
        <main>
            <section className="section hero-gradient" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-sm font-bold text-gradient-gold mb-1" style={{ textTransform: 'uppercase' }}>Expert Academic Support</span>
                        <h1 className="text-4xl mb-2">Premium {subject.name} Assignment Help</h1>
                        <p className="text-lg text-muted mb-3" style={{ maxWidth: '800px' }}>
                            {subject.description} tailored for UK university standards. Get top-tier results with our specialized experts.
                        </p>
                        <div className="flex justify-center" style={{ gap: '1rem' }}>
                            <Link href="/#contact" className="btn btn-gold">Get Started</Link>
                            <Link href="/#services" className="btn btn-outline">All Subjects</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 className="text-3xl mb-1">Master Your {subject.name} Modules</h2>
                            <p className="mb-2">Our team of UK-based scholars specializes in {subject.name}, ensuring every assignment meets rigorous academic criteria. Whether it's a first-year essay or a final dissertation, we provide the clarity and depth required for top marks.</p>
                            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                                {subject.keywords.map(kw => (
                                    <div key={kw} className="flex items-center" style={{ gap: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                                        <span className="text-sm font-bold">{kw}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '3rem' }}>
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
                            <p className="text-xs">All our {subject.name} experts are updated with the latest 2024/2025 grading rubrics used by Russell Group universities.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
