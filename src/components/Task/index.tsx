import { Trash } from 'phosphor-react';
import styles from './styles.module.css';

export function Task() {
    return (
        <div className={styles.container}>
            <input type="checkbox" />
            <p className={styles.content}>
                Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.
            </p>
            <Trash size={24}/>
        </div>
    );
}