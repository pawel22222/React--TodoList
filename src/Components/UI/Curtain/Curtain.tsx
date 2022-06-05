import { FC } from 'react'
import styled from 'styled-components'

const CurtainDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000a0;
  z-index: 10;
`

type Props = {
  setIsEditing: (isEditing: boolean) => void
}

const Curtain: FC<Props> = function ({ setIsEditing }) {
  return <CurtainDiv onClick={() => setIsEditing(false)} />
}

export default Curtain
