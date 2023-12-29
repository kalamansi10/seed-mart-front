import { useEffect, useState, useRef } from 'react'
import './input.css'

export default function useSelectOptions(options = [], placeholder = '') {
  const [value, setValue] = useState('')
  const optionsList = useRef()

  useEffect(() => {
    toggleOptionsScroll()
  })

  const input = (
    <div className='input-wrapper'>
      <input className='input'
        type='text'
        onChange={e => setValue(e.target.value)}
        onFocus={() => optionsList.current.classList.toggle('hidden')}
        onBlur={() => optionsList.current.classList.toggle('hidden')}
        placeholder=''
        data-placeholder={placeholder}
        value={value}
        required
      />
      <span className='placeholder'>{placeholder}</span>
      <ol ref={optionsList} className='options-list box-shadow hidden'>
        {renderOptions()}
      </ol>
    </div>
  )

  function toggleOptionsScroll() {
    if (optionsList.current.offsetHeight < 100) {
      optionsList.current.style.overflowY = 'visible'
    } else if (optionsList.current.offsetHeight > 100) {
      optionsList.current.style.overflowY = 'scroll'
    }
  }

  function renderOptions() {
    let filteredOptions = options.filter(option => option.toString().includes(value))
    if (filteredOptions.length == 0) {
      return [(
        <li>
          <div className='option-wrapper flex-row align-center'>
            No results
          </div>
        </li>
      )]
    } else {
      return filteredOptions.sort().map(option => {
        return (
          <li onMouseDown={() => setValue(option)}>
            <div className='option-wrapper flex-row align-center' >
              {option}
            </div>
          </li>
        )
      })  
    }
  }

  return { value, input, setValue }
}
