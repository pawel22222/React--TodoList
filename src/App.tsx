import { useState, useEffect, useContext, FC } from 'react'
import styled from 'styled-components'

import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import Tasks from './Components/Tasks/Tasks'

import { ListType, ModeProps } from './global/Types'
import { theme } from './theme/theme'
import { ThemeContext } from './context/ThemeContext'

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

  const defaultLists: ListType[] = [
    {
      id: 1,
      name: 'DEFAULT TODO LIST',
      tasks: [],
    },
  ]

  const LISTS_LOCAL_STORAGE = 'listsLocalStorage'

  if (!localStorage.getItem(LISTS_LOCAL_STORAGE)) {
    localStorage.setItem(LISTS_LOCAL_STORAGE, JSON.stringify(defaultLists))
  }

  const listsFromStorage: ListType[] = JSON.parse(
    localStorage.getItem(LISTS_LOCAL_STORAGE) || '',
  )

  const [lists, setLists] = useState(listsFromStorage)
  const [idOfDisplayList, setIdOfDisplayList] = useState(lists[0].id)

  useEffect(() => {
    localStorage.setItem(LISTS_LOCAL_STORAGE, JSON.stringify(lists))
  }, [lists])

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

  const changeTheme = () => setMode()

  return (
    <AppContainer mode={mode}>
      <Main mode={mode}>
        <Header
          clearAllChecked={clearAllChecked}
          addTask={addTask}
          lists={lists}
          idOfDisplayList={idOfDisplayList}
          changeTheme={changeTheme}
        />

        <Tasks
          lists={lists}
          idOfDisplayList={idOfDisplayList}
          checkTask={checkTask}
          editTask={editTask}
          removeTask={removeTask}
        />
      </Main>

      <Sidebar
        lists={lists}
        setLists={setLists}
        idOfDisplayList={idOfDisplayList}
        setIdOfDisplayList={setIdOfDisplayList}
      />
    </AppContainer>
  )
}

export default App
