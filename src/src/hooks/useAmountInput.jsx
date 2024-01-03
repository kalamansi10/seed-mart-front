import { useState } from 'react'
import './input.css'

export default function useAmountInput(min, max) {
  const [value, setValue] = useState()
  const input = () => {
    return (
      <div className='amount-input flex-row'>
        <button onClick={() => handleClickAmount(-1)}>-</button>
        <input
          type='text'
          name='minimum'
          onChange={handlePriceFilterChange}
          value={value}
        />
        <button onClick={() => handleClickAmount(1)}>+</button>
      </div>
    )  
  }

  function handleClickAmount(adjustment) {
    setValue(prev => {
      let result = adjustment + prev
      return result > min && result < max ? result : prev
    })
  }

  function handlePriceFilterChange(e) {
    let value = e.target.value
    if (value == '') {
      setValue(1)
    } else if (Number(value) && value.length < 4) {
      setValue(Number(value))
    }
  }

  return {value, setValue, input}
}
