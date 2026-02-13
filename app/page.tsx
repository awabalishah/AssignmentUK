'use client'
import Link from 'next/link'
import data from '@/data/pseo.json'
import PriceCalculator from '@/app/components/PriceCalculator'
import LeadForm from '@/app/components/LeadForm'
import { CheckCircle2, Star, Users, Award, ShieldCheck, ChevronRight, GraduationCap } from 'lucide-react'
import authorsData from '@/data/authors.json'

export default function Home() {
    const subjects = data.subjects;

    return (
        <main>
            {/* Professional Hero Section */}
            <section className="section hero-gradient" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '5rem' }}>
                        <div className="animate-fade-in">
                            <div className="flex items-center mb-1" style={{ gap: '1rem' }}>
                                <div className="flex" style={{ color: 'var(--secondary)' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <span className="text-xs font-bold text-muted uppercase tracking-widest">Leading Choice for 15,000+ UK Students</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl mb-2" style={{ lineHeight: 1.1 }}>
                                Unlock Your <span className="text-gradient-gold">Academic Potential</span> with UK Experts
                            </h1>
                            <p className="text-lg text-muted mb-3" style={{ maxWidth: '600px', lineHeight: '1.8' }}>
                                From elite-level Law dissertations to complex Computer Science architectures, we provide the technical depth and academic rigour your grades deserve. UK-based, plagiarism-free, and guaranteed.
                            </p>
                            <div className="flex items-center" style={{ gap: '2rem', marginBottom: '3.5rem' }}>
                                <div className="flex items-center" style={{ gap: '0.6rem' }}>
                                    <ShieldCheck size={22} color="var(--success)" />
                                    <span className="text-sm font-bold">100% Private</span>
                                </div>
                                <div className="flex items-center" style={{ gap: '0.6rem' }}>
                                    <CheckCircle2 size={22} color="var(--success)" />
                                    <span className="text-sm font-bold">Original Work</span>
                                </div>
                            </div>
                            <div className="flex" style={{ gap: '1.25rem' }}>
                                <Link href="#contact" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Order Now</Link>
                                <Link href="#services" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>Explore Subjects</Link>
                            </div>
                            <div className="flex items-center" style={{ gap: '2rem', marginTop: '4rem', opacity: 0.5 }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Turnitin Approved</span>
                                <div style={{ width: '1px', height: '15px', background: 'var(--text-muted)' }}></div>
                                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>UK Registered</span>
                            </div>
                        </div>
                        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <PriceCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* Results/Metrics Strip */}
            <section style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', background: '#fff' }}>
                <div className="container py-2">
                    <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '2rem', margin: '30px 0' }}>
                        {[
                            { label: 'Success Rate', val: '99.8%', icon: Award },
                            { label: 'Expert Writers', val: '500+', icon: Users },
                            { label: 'Years Experience', val: '12+', icon: Star },
                            { label: 'Average Grade', val: '2:1/1st', icon: ShieldCheck },
                        ].map((stat, idx) => (
                            <div key={idx} className="flex items-center" style={{ gap: '1rem' }}>
                                <div style={{ color: 'var(--secondary)' }}><stat.icon size={24} /></div>
                                <div>
                                    <div className="text-xl font-extrabold">{stat.val}</div>
                                    <div className="text-xs text-muted font-bold text-uppercase">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialized Subjects */}
            <section id="services" className="section">
                <div className="container">
                    <div className="text-center mb-3">
                        <span className="text-sm font-bold text-gradient-gold uppercase">Specialized Expertise</span>
                        <h2 className="text-3xl mt-1">Our Featured Academic Fields</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>Deep expertise in complex subjects, handled by writers with Masters and PhDs from Russell Group universities.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2.5rem' }}>
                        {subjects.map((s) => (
                            <Link key={s.id} href={`/subject/${s.id}`}>
                                <div className="glass-card" style={{
                                    padding: '2.5rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem',
                                    background: 'var(--bg-main)',
                                    border: '1px solid #E2E8F0'
                                }}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl mb-0" style={{ color: 'var(--primary)' }}>{s.name}</h3>
                                        <div style={{ background: 'var(--bg-alt)', padding: '0.5rem', borderRadius: '10px' }}>
                                            <ChevronRight size={18} className="text-muted" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted mb-0" style={{ flexGrow: 1, lineHeight: '1.7' }}>{s.description}</p>
                                    <div className="flex flex-wrap" style={{ gap: '0.6rem' }}>
                                        {s.keywords.slice(0, 3).map(kw => (
                                            <span key={kw} className="text-xs font-bold" style={{
                                                background: 'var(--secondary-glow)',
                                                color: 'var(--primary)',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '20px'
                                            }}>{kw}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Universities (High-Intent internal linking) */}
            <section className="section" style={{ background: '#fff', borderTop: '1px solid #eee' }}>
                <div className="container">
                    <div className="text-center mb-3">
                        <span className="text-sm font-bold text-gradient-gold uppercase">Top Ranked Support</span>
                        <h2 className="text-3xl mt-1">Featured Universities</h2>
                        <p className="text-muted mx-auto text-center" style={{ maxWidth: '100%' }}>Direct access to our most requested elite academic services across premium UK institutions.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap: '1.5rem' }}>
                        {[
                            { name: 'BPP Law', slug: 'lpc-assignment-help-bpp' },
                            { name: 'UCL Nursing', slug: 'nursing-assignment-help-ucl' },
                            { name: 'Manchester MBA', slug: 'mba-assignment-help-manchester' },
                            { name: 'Leeds Business', slug: 'mba-dissertation-help-leeds' },
                            { name: 'KCL Psychology', slug: 'psychology-literature-review-kcl' }
                        ].map((uni, idx) => (
                            <Link key={idx} href={`/services/${uni.slug}`}>
                                <div className="glass-card" style={{
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    border: '1px solid #eee'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--secondary)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#eee';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <GraduationCap size={24} className="text-gradient-gold" />
                                    <div className="text-sm font-bold mb-0">{uni.name}</div>
                                    <div className="text-[10px] font-bold text-muted uppercase tracking-tighter">View Excellence →</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Scholars Section (EEAT) */}
            <section className="section" style={{ background: 'var(--bg-alt)', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="text-center mb-3">
                        <span className="text-sm font-bold text-gradient-gold uppercase">Vetted Expertise</span>
                        <h2 className="text-3xl mt-1">Meet Our Lead Academic Scholars</h2>
                        <p className="text-muted mx-auto text-center" style={{ maxWidth: '100%' }}>Your assignments are supervised by experts from the UK's most prestigious institutions.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '2rem' }}>
                        {(authorsData as any[]).slice(0, 4).map((scholar, idx) => (
                            <Link key={scholar.id} href={`/authors/${scholar.id}`}>
                                <div className="glass-card" style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    height: '100%',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                                    border: '1px solid transparent',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.borderColor = 'var(--secondary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        margin: '0 auto 1.5rem',
                                        border: '3px solid var(--secondary)',
                                        background: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>
                                        {scholar.initials}
                                    </div>
                                    <h4 className="mb-0">{scholar.name}</h4>
                                    <div className="text-xs font-bold text-gradient-gold mb-1">{scholar.role}</div>
                                    <p className="text-xs text-muted mb-0">{scholar.bio.slice(0, 100)}...</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Student Success Stories */}
            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="text-center mb-3">
                        <span className="text-sm font-bold text-gradient-gold uppercase">Student Feedback</span>
                        <h2 className="text-3xl mt-1">Real Results for Real Students</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {[
                            {
                                name: 'Sarah J.',
                                uni: 'University of Manchester',
                                text: 'The Nursing care plan was impeccable. They followed the local trust guidelines perfectly. Got a first-class mark!',
                                subject: 'Nursing'
                            },
                            {
                                name: 'David K.',
                                uni: 'King\'s College London',
                                text: 'Their Law experts really understand the UK common law nuances. Delivered a complex case study in 48 hours.',
                                subject: 'Law'
                            },
                            {
                                name: 'Emily R.',
                                uni: 'University of Edinburgh',
                                text: 'Saved me during exam week with a brilliant Computer Science project. Code was clean and well-documented.',
                                subject: 'CompSci'
                            }
                        ].map((rev, i) => (
                            <div key={i} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="flex" style={{ color: '#FFD700', gap: '2px' }}>
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-sm italic" style={{ flexGrow: 1 }}>"{rev.text}"</p>
                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                                    <div className="font-bold text-sm">{rev.name}</div>
                                    <div className="text-xs text-muted">{rev.uni} • {rev.subject}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Capture Section */}
            <section id="contact" className="section section-alt">
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div style={{ background: 'var(--navy-gradient)', color: '#fff', padding: '4rem 3rem' }}>
                            <h2 style={{ color: '#fff' }} className="text-3xl mb-1">Get a Personal Consultation</h2>
                            <p className="mb-3" style={{ opacity: 0.8 }}>Talk to a subject specialist and get a tailored plan for your next assignment.</p>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1.5rem' }}>
                                <li className="flex items-center" style={{ gap: '1rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}><Award size={20} /></div>
                                    <span>Vetted UK PhD Writers</span>
                                </li>
                                <li className="flex items-center" style={{ gap: '1rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}><ShieldCheck size={20} /></div>
                                    <span>Bank-Grade Confidentiality</span>
                                </li>
                                <li className="flex items-center" style={{ gap: '1rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}><Users size={20} /></div>
                                    <span>Direct Writer Communication</span>
                                </li>
                            </ul>
                        </div>
                        <div style={{ padding: '4rem 3rem', background: '#fff' }}>
                            <LeadForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

