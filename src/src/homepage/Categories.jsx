import { useNavigate } from "react-router-dom";
import useItemProps from "../hooks/useItemProps";
import categoriesPlaceholderImage from "../../assets/categories-placeholder.svg";

export default function Categories({}) {
  const [list, listFields] = useItemProps();
  const navigate = useNavigate();

  function handleClickCategory(category) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/results?keyword=&filter%5Bplant_type%5D=" + category);
  }

  function renderCategories() {
    return list[listFields()[0]].map((category) => {
      return (
        <div className="category" key={category}>
          <a
            className="flex-column align-center"
            onClick={() => handleClickCategory(category)}
          >
            <img src={categoriesPlaceholderImage} alt="placeholder" />
            <h5>{category}</h5>
          </a>
        </div>
      );
    });
  }

  return (
    <div className="categories-container">
      {list && renderCategories()}
    </div>
  );
}
