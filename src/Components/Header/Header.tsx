import { useState, useContext, FC } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../context/ThemeContext'
import { ListType } from '../../global/Types'

import FormNewTask from '../Form/FormNewItem'
import Button from '../UI/button/Button'

const ListNameH1 = styled.h1`
  word-break: break-all;
  user-select: none;
  @media (max-width: 768px) {
    margin-left: 35px;
  }
`

type Props = {
  clearAllChecked: () => void
  addTask: (taskName: string) => void
  lists: ListType[]
  idOfDisplayList: number
  changeTheme: () => void
}

const Header: FC<Props> = ({
  clearAllChecked,
  addTask,
  lists,
  idOfDisplayList,
  changeTheme,
}) => {
  const { mode } = useContext(ThemeContext)
  const [inputValueNewTask, setInputValueNewTask] = useState('')

  const currentList = lists.find(
    (list: ListType) => list.id === idOfDisplayList,
  )

  function handlerAddTask() {
    addTask(inputValueNewTask)
    setInputValueNewTask('')
  }

  return (
    <header className='p-2'>
      <div className='d-flex justify-content-between align-items-center py-2'>
        <ListNameH1>{currentList && currentList.name}</ListNameH1>

        <div className='d-flex flex-nowrap'>
          <Button
            name={mode === 'dark' ? 'Light' : 'Dark'}
            color={`outline-${mode === 'dark' ? 'light' : 'dark'}`}
            onClick={() => changeTheme()}
          />
          <span className='ms-1'></span>

          <Button
            name='Clear done'
            color='outline-danger'
            onClick={() => clearAllChecked()}
          />
        </div>
      </div>

      <FormNewTask
        inputValueNewItem={inputValueNewTask}
        setInputValueNewItem={setInputValueNewTask}
        handlerAddItem={handlerAddTask}
        placeholderItem='New task..'
      />
    </header>
  )
}

export default Header
