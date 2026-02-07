'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InstantQuoteSidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState('Essay')
    const [words, setWords] = useState(1000)
    const [deadline, setDeadline] = useState('7 Days')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle quote action (e.g., scroll to contact or open modal)
        window.location.href = '/#contact'
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 9990,
            fontFamily: 'var(--font-heading)'
        }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            marginBottom: '1rem',
                            background: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            padding: '1.5rem',
                            width: '300px',
                            maxWidth: 'calc(100vw - 4rem)',
                            border: '1px solid #eee'
                        }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg mb-0 font-bold">Instant Quote</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                            >
                                <X size={18} className="text-muted" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label className="text-xs font-bold uppercase text-muted mb-1 block">Assignment Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #eee', background: '#FAFAFA', fontSize: '0.9rem' }}
                                >
                                    <option value="Essay">Essay</option>
                                    <option value="Dissertation">Dissertation</option>
                                    <option value="Case Study">Case Study</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-muted mb-1 block">Word Count</label>
                                <input
                                    type="number"
                                    min="250"
                                    step="250"
                                    value={words}
                                    onChange={(e) => setWords(parseInt(e.target.value))}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #eee', background: '#FAFAFA', fontSize: '0.9rem' }}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-muted mb-1 block">Deadline</label>
                                <select
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #eee', background: '#FAFAFA', fontSize: '0.9rem' }}
                                >
                                    <option value="24 Hours">24 Hours</option>
                                    <option value="3 Days">3 Days</option>
                                    <option value="7 Days">7 Days</option>
                                    <option value="14 Days">14 Days</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                                Get My Price Now <ArrowRight size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'var(--navy-gradient)',
                    color: '#fff',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-lg)',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? <X size={28} /> : <Calculator size={28} />}
            </motion.button>
        </div>
    )
}
