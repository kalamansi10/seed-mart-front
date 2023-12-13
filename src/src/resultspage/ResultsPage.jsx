import { useState, useEffect } from "react"
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
        <div className='results-page'>
          <SearchFilter setSearchAPI={setSearchAPI} />
          <div className="item-display">
            {searchAPI && <ItemsDisplay API={searchAPI} />}
          </div>
        </div>
      </div>
    </>
  )
}
