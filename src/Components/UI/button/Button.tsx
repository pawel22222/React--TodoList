import { FC } from 'react';
import styled from 'styled-components'

// Styled components
const StyledButton = styled.button`
    text-decoration: none !important;
    font-weight: bold;
    :focus{ box-shadow: none; }
`
type Props = {
    name: string,
    color: string,
    onClick: () => void,
    style?: {}
}

const Button: FC<Props> = ({ name, color, onClick }) => {
    return (
        <StyledButton
            className={`btn  btn-${color} btn-sm  p-1 px-2`}
            onClick={onClick}
        >
            {name}
        </StyledButton>
    )
}

export default Button