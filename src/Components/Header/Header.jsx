import { useState } from 'react'
import styles from './Header.module.css'
import FormNewTask from '../Form/FormNewItem'
import RemoveAllTask from '../UI/ButtonMain/ButtonMain'

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
                <h1
                    className={ `${styles.h1}` }
                    style={ { wordBreak: 'break-all' } }
                >
                    { lists.find((list) => list.id === displayTasksOfList).name }
                </h1>
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