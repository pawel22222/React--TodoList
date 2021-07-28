import { useState, useRef, useEffect } from 'react'
import styles from './Sidebar.module.css'

import ButtonSlideSidebar from '../UI/ButtonMain/ButtonMain'
import FormNewList from '../Form/FormNewItem'
import Lists from './Lists/Lists'

const Sidebar = function ({ lists, setLists, displayTasksOfList, setDisplayTasksOfList }) {

    const sidebarDiv = useRef(null)
    const toggleSidebar = () => sidebarDiv.current.classList.toggle('slide')

    const [inputValueNewList, setInputValueNewList] = useState('')

    // ? State tylko po to by useEffect wykonał się po wywołaniu funkcji handlerAddList
    const [useEffectAssistant, setUseEffectAssistant] = useState(1)

    useEffect(() => setDisplayTasksOfList(lists[0].id)
        , [useEffectAssistant])

    const addList = (nameNewList) => {
        setLists([{
            id: Math.random(),
            name: nameNewList,
            tasks: []
        }, ...lists])
    }

    const handlerAddList = () => {
        if (inputValueNewList) {
            addList(inputValueNewList)
            setInputValueNewList('')
            setUseEffectAssistant(useEffectAssistant + 1)
        }
    }

    const removeList = (id) => {
        if (lists.length <= 1) console.log('nie mozna usunac ostatniej listy')
        else if (id === displayTasksOfList) console.log('nie można usunąć bierżącej listy')
        else setLists(lists.filter((list) => list.id !== id))
    }

    return (
        <>
            <div className={ `${styles.hamburgerDiv} m-2` }>
                <ButtonSlideSidebar
                    name="="
                    color="primary"
                    onClick={ toggleSidebar }
                />
            </div>
            <nav
                ref={ sidebarDiv }
                className={ `${styles.sidebarDiv} p-2` }
            >
                <header className={ `m-1 pt-2 ` }>
                    <h4 className="text-center">My lists</h4>
                </header>
                <FormNewList
                    inputValueNewItem={ inputValueNewList }
                    setInputValueNewItem={ setInputValueNewList }
                    handlerAddItem={ handlerAddList }
                    placeholderItem="new list"
                />
                <Lists
                    lists={ lists }
                    removeList={ removeList }
                    setDisplayTasksOfList={ setDisplayTasksOfList }
                />
            </nav>
        </>
    )
}

export default Sidebar