import { FC } from 'react'

type Props = {
  nameNewItem: string
  setNameNewItem: (e: string) => void
  handlerAddItem: () => void
  placeholderItem: string
  maxLength?: number
}

const Input: FC<Props> = function ({
  nameNewItem,
  setNameNewItem,
  handlerAddItem,
  placeholderItem,
  maxLength,
}) {
  return (
    <input
      type='text'
      placeholder={placeholderItem}
      className={'form-control me-1'}
      value={nameNewItem}
      onKeyDown={(e) => e.key === 'Enter' && handlerAddItem()}
      onChange={(e) => setNameNewItem(e.target.value)}
      maxLength={maxLength}
    />
  )
}

export default Input
