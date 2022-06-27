import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Clipboard from '../../assets/Clipboard.svg';
import { Task } from '../Task';

import styles from './styles.module.css';

interface Task {
    id: string;
    content: string;
    done: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: uuidv4(), content: 'Item 1', done: false},
        {id: uuidv4(), content: 'Item 2', done: false},
        {id: uuidv4(), content: 'Item 3', done: false},
        {id: uuidv4(), content: 'Item 4', done: false},
    ]);


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

            <div className={styles.tasksContainer}>
                <div className={styles.tasksInfo}>
                    <div className={styles.numberOfTasks}>
                        Tarefas criadas<span className={styles.indicator}>0</span>
                    </div>
                    <div className={styles.numberOfTasksFinished}>
                        Concluídas<span className={styles.indicator}>0</span>
                    </div>
                </div>

                {(tasks.length <= 0) ? (
                    <div className={styles.warningContainer}>
                        <img src={Clipboard} alt="Imagem de caderneta" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                ) : (
                    <div className={styles.listTasks}>
                        {tasks.map(task => (
                            <Task key={task.id}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}