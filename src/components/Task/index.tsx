import { useRef } from 'react';
import { Task, useTask } from '../../Contexts/taskContext';
import { Trash } from 'phosphor-react';
import { useDrag, useDrop } from 'react-dnd';

import styles from './styles.module.css';

interface TaskProps extends Task {
    onHandleTaskDone: (id: string) => void;
    onHandleDeleteTask: (id: string) => void;
    index: number;
}

export function TaskItem(props: TaskProps) {
    const { moveTask } = useTask();
    const ref = useRef<HTMLLIElement>(null);


    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'CARD',
        item: { index: props.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));


    const [, dropRef] = useDrop(() => ({
        accept: 'CARD',
        hover(item: TaskProps, monitor) {
            // console.log(item.id); // ITEM ARRASTADO
            // console.log(props.id); // ITEM QUE SOFRE O HOVER EM CIMA

            const draggedIndex = item.index;
            const targetIndex = props.index;

            if (draggedIndex == targetIndex) { return };

            const targetSize = ref.current!.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset!.y - targetSize.top;


            if (draggedIndex < targetIndex && draggedTop < targetCenter) { return }

            if (draggedIndex > targetIndex && draggedTop > targetCenter ) { return }

            moveTask(draggedIndex, targetIndex);

            // item.index = targetIndex;// mudando index depois de movido
        }
    }));

    // passando uma referencia dentro da outra
    dragRef(dropRef(ref));


    return (
        <li 
            className={isDragging ? styles.container+' '+styles.isDragging : styles.container}
            ref={ref}
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
        </li>
    );
}