function useItemsProps() {
  const itemsProps = localStorage.getItem('itemsProps')

  if (itemsProps) {
    return itemsProps
  } else {
    fetch('/api/v1/items-properties')
    .then(response => response.json())
    .then(data => localStorage.setItem('itemsProps', JSON.stringify(data)))
  }

  return itemsProps
}

export default useItemsProps
