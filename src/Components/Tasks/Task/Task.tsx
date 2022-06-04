import { FC, useState } from 'react'
import ButtonTask from '../../UI/button/Button'
import FormEditTask from './FormEditTask/FormEditTask'

type Props = {
  id: number
  name: string
  isChecked: boolean
  checkTask: (id: number) => void
  editTask: (id: number, text: string) => void
  removeTask: (id: number) => void
}

const Task: FC<Props> = function ({
  id,
  name,
  isChecked,
  checkTask,
  editTask,
  removeTask,
}) {
  const [isEditing, setIsEditing] = useState(false)

  const openEditForm = () => {
    setIsEditing(true)
  }

  return (
    <>
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
      <div className='taskDiv d-flex'>
        <div
          className={'form-check w-100 h-100 py-2 '}
          style={{ cursor: 'pointer' }}
          onClick={() => checkTask(id)}
        >
          <input
            className='form-check-input '
            style={{ cursor: 'pointer' }}
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
              wordBreak: 'break-all',
            }}
            onClick={() => checkTask(id)}
            htmlFor='flexCheckChecked'
          >
            {name}
          </label>
        </div>

        <div className='d-flex align-items-start pt-2'>
          <ButtonTask
            name='/'
            color='outline-warning'
            onClick={() => openEditForm()}
          />

          <span className='pe-1'></span>

          <ButtonTask
            name='X'
            color='outline-danger'
            onClick={() => removeTask(id)}
          />
        </div>
      </div>
    </>
  )
}

export default Task
