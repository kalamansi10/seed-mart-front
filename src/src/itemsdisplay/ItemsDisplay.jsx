import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import './items-display.css'

export default function ItemsDisplay() {
  const [items, setItems] = useState()

  const [searchParams] = useSearchParams('keyword=')
  const location = useLocation()

  const navigate = useNavigate()

  const itemCount = useRef()
  const page = useRef(1)
  useEffect(() => {
    fetch('/api/v1/search?' + searchParams.toString())
      .then(response => response.json())
      .then(items => {
        itemCount.current = items.item_count
        return mapItems(items.item_list)
      })
      .then(mappedItems => setItems(mappedItems))
  }, [searchParams])

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

  function mapPages() {
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
    page.current = page.current + increment
    movePage()
  }

  function movePage() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    searchParams.delete('offset')
    searchParams.append('offset', ((page.current - 1) * 20))
    navigate('/results?' + searchParams.toString())
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

  function handleSortChange(e) {
    searchParams.delete('sort_by')
    if (e.target.value != "most-recent") {
      searchParams.append('sort_by', e.target.value)
    }
    navigate('/results?' + searchParams.toString())
  }

  function renderItemsDisplay() {
    if (location.pathname == '/results') {
      return (
        <>
          <div className='sorter-wrapper'>
            <select onChange={handleSortChange} value={searchParams.get('sort_by') || 'most_recent'}>
              <option value="most-recent">most recent</option>
              <option value="price-lowest">price: lowest</option>
              <option value="price-highest">price: highest</option>
            </select>
          </div>
          <div className='items-container'>
            {items}
          </div>
          <div className='pages-container flex-row justify-center'>
            {renderPrevButton()}
            {mapPages()}
            {renderNextButton()}
          </div>
        </>
      )
    } else {
      return (
        <div className='items-container'>
          {items}
        </div>
      )
    }
  }

  return (
    <div className="display-items">
      {renderItemsDisplay()}
    </div>
  )
}
