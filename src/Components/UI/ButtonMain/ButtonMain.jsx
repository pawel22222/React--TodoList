import styles from './ButtonMain.module.css'

const ButtonMain = function ({ name, color, onClick }) {
    return (
        <button
            className={ `btn  btn-${color} ${styles.buttonMain} btn-sm` }
            onClick={ onClick }
        >
            { name }
        </button>
    )
}

export default ButtonMain