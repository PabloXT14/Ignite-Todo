import { Task, useTask } from '../../Contexts/taskContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';
import { TaskItem } from '../Task';

import Clipboard from '../../assets/Clipboard.svg';
import styles from './styles.module.css';


export function TaskList() {
    const { tasksList, setTasksList } = useTask();
    const [newTaskText, setNewTaskText] = useState('');

    const totalTasks = tasksList.length;
    const tasksFinished = tasksList.reduce((acc, task) => {
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

        setTasksList([...tasksList, newTask]);
        setNewTaskText('');

    }

    function handleChangeTaskInputText(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(event.target.value);
    }

    function handleTaskDone(id: string) {
        const tasksUpdated = tasksList.filter(task => {
            if(task.id === id) {
                task.done = !task.done;
            }
            return task
        });

        setTasksList(tasksUpdated);
    }

    function handleDeleteTask(id: string) {
        const tasksUpdated = tasksList.filter(task => task.id !== id);

        setTasksList(tasksUpdated);
    }

    function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;

        const items = Array.from(tasksList);// copia do nosso array de items
        const [reorderedItem] = items.splice(result.source.index, 1);// pegando item selecionado
        items.splice(result.destination.index, 0, reorderedItem);// reposicionando item

        setTasksList(items);
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

                {(tasksList.length <= 0) ? (
                    <div className={styles.warningContainer}>
                        <img src={Clipboard} alt="Imagem de caderneta" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                ) : (
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='TaskListDropable'>
                            {(provided) => (
                                <ul 
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef}
                                    className={styles.listTasks} 
                                >
                                    {tasksList.map((task, index) => (
                                        <Draggable 
                                            key={task.id} 
                                            draggableId={task.id} 
                                            index={index}
                                        >
                                            {(provided) => (
                                                <TaskItem
                                                    innerRef={provided.innerRef}
                                                    provided={provided}
                                                    id={task.id}
                                                    content={task.content}
                                                    done={task.done}
                                                    onHandleTaskDone={handleTaskDone}
                                                    onHandleDeleteTask={handleDeleteTask}
                                                    index={index}
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </div>
        </div>
    )
}