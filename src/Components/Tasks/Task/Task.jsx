import { useState } from 'react'
import ButtonTask from '../../UI/ButtonMain/ButtonMain'
import FormEditTask from './FormEditTask/FormEditTask'

const Task = function ({
    id,
    name,
    isChecked,
    checkTask,
    editTask,
    removeTask
}) {
    const [isEditing, setIsEditing] = useState(false)

    const openEditForm = () => {
        setIsEditing(true)
    }
    return (
        < >
            {
                (isEditing)
                && <div>
                    <FormEditTask
                        id={ id }
                        name={ name }
                        setIsEditing={ setIsEditing }
                        editTask={ editTask }
                    />
                </div>
            }
            <div className="taskDiv d-flex">
                <div
                    className={ "form-check w-100 h-100 py-2 " }
                    style={ { cursor: 'pointer' } }
                    onClick={ () => checkTask(id) } >
                    <input
                        className="form-check-input "
                        style={ { cursor: 'pointer' } }
                        type="checkbox"
                        value="zrobic zakupy"
                        checked={ isChecked }
                        onChange={ () => checkTask(id) }
                    />
                    <label
                        className={ `form-check-label ${(isChecked === true) ? "isChecked" : ""}` }
                        style={ { userSelect: "none", cursor: 'pointer', wordBreak: 'break-all' } }
                        onClick={ () => checkTask(id) }
                        htmlFor="flexCheckChecked">
                        { name }
                    </label>

                </div>
                <div className="d-flex align-items-start pt-2">
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
            </div>
        </>
    )
}

export default Task