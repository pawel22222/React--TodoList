import styles from './ButtonMain.module.css'

const ButtonMain = function ({ name, color, onClick }) {
    return (
        <button
            className={ `btn  btn-${color} ${styles.buttonMain} btn-sm m-1 p-1 px-2` }
            onClick={ onClick }
        >
            { name }
        </button>
    )
}

export default ButtonMain