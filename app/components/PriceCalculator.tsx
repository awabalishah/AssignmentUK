'use client'

import { useState, useEffect } from 'react'
import { Calculator, Zap, ShieldCheck, Clock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import data from '@/data/pseo.json'

export default function PriceCalculator() {
    const [words, setWords] = useState(1000)
    const [deadline, setDeadline] = useState(7) // days
    const [subject, setSubject] = useState(data.subjects[0].id)
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        let base = (words / 500) * 15;
        let multiplier = 1;
        if (deadline <= 1) multiplier = 2;
        else if (deadline <= 3) multiplier = 1.5;

        setPrice(Math.round(base * multiplier));
    }, [words, deadline])

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !contact) {
            alert("Please provide your name and contact details.");
            return;
        }

        setIsSubmitting(true);
        const subjectName = data.subjects.find(s => s.id === subject)?.name || subject;
        const message = `*New Quote Request*%0A%0A*Name:* ${name}%0A*Contact:* ${contact}%0A*Subject:* ${subjectName}%0A*Words:* ${words}%0A*Deadline:* ${deadline} days%0A*Estimated Price:* £${price}`;

        // 1. Try sending to Email (Formspree) - Non-blocking
        fetch('https://formspree.io/f/xvgzlowz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                contact,
                subject: subjectName,
                words,
                deadline: `${deadline} days`,
                estimatedPrice: `£${price}`,
                _replyto: 'awabalishah@gmail.com'
            })
        }).catch(err => console.log("Email service not configured yet.", err));

        // 2. Open WhatsApp - Immediate
        window.open(`https://wa.me/447424096844?text=${message}`, '_blank');

        setIsSuccess(true);
        setIsSubmitting(false);
    }

    if (isSuccess) {
        return (
            <div className="glass-card text-center" style={{ padding: '3rem', maxWidth: '500px', width: '100%', background: '#fff' }}>
                <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
                <h3 className="text-2xl mb-1">Quote Sent!</h3>
                <p className="text-muted">Redirecting to WhatsApp for instant confirmation...</p>
                <button onClick={() => setIsSuccess(false)} className="btn btn-outline" style={{ marginTop: '2rem' }}>Calculate Another</button>
            </div>
        )
    }

    return (
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', width: '100%', background: '#fff' }}>
            <div className="flex items-center mb-2" style={{ gap: '1rem' }}>
                <div style={{ background: 'var(--navy-gradient)', padding: '0.6rem', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,26,53,0.15)' }}>
                    <Calculator size={24} />
                </div>
                <div>
                    <h3 className="text-2xl mb-0" style={{ margin: 0 }}>Instant Quote</h3>
                    <p className="text-xs text-muted font-bold uppercase tracking-widest" style={{ fontSize: '0.65rem' }}>Precision Pricing</p>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                <div>
                    <label className="text-xs font-bold mb-1 opacity-70 uppercase tracking-wider" style={{ display: 'block' }}>Academic Subject</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #F1F5F9', background: '#F8FAFC', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}
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
                    <label className="text-xs font-bold mb-1 opacity-70 uppercase tracking-wider" style={{ display: 'block' }}>Submission Deadline</label>
                    <div className="flex" style={{ gap: '0.75rem' }}>
                        {[1, 3, 7, 14].map(d => (
                            <button
                                key={d}
                                onClick={() => setDeadline(d)}
                                className={`btn ${deadline === d ? 'btn-primary' : 'btn-outline'}`}
                                style={{ flex: 1, padding: '0.65rem', borderRadius: '10px' }}
                            >
                                {d === 1 ? '24h' : `${d}d`}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ background: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
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
                </div>

                <div className="grid grid-gap-4" style={{ display: 'grid', gap: '1rem', background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eee' }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-0 opacity-60">Contact Details</h4>
                    <input
                        type="text"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #ddd' }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="WhatsApp or Email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #ddd' }}
                        required
                    />
                </div>

                <button
                    onClick={handleOrder}
                    disabled={isSubmitting}
                    className="btn btn-gold"
                    style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', pointerEvents: isSubmitting ? 'none' : 'auto', opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? 'Processing...' : 'Order Now & Save 15%'}
                </button>

                <div className="flex justify-center" style={{ gap: '1.5rem', opacity: 0.6 }}>
                    <div className="flex items-center text-xs" style={{ gap: '0.3rem' }}><Clock size={14} /> 24/7 Support</div>
                    <div className="flex items-center text-xs" style={{ gap: '0.3rem' }}><ShieldCheck size={14} /> Encrypted</div>
                </div>
            </div>
        </div>
    )
}
