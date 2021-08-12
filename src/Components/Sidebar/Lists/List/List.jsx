import { useContext } from 'react'
import styled from 'styled-components'
import Button from '../../../UI/ButtonMain/ButtonMain'


import { theme } from '../../../../theme/theme'
import { ThemeContext } from '../../../../context/ThemeContext'

const ButtonStyled = styled.button`
    color: ${({ mode }) => theme[mode].text};
    :hover{
        color: ${({ mode }) => theme[mode].textHover};
    }

`

const List = function ({ id, name, removeList, setDisplayTasksOfList }) {
    const { mode } = useContext(ThemeContext)

    return (
        <div className="d-flex justify-content-between mb-2">
            <ButtonStyled
                mode={ mode }
                className="btn btn-link link-light p-0"
                onClick={ () => setDisplayTasksOfList(id) }
                style={ {
                    userSelect: "none",
                    wordBreak: 'break-all'
                } }
            >
                { name }
            </ButtonStyled>
            <div className="ms-1">
                <Button
                    name="x"
                    color="outline-danger"
                    onClick={ () => removeList(id) }
                />
            </div>
        </div>
    )
}

export default List