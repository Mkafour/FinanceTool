import { Container } from './Container';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.brand}>FinanceCalc</div>
                    <p className={styles.disclaimer}>
                        <strong>Disclaimer:</strong> All calculators and tools provided on FinanceCalc are for informational and educational purposes only. They do not constitute financial, investment, or tax advice. Always consult a qualified professional before making financial decisions.
                    </p>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} FinanceCalc. All rights reserved.
                    </div>
                </div>
            </Container>
        </footer>
    );
};