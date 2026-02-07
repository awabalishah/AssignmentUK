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
        <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <h4 className="text-sm font-bold uppercase mb-2 flex items-center" style={{ gap: '0.5rem' }}>
                <Zap size={16} className="text-gradient-gold" />
                The Expert Guarantee
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

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                <div className="flex items-center" style={{ gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--navy-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>{author.initials}</div>
                    <div className="flex flex-col">
                        <Link href={`/authors/${author.id}`} className="text-xs font-bold hover:text-secondary transition-colors">
                            {author.name}
                        </Link>
                        <span className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>{author.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertSummary;
