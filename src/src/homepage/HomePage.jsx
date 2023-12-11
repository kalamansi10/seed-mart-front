import ItemsDisplay from '../itemsdisplay/ItemsDisplay'
import Search from './Search'
import PromoBanners from './PromoBanners'
import Categories from './Categories'

export default function App() {

  return (
    <>
      <div className='flex-column align-center'>
        <Search />
        <PromoBanners />
        <Categories />
        <ItemsDisplay API='/api/v1/most-recent'/>
      </div>
    </>
  )
}
