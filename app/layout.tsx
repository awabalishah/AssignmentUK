import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
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
      <body>
        <nav style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div className="container flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#001F3F' }}>AssignUK<span style={{ color: '#D4AF37' }}>.</span></div>
            <div className="flex" style={{ gap: '2rem', alignItems: 'center' }}>
              <a href="/#services" style={{ fontWeight: 600 }}>Subjects</a>
              <a href="/#contact" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Get Started</a>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ background: '#001F3F', color: '#fff', padding: '5rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
              <div>
                <h2 style={{ color: '#fff' }}>AssignUK</h2>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Elevating academic standards across the UK. Professional support for assignments, exams, and dissertations.</p>
              </div>
              <div>
                <h4 style={{ color: '#D4AF37', marginBottom: '1.5rem' }}>Our Services</h4>
                <ul style={{ listStyle: 'none', lineHeight: '2', opacity: 0.8, fontSize: '0.9rem' }}>
                  <li>Computer Science Exams</li>
                  <li>Nursing Assignments</li>
                  <li>Business Writing</li>
                  <li>Law Case Studies</li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#D4AF37', marginBottom: '1.5rem' }}>Support</h4>
                <ul style={{ listStyle: 'none', lineHeight: '2', opacity: 0.8, fontSize: '0.9rem' }}>
                  <li>24/7 Live Chat</li>
                  <li>WhatsApp Specialist</li>
                  <li>Email: support@assignuk.com</li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.8rem' }}>
              <p>&copy; 2025 AssignUK Academic Services. All Rights Reserved. UK Registered Company.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
