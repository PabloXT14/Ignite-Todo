import { createContext, useState } from 'react';
import { Task } from '../components/TaskList';

interface TaskContextData {
    tasks: Task[],
    moveTask: (from: number, to: number) => void;
}

interface TaskProviderProps {
    children: React.ReactNode;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);



function TaskProvider({ children }: TaskProviderProps) {
    const [tasksList, setTasksList] = useState<Task[]>([]);

    function moveTask(from: number, to: number) {
        console.log(from, to);
    }

    return (
        <TaskContext.Provider value={{
            tasks: tasksList,
            moveTask,
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export { TaskProvider, TaskContext };


