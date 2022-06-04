import { ListType, ModeProps } from '../../../global/Types'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import styled from 'styled-components'
import { theme } from '../../../theme/theme'
import ButtonDiv from '../../UI/button/Button'

const ButtonStyled = styled.button<ModeProps>`
  color: ${({ mode }) => theme[mode].text};
  :hover {
    color: ${({ mode }) => theme[mode].textHover};
  }
`

type Props = {
  lists: ListType[]
  removeList: (id: number) => void
  setIdOfDisplayList: (newID: number) => void
}

const Lists: FC<Props> = function ({ lists, removeList, setIdOfDisplayList }) {
  const { mode } = useContext(ThemeContext)

  return (
    <div className='d-flex flex-column'>
      {lists.map((list) => (
        <div key={list.id} className='d-flex justify-content-between mb-2'>
          <ButtonStyled
            mode={mode}
            className='btn btn-link link-light p-0'
            onClick={() => setIdOfDisplayList(list.id)}
            style={{
              userSelect: 'none',
              wordBreak: 'break-all',
            }}
          >
            {list.name}
          </ButtonStyled>

          <div className='ms-1'>
            <ButtonDiv
              name='x'
              color='outline-danger'
              onClick={() => removeList(list.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Lists
