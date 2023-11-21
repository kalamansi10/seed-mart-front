import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'

export default function Search() {
  const [keyword, keywordInput] = useInput('text')

  return (
    <div>
      {keywordInput}
      <Link to={'results?keyword=' + keyword}>
        <button>Search</button>
      </Link>
    </div>
  )
}
