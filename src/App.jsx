import { useState } from 'react'
import styles from './App.module.css'
// Components
import Header from './Components/Header/Header'
import FormNewTask from './Components/FormNewTask/FormNewTask'
import Tasks from './Components/Tasks/Tasks'

function App() {
  const defaultTasks = [
    {
      id: 1,
      name: 'zrobic zakupy',
      isChecked: false,
    },
    {
      id: 2,
      name: 'posprzatac',
      isChecked: false,
    },
    {
      id: 3,
      name: 'spotkanie 19 30',
      isChecked: false,
    },
  ]

  const checkTask = () => {
    console.log('check task')
  }
  const addTask = () => {
    console.log('add task')
  }

  const [tasks, setTasks] = useState(defaultTasks)

  return (
    <div className={ `${styles.appDiv}` }>
      <div className={ `${styles.todoAppContainer} p-2` }>
        <Header />
        <FormNewTask addTask={ addTask } />
        <Tasks tasks={ tasks } checkTask={ checkTask } />
      </div>
    </div>
  )
}

export default App
