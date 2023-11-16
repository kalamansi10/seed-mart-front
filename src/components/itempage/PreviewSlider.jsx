import React, { useRef, useEffect } from 'react'

export default function PreviewSlider({item}) {
  const preview = useRef()
  const sliderPos = useRef(0)
  const image_links = item.image_links

  useEffect(() => {
    preview.current = document.querySelector('.preview-image')
    preview.current.classList.remove('hidden')
  }, [])

  function mapMainPreview() {
    result = []
    for (let i = 0; i < image_links.length; i++) {
      result.push(
        <div className='preview-image hidden' id={`img${i}`} key={i}>
          <img src={image_links[i]} alt={`img${i}`} />
        </div>
      )
    }
    return result
  }

  function mapSubPreview() {
    result = []
    for (let i = 0; i < image_links.length; i++) {
      result.push(
        <div className='flex-row justify-center align-center' id={`img${i}`} key={i}>
          <img src={image_links[i]} alt={`img${i}`} onMouseOver={showToMain} />
        </div>
      )
    }
    return result
  }

  function slide(direction) {
    let translation = direction + sliderPos.current
    if (translation > -1 && translation < ((image_links.length - 2))) {
      sliderPos.current = translation
      document.querySelector('.sub-slider').style.translate = `${sliderPos.current * -100}px`
    }
  }

  function showToMain(e) {
    preview.current.classList.add('hidden')
    preview.current = document.querySelector(`.preview-image#${e.target.alt}`)
    preview.current.classList.remove('hidden')
  }

  return (
    <div className='slider-container flex-column align-center'>
      <div className='preview-container flex-row justify-center align-center'>
        {mapMainPreview(item)}
      </div>
      <div className='sub-container flex-row justify-between align-center'>
        <img id='leftNav' src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/angle-left-icon.png" alt="arrow-left" onClick={() => slide(-1)} />
        <div className='sub-preview flex-row'>
          <div className='sub-slider'>
            {mapSubPreview(item)}
          </div>
        </div>
        <img id='rightNav' src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/angle-right-icon.png" alt="arrow-right" onClick={() => slide(1)} />
      </div>
    </div >
  )
}
