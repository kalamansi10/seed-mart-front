import { useState } from 'react'
import './input.css'

export default function useAmountInput(min, max) {
  const [value, setValue] = useState()
  const input = () => {
    return (
      <div className='amount-input flex-row'>
        <button onClick={() => handleClick(-1)}>-</button>
        <input
          type='text'
          name='minimum'
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        <button onClick={() => handleClick(1)}>+</button>
      </div>
    )
  }

  function handleClick(adjustment) {
    setValue(prev => {
      let result = adjustment + prev
      return result > min && result < max ? result : prev
    })
  }

  function handleChange(e) {
    let value = Number(e.target.value)
    if (value >= min && value < max) {
      setValue(value)
    }
  }

  function handleBlur() {
    if (value == '') setValue(1)
  }

  return { value, setValue, input }
}
