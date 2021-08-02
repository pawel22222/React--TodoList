import { useState, useRef, useEffect } from 'react'
import styles from './Sidebar.module.css'

import ButtonSlideSidebar from '../UI/ButtonMain/ButtonMain'
import FormNewList from '../Form/FormNewItem'
import Lists from './Lists/Lists'

const Sidebar = function ({ lists, setLists, displayTasksOfList, setDisplayTasksOfList }) {
    const sidebarDiv = useRef(null)
    const toggleSidebar = () => sidebarDiv.current.classList.toggle('slide')

    const [inputValueNewList, setInputValueNewList] = useState('')

    // Info: State tylko po to aby useEffect wykonał się po wywołaniu funkcji handlerAddList
    const [useEffectAssistant, setUseEffectAssistant] = useState(1)

    useEffect(() => setDisplayTasksOfList(lists[0].id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [useEffectAssistant])

    const addList = (nameNewList) => {
        nameNewList = nameNewList.replace(/[^a-ż0-9 ~`!@#$%^&*()_+{}|:"<>?\-=[\]\\;',./]/gi, '').trim()
        if (nameNewList) {
            setLists([{
                id: Math.random(),
                name: nameNewList,
                tasks: []
            }, ...lists])
            toggleSidebar()
        }
    }

    const handlerAddList = () => {
        addList(inputValueNewList)
        setInputValueNewList('')
        setUseEffectAssistant(useEffectAssistant + 1)
    }

    const removeList = (id) => {
        if (lists.length <= 1) alert('the last list cannot be deleted')
        else if (id === displayTasksOfList) {
            (lists[0].id === id)
                ? setDisplayTasksOfList(lists[1].id)
                : setDisplayTasksOfList(lists[0].id)
            // setUseEffectAssistant(useEffectAssistant + 1)
            setLists(lists.filter((list) => list.id !== id))
        }
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
            <aside
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
                    placeholderItem="New list.."
                />
                <Lists
                    lists={ lists }
                    removeList={ removeList }
                    setDisplayTasksOfList={ setDisplayTasksOfList }
                />
            </aside>
        </>
    )
}

export default Sidebar