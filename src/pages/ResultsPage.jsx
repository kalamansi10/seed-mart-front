import React, {useState} from 'react'
import Navigation from '../general/Navigation'
import DisplayItems from '../general/DisplayItems'
import SearchFilter from '../components/resultspage/SearchFilter'

export default function App({isSignedIn}) {
  const [queryString, setQueryString] = useState(window.location.search)

  const urlParams = new URLSearchParams(queryString);
  const keyword = urlParams.get('keyword')
  const searchAPI = '/v1/seeds/search'
  const API = searchAPI + queryString

  return (
    <>
      <Navigation isSignedIn={isSignedIn} />
      <div className='flex-column align-center'>
        <div className='flex-row'>
          <SearchFilter keyword={keyword} queryString={queryString} setQueryString={setQueryString} />
          <DisplayItems API={API} />
        </div>
      </div>
    </>
  )
}
