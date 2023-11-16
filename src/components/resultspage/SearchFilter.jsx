import React from 'react'
import filterModule from '../general/filterModule'

export default function SearchFilter({ keyword, queryString, setQueryString }) {
  const url = new URLSearchParams(queryString)


  function mapFilters() {
    return Object.keys(filterModule).map(filter =>
      <section key={filter}>
        <h4>{mapFilterLabel(filter)}</h4>
        <div className='filter-group flex-column flex-wrap'>
          {mapOptions(filter)}
        </div>
      </section>
    )
  }

  function mapFilterLabel(filter) {
    result = ''
    filter.split('_').forEach(word => {
      result = result + word.charAt(0).toUpperCase() + word.slice(1) + ' '
    })
    return result.slice(0, -1)
  }

  function mapOptions(filter) {
    let name = `filter[${filter}]`
    return filterModule[filter].map(option =>
      <span key={option}>
        <input type='checkbox' name={name} id={option} onClick={applyFilter} value={option} />
        <label htmlFor={option}> {option}</label>
      </span>
    )
  }

  function applyFilter(e) {
    url.delete(e.target.name)
    if (e.target.checked == true) {
      clearGroup(e.target.name)
      e.target.checked = true
      url.append(e.target.name, e.target.value)
    }
    setQueryString('?' + url.toString())
  }

  function clearGroup(name) {
    document.getElementsByName(`${name}`).forEach(option => {
      option.checked = false
    })
  }

  function applyPriceFilter(e) {
    e.preventDefault()
    document.querySelectorAll('.price-input').forEach(filter => {
      url.delete(filter.name)
      if (filter.value != '') { url.append(filter.name, filter.value) }
    })
    setQueryString('?' + url.toString())
  }

  return (
    <div className='filters-section'>
      <form className='price-filter'>
        <div className='flex-row justify-center'>
          <input className='price-input' type='number' name='minimum' placeholder='min' />
          &nbsp;-&nbsp;
          <input className='price-input' type='number' name='maximum' placeholder='max' />
        </div>
        <br />
        <button onClick={applyPriceFilter}>Apply</button>
      </form>
      {mapFilters()}
    </div>)
}
