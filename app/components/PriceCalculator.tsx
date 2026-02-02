'use client'

import { useState, useEffect } from 'react'
import { Calculator, Zap, ShieldCheck, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import data from '@/data/pseo.json'

export default function PriceCalculator() {
    const [words, setWords] = useState(1000)
    const [deadline, setDeadline] = useState(7) // days
    const [subject, setSubject] = useState(data.subjects[0].id)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        // Simple pricing logic: Base £15 per 500 words
        // Deadline multiplier: 1 day (+100%), 3 days (+50%), 7 days (+0%)
        let base = (words / 500) * 15;
        let multiplier = 1;
        if (deadline <= 1) multiplier = 2;
        else if (deadline <= 3) multiplier = 1.5;

        setPrice(Math.round(base * multiplier));
    }, [words, deadline])

    return (
        <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '500px', width: '100%' }}>
            <div className="flex items-center mb-2" style={{ gap: '0.75rem' }}>
                <div style={{ background: 'var(--navy-gradient)', padding: '0.5rem', borderRadius: '8px', color: '#fff' }}>
                    <Calculator size={24} />
                </div>
                <div>
                    <h3 className="text-xl mb-0" style={{ margin: 0 }}>Price Calculator</h3>
                    <p className="text-xs text-muted">Instant quote for your project</p>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                <div>
                    <label className="text-sm font-bold mb-1" style={{ display: 'block' }}>Subject Area</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eee', background: '#fff' }}
                    >
                        {data.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="text-sm font-bold mb-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Word Count</span>
                        <span className="text-gradient-gold">{words} words</span>
                    </label>
                    <input
                        type="range"
                        min="250"
                        max="10000"
                        step="250"
                        value={words}
                        onChange={(e) => setWords(parseInt(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                    />
                </div>

                <div>
                    <label className="text-sm font-bold mb-1" style={{ display: 'block' }}>Deadline (Days)</label>
                    <div className="flex" style={{ gap: '0.5rem' }}>
                        {[1, 3, 7, 14].map(d => (
                            <button
                                key={d}
                                onClick={() => setDeadline(d)}
                                className={`btn ${deadline === d ? 'btn-primary' : 'btn-outline'}`}
                                style={{ flex: 1, padding: '0.5rem' }}
                            >
                                {d === 1 ? '24h' : `${d}d`}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ background: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Estimated Total</span>
                        <motion.span
                            key={price}
                            initial={{ scale: 1.2, color: 'var(--secondary)' }}
                            animate={{ scale: 1, color: 'var(--primary)' }}
                            className="text-3xl font-extrabold"
                        >
                            £{price}
                        </motion.span>
                    </div>
                    <p className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>*Final price may vary based on specific requirements.</p>
                </div>

                <button className="btn btn-gold" style={{ width: '100%', padding: '1rem' }}>
                    Order Now & Save 15%
                </button>

                <div className="flex justify-center" style={{ gap: '1.5rem', opacity: 0.6 }}>
                    <div className="flex items-center text-xs" style={{ gap: '0.3rem' }}><Clock size={14} /> 24/7 Support</div>
                    <div className="flex items-center text-xs" style={{ gap: '0.3rem' }}><ShieldCheck size={14} /> Encrypted</div>
                </div>
            </div>
        </div>
    )
}
