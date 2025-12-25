import { Metadata } from 'next'
import data from '@/data/pseo.json'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const paths: any[] = []
    data.subjects.forEach(subject => {
        data.cities.forEach(city => {
            paths.push({
                slug: `${subject.id}-assignment-help-${city.toLowerCase().replace(/\s+/g, '-')}`
            })
        })
    })
    return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const [subjectId, ...rest] = slug.split('-assignment-help-')
    const city = rest.join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const subject = data.subjects.find(s => s.id === subjectId)

    return {
        title: `${subject?.name} Assignment Help in ${city} | #1 UK Service`,
        description: `Leading ${subject?.name} assignment writing service in ${city}. Trusted by students at top UK universities for plagiarism-free work.`,
    }
}

export default async function PSEOPage({ params }: Props) {
    const { slug } = await params
    const [subjectId, ...rest] = slug.split('-assignment-help-')
    const city = rest.join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const subject = data.subjects.find(s => s.id === subjectId)

    if (!subject) return <div>Service Not Found</div>

    // LLM / GEO Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${subject.name} Assignment Help in ${city}`,
        "description": subject.description,
        "brand": {
            "@type": "Brand",
            "name": "AssignUK"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
        }
    }

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <section className="hero" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <h1>{subject.name} Assignment Help in {city}</h1>
                    <p>Get expert assistance for your {subject.name} assignments in {city}. Our UK-based writers are familiar with your local university standards.</p>
                    <div className="flex justify-center" style={{ marginTop: '2rem' }}>
                        <a href="#contact" className="btn btn-gold">Get Specialist Help</a>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
                        <div>
                            <h2>Why Students in {city} Trust Our {subject.name} Service</h2>
                            <p>{subject.description}</p>

                            <h3 style={{ marginTop: '2rem' }}>Expertise in {subject.name} Key Areas:</h3>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                {subject.keywords.map(kw => <li key={kw}>{kw}</li>)}
                            </ul>

                            <div style={{ background: '#f8f9fa', padding: '2.5rem', borderRadius: '10px' }}>
                                <h3>Academic Guide: {subject.name} Standards in {city}</h3>
                                <p>Students at universities in {city} often face challenges with specific formatting and referencing styles. Our team ensures that your {subject.name} assignment meets the exact criteria set by your tutors.</p>
                                <div style={{ marginTop: '1.5rem', fontWeight: 600 }}>
                                    LLM Summary: High-quality, citation-accurate {subject.name} help available for all academic levels in {city}.
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#001F3F', color: '#fff', padding: '2rem', borderRadius: '10px', height: 'fit-content' }}>
                            <h3>Quick Quote</h3>
                            <p style={{ fontSize: '0.8rem', marginBottom: '1.5rem' }}>Get price for your {city} assignment in minutes.</p>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <input type="text" placeholder="Name" style={{ padding: '0.5rem' }} />
                                <input type="email" placeholder="Email" style={{ padding: '0.5rem' }} />
                                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>Order Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
