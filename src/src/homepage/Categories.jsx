import {useNavigate } from 'react-router-dom'
import useItemsProps from '../hooks/useItemsProps'
import categoriesPlaceholderImage from '../../assets/categories-placeholder.svg'

export default function Categories({  }) {
  const list = useItemsProps()
  const navigate = useNavigate()

  function handleClickCategory(category) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    navigate('/results?keyword=&filter%5Bplant_type%5D=' + category)
  }

  function renderCategories() {
    console.log(list)
    return list[Object.keys(list)[0]].map((category) => {
      return (
        <div className='category' key={category}>
          <a className='flex-column align-center' onClick={() => handleClickCategory(category)}>
            <img src={categoriesPlaceholderImage} alt="placeholder" />
            <h5>{category}</h5>
          </a>
        </div>
      )
    })
  }

  return (
    <div className='categories-container flex-row justify-center'>
      {list && renderCategories()}
    </div>
  )
}
