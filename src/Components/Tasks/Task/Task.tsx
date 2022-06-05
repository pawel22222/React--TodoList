import { FC, useContext, useState, useEffect } from 'react'
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
}

const TaskDiv = styled.div<ModeProps>`
  display: flex;
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
}) {
  const { mode } = useContext(ThemeContext)

  const [isEditing, setIsEditing] = useState(false)

  const openEditForm = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    function aaa() {
      isEditing
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto')
    }

    aaa()
  }, [isEditing])

  return (
    <TaskDiv mode={mode}>
      {isEditing && (
        <div>
          <FormEditTask
            id={id}
            name={name}
            setIsEditing={setIsEditing}
            editTask={editTask}
            isEditing={isEditing}
          />
        </div>
      )}

      <div
        style={{ cursor: 'pointer' }}
        className={'form-check w-100 h-100 py-2 '}
        onClick={() => openEditForm()}
      >
        <input
          className='form-check-input '
          style={{ cursor: 'pointer', padding: '10px' }}
          type='checkbox'
          value='zrobic zakupy'
          checked={isChecked}
          onChange={() => checkTask(id)}
        />

        <label
          className={`form-check-label ${isChecked && 'isChecked'}`}
          style={{
            userSelect: 'none',
            cursor: 'pointer',
            wordBreak: 'break-word',
            marginLeft: '5px',
          }}
          onClick={() => openEditForm()}
          htmlFor='flexCheckChecked'
        >
          {name}
        </label>
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
