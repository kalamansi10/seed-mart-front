import { useState } from 'react'

export default function useListState() {
  const [list, setList] = useState()

  function get(id) {
    return list ? list.find(item => item.id == id) : null
  }

  function update(id, newValue, key) {
    const updatedItem = get(id)
    if (list) {
      updatedItem[key] = newValue
      setList(prev => prev.map(item => {
        if (item.id == id) {
          return updatedItem
        } else {
          return item
        }
      }))
    }
  }

  return { list, setList, get, update }
}
