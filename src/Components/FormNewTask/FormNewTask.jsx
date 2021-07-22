import { useState } from 'react'
import ButtonAddTask from '../UI/ButtonMain/ButtonMain'


const FormNewTask = function ({ addTask }) {
    const [nameNewTask, setNameNewTask] = useState('')

    const handlerAddTask = () => {
        addTask(nameNewTask)
        setNameNewTask('')
    }

    return (
        <div className="form-group d-flex mb-3" >
            <input
                type="text"
                placeholder="new task.."
                className={ `form-control ` }
                value={ nameNewTask }
                onKeyDown={ (e) => e.key === 'Enter' && handlerAddTask() }
                onChange={ (e) => setNameNewTask(e.target.value) }
            />

            <ButtonAddTask
                name="+"
                color="outline-success"
                onClick={ () => handlerAddTask() }
            />
        </div>
    )
}

export default FormNewTask