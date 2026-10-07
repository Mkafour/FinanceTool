import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { calculatorsList, toolsList } from '@/lib/calculators-list';

export default function HomePage() {
    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <section style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                        Fast & Free Personal Finance Calculators
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>
                        Simple, precise tools for budgeting, loans, savings, and everyday calculations.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Available Calculators
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {calculatorsList.map((calc) => (
                            <Link key={calc.slug} href={`/calculators/${calc.slug}`} style={{ textDecoration: 'none' }}>
                                <Card title={calc.title} description={calc.description}>
                                    <span style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                                        Open Calculator →
                                    </span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Tools
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {toolsList.map((tool) => (
                            <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                                <Card title={tool.title} description={tool.description}>
                                    <span style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                                        Open Tool →
                                    </span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </Container>
    );
}