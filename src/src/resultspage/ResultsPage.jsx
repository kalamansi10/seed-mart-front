import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ItemsDisplay from '../itemsdisplay/ItemsDisplay'
import SearchFilter from './SearchFilter'

export default function App({searchAPI, setSearchAPI}) {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
 
  useEffect(() => {
    setSearchAPI('/api/v1/search?keyword=' + keyword)
  }, [])

  return (
    <>
      <div className='flex-row justify-center'>
        <div className='results-page flex-row justify-center'>
          <SearchFilter setSearchAPI={setSearchAPI} />
          <div className="items-display">
            {searchAPI && <ItemsDisplay searchAPI={searchAPI} setSearchAPI={setSearchAPI}/>}
          </div>
        </div>
      </div>
    </>
  )
}
