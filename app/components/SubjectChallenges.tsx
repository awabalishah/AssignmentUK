import { AlertTriangle, BookOpen, Scale, Activity, BarChart3 } from 'lucide-react';

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
        <section className="section bg-secondary/5 py-12 border-y border-border/50">
            <div className="container">
                <div className="glass-card p-8 md:p-10 border-l-4 border-l-primary flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="p-4 bg-white rounded-full shadow-sm shrink-0">
                        {content.icon}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                            <AlertTriangle size={24} className="text-amber-500" />
                            Subject-Specific Challenges
                        </h3>
                        <h4 className="text-lg font-semibold text-primary mb-2">{content.title}</h4>
                        <div
                            className="text-muted text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: content.text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-foreground">$1</span>')
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
