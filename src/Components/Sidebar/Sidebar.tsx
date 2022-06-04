import { useState, useRef, useEffect, useContext, FC } from 'react'
import styled from 'styled-components'
// Components
import ButtonSlideSidebar from '../UI/button/Button'
import FormNewList from '../Form/FormNewItem'
import Lists from './Lists/Lists'

import { ListType, ModeProps } from '../../global/Types'
import { theme } from '../../theme/theme'
import { ThemeContext } from '../../context/ThemeContext'
import Alert from '../UI/alert/Alert'

// #region Styled components
const HamburgerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  top: 12px;
  transition: transform 0.2s;
  @media (min-width: 1200px) {
    display: none;
  }
`
const Aside = styled.aside<ModeProps>`
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
  transition: transform 0.2s ease-in-out;
  @media (min-width: 1200px) {
    transform: translateX(0);
  }
`
const Header = styled.header`
  padding: 10px 0;
`
// #endregion

type Props = {
  lists: ListType[]
  idOfDisplayList: number
  setLists: (newLists: ListType[]) => void
  setIdOfDisplayList: (newID: number) => void
}

const Sidebar: FC<Props> = function ({
  lists,
  setLists,
  idOfDisplayList,
  setIdOfDisplayList,
}) {
  const { mode } = useContext(ThemeContext)

  const burgerRef = useRef<HTMLDivElement>(null)
  const aside = useRef<HTMLDivElement>(null)

  const toggleSidebar = () => {
    aside.current?.classList.toggle('slide')
    burgerRef.current?.classList.toggle('rotate180')
  }

  const [inputValueNewList, setInputValueNewList] = useState('')

  const [useEffectAssistant, setUseEffectAssistant] = useState(1)
  const [error, setError] = useState('')

  const removeError = () => {
    setError('')
  }

  useEffect(() => {
    setIdOfDisplayList(lists[0].id)
  }, [useEffectAssistant])

  const addList = (nameNewList: string) => {
    nameNewList = nameNewList
      .replace(/[^a-ż0-9 ~`!@#$%^&*()_+{}|:"<>?\-=[\]\\;',./]/gi, '')
      .trim()

    if (nameNewList) {
      setLists([
        {
          id: Math.random(),
          name: nameNewList,
          tasks: [],
        },
        ...lists,
      ])
      toggleSidebar()
    }
  }

  const handlerAddList = () => {
    addList(inputValueNewList)
    setInputValueNewList('')
    setUseEffectAssistant(useEffectAssistant + 1)
  }

  const removeList = (id: number) => {
    if (lists.length <= 1) {
      setError('The last list cannot be deleted')
    } else if (id === idOfDisplayList) {
      lists[0].id === id
        ? setIdOfDisplayList(lists[1].id)
        : setIdOfDisplayList(lists[0].id)
      setUseEffectAssistant(useEffectAssistant + 1)
      setLists(lists.filter((list) => list.id !== id))
    } else setLists(lists.filter((list) => list.id !== id))
  }

  return (
    <>
      {error && <Alert type='danger' error={error} removeError={removeError} />}

      <Aside mode={mode} ref={aside} className='p-2'>
        <Header className='m-1 pt-2'>
          <h4 className='text-center'>My lists</h4>
        </Header>

        <FormNewList
          inputValueNewItem={inputValueNewList}
          setInputValueNewItem={setInputValueNewList}
          handlerAddItem={handlerAddList}
          placeholderItem='New list..'
        />

        <Lists
          lists={lists}
          removeList={removeList}
          setIdOfDisplayList={setIdOfDisplayList}
        />
      </Aside>

      <HamburgerDiv className='m-2' ref={burgerRef}>
        <ButtonSlideSidebar name='>' color='primary' onClick={toggleSidebar} />
      </HamburgerDiv>
    </>
  )
}

export default Sidebar
