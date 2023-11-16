import {useState, useEffect} from 'react'
import './display-items.css'

export default function DisplayItems({API}) {
  const [items, setItems] = useState()

  useEffect(() => {
    fetch(API)
    .then(response => response.json())
    .then(items => mapItems(items))
    .then(mappedItems => setItems(mappedItems))
  }, [API])

  function mapItems(items) {
    return items.map((item) =>
      <a href={'/show/' + item.id} key={item.id}>
        <div className="item-card flex-column justify-between box-shadow">
          <div>
            <img src={item.image_links[0]} alt="placeholder" />
            <div className="item-padding">
              <h3>{item.name}</h3>
            </div>
          </div>
          <div>
            <hr />
            <div className="flex-row align-center item-padding">
              <h4>PHP {item.price}</h4>
              <div>
                <button>Buy now</button>
              </div>
              <div>
                <button>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }

  return (
    <div className="items-grid">
      {items}
    </div>
  )
}
