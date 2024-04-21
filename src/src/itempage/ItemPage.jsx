import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useItemAPI from "../api/useItemAPI";
import useReviewAPI from "../api/useReviewAPI";
import PreviewSlider from "./PreviewSlider";
import ItemBanner from "./ItemBanner";
import "./itempage.css";

export default function ItemPage({ createPopUp }) {
  const [item, setItem] = useState();
  const [itemReviews, setItemReviews] = useState();
  const { id } = useParams();
  const { getItem } = useItemAPI();
  const { getReviewList, renderStarRatings } = useReviewAPI();

  useEffect(() => {
    async function fetchItem() {
      const item = await getItem(id);
      if (item) {
        setItem(item);
      }
    }
    fetchItem();
  }, []);

  useEffect(() => {
    async function fetchItemReviews() {
      const item = await getReviewList(id);
      if (item) {
        setItemReviews(item);
      }
    }
    fetchItemReviews();
  }, []);

  function renderReviews() {
    if (!itemReviews || itemReviews.length == 0) {
      return <div>No reviews yet.</div>;
    } else {
      return itemReviews.map((review) => {
        const date = new Date(review.created_at);

        return (
          <div className="review-container" key={review.id}>
            <div className="reviewer">{review.is_anonymous ? "Anonymous" : review.reviewer}</div>
            <div className="rating">
            <div className="review-date">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
              {renderStarRatings(review.rating, "small")}
            </div>
            <div className="comment">{review.comment}</div>
          </div>
        );
      });
    }
  }

  if (item) {
    return (
      <>
        <div className="flex-column align-center full-height">
          <div className="item-page flex-row justify-between box-shadow">
            <div>
              <PreviewSlider item={item} />
            </div>
            <div className="flex-row align-center">
              <ItemBanner
                item={item}
                itemReviews={itemReviews}
                renderStarRatings={renderStarRatings}
                createPopUp={createPopUp}
              />
            </div>
          </div>
          <div className="item-reviews-section box-shadow">
            <p className="header">Product Reviews</p>
            {renderReviews()}
          </div>
        </div>
      </>
    );
  }
}
