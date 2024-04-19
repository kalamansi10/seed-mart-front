import React, { useEffect } from "react";
import useInput from "../hooks/useInput";
import useReviewAPI from "../api/useReviewAPI";

export default function AddReviewDialog({ reviewDialog, order }) {
  const comment = useInput("text", "Comment...");
  const rating = useInput("number");
  const { getReview, addReview, editReview, deleteReview } = useReviewAPI();

  useEffect(() => {
    rating.setValue(order.review?.rating || "");
    comment.setValue(order.review?.comment || "");
    }, [order]);

  async function handleSubmitReview() {
    const reviewBody = {
      item_id: order.item.id,
      order_id: order.id,
      rating: rating.value,
      comment: comment.value,
    };
    await addReview(reviewBody);
    reviewDialog.close();
  }

  return (
    <>
      <dialog ref={reviewDialog.ref}>
        {rating.input}
        {comment.input}
        <button onClick={handleSubmitReview}>Submit</button>
      </dialog>
    </>
  );
}
