import styles from './ButtonMain.module.css'

const ButtonMain = function ({ name, color, onClick }) {
    return (
        <button
            className={ ` ms-1 btn  btn-${color} ${styles.buttonLink} ` }
            onClick={ onClick }
        >
            { name }
        </button>
    )
}

export default ButtonMain