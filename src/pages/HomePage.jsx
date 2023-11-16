import DisplayItems from '../components/global/DisplayItems'
import Search from '../components/homepage/Search'
import PromoBanners from '../components/homepage/PromoBanners'

export default function App({isSignedIn}) {

  return (
    <>
      <div className='flex-column align-center'>
        <Search />
        <PromoBanners />
        <DisplayItems API='/api/v1/most-recent'/>
      </div>
    </>
  )
}
