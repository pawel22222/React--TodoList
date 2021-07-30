import { useState, useRef } from 'react'
import styles from './Task.module.css'
import ButtonTask from '../../UI/ButtonMain/ButtonMain'
import FormEditTask from './FormEditTask/FormEditTask'

const Task = function ({ id, name, isChecked, checkTask, editTask, removeTask }) {
    // const formEditTaskDiv = useRef(null)
    const [isEditing, setIsEditing] = useState(false)

    const openEditForm = () => {
        setIsEditing(true)
    }

    return (
        < >
            {
                (isEditing)
                && <div
                    // ref={ formEditTaskDiv }
                    className={ `${styles.formEditTaskDiv}` }>
                    <FormEditTask
                        id={ id }
                        name={ name }
                        setIsEditing={ setIsEditing }
                        editTask={ editTask }
                    />
                </div>
            }
            <div className="taskDiv d-flex justify-content-between align-items-center ">
                <div
                    className={ "form-check w-100 h-100 py-2" }
                    style={ { cursor: 'pointer' } }
                    onClick={ () => checkTask(id) } >
                    <input
                        className="form-check-input"
                        style={ { cursor: 'pointer' } }
                        type="checkbox"
                        value="zrobic zakupy"
                        checked={ isChecked }
                        onChange={ () => checkTask(id) }
                    />
                    <label
                        className={ `form-check-label ${(isChecked === true) ? "isChecked" : ""}` }
                        style={ { userSelect: "none", cursor: 'pointer' } }
                        onClick={ () => checkTask(id) }
                        htmlFor="flexCheckChecked">
                        { name }
                    </label>
                </div>
                <ButtonTask
                    name="/"
                    color="outline-warning"
                    onClick={ () => openEditForm() }
                />
                <span className="pe-1"></span>
                <ButtonTask
                    name="X"
                    color="outline-danger"
                    onClick={ () => removeTask(id) }
                />
            </div>
        </>
    )
}

export default Task