import { PlusCircle } from 'phosphor-react';
import { FormEvent } from 'react';
import Clipboard from '../../assets/Clipboard.svg';

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

            <div className={styles.tasksContainer}>
                <div className={styles.tasksInfo}>
                    <div className={styles.numberOfTasks}>
                        Tarefas criadas<span className={styles.indicator}>0</span>
                    </div>
                    <div className={styles.numberOfTasksFinished}>
                        Concluídas<span className={styles.indicator}>0</span>
                    </div>
                </div>

                <div className={styles.warningContainer}>
                    <img src={Clipboard} alt="Imagem de caderneta" />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </div>

                <div className={styles.listTasks}>

                </div>
            </div>
        </div>
    )
}