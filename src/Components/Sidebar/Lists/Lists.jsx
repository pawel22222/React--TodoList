import List from './List/List'

const Lists = function ({ lists, removeList, setDisplayTasksOfList }) {

    return (
        <div className="d-flex flex-column">
            {
                lists.map((list) => {
                    return <List
                        key={ list.id }
                        { ...list }
                        removeList={ removeList }
                        setDisplayTasksOfList={ setDisplayTasksOfList }
                    />
                }
                ) }

        </div>
    )
}

export default Lists