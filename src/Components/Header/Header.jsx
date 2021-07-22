import ViewTools from './ViewTools/ViewTools'

const Header = function () {
    return (
        <header className="d-flex justify-content-between" >
            <h1>Todo List</h1>
            <ViewTools />
        </header>
    )
}

export default Header