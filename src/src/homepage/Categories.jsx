import { useNavigate } from 'react-router-dom'
import useItemsProps from '../hooks/useItemsProps'

export default function Categories({  }) {
  const properties = JSON.parse(useItemsProps())
  const navigate = useNavigate()

  function handleClickCategory(category) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    navigate('/results?keyword=&filter%5Bplant_type%5D=' + category)
  }

  function renderCategories() {
    return properties[Object.keys(properties)[0]].map((category) => {
      return (
        <div className='category' key={category}>
          <a className='flex-column align-center' onClick={() => handleClickCategory(category)}>
            <img src="https://placehold.co/200x200" alt="placeholder" />
            <h5>{category}</h5>
          </a>
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
