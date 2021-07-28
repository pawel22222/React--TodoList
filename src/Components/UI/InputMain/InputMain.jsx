const InputMain = function ({ nameNewItem, setNameNewItem, handlerAddItem, placeholderItem }) {

    return (
        <input
            type="text"
            placeholder={ placeholderItem }
            className={ `form-control me-1` }
            value={ nameNewItem }
            onKeyDown={ (e) => e.key === 'Enter' && handlerAddItem() }
            onChange={ (e) => setNameNewItem(e.target.value) }
        />
    )
}

export default InputMain