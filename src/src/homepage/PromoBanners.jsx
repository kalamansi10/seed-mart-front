import { useState, useEffect } from 'react'

export default function PromoBanners() {
  const [banners, setBanners] = useState()

  let currentBanner = 0
  let bannerCount
  let pages

  useEffect(() => {
    fetch("/api/v1/active-banners")
      .then(response => response.json())
      .then(activeBanners => mapActiveBanners(activeBanners))
      .then(mappedBanners => setBanners(mappedBanners))
  }, [])

  useEffect(() => {
    let pageSlider = setInterval(() => move(1), 5000)
    return () => clearInterval(pageSlider)
  })

  if (banners) {
    bannerCount = banners.length
    pages = generatePages()
  }

  function mapActiveBanners(activeBanners) {
    return activeBanners.map((banner) =>
      <div className="banner" key={banner.id}>
        <a href={banner.banner_link}>
          <img src={banner.image_link} alt={banner.name} />
        </a>
      </div>
    )
  }

  function move(transition) {
    document.querySelector(`.page${currentBanner}`).style.opacity = "10%"
    currentBanner += transition
    cycleBanner()
    document.querySelector(`.page${currentBanner}`).style.opacity = "20%"
    updateSlider()
  }

  function cycleBanner() {
    if (currentBanner < 0) {
      currentBanner = bannerCount - 1
    } else if (currentBanner >= bannerCount) {
      currentBanner = 0
    }
  }

  function updateSlider() {
    let translation = currentBanner * -900
    document.querySelector(".active-banners").style.translate = `${translation}px`
  }

  function generatePages() {
    pages = []
    for (let i = 0; i < bannerCount; i++) {
      let pageClass = `page-dot page${i}`
      pages.push(
        <span className={pageClass} key={i}></span>
      )
    }
    return pages
  }

  return (
    <div className="promo-banners flex-row justify-center">
      <div className="slider box-shadow">
        <div className="active-banners flex-row">
          {banners}
        </div>
        <img className="banner-btns prev"
          src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-left-round-filled-icon.png'
          onClick={() => move(-1)}
        />
        <img className="banner-btns next"
          src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-right-round-filled-icon.png'
          onClick={() => move(1)}
        />
        <div className="pages flex-row justify-center">{pages}</div>
      </div>
    </div>
  )

}



