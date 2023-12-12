import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './items-display.css'

export default function ItemsDisplay({API}) {
  const [items, setItems] = useState()

  useEffect(() => {
    fetch(API)
    .then(response => response.json())
    .then(items => mapItems(items))
    .then(mappedItems => setItems(mappedItems))
  }, [API])

  function mapItems(items) {
    return items.map((item) =>
      <Link to={'/show/' + item.id} key={item.id}>
        <div className="item-card flex-column justify-between box-shadow">
          <div>
            <img src={item.image_links[0]} alt="placeholder" />
            <div className='item-padding'>
              <h4>{item.name}</h4>
              <span>{item.price.toLocaleString("en-US", { style: "currency", currency: "PHP" })}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="items-container">
      {items}
    </div>
  )
}
