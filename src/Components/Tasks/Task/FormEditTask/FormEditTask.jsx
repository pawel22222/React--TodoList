import { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../theme/theme'
import { ThemeContext } from '../../../../context/ThemeContext'

import ButtonFormEdit from '../../../UI/ButtonMain/ButtonMain'

// Styled components
const EditTaskDiv = styled.div`
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 150px);
    background-color: ${({ mode }) => theme[mode].bg1};
    border: 1px solid ${({ mode }) => theme[mode].border};
    z-index: 1;
`

const FormEditTask = function ({
    id,
    name,
    isEditing,
    setIsEditing,
    editTask
}) {
    const { mode } = useContext(ThemeContext)
    const [inputEdit, setInputEdit] = useState(name)

    const handlerSaveEdit = () => {
        editTask(id, inputEdit)
        setIsEditing(false)
    }

    const input = useRef(null)
    useEffect(() => input.current.focus()
        , [isEditing])

    return (
        <EditTaskDiv
            mode={ mode }
            className="d-flex flex-column p-1"
            onKeyDown={ (e) => (e.key === 'Escape') && setIsEditing(false) }
        >
            <header className={ `d-flex justify-content-between mb-1 ` }>
                <h4 className="me-2 my-auto">Edit task </h4>
                <ButtonFormEdit
                    onClick={ () => setIsEditing(false) }
                    name="x"
                    color="outline-danger"
                />
            </header>
            <div className="d-flex">
                <input
                    ref={ input }
                    className="form-control me-1"
                    type="text"
                    value={ inputEdit }
                    onChange={ (e) => setInputEdit(e.target.value) }
                    onKeyDown={ (e) => e.key === 'Enter' && handlerSaveEdit() }
                />
                <ButtonFormEdit
                    name="save"
                    color="outline-success"
                    onClick={ () => handlerSaveEdit() }
                />
            </div>
        </EditTaskDiv>
    )
}

export default FormEditTask