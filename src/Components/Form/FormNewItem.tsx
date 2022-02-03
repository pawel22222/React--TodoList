import { FC } from 'react'
import Button from '../UI/button/Button'
import Input from '../UI/input/Input'

type Props = {
    inputValueNewItem: string,
    placeholderItem: string
    setInputValueNewItem: (inputValueNewTask: string) => void,
    handlerAddItem: () => void,
}

const FormNewItem: FC<Props> = ({
    inputValueNewItem,
    setInputValueNewItem,
    handlerAddItem,
    placeholderItem
}) => {

    return (
        <div className="form-group d-flex mb-2" >
            <Input
                nameNewItem={inputValueNewItem}
                setNameNewItem={setInputValueNewItem}
                handlerAddItem={handlerAddItem}
                placeholderItem={placeholderItem}
            />
            <Button
                style={{ margin: '5px' }}
                name="+"
                color="outline-success"
                onClick={() => handlerAddItem()}
            />
        </div>
    )
}

export default FormNewItem