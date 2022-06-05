import { useState, useEffect, useRef, useContext, FC } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../theme/theme'
import { ThemeContext } from '../../../../context/ThemeContext'

import Button from '../../../UI/button/Button'
import Curtain from '../../../UI/Curtain/Curtain'
import { ModeProps } from '../../../../global/Types'

// Styled components
const EditTaskDiv = styled.div<ModeProps>`
  position: relative;
  top: -25%;
  background-color: ${({ mode }) => theme[mode].bg2};
  border: 1px solid ${({ mode }) => theme[mode].border};
  z-index: 20;
  width: 95vw;
  max-width: 700px;
`
const Textarea = styled.textarea`
  background-color: transparent;
  color: white;
  resize: none;
  overflow-y: auto;
  width: 100%;
  margin: 5px;
`

type Props = {
  id: number
  name: string
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  editTask: (id: number, text: string) => void
}

const FormEditTask: FC<Props> = function ({
  id,
  name,
  isEditing,
  setIsEditing,
  editTask,
}) {
  const { mode } = useContext(ThemeContext)
  const [inputEdit, setInputEdit] = useState(name)

  const handlerSaveEdit = () => {
    editTask(id, inputEdit)
    setIsEditing(false)
  }

  const spanEditable = useRef<HTMLTextAreaElement>(null)

  useEffect(() => spanEditable.current?.focus(), [isEditing])

  return (
    <>
      <Curtain setIsEditing={setIsEditing} />

      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <EditTaskDiv
          mode={mode}
          className='d-flex flex-column p-1'
          onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
        >
          <header className={'d-flex justify-content-between mb-1 '}>
            <h4 className='me-2 my-auto'>Edit task </h4>

            <div>
              <Button
                onClick={() => setIsEditing(false)}
                name='x'
                color='outline-danger'
              />
            </div>
          </header>

          <div
            className='d-flex'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Textarea
              ref={spanEditable}
              rows={1}
              maxLength={500}
              onChange={(e) => setInputEdit(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlerSaveEdit()}
              onFocus={(e) => {
                const textLen =
                  typeof spanEditable.current?.innerHTML.length === 'number'
                    ? spanEditable.current?.innerHTML.length
                    : 0
                spanEditable.current?.setSelectionRange(textLen, textLen)

                e.target.style.height = e.target.scrollHeight + 2 + 'px'
              }}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = '28px'
                e.target.style.height = e.target.scrollHeight + 2 + 'px'
              }}
            >
              {inputEdit}
            </Textarea>
            <div className='d-flex align-items-center'>
              <Button
                name='save'
                color='outline-success'
                onClick={() => handlerSaveEdit()}
              />
            </div>
          </div>
        </EditTaskDiv>
      </div>
    </>
  )
}

export default FormEditTask
