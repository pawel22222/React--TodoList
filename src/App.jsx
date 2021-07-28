import { useState, useEffect } from 'react'
import styles from './App.module.css'
// Components
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
// import FormNewTask from './Components/Header/FormNewTask/FormNewTask'
import Tasks from './Components/Tasks/Tasks'

function App() {
  const defaultLists = [
    {
      id: 1,
      name: "DEFAULT TODO LIST",
      tasks: []
    }
  ]

  // Default useState equals first true value
  const [lists, setLists] = useState((JSON.parse(localStorage.getItem('listsLocalStorage')) || defaultLists))

  // UseEffect => calls setItems when tasks is changed
  useEffect(() =>
    localStorage.setItem('listsLocalStorage', JSON.stringify(lists))
    , [lists])

  const [displayTasksOfList, setDisplayTasksOfList] = useState(lists[0].id)

  const addTask = (nameNewTask) => {
    if (nameNewTask) setLists(() =>
      lists.reduce((acc, list) => {
        if (list.id === displayTasksOfList) {
          acc.push(
            {
              id: list.id,
              name: list.name,
              tasks: [{
                id: Math.random(),
                name: nameNewTask,
                isChecked: false
              }, ...list.tasks]
            }
          )
          return acc
        }
        else
          acc.push(list)
        return acc
      }, [])
    )
  }

  const checkTask = (id) => {
    setLists(lists.map((list) => {
      if (list.id === displayTasksOfList) {
        return {
          ...list, tasks: list.tasks.map((task) =>
            (task.id === id)
              ? { ...task, isChecked: !task.isChecked }
              : task
          ).sort((a, b) => a.isChecked - b.isChecked)
        }
      } else {
        return list
      }
    }))
  }

  const removeTask = (id) => setLists(
    lists.map((list) => {
      if (list.id === displayTasksOfList)
        return { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
      else return list
    })
  )

  const clearAllChecked = () => setLists(
    lists.map((list) => {
      if (list.id === displayTasksOfList) {
        return { ...list, tasks: list.tasks.filter((task) => task.isChecked === false) }
      } else return list
    })
  )



  return (
    <div className={ `${styles.appDiv}` }>
      <Sidebar
        lists={ lists }
        setLists={ setLists }
        displayTasksOfList={ displayTasksOfList }
        setDisplayTasksOfList={ setDisplayTasksOfList }
      />
      <div
        className={ ` ${styles.todoAppContainer} p-2` }>
        <Header
          clearAllChecked={ clearAllChecked }
          addTask={ addTask }
          lists={ lists }
          displayTasksOfList={ displayTasksOfList }
        />
        <Tasks
          lists={ lists }
          displayTasksOfList={ displayTasksOfList }
          checkTask={ checkTask }
          removeTask={ removeTask }
        />
      </div>
    </div>
  )
}

export default App
