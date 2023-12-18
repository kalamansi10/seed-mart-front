import { useNavigate } from 'react-router-dom' 
import ItemsDisplay from '../itemsdisplay/ItemsDisplay'
import PromoBanners from './PromoBanners'
import Categories from './Categories'
import './homepage.css'

export default function App() {
  const navigate = useNavigate()

  function handleSeeMore() {
    navigate('/results?keyword=')
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div className='homepage'>
        <section className='promotion-section box-shadow'>
          <PromoBanners />
          <Categories />
        </section>
        <section className='items-section flex-column align-center'>
          <header className='box-shadow text-center'>New Additions</header>
          <div className='items-display'>
            <ItemsDisplay searchAPI='/api/v1/search?keyword=' />
          </div>
          <button className='see-more-button box-shadow' onClick={handleSeeMore}>See more</button>
        </section>
      </div>
    </>
  )
}
