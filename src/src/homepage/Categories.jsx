import { Link } from 'react-router-dom'
import useItemsProps from '../hooks/useItemsProps'

export default function Categories() {
  const properties = JSON.parse(useItemsProps())

  function renderCategories() {
    return properties[Object.keys(properties)[0]].map((category) => {
      return (
        <div className='category' key={category}>
          <Link to={'/results?keyword=&filter%5Bplant_type%5D=' + category} className='flex-column align-center'>
            <img src="https://placehold.co/200x200" alt="placeholder" />
            <h5>{category}</h5>
          </Link>
        </div>
      )
    })
  }

  return (
    <div className='categories-container flex-row justify-center'>
      {renderCategories()}
    </div>
  )
}
