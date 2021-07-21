const Task = function ({ name, isChecked, checkTask }) {

    return (
        <div className="pt-2">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="zrobic zakupy"
                    checked={ isChecked }
                    onChange={ checkTask }
                />
                <label
                    className="form-check-label"
                    for="flexCheckChecked">
                    { name }
                </label>
            </div>
            <hr />
        </div>
    )
}

export default Task