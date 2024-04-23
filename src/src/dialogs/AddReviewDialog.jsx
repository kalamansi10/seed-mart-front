import { useEffect, useState } from "react";
import useReviewAPI from "../api/useReviewAPI";
import emptyStar from "../../assets/empty-star.svg";
import filledStar from "../../assets/filled-star.svg";
import "./add-review-dialog.css";

export default function AddReviewDialog({ reviewDialog, order }) {
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { getReview, addReview, editReview, deleteReview } = useReviewAPI();

  useEffect(() => {
    fetchReview();
  }, [order]);

  async function fetchReview() {
    let fetchedReview
    if (order) fetchedReview = await getReview(order.id);
    setRating(fetchedReview?.rating || 1);
    setComment(fetchedReview?.comment || "");
    setIsAnonymous(fetchedReview?.is_anonymous || false);
    setReview(fetchedReview);
  }

  async function handleAddReview() {
    const reviewBody = {
      item_id: order.item.id,
      order_id: order.id,
      rating: rating,
      comment: comment,
      is_anonymous: isAnonymous,
    };
    await addReview(reviewBody);
    fetchReview();
    reviewDialog.close();
  }

  async function handleUpdateReview() {
    const reviewBody = {
      rating: rating,
      comment: comment,
      is_anonymous: isAnonymous,
    };
    await editReview(review.id, reviewBody);
    fetchReview();
    reviewDialog.close();
  }

  async function handleDeleteReview() {
    await deleteReview(review.id);
    fetchReview();
    reviewDialog.close();
  }

  function ratingInput() {
    return (
      <>
        <img
          className="rating-star"
          src={rating >= 1 ? filledStar : emptyStar}
          alt="yellow"
          onClick={() => setRating(1)}
        />
        <img
          className="rating-star"
          src={rating >= 2 ? filledStar : emptyStar}
          alt="yellow"
          onClick={() => setRating(2)}
        />
        <img
          className="rating-star"
          src={rating >= 3 ? filledStar : emptyStar}
          alt="yellow"
          onClick={() => setRating(3)}
        />
        <img
          className="rating-star"
          src={rating >= 4 ? filledStar : emptyStar}
          alt="yellow"
          onClick={() => setRating(4)}
        />
        <img
          className="rating-star"
          src={rating >= 5 ? filledStar : emptyStar}
          alt="yellow"
          onClick={() => setRating(5)}
        />
      </>
    );
  }

  return (
    <>
      <dialog className="review-dialog box-shadow" ref={reviewDialog.ref}>
        {order?.item && (
          <>
            <h2>Rate Product</h2>
            <div className="flex-row">
              <img src={order.item.image_links[0]} alt={order.item.name} />
              <p>{order.item.name}</p>
            </div>
          </>
        )}
        <div className="rating-input flex-row align-center">
          <span>Rating:</span>
          {ratingInput()}
        </div>
        <textarea
          placeholder="Product review..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <label className="block">
          <input
            type="checkbox"
            onChange={(e) => setIsAnonymous(e.target.checked)}
            checked={isAnonymous}
          />{" "}
          Post anonymously
        </label>
        {!review && <button onClick={handleAddReview}>Add Review</button>}
        {review && (
          <div className="flex-row justify-between">
            <button onClick={handleUpdateReview}>Update Review</button>
            <button className="delete-review" onClick={handleDeleteReview}>
              Delete
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
