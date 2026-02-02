'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import data from '@/data/pseo.json'

export default function LeadForm() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
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
                            <input type="text" placeholder="Full Name" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }} required />
                            <input type="email" placeholder="Email Address" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }} required />
                        </div>
                        <select style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #eee', background: '#fff' }} required>
                            <option value="">Select Subject</option>
                            {data.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <textarea placeholder="Specific requirements or deadline details..." style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #eee', height: '120px' }} required></textarea>
                        <button type="submit" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem' }}>
                            <Send size={18} /> Get My Free Quote
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
