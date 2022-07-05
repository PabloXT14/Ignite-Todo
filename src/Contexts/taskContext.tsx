import { createContext, useContext, useEffect, useState } from 'react';

export interface Task {
    id: string;
    content: string;
    done: boolean;
}

interface TaskContextData {
    tasksList: Task[],
    setTasksList: (tasksList: Task[]) => void;
}

interface TaskProviderProps {
    children: React.ReactNode;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);


function TaskProvider({ children }: TaskProviderProps) {
    const [tasksList, setTasksList] = useState<Task[]>([]);

    useEffect(() => {
        const initialList: Task[] = JSON.parse(localStorage.getItem('@IGNITE-TODO')!);
        setTasksList(initialList);
    }, []);

    useEffect(() => {
        localStorage.setItem('@IGNITE-TODO', JSON.stringify(tasksList));
    }, [tasksList]);

    return (
        <TaskContext.Provider value={{
            tasksList,
            setTasksList
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




