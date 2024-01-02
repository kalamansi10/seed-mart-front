import { useState, useEffect } from "react"

function useItemsProps() {
  const [list, setList] = useState()

  useEffect(() => {
    if (localStorage.getItem('itemsProps')) {
      setList(JSON.parse(localStorage.getItem('itemsProps')))
    } else {
      fetch('/api/v1/items-properties')
        .then(response => response.json())
        .then(data => setList(data))
        .then(storeLocalItemsProps)
    } 
  }, [])

  function storeLocalItemsProps() {
    localStorage.setItem('itemsProps', JSON.stringify(list))
  }

  function getCategories() {
    return Object.keys(list)
  }

  return { list, getCategories }
}

export default useItemsProps
