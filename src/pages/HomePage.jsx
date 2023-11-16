import DisplayItems from '../components/global/DisplayItems'
import Search from '../components/homepage/Search'
import Banners from '../components/homepage/Banners'

export default function App({isSignedIn}) {

  return (
    <>
      <div className='flex-column align-center'>
        <Search />
        <Banners />
        <DisplayItems API='/api/v1/most-recent'/>
      </div>
    </>
  )
}
