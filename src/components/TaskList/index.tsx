import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Clipboard from '../../assets/Clipboard.svg';
import { TaskItem } from '../Task';

import styles from './styles.module.css';

export interface Task {
    id: string;
    content: string;
    done: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    const totalTasks = tasks.length;
    const tasksFinished = tasks.reduce((acc, task) => {
        if(task.done) {
            acc += 1;
        }
        return acc;
    }, 0)


    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const newTask: Task = {
            id: uuidv4(),
            content: newTaskText,
            done: false
        }

        setTasks([...tasks, newTask]);
        setNewTaskText('');

    }

    function handleChangeTaskInputText(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(event.target.value);
    }

    function handleTaskDone(id: string) {
        const tasksUpdated = tasks.filter(task => {
            if(task.id === id) {
                task.done = !task.done;
            }
            return task
        });

        setTasks(tasksUpdated);
    }

    function handleDeleteTask(id: string) {
        const tasksUpdated = tasks.filter(task => task.id !== id);

        setTasks(tasksUpdated);
    }


    return (
        <div className={styles.container}>
            <form onSubmit={handleCreateNewTask} className={styles.form}>
                <input 
                    value={newTaskText}
                    onChange={handleChangeTaskInputText}
                    type="text" 
                    placeholder='Adicione uma nova tarefa'
                    required
                />
                <button type="submit">
                    Criar <PlusCircle size={20} />
                </button>
            </form>

            <div className={styles.tasksContainer}>
                <div className={styles.tasksInfo}>
                    <div className={styles.numberOfTasks}>
                        Tarefas criadas
                        <span className={styles.indicator}>
                            {totalTasks}
                        </span>
                    </div>
                    <div className={styles.numberOfTasksFinished}>
                        Concluídas
                        <span className={styles.indicator}>
                            {tasksFinished}
                        </span>
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
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                content={task.content}
                                done={task.done}
                                onHandleTaskDone={handleTaskDone}
                                onHandleDeleteTask={handleDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}