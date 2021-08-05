import { useState } from 'react'
import styled from 'styled-components'
// Components
import FormNewTask from '../Form/FormNewItem'
import RemoveAllTask from '../UI/ButtonMain/ButtonMain'
// Styled components
const NameListH1 = styled.h1`
    word-break: break-all;
    @media (max-width: 768px) {
        margin-left: 40px;
    }
`

const Header = function ({ clearAllChecked, addTask, lists, displayTasksOfList }) {
    const [inputValueNewTask, setInputValueNewTask] = useState('')

    const handlerAddTask = () => {
        addTask(inputValueNewTask)
        setInputValueNewTask('')
    }

    return (
        <header>
            <div className="d-flex justify-content-between align-items-center py-2">
                <div></div>
                <NameListH1>
                    { lists.find((list) => list.id === displayTasksOfList).name }
                </NameListH1>
                <div className="ms-1">
                    <RemoveAllTask
                        name="Clear done"
                        color="outline-danger"
                        onClick={ () => clearAllChecked() }
                    />
                </div>
            </div>
            <FormNewTask
                inputValueNewItem={ inputValueNewTask }
                setInputValueNewItem={ setInputValueNewTask }
                handlerAddItem={ handlerAddTask }
                placeholderItem="New task.."
            />
        </header>
    )
}

export default Header