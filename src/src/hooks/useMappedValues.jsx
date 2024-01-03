import { useState } from 'react'

export default function useMappedValues() {
  const [list, setList] = useState()

  function initialize(objectList, key) {
    setList(objectList.map(object => {
      return { id: object.id, value: object[key] }
    }))
  }

  function value(id) {
    return list ? list.find(item => item.id == id).value : 0
  }

  function update(id, updatedValue) {
    if (list) {
      setList(prev => prev.map(object => {
        if (object.id == id) {
          return { id: id, value: updatedValue }
        } else {
          return object
        }
      }))
    }
  }

  return { initialize, list, value, update }
}
