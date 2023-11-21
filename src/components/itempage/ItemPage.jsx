import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PreviewSlider from './PreviewSlider'
import ItemBanner from './ItemBanner'

export default function ItemPage() {
  const [item, setItem] = useState()
  const {id} = useParams()

  useEffect(() => {
    fetch('/api/v1/get-item/' + id)
    .then(response => response.json())
    .then(data => setItem(data))
  }, [])

  if (item) {
    return (
      <>
        <div className='flex-row justify-center align-center'>
          <div>
            <PreviewSlider item={item}/>
          </div>
          <div>
            <ItemBanner item={item}/>
          </div>
        </div>
      </>
    )
  }
}
