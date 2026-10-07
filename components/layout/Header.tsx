import Link from 'next/link';
import { Container } from './Container';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/" className={styles.logo}>
                        Finance<span className={styles.logoAccent}>Calc</span>
                    </Link>
                    <nav className={styles.nav}>
                        <Link href="/" className={styles.navLink}>
                            All Calculators
                        </Link>
                    </nav>
                </div>
            </Container>
        </header>
    );
};