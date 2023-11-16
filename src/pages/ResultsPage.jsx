import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import DisplayItems from '../components/global/DisplayItems'
import SearchFilter from '../components/resultspage/SearchFilter'

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
          {searchAPI && <DisplayItems API={searchAPI} />}
        </div>
      </div>
    </>
  )
}
