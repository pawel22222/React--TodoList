import Task from './Task/Task'
import { FC, useRef } from 'react'
import { ListType } from '../../global/Types'

type Props = {
  lists: ListType[]
  idOfDisplayList: number
  checkTask: (id: number) => void
  editTask: (id: number, text: string) => void
  removeTask: (id: number) => void
}

const Tasks: FC<Props> = function ({
  lists,
  idOfDisplayList,
  checkTask,
  editTask,
  removeTask,
}) {
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
            style={{ cursor: 'pointer' }}
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
            />
          ))}
        </div>
      </div>

      <div>
        {doneTasks.length !== 0 && (
          <h4
            onClick={() => rollUpDoneTasksDiv()}
            style={{ cursor: 'pointer' }}
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
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Tasks
