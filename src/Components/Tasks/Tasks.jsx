import Task from './Task/Task'

const Tasks = function ({ tasks, checkTask }) {

    return (
        <div className="m-2 ">
            {
                tasks.map((task) =>
                    <Task
                        key={ task.id }
                        { ...task }
                        checkTask={ checkTask }
                    />
                )
            }
        </div>
    )
}

export default Tasks