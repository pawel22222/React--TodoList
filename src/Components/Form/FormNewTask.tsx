import { FC, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ModeProps } from '../../global/Types'
import { theme } from '../../theme/theme'
import { ThemeContext } from '../../context/ThemeContext'

import Button from '../UI/button/Button'
import Curtain from '../UI/Curtain/Curtain'

const Container = styled.div<ModeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  z-index: 20;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: ${({ mode }) => theme[mode].bg1};
  border-top: 2px solid gray;
`

const ButtonOpenForm = styled.button<ModeProps>`
  background-color: ${({ mode }) => theme[mode].bg1};
  border: 2px solid gray;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  position: relative;
  top: -50px;
  font-size: 30px;
  color: white;
`

type Props = {
  inputValueNewTask: string
  placeholderTask: string
  setInputValueNewTask: (inputValueNewTask: string) => void
  handlerAddTask: () => void
}

const FormNewTask: FC<Props> = ({
  inputValueNewTask,
  setInputValueNewTask,
  handlerAddTask,
  placeholderTask,
}) => {
  const { mode } = useContext(ThemeContext)
  const [isAddingTask, setIsAddingTask] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    isAddingTask && inputRef.current?.focus()
  }, [isAddingTask])

  function helperAddTask() {
    handlerAddTask()
    setIsAddingTask(false)
  }

  return (
    <>
      {isAddingTask ? (
        <>
          <Curtain setIsEditing={setIsAddingTask} />

          <Container mode={mode}>
            <input
              ref={inputRef}
              type='text'
              placeholder={placeholderTask}
              className={'form-control me-1'}
              value={inputValueNewTask}
              onKeyDown={(e) => e.key === 'Enter' && helperAddTask()}
              onChange={(e) => setInputValueNewTask(e.target.value)}
            />

            <Button
              style={{ margin: '5px' }}
              name='Save'
              color='outline-success'
              onClick={() => helperAddTask()}
            />
          </Container>
        </>
      ) : (
        <Container mode={mode}>
          <ButtonOpenForm onClick={() => setIsAddingTask(true)} mode={mode}>
            +
          </ButtonOpenForm>
        </Container>
      )}
    </>
  )
}
export default FormNewTask
