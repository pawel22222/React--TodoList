import { FC } from 'react'
import styled, { css } from 'styled-components'
import { alert } from '../../../theme/theme'

const AlertDiv = styled.div`
  position: absolute;
  z-index: 10;
  top: 10px;
  margin: 0 auto;
  overflow: hidden;
  min-width: 50%;
  min-height: 50px;
  padding: 10px;
  background-color: #ffffff;
  color: #838383;
  border: 1px solid #838383;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  align-items: center;

  @keyframes example {
    from {
      left: -100%;
    }
    to {
      left: 0;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e6e6e6;
    opacity: 0.5;
    z-index: 1;
    animation-name: example;
    animation-duration: 5s;
    animation-timing-function: linear;
  }
  ${({ color }) =>
    color === 'danger' &&
    css`
      background-color: ${alert.danger.bg1};
      color: ${alert.danger.primary};
      border: 1px solid ${alert.danger.primary};
      &:before {
        background-color: ${alert.danger.bg2};
      }
    `}
  ${({ color }) =>
    color === 'warning' &&
    css`
      background-color: ${alert.warning.bg1};
      color: ${alert.warning.primary};
      border: 1px solid ${alert.warning.primary};
      &:before {
        background-color: ${alert.warning.bg2};
      }
    `}
`
const Button = styled.button`
  z-index: 100;
  margin-right: 5px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0);
  ${({ color }) =>
    color === 'danger' &&
    css`
      color: ${alert.danger.primary};
      border: 1px solid ${alert.danger.primary};
    `}

  ${({ color }) =>
    color === 'warning' &&
    css`
      color: ${alert.warning.primary};
      border: 4px solid ${alert.warning.primary};
    `}
`

type Props = {
  type: string
  error: string
  removeError: () => void
}

const Alert: FC<Props> = ({ type, error, removeError }) => {
  return (
    <AlertDiv color={type}>
      <Button color={type} onClick={removeError}>
        X
      </Button>
      {error}
    </AlertDiv>
  )
}

export default Alert
