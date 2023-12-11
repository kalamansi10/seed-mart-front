import React from 'react'
import useItemsProps from '../hooks/useItemsProps'

export default function Categories() {
  const properties = JSON.parse(useItemsProps())

  function getItem() {
    fetch('/api/v1/get-item/' + id)
    .then(response => response.json())
  }

  function mapCategories() {
    properties[Object.keys(properties)[0]].map((category) => {

    })
  }

  return (
    <div></div>
  )
}
