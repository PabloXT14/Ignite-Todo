import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskProvider } from './Contexts/taskContext';

import './global.css';

export function App() {

  return (
    <TaskProvider>
        <Header />
        <TaskList />
    </TaskProvider>
  )
}
