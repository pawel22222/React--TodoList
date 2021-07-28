import Task from './Task/Task'
import { useRef } from 'react'

const Tasks = function ({ lists, displayTasksOfList, checkTask, removeTask }) {

    const displayList = lists.filter(list => list.id === displayTasksOfList)

    const todoTasks = displayList[0].tasks.filter((task) => !task.isChecked)
    const doneTasks = displayList[0].tasks.filter((task) => task.isChecked)

    const todoTasksDiv = useRef(null)
    const doneTasksDiv = useRef(null)


    const rollUpTodoTasksDiv = () =>
        todoTasksDiv.current.classList.toggle('displayNone')

    const rollUpDoneTasksDiv = () =>
        doneTasksDiv.current.classList.toggle('displayNone')

    return (
        <div>
            <div>
                { todoTasks.length !== 0 &&
                    <h4 onClick={ () => rollUpTodoTasksDiv() }
                        style={ { cursor: 'pointer' } }>
                        To do ({ todoTasks.length })
                    </h4>
                }
                <div ref={ todoTasksDiv }>
                    {
                        todoTasks.map((task) =>
                            <Task
                                key={ task.id }
                                { ...task }
                                checkTask={ checkTask }
                                removeTask={ removeTask }
                            />
                        )
                    }
                </div>
            </div>
            <div>
                { doneTasks.length !== 0 &&
                    <h4 onClick={ () => rollUpDoneTasksDiv() }
                        style={ { cursor: 'pointer' } }>
                        Complited ({ doneTasks.length })
                    </h4>
                }
                <div ref={ doneTasksDiv }>{
                    doneTasks.map((task) =>
                        <Task
                            key={ task.id }
                            { ...task }
                            checkTask={ checkTask }
                            removeTask={ removeTask }
                        />
                    )
                }</div>
            </div>
        </div>
    )
}

export default Tasks