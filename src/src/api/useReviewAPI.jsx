import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

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

  async function getReview(itemID) {
    const response = await fetch(`/api/review/${itemID}`);
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

  async function editReview(reviewBody) {
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

  async function deleteReview(reviewID) {
    const response = await fetch(`/api/review/${reviewID}`, getHeader("POST"));
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  return {
    getReviewList,
    getReview,
    addReview,
    editReview,
    deleteReview,
  };
}
