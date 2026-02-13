import React from 'react';
import { ShieldCheck, Award, BookOpen, GraduationCap, PenTool, Search } from 'lucide-react';

interface Author {
    id: string;
    name: string;
    role: string;
    initials: string;
    bio: string;
    specialties: string[];
    whyIWrite: string;
    qualifications: string[];
    experience: string;
}

interface ExpertProfileProps {
    author: Author;
}

const ExpertProfile = ({ author }: ExpertProfileProps) => {
    return (
        <section className="section" id="expert-profile">
            <div className="container">
                <div className="glass-card" style={{ padding: '5rem', border: '1px solid #E2E8F0', background: '#fff' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: '5rem', alignItems: 'center' }}>
                        {/* Image / Icon Area */}
                        <div className="md:col-span-4 text-center">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <div
                                    style={{
                                        width: '220px',
                                        height: '220px',
                                        borderRadius: '32px',
                                        background: 'var(--navy-gradient)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2.5rem',
                                        transform: 'rotate(-2deg)',
                                        boxShadow: 'var(--shadow-premium)'
                                    }}
                                >
                                    <div style={{ fontSize: '5rem', fontWeight: '900', color: '#fff', transform: 'rotate(2deg)' }}>
                                        {author.initials}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '2rem',
                                        right: '0rem',
                                        background: 'var(--gold-gradient)',
                                        padding: '0.75rem',
                                        borderRadius: '16px',
                                        border: '3px solid #fff',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <ShieldCheck size={28} color="var(--primary)" />
                                </div>
                            </div>
                            <h3 className="text-3xl mb-1">{author.name}</h3>
                            <p className="text-xs font-bold text-secondary uppercase tracking-widest">{author.role}</p>
                            <div className="flex justify-center flex-wrap" style={{ gap: '0.6rem', marginTop: '1.5rem' }}>
                                {author.qualifications.map(q => (
                                    <div key={q} style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: 'var(--bg-alt)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #E2E8F0' }}>{q}</div>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="md:col-span-8">
                            <h2 className="text-3xl mb-2">Subject Specialist Perspective</h2>
                            <p className="text-lg mb-2">
                                {author.bio}
                            </p>

                            <div
                                style={{
                                    marginTop: '2.5rem',
                                    padding: '2.5rem',
                                    background: 'var(--premium-grad)',
                                    borderRadius: '24px',
                                    border: '1px solid #E2E8F0'
                                }}
                            >
                                <h4 className="text-xs font-bold uppercase mb-2 tracking-widest text-secondary">Scholarship Philosophy</h4>
                                <p className="text-base italic font-medium leading-relaxed" style={{ color: 'var(--primary)' }}>
                                    "{author.whyIWrite}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '2rem', marginTop: '2.5rem' }}>
                                <div className="flex" style={{ gap: '1rem' }}>
                                    <div style={{ color: 'var(--secondary)' }}><Award size={32} /></div>
                                    <div>
                                        <h4 className="text-sm uppercase mb-1">Experience</h4>
                                        <p className="text-xs text-muted">{author.experience}</p>
                                    </div>
                                </div>
                                <div className="flex" style={{ gap: '1rem' }}>
                                    <div style={{ color: 'var(--secondary)' }}><BookOpen size={32} /></div>
                                    <div>
                                        <h4 className="text-sm uppercase mb-1">Core Specialties</h4>
                                        <p className="text-xs text-muted">{author.specialties.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex" style={{ gap: '1rem' }}>
                                    <div style={{ color: 'var(--secondary)' }}><PenTool size={32} /></div>
                                    <div>
                                        <h4 className="text-sm uppercase mb-1">Human-Only Writing</h4>
                                        <p className="text-xs text-muted">A strict zero-AI policy. Every sentence is manually crafted by {author.name}.</p>
                                    </div>
                                </div>
                                <div className="flex" style={{ gap: '1rem' }}>
                                    <div style={{ color: 'var(--secondary)' }}><Search size={32} /></div>
                                    <div>
                                        <h4 className="text-sm uppercase mb-1">Quality Assurance</h4>
                                        <p className="text-xs text-muted">Double-verified for academic standards and Turnitin-safe originality.</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: '3rem',
                                    padding: '1.5rem',
                                    background: 'rgba(212, 175, 55, 0.05)',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid var(--secondary)'
                                }}
                            >
                                <p className="text-sm italic font-bold" style={{ color: 'var(--primary)' }}>
                                    "I don't just provide answers; I provide academic authority. Every piece of work I deliver is a testament to my commitment to excellence across borders."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertProfile;
