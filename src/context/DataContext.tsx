import { createContext, FC, useEffect, useState } from 'react'
import { ListType } from '../global/Types'

type DataContext = {
  lists: ListType[]
  setLists: (newLists: ListType[]) => void
}

const LISTS_LOCAL_STORAGE = 'listsLocalStorage'

function getLists(): ListType[] {
  const defaultLists: ListType[] = [
    {
      id: 1,
      name: 'DEFAULT TODO LIST',
      tasks: [],
    },
  ]

  if (!localStorage.getItem(LISTS_LOCAL_STORAGE)) {
    localStorage.setItem(LISTS_LOCAL_STORAGE, JSON.stringify(defaultLists))
  }

  return JSON.parse(localStorage.getItem(LISTS_LOCAL_STORAGE) || '')
}

const defaultState = {
  lists: getLists(),
  setLists: () => ({}),
}

export const DataContext = createContext<DataContext>(defaultState)

const ThemeProvider: FC = ({ children }) => {
  const [lists, setLists] = useState(getLists())

  useEffect(() => {
    localStorage.setItem(LISTS_LOCAL_STORAGE, JSON.stringify(lists))
  }, [lists])

  return (
    <DataContext.Provider
      value={{
        lists: lists,
        setLists: (newLists: ListType[]) => setLists(newLists),
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default ThemeProvider
