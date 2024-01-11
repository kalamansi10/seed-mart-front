import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PreviewSlider from './PreviewSlider'
import ItemBanner from './ItemBanner'
import './itempage.css'

export default function ItemPage() {
  const [item, setItem] = useState()
  const { id } = useParams()

  useEffect(() => {
    fetch('/api/v1/get-item/' + id)
      .then(response => response.json())
      .then(data => setItem(data))
  }, [])

  if (item) {
    return (
      <>
        <div className='flex-row justify-center'>
          <div className='item-page box-shadow'>
            <div>
              <PreviewSlider item={item} />
            </div>
            <div className='flex-row align-center'>
              <ItemBanner item={item} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
