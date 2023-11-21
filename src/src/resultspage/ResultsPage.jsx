import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ItemsDisplay from '../itemsdisplay/ItemsDisplay'
import SearchFilter from './SearchFilter'

export default function App({isSignedIn}) {
  const [searchAPI, setSearchAPI] = useState()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
 
  useEffect(() => {
    setSearchAPI('/api/v1/search?keyword=' + keyword)
  }, [])

  return (
    <>
      <div className='flex-column align-center'>
        <div className='flex-row'>
          <SearchFilter searchAPI={searchAPI} setSearchAPI={setSearchAPI} searchParams={searchParams}/>
          {searchAPI && <ItemsDisplay API={searchAPI} />}
        </div>
      </div>
    </>
  )
}
