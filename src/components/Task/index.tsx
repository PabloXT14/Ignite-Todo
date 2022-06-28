import { Trash } from 'phosphor-react';
import styles from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';

export function Task() {
    const tempId = uuidv4();

    return (
        <div className={styles.container}>
            <div className={styles.checkboxContainer}>
                <input type="checkbox" id={tempId} />
                <label htmlFor={tempId}></label>
            </div>
            <p className={styles.content}>
                Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.
            </p>
            <Trash size={20}/>
        </div>
    );
}