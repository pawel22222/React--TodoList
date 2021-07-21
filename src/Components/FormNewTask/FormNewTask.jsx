import ButtonLink from '../UI/ButtonLink/ButtonLink'

const FormNewTask = function ({ addTask }) {

    return (
        <div className="form-group d-flex " >
            <input
                type="text"
                placeholder="new task"
                className={ `form-control` }
            />

            <ButtonLink
                name="ADD"
                color="primary"
                onClick={ addTask }
            />
        </div>
    )
}

export default FormNewTask