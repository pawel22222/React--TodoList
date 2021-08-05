import styled from 'styled-components'
// Styled components
const Button = styled.button`
    text-decoration: none !important;
    font-weight: bold;
    :focus{ box-shadow: none; }
`

const ButtonMain = function ({ name, color, onClick }) {
    return (
        <Button
            className={ `btn  btn-${color} btn-sm  p-1 px-2` }
            onClick={ onClick }
        >
            { name }
        </Button>
    )
}

export default ButtonMain