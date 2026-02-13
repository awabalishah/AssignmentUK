import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAnalytics from '@/app/components/GoogleAnalytics'
import FloatingWhatsApp from '@/app/components/FloatingWhatsApp'

export const metadata: Metadata = {
  metadataBase: new URL('https://assignment-writing.com'),
  title: {
    default: 'Expert Assignment Writing Services UK | Top Grades Guaranteed',
    template: '%s | AssignUK'
  },
  description: 'Specialized UK assignment help: Nursing, Law, Programming, and MBA. PhD writers, 100% plagiarism-free, and guaranteed 2:1/1st class results.',
  verification: {
    google: 'M2ac8jrlYtpoD7d_sb_JXmdJp-xrBnfIkObpzsHDXoA',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://assignment-writing.com',
    siteName: 'AssignUK',
  }
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
        <GoogleAnalytics />
        <nav className="glass-card" style={{
          padding: '1.25rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderRadius: 0,
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          <div className="container flex items-center justify-between">
            <Link href="/" className="animate-fade-in" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
              AssignUK<span className="text-secondary" style={{ marginLeft: '1px' }}>.</span>
            </Link>
            <div className="flex items-center" style={{ gap: '2.5rem' }}>
              <Link href="/#services" className="text-sm font-bold hover:text-secondary transition-colors">Specialties</Link>
              <Link href="/#contact" className="btn btn-primary" style={{ padding: '0.7rem 1.4rem' }}>Request Quote</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ background: 'var(--primary)', color: '#fff', padding: '6rem 0', borderTop: '6px solid var(--secondary)' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '4rem', marginBottom: '5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <h2 style={{ color: '#fff', fontSize: '2rem' }} className="mb-1">AssignUK<span className="text-secondary">.</span></h2>
                <p style={{ opacity: 0.7, fontSize: '0.95rem', maxWidth: '420px', lineHeight: '1.8' }}>
                  The UK&apos;s most trusted academic writing consultancy. We provide bespoke support for complex modules at leading Russell Group universities, ensuring academic integrity and excellence.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Specialized Fields</h4>
                <ul style={{ listStyle: 'none', lineHeight: '2.2', opacity: 0.7, fontSize: '0.9rem' }}>
                  <li><Link href="/subject/nursing" className="hover:text-secondary transition-colors">Nursing & Healthcare</Link></li>
                  <li><Link href="/subject/law" className="hover:text-secondary transition-colors">Law & Legal Studies</Link></li>
                  <li><Link href="/subject/business-writing" className="hover:text-secondary transition-colors">Business Management</Link></li>
                  <li><Link href="/subject/computer-science" className="hover:text-secondary transition-colors">Tech & Computer Science</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Academic Hubs</h4>
                <ul style={{ listStyle: 'none', lineHeight: '2.2', opacity: 0.7, fontSize: '0.9rem' }}>
                  <li><Link href="/services/nursing-assignment-help-ucl" className="hover:text-secondary transition-colors">UCL Nursing Hub</Link></li>
                  <li><Link href="/services/lpc-assignment-help-bpp" className="hover:text-secondary transition-colors">BPP Law Experts</Link></li>
                  <li><Link href="/services/mba-assignment-help-manchester" className="hover:text-secondary transition-colors">Manchester MBA</Link></li>
                  <li><Link href="/locations" className="text-secondary font-bold hover:underline transition-colors">All UK Locations →</Link></li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2.5rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
              <p>&copy; {new Date().getFullYear()} AssignUK Mastery. All assignments are model papers intended for research purposes. Registered in England & Wales.</p>
            </div>
          </div>
        </footer>
        <FloatingWhatsApp />
      </body>
    </html >
  )
}
