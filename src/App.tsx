import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './global.css';
import { TaskProvider } from './Contexts/taskContext';

export function App() {

  return (
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <TaskList />
      </DndProvider>
    </TaskProvider>
  )
}
