import { useState, useEffect } from "react"

function useItemsProps() {
  const [list, setList] = useState()

  useEffect(() => { 
    let itemProps = localStorage.getItem('itemsProps')
    if ( itemProps == 'undefined' || itemProps == null) {
      fetch('/api/v1/items-properties')
        .then(response => response.json())
        .then(data => setList(data))
        .then(storeLocalItemsProps)
    } else {
      setList(JSON.parse(itemProps))
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
