import Link from 'next/link'
import LeadForm from '@/app/components/LeadForm'
import { Mail, Phone, MapPin, ShieldCheck, Clock, Award } from 'lucide-react'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export const metadata = {
    title: 'Contact Our Academic Experts | Confidential Support',
    description: 'Get in touch with AssignUK for bespoke academic writing support. Confidential consultation with PhD specialists available 24/7 for UK university students.',
    alternates: {
        canonical: 'https://assignment-writing.com/contactus'
    }
}

export default function ContactPage() {
    return (
        <main>
            <Breadcrumbs
                items={[
                    { label: 'Support', href: '/' },
                    { label: 'Contact Us' }
                ]}
            />

            <section className="section hero-gradient" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div className="text-center mb-4">
                        <span className="text-sm font-bold text-gradient-gold uppercase tracking-widest">Confidential Consultation</span>
                        <h1 className="text-5xl md:text-6xl mb-2">How Can We <span className="text-gradient-gold">Help?</span></h1>
                        <p className="text-lg text-muted mx-auto" style={{ maxWidth: '600px' }}>
                            Connect with our senior scholars for a private discussion about your academic requirements.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '5rem', alignItems: 'start' }}>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl mb-3">Direct Support Channels</h2>
                            <div className="flex flex-col" style={{ gap: '2rem' }}>
                                <div className="flex items-start" style={{ gap: '1.5rem' }}>
                                    <div style={{ background: 'var(--bg-alt)', padding: '1rem', borderRadius: '15px', color: 'var(--secondary)' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="mb-0">Email Enquiry</h4>
                                        <p className="text-muted mb-1">Response within 60 minutes</p>
                                        <a href="mailto:support@assignment-writing.com" className="font-bold text-primary">support@assignment-writing.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start" style={{ gap: '1.5rem' }}>
                                    <div style={{ background: 'var(--bg-alt)', padding: '1rem', borderRadius: '15px', color: 'var(--secondary)' }}>
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="mb-0">Privacy Guaranteed</h4>
                                        <p className="text-muted mb-0">Your data is encrypted and never shared with academic institutions. 100% bank-grade confidentiality for all UK students.</p>
                                    </div>
                                </div>

                                <div className="flex items-start" style={{ gap: '1.5rem' }}>
                                    <div style={{ background: 'var(--bg-alt)', padding: '1rem', borderRadius: '15px', color: 'var(--secondary)' }}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="mb-0">Operating Hours</h4>
                                        <p className="text-muted mb-0">Our expert writers are available 24/7 to handle urgent 24-hour and 48-hour deadlines across all time zones.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ marginTop: '4rem', padding: '3rem', background: 'var(--navy-gradient)', color: '#fff' }}>
                                <div className="flex items-center mb-2" style={{ gap: '1rem' }}>
                                    <Award className="text-secondary" size={32} />
                                    <h3 style={{ color: '#fff' }} className="mb-0 text-2xl">UK Quality Standards</h3>
                                </div>
                                <p style={{ opacity: 0.8 }} className="text-sm mb-0">Every consultation is handled by a senior UK-based scholar to ensure your requirements are mapped precisely to the required QAA standards.</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="glass-card" style={{ padding: '3.5rem', boxShadow: 'var(--shadow-premium)', border: '1px solid #eee' }}>
                            <h3 className="text-2xl mb-2">Request Bespoke Quote</h3>
                            <LeadForm />
                        </div>

                    </div>
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="text-center mb-3">
                        <h2 className="text-3xl">Frequently Asked Questions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem' }}>
                        {[
                            { q: "How quickly will I get a quote?", a: "Most students receive a tailored quote within 30-60 minutes after submitting their brief." },
                            { q: "Can I talk to my writer directly?", a: "Yes, once your order is confirmed, you'll have a direct messaging channel with your assigned PhD specialist." },
                        ].map((faq, i) => (
                            <div key={i} className="glass-card" style={{ padding: '2rem', background: '#fff' }}>
                                <h4 className="text-sm font-bold mb-1">{faq.q}</h4>
                                <p className="text-xs text-muted mb-0">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
