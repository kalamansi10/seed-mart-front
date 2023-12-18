import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import useItemsProps from '../hooks/useItemsProps'
import useInput from "../hooks/useInput"
import './resultspage.css'

export default function SearchFilter({ setSearchAPI }) {
  const minPrice = useInput()
  const maxPrice = useInput()
  const properties = JSON.parse(useItemsProps())
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    setSearchAPI('/api/v1/search?' + searchParams.toString())
  }, [searchParams])

  function mapFilters() {
    return Object.keys(properties).map(filter =>
      <section key={filter}>
        <h4>{mapFilterLabel(filter)}</h4>
        <div className='filter-group flex-column flex-wrap'>
          {mapOptions(filter)}
        </div>
      </section>
    )
  }

  function mapFilterLabel(filter) {
    let result = ''
    filter.split('_').forEach(word => {
      result = result + word.charAt(0).toUpperCase() + word.slice(1) + ' '
    })
    return result.slice(0, -1)
  }

  function mapOptions(filter) {
    let name = `filter[${filter}]`
    return properties[filter].map(option =>
      <span key={option}>
        <input type='checkbox' 
          name={name} 
          id={option} 
          onChange={applyFilter} 
          value={option}
          checked={searchParams.get(name) == option}
        />
        <label htmlFor={option}>&nbsp;&nbsp;{option}</label>
      </span>
    )
  }

  function applyFilter(e) {
    searchParams.delete(e.target.name)
    if (e.target.checked == true) {
      clearGroup(e.target.name)
      searchParams.append(e.target.name, e.target.value)
    }
    navigate('/results?' + searchParams.toString())
  }

  function clearGroup(name) {
    document.getElementsByName(`${name}`).forEach(option => {
      option.checked = false
    })
  }

  function handlePriceFilterChange(e, setValue) {
    let value = e.target.value
    if (value == '' || Number(value) && value.length < 6) {
      setValue(value)
    }
  }

  function applyPriceFilter(e) {
    e.preventDefault()
    document.querySelectorAll('.price-input').forEach(filter => {
      searchParams.delete(filter.name)
      if (filter.value != '') { searchParams.append(filter.name, filter.value) }
    })
    navigate('/results?' + searchParams.toString())
  }

  if (properties) {
    return (
      <div className='filters-section box-shadow'>
        {mapFilters()}
        <form className='price-filter'>
          <div className='flex-row justify-center align-center'>
            <input 
              className='price-input' 
              type='text' 
              name='minimum' 
              placeholder='min' 
              onChange={e => handlePriceFilterChange(e, minPrice.setValue)}
              value={minPrice.value}
            />
            &nbsp;-&nbsp;
            <input 
              className='price-input' 
              type='text' 
              name='maximum' 
              placeholder='max' 
              onChange={e => handlePriceFilterChange(e, maxPrice.setValue)}
              value={maxPrice.value}
            />
          </div>
          <br />
          <button onClick={applyPriceFilter}>Apply</button>
        </form>
      </div>)
  }
}
