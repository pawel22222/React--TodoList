import { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
// Components
import ButtonSlideSidebar from '../UI/ButtonMain/ButtonMain'
import FormNewList from '../Form/FormNewItem'
import Lists from './Lists/Lists'

import { theme } from '../../theme/theme'
import { ThemeContext } from '../../context/ThemeContext'

//#region Styled components
const HamburgerDiv = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        @media (max-width: 768px) {
          top: 12px;
        }
    `
const Aside = styled.aside`
        background-color: ${({ mode }) => theme[mode].bg2};
        border-right: 1px solid ${({ mode }) => theme[mode].border};
        min-height: 100vh;
        max-height: 100vh;
        overflow: auto;
        width: 250px;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(-250px);
        z-index: 1;
        transition: transform .2s ease-in-out;
    `
// #endregion

const Sidebar = function (
  { lists,
    setLists,
    displayTasksOfList,
    setDisplayTasksOfList }) {

  const { mode } = useContext(ThemeContext)


  const aside = useRef(null)
  const toggleSidebar = () => aside.current.classList.toggle('slide')

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
      <HamburgerDiv className="m-2">
        <ButtonSlideSidebar
          name="="
          color="primary"
          onClick={ toggleSidebar }
        />
      </HamburgerDiv>
      <Aside
        mode={ mode }
        ref={ aside }
        className="p-2"
      >
        <header className="m-1 pt-2">
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
      </Aside>
    </>
  )
}

export default Sidebar