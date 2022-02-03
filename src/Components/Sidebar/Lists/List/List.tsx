import { FC, useContext } from 'react'
import styled from 'styled-components'
import ButtonDiv from '../../../UI/button/Button'

import { theme } from '../../../../theme/theme'
import { ThemeContext } from '../../../../context/ThemeContext'
import { ModeProps } from '../../../../global/Types'

const ButtonStyled = styled.button<ModeProps>`
    color: ${({ mode }) => theme[mode].text};
    :hover{
        color: ${({ mode }) => theme[mode].textHover};
    }
`

type Props = {
    id: number,
    name: string,
    removeList: (id: number) => void,
    setIdOfDisplayList: (newID: number) => void
}

const List: FC<Props> = function ({
    id,
    name,
    removeList,
    setIdOfDisplayList
}) {
    const { mode } = useContext(ThemeContext)

    return (
        <div className="d-flex justify-content-between mb-2">
            <ButtonStyled
                mode={mode}
                className="btn btn-link link-light p-0"
                onClick={() => setIdOfDisplayList(id)}
                style={{
                    userSelect: "none",
                    wordBreak: 'break-all'
                }}
            >
                {name}
            </ButtonStyled>
            <div className="ms-1">
                <ButtonDiv
                    name="x"
                    color="outline-danger"
                    onClick={() => removeList(id)}
                />
            </div>
        </div>
    )
}

export default List