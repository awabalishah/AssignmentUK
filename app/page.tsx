'use client'
import Link from 'next/link'
import data from '@/data/pseo.json'
import PriceCalculator from '@/app/components/PriceCalculator'
import LeadForm from '@/app/components/LeadForm'
import { CheckCircle2, Star, Users, Award, ShieldCheck, ChevronRight } from 'lucide-react'

export default function Home() {
    const subjects = data.subjects;

    return (
        <main>
            {/* Professional Hero Section */}
            <section className="section hero-gradient" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
                        <div>
                            <div className="flex items-center mb-1" style={{ gap: '1rem' }}>
                                <div className="flex" style={{ color: '#FFD700' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <span className="text-xs font-bold text-muted">TRUSTED BY 15,000+ UK STUDENTS</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl mb-2" style={{ lineHeight: 1.1 }}>
                                Elevate Your <span className="text-gradient-gold">Academic Success</span> with UK Experts
                            </h1>
                            <p className="text-lg text-muted mb-3" style={{ maxWidth: '600px' }}>
                                From complex Computer Science algorithms to high-stakes Law dissertations, we deliver the precision your grades deserve. UK-based, plagiarism-free, and guaranteed on-time.
                            </p>
                            <div className="flex" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
                                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                                    <ShieldCheck size={20} color="var(--success)" />
                                    <span className="text-sm font-bold">100% Confidential</span>
                                </div>
                                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                                    <CheckCircle2 size={20} color="var(--success)" />
                                    <span className="text-sm font-bold">Plagiarism Free</span>
                                </div>
                            </div>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <a href="#contact" className="btn btn-primary">Order Now</a>
                                <a href="#services" className="btn btn-outline">Browse Subjects</a>
                            </div>
                            <div className="flex items-center" style={{ gap: '1.5rem', marginTop: '3rem', opacity: 0.6 }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/SSL_v3_Cert.svg" alt="SSL" style={{ height: '24px', filter: 'grayscale(1)' }} />
                                <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Turnitin Approved</span>
                                <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>UK Registered Entity</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <PriceCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* Results/Metrics Strip */}
            <section style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', background: '#fff' }}>
                <div className="container py-2">
                    <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '2rem' }}>
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
                        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Deep expertise in complex subjects, handled by writers with Masters and PhDs from Russell Group universities.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {subjects.map((s) => (
                            <Link key={s.id} href={`/subject/${s.id}`}>
                                <div className="glass-card" style={{
                                    padding: '2rem',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    border: '1px solid transparent'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                                >
                                    <h3 className="text-xl mb-1 flex items-center justify-between">
                                        {s.name}
                                        <ChevronRight size={18} className="text-muted" />
                                    </h3>
                                    <p className="text-sm text-muted mb-2">{s.description}</p>
                                    <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                                        {s.keywords.slice(0, 3).map(kw => (
                                            <span key={kw} className="text-xs" style={{ background: 'var(--bg-alt)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{kw}</span>
                                        ))}
                                    </div>
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
                        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Your assignments are supervised by experts from the UK's most prestigious institutions.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: 'Dr. Alistair H.', role: 'Subject Lead - Law', bio: 'PhD in Common Law from Oxford. 15+ years academic advising.', img: 'https://i.pravatar.cc/150?u=a1' },
                            { name: 'Prof. Sarah M.', role: 'Lead - Nursing & Health', bio: 'Former NHS Education Lead. Specialized in Evidence-Based Practice.', img: 'https://i.pravatar.cc/150?u=a2' },
                            { name: 'Dr. James W.', role: 'Head of STEM', bio: 'Computer Science PhD from Imperial. Expert in AI and Algorithms.', img: 'https://i.pravatar.cc/150?u=a3' },
                            { name: 'Dr. Elena S.', role: 'Humanities Advisor', bio: 'Social Work & Education specialist from UCL. 100+ papers published.', img: 'https://i.pravatar.cc/150?u=a4' }
                        ].map((scholar, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem', overflow: 'hidden', border: '3px solid var(--secondary)' }}>
                                    <img src={scholar.img} alt={scholar.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 className="mb-0">{scholar.name}</h4>
                                <div className="text-xs font-bold text-gradient-gold mb-1">{scholar.role}</div>
                                <p className="text-xs text-muted mb-0">{scholar.bio}</p>
                            </div>
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
                <div className="container" style={{ maxWidth: '1000px' }}>
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

