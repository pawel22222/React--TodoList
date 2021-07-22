import { useState, useEffect } from 'react'
import styles from './App.module.css'
// Components
import Header from './Components/Header/Header'
import FormNewTask from './Components/FormNewTask/FormNewTask'
import Tasks from './Components/Tasks/Tasks'

function App() {
  // Default useState equals first true value
  const [tasks, setTasks]
    = useState(JSON.parse((localStorage.getItem('tasksLocalStorage')) || []))

  // UseEffect => calls setItems when tasks is changed
  useEffect(() => localStorage.setItem('tasksLocalStorage', JSON.stringify(tasks))
    , [tasks])

  const addTask = (nameNewTask) => {
    if (nameNewTask) {
      setTasks(() =>
        [{
          id: Math.random(),
          name: nameNewTask,
          isChecked: false
        }, ...tasks])
    }
  }

  const checkTask = (id) => {
    setTasks(tasks.map(task =>
      (task.id === id)
        ? { ...task, isChecked: !task.isChecked }
        : task))
  }

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className={ `${styles.appDiv}` }>
      <div className={ `${styles.todoAppContainer} p-2` }>
        <Header />
        <FormNewTask addTask={ addTask } />
        <Tasks
          tasks={ tasks }
          checkTask={ checkTask }
          removeTask={ removeTask }
        />
      </div>
    </div>
  )
}

export default App
