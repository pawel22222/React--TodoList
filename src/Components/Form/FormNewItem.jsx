import ButtonAddItem from '../UI/ButtonMain/ButtonMain'
import InputAddItem from '../UI/InputMain/InputMain'

const FormNewItem = function ({ inputValueNewItem, setInputValueNewItem, handlerAddItem, placeholderItem }) {

    return (
        <div className="form-group d-flex mb-2" >
            <InputAddItem
                nameNewItem={ inputValueNewItem }
                setNameNewItem={ setInputValueNewItem }
                handlerAddItem={ handlerAddItem }
                placeholderItem={ placeholderItem }
            />
            <ButtonAddItem
                style={ { margin: '5px' } }
                name="+"
                color="outline-success"
                onClick={ () => handlerAddItem() }
            />
        </div>
    )
}

export default FormNewItem