import React from 'react';
import { ShieldAlert, Fingerprint, Zap } from 'lucide-react';
import Link from 'next/link';

interface Author {
    id: string;
    name: string;
    role: string;
    initials: string;
    bio: string;
}

interface ExpertSummaryProps {
    author: Author;
}

const ExpertSummary = ({ author }: ExpertSummaryProps) => {
    return (
        <div className="glass-card" style={{ padding: '2.5rem', background: 'var(--premium-grad)', border: '1px solid #E2E8F0' }}>
            <h4 className="text-xs font-bold uppercase mb-2 flex items-center tracking-widest" style={{ gap: '0.6rem', color: 'var(--primary)' }}>
                <Zap size={16} className="text-secondary" />
                The Academic Guarantee
            </h4>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="flex items-start" style={{ gap: '1rem' }}>
                    <div style={{ minWidth: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Fingerprint size={20} color="var(--secondary)" />
                    </div>
                    <div>
                        <p className="text-xs font-bold mb-0">100% Original & AI-Free</p>
                        <p className="text-xs text-muted">Every word is manually written by UK scholars. No LLMs, no exceptions.</p>
                    </div>
                </div>

                <div className="flex items-start" style={{ gap: '1rem' }}>
                    <div style={{ minWidth: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={20} color="var(--success)" />
                    </div>
                    <div>
                        <p className="text-xs font-bold mb-0">Confidentiality First</p>
                        <p className="text-xs text-muted">Your identity and institution remain private. Data encrypted via SSL-256.</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1.5px solid #F1F5F9' }}>
                <div className="flex items-center" style={{ gap: '1rem' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'var(--navy-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#fff',
                        fontWeight: 800,
                        boxShadow: '0 4px 10px rgba(0,26,53,0.2)'
                    }}>{author.initials}</div>
                    <div className="flex flex-col">
                        <Link href={`/authors/${author.id}`} className="text-sm font-bold hover:text-secondary transition-colors" style={{ color: 'var(--primary)' }}>
                            {author.name}
                        </Link>
                        <span className="text-xs text-muted" style={{ fontSize: '0.7rem', fontWeight: 600 }}>{author.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertSummary;
