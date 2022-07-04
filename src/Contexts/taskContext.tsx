import { createContext, useContext, useState } from 'react';

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




