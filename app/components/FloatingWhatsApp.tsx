'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FloatingWhatsApp() {
    return (
        <motion.a
            href="https://wa.me/447424096844"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                backgroundColor: '#25D366',
                color: '#fff',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 9999,
                cursor: 'pointer',
                textDecoration: 'none'
            }}
        >
            <MessageCircle size={32} />
            <span style={{
                position: 'absolute',
                right: '70px',
                backgroundColor: '#fff',
                color: '#333',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
            }}>
                Chat with an Expert
            </span>
        </motion.a>
    )
}
