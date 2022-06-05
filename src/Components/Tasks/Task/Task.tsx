import { FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import ButtonTask from '../../UI/button/Button'
import FormEditTask from './FormEditTask/FormEditTask'
import { theme } from '../../../theme/theme'
import { ModeProps } from '../../../global/Types'
import { ThemeContext } from '../../../context/ThemeContext'

type Props = {
  id: number
  name: string
  isChecked: boolean
  checkTask: (id: number) => void
  editTask: (id: number, text: string) => void
  removeTask: (id: number) => void
  isEditingTask: boolean
  setIsEditingTask: (isEditingTask: boolean) => void
}

const TaskDiv = styled.div<ModeProps>`
  display: flex;
  align-items: center;
  padding: 0 5px;
  &:hover {
    background-color: ${({ mode }) => theme[mode].bg1};
  }
`

const Task: FC<Props> = function ({
  id,
  name,
  isChecked,
  checkTask,
  editTask,
  removeTask,
  isEditingTask,
  setIsEditingTask,
}) {
  const { mode } = useContext(ThemeContext)

  const openEditForm = () => {
    setIsEditingTask(true)
  }

  useEffect(() => {
    function aaa() {
      isEditingTask
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto')
    }

    aaa()
  }, [isEditingTask])

  return (
    <TaskDiv mode={mode}>
      {isEditingTask && (
        <FormEditTask
          id={id}
          name={name}
          setIsEditing={setIsEditingTask}
          editTask={editTask}
          isEditing={isEditingTask}
        />
      )}

      <input
        className='form-check-input '
        style={{ cursor: 'pointer', padding: '10px' }}
        type='checkbox'
        value='zrobic zakupy'
        checked={isChecked}
        onChange={() => checkTask(id)}
      />

      <div
        className={`form-check-label ${
          isChecked && 'isChecked'
        } w-100 h-100 py-2 `}
        style={{
          userSelect: 'none',
          cursor: 'pointer',
          wordBreak: 'break-word',
          marginLeft: '5px',
        }}
        onClick={() => openEditForm()}
      >
        {name}
      </div>

      <div className='d-flex align-items-center ms-2'>
        <ButtonTask
          name='X'
          color='outline-danger'
          onClick={() => removeTask(id)}
        />
      </div>
    </TaskDiv>
  )
}

export default Task
