import ItemsDisplay from '../itemsdisplay/ItemsDisplay'
import Search from './Search'
import PromoBanners from './PromoBanners'

export default function App() {

  return (
    <>
      <div className='flex-column align-center'>
        <Search />
        <PromoBanners />
        <ItemsDisplay API='/api/v1/most-recent'/>
      </div>
    </>
  )
}
