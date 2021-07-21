import styles from './ButtonLink.module.css'

const ButtonLink = function ({ name, color, onClick }) {
    return (
        <button
            className={ `btn  btn-link link-${color} ${styles.buttonLink}` }
            onClick={ onClick }
        >
            { name }
        </button>
    )
}

export default ButtonLink