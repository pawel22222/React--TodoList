import { useState, useEffect } from 'react'
import styled from 'styled-components'
// Components
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import Tasks from './Components/Tasks/Tasks'
// Styled components
const AppDiv = styled.div`
  background-color: #282c34;
  color: white;
  min-height: 100Vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const HeaderTaskDiv = styled.div`
  background-color: #3c4455;
  width: 600px;
  margin: 10px 0;
  @media (max-width: 768px) {
    .todoAppContainer{
      width: 100%;
      min-height: 100vh;
      margin: 0;
    }
`

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
    nameNewTask = nameNewTask.replace(/[^a-ż0-9 ~`!@#$%^&*()_+{}|:"<>?\-=[\]\\;',./]/gi, '').trim()
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

  const editTask = (id, newNameTask) => setLists(lists.map((list) => {
    if (list.id === displayTasksOfList) {
      return {
        ...list, tasks: list.tasks.map((task) =>
          (task.id === id)
            ? { ...task, name: newNameTask }
            : task
        )
      }
    } else {
      return list
    }
  }))

  const clearAllChecked = () => setLists(
    lists.map((list) => {
      if (list.id === displayTasksOfList) {
        return { ...list, tasks: list.tasks.filter((task) => task.isChecked === false) }
      } else return list
    })
  )

  return (
    <AppDiv>
      <Sidebar
        lists={ lists }
        setLists={ setLists }
        displayTasksOfList={ displayTasksOfList }
        setDisplayTasksOfList={ setDisplayTasksOfList }
      />
      <HeaderTaskDiv className="p-2">
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
          editTask={ editTask }
          removeTask={ removeTask }
        />
      </HeaderTaskDiv>
    </AppDiv>
  )
}

export default App
