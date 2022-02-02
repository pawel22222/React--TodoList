import List from './List/List'
import { ListType } from '../../../global/Types';
import { FC } from 'react';

type ListsProps = {
    lists: ListType[],
    removeList: (id: number) => void,
    setIdOfDisplayList: (newID: number) => void
}

const Lists: FC<ListsProps> = function ({ lists, removeList, setIdOfDisplayList }) {

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