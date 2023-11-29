import React from 'react'
import useItemsProps from '../hooks/useItemsProps'
import useInput from '../hooks/useInput'
import AddToCart from './AddToCart'

export default function ItemBanner({ item }) {
  const [amount, setAmount] = useInput('number')
  const properties = JSON.parse(useItemsProps())

  function mapSpecs() {
    return Object.keys(properties).map(specLabel =>
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
        <div className='flex-row'>
          <button>-</button>
          {setAmount}
          <button>+</button>
        </div>
      </div>
      <div>
        <AddToCart item={item} amount={amount}/>
        <button>Buy now</button>
      </div>
      <div className='specsContainer'>
        {mapSpecs()}
      </div>
    </div>
  )
}
