import ButtonRemove from '../../UI/ButtonMain/ButtonMain'

const Task = function ({ id, name, isChecked, checkTask, removeTask }) {

    return (
        < >
            <div className="taskDiv d-flex justify-content-between align-items-center ">
                <div
                    className={ "form-check w-100 h-100 py-2" }
                    style={ { cursor: 'pointer' } }
                    onClick={ () => checkTask(id) } >
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="zrobic zakupy"
                        checked={ isChecked }
                        onChange={ () => checkTask(id) }
                    />
                    <label
                        style={ { userSelect: "none" } }
                        onClick={ () => checkTask(id) }
                        className={ `form-check-label ${(isChecked === true) ? "isChecked" : ""}` }
                        htmlFor="flexCheckChecked">
                        { name }
                    </label>
                </div>
                <ButtonRemove
                    name="X"
                    color="outline-danger"
                    onClick={ () => removeTask(id) }
                />
            </div>
            <hr className="my-1" />
        </>
    )
}

export default Task