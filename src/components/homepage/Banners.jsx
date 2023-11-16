import React, { useState, useEffect, useRef } from 'react'

export default function Banners() {
  const [banners, setBanners] = useState()
  let bannerCount
  let pages
  let currentBanner = 0

  useEffect(() => {
    fetch("/api/v1/active-banners")
      .then(response => response.json())
      .then(activeBanners => mapActiveBanners(activeBanners))
      .then(mappedBanners => setBanners(mappedBanners))
      .then(initializeBanner)
  }, [])

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
    translation = currentBanner * -900
    document.querySelector(".active-banners").style.translate = `${translation}px`
  }

  function generatePages() {
    pages = []
    for (let i = 0; i < bannerCount; i++) {
      pageClass = `page-dot page${i}`
      pages.push(<span className={pageClass} key={i}></span>)
    }
    return pages
  }

  function initializeBanner() {
    if (banners != null) {
      bannerCount = banners.length
      pages = generatePages()
      setInterval(() => {
        move(1)
      }, 5000)
    }
  }

  return (
    <>
      <div className="slider box-shadow">
        <div className="active-banners flex-row">
          {banners}
        </div>
      </div>
      <div className="banner-btns flex-row justify-between">
        <img src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-left-round-filled-icon.png' className="prev" onClick={() => move(-1)} />
        <img src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-right-round-filled-icon.png' className="next" onClick={() => move(1)} />
      </div>
      <div className="pages flex-row justify-center">{pages}</div>
    </>
  )
}
