import Task from './Task/Task'
import { FC, useContext, useRef } from 'react'
import { DataContext } from '../../context/DataContext'

type Props = {
  idOfDisplayList: number
  checkTask: (id: number) => void
  editTask: (id: number, text: string) => void
  removeTask: (id: number) => void
  isEditingTask: boolean
  setIsEditingTask: (isEditingTask: boolean) => void
}
const Tasks: FC<Props> = function ({
  idOfDisplayList,
  checkTask,
  editTask,
  removeTask,
  isEditingTask,
  setIsEditingTask,
}) {
  const { lists } = useContext(DataContext)
  const displayList = lists.filter((list) => list.id === idOfDisplayList)

  const todoTasks = displayList[0].tasks.filter((task) => !task.isChecked)
  const doneTasks = displayList[0].tasks.filter((task) => task.isChecked)

  const todoTasksDiv = useRef<HTMLDivElement>(null)
  const doneTasksDiv = useRef<HTMLDivElement>(null)

  const rollUpTodoTasksDiv = () =>
    todoTasksDiv.current?.classList.toggle('displayNone')

  const rollUpDoneTasksDiv = () =>
    doneTasksDiv.current?.classList.toggle('displayNone')

  return (
    <>
      <div>
        {todoTasks.length !== 0 && (
          <h4
            onClick={() => rollUpTodoTasksDiv()}
            style={{ cursor: 'pointer', userSelect: 'none' }}
            className='px-2'
          >
            To do ({todoTasks.length})
          </h4>
        )}

        <div ref={todoTasksDiv}>
          {todoTasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              checkTask={checkTask}
              editTask={editTask}
              removeTask={removeTask}
              isEditingTask={isEditingTask}
              setIsEditingTask={setIsEditingTask}
            />
          ))}
        </div>
      </div>

      <div>
        {doneTasks.length !== 0 && (
          <h4
            onClick={() => rollUpDoneTasksDiv()}
            style={{ cursor: 'pointer', userSelect: 'none' }}
            className='px-2'
          >
            Complited ({doneTasks.length})
          </h4>
        )}

        <div ref={doneTasksDiv}>
          {doneTasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              checkTask={checkTask}
              removeTask={removeTask}
              editTask={editTask}
              isEditingTask={isEditingTask}
              setIsEditingTask={setIsEditingTask}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Tasks
