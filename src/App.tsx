import { useState, useContext, FC } from 'react'
import styled from 'styled-components'

import Nav from './Components/Nav/Nav'
import Header from './Components/Header/Header'
import Tasks from './Components/Tasks/Tasks'
import FormNewTask from './Components/Form/FormNewTask'

import { ListType, ModeProps } from './global/Types'
import { theme } from './theme/theme'
import { ThemeContext } from './context/ThemeContext'
import { DataContext } from './context/DataContext'

// #region Styled Components
const AppContainer = styled.div<ModeProps>`
  background-color: ${({ mode }) => theme[mode].bg1};
  color: ${({ mode }) => theme[mode].text};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const Main = styled.main<ModeProps>`
  background-color: ${({ mode }) => theme[mode].bg2};
  margin: 10px 0;
  width: 600px;
  border: 1px gray solid;
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
  }
`
// #endregion

const App: FC = () => {
  const { mode, setMode } = useContext(ThemeContext)
  const { lists, setLists } = useContext(DataContext)

  const changeTheme = () => setMode()

  const [idOfDisplayList, setIdOfDisplayList] = useState(lists[0].id)

  const addTask = (nameNewTask: string) => {
    nameNewTask = nameNewTask
      .replace(/[^a-ż0-9 ~`!@#$%^&*()_+{}|:"<>?\-=[\]\\;',./]/gi, '')
      .trim()

    function addTaskToLists(): ListType[] {
      return lists.reduce((acc: ListType[], list) => {
        if (list.id === idOfDisplayList) {
          acc.push({
            id: list.id,
            name: list.name,
            tasks: [
              {
                id: Math.random(),
                name: nameNewTask,
                isChecked: false,
              },
              ...list.tasks,
            ],
          })
          return acc
        } else {
          acc.push(list)
          return acc
        }
      }, [])
    }

    if (nameNewTask) {
      setLists(addTaskToLists())
    }
  }

  const checkTask = (id: number) => {
    function checkTaskInLists() {
      return lists.map((list) => {
        if (list.id === idOfDisplayList) {
          return {
            ...list,
            tasks: list.tasks
              .map((task) =>
                task.id === id ? { ...task, isChecked: !task.isChecked } : task,
              )
              .sort((a, b) => Number(a.isChecked) - Number(b.isChecked)),
          }
        } else return list
      })
    }

    setLists(checkTaskInLists())
  }

  const removeTask = (id: number) => {
    setLists(
      lists.map((list) => {
        if (list.id === idOfDisplayList)
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== id),
          }
        else return list
      }),
    )
  }

  const editTask = (id: number, newNameTask: string) => {
    setLists(
      lists.map((list) => {
        if (list.id === idOfDisplayList) {
          return {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === id ? { ...task, name: newNameTask } : task,
            ),
          }
        } else return list
      }),
    )
  }

  const clearAllChecked = () => {
    setLists(
      lists.map((list) => {
        if (list.id === idOfDisplayList) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.isChecked === false),
          }
        } else return list
      }),
    )
  }

  const [inputValueNewTask, setInputValueNewTask] = useState('')
  const [isEditingTask, setIsEditingTask] = useState(false)

  function handlerAddTask() {
    addTask(inputValueNewTask)
    setInputValueNewTask('')
  }

  return (
    <AppContainer mode={mode}>
      <Main mode={mode}>
        <Nav
          idOfDisplayList={idOfDisplayList}
          setIdOfDisplayList={setIdOfDisplayList}
        />

        <Header
          clearAllChecked={clearAllChecked}
          idOfDisplayList={idOfDisplayList}
          changeTheme={changeTheme}
        />

        <Tasks
          idOfDisplayList={idOfDisplayList}
          checkTask={checkTask}
          editTask={editTask}
          removeTask={removeTask}
          isEditingTask={isEditingTask}
          setIsEditingTask={setIsEditingTask}
        />

        {!isEditingTask && (
          <FormNewTask
            inputValueNewTask={inputValueNewTask}
            setInputValueNewTask={setInputValueNewTask}
            handlerAddTask={handlerAddTask}
            placeholderTask='New task'
          />
        )}
      </Main>
    </AppContainer>
  )
}

export default App
