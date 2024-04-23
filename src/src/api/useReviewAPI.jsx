import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";
import emptyStar from "../../assets/empty-star.svg";
import filledStar from "../../assets/filled-star.svg";

export default function useReviewAPI() {
  const { getHeader } = useCookiesAndHeaders();

  async function getReviewList(itemID) {
    const response = await fetch(`/api/review/list/${itemID}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function getReview(orderId) {
    const response = await fetch(`/api/review/${orderId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function addReview(reviewBody) {
    const response = await fetch(
      "/api/review",
      getHeader("POST", { review: reviewBody })
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  async function editReview(reviewId, reviewBody) {
    const response = await fetch(
      `/api/review/${reviewId}`,
      getHeader("PUT", { review: reviewBody })
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  async function deleteReview(reviewId) {
    const response = await fetch(
      `/api/review/${reviewId}`,
      getHeader("DELETE")
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  function renderStarRatings(rating, size) {
    let starSize = "";

    switch (size) {
      case "small":
        starSize = "10px";
        break;
      default:
        starSize = "17px";
    }

    if (rating == 0) return <span>No ratings yet</span>;
    let result = [];
    let gray = 5 - rating;
    for (let i = 0; i < rating; i++) {
      result.push(
        <img
          key={i + "yellow"}
          className="filled-star"
          src={filledStar}
          alt="yellow"
          style={{ width: starSize, height: starSize }}
        />
      );
    }
    for (let i = 0; i < gray; i++) {
      result.push(
        <img
          key={i + "gray"}
          className="empty-star"
          src={emptyStar}
          alt="gray"
          style={{ width: starSize, height: starSize }}
        />
      );
    }
    return (
      <>
        <span className="rating">{rating}</span>&nbsp;&nbsp;
        <span>{result}</span>
      </>
    );
  }

  return {
    getReviewList,
    getReview,
    addReview,
    editReview,
    deleteReview,
    renderStarRatings,
  };
}
