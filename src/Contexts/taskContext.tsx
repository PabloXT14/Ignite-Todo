import { createContext, useContext, useState } from 'react';
import produce from 'immer';

export interface Task {
    id: string;
    content: string;
    done: boolean;
}

interface TaskContextData {
    tasksList: Task[],
    setTasksList: (tasksList: Task[]) => void;
    moveTask: (from: number, to: number) => void;
}

interface TaskProviderProps {
    children: React.ReactNode;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);


function TaskProvider({ children }: TaskProviderProps) {
    const [tasksList, setTasksList] = useState<Task[]>([]);

    function moveTask(from: number, to: number) {
        // console.log(from, to);

        //(seuArray, draft: rascunho/copia do seu array) => e cada alteração no seu draft é refletido no seuArray ou lista
        setTasksList(produce(tasksList, draft => {
            const dragged = draft[from];// selecionando informações do item que queremos mover

            console.log(dragged);

            //retirando item da sua posição
            // draft.splice(from, 1);

            //colocando em nova posição
            // draft.splice(to, 0, dragged);
        }));
    }

    return (
        <TaskContext.Provider value={{
            tasksList,
            setTasksList,
            moveTask,
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTask() {
    const context = useContext(TaskContext);

    return context;
}

export { TaskProvider, TaskContext };




