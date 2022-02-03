import List from './List/List'
import { ListType } from '../../../global/Types';
import { FC } from 'react';

type Props = {
    lists: ListType[],
    removeList: (id: number) => void,
    setIdOfDisplayList: (newID: number) => void
}

const Lists: FC<Props> = function ({ lists, removeList, setIdOfDisplayList }) {

    return (
        <div className="d-flex flex-column">
            {
                lists.map((list) => {
                    return <List
                        key={list.id}
                        {...list}
                        removeList={removeList}
                        setIdOfDisplayList={setIdOfDisplayList}
                    />
                }
                )
            }
        </div>
    )
}

export default Lists