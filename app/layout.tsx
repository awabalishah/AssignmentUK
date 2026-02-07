import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import FloatingWhatsApp from '@/app/components/FloatingWhatsApp'

export const metadata: Metadata = {
  metadataBase: new URL('https://assignment-writing.com'),
  title: 'Expert Assignment Writing Services UK | Top Grades Guaranteed',
  description: 'Specialized assignment help for UK students in Nursing, Law, Programming, and MBA. 100% Plagiarism-free and on-time delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <nav className="glass-card" style={{ padding: '1rem 0', position: 'sticky', top: 0, zIndex: 1000, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
          <div className="container flex items-center justify-between">
            <Link href="/" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>AssignUK<span className="text-gradient-gold">.</span></Link>
            <div className="flex items-center" style={{ gap: '2rem' }}>
              <Link href="/#services" className="text-sm font-bold">Subjects</Link>
              <Link href="/#contact" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Get Started</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ background: 'var(--primary)', color: '#fff', padding: '5rem 0', borderTop: '4px solid var(--secondary)' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '3rem', marginBottom: '4rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <h2 style={{ color: '#fff' }} className="text-2xl mb-1">AssignUK</h2>
                <p style={{ opacity: 0.8, fontSize: '0.9rem', maxWidth: '400px' }}>The UK's premier academic support service. We combine subject mastery with rigorous research to help students achieve their potential across all major UK universities.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Academic Fields</h4>
                <ul style={{ listStyle: 'none', lineHeight: '2', opacity: 0.8, fontSize: '0.85rem' }}>
                  <li><Link href="/subject/nursing" className="hover:text-secondary">Nursing & Healthcare</Link></li>
                  <li><Link href="/subject/law" className="hover:text-secondary">Law & Legal Studies</Link></li>
                  <li><Link href="/subject/business-writing" className="hover:text-secondary">Business & Management</Link></li>
                  <li><Link href="/subject/computer-science" className="hover:text-secondary">Computer Science & AI</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Expert Support</h4>
                <ul style={{ listStyle: 'none', lineHeight: '2', opacity: 0.8, fontSize: '0.85rem' }}>
                  <li><Link href="/#contact" className="hover:text-secondary">24/7 Academic Hotline</Link></li>
                  <li><Link href="/#contact" className="hover:text-secondary">WhatsApp Consultation</Link></li>
                  <li><Link href="/authors/awab-ali-shah" className="hover:text-secondary">UK-Based Subject Leads</Link></li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.8rem' }}>
              <p>&copy; 2025 AssignUK Academic Excellence. Registered in England & Wales. Part of the Global Scholars Network.</p>
            </div>
          </div>
        </footer>
        <FloatingWhatsApp />
      </body>
    </html >
  )
}
