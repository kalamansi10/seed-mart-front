export default function useItemAPI() {
  async function searchItems(searchParams) {
    const response = await fetch("/api/item/search?" + searchParams);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function getItem(itemId) {
    const response = await fetch(`/api/item/${itemId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  return {
    searchItems,
    getItem,
  };
}
