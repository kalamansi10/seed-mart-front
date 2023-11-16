import { Link, redirect } from 'react-router-dom'
import useInput from '../global/useInput'

export default function Search() {
  const [keyword, keywordInput] = useInput('text')

  function searchKeyword(e) {
    redirect
  }

  return (
    <div>
      {keywordInput}
      <Link to={'results?keyword=' + keyword}>
        <button>Search</button>
      </Link>
    </div>
  )
}
