import React, {useEffect, useState} from 'react'
import Navigation from '../general/Navigation'
import PreviewSlider from '../components/itempage/PreviewSlider'
import ItemBanner from '../components/itempage/ItemBanner'

export default function App({isSignedIn, itemID}) {

  const [item, setItem] = useState()

  useEffect(() => {
    fetch('/v1/seeds/get-item/' + itemID)
    .then(response => response.json())
    .then(data => setItem(data))
  },[])

  if (item != null) {
    return (
        <>
          <Navigation isSignedIn={isSignedIn} />
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
