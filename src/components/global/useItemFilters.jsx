function useItemFilters() {
  const itemFilters = localStorage.getItem('itemfFilters')

  if (itemFilters) {
    return itemFilters
  } else {
    fetch('/api/v1/set-filters')
    .then(response => response.json())
    .then(data => localStorage.setItem('itemfFilters', JSON.stringify(data)))
  }

  return itemFilters
}

export default useItemFilters
