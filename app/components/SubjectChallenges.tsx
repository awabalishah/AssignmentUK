import { AlertTriangle, BookOpen, Scale, Activity, BarChart3, Brain, Settings, Wallet, Users } from 'lucide-react';

type SubjectChallengesProps = {
    subject: string;
};

export default function SubjectChallenges({ subject }: SubjectChallengesProps) {
    const normalizedSubject = subject.toLowerCase();

    const getContent = () => {
        if (normalizedSubject.includes('law') || normalizedSubject.includes('legal')) {
            return {
                icon: <Scale className="text-primary" size={32} />,
                title: "Navigating Legal Complexities",
                text: "Navigating the complexities of **OSCOLA 4th Edition** referencing and accessing premium legal databases like **Westlaw** and **LexisNexis** can be daunting. Our experts ensure precise case law citation and statute interpretation, helping you build compelling legal arguments rooted in current UK legislation."
            };
        } else if (normalizedSubject.includes('nursing') || normalizedSubject.includes('health') || normalizedSubject.includes('midwifery')) {
            return {
                icon: <Activity className="text-primary" size={32} />,
                title: "Clinical Excellence & Compliance",
                text: "We strictly adhere to the **NMC Code** of conduct. Our assignments integrate **Evidence-Based Practice (EBP)** and critical reflection complying with current UK healthcare standards. Whether it's a care plan or a reflective essay using **Gibbs' Cycle**, we ensure clinical accuracy."
            };
        } else if (normalizedSubject.includes('business') || normalizedSubject.includes('mba') || normalizedSubject.includes('management') || normalizedSubject.includes('marketing')) {
            return {
                icon: <BarChart3 className="text-primary" size={32} />,
                title: "Strategic Business Analysis",
                text: "Mastering strategic frameworks like **PESTLE**, **SWOT**, and **Porter's Five Forces** is crucial. We help you integrate real-world market data and financial analysis into your business reports, ensuring your work demonstrates the critical thinking required for distinction grades."
            };
        } else if (normalizedSubject.includes('psychology')) {
            return {
                icon: <Brain className="text-primary" size={32} />,
                title: "Empirical Research & Ethics",
                text: "Mastering **APA 7th Edition** and navigating **BPS ethical guidelines** is essential for Psychology students. We provide specialized support for **quantitative (SPSS/R)** and **qualitative (Thematic Analysis)** research, ensuring your case studies and lab reports meet rigorous scientific standards."
            };
        } else if (normalizedSubject.includes('engineering')) {
            return {
                icon: <Settings className="text-primary" size={32} />,
                title: "Technical Accuracy & Standards",
                text: "Precision is non-negotiable in Engineering. Our experts assist with complex calculations, **CAD designs**, and technical reports complying with **Eurocodes** or **British Standards (BSI)**. We ensure your designs and analysis (FEA/CFD) are technically sound and professionally documented."
            };
        } else if (normalizedSubject.includes('finance') || normalizedSubject.includes('accounting') || normalizedSubject.includes('economics')) {
            return {
                icon: <Wallet className="text-primary" size={32} />,
                title: "Financial Modeling & Standards",
                text: "Staying compliant with **IFRS** or **UK GAAP** is critical for Finance assignments. We provide expert help with complex **financial modeling**, **auditing procedures**, and econometrics. Our team ensures your data analysis is accurate and your interpretations follow current professional standards."
            };
        } else if (normalizedSubject.includes('sociology') || normalizedSubject.includes('social work') || normalizedSubject.includes('criminology')) {
            return {
                icon: <Users className="text-primary" size={32} />,
                title: "Critical Theory & Social Policy",
                text: "Sociology requires a deep understanding of **Critical Race Theory**, **Feminism**, and **Modern Social Policy**. We help you apply diverse theoretical frameworks to modern social issues, ensuring your analysis is nuanced and reflects the latest UK legislative changes in Social Work and Criminology."
            };
        } else {
            return {
                icon: <BookOpen className="text-primary" size={32} />,
                title: `Mastering ${subject} Academic Standards`,
                text: `Achieving top grades in **${subject}** requires deep theoretical understanding and critical analysis. Our experts help you navigate complex concepts and apply them to real-world scenarios, ensuring your work meets the rigorous standards of UK higher education.`
            };
        }
    };

    const content = getContent();

    return (
        <section className="section py-16">
            <div className="container">
                <div className="glass-card p-10 md:p-14 border-l-8 border-l-secondary flex flex-col md:flex-row gap-10 items-start md:items-center bg-white shadow-premium">
                    <div className="p-6 bg-slate-50 rounded-2xl shadow-inner shrink-0 text-primary">
                        {content.icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-amber-100 text-amber-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter">Academic Alert</span>
                            <h3 className="text-2xl font-bold m-0">Subject Critical Challenges</h3>
                        </div>
                        <h4 className="text-xl font-bold text-gradient-gold mb-3">{content.title}</h4>
                        <div
                            className="text-muted text-lg leading-relaxed font-medium"
                            dangerouslySetInnerHTML={{
                                __html: content.text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>')
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
