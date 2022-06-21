import Logo from '../../assets/Logo.svg';

import styles from './styles.module.css';


export function Header() {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={Logo} alt="Logo"/>
        </div>
    );
}