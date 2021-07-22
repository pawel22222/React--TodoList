import Task from './Task/Task'

const Tasks = function ({ tasks, checkTask, removeTask }) {

    return (
        <div className=" ">
            {
                tasks.map((task) =>
                    <Task
                        key={ task.id }
                        { ...task }
                        checkTask={ checkTask }
                        removeTask={ removeTask }
                    />
                ) }
        </div>
    )
}

export default Tasks