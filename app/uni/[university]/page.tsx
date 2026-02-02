import { notFound } from 'next/navigation'
import data from '@/data/pseo.json'
import Link from 'next/link'
import { GraduationCap, MapPin, CheckCircle2 } from 'lucide-react'

export async function generateStaticParams() {
    return data.universities.map((uni) => ({
        university: encodeURIComponent(uni.toLowerCase().replace(/\s+/g, '-')),
    }))
}

export default async function UniversityPage({ params }: { params: Promise<{ university: string }> }) {
    const { university } = await params;
    const uniName = decodeURIComponent(university).replace(/-/g, ' ');
    const realUni = data.universities.find(u => u.toLowerCase() === uniName.toLowerCase());

    if (!realUni) {
        notFound();
    }

    return (
        <main>
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
                                Get specialized assignment help and exam preparation designed specifically for <span className="font-bold">{realUni}</span> graduation standards and marking rubrics.
                            </p>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <Link href="/#contact" className="btn btn-primary">Get a Free Quote</Link>
                                <Link href="/#services" className="btn btn-outline">Explore Subjects</Link>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '3rem' }}>
                            <h3 className="text-2xl mb-2">Why {realUni} Students Choose Us?</h3>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1.2rem' }}>
                                {[
                                    'Uni-Specific Grading Knowledge',
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
        </main>
    )
}
