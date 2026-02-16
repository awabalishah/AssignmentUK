import Link from 'next/link'
import data from '@/data/pseo.json'

export default function FooterLinks() {
    const newSubjects = ['Psychology', 'Engineering', 'Accounting & Finance', 'Sociology & Social Work'];
    const newCities = [
        'Sunderland', 'Wolverhampton', 'Preston', 'Bournemouth', 'Huddersfield',
        'Bolton', 'Middlesbrough', 'Carlisle', 'Dundee', 'Newport'
    ];

    return (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4rem', marginTop: '4rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '3rem' }}>
                <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New Departments</h4>
                    <ul style={{ listStyle: 'none', lineHeight: '2', opacity: 0.6, fontSize: '0.85rem' }}>
                        {newSubjects.map(s => {
                            const subjectInfo = data.subjects.find(sub => sub.name === s);
                            return (
                                <li key={s}>
                                    <Link
                                        href={subjectInfo ? `/subject/${subjectInfo.id}` : '#'}
                                        className="hover:text-secondary transition-colors"
                                    >
                                        {s} Support
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Emerging Hubs</h4>
                    <ul style={{ listStyle: 'none', lineHeight: '2', opacity: 0.6, fontSize: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'x-4' }}>
                        {newCities.map(c => (
                            <li key={c}>
                                <Link
                                    href={`/city/${c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                    className="hover:text-secondary transition-colors"
                                >
                                    {c}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Nationwide UK Coverage</h4>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: '1.6' }}>
                            We provide specialized academic support for over {data.cities.length} UK cities and all {data.universities.length} major institutions. From Russell Group excellence to specialized technical colleges, our PhD-led team covers every corner of the UK higher education landscape.
                        </p>
                        <Link href="/locations" className="text-secondary font-bold text-xs hover:underline mt-2 inline-block">
                            View All Searchable Locations →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
