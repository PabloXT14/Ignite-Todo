import { Trash } from 'phosphor-react';
import { useRef, useState } from 'react';
import { Task } from '../TaskList';

import styles from './styles.module.css';

interface TaskProps extends Task {
    onHandleTaskDone: (id: string) => void;
    onHandleDeleteTask: (id: string) => void;
}

export function TaskItem(props: TaskProps) {
    const draggable = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false); 

    draggable.current?.addEventListener('dragstart', () => {
        // draggable.current?.classList.add('.dragging');
        setIsDragging(true);
    });

    draggable.current?.addEventListener('dragend', () => {
        // draggable.current?.classList.remove('dragging');
        setIsDragging(false);
    });

    return (
        <div 
            className={isDragging ? `${styles.container} ${styles.dragging}` : styles.container} 
            draggable={true} 
            ref={draggable}
        >
            <div className={styles.checkboxContainer}>
                <input 
                    type="checkbox" 
                    id={props.id} 
                    onClick={() => props.onHandleTaskDone(props.id)}
                />
                <label htmlFor={props.id}></label>
            </div>
            <p className={props.done ? styles.contentWithline : styles.content}>
                {props.content}
            </p>
            <button 
                type='button' 
                className={styles.deleteButton}
                onClick={() => props.onHandleDeleteTask(props.id)}
            >
                <Trash size={17}/>
            </button>
        </div>
    );
}