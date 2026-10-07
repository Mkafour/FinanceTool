import type { Metadata } from 'next';
import { CalculatorContent } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://financecalc.com';
const SITE_NAME = 'FinanceCalc';

/**
 * Generates standardized Next.js Page Metadata for any calculator.
 */
export function generateCalculatorMetadata(content: CalculatorContent): Metadata {
    const pageUrl = `${SITE_URL}/calculators/${content.slug}/`;

    return {
        title: `${content.title} – ${SITE_NAME}`,
        description: content.shortDescription,
        keywords: content.keywords,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: `${content.title} | Free Online Calculator`,
            description: content.shortDescription,
            url: pageUrl,
            siteName: SITE_NAME,
            type: 'website',
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: content.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: content.title,
            description: content.shortDescription,
            images: [`${SITE_URL}/og-image.png`],
        },
    };
}

/**
 * Generates JSON-LD Structured Data (Schema.org) for search engine rich snippets.
 */
export function generateCalculatorSchema(content: CalculatorContent) {
    const pageUrl = `${SITE_URL}/calculators/${content.slug}/`;

    // 1. WebApplication / SoftwareApplication Schema
    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: content.title,
        description: content.shortDescription,
        url: pageUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    // 2. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Calculators',
                item: `${SITE_URL}/#calculators`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: content.title,
                item: pageUrl,
            },
        ],
    };

    // 3. FAQPage Schema
    const faqSchema =
        content.faqs && content.faqs.length > 0
            ? {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: content.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                    },
                })),
            }
            : null;

    return [webAppSchema, breadcrumbSchema, faqSchema].filter(Boolean);
}