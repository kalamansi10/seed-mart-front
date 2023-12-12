import { useState } from 'react'
import useItemsProps from '../hooks/useItemsProps'

export default function Categories() {
  const properties = JSON.parse(useItemsProps())

  function getItem() {
    fetch('/api/v1/get-item/' + id)
      .then(response => response.json())

  }

  function renderCategories() {
    return properties[Object.keys(properties)[0]].map((category) => {
      return (
        <div className='category flex-column align-center' key={category}>
          <img src="https://placehold.co/200x200" alt="placeholder" />
          <h5>{category}</h5>
        </div>
      )
    })
  }

  return (
    <div className='categories-container flex-row justify-center'>
      {renderCategories()}
    </div>
  )
}
