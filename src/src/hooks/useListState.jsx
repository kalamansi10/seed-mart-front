import { useState } from 'react'

export default function useListState() {
  const [list, setList] = useState()

  function get(id) {
    return list ? list.find(item => item.id == id) : null
  }

  function update(id, newValue, key) {
    setList(prev => {
      return prev.map(item => (item.id === id ? { ...item, [key]: newValue } : item))
    })
  }
  
  function remove(id) {
    setList(prev => prev.filter(item => item.id != id))
  }

  function removeMany(idList) {
    setList(prev => prev.filter(item => !idList.includes(item.id)))
  }

  return { list, setList, get, update, remove, removeMany }
}
