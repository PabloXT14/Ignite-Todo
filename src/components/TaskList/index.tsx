import { PlusCircle } from 'phosphor-react';
import { FormEvent } from 'react';
import styles from './styles.module.css';

export function TaskList() {

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
    }


    return (
        <div className={styles.container}>
            <form onSubmit={handleCreateNewTask} className={styles.form}>
                <input type="text" placeholder='Adicione uma nova tarefa'/>
                <button type="submit">
                    Criar <PlusCircle size={20} />
                </button>
            </form>
        </div>
    )
}