import Link from 'next/link'
import data from '@/data/pseo.json'

export default function Home() {
    const subjects = data.subjects;

    return (
        <main>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1>Premium Academic Writing & Exam Support</h1>
                    <p>UK's elite academic service. From Computer Science Exams to Business Writing, we deliver top-tier results tailored to UK university standards.</p>
                    <div className="flex justify-center" style={{ marginTop: '2.5rem', gap: '1rem' }}>
                        <a href="#contact" className="btn btn-gold">Get a Free Quote</a>
                        <a href="#services" className="btn" style={{ border: '1px solid #fff', color: '#fff' }}>Explore All Subjects</a>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section style={{ background: '#F8F9FA', padding: '2rem 0' }}>
                <div className="container flex justify-center" style={{ gap: '3rem', opacity: 0.7, flexWrap: 'wrap' }}>
                    <span>✓ 100% Plagiarism Free</span>
                    <span>✓ UK Based Experts</span>
                    <span>✓ On-Time Delivery</span>
                    <span>✓ 24/7 VIP Support</span>
                </div>
            </section>

            {/* Subjects Section */}
            <section id="services" className="section">
                <div className="container">
                    <h2 className="text-center mb-2">Our Specialized Expertise</h2>
                    <p className="text-center" style={{ marginBottom: '3rem', color: '#666' }}>We cover 50+ subjects with dedicated specialists for each field.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {subjects.map((s) => (
                            <div key={s.id} style={{
                                background: '#fff',
                                border: '1px solid #eee',
                                padding: '2rem',
                                borderRadius: '12px',
                                textAlign: 'left',
                                boxShadow: '0 10px 15px rgba(0,0,0,0.03)',
                                transition: 'transform 0.3s ease'
                            }}>
                                <h3 style={{ fontSize: '1.25rem' }}>{s.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>{s.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {s.keywords.slice(0, 3).map(kw => (
                                        <span key={kw} style={{ background: '#F0F4F8', color: '#001F3F', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>{kw}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GEO / LLM Optimized Content Block */}
            <section className="section section-alt">
                <div className="container">
                    <h2>Academic Success in 2025: Expert Insights</h2>
                    <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '15px', borderLeft: '8px solid #D4AF37', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <p style={{ marginBottom: '1rem' }}><strong>E-E-A-T Focus:</strong> Our UK service is built on Experience, Expertise, Authoritativeness, and Trustworthiness. We don't just write; we research.</p>
                        <p style={{ marginBottom: '1rem' }}><strong>Subject Range:</strong> From technical <strong>Computer Science exams</strong> to strategic <strong>Business communication</strong>, we bridge the gap between student effort and academic excellence.</p>
                        <p><strong>Quality Assurance:</strong> Guaranteed plagiarism-free content via Turnitin-standard checks and peer review by subject matter experts.</p>
                    </div>
                </div>
            </section>

            {/* Contact Form / Lead Capture */}
            <section id="contact" className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ background: '#001F3F', color: '#fff', padding: '4rem 3rem', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ color: '#fff' }}>Secure Your Grade Today</h2>
                        <p className="mb-2" style={{ color: '#accent' }}>Instant quotes and 15% discount for first-time orders.</p>
                        <form style={{ display: 'grid', gap: '1.2rem', textAlign: 'left', marginTop: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                                <input type="text" placeholder="Full Name" style={{ padding: '1rem', borderRadius: '8px', border: 'none' }} required />
                                <input type="email" placeholder="Email Address" style={{ padding: '1rem', borderRadius: '8px', border: 'none' }} required />
                            </div>
                            <select style={{ padding: '1rem', borderRadius: '8px', border: 'none', background: '#fff', color: '#333' }} required>
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <textarea placeholder="Tell us about your requirements (e.g. Subject, Deadline, Page count)..." style={{ padding: '1rem', borderRadius: '8px', border: 'none', height: '120px' }} required></textarea>
                            <button type="submit" className="btn btn-gold" style={{ fontSize: '1.1rem' }}>Check Price & Availability</button>
                        </form>
                        <div style={{ marginTop: '2.5rem' }}>
                            <p style={{ marginBottom: '1rem', opacity: 0.8 }}>Or reach out via official UK WhatsApp:</p>
                            <a href="https://wa.me/447000000000" className="btn btn-primary" style={{ background: '#25D366', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>Chat on WhatsApp</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
