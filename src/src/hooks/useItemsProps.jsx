import { useState, useEffect } from "react"

function useItemsProps() {
  const [list, setList] = useState()

  useEffect(() => { 
    let itemProps = localStorage.getItem('itemsProps')
    if ( itemProps == 'undefined' || itemProps == null) {
      fetch('/api/v1/items-properties')
        .then(response => response.json())
        .then(data => storeLocalItemsProps(data))
    } else {
      setList(JSON.parse(localStorage.getItem('itemsProps')))
    } 
  }, [])

  function storeLocalItemsProps(data) {
    localStorage.setItem('itemsProps', JSON.stringify(data))
    setList(localStorage.getItem('itemsProps'))
  }

  function getCategories() {
    return Object.keys(list)
  }

  return { list, getCategories }
}

export default useItemsProps
