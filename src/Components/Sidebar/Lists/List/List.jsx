import Button from '../../../UI/ButtonMain/ButtonMain'

const List = function ({ id, name, removeList, setDisplayTasksOfList }) {
    return (
        <div className="d-flex justify-content-between mb-2">
            <button
                className="btn btn-link link-light p-0"
                onClick={ () => setDisplayTasksOfList(id) }
                style={ { userSelect: "none", wordBreak: 'break-all' } }
            >
                { name }
            </button>
            <div className="ms-1">
                <Button
                    name="x"
                    color="outline-danger"
                    onClick={ () => removeList(id) }
                />
            </div>
        </div>
    )
}

export default List