import { useState, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../context/ThemeContext'
// Components
import FormNewTask from '../Form/FormNewItem'
import Button from '../UI/ButtonMain/ButtonMain'

// Styled components
const NameListH1 = styled.h1`
    word-break: break-all;
    @media (max-width: 768px) {
      margin-left: 35px;
    }
`

const Header = function ({
  clearAllChecked,
  addTask,
  lists,
  displayTasksOfList,
  changeTheme
}) {
  const { mode } = useContext(ThemeContext)
  const [inputValueNewTask, setInputValueNewTask] = useState('')

  const handlerAddTask = () => {
    addTask(inputValueNewTask)
    setInputValueNewTask('')
  }

  return (
    <header>
      <div className="d-flex justify-content-between align-items-center py-2">
        <NameListH1>
          { lists.find((list) => list.id === displayTasksOfList).name }
        </NameListH1>
        <div>
          <Button
            name={ (mode === 'dark') ? 'Light' : 'Dark' }
            color={ `outline-${(mode === 'dark') ? 'light' : 'dark'}` }
            onClick={ () => changeTheme() }
          />
          <span className="ms-1"></span>
          <Button
            name="Clear done"
            color="outline-danger"
            onClick={ () => clearAllChecked() }
          />
        </div>
      </div>
      <FormNewTask
        inputValueNewItem={ inputValueNewTask }
        setInputValueNewItem={ setInputValueNewTask }
        handlerAddItem={ handlerAddTask }
        placeholderItem="New task.."
      />
    </header>
  )
}

export default Header