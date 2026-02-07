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
                <div className="glass-card" style={{ padding: '4rem', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: '4rem', alignItems: 'center' }}>
                        {/* Image / Icon Area */}
                        <div className="md:col-span-4 text-center">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <div
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        background: 'var(--navy-gradient)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2rem',
                                        border: '4px solid #fff',
                                        boxShadow: 'var(--shadow-lg)'
                                    }}
                                >
                                    <div style={{ fontSize: '4rem', fontWeight: '800', color: '#fff' }}>
                                        {author.initials}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '2.5rem',
                                        right: '1rem',
                                        background: 'var(--gold-gradient)',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        border: '2px solid #fff'
                                    }}
                                >
                                    <ShieldCheck size={24} color="var(--primary)" />
                                </div>
                            </div>
                            <h3 className="text-2xl mb-1">{author.name}</h3>
                            <p className="text-sm font-bold text-gradient-gold uppercase tracking-widest">{author.role}</p>
                            <div className="flex justify-center flex-wrap" style={{ gap: '0.5rem', marginTop: '1rem' }}>
                                {author.qualifications.map(q => (
                                    <div key={q} style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', background: 'var(--primary)', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>{q}</div>
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
                                    marginTop: '2rem',
                                    padding: '1.5rem',
                                    background: 'var(--bg-alt)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(212, 175, 55, 0.1)'
                                }}
                            >
                                <h4 className="text-sm font-bold uppercase mb-1 text-gradient-gold">Why I Write</h4>
                                <p className="text-sm mb-0">
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
