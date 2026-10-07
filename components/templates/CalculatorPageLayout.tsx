import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CalculatorContent } from '@/lib/types';
import styles from './CalculatorPageLayout.module.css';

interface CalculatorPageLayoutProps {
    content: CalculatorContent;
    formComponent: React.ReactNode;
    resultsComponent: React.ReactNode;
}

export const CalculatorPageLayout: React.FC<CalculatorPageLayoutProps> = ({
                                                                              content,
                                                                              formComponent,
                                                                              resultsComponent,
                                                                          }) => {
    return (
        <Container>
            <div className={styles.layout}>
                {/* Header Section */}
                <header className={styles.header}>
                    <h1 className={styles.title}>{content.title}</h1>
                    <p className={styles.description}>{content.shortDescription}</p>
                </header>

                {/* Interactive Workspace (Inputs + Outputs) */}
                <div className={styles.interactiveGrid}>
                    <Card title="Inputs">{formComponent}</Card>
                    <Card title="Summary">{resultsComponent}</Card>
                </div>

                {/* Content & SEO Explanation */}
                <section className={styles.contentSection}>
                    <h2 className={styles.sectionTitle}>How It Works</h2>
                    <p>{content.longDescription}</p>
                </section>

                {/* FAQs */}
                {content.faqs && content.faqs.length > 0 && (
                    <section className={styles.contentSection}>
                        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        <FAQAccordion faqs={content.faqs} />
                    </section>
                )}
            </div>
        </Container>
    );
};