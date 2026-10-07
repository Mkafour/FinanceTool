'use client';

import React, { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                        <button
                            className={styles.question}
                            onClick={() => toggle(index)}
                            aria-expanded={isOpen}
                        >
                            <span>{faq.question}</span>
                            <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && <div className={styles.answer}>{faq.answer}</div>}
                    </div>
                );
            })}
        </div>
    );
};