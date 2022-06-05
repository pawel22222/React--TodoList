import { ListType, ModeProps } from '../../../global/Types'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import styled from 'styled-components'
import { theme } from '../../../theme/theme'
import Button from '../../UI/button/Button'

const ButtonStyled = styled.button<ModeProps>`
  color: ${({ mode }) => theme[mode].text};
  user-select: none;
  word-break: break-all;
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
    <div className='d-flex'>
      {lists.map((list: ListType) => (
        <div key={list.id} className='d-flex me-2'>
          <ButtonStyled
            mode={mode}
            className='btn btn-link link-light p-0 '
            onClick={() => setIdOfDisplayList(list.id)}
          >
            {list.name}
          </ButtonStyled>

          <div className='ms-1'>
            <Button
              name='x'
              color='outline-danger'
              onClick={() => removeList(list.id)}
            />
          </div>
        </div>
      ))}

      <Button
        name='+ New list'
        color='outline-primary'
        onClick={() => {
          return
        }}
      />
    </div>
  )
}

export default Lists
