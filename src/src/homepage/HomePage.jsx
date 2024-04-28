import { useNavigate } from "react-router-dom";
import ItemsDisplay from "../itemsdisplay/ItemsDisplay";
import PromoBanners from "./PromoBanners";
import Categories from "./Categories";
import "./homepage.css";

export default function App() {
  const navigate = useNavigate();

  function handleSeeMore() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/results");
  }

  return (
    <>
      <div className="homepage">
        <section className="promotion-section box-shadow">
          <PromoBanners />
          <div className="flex-column align-center">
          <Categories />
          </div>
        </section>
        <section className="items-section flex-column align-center">
          <header className="box-shadow text-center">New Additions</header>
          <ItemsDisplay />
          <button
            className="see-more-button box-shadow"
            onClick={handleSeeMore}
          >
            See more
          </button>
        </section>
      </div>
    </>
  );
}
