import { useState, useEffect, useContext, FC } from 'react'
import styled from 'styled-components'
// Components
import FormNewList from '../Form/FormNewItem'
import Lists from './Lists/Lists'

import { ModeProps } from '../../global/Types'
import { theme } from '../../theme/theme'
import { ThemeContext } from '../../context/ThemeContext'
import { DataContext } from '../../context/DataContext'
import Alert from '../UI/alert/Alert'

// #region Styled components
const NavDiv = styled.nav<ModeProps>`
  background-color: ${({ mode }) => theme[mode].bg2};
  border-bottom: 1px solid ${({ mode }) => theme[mode].border};
  overflow: auto;
  width: 100%;
`
// #endregion

type Props = {
  idOfDisplayList: number
  setIdOfDisplayList: (newID: number) => void
}

const Nav: FC<Props> = function ({ idOfDisplayList, setIdOfDisplayList }) {
  const { mode } = useContext(ThemeContext)
  const { lists, setLists } = useContext(DataContext)

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
        ...lists,
        {
          id: Math.random(),
          name: nameNewList,
          tasks: [],
        },
      ])
    }
  }

  const handlerAddList = () => {
    addList(inputValueNewList)
    setInputValueNewList('')
    setUseEffectAssistant(useEffectAssistant + 1)
  }

  const removeList = (id: number) => {
    if (lists.length <= 1 && !error) {
      setError('The last list cannot be deleted')
      setTimeout(() => {
        setError('')
      }, 5000)
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

      <NavDiv mode={mode} className='p-2'>
        <FormNewList
          inputValueNewItem={inputValueNewList}
          setInputValueNewItem={setInputValueNewList}
          handlerAddItem={handlerAddList}
          placeholderItem='New list..'
        />

        <Lists
          removeList={removeList}
          setIdOfDisplayList={setIdOfDisplayList}
        />
      </NavDiv>
    </>
  )
}

export default Nav
