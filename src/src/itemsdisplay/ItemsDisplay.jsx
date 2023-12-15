import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './items-display.css'

export default function ItemsDisplay({ searchAPI, setSearchAPI }) {
  const [items, setItems] = useState()
  const [searchParams] = useSearchParams()

  const itemCount = useRef()
  const page = useRef(1)

  useEffect(() => {
    fetch(searchAPI)
      .then(response => response.json())
      .then(items => {
        itemCount.current = items.item_count
        return mapItems(items.item_list)
      })
      .then(mappedItems => setItems(mappedItems))
  }, [searchAPI])

  function mapItems(item_list) {
    return item_list.map((item) =>
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

  function renderPages() {
    let result = []
    let pages = itemCount.current / 20
    for (let i = 1; i < pages + 1; i++) {
      let render = i == page.current ? <span key={i}>{i}</span> : <button onClick={handlePageClick} key={i}>{i}</button>
      result.push(render)
    }
    return result
  }

  function handlePageClick(e) {
    page.current = Number(e.target.textContent)
    movePage()
  }

  function handleNextPrev(increment) {
    console.log(page.current)
    console.log(increment)
    console.log(page.current + increment)
    page.current = page.current + increment
    movePage()
  }

  function movePage() {
    searchParams.delete('offset')
    searchParams.append('offset', ((page.current- 1 )* 20))
    setSearchAPI('/api/v1/search?' + searchParams.toString())
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function renderPrevButton() {
    if (page.current > 1) {
      return <button onClick={() => handleNextPrev(-1)}>{'prev'}</button>
    }
  }

  function renderNextButton() {
    if (page.current < (itemCount.current / 20)) {
      return <button onClick={() => handleNextPrev(1)}>{'next'}</button>
    }
  }

  return (
    <div className="items-container">
      {items}
      <div className='pages-container flex-row justify-center'>
        {renderPrevButton()}
        {itemCount.current && renderPages()}
        {renderNextButton()}
      </div>
    </div>
  )
}
