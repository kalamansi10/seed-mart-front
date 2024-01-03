import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useItemsProps from '../hooks/useItemsProps'
import useAmountInput from '../hooks/useAmountInput'
import AddToCart from './AddToCart'

export default function ItemBanner({ item }) {
  const itemAmount = useAmountInput(0, 9999)
  const properties = useItemsProps()

  useEffect(() => itemAmount.setValue(1), [])

  function mapSpecs() {
    return properties.getCategories().map(specLabel =>
      <div className='flex-row justify-between' key={specLabel}>
        <span>{mapSpecLabel(specLabel) + ': '}</span>
        <span>{item[specLabel]}</span>
      </div>
    )
  }

  function mapSpecLabel(specLabel) {
    let result = ''
    specLabel.split('_').forEach(word => {
      result = result + word.charAt(0).toUpperCase() + word.slice(1) + ' '
    })
    return result.slice(0, -1)
  }

  function handleClickAmount(adjustment) {
    itemAmount.setValue(prev => {
      let result = adjustment + prev
      return result > 0 && result < 1000 ? result : prev
    })
  }

  function handlePriceFilterChange(e, setValue) {
    let value = e.target.value
    if (value == '') {
      setValue(1)
    } else if (Number(value) && value.length < 4) {
      setValue(Number(value))
    }
  }

  if (properties.list) {
    return (
      <div className='description-container flex-column'>
        <div>
          <h2>{item.name}</h2>
        </div>
        <div className='flex-row'>
          <div>
            {'rating'}
          </div>
          <div>
            {'rating'}
          </div>
          <div>
            {'sold'}
          </div>
        </div>
        <div>
          {'PHP ' + item.price}
        </div>
        <div>
          <h3>Amount:</h3>
          {itemAmount.input()}
        </div>
        <div>
          <AddToCart item={item} amount={itemAmount.value}/>
          <Link to='/checkout' state={{ from: 'itempage', item: item, amount: itemAmount.value}}><button>Buy now</button></Link>
        </div>
        <div className='specsContainer'>
          {mapSpecs()}
        </div>
      </div>
    )  
  }
}
