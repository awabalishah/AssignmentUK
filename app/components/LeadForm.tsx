'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import data from '@/data/pseo.json'

export default function LeadForm() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const waMessage = `*New Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Details:* ${formData.message}`;

        // 1. Send Email (Formspree) - Non-blocking
        fetch('https://formspree.io/f/xvgzlowz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, _replyto: 'awabalishah@gmail.com' })
        }).catch(err => console.log("Email submission pending configuration."));

        // 2. Open WhatsApp - Immediate
        window.open(`https://wa.me/447424096844?text=${waMessage}`, '_blank');

        setSubmitted(true);
        setLoading(false);
    }

    return (
        <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        style={{ display: 'grid', gap: '1.2rem' }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.2rem' }}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fcfcfc' }}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fcfcfc' }}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="WhatsApp (e.g., +44...)"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fcfcfc' }}
                            />
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fcfcfc', color: '#333' }}
                                required
                            >
                                <option value="">Select Subject</option>
                                {data.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <textarea
                            placeholder="Specific requirements or deadline details..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', height: '120px', background: '#fcfcfc' }}
                            required
                        ></textarea>
                        <button type="submit" disabled={loading} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem', opacity: loading ? 0.7 : 1 }}>
                            <Send size={18} /> {loading ? 'Sending...' : 'Get My Free Quote'}
                        </button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '3rem 0' }}
                    >
                        <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
                        <h3 className="text-2xl mb-1">Request Received!</h3>
                        <p className="text-muted">A subject specialist will contact you within 15 minutes.</p>
                        <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '2rem' }}>Send Another Request</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
